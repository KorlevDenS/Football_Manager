import './ExerciseContainer.css';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React, {useEffect, useState} from "react";
import {Exercise} from "../../db_classes";


interface ExerciseContainerProps {
    exercise: Exercise;
    setLoggedIn(loggedIn: boolean): void;
    handleClose(): void;
}

export default function ExerciseContainer({exercise, setLoggedIn, handleClose}: ExerciseContainerProps) {

    const [photo, setPhoto] = useState<string>("");
    const [video, setVideo] = useState<string>("");


    useEffect(() => {
        getPhoto();
        //getVideo();
    }, []);

    const getPhoto = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/exercise/get/photo", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exercise.id)
        }).then(response => response.blob())
            .then(blob => {
                const file = new Blob([blob], { type: 'application/img' });
                console.log(file);
                const fileUrl = URL.createObjectURL(file);
                setPhoto(fileUrl);
            });
    }

    const getVideo = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/exercise/get/video", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Content-Type': 'application/json',
                'Accept-Ranges': 'bytes'
            },
            body: JSON.stringify(exercise.id)
        }).then(response => response.blob())
            .then(blob => new Blob([blob], { type: 'application/video' }))
            .then(file => URL.createObjectURL(file))
            .then(fileUrl => setVideo(fileUrl));
            // .then(blob => {
            //     const file = new Blob([blob], { type: 'application/video' });
            //     console.log(file);
            //     const fileUrl = URL.createObjectURL(file);
            //     console.log(fileUrl);
            //     setVideo(fileUrl);
            // });
    }

    return (
        <div className={"exercise_info"}>
            <div id={"close-container"}>
                <IconButton onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div id={"info-container"}>
                <>
                    Название: {exercise.title} <br/>
                    Техника выполнения: {exercise.technic} <br/>
                    Рекомендуемая продолжительность: {exercise.duration} <br/>
                    Количество повторов: {exercise.amount} <br/>
                    Тип нагрузки: {exercise.muscle_load} <br/>
                    Необходимые принадлежности: {exercise.equipment} <br/>
                    Минимальное количество человек: {exercise.min_people} <br/>
                    Фото: {<img src={photo} alt={"No photo"}/>}
                </>
            </div>
        </div>
    );
}