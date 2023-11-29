import './Header.css';
import settings_ico from '../images/settings_icon.svg';
import user_ico from '../images/user_icon.svg';

export default function Header() {

    return (
        <div className="Header">
            <div className="settings_icons">
                <div id="profile">
                    <img src={user_ico} className="settings_img" alt="logo"/>
                </div>
                <div id="settings">
                    <img src={settings_ico} className="settings_img" alt="logo"/>
                </div>
            </div>
        </div>
    );
}