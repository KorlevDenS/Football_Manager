import { CollectiveEvent } from '../../db_classes';
import './EventLayout.css';
import React, {useState} from "react";
import {Modal} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EventInfo from "./EventInfo";
import EventProcess from "./EventProcess";
import EventSelfInfo from "./EventSelfInfo";


interface EventLayoutProps {
    event: CollectiveEvent;
}

export default function EventLayout({event}: EventLayoutProps) {

    const [open, setOpen] = useState(false);
    const [information, setInformation] = useState("info");
    const infos = ["info", "process", "selfInfo"];
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const calcTimePeriod = (): string => {
        if (event.time == null) return "-";
        if (event.duration == null) return event.time;

        const firstDate = new Date("1970-01-01T" + event.time);
        const secondDate = new Date("1970-01-01T" + event.duration);
        const resultDate = new Date(firstDate.getTime() + secondDate.getHours() * 3600000 + secondDate.getMinutes() * 60000);
        return firstDate.getHours() + ":" + firstDate.getMinutes() + " - " +  resultDate.getHours() + ":" + resultDate.getMinutes();
    }


    return (
        <div>
            <div className='EventLayout' onClick={handleOpen}>
            <div id="period">
                <i className="pi pi-clock" style={{fontSize: '0.8rem'}}></i>&nbsp; {calcTimePeriod()}
            </div>
            <div id="title">
                {event.type}
            </div>
            <div id="description">
                <i className="pi pi-info-circle" style={{fontSize: '0.9rem'}}></i>&nbsp; {event.description}
            </div>
            <div id="address">
            <i className="pi pi-map-marker" style={{fontSize: '0.9rem'}}></i>&nbsp; {event.location}
            </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className = "modal_container"
            >
                <div className={"event_info"}>
                    <div id={"close-modal"}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div id={"info-container"}>
                        {information == infos[0] && (
                            <EventInfo event={event}/>
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
            </Modal>
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


