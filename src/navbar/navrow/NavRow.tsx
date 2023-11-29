import './NavRow.css';
import {useNavigate} from "react-router-dom";

interface NavRowProps {
    inlineText: string;
    name: string;
    icon_url: string;
}

export default function NavRow({inlineText, name, icon_url}: NavRowProps) {
    const navigate = useNavigate();

    return (
        <div className='NavRow' onClick={() => navigate(name, {replace: false})}>

            <div className='icon-layout'>
                <img className='nav_icon' src={icon_url} alt=""/>
            </div>
            <div className='nav-text-layout'>
                <div className='nav-text'>{inlineText}</div>
            </div>

        </div>
    );
}