import './Login.css';
import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {Link, Routes, Route, useNavigate} from "react-router-dom";
import {UserConfig} from "../db_classes";
import PersonalDataForm from "./PersonalDataForm";

interface RegistrationFormProps {
    setLoggedIn(isLoggedIn: boolean): void;
}

export default function RegistrationForm({setLoggedIn}: RegistrationFormProps) {
    const [password, setPassword] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [formErrors, setFormErrors] = useState({
        password: "",
        login: "",
        repeatPassword: ""
    });
    const [user, setUser] = useState<UserConfig>(
        new UserConfig("","","","",new Date())
    );

    const roles = ["USER", "CLUB ADMIN"];
    const navigate = useNavigate();

    const checkPasswordEquals = (pass: string) => {
        if (pass !== password) {
            formErrors.repeatPassword = "Пароли не совпадают!"
        } else formErrors.repeatPassword = "";
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let date = new Date()
        let user = new UserConfig(username, password, login, role, date);
        setUser(user);
        navigate("/auth/register/personal/data");
    }

    return (
        <Routes>
            <Route index element={
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
                            <Password required className="in" inputId="repassword" toggleMask
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
            }></Route>
            <Route path={"personal/data"} element={
                <PersonalDataForm user={user} setLoggedIn={setLoggedIn}/>
            }></Route>
        </Routes>
    );
}