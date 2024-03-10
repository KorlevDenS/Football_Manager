import {CollectiveEvent, Exercise} from "../../db_classes";
import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import ExerciseLayout from "../exersises/ExerciseLayout";
import ExerciseContainer from "../exersises/ExerciseContainer";
import './EventProcess.css';
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface EventProcessProps {
    event: CollectiveEvent;
    handleClose(updateView: boolean): void;
    setLoggedIn(loggedIn: boolean): void;
}

export default function EventProcess({event, handleClose, setLoggedIn}: EventProcessProps) {

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const navigate = useNavigate();
    const [showingExercise, setShowingExercise] = useState<Exercise>();


    const loadExerciseInfo = (exercise: Exercise) => {
        setShowingExercise(exercise);
        navigate("exercise/info");
    }

    useEffect(() => {
        if (event.type == "Тренировка") {
            getExercises();
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
            body: JSON.stringify(event.id)
        })
            .then( response => {
                    if (response.ok) {
                        const data = response.json();
                        let exercisesArray: Exercise[];
                        data.then(value => {exercisesArray = value as Exercise[]})
                            .then(() => setExercises(exercisesArray
                                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            ));
                        data.then(value => {console.log(value)});
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
                    <>
                        <div id={"close-modal"}>
                            <IconButton onClick={() => handleClose(false)}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        {event.type} : процесс
                        { event.type == "Тренировка" && (
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
                            <div id={"right-button"}>
                                <Button onClick={() => navigate("../selfInfo")} endIcon={<ArrowForwardIosIcon/>}>
                                    Личная оценка
                                </Button>
                            </div>
                        </div>
                    </>
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