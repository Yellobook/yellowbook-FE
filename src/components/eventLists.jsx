import { useRecoilValue } from "recoil";
import { initEvents } from "../atom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

export default function EventLists({ listProps }) {
  const onDelete = (prop) => {
    console.log(prop.id);
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/api/v1/informs/${prop.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          alert("삭제되었습니다.");
          window.location.reload();
        })
        .catch((e) =>
          alert("잘못된 요청입니다.\n작성자만 삭제할 수 있습니다.")
        );
    }
  };
  return (
    <div className="flex flex-col gap-4 py-5">
      {listProps
        ? listProps.map((prop, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-between gap-5 border-b-2 border-yellow"
              >
                <div className="flex gap-5 items-center">
                  <div className="h-10 w-3 bg-yellow" />

                  <div>{dayjs(prop.date).format("DD일")}</div>

                  <div className="text-xl">{prop.title}</div>
                </div>
                <div
                  className="px-3 hover:bg-yellow cursor-pointer border-yellow border-2 rounded-md py-1"
                  onClick={(e) => onDelete(prop)}
                >
                  delete
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
