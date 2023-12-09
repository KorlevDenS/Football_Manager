import './Container.css';
import Header from "../header/Header";
import Timetable from "./timetable/Timetable";
import MainPage from "./mainpage/MainPage";
import Statistics from "./statistics/Statistics";
import Exercises from "./exersises/Exercises";
import Events from "./events/Events";
import {Routes, Route, Outlet, useNavigate} from "react-router-dom";
import React from "react";
import Profile from "./profile/Profile";

interface ContainerProps {
    setLoggedIn(isLoggedIn: boolean): void;
}
export default function Container({setLoggedIn}: ContainerProps) {
    const navigate = useNavigate();


    const goTo = (to: string) => {
        navigate(to, {replace: false});
    }


    return (
        <div className="Container">
            <Header/>
            <Routes>
                <Route path="MainPage" element={<MainPage/>}/>
                <Route path="Timetable" element={<Timetable/>}/>
                <Route path="Exercises" element={<Exercises/>}/>
                <Route path="Events" element={<Events setLoggedIn={setLoggedIn}/>}/>
                <Route path="Statistics" element={<Statistics/>}/>
                <Route path="Profile" element={<Profile setLoggedIn={setLoggedIn}/>}/>
            </Routes>
            <Outlet/>
        </div>
    );
}