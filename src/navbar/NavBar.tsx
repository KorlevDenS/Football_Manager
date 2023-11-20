import './NavBar.css';
import ball from '../images/ball.png';
import stadium from '../images/stadium.svg';
import event from '../images/event.png';
import player from '../images/player.png';
import timetable from '../images/timetable.png';
import stat from '../images/stat.png';
import NavRow from "./navrow/NavRow";
export default function NavBar() {



    return (
        <div className="NavBar">
            <div id="ball">
                <img src={ball} className="ball" alt="logo"/>
            </div>
            <NavRow inlineText={"Главная"} icon_url={stadium} goTo={() => {console.log("MainPage")}}/>
            <NavRow inlineText={"Расписание"} icon_url={timetable} goTo={() => {console.log("Timetable")}}/>
            <NavRow inlineText={"События"} icon_url={event} goTo={() => {console.log("Events")}}/>
            <NavRow inlineText={"Упражнения"} icon_url={player} goTo={() => {console.log("Exercises")}}/>
            <NavRow inlineText={"Статистика"} icon_url={stat} goTo={() => {console.log("Statistics")}}/>
        </div>
    );
}