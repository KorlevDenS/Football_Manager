import React, {useEffect, useState} from "react";
import './ClubMainPage.css';
import {Club, ClubCollectiveEvent} from "../../db_classes";
import {ClubEventItem} from "../events/ClubEvents";

interface ClubMainPageProps {
    club: Club;
    setLoggedIn(isLoggedIn: boolean): void;
}

export default function ClubMainPage({club, setLoggedIn}: ClubMainPageProps) {

    const [events, setEvents] = useState<ClubCollectiveEvent[]>([]);

    useEffect(() => {
        let d = new Date();
        let today = "" + d.getDate() +'.' + (d.getMonth()+1) + '.'+ d.getFullYear();
        getEventsByTimePeriod(today, today).then();
    }, []);

    const getEventsByTimePeriod = async (begin: string, end: string) => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/get/club/collective/events/${club.id}/${begin}/${end}`, {
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
                        let eventsArray: ClubCollectiveEvent[];
                        data.then(value => {eventsArray = value as ClubCollectiveEvent[]})
                            .then(() => setEvents(eventsArray));
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    return (
        <div className="ClubMainPage">
            <div className="welcome">
                Добро пожаловать в клуб <br/> {club.name} !
            </div>

            <div>
                {events.length == 0 && <div className="today-info">На сегодня событий не запланировано</div>}
                {events.length != 0 && <div className="today-info">События сегодня:</div>}
            </div>

            <div className="today-events">
                {events.map(event =>
                    <ClubEventItem event={event} loadEventInfo={()=>{}} setLoggedIn={setLoggedIn}/>
                )}
            </div>
        </div>
    );
}

