import './Container.css';
import Header from "../header/Header";
import Timetable from "./timetable/Timetable";
import MainPage from "./mainpage/MainPage";
import Statistics from "./statistics/Statistics";
import Exercises from "./exersises/Exercises";
import Events from "./events/Events";


interface ContainerProps {
    selectedSection: string;
}

export default function Container({selectedSection}: ContainerProps) {

    const renderSelectedSection = (section: string) => {
        switch (section) {
            case "Timetable":
                return <Timetable/>;
            case "MainPage":
                return <MainPage/>;
            case "Statistics":
                return <Statistics/>;
            case "Exercises":
                return <Exercises/>;
            case "Events":
                return <Events/>;
            default:
                return <div>ERROR</div>
        }
    }

    return (
      <div className="Container">
          <Header/>
          {renderSelectedSection(selectedSection)}
      </div>
    );
}