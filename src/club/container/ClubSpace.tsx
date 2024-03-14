import './ClubSpace.css';
import {Club} from "../../db_classes";
import ClubHeader from "../header/ClubHeader";
import {Outlet, Route, Routes} from "react-router-dom";
import React from "react";
import Statistics from "../../container/statistics/Statistics";
import Applications from "./application/Applications";
import Participants from "./participants/Participants";
import ClubEvents from "../events/ClubEvents";
import CLubTimetable from "./timetable/ClubTimetable";
import ClubMainPage from "../mainpage/ClubMainPage";

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
                <Route path="MainPage" element={<ClubMainPage club={club} setLoggedIn={setLoggedIn}/>}/>
                <Route path="Timetable/*" element={<CLubTimetable setLoggedIn={setLoggedIn} club={club}/>}/>

                <Route path="Events/*" element={<ClubEvents setLoggedIn={setLoggedIn} club={club}/>}/>

                <Route path="Statistics" element={<Statistics/>}/>
                
                <Route path="Applications" element={<Applications club={club} setLoggedIn={setLoggedIn}/>}></Route>
                <Route path="Participants/*" element={<Participants  club={club} setLoggedIn={setLoggedIn}/>}></Route>
            </Routes>
            <Outlet/>
        </div>
    );
}