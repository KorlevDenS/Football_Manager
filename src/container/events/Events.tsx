import './Events.css';
import EventLayout from "./EventLayout";
import plus from "../../images/plus.png";
import {useState} from "react";
import Modal from "../../modal/Modal";
import {Button, Form} from "reactstrap";




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

    const handleModalOpen = () => {
        setModalActive(true);
    };
    const handleModalClose = () => {
        setModalActive(false);
    };

    return (
        <div className='event-nav'>
            <button className='add-button' onClick={handleModalOpen}>
                <img id='plus-image' src={plus} alt="+"/>
            </button>
            <div>
                {isModalActive && (
                    <Modal title="some modal title" onClose={handleModalClose}>
                        <EventAddForm/>
                    </Modal>
                )}
            </div>
        </div>
    );
}

function EventAddForm() {


    return (
        <div className='EventAddForm'>
            <form>

            </form>
        </div>
    );
}