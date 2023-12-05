import './Header.css';
import settings_ico from '../images/settings_icon.svg';
import user_ico from '../images/user_icon.svg';
import {useNavigate} from "react-router-dom";


export default function Header() {
    const navigate = useNavigate();


    return (
        <div className="Header">
            <div className="settings_icons">
                <div id="profile" onClick={() => navigate("/manager/Profile", {replace: false})}>
                    <img src={user_ico} className="settings_img" alt="logo"/>
                </div>
                <div id="settings">
                    <img src={settings_ico} className="settings_img" alt="logo"/>
                </div>
            </div>
        </div>
    );
}