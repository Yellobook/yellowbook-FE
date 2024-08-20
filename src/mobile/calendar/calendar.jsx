import OrderContainer from "./order";
import ManageCheckOrder from "./manage-check-order";
import Modal from "../../components/modal.jsx";
import OrderCheckOrder from "./orderer-check-order.jsx";
import Notice from "../notice/notice.jsx";
import search from "../../assets/mobile/calendar/search.svg";
import ReactCalendar from "../../components/calendar";
import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function MobileCalendar() {
  // 일정 추가 모달
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);

  // 일정 추가 버튼 핸들러
  const handleAdd = () => {
    setIsOpen(true);
  };

  // 일정 추가 버튼 필요 -> ReactCalendar 안에 생길거임
  // handleAdd를 props로 넘겨줘야 함

  return (
    <>
      {isModal ? (
        <div className="w-full h-full fixed top-0 left-0 bg-black/40 z-50 flex flex-col justify-center items-center">
          <div className="w-[300px] h-[600px] rounded-2xl bg-white py-5 px-10 flex flex-col items-center">
            <XMarkIcon
              className="text-orange size-8 self-end"
              onClick={() => setIsModal(false)}
            />
            <form className="px-5 py-5 w-[300px] h-full flex flex-col items-center justify-between text-[14px]">
              <div className="flex w-full justify-between">
                <div className="text-[17px]">날짜</div>
                <div className="flex *:text-[15px]">
                  <span className="">
                    <select
                      className="border-2 border-yellow mr-1 w-[70px]"
                      name=""
                      id=""
                    >
                      <option value="year">2024</option>
                      <option value="year">2025</option>
                      <option value="year">2026</option>
                      <option value="year">2027</option>
                      <option value="year">2028</option>
                      <option value="year">2029</option>
                    </select>
                    년
                  </span>
                  <span>
                    <select
                      name=""
                      id=""
                      className="border-2 border-yellow mr-1 w-[50px]"
                    >
                      <option value="year">05</option>
                    </select>
                    월
                  </span>
                  <span>
                    <select
                      name=""
                      id=""
                      className="border-2 border-yellow mr-1 w-[50px]"
                    >
                      <option value="year">20</option>
                    </select>
                    일
                  </span>
                </div>
              </div>

              <div className="w-full">
                <select
                  name=""
                  id=""
                  className="w-full border-2 border-yellow py-1"
                >
                  <option value="">일정종류</option>
                  <option value="">어쩌구</option>
                </select>
              </div>

              <div className="w-full flex flex-col items-center">
                <div className="w-full">공지 제목</div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="공지 또는 업무 타이틀을 입력해주세요."
                  className="w-full border-yellow border-2 py-1 px-2"
                />
              </div>

              <div className="w-full flex flex-col gap-3">
                <div className="grid grid-cols-[1fr_3fr]">
                  <div>제품</div>
                  <div className="border-yellow border-2 w-full flex items-center h-7">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="w-full focus:outline-none"
                      placeholder="제품 명을 입력해주세요."
                    />
                    <MagnifyingGlassIcon className="size-6 text-yellow" />
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_3fr]">
                  <span>하위제품</span>
                  <select
                    name=""
                    id=""
                    className="w-full border-2 border-yellow h-7"
                  >
                    <option value="">asdf</option>
                    <option value="">asdfasdf</option>
                  </select>
                </div>
                <div className="grid grid-cols-[1fr_3fr]">
                  <div>주문수량</div>
                  <div className="border-yellow border-2 w-full flex items-center h-7">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="w-full focus:outline-none"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <div>메모</div>
                <textarea
                  name=""
                  id=""
                  placeholder="주문 또는 공지와 업무에 관한 상세 정보나 메모를 입력해주세요."
                  className="resize-none border-2 border-yellow py-1 placeholder:text-sm px-2"
                ></textarea>
              </div>

              <div className="flex w-full justify-between items-center">
                <span>함께하는 멤버</span>
                <select
                  className="border-2 border-yellow w-[170px]"
                  name=""
                  id=""
                >
                  <option value="">asdf</option>
                  <option value="">asdf</option>
                  <option value="">asdf</option>
                </select>
              </div>

              <input
                type="submit"
                value="일정 게시하기"
                className="rounded-full bg-yellow w-full py-2"
              />
            </form>
          </div>
        </div>
      ) : null}
      <div className="flex flex-col gap-3">
        <div className="homeCard bg-yellow50">
          <div className="flex">최신 재고 현황을 확인해보세요!</div>
        </div>
        <div>
          <div className="flex border rounded-3xl border-yellow pl-3 gap-2">
            <img className="w-5" src={search} alt="돋보기 아이콘" />
            <input
              className="flex outline-none"
              placeholder="일정 키워드 검색"
            />
          </div>
        </div>
        <div className="relative">
          <div
            className="bg-orange text-white shadow-md rounded-xl py-1 px-2 absolute top-5 right-6 hover:bg-opacity-50 cursor-pointer transition-colors"
            onClick={() => {
              setIsModal(true);
            }}
          >
            + 일정
          </div>
          <ReactCalendar />
        </div>
        {isOpen & <OrderContainer />}
      </div>
    </>
  );
}
