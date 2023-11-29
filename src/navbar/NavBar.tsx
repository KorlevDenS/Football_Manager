import './NavBar.css';
import ball from '../images/ball1.png';
import stadium from '../images/stadium.svg';
import event from '../images/event.png';
import player from '../images/player.png';
import timetable from '../images/timetable.png';
import stat from '../images/stat.png';
import NavRow from "./navrow/NavRow";

import React from 'react';

export default function NavBar() {

    return (
        <div className="NavBar">
            <div id="ball">
                <div id="ball-back">
                    <img src={ball} className="ball" alt="logo"/>
                </div>
            </div>
            <NavRow inlineText={"Главная"} icon_url={stadium} name={"MainPage"}/>
            <NavRow inlineText={"Расписание"} icon_url={timetable} name={"Timetable"}/>
            <NavRow inlineText={"События"} icon_url={event} name={"Events"}/>
            <NavRow inlineText={"Упражнения"} icon_url={player} name={"Exercises"}/>
            <NavRow inlineText={"Статистика"} icon_url={stat} name={"Statistics"}/>
        </div>
    );
}