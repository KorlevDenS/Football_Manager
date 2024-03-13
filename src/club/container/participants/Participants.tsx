import './Participants.css';
import {Club, Participant} from "../../../db_classes";
import {Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ParticipantLayout from "./ParticipantLayout";
import ParticipantContainer from "./ParticipantContainer";

interface ParticipantsProps {
    club: Club;
    setLoggedIn(loggedIn: boolean): void;
}

export default function Participants({club, setLoggedIn}: ParticipantsProps) {

    const [participants, setParticipants] = useState<Participant[]>([]);
    const navigate = useNavigate();
    const [showingParticipant, setShowingParticipant] = useState<Participant>();

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

    const loadParticipantInfo = (participant: Participant) => {
        setShowingParticipant(participant);
        navigate("participant/info");
    }

    return (
        <div className={"Participants"}>
            <Routes>
                <Route index element={
                    <>
                        {participants.map(participant =>
                            <div className={"participant-item"}>
                                <ParticipantLayout participant={participant} loadParticipantInfo={loadParticipantInfo}/>
                            </div>
                        )}
                    </>
                }></Route>
                <Route path={"participant/info"} element={
                    <>
                        {showingParticipant != null && (
                            <ParticipantContainer participant={showingParticipant} setLoggedIn={setLoggedIn}
                                                handleClose={() => navigate("/club/manager/Participants")}/>
                        )}
                    </>
                }></Route>
            </Routes>
        </div>
    );

}
