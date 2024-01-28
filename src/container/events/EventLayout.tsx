import { CollectiveEvent } from '../../db_classes';
import './EventLayout.css';


interface EventLayoutProps {
    event: CollectiveEvent;
}

export default function EventLayout({event}: EventLayoutProps) {

    const calcTimePeriod = (): string => {
        if (event.time == null) return "-";
        if (event.duration == null) return event.time;

        const firstDate = new Date("1970-01-01T" + event.time);
        const secondDate = new Date("1970-01-01T" + event.duration);
        const resultDate = new Date(firstDate.getTime() + secondDate.getHours() * 3600000 + secondDate.getMinutes() * 60000);
        return firstDate.getHours() + ":" + firstDate.getMinutes() + " - " +  resultDate.getHours() + ":" + resultDate.getMinutes();
    }

    return (
        <div className='EventLayout'>
            <div id="period">
                <i className="pi pi-clock" style={{fontSize: '0.8rem'}}></i>&nbsp; {calcTimePeriod()}
            </div>
            <div id="title">
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