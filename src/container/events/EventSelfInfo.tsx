import {CollectiveEvent, PlayerCustom, PlayerMatch, PlayerTraining} from "../../db_classes";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


interface EventSelfInfoProps {
    event: CollectiveEvent;
    handleClose(updateView: boolean): void;
    setLoggedIn(loggedIn: boolean): void;
}

export default function EventSelfInfo({event, handleClose, setLoggedIn}: EventSelfInfoProps) {

    const [playerMatchInfo, setPlayerMatchInfo] = useState<PlayerMatch | null>(null);
    const [playerTrainingInfo, setPlayerTrainingInfo] = useState<PlayerTraining | null>(null);
    const [playerCustomInfo, setPlayerCustomInfo] = useState<PlayerCustom | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (event.type === "Матч")
            getPlayerMatch();
        if (event.type === "Тренировка")
            getPlayerTrain();
        if (event.type === "Своё событие")
            getPlayerCustom();
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
                            .then(() => setPlayerCustomInfo(playerCustom));
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
                            .then(() => setPlayerTrainingInfo(playerTraining));
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
                            .then(() => setPlayerMatchInfo(playerMatch));
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

    return (
        <>
            <div id={"close-modal"}>
                <IconButton onClick={() => handleClose(false)}>
                    <CloseIcon/>
                </IconButton>
            </div>
            {event.type == "Матч" && (
                <div>
                    Голевые передачи: {playerMatchInfo?.assists}<br/>
                    Время на поле: {playerMatchInfo?.field_time}<br/>
                    Роль в матче: {playerMatchInfo?.role}<br/>
                    Голов забито: {playerMatchInfo?.goals}<br/>
                    Комментарии:{playerMatchInfo?.comments}<br/>
                    Что понравилось: {playerMatchInfo?.what_liked}<br/>
                    Что не понравилось: {playerMatchInfo?.what_disliked}<br/>
                    Что хочу улучшить: {playerMatchInfo?.what_to_improve}<br/>
                    <Button onClick={deleteMatch}>Удалить матч</Button>
                </div>
            )}
            {event.type == "Тренировка" && (
                <div>
                    Голов забито: {playerTrainingInfo?.goals}<br/>
                    Комментарии:{playerTrainingInfo?.comments}<br/>
                    Что понравилось: {playerTrainingInfo?.what_liked}<br/>
                    Что не понравилось: {playerTrainingInfo?.what_disliked}<br/>
                    Что хочу улучшить: {playerTrainingInfo?.what_to_improve}<br/>
                    <Button onClick={deleteTraining}>Удалить тренировку</Button>
                </div>
            )}
            {event.type == "Своё событие" && (
                <div>
                    Комментарии:{playerCustomInfo?.comments}<br/>
                    Что понравилось: {playerCustomInfo?.what_liked}<br/>
                    Что не понравилось: {playerCustomInfo?.what_disliked}<br/>
                    Что хочу улучшить: {playerCustomInfo?.what_to_improve}<br/>
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
        </>
    );
}