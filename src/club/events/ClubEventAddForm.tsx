import '../../container/events/EventAddForm.css';
import React, {useEffect, useState} from "react";
import {
    Club, ClubCustomAddRequest, ClubEvent, ClubMatchAddRequest, ClubTrainingAddRequest,
    CollectiveEvent, Custom, Exercise, ExercisesMatchRequest, Match, Participant, Training
} from "../../db_classes";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
import {Autocomplete, TextField} from "@mui/material";

interface ClubEventAddProps {
    club: Club;
    setModalActive(isActive: boolean): void;
    setLoggedIn(loggedIn: boolean): void;
    getEvents(): void;
}

export default function ClubEventAddForm({club, setModalActive, setLoggedIn, getEvents}: ClubEventAddProps) {
    const [participants, setParticipants] = useState<Participant[]>([]);

    const [type, setType] = useState(null);
    const [name, setName] = useState("");
    const [dates, setDates]
        = useState<Date[] | null | undefined>([]);
    const [time, setTime]
        = useState<Date | null | undefined>(null);
    const [location, setLocation] = useState("");
    const [duration, setDuration]
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

    const [showCustom, setShowCustom] = useState(false);
    const [showMatch, setShowMatch] = useState(false);
    const [showTrain, setShowTrain] = useState(false);

    const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);

    const [availableExercises, setAvailableExercises] = useState<Exercise[]>([])
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const [cost, setCost] = useState<number>(0.0);
    const [profit, setProfit] = useState<number>(0.0);

    const types = ["Тренировка", "Матч", "Своё событие"];

    useEffect(() => {
        getParticipants().then();
    }, []);

    const getParticipants = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/club/get/participants/${club.id}`, {
            method: 'GET',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then( response => {
                    if (response.ok) {
                        const data = response.json();
                        let participantsArray: Participant[];
                        data.then(value => {participantsArray = value as Participant[]})
                            .then(() => setParticipants(participantsArray));
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    async function specifyForm(e: DropdownChangeEvent) {
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
                let token = localStorage.getItem("jwtToken");
                await fetch(`/exercise/get/exercises`, {
                    method: 'GET',
                    headers: {
                        'Authorization': token != null ? token : "",
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then( response => {
                            if (response.ok) {
                                const data = response.json();
                                let exercisesArray: Exercise[];
                                data.then(value => {exercisesArray = value as Exercise[]})
                                    .then(() => setAvailableExercises(exercisesArray
                                        .sort((a, b) =>
                                            (a.usage_count != null ? a.usage_count : 0) - (b.usage_count != null ? b.usage_count : 0))
                                    ));
                                data.then(value => {console.log(value)});
                            } else if (response.status === 401) {
                                setLoggedIn(false);
                                localStorage.setItem("loggedIn", "false");
                            }
                        }
                    );
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

    const addTraining = async (collectiveEvent: CollectiveEvent, clubEvent: ClubEvent, ids: number[]) => {
        if (club.id == null) return;
        let clubTrainingAddRequest: ClubTrainingAddRequest;
        let training = new Training(trainType, playersAmount, fieldFormat);
        clubTrainingAddRequest = new ClubTrainingAddRequest(club.id, clubEvent, collectiveEvent, training, ids);

        let gotTraining: Training;
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/add/new/club/training`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clubTrainingAddRequest),
        }).then( response => {
                if (response.ok) {
                    const data = response.json();
                    data.then(value => {gotTraining = value as Training})
                        .then(() => {
                            if (gotTraining.id !== undefined && exercises.length > 0) {
                                let exercisesMatchRequest
                                    = new ExercisesMatchRequest(gotTraining.id, exercises.map(obj => obj.id));
                                let token = localStorage.getItem("jwtToken");
                                fetch(`/exercise/to/training`, {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': token != null ? token : "",
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(exercisesMatchRequest),
                                }).then( response => {
                                        if (response.ok) {

                                        } else if (response.status === 401) {
                                            setLoggedIn(false);
                                            localStorage.setItem("loggedIn", "false");
                                        }
                                    }
                                );
                            }
                        });
                    setModalActive(false);
                    getEvents();
                } else if (response.status === 401) {
                    setLoggedIn(false);
                    localStorage.setItem("loggedIn", "false");
                }
            }
        );
    }

    const addMatch = async (collectiveEvent: CollectiveEvent, clubEvent: ClubEvent, ids: number[]) => {
        if (club.id == null) return;
        let clubMatchAddRequest: ClubMatchAddRequest;
        let match = new Match(myTeam, opponentTeam, myTeamGoals, opponentTeamGoals,
            fieldFormat, calcResult(myTeamGoals, opponentTeamGoals));
        clubMatchAddRequest = new ClubMatchAddRequest(club.id, clubEvent, collectiveEvent, match, ids);

        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/add/new/club/match`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clubMatchAddRequest)
        }).then( response => {
                if (response.ok) {
                    setModalActive(false);
                    getEvents();
                } else if (response.status === 401) {
                    setLoggedIn(false);
                    localStorage.setItem("loggedIn", "false");
                }
            }
        );
    }

    const addCustom = async (collectiveEvent: CollectiveEvent, clubEvent: ClubEvent, ids: number[]) => {
        if (club.id == null) return;
        let clubCustomAddRequest: ClubCustomAddRequest;
        let custom = new Custom(name);
        clubCustomAddRequest = new ClubCustomAddRequest(club.id, clubEvent, collectiveEvent, custom, ids);

        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/add/new/club/custom`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clubCustomAddRequest),
        }).then( response => {
                if (response.ok) {
                    setModalActive(false);
                    getEvents();
                } else if (response.status === 401) {
                    setLoggedIn(false);
                    localStorage.setItem("loggedIn", "false");
                }
            }
        );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (dates == null) return;

        for (const date of dates) {
            let collectiveEvent = new CollectiveEvent(type, location, date, sqlTime(time),
                sqlTime(duration), description);
            let clubEvent = new ClubEvent(cost, profit);

            let player_ids: number[] = [];
            selectedParticipants.forEach(p => {
                // @ts-ignore
                let id = p.player.id;
                if (id != null) player_ids.push(id);
            })

            if (type === "Тренировка") {
                await addTraining(collectiveEvent, clubEvent, player_ids);
            } else if (type === "Матч") {
                await addMatch(collectiveEvent, clubEvent, player_ids);
            } else if (type === "Своё событие") {
                await addCustom(collectiveEvent, clubEvent, player_ids);
            } else {
                console.error("Trying to add an unusual event!")
                return;
            }
        }
    }

    return (
        <form className="EventAddForm" onSubmit={handleSubmit}>
            <div className="event-add-form-part">
                <Dropdown value={type} onChange={(e) => {
                    setType(e.value);
                    specifyForm(e).then();
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
                <Autocomplete
                    onChange={(event, value) => setSelectedParticipants(value)}
                    multiple
                    options={participants}
                    getOptionLabel={(option) => option.human.surname + " " + option.human.name
                        + " " + option.human.patronymic}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Учатники"
                            placeholder="В этой событии"
                        />
                    )}
                />
                <InputTextarea placeholder="Описание" autoResize value={description}
                               onChange={(e) => setDescription(e.target.value)}
                               rows={2} cols={30} />
                <InputNumber placeholder="Стоимость" value={cost}
                             onValueChange={(e) => {if (e.value != null) setCost(e.value)}}/>
                <InputNumber placeholder="Доходность" value={profit}
                             onValueChange={(e) => {if (e.value != null) setProfit(e.value)}}/>

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

                            <div id="tags-outlined">
                                <Autocomplete
                                    onChange={(event, value) => setExercises(value)}
                                    multiple
                                    options={availableExercises}
                                    getOptionLabel={(option) => option.title + " " + option.technic}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Упражнения"
                                            placeholder="В этой тренировке"
                                        />
                                    )}
                                />
                            </div>

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
                </div>

            )}
        </form>
    );
}
