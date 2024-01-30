import { CollectiveEvent } from '../../db_classes';
import './EventLayout.css';
import React, {useState} from "react";
import {Box, Modal} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {InputText} from "primereact/inputtext";


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
                            <>
                                INFO
                            </>
                        )}
                        {information == infos[1] && (
                            <>
                                PROCESS
                            </>
                        )}
                        {information == infos[2] && (
                            <>
                                SELF_INFO
                            </>
                        )}

                    </div>
                    <div id={"info-navigate"}>
                        {information == infos[0] && (
                            <>
                                <div id={"left-button"}>
                                    <Button onClick={() => setInformation(infos[2])} startIcon={<ArrowBackIosIcon/>}>
                                        Личная оценка
                                    </Button>
                                </div>
                                <div id={"right-button"}>
                                    <Button onClick={() => setInformation(infos[1])} endIcon={<ArrowForwardIosIcon/>}>
                                        Процесс
                                    </Button>
                                </div>
                            </>
                        )}
                        {information == infos[1] && (
                            <>
                                <div id={"left-button"}>
                                    <Button onClick={() => setInformation(infos[0])} startIcon={<ArrowBackIosIcon/>}>
                                        Информация
                                    </Button>
                                </div>
                                <div id={"right-button"}>
                                    <Button onClick={() => setInformation(infos[2])} endIcon={<ArrowForwardIosIcon/>}>
                                        Личная оценка
                                    </Button>
                                </div>
                            </>
                        )}
                        {information == infos[2] && (
                            <>
                                <div id={"left-button"}>
                                    <Button onClick={() => setInformation(infos[1])} startIcon={<ArrowBackIosIcon/>}>
                                        Процесс
                                    </Button>
                                </div>
                                <div id={"right-button"}>
                                    <Button onClick={() => setInformation(infos[0])} endIcon={<ArrowForwardIosIcon/>}>
                                        Информация
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );

}

function InfoNav() {

    return (
        <div>

        </div>
    );
}


