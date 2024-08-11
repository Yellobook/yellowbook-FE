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
          console.log(res.data.data.teams);
          setUserInfo(res.data);
          if (res.data.data.teams) {
            navigate("/");
          } else {
            navigate("/login/create-team");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (e) {
      err = e;
      console.log(e);
    }
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <ScaleLoader color="#FFAB08" />
    </div>
  );
}
