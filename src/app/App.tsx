import './App.css';
import React, {useEffect, useState} from "react";
import Container from "../container/Container";
import NavBar from "../navbar/NavBar";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "../login/Login";

export default function App() {
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

            {loggedIn && (
                <NavBar/>
            )}
            <Routes>
                <Route path="manager/*" element={<Container setLoggedIn={setLoggedIn}/>}/>
                <Route path="auth/*" element={<Login setLoggedIn={setLoggedIn}/>}/>
            </Routes>
        </div>
    );
}