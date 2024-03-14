import './ClubEvents.css';
import {Club, ClubCollectiveEvent} from "../../db_classes";
import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Dialog} from "primereact/dialog";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import IconButton from "@mui/material/IconButton";
import ClubEventAddForm from "./ClubEventAddForm";
import ClubEventLayout from "./ClubEventLayout";
import ClubEventContainer from "./ClubEventContainer";

interface ClubEventsProps {
    club: Club;
    setLoggedIn(loggedIn: boolean): void;
}

export default function ClubEvents({club, setLoggedIn}: ClubEventsProps) {

    const [clubEvents, setClubEvents] = useState<ClubCollectiveEvent[]>([]);
    const navigate = useNavigate();
    const [showingClubEvent, setShowingClubEvent] = useState<ClubCollectiveEvent>();


    useEffect(() => {
        getClubEvents().then();
    }, []);

    const getClubEvents = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/get/club/collective/events/${club.id}`, {
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
                            .then(() => setClubEvents(eventsArray
                                .sort((a, b) =>
                                    new Date(b.collectiveEvent.date).getTime() - new Date(a.collectiveEvent.date).getTime())
                            ));
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const loadClubEventInfo = (event: ClubCollectiveEvent) => {
        let e = event;
        e.collectiveEvent.date = new Date(e.collectiveEvent.date);
        setShowingClubEvent(e);
        navigate("event/about");
    }

    const handleClose = (updateView: boolean) => {
        navigate("/club/manager/Events");
        if (updateView) getClubEvents().then();
    }

    return (
        <div className='ClubEvents'>
            <Routes>
                <Route index element={
                    <>
                        <ClubEventNav setLoggedIn={setLoggedIn} getClubEvents={getClubEvents}
                                      club={club}/>
                        {clubEvents.map(event =>
                            <ClubEventItem event={event} loadEventInfo={loadClubEventInfo} setLoggedIn={setLoggedIn}/>
                        )}
                    </>
                }></Route>
                <Route path={"event/about/*"} element={
                    <>
                        {showingClubEvent != null && (
                            <ClubEventContainer event={showingClubEvent} getEvent={getClubEvents} setLoggedIn={setLoggedIn}
                                            handleClose={handleClose} club={club}/>
                        )}
                    </>
                }></Route>
            </Routes>
        </div>
    );
}

interface ClubEventItemProps {
    event: ClubCollectiveEvent;
    loadEventInfo(event: ClubCollectiveEvent): void;
    setLoggedIn(loggedIn: boolean): void;
}

export function ClubEventItem({event, loadEventInfo}: ClubEventItemProps) {

    const getDate = () => {
        const date = new Date(event.collectiveEvent.date);
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        return date.getDate() + "." + month + "." + date.getFullYear();
    }

    return (
        <div className='club-event-item'>
            {getDate()}
            <ClubEventLayout event={event} loadEvenInfo={loadEventInfo}/>
        </div>
    );
}

interface ClubEventNavProps {
    club: Club;
    setLoggedIn(loggedIn: boolean): void;
    getClubEvents(): void;
}

function ClubEventNav({club, setLoggedIn, getClubEvents}: ClubEventNavProps) {
    const [isModalActive, setModalActive] = useState(false);

    return (
        <div className='club-event-nav'>
            <IconButton onClick={() => setModalActive(true)}>
                <LibraryAddIcon color="primary"/>
            </IconButton>

            <Dialog header="Добавление нового события" visible={isModalActive}
                    onHide={() => setModalActive(false)}>
                <ClubEventAddForm setModalActive={setModalActive} setLoggedIn={setLoggedIn}
                                  getEvents={getClubEvents} club={club}/>
            </Dialog>
        </div>
    );
}