import React from "react";
import './ParticipantLayout.css'
import {Participant} from "../../../db_classes";


interface ParticipantLayoutProps {
    participant: Participant;
    loadParticipantInfo(participant: Participant): void;
}

export default function ParticipantLayout({participant, loadParticipantInfo}: ParticipantLayoutProps) {

    return (
        <div className='ParticipantLayout' onClick={() => loadParticipantInfo(participant)}>
            <div id="participant-title">
                {participant.human.name}&nbsp;{participant.human.surname}&nbsp;{participant.human.patronymic}
            </div>

            <div>
                <i className="pi pi-clock" style={{fontSize: '0.8rem'}}></i>Дата рождения:&nbsp;
                {new Date(participant.human.birthday).getDate()}.
                {new Date(participant.human.birthday).getMonth() + 1}.
                {new Date(participant.human.birthday).getFullYear()}
            </div>

            <div id="description">
                <i className="pi pi-info-circle" style={{fontSize: '0.9rem'}}></i>&nbsp; {participant.player.role}
            </div>

        </div>
    );
}