import { useEffect, useState } from "react";
import { WeatherResponse } from "@full-stack/types";
import { coinflip } from "@full-stack/common";
import { BACKEND_BASE_PATH } from "../constants/Navigation";
//import Calendar from 'react-calendar';
//import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-calendar/dist/Calendar.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import events from "./events";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const getWeather = (): Promise<WeatherResponse> =>
    fetch(`http://localhost:8080/weather`).then((res) => res.json());

const MyCalendar = () => {
    const [{ raining }, setRaining] = useState<WeatherResponse>({
        raining: coinflip(),
    });

    const [events, setEvents] = useState([]);

    useEffect(() => {
        console.log("Loading weather...");
        getWeather().then((data) => setRaining(data));
    }, []);

    const [value, onChange] = useState<Value>(new Date());

    // const handleDateClick = ({ start, end }) => {
    //     // Prompt user for event details
    //     const title = prompt("Enter event title:");
    //     if (title) {
    //       setEvents([...events, { title, start, end }]);
    //     }
    //   };
      const firstDaty = 1;

    return (
        <div>
          <FullCalendar
              initialView = 'dayGridWeek'
              firstDay={firstDaty}
              locale="en"
              headerToolbar={{
                 left: "prev,next",
                 center: "title",
                 right: "dayGridMonth,timeGridWeek,timeGridDay"
              }}
              themeSystem="Simplex"
              plugins={[dayGridPlugin]}
              events={events}
              />
        </div>
    );
};

// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// export default function MyCalendar() {
//     const [date, setDate] = useState(new Date('2017-02-01'));

//     return (
//     <div>
//      <h1 className='text-center'>React Calendar</h1>
//       <div className='calendar-container'>
//             <Calendar onChange={setDate} value={date} />
//       </div>
//       <p className='text-center'>
//         <span className='bold'>Selected Date:</span>{' '}
//         {date.toDateString()}
//       </p>
//     </div>
//     );
// }

export default MyCalendar;
