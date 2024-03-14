import '../../container/events/EventSelfInfo.css';

import {Club, ClubCollectiveEvent, CollectiveEvent, Custom, Match, Training} from "../../db_classes";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {FormHelperText, InputAdornment, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


interface ClubEventInfoProps {
    club: Club;
    event: ClubCollectiveEvent;
    handleClose(updateView: boolean): void;
    getEvent(): void;
    setLoggedIn(loggedIn: boolean): void;
}

export default function ClubEventInfo({club, event, handleClose, getEvent, setLoggedIn}: ClubEventInfoProps) {

    const [matchInfo, setMatchInfo] = useState<Match | null>(null);
    const [trainingInfo, setTrainingInfo] = useState<Training | null>(null);
    const [customInfo, setCustomInfo] = useState<Custom | null>(null);

    const [matchInfoChange, setMatchInfoChange] =
        useState<Match>(new Match("", "", 0, 0, "", ""));
    const [trainingInfoChange, setTrainingInfoChange] =
        useState<Training>(new Training("", 0,""));
    const [customInfoChange, setCustomInfoChange] =
        useState<Custom>(new Custom(""));
    const [collectiveEventChange, setCollectiveEventChange] =
        useState<CollectiveEvent>(new CollectiveEvent("", "", new Date(), "00:00:00", "00:00:00", ""));

    const [modifyMatchInfo, setModifyMatchInfo] = useState<boolean>(false);
    const [modifyTrainingInfo, setModifyTrainingInfo] = useState<boolean>(false);
    const [modifyCustomInfo, setModifyCustomInfo] = useState<boolean>(false);
    const [modifyCollectiveEvent, setModifyCollectiveEvent] = useState<boolean>(false);

    const navigate = useNavigate();

    const invertModifyCollectiveEvent = () => {
        if (!(JSON.stringify(event) === JSON.stringify(collectiveEventChange))) {
            updateCollectiveEvent().then();
        }
        setModifyCollectiveEvent(!modifyCollectiveEvent);
    }

    const invertModifyMatch = () => {
        if (!(JSON.stringify(matchInfo) === JSON.stringify(matchInfoChange))) {
            updateMatch().then();
        }
        setModifyMatchInfo(!modifyMatchInfo);
    }

    const invertModifyTraining = () => {
        if (!(JSON.stringify(trainingInfo) === JSON.stringify(trainingInfoChange))) {
            updateTraining().then();
        }
        setModifyTrainingInfo(!modifyTrainingInfo);
    }

    const invertModifyCustom = () => {
        if (!(JSON.stringify(customInfo) === JSON.stringify(customInfoChange))) {
            updateCustom().then();
        }
        setModifyCustomInfo(!modifyCustomInfo);
    }

    useEffect(() => {
        setCollectiveEventChange(event.collectiveEvent);
        if (event.collectiveEvent.type === "Матч")
            getMatch().then();
        if (event.collectiveEvent.type === "Тренировка")
            getTrain().then();
        if (event.collectiveEvent.type === "Своё событие")
            getCustom().then();
    }, []);

    const getCustom = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/get/club/custom`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([event.collectiveEvent.id, club.id])
        })
            .then( response => {
                    if (response.ok) {
                        const data = response.json();
                        let custom: Custom;
                        data.then(value => {custom = value as Custom})
                            .then(() => {
                                setCustomInfo(custom);
                                setCustomInfoChange(custom)
                            });
                        data.then(value => {console.log(value)});
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const getTrain = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/get/club/training`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([event.collectiveEvent.id, club.id])
        })
            .then( response => {
                    if (response.ok) {
                        const data = response.json();
                        let training: Training;
                        data.then(value => {training = value as Training})
                            .then(() => {
                                setTrainingInfo(training);
                                setTrainingInfoChange(training)
                            });
                        data.then(value => {console.log(value)});
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const getMatch = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/get/club/match`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([event.collectiveEvent.id, club.id])
        })
            .then( response => {
                    if (response.ok) {
                        const data = response.json();
                        let match: Match;
                        data.then(value => {match = value as Match})
                            .then(() => {
                                setMatchInfo(match);
                                setMatchInfoChange(match)
                            });
                        data.then(value => {console.log(value)});
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const updateCollectiveEvent = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/event/update/collective/event", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([event.collectiveEvent, collectiveEventChange])
        })
            .then(response => {
                    if (response.ok) {
                        getEvent();
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const updateTraining = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/event/update/training", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([trainingInfo, trainingInfoChange])
        })
            .then(response => {
                    if (response.ok) {
                        getTrain();
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const updateMatch = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/event/update/match", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([matchInfo, matchInfoChange])
        })
            .then(response => {
                    if (response.ok) {
                        getMatch();
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const updateCustom = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/event/update/custom", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([customInfo, customInfoChange])
        })
            .then(response => {
                    if (response.ok) {
                        getCustom();
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
            <div className={"event-fields"}>
                <div className={"event-info"}>

                </div>
                <div className={"event-info"}>
                    <TextField value={collectiveEventChange.location}
                               variant="standard"
                               InputProps={{
                                   readOnly: !modifyCollectiveEvent,
                                   startAdornment: <InputAdornment position="start">Адрес:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...collectiveEventChange}
                                   obj.location = e.target.value;
                                   setCollectiveEventChange(obj);
                               }}/>
                    <FormHelperText>Дата:</FormHelperText>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className="exclude"
                            value={dayjs(collectiveEventChange.date)}
                            readOnly={!modifyCollectiveEvent}
                            onChange={(e) => {
                                if (e !== null) {
                                    let obj = {...collectiveEventChange}
                                    obj.date = e.toDate();
                                    setCollectiveEventChange(obj);
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <TextField value={collectiveEventChange.time}
                               variant="standard"
                               InputProps={{
                                   readOnly: !modifyCollectiveEvent,
                                   startAdornment: <InputAdornment position="start">Время:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...collectiveEventChange}
                                   obj.time = e.target.value;
                                   setCollectiveEventChange(obj);
                               }}/>
                    <TextField value={collectiveEventChange.duration}
                               variant="standard"
                               InputProps={{
                                   readOnly: !modifyCollectiveEvent,
                                   startAdornment: <InputAdornment position="start">Длительность:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...collectiveEventChange}
                                   obj.duration = e.target.value;
                                   setCollectiveEventChange(obj);
                               }}/>
                    <TextField value={collectiveEventChange.description}
                               variant="standard"
                               multiline
                               maxRows={4}
                               InputProps={{
                                   readOnly: !modifyCollectiveEvent,
                                   startAdornment: <InputAdornment position="start">Описание:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...collectiveEventChange}
                                   obj.description = e.target.value;
                                   setCollectiveEventChange(obj);
                               }}/>
                    <Button onClick={invertModifyCollectiveEvent}>
                        {modifyCollectiveEvent ? "Сохранить" : "Изменить данные"}
                    </Button>

                </div>
                {event.collectiveEvent.type == "Матч" && (
                    <>
                        <div className={"event-info"}>
                            <TextField value={matchInfoChange.team1}
                                       variant="standard"
                                       InputProps={{
                                           readOnly: !modifyMatchInfo,
                                           startAdornment: <InputAdornment position="start">Команда 1:</InputAdornment>
                                       }}
                                       onChange={(e) => {
                                           let obj = {...matchInfoChange}
                                           obj.team1 = e.target.value;
                                           setMatchInfoChange(obj);
                                       }}/>
                            <TextField value={matchInfoChange.team2}
                                       variant="standard"
                                       InputProps={{
                                           readOnly: !modifyMatchInfo,
                                           startAdornment: <InputAdornment position="start">Команда 2:</InputAdornment>
                                       }}
                                       onChange={(e) => {
                                           let obj = {...matchInfoChange}
                                           obj.team2 = e.target.value;
                                           setMatchInfoChange(obj);
                                       }}/>
                            <TextField value={matchInfoChange.team1_goals}
                                       variant="standard"
                                       type="number"
                                       InputProps={{
                                           readOnly: !modifyMatchInfo,
                                           startAdornment: <InputAdornment position="start">Голы команды
                                               1:</InputAdornment>
                                       }}
                                       onChange={(e) => {
                                           let obj = {...matchInfoChange}
                                           obj.team1_goals = e.target.value as unknown as number;
                                           setMatchInfoChange(obj);
                                       }}/>
                            <TextField value={matchInfoChange.team2_goals}
                                       variant="standard"
                                       type="number"
                                       InputProps={{
                                           readOnly: !modifyMatchInfo,
                                           startAdornment: <InputAdornment position="start">Голы команды
                                               2:</InputAdornment>
                                       }}
                                       onChange={(e) => {
                                           let obj = {...matchInfoChange}
                                           obj.team2_goals = e.target.value as unknown as number;
                                           setMatchInfoChange(obj);
                                       }}/>
                        </div>
                        <div className={"event-info"}>
                            <TextField value={matchInfoChange.field_format}
                                       variant="standard"
                                       InputProps={{
                                           readOnly: !modifyMatchInfo,
                                           startAdornment: <InputAdornment position="start">Вид поля:</InputAdornment>
                                       }}
                                       onChange={(e) => {
                                           let obj = {...matchInfoChange}
                                           obj.field_format = e.target.value;
                                           setMatchInfoChange(obj);
                                       }}/>
                            <TextField value={matchInfoChange.result}
                                       variant="standard"
                                       InputProps={{
                                           readOnly: !modifyMatchInfo,
                                           startAdornment: <InputAdornment position="start">Результат:</InputAdornment>
                                       }}
                                       onChange={(e) => {
                                           let obj = {...matchInfoChange}
                                           obj.result = e.target.value;
                                           setMatchInfoChange(obj);
                                       }}/>
                            <Button onClick={invertModifyMatch}>
                                {modifyMatchInfo ? "Сохранить" : "Изменить данные матча"}
                            </Button>
                        </div>
                    </>
                )}
                {event.collectiveEvent.type == "Тренировка" && (
                    <>
                        <div className={"event-info"}>
                            <TextField value={trainingInfoChange.type}
                                       variant="standard"
                                       InputProps={{
                                           readOnly: !modifyTrainingInfo,
                                           startAdornment: <InputAdornment position="start">Тип
                                               тренировки:</InputAdornment>
                                       }}
                                       onChange={(e) => {
                                           let obj = {...trainingInfoChange}
                                           obj.type = e.target.value;
                                           setTrainingInfoChange(obj);
                                       }}/>
                            <TextField value={trainingInfoChange.players_amount}
                                       variant="standard"
                                       type="number"
                                       InputProps={{
                                           readOnly: !modifyTrainingInfo,
                                           startAdornment: <InputAdornment position="start">Количество
                                               участников:</InputAdornment>
                                       }}
                                       onChange={(e) => {
                                           let obj = {...trainingInfoChange}
                                           obj.players_amount = e.target.value as unknown as number;
                                           setTrainingInfoChange(obj);
                                       }}/>
                            <TextField value={trainingInfoChange.field_format}
                                       variant="standard"
                                       InputProps={{
                                           readOnly: !modifyTrainingInfo,
                                           startAdornment: <InputAdornment position="start">Место
                                               тренировки:</InputAdornment>
                                       }}
                                       onChange={(e) => {
                                           let obj = {...trainingInfoChange}
                                           obj.field_format = e.target.value;
                                           setTrainingInfoChange(obj);
                                       }}/>
                            <Button onClick={invertModifyTraining}>
                                {modifyTrainingInfo ? "Сохранить" : "Изменить данные тренировки"}
                            </Button>
                        </div>
                    </>
                )}
                {event.collectiveEvent.type == "Своё событие" && (
                    <>
                        <div className={"event-info"}>
                            <TextField value={customInfoChange.name}
                                       variant="standard"
                                       InputProps={{
                                           readOnly: !modifyCustomInfo,
                                           startAdornment: <InputAdornment position="start">Название:</InputAdornment>
                                       }}
                                       onChange={(e) => {
                                           let obj = {...customInfoChange}
                                           obj.name = e.target.value;
                                           setCustomInfoChange(obj);
                                       }}/>
                            <Button onClick={invertModifyCustom}>
                                {modifyCustomInfo ? "Сохранить" : "Изменить данные события"}
                            </Button>
                        </div>
                    </>
                )}
            </div>
            <div className={"info-navigate"}>
                <div id={"right-button"}>
                    <Button onClick={() => navigate("process")} endIcon={<ArrowForwardIosIcon/>}>
                        Процесс
                    </Button>
                </div>
            </div>
        </div>
    );
}