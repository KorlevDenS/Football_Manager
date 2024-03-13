import './ClubAppLayout.css';
import {Application, Club} from "../../../db_classes";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

interface ClubAppProps {
    loadClubApps(): void;
    application: Application;
    club: Club;
    setLoggedIn(isLoggedIn: boolean): void;
}

export default function ClubAppLayout({loadClubApps, application, club, setLoggedIn}: ClubAppProps) {

    const applyPlayer = async (mode: number) => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/club/apply/player`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([club.id, application.id, mode])
        }).then(response => {
            if (response.ok) {
                loadClubApps();
            } else if (response.status === 401) {
                setLoggedIn(false);
                localStorage.setItem("loggedIn", "false");
            }
        });
    }

    return (
        <div className='ClubAppLayout'>
            <div id={"club-title"}>
                Игрок: {application.message}
            </div>
            <div>
                Дата:&nbsp; {new Date(application.creation_date).getDate() + "."
                + (new Date(application.creation_date).getMonth() + 1)
                + "." + new Date(application.creation_date).getFullYear()}
            </div>
            <div className={"club-apply-button"}>
                {application.club_approve === 0 && (<Button color={"warning"}>На рассмотрении</Button>)}
                {application.club_approve === 1 && (<Button color={"success"}>Одобрено</Button>)}
                {application.club_approve === 2 && (<Button color={"error"}>Отказано</Button>)}
            </div>
            {application.club_approve === 0 && (
                <div className={"club-apply-button"}>
                    <IconButton onClick={() => {applyPlayer(1).then();}}>
                        <CheckIcon color="success"/>
                    </IconButton>
                    <IconButton onClick={() => {applyPlayer(2).then();}}>
                        <CloseIcon color="error"/>
                    </IconButton>
                </div>
            )}
        </div>
    );
}