import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

const CalendarModal = ({ setIsModal }) => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-black/40 z-50 flex flex-col justify-center items-center">
      <div className="w-[90%] h-[600px] rounded-2xl bg-white py-5 px-10 flex flex-col items-center">
        <XMarkIcon
          className="text-orange size-8 self-end"
          onClick={() => setIsModal(false)}
        />
        <form className="py-5 w-[95%] h-full flex flex-col items-center justify-between text-[14px]">
          <div className="flex w-full justify-between">
            <div className="text-[15px]">날짜</div>
            <div className="flex *:text-[15px]">
              <span className="">
                <select
                  className="border-2 border-yellow mr-1 w-[50px] text-neutral-500 text-[13px]"
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
                <span className="text-[10px]">년</span>
              </span>
              <span>
                <select
                  name=""
                  id=""
                  className="border-2 border-yellow mr-1 w-[50px] text-neutral-500 text-[13px]"
                >
                  <option value="year">05</option>
                </select>
                <span className="text-[10px]">월</span>
              </span>
              <span>
                <select
                  name=""
                  id=""
                  className="border-2 border-yellow mr-1 w-[50px] text-neutral-500 text-[13px]"
                >
                  <option value="year">20</option>
                </select>
                <span className="text-[10px]">일</span>
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
            <select className="border-2 border-yellow w-[170px]" name="" id="">
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
  );
};

export default CalendarModal;
