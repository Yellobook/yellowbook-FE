import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ReactComponent as DropButton } from "../assets/mobile/calendar/dropdown.svg";
import { PostNotice } from "../util/NoticeUtils";
import { getMembers } from "../util/TeamUtils";
import {
  inventoryName,
  inventorySubName,
} from "../util/InventorySearchUtils";
import { orderWrite } from "../util/OrderUtils";
import { useIsCustomer } from "../util/Context";
import Search from "../assets/desktop/calendar/search.svg";

const CalendarModal = ({ setIsModal }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [mentionedIds, setMentionedIds] = useState([]);
  const [productName, setProductName] = useState("");
  const [productSubNames, setProductSubNames] = useState([]);
  const [productId, setProductId] = useState(null);
  const [orderAmount, setOrderAmount] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [memo, setMemo] = useState("");
  const [memberName, setMemberName] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const formattedDate = `${year}-${month}-${day}`;
  const [order, setOrder] = useState(false); // 공지사항 | 주문 => 비활성화 여부

  // 날짜 리스트
  const currentYear = new Date().getFullYear();
  const yearList = Array.from({ length: 3 }, (_, i) =>
    (currentYear + i).toString()
  );
  const monthList = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const [dayList, setDayList] = useState([]);

  useEffect(() => {
    if (year && month) {
      const daysInMonth = new Date(year, month, 0).getDate();
      const days = Array.from({ length: daysInMonth }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
      );
      setDayList(days);
    }
  }, [year, month]);

  const isCustomer = useIsCustomer();

  // 공지사항 or 주문
  console.log('사용자 권한 뭐임?:', isCustomer);
  const OrderNotice = isCustomer === "주문자" ? ["주문", "공지사항"] : ["공지사항"];


  // 멤버 리스트 가져오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMembers();
        if (response?.data?.members) {
          const members = response.data.members.map((member) => ({
            id: member.memberId,
            name: member.nickname,
          }));
          setMemberName(members);
        }
      } catch (error) {
        console.error("팀 멤버 조회 실패:", error);
      }
    };
    fetchMembers();
  }, []);

  // 제품 이름 검색
  const handleName = async () => {
    try {
      const response = await inventoryName(productName);
      console.log("제품 데이터:", response.data.names);
      await handleSubNameList();
    } catch (error) {
      console.error("제품 이름 조회 실패: ", error);
    }
  };

  // 하위 제품 리스트 가져오기
  const handleSubNameList = async () => {
    try {
      const response = await inventorySubName(productName);
      if (response?.data?.subProducts) {
        const subProducts = response.data.subProducts.map((subProduct) => ({
          id: subProduct.productId,
          name: subProduct.subProductName,
        }));
        setProductSubNames(subProducts);
      }
    } catch (error) {
      console.error("제품 하위 이름 조회 실패: ", error);
    }
  };

  // 하위 제품 선택
  const handleProductSelect = (selectedName) => {
    console.log("Selected Name: ", selectedName);

    const selectedProduct = productSubNames.find(
      (subProduct) => subProduct.name === selectedName.name
    );
    if (selectedProduct) {
      setProductId(selectedProduct.id); // 선택한 하위 제품의 ID를 설정
      console.log("Selected Product ID:", selectedProduct.id);
    } else {
      console.log("Product not found.");
    }
  };

  // 공지 또는 주문 처리
  const handleButtonClick = async () => {
    try {
      if (selectedItem === "공지사항") {
        const response = await PostNotice({
          title,
          memo,
          mentionIds: selectedMembers.map((m) => m.id),
          date: formattedDate,
        });
        console.log("공지사항 작성 성공:", response);
        setIsModal(false);
      } else if (selectedItem === "주문") {
        setOrder(selectedItem === "주문");
        const response = await orderWrite(productId, memo, formattedDate, orderAmount);
        console.log("주문 작성 성공:", response);
        setIsModal(false);
      }
    } catch (error) {
      console.error(`${selectedItem} 작성 실패:`, error);
    }
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-black/40 z-50 flex flex-col justify-center items-center">
      <div className="w-[90%] h-[700px] rounded-2xl bg-white py-5 px-10 flex flex-col items-center">
        <XMarkIcon
          className="text-orange size-8 self-end cursor-pointer"
          onClick={() => setIsModal(false)}
        />
        <form className="py-5 w-[95%] h-full flex flex-col items-center justify-between text-[14px]">
          {/* 날짜 선택 */}
          <div className="flex w-full justify-between">
            <div className="text-[15px]">날짜</div>
            <div className="flex text-[15px] w-[80%] gap-5">
              <div className="flex w-[30%] items-center">
                <Dropdown width="70%" height="100%" items={yearList} onSelect={setYear} />
                <Text size="text-sm" color="text-dateGray">
                  년
                </Text>
              </div>
              <div className="flex w-[30%] items-center">
                <Dropdown width="70%" items={monthList} onSelect={setMonth} />
                <Text size="text-sm" color="text-dateGray">
                  월
                </Text>
              </div>
              <div className="flex w-[30%] items-center">
                <Dropdown width="70%" items={dayList} onSelect={setDay} />
                <Text size="text-sm" color="text-dateGray">
                  일
                </Text>
              </div>
            </div>
          </div>

          {/* 공지사항 또는 주문 선택 */}
          <Dropdown
            width="100%"
            items={OrderNotice}
            onSelect={(item) => {
              setSelectedItem(item);
              setOrder(item === "주문"); // "주문"일 경우 order를 true로 설정
            }}
            hint="일정 종류"
            hintColor="text-dateGray"
          />

          {/* 공지 제목 */}
          <div className="w-full flex flex-col items-center">
            <div className="w-full">공지 제목</div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지 또는 업무 타이틀을 입력해주세요."
              className="w-full border-yellow border-2 py-1 px-2"
              disabled={order}
            />
          </div>

          {/* 제품, 하위 제품, 주문 수량 */}
          <div className="w-full flex flex-col gap-3">
            <div className="flex justify-between">
              <div>제품</div>
              <div className="flex w-[70%] h-[2rem] border-2 border-[#FFDE33] items-center px-1">
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="제품 명을 입력해 주세요."
                  className="placeholder-customGray1 w-full"
                  disabled={!order}
                />
                <img src={Search} alt="돋보기 아이콘" onClick={order ? handleName : undefined} />
                {/* <MagnifyingGlassIcon className="size-6 text-yellow cursor-pointer" onClick={order ? handleName : undefined} /> */}
              </div>
            </div>
            <div className="flex justify-between">
              <div>하위 제품</div>
              <Dropdown
                width="70%"
                items={productSubNames}
                onSelect={handleProductSelect}
                // placeholder="하위 제품 선택"
              />
            </div>
            <div className="flex justify-between">
              <div>주문 수량</div>
              <input
                type="text"
                value={orderAmount}
                onChange={(e) => setOrderAmount(e.target.value)}
                // placeholder="수량 입력"
                className="border-yellow border-2 w-[70%] py-1 px-2 m-0"
                disabled={!order}
              />
            </div>
          </div>

          {/* 메모 */}
          <div className="flex flex-col w-full">
            <div>메모</div>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="주문 또는 공지와 업무에 관한 상세 정보나 메모를 입력해주세요."
              className="resize-none border-yellow border-2 py-1 px-2"
            />
          </div>

          {/* 멤버 선택 */}
          <MultiSelectDropDown
            items={memberName}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
          />

          {/* 일정 게시 버튼 */}
          <button
            type="button"
            onClick={handleButtonClick}
            className="bg-yellow text-white py-2 px-4 rounded-lg mt-5"
          >
            일정 게시하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default CalendarModal;

//import { ReactComponent as DropButton } from "../../assets/mobile/calendar/dropdown.svg"; // Dropdown 화살표 아이콘

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

export const Dropdown = ({ width, height, items, onSelect, selectedItem, placeholder, hint, hintColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedItem || null); // 기본값이 선택되어 있을 경우 설정

  // Dropdown 열기/닫기 토글
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 항목 선택 시
  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false); // 선택 후 드롭다운 닫기
    if (onSelect) {
      onSelect(item); // 선택한 아이템 부모 컴포넌트에 전달
    }
  };

  return (
    <div className="relative" style={{ width: width, height: height }}> 
      {/* Dropdown 버튼 */}
      <div
        className="border-2 border-yellow p-2 flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        {selected ? (
          typeof selected === "object" ? (
            <span>{selected.name}</span>
          ) : (
            <span>{selected}</span>
          )
        ) : (
          <span className={` ${hintColor}`}>{hint}</span>
        )}
        {/* <span className={`${selected ? "text-black" : hintColor}`}>{selected ? selected : hint}</span> */}
        <DropButton />
      </div>
      {/* Dropdown 항목 리스트 */}
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-yellow shadow-lg max-h-60 overflow-y-auto">
          {items.map((item, index) => (
            <DropDownItem // 여기서 DropDownItem 컴포넌트 사용
              key={index}
              item={item}
              onClick={handleSelect}
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
      {typeof item === "object" ? item.name : item}
    </li>
  );
};

// 함께하는 멤버 언급
export const MultiSelectDropDown = ({ items, selectedMembers, setSelectedMembers }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

// 멤버 선택 핸들러
  const handleMemberSelect = (item) => {
    if (item.name === "전체") {
      // "전체" 항목 선택 시, 모든 멤버 선택
      if (selectedMembers.length === items.length) {
        // 이미 모두 선택된 경우, 전체 선택 해제
        setSelectedMembers([]);
      } else {
        // 전체 선택
        setSelectedMembers(items);
      }
    } else {
      if (selectedMembers.some((member) => member.id === item.id)) {
        // 이미 선택된 멤버라면 제거
        setSelectedMembers(
          selectedMembers.filter((member) => member.id !== item.id)
        );
      } else {
        // 새롭게 선택된 멤버 추가
        setSelectedMembers([...selectedMembers, item]);
      }
    }
  };

  return (
    <div className="relative" style={{ width: "40%", height: "1.5rem", fontSize: "0.75rem" }}>
      <div
        className="bg-white border-2 border-[#FFDE33] p-1 cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        <div className="flex flex-wrap">
          {selectedMembers.length > 0 ? (
            selectedMembers.map((member) => (
              <span key={member.id} className="mr-2">
                {member.name}
              </span>
            ))
          ) : (
            <span className="text-customGray1">멤버 선택</span>
          )}
        </div>
        <DropButton /> {/* DropButton을 오른쪽에 위치시킴 */}
      </div>
      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white shadow-lg border border-[#FFDE33] overflow-y-auto"
        style={{ maxHeight: "10rem" }}>
          {items.map((item, index) => (
            <li
              key={index}
              className={`py-1 px-2 cursor-pointer hover:bg-gray-100 ${
                selectedMembers.includes(item) ? "bg-yellow-100" : ""
              }`}
              onClick={() => handleMemberSelect(item)}
            >
              {item.name}
            </li>
          ))}
          <li
            className={`py-1 px-2 cursor-pointer hover:bg-gray-100 ${
              selectedMembers.length === items.length ? "bg-yellow-100" : ""
            }`}
            onClick={() => handleMemberSelect({ id: "all", name: "전체" })}
          >
            전체
          </li>
        </ul>
      )}
    </div>
  );  
};