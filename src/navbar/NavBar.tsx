import './NavBar.css';
import ball from '../images/ball1.png';
import stadium from '../images/stadium.svg';
import event from '../images/event.png';
import player from '../images/player.png';
import timetable from '../images/timetable.png';
import stat from '../images/stat.png';
import clubs from '../images/clubs.png';
import NavRow from "./NavRow";

export default function NavBar() {
    const parentPath = "/manager/";


    return (
        <div className="NavBar">
            <div id="ball">
                <div id="ball-back">
                    <img src={ball} className="ball" alt="logo"/>
                </div>
            </div>
            <NavRow inlineText={"Главная"} icon_url={stadium} name={parentPath + "MainPage"}/>
            <NavRow inlineText={"Расписание"} icon_url={timetable} name={parentPath + "Timetable"}/>
            <NavRow inlineText={"События"} icon_url={event} name={parentPath + "Events"}/>
            <NavRow inlineText={"Упражнения"} icon_url={player} name={parentPath + "Exercises"}/>
            <NavRow inlineText={"Статистика"} icon_url={stat} name={parentPath + "Statistics"}/>
            <NavRow inlineText={"Клубы"} icon_url={clubs} name={parentPath + "Clubs"}/>
        </div>
    );
}