import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MobileHome from "./mobile/home/home";
import MobileCalendar from "./mobile/calendar/calendar";
import MobileManageInventory from "./mobile/manage-inventory/magage-inventory";
import MobileCheckInventory from "./mobile/check-inventory/check-inventory";
import MobileMyPage from "./mobile/mypage/mypage";
import MobileLogin from "./mobile/login/login";
import DesktopHome from "./desktop/home/home";
import DestkopCalendar from "./desktop/calendar/calendar";
import DesktopManageInventory from "./desktop/manage-inventory/magage-inventory";
import DesktopCheckInventory from "./desktop/check-inventory/check-inventory";
import DesktopMyPage from "./desktop/mypage/mypage";
import DesktopLogin from "./desktop/login/login";
import Navigator from "./navigator";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isMobile } from "./atom";
import DesktopAbout from "./desktop/about/about";
import MobileAbout from "./mobile/about/about";

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const DesktopRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigator isMobile={false} />,
    children: [
      { path: "/", element: <DesktopHome /> },
      { path: "/calendar", element: <DestkopCalendar /> },
      { path: "/manage-inventory", element: <DesktopManageInventory /> },
      { path: "/check-inventory", element: <DesktopCheckInventory /> },
      { path: "/mypage", element: <DesktopMyPage /> },
      { path: "/about", element: <DesktopAbout /> },
    ],
  },
  { path: "/login", element: <DesktopLogin /> },
]);

const MobileRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigator isMobile={true} />,
    children: [
      { path: "/", element: <MobileHome /> },
      { path: "/calendar", element: <MobileCalendar /> },
      { path: "/manage-inventory", element: <MobileManageInventory /> },
      { path: "/check-inventory", element: <MobileCheckInventory /> },
      { path: "/mypage", element: <MobileMyPage /> },
      { path: "/about", element: <MobileAbout /> },
    ],
  },
  { path: "/login", element: <MobileLogin /> },
]);

function App() {
  const [isUserMobile, setIsUserMobile] = useRecoilState(isMobile);
  useEffect(() => {
    const deviceStatus = isMobileDevice();
    setIsUserMobile(deviceStatus);
  }, [isUserMobile, setIsUserMobile]);
  return (
    <div className="App">
      {isUserMobile ? (
        <RouterProvider router={MobileRouter} />
      ) : (
        <RouterProvider router={DesktopRouter} />
      )}
    </div>
  );
}

export default App;
