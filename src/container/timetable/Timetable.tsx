import './Timetable.css';


export default function Timetable() {

    let week: Date[] = calcWeek();



    return (
        <div className='Timetable'>
            <DaysLayout day={week[0]}/>
            <DaysLayout day={week[1]}/>
            <DaysLayout day={week[2]}/>
            <DaysLayout day={week[3]}/>
            <DaysLayout day={week[4]}/>
            <DaysLayout day={week[5]}/>
            <DaysLayout day={week[6]}/>
        </div>
    );
}

interface DaysLayoutProps {
    day: Date;
}
function DaysLayout({day}: DaysLayoutProps) {

    let weekDays = ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];


    return (
        <div className='DayLayout'>
            {day?.getDate()}, {weekDays[day?.getDay()]}
        </div>
    );
}

function TimeNav() {
    return (
      <div className='time_nav'>

      </div>
    );
}

function calcWeek(): Date[] {

    let week: Date[] = Array(7);

    let currentDate = new Date();
    let weekDayNumber = currentDate.getDay();

    let day = new Date();
    if (weekDayNumber == 0) {
        day.setDate(currentDate.getDate() - 6);
    } else {
        day.setDate(currentDate.getDate() - weekDayNumber + 1);
    }

    week[0] = new Date(day);

    for (let i = 1; i < 7; i++) {
        day.setTime(day.getTime() + 86400000);
        week[i] = new Date(day);
    }

    return week;
}