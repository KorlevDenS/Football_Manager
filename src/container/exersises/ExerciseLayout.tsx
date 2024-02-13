import {Exercise} from "../../db_classes";
import React from "react";
import './ExerciseLayout.css';


interface ExerciseLayoutProps {
    exercise: Exercise;
    loadExerciseInfo(exercise: Exercise): void;
}

export default function ExerciseLayout({exercise, loadExerciseInfo}: ExerciseLayoutProps) {

    return (
        <div className='ExerciseLayout' onClick={() => loadExerciseInfo(exercise)}>
            <div id="title">
                {exercise.title}
            </div>

            <div>
                <i className="pi pi-clock" style={{fontSize: '0.8rem'}}></i>&nbsp; {exercise.duration}
            </div>

            <div id="description">
                <i className="pi pi-info-circle" style={{fontSize: '0.9rem'}}></i>&nbsp; {exercise.technic}
            </div>
            <div>
                Количество повторов:&nbsp; {exercise.amount}
            </div>
        </div>
    );
}