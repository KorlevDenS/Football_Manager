import './Login.css';
import React, {useState} from "react";
import {Human, UserConfig} from "../db_classes";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {Autocomplete, FormHelperText, TextField} from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


interface PersonalDataFormProps {
    user: UserConfig;
    setLoggedIn(isLoggedIn: boolean): void;
}
export default function PersonalDataForm({user, setLoggedIn}: PersonalDataFormProps ) {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [patronymic, setPatronymic] = useState<string>("");
    const [birthday, setBirthday] = useState<Dayjs | null>(() =>
    {
        let currentDate = new Date();
        return dayjs(new Date(currentDate.getFullYear() - 3, currentDate.getMonth(), currentDate.getDate()));
    });
    const [sex, setSex] = useState<string>('н');

    const sexChange = [{title: "не выбран", value: "н"},
        {title: "муж.", value: "м"}, {title: "жен.", value: "ж"}];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (birthday === null) return;
        //TODO
        let human = new Human(name, surname, patronymic, birthday.toDate(), sex, "");

        const configResponse = await fetch("/user/set/config", {
           method: 'POST',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(user),
        });

        if (configResponse.ok) {
            const humanResponse = await fetch(`/user/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(human),
            });
            const data = await humanResponse.json();
            if (data.hasOwnProperty("accessToken")) {
                localStorage.setItem("jwtToken", data.accessToken);
                localStorage.setItem("loggedIn", "true");
                setLoggedIn(true);
            } else if (data.hasOwnProperty("exception")) {
                console.error(data);
            }
        } else {
            console.log("Unable to register the account");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input">
                <FormHelperText>Имя</FormHelperText>
                <TextField variant="outlined" required={true}
                           onChange={e => setName(e.target.value)}/>
                <FormHelperText>Фамилия</FormHelperText>
                <TextField variant="outlined" required={true}
                           onChange={e => setSurname(e.target.value)}/>
                <FormHelperText>Отчество (при наличии)</FormHelperText>
                <TextField variant="outlined" required={false}
                           onChange={e => setPatronymic(e.target.value)}/>
                <FormHelperText>Дата рождения</FormHelperText>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Controlled picker"
                    value={dayjs(birthday)}
                    onChange={(newValue) => {setBirthday(newValue)}}
                />
                </LocalizationProvider>
                <FormHelperText>Пол</FormHelperText>
                <Autocomplete
                    onChange={(event, value) =>
                    {if (value !== null) setSex(value.value)}}
                    options={sexChange}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Пол"
                            required={true}
                        />
                    )}
                />
                <div id="submit">
                    <Button label="Продолжить"/>
                </div>
            </div>
            <span className="login-link">
                Назад <Link to="/auth/register">Регистрация</Link>
            </span>
        </form>

    );
}