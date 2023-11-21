import './NavBar.css';
import ball from '../images/ball.png';
import stadium from '../images/stadium.svg';
import event from '../images/event.png';
import player from '../images/player.png';
import timetable from '../images/timetable.png';
import stat from '../images/stat.png';
import NavRow from "./navrow/NavRow";

interface NavBarProps {
    onChange(selectedSection: string): void;
}

export default function NavBar({onChange}: NavBarProps) {


    const handleChange = (selectedSection: string) => {
        onChange(selectedSection);
    }

    return (
        <div className="NavBar">
            <div id="ball">
                <img src={ball} className="ball" alt="logo"/>
            </div>
            <NavRow inlineText={"Главная"} icon_url={stadium} name={"MainPage"} onChange={handleChange}/>
            <NavRow inlineText={"Расписание"} icon_url={timetable} name={"Timetable"} onChange={handleChange}/>
            <NavRow inlineText={"События"} icon_url={event} name={"Events"} onChange={handleChange}/>
            <NavRow inlineText={"Упражнения"} icon_url={player} name={"Exercises"} onChange={handleChange}/>
            <NavRow inlineText={"Статистика"} icon_url={stat} name={"Statistics"} onChange={handleChange}/>
        </div>
    );
}