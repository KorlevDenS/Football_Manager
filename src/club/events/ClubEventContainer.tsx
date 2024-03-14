import '../../container/events/EventContainer.css';
import {Club, ClubCollectiveEvent} from "../../db_classes";
import {Route, Routes} from "react-router-dom";
import React from "react";
import ClubEventInfo from "./ClubEventInfo";
import ClubEventProcess from "./ClubEventProcess";

interface ClubEventContainerProps {
    club: Club;
    event: ClubCollectiveEvent;
    setLoggedIn(loggedIn: boolean): void;
    getEvent(): void;
    handleClose(updateView: boolean): void;
}

export default function ClubEventContainer({club, event, handleClose, getEvent, setLoggedIn}: ClubEventContainerProps) {

    return (
        <div className={"event_info"}>
            <div id={"info-container"}>
                <Routes>
                    <Route index element={
                        <>
                            <ClubEventInfo event={event} handleClose={handleClose} getEvent={getEvent}
                                           setLoggedIn={setLoggedIn} club={club}/>
                        </>
                    }></Route>
                    <Route path={"process/*"} element={
                        <>
                            <ClubEventProcess event={event} handleClose={handleClose} setLoggedIn={setLoggedIn}/>
                        </>
                    }></Route>
                </Routes>
            </div>
        </div>
    );
}