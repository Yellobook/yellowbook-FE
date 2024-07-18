import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isMobile } from "./atom";
import MenuBar from "./components/menubar";

export default function Navigator() {
  const isUserMobile = useRecoilValue(isMobile);
  return (
    <div>
      <MenuBar />
      {isUserMobile ? (
        <div className="px-5 py-3">
          <Outlet />
        </div>
      ) : (
        <div className="lg:px-96 px-24 py-7">
          <Outlet />
        </div>
      )}
    </div>
  );
}
