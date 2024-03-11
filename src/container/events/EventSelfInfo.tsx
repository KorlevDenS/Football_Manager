import './EventSelfInfo.css';
import {CollectiveEvent, PlayerCustom, PlayerMatch, PlayerTraining} from "../../db_classes";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {InputAdornment, TextField} from "@mui/material";


interface EventSelfInfoProps {
    event: CollectiveEvent;
    handleClose(updateView: boolean): void;
    setLoggedIn(loggedIn: boolean): void;
}

export default function EventSelfInfo({event, handleClose, setLoggedIn}: EventSelfInfoProps) {

    const [playerMatchInfo, setPlayerMatchInfo] = useState<PlayerMatch | null>(null);
    const [playerTrainingInfo, setPlayerTrainingInfo] = useState<PlayerTraining | null>(null);
    const [playerCustomInfo, setPlayerCustomInfo] = useState<PlayerCustom | null>(null);

    const [playerMatchInfoChange, setPlayerMatchInfoChange] =
        useState<PlayerMatch>(new PlayerMatch(0,"00:00:00", "", 0, "", "", "", ""));
    const [playerTrainingInfoChange, setPlayerTrainingInfoChange] =
        useState<PlayerTraining>(new PlayerTraining(0, "","","",""));
    const [playerCustomInfoChange, setPlayerCustomInfoChange] =
        useState<PlayerCustom>(new PlayerCustom("","","",""));

    const [modifyPlayerMatchInfo, setModifyPlayerMatchInfo] = useState<boolean>(false);
    const [modifyPlayerTrainingInfo, setModifyPlayerTrainingInfo] = useState<boolean>(false);
    const [modifyPlayerCustomInfo, setModifyPlayerCustomInfo] = useState<boolean>(false);

    const navigate = useNavigate();

    const invertModifyPlayerMatch = () => {
        if (!(JSON.stringify(playerMatchInfo) === JSON.stringify(playerMatchInfoChange))) {
            updatePlayerMatch().then();
        }
        setModifyPlayerMatchInfo(!modifyPlayerMatchInfo);
    }

    const invertModifyPlayerTraining = () => {
        if (!(JSON.stringify(playerTrainingInfo) === JSON.stringify(playerTrainingInfoChange))) {
            updatePlayerTraining().then();
        }
        setModifyPlayerTrainingInfo(!modifyPlayerTrainingInfo);
    }

    const invertModifyPlayerCustom = () => {
        if (!(JSON.stringify(playerCustomInfo) === JSON.stringify(playerCustomInfoChange))) {
            updatePlayerCustom().then();
        }
        setModifyPlayerCustomInfo(!modifyPlayerCustomInfo);
    }

    useEffect(() => {
        if (event.type === "Матч")
            getPlayerMatch().then();
        if (event.type === "Тренировка")
            getPlayerTrain().then();
        if (event.type === "Своё событие")
            getPlayerCustom().then();
    }, []);

    const getPlayerCustom = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/get/player/custom`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event.id)
        })
            .then( response => {
                    if (response.ok) {
                        const data = response.json();
                        let playerCustom: PlayerCustom;
                        data.then(value => {playerCustom = value as PlayerCustom})
                            .then(() => {
                                setPlayerCustomInfo(playerCustom);
                                setPlayerCustomInfoChange(playerCustom);
                            });
                        data.then(value => {console.log(value)});
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const getPlayerTrain = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/get/player/training`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event.id)
        })
            .then( response => {
                    if (response.ok) {
                        const data = response.json();
                        let playerTraining: PlayerTraining;
                        data.then(value => {playerTraining = value as PlayerTraining})
                            .then(() => {
                                setPlayerTrainingInfo(playerTraining);
                                setPlayerTrainingInfoChange(playerTraining)
                            });
                        data.then(value => {console.log(value)});
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const getPlayerMatch = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/get/player/match`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event.id)
        })
            .then( response => {
                    if (response.ok) {
                        const data = response.json();
                        let playerMatch: PlayerMatch;
                        data.then(value => {playerMatch = value as PlayerMatch})
                            .then(() => {
                                setPlayerMatchInfo(playerMatch);
                                setPlayerMatchInfoChange(playerMatch)
                            });
                        data.then(value => {console.log(value)});
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const deleteMatch = async () => {
        if (playerMatchInfo === null) return;
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/delete/match`, {
            method: 'DELETE',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerMatchInfo.id)
        })
            .then((response) => {
                if (response.ok) handleClose(true);
                if (response.status === 401) {
                    setLoggedIn(false);
                    localStorage.setItem("loggedIn", "false");
                }
        });
    }

    const deleteTraining = async () => {
        if (playerTrainingInfo === null) return;
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/delete/training`, {
            method: 'DELETE',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerTrainingInfo.id)
        })
            .then((response) => {
                if (response.ok) handleClose(true);
                if (response.status === 401) {
                    setLoggedIn(false);
                    localStorage.setItem("loggedIn", "false");
                }
            });
    }

    const deleteCustom = async () => {
        if (playerCustomInfo === null) return;
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/delete/custom`, {
            method: 'DELETE',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerCustomInfo.id)
        })
            .then((response) => {
                if (response.ok) handleClose(true);
                if (response.status === 401) {
                    setLoggedIn(false);
                    localStorage.setItem("loggedIn", "false");
                }
            });
    }

    const updatePlayerTraining = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/event/update/player/training", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([playerTrainingInfo, playerTrainingInfoChange])
        })
            .then(response => {
                    if (response.ok) {
                        getPlayerTrain();
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const updatePlayerMatch = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/event/update/player/match", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([playerMatchInfo, playerMatchInfoChange])
        })
            .then(response => {
                    if (response.ok) {
                        getPlayerMatch();
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const updatePlayerCustom = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/event/update/player/custom", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([playerCustomInfo, playerCustomInfoChange])
        })
            .then(response => {
                    if (response.ok) {
                        getPlayerCustom();
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    return (
        <div className={"EventSelfInfo"}>
            <div id={"close-modal"}>
                <IconButton onClick={() => handleClose(false)}>
                    <CloseIcon/>
                </IconButton>
            </div>
            {event.type == "Матч" && (
                <div className={"event-fields"}>
                <div className={"event-info"}>
                    <TextField value={playerMatchInfoChange.assists}
                               variant="standard"
                               type="number"
                               InputProps={{
                                   readOnly: !modifyPlayerMatchInfo,
                                   startAdornment: <InputAdornment position="start">Голевые передачи:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerMatchInfoChange}
                                   obj.assists = e.target.value as unknown as number;
                                   setPlayerMatchInfoChange(obj);
                               }}/>
                    <TextField value={playerMatchInfoChange.field_time}
                               variant="standard"
                               InputProps={{
                                   readOnly: !modifyPlayerMatchInfo,
                                   startAdornment: <InputAdornment position="start">Время на поле:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerMatchInfoChange}
                                   obj.field_time = e.target.value;
                                   setPlayerMatchInfoChange(obj);
                               }}/>
                    <TextField value={playerMatchInfoChange.role}
                               variant="standard"
                               InputProps={{
                                   readOnly: !modifyPlayerMatchInfo,
                                   startAdornment: <InputAdornment position="start">Роль в матче:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerMatchInfoChange}
                                   obj.role = e.target.value;
                                   setPlayerMatchInfoChange(obj);
                               }}/>
                    <TextField value={playerMatchInfoChange.goals}
                               variant="standard"
                               type="number"
                               InputProps={{
                                   readOnly: !modifyPlayerMatchInfo,
                                   startAdornment: <InputAdornment position="start">Голов забито:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerMatchInfoChange}
                                   obj.goals = e.target.value as unknown as number;
                                   setPlayerMatchInfoChange(obj);
                               }}/>
                    <TextField value={playerMatchInfoChange.comments}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyPlayerMatchInfo,
                                   startAdornment: <InputAdornment position="start">Комментарии:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerMatchInfoChange}
                                   obj.comments = e.target.value;
                                   setPlayerMatchInfoChange(obj);
                               }}/>
                </div>
                <div className={"event-info"}>
                    <TextField value={playerMatchInfoChange.what_liked}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyPlayerMatchInfo,
                                   startAdornment: <InputAdornment position="start">Что понравилось:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerMatchInfoChange}
                                   obj.what_liked = e.target.value;
                                   setPlayerMatchInfoChange(obj);
                               }}/>
                    <TextField value={playerMatchInfoChange.what_disliked}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyPlayerMatchInfo,
                                   startAdornment: <InputAdornment position="start">Что не понравилось:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerMatchInfoChange}
                                   obj.what_disliked = e.target.value;
                                   setPlayerMatchInfoChange(obj);
                               }}/>
                    <TextField value={playerMatchInfoChange.what_to_improve}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyPlayerMatchInfo,
                                   startAdornment: <InputAdornment position="start">Хочу улучшить:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerMatchInfoChange}
                                   obj.what_to_improve = e.target.value;
                                   setPlayerMatchInfoChange(obj);
                               }}/>
                    <Button onClick={invertModifyPlayerMatch}>
                        {modifyPlayerMatchInfo ? "Сохранить" : "Изменить оценку матча"}
                    </Button>
                    <Button onClick={deleteMatch}>Удалить матч</Button>
                </div>
                </div>
            )}
            {event.type == "Тренировка" && (
                <div className={"event-fields"}>
                <div className={"event-info"}>
                    <TextField value={playerTrainingInfoChange.goals}
                               variant="standard"
                               type="number"
                               InputProps={{
                                   readOnly: !modifyPlayerTrainingInfo,
                                   startAdornment: <InputAdornment position="start">Голов забито:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerTrainingInfoChange}
                                   obj.goals = e.target.value as unknown as number;
                                   setPlayerTrainingInfoChange(obj);
                               }}/>
                    <TextField value={playerTrainingInfoChange.comments}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyPlayerTrainingInfo,
                                   startAdornment: <InputAdornment position="start">Комментарии:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerTrainingInfoChange}
                                   obj.comments = e.target.value;
                                   setPlayerTrainingInfoChange(obj);
                               }}/>
                    <TextField value={playerTrainingInfoChange.what_liked}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyPlayerTrainingInfo,
                                   startAdornment: <InputAdornment position="start">Что понравилось:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerTrainingInfoChange}
                                   obj.what_liked = e.target.value;
                                   setPlayerTrainingInfoChange(obj);
                               }}/>
                    <TextField value={playerTrainingInfoChange.what_disliked}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyPlayerTrainingInfo,
                                   startAdornment: <InputAdornment position="start">Что не понравилось:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerTrainingInfoChange}
                                   obj.what_disliked = e.target.value;
                                   setPlayerTrainingInfoChange(obj);
                               }}/>
                </div>
                    <div className={"event-info"}>
                    <TextField value={playerTrainingInfoChange.what_to_improve}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyPlayerTrainingInfo,
                                   startAdornment: <InputAdornment position="start">Хочу улучшить:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerTrainingInfoChange}
                                   obj.what_to_improve = e.target.value;
                                   setPlayerTrainingInfoChange(obj);
                               }}/>
                    <Button onClick={invertModifyPlayerTraining}>
                        {modifyPlayerTrainingInfo ? "Сохранить" : "Изменить оценку тренировки"}
                    </Button>
                    <Button onClick={deleteTraining}>Удалить тренировку</Button>
                    </div>
                </div>
            )}
            {event.type == "Своё событие" && (
                <div className={"event-info"}>
                    <TextField value={playerCustomInfoChange.comments}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyPlayerCustomInfo,
                                   startAdornment: <InputAdornment position="start">Комментарии:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerCustomInfoChange}
                                   obj.comments = e.target.value;
                                   setPlayerCustomInfoChange(obj);
                               }}/>
                    <TextField value={playerCustomInfoChange.what_liked}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyPlayerCustomInfo,
                                   startAdornment: <InputAdornment position="start">Что понравилось:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerCustomInfoChange}
                                   obj.what_liked = e.target.value;
                                   setPlayerCustomInfoChange(obj);
                               }}/>
                    <TextField value={playerCustomInfoChange.what_disliked}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyPlayerCustomInfo,
                                   startAdornment: <InputAdornment position="start">Что не понравилось:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerCustomInfoChange}
                                   obj.what_disliked = e.target.value;
                                   setPlayerCustomInfoChange(obj);
                               }}/>
                    <TextField value={playerCustomInfoChange.what_to_improve}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyPlayerCustomInfo,
                                   startAdornment: <InputAdornment position="start">Хочу улучшить:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerCustomInfoChange}
                                   obj.what_to_improve = e.target.value;
                                   setPlayerCustomInfoChange(obj);
                               }}/>
                    <Button onClick={invertModifyPlayerCustom}>
                        {modifyPlayerCustomInfo ? "Сохранить" : "Изменить оценку события"}
                    </Button>
                    <Button onClick={deleteCustom}>Удалить событие</Button>
                </div>
            )}
            <div className={"info-navigate"}>
                <div id={"left-button"}>
                    <Button onClick={() => navigate("../process")} startIcon={<ArrowBackIosIcon/>}>
                        Процесс
                    </Button>
                </div>
                <div id={"right-button"}>
                    <Button onClick={() => navigate("..")} endIcon={<ArrowForwardIosIcon/>}>
                        Информация
                    </Button>
                </div>
            </div>
        </div>
    );
}