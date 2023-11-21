import './App.css';
import React, {useState} from "react";
import Container from "../container/Container";
import NavBar from "../navbar/NavBar";

export default function App() {
    const [selectedSection, setSelectedSection] = useState('MainPage');

    const handleChange = (selectedSection: string) => {
        setSelectedSection(selectedSection);
    }


    return (
        <div className="App">
            <NavBar onChange={handleChange}/>
            <Container selectedSection={selectedSection}/>
        </div>
    );
}
