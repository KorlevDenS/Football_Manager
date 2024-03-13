import './ClubSpace.css';
import {Club} from "../../db_classes";
import ClubHeader from "../header/ClubHeader";
import {Outlet, Route, Routes} from "react-router-dom";
import React from "react";
import MainPage from "../../container/mainpage/MainPage";
import Timetable from "../../container/timetable/Timetable";
import Exercises from "../../container/exersises/Exercises";
import Events from "../../container/events/Events";
import Statistics from "../../container/statistics/Statistics";
import Applications from "./application/Applications";
import Participants from "./participants/Participants";

interface ClubSpaceProps {
    club: Club;
    exitPath: string;
    setLoggedIn(isLoggedIn: boolean): void;
}

export default function ClubSpace({club, exitPath, setLoggedIn}: ClubSpaceProps) {


    return (
        <div className="ClubSpace">
            <ClubHeader exitPath={exitPath}/>
            <Routes>
                <Route path="MainPage" element={<MainPage/>}/>
                <Route path="Timetable/*" element={<Timetable setLoggedIn={setLoggedIn}/>}/>
                <Route path="Exercises/*" element={<Exercises setLoggedIn={setLoggedIn}/>}/>
                <Route path="Events/*" element={<Events setLoggedIn={setLoggedIn}/>}/>
                <Route path="Statistics" element={<Statistics/>}/>
                
                <Route path="Applications" element={<Applications club={club} setLoggedIn={setLoggedIn}/>}></Route>
                <Route path="Participants/*" element={<Participants  club={club} setLoggedIn={setLoggedIn}/>}></Route>
            </Routes>
            <Outlet/>
        </div>
    );
}