import './Container.css';
import Header from "../header/Header";
import Timetable from "./timetable/Timetable";
import MainPage from "./mainpage/MainPage";
import Statistics from "./statistics/Statistics";
import Exercises from "./exersises/Exercises";
import Events from "./events/Events";
import {Routes, Route} from "react-router-dom";

export default function Container() {

    return (
        <div className="Container">
            <Header/>
            <Routes>
                <Route path="MainPage" element={<MainPage/>}/>
                <Route path="Timetable" element={<Timetable/>}/>
                <Route path="Exercises" element={<Exercises/>}/>
                <Route path="Events" element={<Events/>}/>
                <Route path="Statistics" element={<Statistics/>}/>
            </Routes>
        </div>
    );
}