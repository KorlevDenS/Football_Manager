import './EventLayout.css';

export default function EventLayout() {

    return (
        <div className='EventLayout'>
            <div id="period">
                <i className="pi pi-clock" style={{fontSize: '0.8rem'}}></i>&nbsp;09:00 - 11:00
            </div>
            <div id="title">
            Тренировка
            </div>
            <div id="description">
                <i className="pi pi-info-circle" style={{fontSize: '0.9rem'}}></i>&nbsp;Силовая
            </div>
            <div id="address">
            <i className="pi pi-map-marker" style={{fontSize: '0.9rem'}}></i>&nbsp;ул. Спортивный проезд "Красное знамя"
            </div>
        </div>
    );

}