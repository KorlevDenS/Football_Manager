import {Application} from "../../db_classes"
import './ApplicationLayout.css';
import React from "react";
import Button from "@mui/material/Button";

interface ApplicationLayoutProps {
    application: Application;
}

export default function ApplicationLayout({application}: ApplicationLayoutProps) {


    return (
        <div className='ApplicationLayout'>
            <div id={"club-title"}>
                Клуб: {application.message}
            </div>
            <div>
                Дата:&nbsp; {new Date(application.creation_date).getDate() + "."
                + (new Date(application.creation_date).getMonth() + 1)
                + "." + new Date(application.creation_date).getFullYear()}
            </div>
            <div className={"apply-button"}>
                {application.club_approve === 0 && (<Button color={"warning"}>На рассмотрении</Button>)}
                {application.club_approve === 1 && (<Button color={"success"}>Одобрено</Button>)}
                {application.club_approve === 2 && (<Button color={"error"}>Отказано</Button>)}
            </div>
        </div>
    );
}