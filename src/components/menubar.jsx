import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useRecoilValue } from "recoil";
import { isMobile } from "../atom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function MenuBar() {
  const isUserMobile = useRecoilValue(isMobile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookie, , removeCookie] = useCookies(["tokens"]);
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/logout`)
        .then((res) => {
          console.log(res);
          const ok = window.confirm("정말로 로그아웃 하시겠어요?");
          if (ok) {
            if (cookie) {
              removeCookie("accessToken");
              removeCookie("refreshToken");
            }
            localStorage.clear();
            navigate("/login");
          }
        })
        .catch((err) => console.error(err));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full ${
          isUserMobile ? "w-full" : "w-[300px]"
        } bg-white p-5 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 flex flex-col gap-5 shadow-lg overflow-hidden`}
      >
        <XMarkIcon
          className="size-8 self-end iconHover"
          onClick={() => setIsMenuOpen(false)}
        />
        <img alt="logo" src={logo} className="w-10" />
        <div className="text-2xl font-bold">Username 님!</div>

        <ul>
          <li
            className="menuBtn"
            onClick={() => {
              navigate("/");
              setIsMenuOpen(false);
            }}
          >
            홈
          </li>
          <li
            onClick={() => {
              navigate("/calendar");
              setIsMenuOpen(false);
            }}
            className="menuBtn"
          >
            캘린더
          </li>
          <li
            onClick={() => {
              navigate("/manage-inventory");
              setIsMenuOpen(false);
            }}
            className="menuBtn"
          >
            재고현황관리
          </li>
          <li
            className="menuBtn"
            onClick={() => {
              navigate("/mypage");
              setIsMenuOpen(false);
            }}
          >
            마이페이지
          </li>
          <li
            className="menuBtn"
            onClick={() => {
              navigate("/about");
              setIsMenuOpen(false);
            }}
          >
            Info
          </li>
          <li
            className="menuBtn"
            onClick={() => {
              navigate("/notice");
              setIsMenuOpen(false);
            }}
          >
            공지사항
          </li>
          <li
            className="menuBtn"
            onClick={() => {
              onLogout();
              setIsMenuOpen(false);
            }}
          >
            로그아웃
          </li>
        </ul>
      </div>

      <div className="border-b-2 border-neutral-200 flex py-2 px-2 items-center justify-center">
        <Bars3Icon
          className="size-8 p-1 absolute top-4 left-4 rounded-full cursor-pointer hover:bg-yellow z-40"
          onClick={() => setIsMenuOpen(true)}
        />
        <div className="flex items-center gap-1">
          <img alt="logo" src={logo} className="w-9" />
          {isUserMobile ? null : (
            <span className="text-orange">Yello Book</span>
          )}
        </div>
      </div>
    </>
  );
}
