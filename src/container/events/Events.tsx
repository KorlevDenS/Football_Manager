import './Events.css';
import EventLayout from "./EventLayout";
import plus from "../../images/plus.png";
import {useState} from "react";
import {Dialog} from "primereact/dialog";
import EventAddForm from "./EventAddForm";
import {Button} from "primereact/button";


export default function Events() {
    return (
        <div className='Events'>
            <EventNav/>
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

function EventNav() {
    const [isModalActive, setModalActive] = useState(false);

    return (
        <div className='event-nav'>
            <button className='add-button' onClick={() => setModalActive(true)}>
                <img id='plus-image' src={plus} alt="+"/>
            </button>
            <Dialog header="Добавление нового события" visible={isModalActive}
                    onHide={() => setModalActive(false)}>
                <EventAddForm/>
            </Dialog>
        </div>
    );
}