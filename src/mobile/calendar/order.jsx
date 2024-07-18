import React, { useState } from "react";
import { ReactComponent as Close } from "../../assets/mobile/calendar/close.svg";
import { ReactComponent as DropButton } from "../../assets/mobile/calendar/dropdown.svg";
import { ReactComponent as Search } from "../../assets/mobile/calendar/search.svg";

const OrderContainer = () => {
  return (
    <div className="w-full h-screen bg-[rgba(0,0,0,0.50)] flex justify-center items-center">
      <div className="w-[300px] h-[554px] relative bg-white rounded-[40px] flex flex-col items-center">
        <Close className="absolute top-4 right-7" />
        <div className="px-8 pt-14 pb-6">
          <div className="flex justify-between mb-5">
            <div flex items-center>
              <Text size="text-base" color="text-black">
                날짜
              </Text>
            </div>
            <div className="flex items-center gap-1 z-50 text-sm text-customGray">
              <div className="flex items-center">
                <DropDown width="68px" height="24px" size="15px" />
                <Text size="text-sm" color="text-dateGray">
                  년
                </Text>
              </div>
              <div className="flex items-center">
                <DropDown width="44px" height="24px" />
                <Text size="text-sm" color="text-dateGray">
                  월
                </Text>
              </div>
              <div className="flex items-center">
                <DropDown width="44px" height="24px" />
                <Text size="text-sm" color="text-dateGray">
                  일
                </Text>
              </div>
            </div>
          </div>
          <DropDown
            width="240px"
            height="24px"
            hint="일정 종류"
            color="text-customGray1"
            weight="font-median"
            className="z-40"
          />
          <div className="mt-5 mb-6">
            <h1>공지 제목</h1>
            <div className="w-[240px] h-[33px] border border-[#FFDE33] text-xs font-light p-1 flex">
              <input
                className="w-[201px] placeholder-customGray1"
                placeholder="공지 또는 업무 타이틀을 입력해주세요."
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1>제품</h1>
              <div className="flex justify-between w-[169px] h-[24px] border border-[#FFDE33] text-xs font-light p-1">
                <input
                  className="placeholder-customGray1 w-[129px]"
                  placeholder="제품 명을 입력해주세요."
                />
                <Search/>
              </div>
            </div>
            <div className="flex justify-between">
              <h1>하위제품</h1>
              <DropDown width="169px" height="24px" />
            </div>
            <div className="flex justify-between">
              <h1>주문수량</h1>
              <input className="w-[169px] h-[24px] border border-[#FFDE33] p-1" />
            </div>
          </div>
          <div className="mt-5">
            <h1>메모</h1>
            <div className="w-[240px] h-[56px] border border-[#FFDE33]">
              <textarea
                className="w-full h-full text-xs font-light p-1 placeholder-customGray1"
                placeholder="주문 또는 공지와 업무에 관한 상세 정보나 메모를 입력해주세요."
              />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <h1>함께하는 멤버</h1>
            <DropDown width="132px" height="24px" />
          </div>
        </div>
        <button className="w-[240px] h-[37px] bg-[#FFDE33] rounded-[30px] text-lg">
          일정 게시하기
        </button>
      </div>
    </div>
  );
};
export default OrderContainer;

// dropdown
const DropDown = ({ width, height, size, hint, color, weight }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // 토클 클릭 이벤트
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 항목 클릭 이벤트
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <div className={`relative`} style={{ width: width, height: height }}>
      <div
        className={`bg-white border border-[#FFDE33] flex items-center justify-between p-1 ${color} ${weight} cursor-pointer`}
        onClick={toggleDropdown}
      >
        {selectedItem || hint}
        <button onClick={toggleDropdown} className="ml-auto">
          <DropButton />
        </button>
      </div>
      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white shadow-lg border border-[#FFDE33]">
          <li
            className="py-1 px-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleItemClick("목록1")}
          >
            목록1
          </li>
          <li
            className="py-1 px-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleItemClick("목록2")}
          >
            목록2
          </li>
          <li
            className="py-1 px-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleItemClick("목록3")}
          >
            목록3
          </li>
        </ul>
      )}
    </div>
  );
};

export const Text = ({ color, size, weight, children }) => {
  const textStyle = {
    fontSize: size,
    color: color,
    fontWeight: weight,
  };

  return (
    <p className={`${size} ${color} ${weight}`} style={textStyle}>
      {children}
    </p>
  );
};
