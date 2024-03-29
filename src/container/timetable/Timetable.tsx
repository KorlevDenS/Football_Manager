import './Timetable.css';
import right_arrow from '../../images/rightarrow.png';
import left_arrow from '../../images/arrowpointingleft.png';
import React, {useEffect, useRef, useState} from "react";
import EventLayout from "../events/EventLayout";
import {CollectiveEvent} from "../../db_classes";
import {Route, Routes, useNavigate} from "react-router-dom";
import EventContainer from "../events/EventContainer";

enum Actions {
    INC_OFFSET,
    DEC_OFFSET,
    SET_TO_ZERO_OFFSET
}

interface TimeTableProps {
    setLoggedIn(loggedIn: boolean): void;
}

export default function Timetable({setLoggedIn}: TimeTableProps) {
    const [weekOffset, setWeekOffset] = useState(0);
    const [events, setEvents] = useState<CollectiveEvent[]>([]);
    const [eventsSchedule, setEventsSchedule] = useState<Array<Array<CollectiveEvent>>>([]);
    const [week, setWeek] = useState<Date[]>(calcWeek(weekOffset));
    const navigate = useNavigate();
    const [showingEvent, setShowingEvent] = useState<CollectiveEvent>();

    const incDecZeroOffset = (action: Actions) => {
        switch (action) {
            case Actions.INC_OFFSET:
                setWeekOffset(weekOffset + 1);
                break;
            case Actions.DEC_OFFSET:
                setWeekOffset(weekOffset - 1);
                break;
            case Actions.SET_TO_ZERO_OFFSET:
                setWeekOffset(0);
                break;
            default:
                setWeekOffset(0);
        }
    }


    useEffect(() => {
        loadTimetable();
    }, [weekOffset]);


    const loadTimetable = () => {
        let weekNow = calcWeek(weekOffset);
        setWeek(weekNow);
        const begin = weekNow[0].getDate() + '.' + (weekNow[0].getMonth() + 1) + '.' + weekNow[0].getFullYear();
        const end = weekNow[6].getDate() + '.' + (weekNow[6].getMonth() + 1) + '.' + weekNow[6].getFullYear();
        getEventsByTimePeriod(begin, end).then();
    }


    const formWeekSchedule = (events: CollectiveEvent[]) => {
        let schedule: CollectiveEvent[][] = [];
        for (let i = 0; i < 7; i++) {
            let arr: CollectiveEvent[] = [];
            console.log(i);
            for (let j = 0; j < events.length; j++) {
                if (new Date(events[j].date).getDay() === i) arr.push(events[j]);
            }
            schedule.push(arr);
        }
        console.log(schedule);
        return schedule;
    }


    const getEventsByTimePeriod = async (begin: string, end: string) => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/event/get/collective/events/${begin}/${end}`, {
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

                        let eventsArray: CollectiveEvent[];
                        data.then(value => {eventsArray = value as CollectiveEvent[]})
                            .then(() => setEvents(eventsArray
                                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            )).then(() => setEventsSchedule(formWeekSchedule(eventsArray)));
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const loadEventInfo = (event: CollectiveEvent) => {
        let e = event;
        e.date = new Date(e.date);
        setShowingEvent(e);
        navigate("event/about");
    }

    const handleClose = (updateView: boolean) => {
        navigate("/manager/Timetable");
        if (updateView) loadTimetable();
    }

    return (
        <div className='Timetable'>
            <Routes>
                <Route index element={
                    <>
                        <TimeNav monday={week[0]} sunday={week[6]} incDecZeroOffset={incDecZeroOffset}/>
                        <div className='table-body'>
                            <DaysLayout day={week[0]} dayEvents={eventsSchedule[1]} loadEventInfo={loadEventInfo}/>
                            <DaysLayout day={week[1]} dayEvents={eventsSchedule[2]} loadEventInfo={loadEventInfo}/>
                            <DaysLayout day={week[2]} dayEvents={eventsSchedule[3]} loadEventInfo={loadEventInfo}/>
                            <DaysLayout day={week[3]} dayEvents={eventsSchedule[4]} loadEventInfo={loadEventInfo}/>
                            <DaysLayout day={week[4]} dayEvents={eventsSchedule[5]} loadEventInfo={loadEventInfo}/>
                            <DaysLayout day={week[5]} dayEvents={eventsSchedule[6]} loadEventInfo={loadEventInfo}/>
                            <DaysLayout day={week[6]} dayEvents={eventsSchedule[0]} loadEventInfo={loadEventInfo}/>
                        </div>
                    </>
                }></Route>
                <Route path={"event/about/*"} element={
                    <>
                        {showingEvent != null && (
                            <EventContainer event={showingEvent} getEvent={loadTimetable} setLoggedIn={setLoggedIn}
                                            handleClose={handleClose}/>
                        )}
                    </>
                }></Route>
            </Routes>
        </div>
    );
}

interface DaysLayoutProps {
    day: Date;
    dayEvents: Array<CollectiveEvent>;
    loadEventInfo(event: CollectiveEvent): void;
}

function DaysLayout({day, dayEvents, loadEventInfo}: DaysLayoutProps) {
    const ref = useRef(null);

    let weekDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

    let active;

    if ((day.getDate() === (new Date()).getDate())
        && (day.getMonth() === (new Date()).getMonth())
        && (day.getFullYear() === (new Date()).getFullYear())) {
        active = 1;
    } else {
        active = 0;
    }

    return (
        <div ref={ref} id='cell' className='DayLayout' style={{backgroundColor: active ? "lightcyan" : ""}}>
            {day?.getDate()}, {weekDays[day?.getDay()]}
            <hr className='separator'/>
            {dayEvents?.map(event =>
                <EventLayout event={event} loadEvenInfo={loadEventInfo}/>
            )}
        </div>
    );
}

interface TimeNavProps {
    monday: Date;
    sunday: Date;

    incDecZeroOffset(action: Actions): void;
}

function TimeNav({monday, sunday, incDecZeroOffset}: TimeNavProps) {

    let months = ["января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"];

    let month_name;
    let year;
    let ending_month_name;
    let ending_year;


    month_name = months[sunday.getMonth()];
    if (monday.getMonth() !== sunday.getMonth()) {
        ending_month_name = " " + months[monday.getMonth()];
    }
    year = sunday.getFullYear();
    if (monday.getFullYear() !== sunday.getFullYear()) {
        ending_year = " " + monday.getFullYear();
    }

    return (
        <div className='time_nav'>
            <div className='current-week' onClick={() => incDecZeroOffset(Actions.SET_TO_ZERO_OFFSET)}>
                Текущая неделя
            </div>
            <div className='arrow' onClick={() => incDecZeroOffset(Actions.DEC_OFFSET)}>
                <img src={left_arrow} alt='prev'/>
            </div>
            <div className='arrow'>
                <img src={right_arrow} alt='next' onClick={() => incDecZeroOffset(Actions.INC_OFFSET)}/>
            </div>
            <div>
                {monday?.getDate()}{ending_month_name}{ending_year} - {sunday?.getDate()} {month_name} {year} г.
            </div>
        </div>
    );
}

function calcWeek(offset: number): Date[] {

    let week: Date[] = Array(7);

    let currentDate = new Date();
    let weekDayNumber = currentDate.getDay();

    let day = new Date();
    if (weekDayNumber === 0) {
        day.setDate(currentDate.getDate() - 6);
    } else {
        day.setDate(currentDate.getDate() - weekDayNumber + 1);
    }

    day.setTime(day.getTime() + (86400000 * 7 * offset));
    week[0] = new Date(day);

    for (let i = 1; i < 7; i++) {
        day.setTime(day.getTime() + 86400000);
        week[i] = new Date(day);
    }

    return week;
}