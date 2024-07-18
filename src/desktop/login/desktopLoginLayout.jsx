import { Outlet } from "react-router-dom";
import logo from ".././../assets/logo.png";
import { useRecoilValue } from "recoil";
import { isMobile } from "../../atom";

export default function DesktopLoginLayout() {
  const isUserMobile = useRecoilValue(isMobile);
  return (
    <div>
      <div className="border-b-2 border-neutral-200 flex py-2 px-2 items-center justify-center">
        <div className="flex items-center gap-1">
          <img alt="logo" src={logo} className="w-9" />
          {isUserMobile ? null : (
            <span className="text-orange">Yello Book</span>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
