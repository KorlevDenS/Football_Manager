import './ParticipantContainer.css';
import {Participant} from "../../../db_classes";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

interface ParticipantContainerProps {
    participant: Participant;
    setLoggedIn(loggedIn: boolean): void;
    handleClose(): void;
}

export default function ParticipantContainer({participant, setLoggedIn, handleClose}: ParticipantContainerProps) {

    return (
        <div className={"participant_info"}>
            <div id={"participant-close-container"}>
                <IconButton onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div id={"info-container"}>
                <>
                    Имя: {participant.human.name}<br/>
                    Фамилия: {participant.human.surname}<br/>
                    Отчество: {participant.human.patronymic}<br/>
                    Пол: {participant.human.sex}<br/>
                    Дата рождения:
                    {new Date(participant.human.birthday).getDate()}.
                    {new Date(participant.human.birthday).getMonth() + 1}.
                    {new Date(participant.human.birthday).getFullYear()}<br/>
                    Роль: {participant.player.role}<br/>
                    Вес: {participant.player.weight}<br/>
                    Рост: {participant.player.height}<br/>
                </>
            </div>
        </div>
    );
}