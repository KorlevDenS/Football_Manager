import './ClubNavRow.css';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import React from "react";

interface ClubNavRowProps {
    inlineText: string;
    name: string;
    icon_url: string;
}

export default function ClubNavRow({inlineText, name, icon_url}: ClubNavRowProps) {
    const navigate = useNavigate();

    return (
        <div className={"row-container"}>
            <Button variant="contained" color={"error"}  className={"ClubNavRow"} onClick={() => navigate(name, {replace: false})}>

                <div className='icon-layout'>
                    <img className='nav_icon' src={icon_url} alt=""/>
                </div>
                <div className='nav-text-layout'>
                    <div className='nav-text'>{inlineText}</div>
                </div>

            </Button>
        </div>
    );
}