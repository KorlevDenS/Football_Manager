import './EventContainer.css';
import {CollectiveEvent} from "../../db_classes";
import EventInfo from "./EventInfo";
import EventProcess from "./EventProcess";
import EventSelfInfo from "./EventSelfInfo";
import React from "react";
import {Route, Routes} from "react-router-dom";


interface EventContainerProps {
    event: CollectiveEvent;
    setLoggedIn(loggedIn: boolean): void;
    getEvent(): void;
    handleClose(updateView: boolean): void;
}

export default function EventContainer({event, handleClose, getEvent, setLoggedIn}: EventContainerProps) {

    return (
        <div className={"event_info"}>
            <div id={"info-container"}>
                <Routes>
                    <Route index element={
                        <>
                            <EventInfo event={event} handleClose={handleClose} getEvent={getEvent} setLoggedIn={setLoggedIn}/>
                        </>
                    }></Route>
                    <Route path={"process/*"} element={
                        <>
                            <EventProcess event={event} handleClose={handleClose} setLoggedIn={setLoggedIn}/>
                        </>
                    }></Route>
                    <Route path={"selfInfo"} element={
                        <>
                            <EventSelfInfo event={event} handleClose={handleClose} setLoggedIn={setLoggedIn}/>
                        </>
                    }></Route>
                </Routes>
            </div>
        </div>
    );
}

