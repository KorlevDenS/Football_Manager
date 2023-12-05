import {Password} from "primereact/password";
import "./Login.css";
import React, {useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import * as dns from "dns";

interface LoginProps {
    setLoggedIn(isLoggedIn: boolean): void;
}

export default function Login({setLoggedIn}: LoginProps) {


    return (
        <div className="Login">
            <div className="login-form">
                <Routes>
                    <Route index element={<LoginForm setLoggedIn={setLoggedIn}/>}/>
                    <Route path="register" element={<RegistrationForm setLoggedIn={setLoggedIn}/>}/>
                </Routes>
            </div>
        </div>
    );
}

class UserLogin {
    login: string;
    password: string;

    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }
}

function LoginForm({setLoggedIn}: LoginProps) {
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
            localStorage.setItem("jwtToken", data);
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

function RegistrationForm({setLoggedIn}: LoginProps) {
    const [password, setPassword] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [formErrors, setFormErrors] = useState({
        password: "",
        login: "",
        repeatPassword: ""
    });

    const roles = ["USER", "CLUB ADMIN"];

    const validate = () => {
        const errors = {
            usr: "",
            f: ""
        };
        errors.usr = "FRfe";
    }

    const checkPasswordEquals = (pass: string) => {
        if (pass != password) {
            formErrors.repeatPassword = "Пароли не совпадают!"
        } else formErrors.repeatPassword = "";
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let date = new Date()
        let user = new UserConfig(username, password, login, role, "ru", "init", date);


        const response = await fetch(`/user/register/${username}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        if (data.hasOwnProperty("accessToken")) {
            localStorage.setItem("jwtToken", data);
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

                <span className="p-float-label field">
                    <Password required className="in" inputId="repassword"  toggleMask
                              onChange={e => checkPasswordEquals(e.target.value)}/>
                    <label htmlFor="repassword">Повторите пароль</label>
                    <p>{formErrors.repeatPassword}</p>
                </span>

                <span className="p-float-label field">
                    <InputText required className="in" id="username" value={username}
                               onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="username">Имя пользователя</label>
                </span>

                <div className="field">
                    <Dropdown value={role} onChange={(e) => setRole(e.value)}
                                options={roles}
                                placeholder="Тип аккаунта" className="w-full md:w-14rem"/>
                </div>

                <div id="submit">
                    <Button label="Регистрация"/>
                </div>
            </div>
            <span className="login-link">
                Уже есть аккаунт? <Link to="../"> Войти</Link>
            </span>
        </form>
    );
}

class UserConfig {
    username: string;
    password: string;
    login: string;
    role: string;
    lang: string;
    theme: string;
    reg_date: Date;

    constructor(username: string, password: string, login: string,
                role: string, lang: string, theme: string, reg_date: Date) {
        this.username = username;
        this.password = password;
        this.login = login;
        this.role = role;
        this.lang = lang;
        this.theme = theme;
        this.reg_date = reg_date;
    }

}