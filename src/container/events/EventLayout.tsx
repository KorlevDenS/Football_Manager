import { CollectiveEvent } from '../../db_classes';
import './EventLayout.css';
import React from "react";


interface EventLayoutProps {
    event: CollectiveEvent;
    loadEvenInfo(event: CollectiveEvent): void;
}

export default function EventLayout({event, loadEvenInfo}: EventLayoutProps) {

    const calcTimePeriod = (): string => {
        if (event.time == null) return "-";
        if (event.duration == null) return event.time;

        const firstDate = new Date("1970-01-01T" + event.time);
        const secondDate = new Date("1970-01-01T" + event.duration);
        const resultDate = new Date(firstDate.getTime() + secondDate.getHours() * 3600000 + secondDate.getMinutes() * 60000);
        return firstDate.getHours() + ":" + firstDate.getMinutes() + " - " +  resultDate.getHours() + ":" + resultDate.getMinutes();
    }

    const chooseBorderStyle = () => {
        const blueviolet_border = { "border-left-color": "blueviolet" } as React.CSSProperties;
        const green_border = { "border-left-color": "green" } as React.CSSProperties;
        const blue_border = { "border-left-color": "blue" } as React.CSSProperties;
        const type = event.type;
        if (type === "Тренировка") return blue_border;
        if (type === "Матч") return green_border;
        if (type === "Своё событие") return blueviolet_border;
    }

    const chooseTextStyle = () => {
        const blueviolet_border = { "color": "blueviolet" } as React.CSSProperties;
        const green_border = { "color": "green" } as React.CSSProperties;
        const blue_border = { "color": "#1C61FF" } as React.CSSProperties;
        const type = event.type;
        if (type === "Тренировка") return blue_border;
        if (type === "Матч") return green_border;
        if (type === "Своё событие") return blueviolet_border;
    }


    return (
        <div className='EventLayout' style={chooseBorderStyle()} onClick={() => loadEvenInfo(event)}>
            <div id="period" style={chooseTextStyle()}>
                <i className="pi pi-clock" style={{fontSize: '0.8rem'}}></i>&nbsp; {calcTimePeriod()}
            </div>
            <div id="title" style={chooseTextStyle()}>
                {event.type}
            </div>
            <div id="description">
                <i className="pi pi-info-circle" style={{fontSize: '0.9rem'}}></i>&nbsp; {event.description}
            </div>
            <div id="address">
                <i className="pi pi-map-marker" style={{fontSize: '0.9rem'}}></i>&nbsp; {event.location}
            </div>
        </div>
    );
}


