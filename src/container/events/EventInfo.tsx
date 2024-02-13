import {CollectiveEvent, Match, Training, Custom} from "../../db_classes";
import {useEffect, useState} from "react";


interface EventInfoProps {
    event: CollectiveEvent;
    setLoggedIn(loggedIn: boolean): void;
}

export default function EventInfo({event, setLoggedIn}: EventInfoProps) {

    const [matchInfo, setMatchInfo] = useState<Match | null>(null);
    const [trainingInfo, setTrainingInfo] = useState<Training | null>(null);
    const [customInfo, setCustomInfo] = useState<Custom | null>(null);

    useEffect(() => {
        if (event.type === "Матч")
            getMatch();
        if (event.type === "Тренировка")
            getTrain();
        if (event.type === "Своё событие")
            getCustom();
    }, []);

    const getCustom = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/get/custom`, {
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
                        let custom: Custom;
                        data.then(value => {custom = value as Custom})
                            .then(() => setCustomInfo(custom));
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
        await fetch(`/event/get/training`, {
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
                        let training: Training;
                        data.then(value => {training = value as Training})
                            .then(() => setTrainingInfo(training));
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
        await fetch(`/event/get/match`, {
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
                        let match: Match;
                        data.then(value => {match = value as Match})
                            .then(() => setMatchInfo(match));
                        data.then(value => {console.log(value)});
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    return (
        <>
            {event.type == "Матч" && (
                <div>
                    Матч: {matchInfo?.team1} : {matchInfo?.team2} <br/>
                    Счёт: {matchInfo?.team1_goals} : {matchInfo?.team2_goals}<br/>
                    Формат поля: {matchInfo?.field_format}<br/>
                    Победа: {matchInfo?.result}<br/>
                </div>
            )}
            {event.type == "Тренировка" && (
                <div>
                    Тип тренировки: {trainingInfo?.type}<br/>
                    Количество участников: {trainingInfo?.players_amount}<br/>
                    Формат поля: {trainingInfo?.field_format}<br/>
                </div>
            )}
            {event.type == "Своё событие" && (
                <div>
                    Название события: {customInfo?.name}<br/>
                </div>
            )}
        </>
    );
}