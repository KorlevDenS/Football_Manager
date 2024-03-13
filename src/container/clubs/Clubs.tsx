import React, {useEffect, useState} from "react";
import {Application, Club} from "../../db_classes";
import {Dialog} from "primereact/dialog";
import ClubLayout from "./ClubLayout";
import ClubAddForm from "./ClubAddForm";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import './Clubs.css';

import {Route, Routes, useNavigate} from "react-router-dom";
import ClubContainer from "./ClubContainer";
import ApplicationLayout from "./ApplicationLayout";


interface ClubsProps {
    setClub(club: Club): void;
    setExitPath(exitPath: string): void;
    setLoggedIn(loggedIn: boolean): void;
}

export default function Clubs({setClub, setExitPath,setLoggedIn}: ClubsProps) {

    const [allClubs, setAllClubs] = useState<Club[]>([]);
    const [joinedClubs, setJoinedClubs] = useState<Club[]>([]);
    const [manageClubs, setManageClubs] = useState<Club[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);

    const [showingClub, setShowingClub] = useState<Club>();
    const navigate = useNavigate();

    useEffect(() => {
        getManageClubs().then();
        getJoinedClubs().then();
        getAllClubs().then();
        getApplications().then();
    }, []);

    const getAllClubs = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/club/get/clubs`, {
            method: 'GET',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                const data = response.json();
                let clubsArray: Club[];
                data.then(value => {clubsArray = value as Club[]})
                    .then(() => setAllClubs(clubsArray));
            } else if (response.status === 401) {
                setLoggedIn(false);
                localStorage.setItem("loggedIn", "false");
            }
        });
    }

    const getJoinedClubs = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/club/get/participation/clubs`, {
            method: 'GET',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                const data = response.json();
                let clubsArray: Club[];
                data.then(value => {clubsArray = value as Club[]})
                    .then(() => setJoinedClubs(clubsArray));
            } else if (response.status === 401) {
                setLoggedIn(false);
                localStorage.setItem("loggedIn", "false");
            }
        });
    }

    const getManageClubs = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/club/get/management/clubs`, {
            method: 'GET',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                const data = response.json();
                let clubsArray: Club[];
                data.then(value => {clubsArray = value as Club[]})
                    .then(() => setManageClubs(clubsArray));
            } else if (response.status === 401) {
                setLoggedIn(false);
                localStorage.setItem("loggedIn", "false");
            }
        });
    }

    const getApplications = async () => {
        let token = localStorage.getItem("jwtToken");
        await fetch(`/club/get/player/applications`, {
            method: 'GET',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                const data = response.json();
                let appsArray: Application[];
                data.then(value => {appsArray = value as Application[]})
                    .then(() => setApplications(appsArray));
            } else if (response.status === 401) {
                setLoggedIn(false);
                localStorage.setItem("loggedIn", "false");
            }
        });
    }

    const loadClubInfo = (club: Club) => {
        setShowingClub(club);
        navigate("club/info");
    }

    const isMine = (club: Club) => {
        return joinedClubs.some(obj => obj.id === club.id);
    }

    return (
        <div className='Clubs'>
            <ClubNav setLoggedIn={setLoggedIn} getClubs={() => {
                getManageClubs().then();
                getJoinedClubs().then();
                getAllClubs().then()
            }}/>

            <Routes>
                <Route index element={
                    <>
                        <div>Все клубы</div>
                        <div>
                            {allClubs.map(club =>
                                <div>
                                    <ClubLayout club={club} loadClubInfo={loadClubInfo}/>
                                </div>
                            )}
                        </div>
                    </>
                }></Route>
                <Route path={"applications"} element={
                    <>
                        <div>Мои заявки</div>
                        <div>
                            {applications.map(app =>
                                <div>
                                    <ApplicationLayout application={app}/>
                                </div>
                            )}
                        </div>
                    </>
                }></Route>
                <Route path={"joined/*"} element={
                    <>
                        <Routes>
                            <Route index element={
                                <>
                                    <div>Участие:</div>
                                    <div>
                                        {joinedClubs.map(club =>
                                            <div>
                                                <ClubLayout club={club} loadClubInfo={loadClubInfo}/>
                                            </div>
                                        )}
                                    </div>
                                </>
                            }></Route>
                            <Route path={"club/info"} element={
                                <>
                                    {showingClub != null && (
                                        <ClubContainer club={showingClub} setLoggedIn={setLoggedIn}
                                                       handleClose={() => navigate("/manager/Clubs/joined")}
                                                       setClub={setClub} setExitPath={setExitPath} isMine={isMine}
                                                       loadApplications={getApplications} loadJoinedClubs={getJoinedClubs}/>
                                    )}
                                </>
                            }></Route>
                        </Routes>
                    </>
                }></Route>
                <Route path={"management/*"} element={
                    <>
                        <Routes>
                            <Route index element={
                                <>
                                    <div>Управление:</div>
                                    <div>
                                        {manageClubs.map(club =>
                                            <div>
                                                <ClubLayout club={club} loadClubInfo={loadClubInfo}/>
                                            </div>
                                        )}
                                    </div>
                                </>
                            }></Route>
                            <Route path={"club/info"} element={
                                <>
                                    {showingClub != null && (
                                        <ClubContainer club={showingClub} setLoggedIn={setLoggedIn}
                                                       handleClose={() => navigate("/manager/Clubs/management")}
                                                       setClub={setClub} setExitPath={setExitPath} isMine={isMine}
                                                       loadApplications={getApplications} loadJoinedClubs={getJoinedClubs}/>
                                    )}
                                </>
                            }>

                            </Route>
                        </Routes>
                    </>
                }></Route>
                <Route path={"club/info"} element={
                    <>
                        {showingClub != null && (
                            <ClubContainer club={showingClub} setLoggedIn={setLoggedIn}
                                           handleClose={() => navigate("/manager/Clubs")}
                                           setClub={setClub} setExitPath={setExitPath} isMine={isMine}
                                           loadApplications={getApplications} loadJoinedClubs={getJoinedClubs}/>
                        )}
                    </>
                }></Route>
            </Routes>
        </div>
    );
}


interface ClubNavProps {
    setLoggedIn(loggedIn: boolean): void;
    getClubs(): void;
}

function  ClubNav({setLoggedIn, getClubs}: ClubNavProps) {
    const [isModalActive, setModalActive] = useState(false);

    const navigate = useNavigate();

    return (
        <div className='club-nav'>
            <Button onClick={() => navigate("/manager/Clubs")}>Все клубы</Button>
            <Button onClick={() => navigate("/manager/Clubs/joined")}>Участие</Button>
            <Button onClick={() => navigate("/manager/Clubs/management")}>Управление</Button>

            <IconButton onClick={() => setModalActive(true)}>
                <LibraryAddIcon color="primary"/>
            </IconButton>

            <Button onClick={() => navigate("/manager/Clubs/applications")}>Заявки</Button>

            <Dialog header="Создание нового клуба" visible={isModalActive}
                    onHide={() => setModalActive(false)}>
                <ClubAddForm setModalActive={setModalActive} setLoggedIn={setLoggedIn} getClubs={getClubs}/>
            </Dialog>
        </div>
    );
}