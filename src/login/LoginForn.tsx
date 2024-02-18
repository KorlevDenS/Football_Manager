import './Login.css';
import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {UserLogin} from "../db_classes";

interface LoginFormProps {
    setLoggedIn(isLoggedIn: boolean): void;
}

export default function LoginForm({setLoggedIn}: LoginFormProps) {
    const [password, setPassword] = useState<string>('');
    const [login, setLogin] = useState<string>('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let userLogin = new UserLogin(login, password);

        const response = await fetch(`/user/login/${login}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLogin),
        });

        const data = await response.json();
        if (data.hasOwnProperty("accessToken")) {
            localStorage.setItem("jwtToken", data.accessToken);
            localStorage.setItem("loggedIn", "true");
            setLoggedIn(true);
        } else if (data.hasOwnProperty("exception")) {
            console.error(data);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input">
                <span className="p-float-label field">
                    <InputText required className="in" id="login" value={login}
                               onChange={e => setLogin(e.target.value)}/>
                    <label htmlFor="login">Логин</label>
                </span>
                <span className="p-float-label field">
                    <Password required className="in" inputId="password" value={password} toggleMask
                              onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="password">Пароль</label>
                </span>
                <div id="submit">
                    <Button label="Вход"/>
                </div>
            </div>
            <span className="login-link">
                Ещё нет учётной записи? <Link to="register">Регистрация</Link>
            </span>
        </form>

    );
}