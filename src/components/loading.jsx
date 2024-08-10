import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

export default function Loading() {
  const [cookie, setCookies] = useCookies(["tokens"]);
  const navigate = useNavigate();
  useEffect(() => {
    let err;
    try {
      localStorage.setItem("accessToken", cookie.ac_t);
      localStorage.setItem("refreshToken", cookie.rf_t);
    } catch (e) {
      err = e;
      console.log(e);
    } finally {
      if (!err && cookie) {
        navigate("");
      }
    }
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <ScaleLoader color="#FFAB08" />
    </div>
  );
}
