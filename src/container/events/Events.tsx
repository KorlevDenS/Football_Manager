import './Events.css';
import EventLayout from "./EventLayout";
import plus from "../../images/plus.png";
import React, {useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import EventAddForm from "./EventAddForm";
import {CollectiveEvent} from "../../db_classes";
import {Route, Routes, useNavigate} from "react-router-dom";
import EventContainer from "./EventContainer";

interface EventAddProps {
    setLoggedIn(loggedIn: boolean): void;
}

export default function Events({setLoggedIn}: EventAddProps) {

    const [events, setEvents] = useState<CollectiveEvent[]>([]);
    const navigate = useNavigate();
    const [showingEvent, setShowingEvent] = useState<CollectiveEvent>();


    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/get/collective/events`, {
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
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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

    const loadEventInfo = (event: CollectiveEvent) => {
        setShowingEvent(event);
        navigate("event/info");
    }

    return (
        <div className='Events'>
            <EventNav setLoggedIn={setLoggedIn} getEvents={getEvents}/>
            <Routes>
                <Route index element={
                    <>
                        {events.map(event =>
                            <EventItem event={event} loadEventInfo={loadEventInfo} setLoggedIn={setLoggedIn}/>
                        )}
                    </>
                }></Route>
                <Route path={"event/info"} element={
                    <>
                        {showingEvent != null && (
                            <EventContainer event={showingEvent} setLoggedIn={setLoggedIn}
                                            handleClose={() => navigate("/manager/Events")}/>
                        )}
                    </>
                }></Route>
            </Routes>
        </div>
    );
}

interface EventItemProps {
    event: CollectiveEvent;
    loadEventInfo(event: CollectiveEvent): void;
    setLoggedIn(loggedIn: boolean): void;
}

function EventItem({event, loadEventInfo}: EventItemProps) {

    const getDate = () => {
        const date = new Date(event.date);
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        return date.getDate() + "." + month + "." + date.getFullYear();
    }

    return (
        <div className='event-item'>
            {getDate()}
            <EventLayout event={event} loadEvenInfo={loadEventInfo}/>
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