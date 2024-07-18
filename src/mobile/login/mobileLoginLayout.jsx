import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function MobileLoginLayout() {
  return (
    <div>
      <div className="border-b-2 border-neutral-200 flex py-2 px-2 items-center justify-center">
        <div className="flex items-center gap-1">
          <img alt="logo" src={logo} className="w-9" />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
