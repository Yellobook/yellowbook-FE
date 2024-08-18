import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profile } from "../atom";

export default function Loading() {
  const [cookie, setCookies] = useCookies(["tokens"]);
  const setPro = useSetRecoilState(profile);
  const navigate = useNavigate();
  useEffect(() => {
    let err;
    try {
      localStorage.setItem("accessToken", cookie.ac_t);
      localStorage.setItem("refreshToken", cookie.rf_t);

      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/v1/members/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setPro(res.data.data);
          err = res.data.data.teams.length;
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (e) {
      console.log(e);
    } finally {
      console.log("err", err);
      if (err > 0) {
        navigate("/");
      } else {
        navigate("/login/create-team");
      }
    }
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <ScaleLoader color="#FFAB08" />
    </div>
  );
}
