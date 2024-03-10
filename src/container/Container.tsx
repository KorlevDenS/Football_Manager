import './Container.css';
import Header from "../header/Header";
import Timetable from "./timetable/Timetable";
import MainPage from "./mainpage/MainPage";
import Statistics from "./statistics/Statistics";
import Exercises from "./exersises/Exercises";
import Events from "./events/Events";
import {Routes, Route, Outlet} from "react-router-dom";
import React from "react";
import Profile from "./profile/Profile";
import Clubs from "./clubs/Clubs";
import {Club} from "../db_classes";

interface ContainerProps {
    setClub(club: Club): void;
    setExitPath(exitPath: string): void;
    setLoggedIn(isLoggedIn: boolean): void;
}
export default function Container({setClub, setExitPath, setLoggedIn}: ContainerProps) {



    return (
        <div className="Container">
            <Header/>
            <Routes>
                <Route path="MainPage" element={<MainPage/>}/>
                <Route path="Timetable/*" element={<Timetable setLoggedIn={setLoggedIn}/>}/>
                <Route path="Exercises/*" element={<Exercises setLoggedIn={setLoggedIn}/>}/>
                <Route path="Events/*" element={<Events setLoggedIn={setLoggedIn}/>}/>
                <Route path="Statistics" element={<Statistics/>}/>
                <Route path="Profile" element={<Profile setLoggedIn={setLoggedIn}/>}/>
                <Route path="Clubs/*" element={<Clubs setLoggedIn={setLoggedIn} setClub={setClub} setExitPath={setExitPath}/>}/>
            </Routes>
            <Outlet/>
        </div>
    );
}