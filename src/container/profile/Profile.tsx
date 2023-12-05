import "./Profile.css";

interface ProfileProps {
    setLoggedIn(loggedIn: boolean): void;
}
export default function Profile({setLoggedIn}: ProfileProps) {

    return (
        <div className="Profile">
            Мой профиль
            <button type="button" onClick={() => {
                localStorage.removeItem("jwtToken");
                localStorage.setItem("loggedIn", "false");
                setLoggedIn(false);
            }}>LOG OUT</button>
        </div>
    );
}