import {Club} from "../../db_classes"
import './ClubLayout.css';
import React from "react";

interface ClubLayoutProps {
    club: Club;
    loadClubInfo(club: Club): void;
}

export default function ClubLayout({club, loadClubInfo}: ClubLayoutProps) {


    return (
        <div className='ClubLayout' onClick={() => loadClubInfo(club)}>
            <div id="title">
                {club.name}
            </div>

            <div>
                <i className="pi pi-clock" style={{fontSize: '0.8rem'}}></i>&nbsp; {club.location}
            </div>

            <div id="description">
                <i className="pi pi-info-circle" style={{fontSize: '0.9rem'}}></i>&nbsp; {club.short_name}
            </div>
            <div>
                Дата основания:&nbsp; {new Date(club.foundation_date).getDate() + "."
                + (new Date(club.foundation_date).getMonth() + 1)
                + "." + new Date(club.foundation_date).getFullYear()}
            </div>
        </div>
    );
}