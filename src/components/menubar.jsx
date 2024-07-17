import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useRecoilValue } from "recoil";
import { isMobile } from "../atom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuBar() {
  const isUserMobile = useRecoilValue(isMobile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`absolute top-0 left-0 h-full w-[20%] bg-white p-5 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 flex flex-col gap-5 shadow-lg`}
      >
        <XMarkIcon
          className="size-6 self-end iconHover"
          onClick={() => setIsMenuOpen(false)}
        />
        <img alt="logo" src="./logo.png" className="w-10" />
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
        </ul>
      </div>

      <div className="border-b-2 border-neutral-200 flex py-2 px-2 items-center justify-center">
        <Bars3Icon
          className="size-8 p-1 absolute top-4 left-4 rounded-full cursor-pointer hover:bg-yellow z-40"
          onClick={() => setIsMenuOpen(true)}
        />
        <div className="flex items-center gap-1">
          <img alt="logo" src="./logo.png" className="w-9" />
          {isUserMobile ? null : (
            <span className="text-orange">Yellow Book</span>
          )}
        </div>
      </div>
    </>
  );
}
