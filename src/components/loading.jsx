import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profile } from "../atom";

export default function Loading() {
  const [cookie, setCookies] = useCookies(["tokens"]);
  const [userInfo, setUserInfo] = useRecoilState(profile);
  const navigate = useNavigate();
  useEffect(() => {
    let err = false;
    console.log("loading");
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
          setUserInfo(res.data);
          if (res.data.data.teams.length > 0) {
            console.log(res.data.data.teams.length);
            err = true;
            navigate("/");
          } else {
            console.log("create로 가라");
            err = false;
            navigate("/login/create-team");
          }
        })
        .catch((e) => {
          console.error(e);
          err = false;
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <ScaleLoader color="#FFAB08" />
    </div>
  );
}
