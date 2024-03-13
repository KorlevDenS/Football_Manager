import './Exercises.css';
import React, {useEffect, useState} from "react";
import {Exercise} from "../../db_classes";
import plus from "../../images/plus.png";
import {Dialog} from "primereact/dialog";
import ExerciseLayout from './ExerciseLayout';
import ExerciseAddFrom from './ExerciseAddForm';
import {Route, Routes, useNavigate} from "react-router-dom";
import ExerciseContainer from "./ExerciseContainer";


interface ExerciseAddProps {
    setLoggedIn(loggedIn: boolean): void;
}

export default function Exercises({setLoggedIn}: ExerciseAddProps) {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const navigate = useNavigate();
    const [showingExercise, setShowingExercise] = useState<Exercise>();


    useEffect(() => {
        getExercises().then();
    }, []);

    const getExercises = async () => {
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

    const loadExerciseInfo = (exercise: Exercise) => {
        setShowingExercise(exercise);
        navigate("exercise/info");
    }

    return (
        <div className='Exercises'>
            <Routes>
                <Route index element={
                    <>
                        <ExerciseNav setLoggedIn={setLoggedIn} getExercises={getExercises}/>
                        {exercises.map(exercise =>
                            <div className={"exercise-item"}>
                                <ExerciseLayout exercise={exercise} loadExerciseInfo={loadExerciseInfo}/>
                            </div>
                        )}
                    </>
                }></Route>
                <Route path={"exercise/info"} element={
                    <>
                        {showingExercise != null && (
                            <ExerciseContainer exercise={showingExercise} setLoggedIn={setLoggedIn}
                                            handleClose={() => navigate("/manager/Exercises")}/>
                        )}
                    </>
                }></Route>
            </Routes>


        </div>
    );
}

interface ExerciseNavProps {
    setLoggedIn(loggedIn: boolean): void;
    getExercises(): void;
}

function ExerciseNav({setLoggedIn, getExercises}: ExerciseNavProps) {
    const [isModalActive, setModalActive] = useState(false);

    return (
        <div className='exercise-nav'>
            <button className='add-button' onClick={() => setModalActive(true)}>
                <img id='plus-image' src={plus} alt="+"/>
            </button>
            <Dialog header="Добавление нового упражнения" visible={isModalActive}
                    onHide={() => setModalActive(false)}>
                <ExerciseAddFrom setModalActive={setModalActive} setLoggedIn={setLoggedIn} getExercises={getExercises}/>
            </Dialog>
        </div>
    );
}