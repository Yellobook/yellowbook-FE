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
    try {
      localStorage.setItem("accessToken", cookie.ac_t);
      localStorage.setItem("refreshToken", cookie.rf_t);
    } catch (e) {
      console.log(e);
    } finally {
      navigate("/");
    }
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <ScaleLoader color="#FFAB08" />
    </div>
  );
}
