import './Profile.css';
import React, {useEffect, useState} from "react";
import {Human, Player, UserConfig} from "../../db_classes";
import Button from "@mui/material/Button";
import {Autocomplete, FormHelperText, TextField} from "@mui/material";
import {InputAdornment} from "@mui/material"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface ProfileProps {
    setLoggedIn(loggedIn: boolean): void;
}

export default function Profile({setLoggedIn}: ProfileProps) {

    const [config, setConfig] =
        useState<UserConfig>(new UserConfig("name", "******", "******", "role", new Date()));
    const [human, setHuman] =
        useState<Human>(new Human("name", "surname", "patronymic", new Date(), "sex", ""));
    const [player, setPlayer] =
        useState<Player>(new Player("role", 0, 0));


    const [configChange, setConfigChange] =
        useState<UserConfig>(new UserConfig("name", "******", "******", "role", new Date()));
    const [humanChange, setHumanChange] =
        useState<Human>(new Human("name", "surname", "patronymic", new Date(), "sex", ""));
    const [playerChange, setPlayerChange] =
        useState<Player>(new Player("role", 0, 0));


    const [modifyConfig, setModifyConfig] = useState<boolean>(false);
    const [modifyPlayer, setModifyPlayer] = useState<boolean>(false);
    const [modifyHuman, setModifyHuman] = useState<boolean>(false);

    const sexChange = [{title: "Пол: не выбран", value: "н"},
        {title: "Пол: муж.", value: "м"}, {title: "Пол: жен.", value: "ж"}];

    const invertModifyConfig = () => {
        if (!(JSON.stringify(config) === JSON.stringify(configChange)) && modifyConfig) {
            updateConfig().then();
        }
        setModifyConfig(!modifyConfig);
    }

    const invertModifyPlayer = () => {
        if (!(JSON.stringify(player) === JSON.stringify(playerChange))) {
            updatePlayer().then();
        }
        setModifyPlayer(!modifyPlayer);
    }

    const invertModifyHuman = () => {
        if (!(JSON.stringify(human) === JSON.stringify(humanChange))) {
            updateHuman().then();
        }
        setModifyHuman(!modifyHuman);
    }

    useEffect(() => {
        getConfig().then();
        getPlayer().then();
        getHuman().then();
    }, []);

    const updateConfig = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/user/update/config", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([config, configChange])
        })
            .then(response => {
                if (response.ok) {
                    getConfig();
                } else if (response.status == 401) {
                    setLoggedIn(false);
                    localStorage.setItem("loggedIn", "false");
                }
            }
        );
    }

    const updateHuman = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/user/update/human", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([human, humanChange])
        })
            .then(response => {
                    if (response.ok) {
                        getHuman();
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const updatePlayer = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/user/update/player", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([player, playerChange])
        })
            .then(response => {
                    if (response.ok) {
                        getPlayer();
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const getConfig = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/user/get/config", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                    if (response.ok) {
                        const data = response.json();
                        let newConfig: UserConfig;
                        data.then(value => {
                            newConfig = value as UserConfig
                        })
                            .then(() => {
                                newConfig.reg_date = new Date(newConfig.reg_date)
                            })
                            .then(() => {
                                setConfig(newConfig);
                                setConfigChange(newConfig)
                            });
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const getPlayer = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/user/get/player", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                    if (response.ok) {
                        const data = response.json();
                        let newPlayer: Player;
                        data.then(value => {
                            newPlayer = value as Player
                        })
                            .then(() => {
                                setPlayer(newPlayer);
                                setPlayerChange(newPlayer);
                            });
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    const getHuman = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/user/get/human", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                    if (response.ok) {
                        const data = response.json();
                        let newHuman: Human;
                        data.then(value => {
                            newHuman = value as Human
                        })
                            .then(() => {
                                newHuman.birthday = new Date(newHuman.birthday)
                            })
                            .then(() => {
                                setHuman(newHuman);
                                setHumanChange(newHuman)
                            });
                    } else if (response.status == 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
    }

    return (
        <div className="Profile">
            Мой профиль
            <div className="person-fields">
                <div className="user-info">
                    <TextField value={configChange.username} variant="standard"
                               InputProps={{
                                   readOnly: !modifyConfig,
                                   startAdornment: <InputAdornment position="start">Имя пользователя:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...configChange}
                                   obj.username = e.target.value;
                                   setConfigChange(obj);
                               }}/>
                    <TextField value={configChange.login} variant="standard"
                               InputProps={{
                                   readOnly: !modifyConfig,
                                   startAdornment: <InputAdornment position="start">Логин:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...configChange}
                                   obj.login = e.target.value;
                                   setConfigChange(obj);
                               }}/>
                    <TextField value={configChange.password} variant="standard"
                               InputProps={{
                                   readOnly: !modifyConfig,
                                   startAdornment: <InputAdornment position="start">Пароль:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...configChange}
                                   obj.password = e.target.value;
                                   setConfigChange(obj);
                               }}/>

                    <TextField value={configChange.reg_date.getDate() + "." + (configChange.reg_date.getMonth() + 1)
                        + "." + configChange.reg_date.getFullYear()}
                               variant="standard"
                               InputProps={{
                                   readOnly: true,
                                   startAdornment: <InputAdornment position="start">Дата регистрации:</InputAdornment>
                               }}/>
                    <Button onClick={invertModifyConfig}>
                        {modifyConfig ? "Сохранить" : "Изменить данные регистрации"}
                    </Button>
                </div>
                <div className="user-info">
                    <TextField value={humanChange.name}
                               variant="standard"
                               InputProps={{
                                   readOnly: !modifyHuman,
                                   startAdornment: <InputAdornment position="start">Имя:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...humanChange}
                                   obj.name = e.target.value;
                                   setHumanChange(obj);
                               }}/>
                    <TextField value={humanChange.surname}
                               variant="standard"
                               InputProps={{
                                   readOnly: !modifyHuman,
                                   startAdornment: <InputAdornment position="start">Фамилия:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...humanChange}
                                   obj.surname = e.target.value;
                                   setHumanChange(obj);
                               }}/>
                    <TextField value={humanChange.patronymic}
                               variant="standard"
                               InputProps={{
                                   readOnly: !modifyHuman,
                                   startAdornment: <InputAdornment position="start">Отчество:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...humanChange}
                                   obj.patronymic = e.target.value;
                                   setHumanChange(obj);
                               }}/>
                    <FormHelperText>Дата рождения:</FormHelperText>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className="exclude"
                            value={dayjs(humanChange.birthday)}
                            readOnly={!modifyHuman}
                            onChange={(e) => {
                                if (e !== null) {
                                    let obj = {...humanChange}
                                    obj.birthday = e.toDate();
                                    setHumanChange(obj);
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <Autocomplete
                        onChange={(event, value) => {
                            if (value !== null) {
                                let obj = {...humanChange};
                                obj.sex = value.value;
                                setHumanChange(obj);
                            }
                        }}

                        readOnly={!modifyHuman}
                        options={sexChange}
                        getOptionLabel={(option) => option.title}
                        value={
                            humanChange.sex == "н" ? sexChange[0] : (humanChange.sex == "м" ? sexChange[1] : sexChange[2])
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                required={true}
                            />
                        )}
                    />
                    <TextField value={humanChange.passport_id}
                               variant="standard"
                               InputProps={{
                                   readOnly: !modifyHuman,
                                   startAdornment: <InputAdornment position="start">Паспорт:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...humanChange}
                                   obj.passport_id = e.target.value;
                                   setHumanChange(obj);
                               }}/>
                    <Button onClick={invertModifyHuman}>
                        {modifyHuman ? "Сохранить" : "Изменить персональные данные"}
                    </Button>
                </div>
                <div className="user-info">
                    <TextField value={playerChange.height}
                               variant="standard"
                               type="number"
                               InputProps={{
                                   readOnly: !modifyPlayer,
                                   startAdornment: <InputAdornment position="start">Рост:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerChange}
                                   obj.height = e.target.value as unknown as number;
                                   setPlayerChange(obj);
                               }}/>
                    <TextField value={playerChange.weight}
                               variant="standard"
                               type="number"
                               InputProps={{
                                   readOnly: !modifyPlayer,
                                   startAdornment: <InputAdornment position="start">Вес:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerChange}
                                   obj.weight = e.target.value as unknown as number;
                                   setPlayerChange(obj);
                               }}/>
                    <TextField value={playerChange.role}
                               variant="standard"
                               InputProps={{
                                   readOnly: !modifyPlayer,
                                   startAdornment: <InputAdornment position="start">Статус:</InputAdornment>
                               }}
                               onChange={(e) => {
                                   let obj = {...playerChange}
                                   obj.role = e.target.value;
                                   setPlayerChange(obj);
                               }}/>
                    <Button onClick={invertModifyPlayer}>
                        {modifyPlayer ? "Сохранить" : "Изменить данные игрока"}
                    </Button>
                </div>
            </div>
            <Button type="button" onClick={() => {
                localStorage.removeItem("jwtToken");
                localStorage.setItem("loggedIn", "false");
                setLoggedIn(false);
            }}>LOG OUT</Button>
        </div>
    );
}