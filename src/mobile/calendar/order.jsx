import React, { useState } from "react";
import { ReactComponent as Close } from "../calendar/close.svg";
import { ReactComponent as DropButton } from "../calendar/dropdown.svg";

const OrderContainer = () => {
  return (
    <div className="w-full h-screen bg-[rgba(0,0,0,0.50)] flex justify-center items-center">
      <div className="w-[300px] h-[554px] relative bg-white rounded-[40px] flex flex-col items-center">
        <Close className="absolute top-4 right-7" />
        <div className="px-8 pt-14 pb-9">
          <div className="flex justify-between mb-5">
            <Text size="text-lg" color="text-black">
              날짜
            </Text>
            <div className="flex justify-center items-center gap-1">
              <DropDown width="68px" height="24px" size="15px"/>
              <Text size="text-sm" color="text-gray-500">
                년
              </Text>
              <DropDown width="44px" height="24px" />
              <Text size="text-sm" color="text-gray-500">
                월
              </Text>
              <DropDown width="44px" height="24px" />
              <Text size="text-sm" color="text-gray-500">
                일
              </Text>
            </div>
          </div>
          <DropDown width="240px" height="24px" hint="일정 종류" />
          <div className="mt-5 mb-6">
            <h1>공지 제목</h1>
            <div>
              <input
                className="w-[240px] h-[33px] border border-[#FFDE33]"
                placeholder="공지 또는 업무 타이틀을 입력해주세요."
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1>제품</h1>
              <div>
                <input
                  className="w-[169px] h-[24px] border border-[#FFDE33]"
                  placeholder="제품 명을 입력해주세요."
                />
              </div>
            </div>
            <div className="flex justify-between">
              <h1>하위제품</h1>
              <DropDown width="169px" height="24px" />
            </div>
            <div className="flex justify-between">
              <h1>주문수량</h1>
              <input className="w-[169px] h-[24px] border border-[#FFDE33]" />
            </div>
          </div>
          <div className="mt-5">
            <h1>메모</h1>
            <div className="w-[240px] h-[56px] border border-[#FFDE33]">
              <textarea placeholder="주문 또는 공지와 업무에 관한 상세 정보나 메모를 입력해주세요." />
            </div>
          </div>
          <div className="flex justify-between">
            <h1>함께하는 멤버</h1>
            <DropDown width="132px" height="24px" />
          </div>
        </div>
        <button className="w-[240px] h-[37px] bg-[#FFDE33] rounded-[30px]">
          일정 게시하기
        </button>
      </div>
    </div>
  );
};
export default OrderContainer;

// dropdown
const DropDown = ({ width, height, size, hint }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-white border border-[#FFDE33] flex items-center`}
      style={{ width: width, height: height }}
    >
      <div>{hint}</div>
      <button onClick={toggleDropdown}>
        <DropButton />
      </button>
      {isOpen && (
        <ul>
          <li>목록1</li>
          <li>목록2</li>
          <li>목록3</li>
        </ul>
      )}
    </div>
  );
};

const Text = ({ color, size, children }) => {
  return <p className={`${size} ${color}`}>{children}</p>;
};
