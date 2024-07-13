import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { useRecoilValue } from "recoil";
import { isMobile } from "../atom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuBar() {
  const isUserMobile = useRecoilValue(isMobile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubMenuOpen] = useState(false);
  const navigate = useNavigate();
  const onSubmenu = () => {
    setIsSubMenuOpen((prev) => !prev);
  };

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
          <li>
            <div onClick={onSubmenu} className="flex justify-between menuBtn">
              <span>재고현황관리</span>
              {isSubmenuOpen ? (
                <ChevronUpIcon className="size-6" />
              ) : (
                <ChevronDownIcon className="size-6" />
              )}
            </div>

            <div
              className={`ml-4 transition-max-height duration-300 ease-in-out overflow-hidden ${
                isSubmenuOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <div
                className="menuBtn px-7 text-neutral-400 cursor-pointer"
                onClick={() => {
                  navigate("/manage-inventory");
                  setIsMenuOpen(false);
                }}
              >
                재고 게시글
              </div>
              <div
                className="menuBtn px-7 text-neutral-400 cursor-pointer"
                onClick={() => {
                  navigate("/manage-inventory");
                  setIsMenuOpen(false);
                }}
              >
                제품 생성 / 수정
              </div>
            </div>
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
