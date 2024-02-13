import './ExerciseContainer.css';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import {Exercise} from "../../db_classes";


interface ExerciseContainerProps {
    exercise: Exercise;
    setLoggedIn(loggedIn: boolean): void;
    handleClose(): void;
}

export default function ExerciseContainer({exercise, setLoggedIn, handleClose}: ExerciseContainerProps) {

    return (
        <div className={"exercise_info"}>
            <div id={"close-container"}>
                <IconButton onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div id={"info-container"}>
                Название: {exercise.title} <br/>
                Техника выполнения: {exercise.technic} <br/>
                Рекомендуемая продолжительность: {exercise.duration} <br/>
                Количество повторов: {exercise.amount} <br/>
                Тип нагрузки: {exercise.muscle_load} <br/>
                Необходимые принадлежности: {exercise.equipment} <br/>
                Минимальное количество человек: {exercise.min_people} <br/>
            </div>
        </div>
    );
}