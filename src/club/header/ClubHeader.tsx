import './ClubHeader.css';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ClubHeaderProps {
    exitPath: string;
}

export default function ClubHeader({exitPath}: ClubHeaderProps) {
    const navigate = useNavigate();


    return (
        <div className="ClubHeader">
            <div>
                <Button onClick={() => navigate(exitPath)}><ArrowBackIcon/>Назад в клубы</Button>
            </div>
        </div>
    );
}