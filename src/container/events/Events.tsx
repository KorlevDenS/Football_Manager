import './Events.css';
import EventLayout from "./EventLayout";
import plus from "../../images/plus.png";
import React, {useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import EventAddForm from "./EventAddForm";
import {AddUserEventRequest, CollectiveEvent, Custom, Match,
    PlayerCustom, PlayerMatch, PlayerTraining, Training} from "../../db_classes";

interface EventAddProps {
    setLoggedIn(loggedIn: boolean): void;
}

export default function Events({setLoggedIn}: EventAddProps) {

    const [events, setEvents] = useState<CollectiveEvent[]>([]);


    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/new/event/get`, {
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
                        .then(() => setEvents(eventsArray
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        ));

                    data.then(value => {console.log(value)});
                    //setModalActive(false);


                } else if (response.status === 401) {
                    setLoggedIn(false);
                    localStorage.setItem("loggedIn", "false");
                }
            }
        );
    }

    return (
        <div className='Events'>
            <EventNav setLoggedIn={setLoggedIn} getEvents={getEvents}/>
            {events.map(event =>
                <EventItem event={event}/>
            )}
        </div>
    );
}

interface EventItemProps {
    event: CollectiveEvent;
}

function EventItem({event}: EventItemProps) {

    const getDate = () => {
        const date = new Date(event.date);
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        return date.getDate() + "." + month + "." + date.getFullYear();
    }

    return (
        <div className='event-item'>
            {getDate()}
            <EventLayout event={event}/>
        </div>
    );
}

interface EventNavProps {
    setLoggedIn(loggedIn: boolean): void;
    getEvents(): void;
}

function EventNav({setLoggedIn, getEvents}: EventNavProps) {
    const [isModalActive, setModalActive] = useState(false);

    return (
        <div className='event-nav'>
            <button className='add-button' onClick={() => setModalActive(true)}>
                <img id='plus-image' src={plus} alt="+"/>
            </button>
            <Dialog header="Добавление нового события" visible={isModalActive}
                    onHide={() => setModalActive(false)}>
                <EventAddForm setModalActive={setModalActive} setLoggedIn={setLoggedIn} getEvents={getEvents}/>
            </Dialog>
        </div>
    );
}