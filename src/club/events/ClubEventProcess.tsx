import '../../container/events/EventProcess.css';
import {ClubCollectiveEvent, Exercise} from "../../db_classes";
import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExerciseLayout from "../../container/exersises/ExerciseLayout";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ExerciseContainer from "../../container/exersises/ExerciseContainer";

interface ClubEventProcessProps {
    event: ClubCollectiveEvent;
    handleClose(updateView: boolean): void;
    setLoggedIn(loggedIn: boolean): void;
}

export default function ClubEventProcess({event, handleClose, setLoggedIn}: ClubEventProcessProps) {

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const navigate = useNavigate();
    const [showingExercise, setShowingExercise] = useState<Exercise>();


    const loadExerciseInfo = (exercise: Exercise) => {
        setShowingExercise(exercise);
        navigate("exercise/info");
    }

    useEffect(() => {
        if (event.collectiveEvent.type == "Тренировка") {
            getExercises().then();
        }
    }, []);


    const getExercises = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/exercise/get/event/exercises`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event.collectiveEvent.id)
        })
            .then( response => {
                    if (response.ok) {
                        const data = response.json();
                        let exercisesArray: Exercise[];
                        data.then(value => {exercisesArray = value as Exercise[]})
                            .then(() => setExercises(exercisesArray
                                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            ));
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }


    return (
        <div>
            <Routes>
                <Route index element={
                    <div className={"EventProcess"}>
                        <div id={"close-modal"}>
                            <IconButton onClick={() => handleClose(false)}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        {event.collectiveEvent.type} : процесс
                        { event.collectiveEvent.type == "Тренировка" && (
                            <div className={"training-exercises"}>
                                {exercises.map(exercise =>
                                    <div className={"exercise-item"}>
                                        <ExerciseLayout exercise={exercise} loadExerciseInfo={loadExerciseInfo}/>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className={"info-navigate"}>
                            <div id={"left-button"}>
                                <Button onClick={() => navigate("..")} startIcon={<ArrowBackIosIcon/>}>
                                    Информация
                                </Button>
                            </div>
                        </div>
                    </div>
                }></Route>
                <Route path={"exercise/info"} element={
                    <>
                        {showingExercise != null && (
                            <ExerciseContainer exercise={showingExercise} setLoggedIn={setLoggedIn}
                                               handleClose={() => navigate("../process")}/>
                        )}
                    </>
                }></Route>
            </Routes>
        </div>
    );
}