import "./Login.css";
import React from "react";
import {Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForn";
import RegistrationForm from "./RegistrationFrom";

interface LoginProps {
    setLoggedIn(isLoggedIn: boolean): void;
}

export default function Login({setLoggedIn}: LoginProps) {


    return (
        <div className="Login">
            <div className="login-form">
                <Routes>
                    <Route index element={<LoginForm setLoggedIn={setLoggedIn}/>}/>
                    <Route path="register/*" element={<RegistrationForm setLoggedIn={setLoggedIn}/>}/>
                </Routes>
            </div>
        </div>
    );
}