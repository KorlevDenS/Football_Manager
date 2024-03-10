import './App.css';
import React, {useEffect, useState} from "react";
import Container from "../container/Container";
import NavBar from "../navbar/NavBar";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "../login/Login";
import {Club} from "../db_classes";
import ClubSpace from "../club/container/ClubSpace";
import ClubNavBar from "../club/navbar/ClubNavBar";

export default function App() {
    const [club, setClub]
        = useState<Club>(new Club("name", new Date(), new Date(), "", "", ""));
    const [exitPath, setExitPath] = useState("");
    const [loggedIn, setLoggedIn]
        = useState(localStorage.getItem("loggedIn") === "true");
    const navigate = useNavigate();


    useEffect(() => {
        if (loggedIn) {
            navigate("manager/MainPage", {replace: false});
        } else {
            navigate("auth", {replace: false});
        }
    }, [loggedIn]);


    return (
        <div className="App">

            <Routes>
                <Route path={"/*"} element={
                    <>
                        {loggedIn && (
                            <NavBar/>
                        )}
                        <Routes>
                            <Route path="manager/*" element={<Container setLoggedIn={setLoggedIn} setClub={setClub} setExitPath={setExitPath}/>}/>
                            <Route path="auth/*" element={<Login setLoggedIn={setLoggedIn}/>}/>
                        </Routes>
                    </>
                }></Route>
                <Route path={"club/manager/*"} element={
                    <>
                        <ClubNavBar/>
                        <ClubSpace setLoggedIn={setLoggedIn} club={club} exitPath={exitPath}/>
                    </>
                }></Route>
            </Routes>
        </div>
    );
}