import './EventContainer.css';
import {CollectiveEvent} from "../../db_classes";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EventInfo from "./EventInfo";
import EventProcess from "./EventProcess";
import EventSelfInfo from "./EventSelfInfo";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useNavigate} from "react-router-dom";


interface EventContainerProps {
    event: CollectiveEvent;
    setLoggedIn(loggedIn: boolean): void;
    handleClose(): void;
}

export default function EventContainer({event, handleClose, setLoggedIn}: EventContainerProps) {

    const [information, setInformation] = useState("info");
    const infos = ["info", "process", "selfInfo"];


    return (
        <div className={"event_info"}>
            <div id={"close-modal"}>
                <IconButton onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div id={"info-container"}>
                {information == infos[0] && (
                    <EventInfo event={event} setLoggedIn={setLoggedIn}/>
                )}
                {information == infos[1] && (
                    <EventProcess event={event}/>
                )}
                {information == infos[2] && (
                    <EventSelfInfo event={event}/>
                )}

            </div>
            <div id={"info-navigate"}>
                {information == infos[0] && (
                    <InfoNav leftType={infos[2]} leftText={"Личная оценка"} rightType={infos[1]}
                             rightText={"Процесс"} setInformation={setInformation}/>
                )}
                {information == infos[1] && (
                    <InfoNav leftType={infos[0]} leftText={"Информация"} rightType={infos[2]}
                             rightText={"Личная оценка"} setInformation={setInformation}/>
                )}
                {information == infos[2] && (
                    <InfoNav leftType={infos[1]} leftText={"Процесс"} rightType={infos[0]}
                             rightText={"Информация"} setInformation={setInformation}/>
                )}
            </div>
        </div>
    );

}

interface InfoNavProps {
    leftText: string;
    rightText: string;
    leftType: string;
    rightType: string;
    setInformation(type: string): void;

}

function InfoNav({leftText, rightText, leftType, rightType, setInformation}: InfoNavProps) {

    return (
        <>
            <div id={"left-button"}>
                <Button onClick={() => setInformation(leftType)} startIcon={<ArrowBackIosIcon/>}>
                    {leftText}
                </Button>
            </div>
            <div id={"right-button"}>
                <Button onClick={() => setInformation(rightType)} endIcon={<ArrowForwardIosIcon/>}>
                    {rightText}
                </Button>
            </div>
        </>
    );
}