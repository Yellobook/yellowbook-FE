import React, { useState } from "react";
import { Text } from "./order"; // color, size, weight
import Modal from "../../components/modal";
export default function OrderCheckOrder() {
  // 버튼 비활성화
  const [cancleDisabled, setCancleDisabled] = useState(false);
  // 모달
  const [showModal, setShowModal] = useState(false);

  // 모달 띄우기
  const openModal = () => {
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  // 주문 취소하기 -> 모달 띄우기
  const handleCancleClick = () => {
    setShowModal(true);
    setCancleDisabled(true);
    console.log("주문 취소 클릭");
  };

  // 주문 삭제 로직 추가하기 !!!!!!!!!!!!!!!!1
  const handleOrderCancle = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col gap-[1.5rem]">
        <div className="w-[12rem] h-[2.5rem]">
          <Text color="text-orange" size="1.6875rem" weight="700">
            주문글 확인하기
          </Text>
          <hr className="border-orange" />
        </div>
        <div className="flex flex-col gap-[1.75rem]">
          <div className="flex flex-col gap-[0.75rem]">
            <div className="flex justify-between w-[15rem]">
              <Text>날짜</Text>
              <Text>2024. 05. 20</Text>
            </div>
            <div className="flex justify-between w-[15rem]">
              <Text>작성자</Text>
              <Text>다나</Text>
            </div>
            <div className="flex justify-between w-[20rem]">
              <Text>제품</Text>
              <div className="w-[14rem] h-[1.5rem] border border-yellow text-xs font-light p-1 flex">
                <input className="w-full" />
              </div>
            </div>
            <div className="flex justify-between w-[20rem]">
              <Text>하위제품</Text>
              <div className="w-[14rem] h-[1.5rem] border border-yellow text-xs font-light p-1 flex">
                <input className="w-full" />
              </div>
            </div>
            <div className="flex justify-between w-[20rem]">
              <Text>주문수량</Text>
              <div className="w-[14rem] h-[1.5rem] border border-yellow text-xs font-light p-1 flex">
                <input className="w-full" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-[20rem]">
            <Text>메모</Text>
            <div className="w-full h-[4rem] border border-yellow text-xs font-light p-1 flex">
              <textarea className="w-full" />
            </div>
          </div>
          <div className="flex justify-between w-[20rem]">
            <Button onClick={handleCancleClick} disabled={cancleDisabled}>
              주문 정정 요청
            </Button>
          </div>
        </div>
      </div>
      <hr className="border-yellow mt-[1.5rem] mb-[1rem]" />
      <Chat />
      <Comment />
      {showModal && (
        <Modal
          title="주문을 취소하시겠습니까?"
          content1="주문 취소는 관리자와 상의 후, 취소를 해주세요."
          button1="돌아가기"
          button2="주문 취소"
          onClose={closeModal}
          onClick={handleOrderCancle}
        />
      )}
    </div>
  );
}

// 댓글 목록
const Chat = () => {
  // 임시 데이터
  const orders = [
    {
      id: 1,
      author: "생산자",
      message: "20일까지 20개는 불가할 것 같아요! 15개로 정정해주세요.",
      time: "시간",
    },
    {
      id: 2,
      author: "생산자",
      message: "20일까지 30개는 가능합니다.",
      time: "시간",
    },
  ];

  return (
    <div>
      {orders.map((order) => (
        <div
          key={order.id}
          className="relative w-full h-[3.1875rem] flex items-center border border-borderGray rounded-lg p-1 mb-[0.5rem]"
        >
          <div className="flex gap-[1.25rem] items-center">
            <div className="w-[2.5625rem] h-[1rem]">
              <Text size="0.875rem" weight="300">
                {order.author}
              </Text>
            </div>
            <div className="w-[13.875rem] h-[2rem] flex items-center">
              <Text size="0.875rem" weight="300">
                {order.message}
              </Text>
            </div>
          </div>
          <div className="absolute right-[0rem] bottom-[0rem] w-[2rem] h-[1rem] flex justify-center">
            <Text size="0.625rem" weight="500" color="text-dateGray">
              {order.time}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};

// 댓글 쓰기
const Comment = () => {
  return (
    <div className="fixed left-0 bottom-0 w-full h-[5.6875rem] shadow-[0px_0px_11.8px_rgba(0,0,0,0.10)] flex items-center justify-center">
      <div className="w-[22rem] h-[2.75rem] flex items-center border border-yellow rounded-[1.25rem] p-1">
        <input
          className="w-[18.75rem] h-[100%] placeholder-borderGray"
          placeholder="댓글 쓰기"
        />
        <button className="w-[3.4375rem] h-[1.8125rem] bg-yellow rounded-[0.625rem] mr-2">
          입력
        </button>
      </div>
    </div>
  );
};

// 버튼
const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      className={`w-[20.125rem] h-[2.9375rem] rounded-[1rem] text-lg flex items-center justify-center ${
        disabled ? "bg-customGray2 cursor-not-allowed" : "bg-yellow"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
