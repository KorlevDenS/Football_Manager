import './Applications.css';
import {Application, Club} from "../../../db_classes";
import React, {useEffect, useState} from "react";
import ClubAppLayout from "./ClubAppLayout";

interface ApplicationsProps {
    club: Club;
    setLoggedIn(isLoggedIn: boolean): void;
}

export default function Applications({club, setLoggedIn}: ApplicationsProps) {

    const [clubsApps, setClubApps] = useState<Application[]>([]);

    useEffect(() => {
        getApplications().then();
    }, []);

    const getApplications = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/club/get/club/applications/${club.id}`, {
            method: 'GET',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                const data = response.json();
                let appsArray: Application[];
                data.then(value => {appsArray = value as Application[]})
                    .then(() => setClubApps(appsArray));
            } else if (response.status === 401) {
                setLoggedIn(false);
                localStorage.setItem("loggedIn", "false");
            }
        });
    }

    return (
        <div className={"Applications"}>
            <div>Мои заявки</div>
            <div>
                {clubsApps.map(app =>
                    <div>
                        <ClubAppLayout application={app} loadClubApps={getApplications} club={club} setLoggedIn={setLoggedIn}/>
                    </div>
                )}
            </div>
        </div>
    );

}