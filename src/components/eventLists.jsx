import { useRecoilValue } from "recoil";
import { initEvents } from "../atom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function EventLists({ listProps }) {
  const calendarMonth = document.getElementsByClassName(
    "react-calendar__navigation__label__labelText react-calendar__navigation__label__labelText--from"
  );
  useEffect(() => {
    console.log(Number(calendarMonth[0].innerText.replace("월", "")));
  }, []);
  return (
    <div className="flex flex-col gap-4 py-5">
      {listProps
        ? listProps.map((prop, i) => {
            return (
              <div
                key={i}
                className="flex items-center gap-5 border-b-2"
                style={{
                  borderColor: `${prop.color}`,
                }}
              >
                <div
                  className="h-10 w-3"
                  style={{
                    backgroundColor: `${prop.color}`,
                  }}
                />

                <div>{dayjs(prop.date).format("DD일")}</div>

                <div className="text-xl">{prop.title}</div>
              </div>
            );
          })
        : null}
    </div>
  );
}
