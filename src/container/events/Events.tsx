import './Events.css';
import EventLayout from "./EventLayout";
import plus from "../../images/plus.png";
import {useState} from "react";
import {Calendar} from "primereact/calendar";
import {Button} from 'primereact/button';
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {InputNumber} from "primereact/inputnumber";


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

function EventAddForm() {
    const today = new Date();
    const [type, setType] = useState(null);
    const [name, setName] = useState("");
    const [dates, setDates]
        = useState<Date[] | undefined | null>(null);
    const [time, setTime]
        = useState<Date | null | undefined>(null);
    const [location, setLocation] = useState("");
    const [duration, setDuration]
        = useState<Date | null | undefined>(new Date(2000, 1, 1, 0, 0, 0));

    const [trainType, setTrainType] = useState("");
    const [playersAmount, setPlayersAmount]
        = useState<number | undefined | null>(null);
    const [fieldFormat, setFieldFormat] = useState("");

    const [showCustom, setShowCustom] = useState(false);
    const [showMatch, setShowMatch] = useState(false);
    const [showTrain, setShowTrain] = useState(false);


    const types = ["Тренировка", "Матч", "Своё событие"];

    function specifyForm(e: DropdownChangeEvent) {
        switch (e.value) {
            case types[1]:
                setShowTrain(false);
                setShowCustom(false);
                setShowMatch(true);
                break;
            case types[0]:
                setShowMatch(false);
                setShowCustom(false);
                setShowTrain(true);
                break;
            case types[2]: {
                setShowMatch(false);
                setShowTrain(false);
                setShowCustom(true);
                break;
            }
            default:
                setShowMatch(false);
                setShowTrain(false);
                setShowCustom(false);
        }
    }

    return (
        <div className='EventAddForm'>
            <form>
                <Dropdown value={type} onChange={(e) => {
                    setType(e.value);
                    specifyForm(e)
                }}
                          options={types}
                          placeholder="Выберите тип события" className="w-full md:w-14rem"/><br/>
                <Calendar placeholder="Дата" value={dates}
                          onChange={(e) => setDates(e.value)}
                          selectionMode="multiple" required dateFormat="dd/mm/yy"/>
                <Button label="Clear" icon="pi pi-times" onClick={() => setDates(null)}/><br/>
                <Calendar placeholder="Время начала" value={time}
                          onChange={(e) => setTime(e.value)} timeOnly/><br/>
                <InputText placeholder="Название" value={name}
                           onChange={(e) => setName(e.target.value)}/><br/>
                <InputText placeholder="Адрес" value={location}
                           onChange={(e) => setLocation(e.target.value)}/><br/>
                <Calendar placeholder="Продолжительность" value={duration}
                          onChange={(e) => setDuration(e.value)} timeOnly/><br/>
                {showTrain && (
                    <>
                        <InputText placeholder="Тип тренировки" value={trainType}
                                   onChange={(e) => setTrainType(e.target.value)}/><br/>
                        <InputNumber placeholder="Количество игроков" value={playersAmount}
                                     onValueChange={(e) => setPlayersAmount(e.value)}/><br/>
                        <InputText placeholder="Вид поля" value={fieldFormat}
                                   onChange={(e) => setFieldFormat(e.target.value)}/><br/>
                    </>

                )}

                {showMatch && (
                    <div></div>
                )}

                {showCustom && (
                    <div></div>
                )}
            </form>
        </div>
    );
}