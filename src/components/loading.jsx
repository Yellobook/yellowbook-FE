import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profile } from "../atom";

export default function Loading() {
  const [cookie, setCookies] = useCookies(["tokens"]);
  const navigate = useNavigate();
  useEffect(() => {
    let err;
    console.log("loading");
    try {
      localStorage.setItem("accessToken", cookie.ac_t);
      localStorage.setItem("refreshToken", cookie.rf_t);

      err = axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/v1/members/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data.teams.length > 0) {
            console.log("what");
            console.log(res.data.data.teams);
            return true;
          } else {
            console.log("no");
            return false;
          }
        })
        .catch((e) => {
          console.error(e);
          return false;
        });
    } catch (e) {
      console.log(e);
    } finally {
      if (err) {
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
