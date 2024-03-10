import './ClubAddForm.css';
import React, {useState} from "react";
import {FormHelperText, TextField} from "@mui/material";
import Button from "@mui/material/Button";

import {Club} from "../../db_classes"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CheckIcon from '@mui/icons-material/Check';


interface ClubAddProps {
    setModalActive(isActive: boolean): void;
    setLoggedIn(loggedIn: boolean): void;
    getClubs(): void;
}

export default function ClubAddForm({setModalActive, setLoggedIn, getClubs}: ClubAddProps) {

    const [name, setName] = useState<string>("");
    const [foundationDate, setFoundationDate] = useState<Date>(new Date());
    const [location, setLocation] = useState<string>("");
    const [shortName, setShortName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let club = new Club(name, foundationDate, new Date(), location, shortName, description);
        let token = localStorage.getItem("jwtToken");
        console.log(club);
        await fetch(`/club/add/new`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(club)
        }).then(response => {
            if (response.ok) {
                setModalActive(false);
                getClubs();
            } else if (response.status === 401) {
                setLoggedIn(false);
                localStorage.setItem("loggedIn", "false");
            }
        });
    }

    return (
        <form className="ClubAddForm" onSubmit={handleSubmit}>
            <div className={"club-add-form-part"}>
                <FormHelperText>Название</FormHelperText>
                <TextField variant="outlined" required={true}
                           onChange={e => setName(e.target.value)}/>
                <FormHelperText>Дата основания</FormHelperText>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={dayjs(foundationDate)}
                        onChange={(e) => {
                            if (e !== null)
                                setFoundationDate(e.toDate());
                        }}
                    />
                </LocalizationProvider>
                <FormHelperText>Адрес</FormHelperText>
                <TextField variant="outlined" required={true}
                           onChange={e => setLocation(e.target.value)}/>
            </div>
            <div className={"club-add-form-part"}>
                <FormHelperText>Короткое название</FormHelperText>
                <TextField variant="outlined" required={true}
                           onChange={e => setShortName(e.target.value)}/>
                <FormHelperText>Описание</FormHelperText>
                <TextField multiline maxRows={4} required={true}
                           onChange={e => setDescription(e.target.value)}/>
                <FormHelperText>Создание клуба</FormHelperText>
                <Button type={"submit"} variant="contained" startIcon={<CheckIcon/>}>Создать клуб</Button>
            </div>
        </form>
);
}