import axios from "axios";
import React from "react";

const IsSwitch = ({ currTeam, teamLists }) => {
  const onSwitch = (e) => {
    const ok = window.confirm(`${e.target.innerHTML}으로 이동 하시겠습니까?`);
    if (ok) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/v1/teams/${e.target.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          alert(`${res.data.data.name}으로 이동했습니다.`);
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className="shadow-md py-2 px-2 absolute w-full z-50 bg-white">
      {teamLists.map((t, i) => {
        if (t.teamId !== currTeam.teamId)
          return (
            <div
              onClick={(e) => onSwitch(e)}
              key={i}
              id={t.teamId}
              className="cursor-pointer hover:bg-yellow transition-colors py-4"
            >
              {t.teamName}
            </div>
          );
        else
          return (
            <div
              className="flex items-center justify-between cursor-pointer py-4 hover:bg-yellow transition-colors"
              onClick={(e) => alert("이미 해당 워크스페이스입니다.")}
              key={i}
              id={t.teamId}
            >
              <div>{t.teamName}</div>
              <div>current</div>
            </div>
          );
      })}
    </div>
  );
};

export default IsSwitch;
