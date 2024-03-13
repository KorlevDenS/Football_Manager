import './ClubNavBar.css';
import ball from "../../images/club.png";
import stadium from "../../images/stadium.svg";
import timetable from "../../images/timetable.png";
import event from "../../images/event.png";
import player from "../../images/player.png";
import stat from "../../images/stat.png";
import apps from "../../images/apps.png";
import participants from "../../images/participants.png";
import ClubNavRow from "./ClubNavRow";


export default function ClubNavBar() {
    const parentPath = "/club/manager/";

    return (
        <div className="ClubNavBar">
            <div id="CBall">
                <div >
                    <img src={ball}  alt="logo"/>
                </div>
            </div>
            <ClubNavRow inlineText={"Главная"} icon_url={stadium} name={parentPath + "MainPage"}/>
            <ClubNavRow inlineText={"Расписание"} icon_url={timetable} name={parentPath + "Timetable"}/>
            <ClubNavRow inlineText={"События"} icon_url={event} name={parentPath + "Events"}/>
            <ClubNavRow inlineText={"Упражнения"} icon_url={player} name={parentPath + "Exercises"}/>
            <ClubNavRow inlineText={"Статистика"} icon_url={stat} name={parentPath + "Statistics"}/>

            <ClubNavRow inlineText={"Заявки"} name={parentPath + "Applications"} icon_url={apps}/>
            <ClubNavRow inlineText={"Участники"} name={parentPath + "Participants"} icon_url={participants}/>
        </div>
    );
}