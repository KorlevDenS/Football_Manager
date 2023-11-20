import './Container.css';
import Header from "../header/Header";
import Timetable from "./timetable/Timetable";

export default function Container() {

    return (
      <div className="Container">
          <Header/>
          <Timetable/>
      </div>
    );
}