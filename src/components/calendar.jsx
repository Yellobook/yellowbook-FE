import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../style/calendar.css";
import dayjs from "dayjs";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultDate, defaultYear, initEvents, isMobile } from "../atom";
import EventLists from "./eventLists";
import axios from "axios";

const ReactCalendar = () => {
  const [events, setEvents] = useRecoilState(initEvents);
  const [listProps, setListProps] = useState(null);
  const [currYear, setCurrYear] = useRecoilState(defaultYear);
  const [currMonth, setcurrMonth] = useRecoilState(defaultDate);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/schedule/monthly`, {
        params: {
          year: currYear,
          month: currMonth + 1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setEvents(res.data.data.calendar);
      })
      .catch((e) => console.log(e));
  }, [currYear, currMonth]);

  const tileContent = ({ date, view }) => {
    let eventTemp = [];
    if (view === "month") {
      for (let i = 0; i < events.length; i++) {
        if (events[i].day === date.getDate()) {
          for (let j = 0; j < events[i].titles.length; j++) {
            eventTemp.push(events[i].titles[j]);
          }
        }
      }

      return eventTemp ? (
        <div className="event">
          {eventTemp.map((e, i) => (
            <div key={i} className="h-[15px] overflow-hidden bg-yellow">
              {e}
            </div>
          ))}
        </div>
      ) : null;
    }
    return null;
  };

  const onClickDay = (value, event) => {
    let temp = [];

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/schedule/daily`, {
        params: {
          year: value.getFullYear(),
          month: value.getMonth() + 1,
          day: value.getDate(),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setListProps(res.data.data.schedules);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="calendar-container flex flex-col">
        <Calendar
          tileContent={tileContent}
          defaultValue={new Date()}
          formatDay={(locale, date) => dayjs(date).format("DD")}
          formatMonthYear={(locale, date) => {
            const dd = dayjs(date).format("M월");
            setCurrYear(date.getFullYear());
            setcurrMonth(date.getMonth());
            return dd;
          }}
          onClickDay={onClickDay}
        />
      </div>

      <EventLists listProps={listProps} />
    </>
  );
};

export default ReactCalendar;
