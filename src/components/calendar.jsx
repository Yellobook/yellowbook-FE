import React from "react";
import Calendar from "react-calendar";
import "../style/calendar.css";
import dayjs from "dayjs";

const ReactCalendar = () => {
  const events = [
    {
      date: new Date(2024, 6, 7),
      title: [{ line: "제품 10개", color: "orange" }],
    },
    {
      date: new Date(2024, 6, 20),
      title: [
        { line: "제품 10개", color: "yellow" },
        { line: "제품 10개", color: "orange" },
      ],
    },
    {
      date: new Date(2024, 6, 29),
      title: [{ line: "제품 10개", color: "yellow" }],
    },
  ];

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const event = events.find(
        (e) => e.date.toDateString() === date.toDateString()
      );
      return event ? (
        <div className="event">
          {event.title.map((t, index) => (
            <div
              className=""
              style={{
                backgroundColor: `${t.color}`,
              }}
              key={index}
            >
              {t.line}
            </div>
          ))}
        </div>
      ) : null;
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        tileContent={tileContent}
        defaultValue={new Date()}
        formatDay={(locale, date) => dayjs(date).format("DD")}
        formatMonthYear={(date) => dayjs(date).format("M월")}
      />
    </div>
  );
};

export default ReactCalendar;
