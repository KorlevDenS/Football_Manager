import './EventAddForm.css';
import React, {useState} from "react";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";

interface EventAddProps {
    setModalActive(isActive: boolean): void;
    setLoggedIn(loggedIn: boolean): void;
}

export default function EventAddForm({setModalActive, setLoggedIn}: EventAddProps) {
    const [type, setType] = useState(null);
    const [name, setName] = useState("");
    const [dates, setDates]
        = useState<Date[] | null | undefined>([]);
    const [time, setTime]
        = useState<Date | null | undefined>(null);
    const [location, setLocation] = useState("");
    const [duration, setDuration]
        = useState<Date | null | undefined>(new Date(2000, 1, 1, 0, 0, 0));
    const [fieldTime, setFieldTime]
        = useState<Date | null | undefined>(new Date(2000, 1, 1, 0, 0, 0));

    const [trainType, setTrainType] = useState("");
    const [playersAmount, setPlayersAmount]
        = useState<number | undefined | null>(null);
    const [fieldFormat, setFieldFormat] = useState("");

    const [myTeam, setMyTeam] = useState("");
    const [myTeamGoals, setMyTeamGoals]
        = useState<number | undefined | null>(null);
    const [opponentTeam, setOpponentTeam] = useState("");
    const [opponentTeamGoals, setOpponentTeamGoals]
        = useState<number | undefined | null>(null);
    const [description, setDescription] = useState("");

    const [liked, setLiked] = useState("");
    const [disLiked, setDisLiked] = useState("");
    const [toImprove, setToImprove] = useState("");
    const [comments, setComments] = useState("");

    const [myGoals, setMyGoals]
        = useState<number | undefined | null>(null);
    const [role, setRole] = useState(null);
    const [assists, setAssists]
        = useState<number | undefined | null>(null);

    const [showCustom, setShowCustom] = useState(false);
    const [showMatch, setShowMatch] = useState(false);
    const [showTrain, setShowTrain] = useState(false);
    const [showSelf, setShowSelf] = useState(false);


    const types = ["Тренировка", "Матч", "Своё событие"];
    const roles = ["Вратарь", "Защитник", "Полузащитник", "Нападающий"];

    function specifyForm(e: DropdownChangeEvent) {
        switch (e.value) {
            case types[1]:
                setShowTrain(false);
                setShowCustom(false);
                setShowMatch(true);
                break;
            case types[0]:
                setShowMatch(false);
                setShowCustom(false);
                setShowTrain(true);
                break;
            case types[2]: {
                setShowMatch(false);
                setShowTrain(false);
                setShowCustom(true);
                break;
            }
            default:
                setShowMatch(false);
                setShowTrain(false);
                setShowCustom(false);
        }
    }

    const calcResult = (g1: number | undefined | null, g2: number | undefined | null) => {
        if (g1 == null || g2 == null) return "";
        if (g1 > g2) return "win"
        else if (g1 < g2) return "lose"
        else return "draw"
    };

    const sqlTime = (time: Date | null | undefined) => {
        if (time == null) return null;
        return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("start" + dates);

        if (dates == null) return;

        for (const date of dates) {
            let addUserEventRequest: AddUserEventRequest;
            let collectiveEvent = new CollectiveEvent(type, location, date, sqlTime(time),
                sqlTime(duration), description);

            if (type == "Тренировка") {
                let training = new Training(trainType, playersAmount, fieldFormat);
                let playerTraining = new PlayerTraining(myGoals, liked, disLiked, toImprove, comments);
                addUserEventRequest = new AddUserEventRequest(collectiveEvent, null, null,
                    null, null, training, playerTraining);

            } else if (type == "Матч") {
                let match = new Match(myTeam, opponentTeam, myTeamGoals, opponentTeamGoals,
                    fieldFormat, calcResult(myTeamGoals, opponentTeamGoals));
                let playerMatch = new PlayerMatch(myGoals, sqlTime(fieldTime), role, assists,
                    liked, disLiked, toImprove, comments);
                addUserEventRequest = new AddUserEventRequest(collectiveEvent, null, null,
                    match, playerMatch, null, null);

            } else if (type == "Своё событие") {
                let custom = new Custom(name);
                let playerCustom = new PlayerCustom(liked, disLiked, toImprove, comments);
                addUserEventRequest = new AddUserEventRequest(collectiveEvent, custom, playerCustom, null,
                    null, null, null);
            } else {
                console.error("Trying to add an unusual event!")
                return;
            }

            let token = localStorage.getItem("jwtToken");
            const response = await fetch(`/new/event/add`, {
                method: 'POST',
                headers: {
                    'Authorization': token != null ? token : "",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addUserEventRequest),
            }).then( response => {
                    if (response.ok) {
                        const data = response.json();
                        data.then(value => {console.log(value)});
                        setModalActive(false);
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );

        }

    }

    return (
        <form className="EventAddForm" onSubmit={handleSubmit}>
            <div className="event-add-form-part">
                <Dropdown value={type} onChange={(e) => {
                    setType(e.value);
                    specifyForm(e)
                }}
                          options={types}
                          placeholder="Выберите тип события" className="w-full md:w-14rem" required/>
                <Calendar placeholder="Дата" value={dates}
                          onChange={(e) => setDates(e.value)}
                          selectionMode="multiple" required dateFormat="dd/mm/yy"/>
                <Calendar placeholder="Время начала" value={time}
                          onChange={(e) => setTime(e.value)} timeOnly/>
                <Calendar placeholder="Продолжительность" value={duration}
                          onChange={(e) => setDuration(e.value)} timeOnly/>
                <InputText placeholder="Адрес" value={location}
                           onChange={(e) => setLocation(e.target.value)}/>
                <InputTextarea placeholder="Описание" autoResize value={description}
                               onChange={(e) => setDescription(e.target.value)}
                               rows={2} cols={30} />
                <Button type= "submit" label="Создать событие" />

            </div>
            {(showTrain || showMatch || showCustom) && (
                <div className="event-add-form-part">
                    {showTrain && (
                        <>
                            <InputText placeholder="Тип тренировки" value={trainType}
                               onChange={(e) => setTrainType(e.target.value)}/>
                            <InputNumber placeholder="Количество игроков" value={playersAmount}
                                 onValueChange={(e) => setPlayersAmount(e.value)}/>
                            <InputText placeholder="Вид поля" value={fieldFormat}
                               onChange={(e) => setFieldFormat(e.target.value)}/>
                        </>
                    )}
                    {showMatch && (
                        <>
                            <InputText placeholder="Моя команда" value={myTeam}
                                       onChange={(e) => setMyTeam(e.target.value)}/>
                            <InputNumber placeholder="Голы моей команды" value={myTeamGoals}
                                         onValueChange={(e) => setMyTeamGoals(e.value)}/>
                            <InputText placeholder="Команда противника" value={opponentTeam}
                                       onChange={(e) => setOpponentTeam(e.target.value)}/>
                            <InputNumber placeholder="Голы команды противника" value={opponentTeamGoals}
                                         onValueChange={(e) => setOpponentTeamGoals(e.value)}/>
                            <InputText placeholder="Вид поля" value={fieldFormat}
                                       onChange={(e) => setFieldFormat(e.target.value)}/>
                        </>
                    )}
                    {showCustom && (
                        <>
                            <InputText placeholder="Название" value={name}
                                       onChange={(e) => setName(e.target.value)}/>
                        </>
                    )}
                    <Button type= "button" label={!showSelf ? "Добавить свою оценку" : "Не добавлять оценку"}
                            onClick={() => setShowSelf(!showSelf)} />
                </div>

            )}


            {(showSelf && (showMatch || showTrain || showCustom)) && (
                <div className="event-add-form-part">
                    {showMatch && (
                        <>
                            <InputNumber placeholder="Мои голы" value={myGoals}
                                         onValueChange={(e) => setMyGoals(e.value)}/>
                            <Dropdown value={role} onChange={(e) => setRole(e.value)}
                                      options={roles}
                                      placeholder="Роль на поле" className="w-full md:w-14rem"/>
                            <Calendar placeholder="Время на поле" value={fieldTime}
                                      onChange={(e) => setFieldTime(e.value)} timeOnly/>
                            <InputNumber placeholder="Глевые передачи" value={assists}
                                         onValueChange={(e) => setAssists(e.value)}/>
                        </>
                    )}
                    {showTrain && (
                        <>
                            <InputNumber placeholder="Мои голы" value={myGoals}
                                         onValueChange={(e) => setMyGoals(e.value)}/>
                        </>
                    )}
                    {showCustom && (
                        <>
                        </>
                    )}
                    <InputTextarea placeholder="Что понравилось" autoResize value={liked}
                               onChange={(e) => setLiked(e.target.value)}
                                   rows={2} cols={30}/>
                    <InputTextarea placeholder="Что не понравилось" autoResize value={disLiked}
                               onChange={(e) => setDisLiked(e.target.value)}
                                   rows={2} cols={30}/>
                    <InputTextarea placeholder="Хочу улучшить" autoResize value={toImprove}
                               onChange={(e) => setToImprove(e.target.value)}
                                   rows={2} cols={30}/>
                    <InputTextarea placeholder="Комментарии и оценка" autoResize value={comments}
                               onChange={(e) => setComments(e.target.value)}
                                   rows={2} cols={30}/>
                </div>
            )}
        </form>
    );
}

class AddUserEventRequest {
    collectiveEvent: CollectiveEvent;
    custom: Custom | null;
    playerCustom: PlayerCustom | null;
    match: Match | null;
    playerMatch: PlayerMatch | null;
    training: Training | null;
    playerTraining: PlayerTraining | null;

    constructor(collectiveEvent: CollectiveEvent, custom: Custom | null, playerCustom: PlayerCustom | null,
                match: Match | null, playerMatch: PlayerMatch | null, training: Training | null,
                playerTraining: PlayerTraining | null) {
        this.collectiveEvent = collectiveEvent;
        this.custom = custom;
        this.playerCustom = playerCustom;
        this.match = match;
        this.playerMatch = playerMatch;
        this.training = training;
        this.playerTraining = playerTraining;
    }
}

class CollectiveEvent {
    type: string | null | undefined;
    location: string;
    date: Date;
    time: string | null | undefined;
    duration: string | null | undefined;
    description: string;

    constructor(type: string | null | undefined, location: string, date: Date,
                time: string | null, duration: null | string, description: string) {
        this.type = type;
        this.location = location;
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.description = description;
    }
}

class Match {
    team1: string;
    team2: string;
    team1_goals: number | undefined | null;
    team2_goals: number | undefined | null;
    field_format: string;
    result: string;

    constructor(team1: string, team2: string, team1_goals: number | undefined | null,
                team2_goals: number | undefined | null, field_format: string, result: string) {
        this.team1 = team1;
        this.team2 = team2;
        this.team1_goals = team1_goals;
        this.team2_goals = team2_goals;
        this.field_format = field_format;
        this.result = result;
    }
}

class PlayerMatch {
    goals: number | undefined | null;
    field_time: string | null | undefined;
    role: string | null | undefined;
    assists: number | undefined | null;
    what_liked: string;
    what_disliked: string;
    what_to_improve: string;
    comments: string;

    constructor(goals: number | undefined | null, field_time: null | string,
                role: string | null | undefined, assists: number | undefined | null,
                what_liked: string, what_disliked: string, what_to_improve: string, comments: string) {

        this.goals = goals;
        this.field_time = field_time;
        this.role = role;
        this.assists = assists;
        this.what_liked = what_liked;
        this.what_disliked = what_disliked;
        this.what_to_improve = what_to_improve;
        this.comments = comments;
    }
}

class Training {
    type: string;
    players_amount: number | undefined | null;
    field_format: string;

    constructor(type: string, players_amount: number | undefined | null, field_format: string) {
        this.type = type;
        this.players_amount = players_amount;
        this.field_format = field_format;
    }
}

class PlayerTraining {
    goals: number | undefined | null;
    what_liked: string;
    what_disliked: string;
    what_to_improve: string;
    comments: string;

    constructor(goals: number | undefined | null, what_liked: string, what_disliked: string,
                what_to_improve: string, comments: string) {
        this.goals = goals;
        this.what_liked = what_liked;
        this.what_disliked = what_disliked;
        this.what_to_improve = what_to_improve;
        this.comments = comments;
    }
}

class Custom {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class PlayerCustom {
    what_liked: string;
    what_disliked: string;
    what_to_improve: string;
    comments: string;

    constructor(what_liked: string, what_disliked: string, what_to_improve: string, comments: string) {
        this.what_liked = what_liked;
        this.what_disliked = what_disliked;
        this.what_to_improve = what_to_improve;
        this.comments = comments;
    }
}

