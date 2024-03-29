import {Application, Club, Human} from "../../db_classes";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React, {useEffect, useState} from "react";
import './ClubContainer.css'
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";


interface ClubContainerProps {
    club: Club;
    setClub(club: Club): void;
    isMine(club: Club): boolean;
    loadApplications(): void;
    setExitPath(exitPath: string): void;
    setLoggedIn(loggedIn: boolean): void;
    handleClose(): void;
    loadJoinedClubs(): void
}

export default function ClubContainer({club, setClub, isMine, loadApplications,
                                          setExitPath, setLoggedIn, handleClose, loadJoinedClubs}: ClubContainerProps) {
    const [founder, setFounder] =
        useState<Human>(new Human("name", "surname", "patronymic", new Date(), "sex", ""));
    const [participants, setParticipants] = useState<Human[]>([]);

    // const hrefLocation = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        getFounder().then();
        getParticipants().then();
    }, []);

    const getFounder = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/club/get/founder", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(club.id)
        })
            .then(response => {
                if (response.ok) {
                    const data = response.json();
                    let newHuman: Human;
                    data.then(value => {
                        newHuman = value as Human
                    })
                        .then(() => {
                            setFounder(newHuman)
                        });
                } else if (response.status == 401) {
                    setLoggedIn(false);
                    localStorage.setItem("loggedIn", "false");
                }
            })
    }

    const getParticipants = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch("/club/get/participants", {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(club.id)
        })
            .then(response => {
            if (response.ok) {
                const data = response.json();
                let newPeople: Human[];
                data.then(value => {
                    newPeople = value as Human[]
                })
                    .then(() => {
                        setParticipants(newPeople)
                    });
            } else if (response.status == 401) {
                setLoggedIn(false);
                localStorage.setItem("loggedIn", "false");
            }
        })
    }

    const addApplication = async () => {
        console.log("Club id: " + club.id);
        if (club.id === undefined) return;
        let apply = new Application(club.id, 1, 0, new Date(), club.name);
        let token = localStorage.getItem("jwtToken");
        await fetch(`/club/apply/to/club`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"first": apply, "second": club.id})
        }).then(response => {
            if (response.ok) {
                loadApplications();
            } else if (response.status === 401) {
                setLoggedIn(false);
                localStorage.setItem("loggedIn", "false");
            }
        });
    }

    const leaveClub = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/club/leave/from/club`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(club.id)
        }).then(response => {
            if (response.ok) {
                loadJoinedClubs();
            } else if (response.status === 401) {
                setLoggedIn(false);
                localStorage.setItem("loggedIn", "false");
            }
        });
    }

    return (
        <div className="club-info">
            <div id={"close-container"}>
                <IconButton onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div id={"info-container"}>
                <>
                    Название: {club.name}<br/>
                    Короткое название: {club.short_name}<br/>
                    Дата основания: {new Date(club.foundation_date).getDate()}.
                    {new Date(club.foundation_date).getMonth() + 1}.
                    {new Date(club.foundation_date).getFullYear()}<br/>
                    Дата регистрации на платформе: {new Date(club.reg_date).getDate()}.
                    {new Date(club.reg_date).getMonth() + 1}.
                    {new Date(club.reg_date).getFullYear()}<br/>
                    Адрес: {club.location}<br/>
                    Описание: {club.description}<br/>
                    <br/>
                    Главный администратор:<br/>
                    {founder.surname}<br/>
                    {founder.name}<br/>
                    {founder.patronymic}<br/>
                    <br/>
                    Участники:<br/>
                    {participants.map(person =>
                        <div>
                            {person.surname} &nbsp; {person.name} &nbsp; {person.patronymic}<br/>
                        </div>
                    )}
                    <Button onClick={() => {
                        setExitPath("/manager/Clubs");
                        setClub(club);
                        navigate("/club/manager/MainPage");
                    }}>К странице клуба</Button>
                    {!isMine(club) && (
                        <Button onClick={addApplication}>Подать заявку</Button>
                    )}
                    {isMine(club) && (
                        <Button onClick={leaveClub}>Покинуть клуб</Button>
                    )}
                </>
            </div>

        </div>
    );
}