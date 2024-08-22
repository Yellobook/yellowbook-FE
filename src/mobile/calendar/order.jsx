import React, { useState } from "react";
import { ReactComponent as Close } from "../../assets/mobile/calendar/close.svg";
import { ReactComponent as DropButton } from "../../assets/mobile/calendar/dropdown.svg";
import { ReactComponent as Search } from "../../assets/mobile/calendar/search.svg";
import orderWrite from "./orderApi/orderWrite";
import PostNotice from "../notice/postNotice";
import { useNavigate } from "react-router-dom";

const OrderContainer = ({ setIsModal }) => {
  // 임시 목록
  const yearList = ["2024"];
  const monthList = ["08"];
  const dayList = ["11"];
  const memberList = [
    { id: 1, name: "Member1" },
    { id: 2, name: "Member2" },
  ];
  const list = ["2024", "5", "20"];
  //const [informId, setInformId] = useState(null);
  const navigate = useNavigate();

  // 공지사항 or 주문
  const OrderNotice = ["주문", "공지사항"];

  // 제품 ID, 메모, 날짜, 주문 수량을 상태로 관리
  const [productId, setProductId] = useState(0);
  const [memo, setMemo] = useState("");
  const [orderAmount, setOrderAmount] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // 공지사항인 경우
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [mentionedId, setMentionedId] = useState(null);

  // Dropdown 선택 핸들러
  const handleYearSelect = (item) => setYear(item);
  const handleMonthSelect = (item) => setMonth(item);
  const handleDaySelect = (item) => setDay(item);
  const handleMemberSelect = (item) => setMentionedId(item.id);

  const formattedDate = `${year}-${month}-${day}`;

  // 공지사항 -> 일정 게시하기 버튼 핸들러
  const handleNotice = async () => {
    try {
      const noticeData = {
        title,
        memo,
        mentionedId: [],
        date: formattedDate,
      };

      console.log("NoticeData:", noticeData); // API 호출 전 확인용

      const response = await PostNotice(noticeData);

      console.log("공지사항 작성 성공:", response);
      //setInformId(response.data.informId);
      if (response && response.data.informId) {
        navigate(`/notice/${response.data.informId}`);
      }

      // 주문 작성 성공 시의 추가 처리
    } catch (error) {
      console.error("공지사항 작성 실패:", error);
      // 주문 작성 실패 시의 추가 처리
    }
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  // 일정 게시하기 버튼 핸들러
  const handleOrder = async () => {
    try {
      const response = await orderWrite(
        productId,
        memo,
        formattedDate,
        orderAmount
      );
      console.log("주문 작성 성공:", response);
      // 주문 작성 성공 시의 추가 처리
    } catch (error) {
      console.error("주문 작성 실패:", error);
      // 주문 작성 실패 시의 추가 처리
    }
  };

  // 일정 게시하기 버튼 클릭 핸들러
  const handleButtonClick = () => {
    if (selectedItem === "공지사항") {
      handleNotice();
    } else if (selectedItem === "주문") {
      handleOrder();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[18.75rem] h-[34.625rem] relative bg-white rounded-[2.5rem] flex flex-col items-center">
        <Close
          className="absolute top-[1rem] right-[1.75rem]"
          onClick={() => {
            setIsModal(false);
          }}
        />
        <div className="px-[2rem] pt-[3.5rem] pb-[1.5rem]">
          <div className="flex justify-between mb-[1.25rem]">
            <div flex items-center>
              <Text size="text-base" color="text-black">
                날짜
              </Text>
            </div>
            <div className="flex items-center gap-[0.25rem] z-50 text-sm text-customGray">
              <div className="flex items-center">
                <DropDown
                  width="4.25rem"
                  height="1.5rem"
                  size="0.9375rem"
                  items={yearList}
                  wid="4rem"
                  hei="1.5rem"
                  onSelect={handleYearSelect}
                />
                <Text size="text-sm" color="text-dateGray">
                  년
                </Text>
              </div>
              <div className="flex items-center">
                <DropDown
                  width="2.75rem"
                  height="1.5rem"
                  items={monthList}
                  size="0.9375rem"
                  wid="2rem"
                  hei="1.5rem"
                  onSelect={handleMonthSelect}
                />
                <Text size="text-sm" color="text-dateGray">
                  월
                </Text>
              </div>
              <div className="flex items-center">
                <DropDown
                  width="2.75rem"
                  height="1.5rem"
                  items={dayList}
                  size="0.9375rem"
                  wid="2rem"
                  hei="1.5rem"
                  onSelect={handleDaySelect}
                />
                <Text size="text-sm" color="text-dateGray">
                  일
                </Text>
              </div>
            </div>
          </div>
          <DropDown
            width="15rem"
            height="1.5rem"
            hint="일정 종류"
            weight="font-median"
            className="z-40"
            items={OrderNotice}
            size="0.9375rem"
            hintColor="text-dateGray"
            wid="13rem"
            hei="1.5rem"
            onSelect={handleSelect}
          />
          <div className="mt-[1.25rem] mb-[1.5rem]">
            <h1>공지 제목</h1>
            <div className="w-[15rem] h-[2.0625rem] border border-[#FFDE33] text-xs font-light flex items-center">
              <input
                className="w-full h-full m-0 p-1 placeholder-customGray1"
                placeholder="공지 또는 업무 타이틀을 입력해주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <div className="flex justify-between">
              <h1>제품</h1>
              <div className="flex justify-between w-[10.5625rem] h-[1.5rem] border border-[#FFDE33] text-xs font-light items-center pr-1">
                <input
                  className="placeholder-customGray1 w-[8.0625rem]"
                  placeholder="제품 명을 입력해주세요."
                />
                <Search />
              </div>
            </div>
            <div className="flex justify-between">
              <h1>하위제품</h1>
              <DropDown
                width="10.5625rem"
                height="1.5rem"
                items={list}
                size="0.75rem"
                wid="9rem"
                hei="1.5rem"
              />
            </div>
            <div className="flex justify-between">
              <h1>주문수량</h1>
              <div className="w-[10.5625rem] h-[1.5rem] border border-[#FFDE33] flex items-center">
                <input className="w-full h-full text-xs font-light m-0 p-1" />
              </div>
            </div>
          </div>
          <div className="mt-[1.25rem]">
            <h1>메모</h1>
            <div className="w-[15rem] h-[3.5rem] border border-[#FFDE33]">
              <textarea
                className="w-full h-full text-xs font-light p-1 placeholder-customGray1"
                placeholder="주문 또는 공지와 업무에 관한 상세 정보나 메모를 입력해주세요."
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between mt-[0.5rem]">
            <h1>함께하는 멤버</h1>
            <DropDown
              width="8.25rem"
              height="1.5rem"
              items={memberList.map((member) => member.name)}
              size="0.75rem"
              wid="8rem"
              hei="1.5rem"
              onSelect={(item) =>
                handleMemberSelect(memberList.find((m) => m.name === item))
              }
            />
          </div>
        </div>
        <button
          className="w-[15rem] h-[2.3125rem] bg-[#FFDE33] rounded-[1.875rem] text-lg"
          onClick={handleButtonClick}
        >
          일정 게시하기
        </button>
      </div>
    </div>
  );
};
export default OrderContainer;

// dropdown
const DropDown = ({
  width,
  height,
  size,
  hint,
  color,
  weight,
  items,
  hintColor = "text-customGray1",
  wid,
  hei,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // 토글 클릭 이벤트
  const toggleDropdown = (e) => {
    setIsOpen(!isOpen);
  };

  // 항목 클릭 이벤트
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // 선택 후 드롭다운 닫기
    if (onSelect) {
      onSelect(item); // 선택한 아이템 부모 컴포넌트에 전달
    }
  };

  return (
    <div
      className={`relative`}
      style={{
        width: width,
        height: height,
      }}
    >
      <div
        className={`bg-white border border-[#FFDE33] flex items-center p-[0.0625rem] ${color} ${weight} cursor-pointer text-[${size}] pl-1`}
        onClick={toggleDropdown}
        style={{ boxSizing: "border-box", minHeight: hei, minWidth: wid }}
      >
        {selectedItem ? (
          <span>{selectedItem}</span>
        ) : (
          <span className={`text-[${size}] ${hintColor}`}>{hint}</span>
        )}
        <button className="absolute right-1" onClick={toggleDropdown}>
          <DropButton />
        </button>
      </div>
      {isOpen && (
        <ul className="absolute mt-[0.0625rem] w-full bg-white shadow-lg border border-[#FFDE33]">
          {items.map((item, index) => (
            <DropDownItem
              key={index}
              item={item}
              onClick={handleItemClick}
              fontSize="0.75rem"
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export const DropDownItem = ({ item, onClick, fontSize }) => {
  return (
    <li
      className="py-[0.0625rem] px-[0.125rem] cursor-pointer hover:bg-gray-100"
      onClick={() => onClick(item)}
      style={{ fontSize: fontSize }}
    >
      {item}
    </li>
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
