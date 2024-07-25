import React, { useState } from "react";
import Calendar from "react-calendar";
import "../style/calendar.css";
import dayjs from "dayjs";
import { useRecoilState, useRecoilValue } from "recoil";
import { initEvents, isMobile } from "../atom";
import EventLists from "./eventLists";

const ReactCalendar = () => {
  const isUserMobile = useRecoilValue(isMobile);
  const [events, setEvents] = useRecoilState(initEvents);
  const [listProps, setListProps] = useState(null);
  const tileContent = ({ date, view }) => {
    let event = [];
    if (view === "month") {
      for (let i = 0; i < events.length; i++) {
        if (events[i].date.toString() === date.toString()) {
          event.push(events[i]);
        }
      }

      return event ? (
        <div className="event">
          {event.map((e, i) => (
            <div
              key={i}
              className="h-[15px] overflow-hidden"
              style={{
                backgroundColor: `${e.color}`,
              }}
            >
              {e.line}
            </div>
          ))}
        </div>
      ) : null;
    }
    return null;
  };

  const onClickDay = (value, event) => {
    let temp = [];
    try {
      for (let i = 0; i < event.target.children[1].children.length; i++) {
        temp.push({
          date: value,
          title: event.target.children[1].children[i].innerText,
          color: event.target.children[1].children[i].style.backgroundColor,
        });
      }
    } catch (e) {}

    setListProps(temp);
  };

  return (
    <>
      <div className="calendar-container flex flex-col">
        <Calendar
          tileContent={tileContent}
          defaultValue={new Date()}
          formatDay={(locale, date) => dayjs(date).format("DD")}
          formatMonthYear={(locale, date) => dayjs(date).format("M월")}
          onClickDay={onClickDay}
        />
      </div>

      <EventLists listProps={listProps} />
    </>
  );
};

export default ReactCalendar;
