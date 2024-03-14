import React, {useEffect, useState} from "react";
import './MainPage.css';
import {CollectiveEvent, Human} from "../../db_classes";
import {EventItem} from "../events/Events";

interface MainPageProps {
    setLoggedIn(isLoggedIn: boolean): void;
}

export default function MainPage({setLoggedIn}: MainPageProps) {

    const [human, setHuman] =
        useState<Human>(new Human("", "", "", new Date(), "", ""));
    const [events, setEvents] = useState<CollectiveEvent[]>([]);

    useEffect(() => {
        getHuman().then();
        let d = new Date();
        let today = "" + d.getDate() +'.' + (d.getMonth()+1) + '.'+ d.getFullYear();
        getEventsByTimePeriod(today, today).then();
    }, []);

    const getHuman = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/user/get/human", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                    if (response.ok) {
                        const data = response.json();
                        let newHuman: Human;
                        data.then(value => {
                            newHuman = value as Human
                        })
                            .then(() => {
                                newHuman.birthday = new Date(newHuman.birthday)
                            })
                            .then(() => {
                                setHuman(newHuman);
                            });
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const getEventsByTimePeriod = async (begin: string, end: string) => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/get/collective/events/${begin}/${end}`, {
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

                        let eventsArray: CollectiveEvent[];
                        data.then(value => {eventsArray = value as CollectiveEvent[]})
                            .then(() => setEvents(eventsArray));
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    return (
        <div className="MainPage">
            <div className="me-welcome">
                Добро пожаловать, <br/> {human.surname} {human.name} {human.patronymic} !
            </div>

            <div>
                {events.length == 0 && <div className="me-today-info">На сегодня событий не запланировано</div>}
                {events.length != 0 && <div className="me-today-info">События сегодня:</div>}
            </div>

            <div className="me-today-events">
                {events.map(event =>
                    <EventItem event={event} loadEventInfo={() => {
                    }} setLoggedIn={setLoggedIn}/>
                )}
            </div>
        </div>
    );
}