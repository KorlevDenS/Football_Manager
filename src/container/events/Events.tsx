import './Events.css';
import EventLayout from "./EventLayout";
import plus from "../../images/plus.png";
import {useState} from "react";
import {Dialog} from "primereact/dialog";
import EventAddForm from "./EventAddForm";
import {Button} from "primereact/button";

interface EventAddProps {
    setLoggedIn(loggedIn: boolean): void;
}

export default function Events({setLoggedIn}: EventAddProps) {
    return (
        <div className='Events'>
            <EventNav setLoggedIn={setLoggedIn}/>
            <EventItem/>
            <EventItem/>
            <EventItem/>
            <EventItem/>
            <EventItem/>
            <EventItem/>
            <EventItem/>
            <EventItem/>
            <EventItem/>
            <EventItem/>
        </div>
    );
}

function EventItem() {
    return (
        <div className='event-item'>
            <EventLayout/>
        </div>
    );
}

function EventNav({setLoggedIn}: EventAddProps) {
    const [isModalActive, setModalActive] = useState(false);

    return (
        <div className='event-nav'>
            <button className='add-button' onClick={() => setModalActive(true)}>
                <img id='plus-image' src={plus} alt="+"/>
            </button>
            <Dialog header="Добавление нового события" visible={isModalActive}
                    onHide={() => setModalActive(false)}>
                <EventAddForm setModalActive={setModalActive} setLoggedIn={setLoggedIn}/>
            </Dialog>
        </div>
    );
}