import React from "react";
import { Text } from "./order"; // color, size, weight

export default function ManageCheckOrder() {
  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col gap-6">
        <div className="w-[192px] h-[41px]">
          <Text color="text-orange" size="27px" weight="700">
            주문글 확인하기
          </Text>
          <hr className="border-orange" />
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between w-[240px]">
              <Text>날짜</Text>
              <Text>2024. 05. 20</Text>
            </div>
            <div className="flex justify-between w-[240px]">
              <Text>작성자</Text>
              <Text>다나</Text>
            </div>
            <div className="flex justify-between w-[322px]">
              <Text>제품</Text>
              <div className="w-[227px] h-[24px] border border-yellow text-xs font-light p-1 flex">
                <input className="w-[200px]" />
              </div>
            </div>
            <div className="flex justify-between w-[322px]">
              <Text>하위제품</Text>
              <div className="w-[227px] h-[24px] border border-yellow text-xs font-light p-1 flex">
                <input className="w-[200px]" />
              </div>
            </div>
            <div className="flex justify-between w-[322px]">
              <Text>주문수량</Text>
              <div className="w-[227px] h-[24px] border border-yellow text-xs font-light p-1 flex">
                <input className="w-[200px]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-[322px]">
            <Text>메모</Text>
            <div className="w-[322px] h-[65px] border border-yellow text-xs font-light p-1 flex">
              <textarea className="w-[322px]" />
            </div>
          </div>
          <div className="flex justify-between">
            <button className="w-[154px] h-[47px] bg-yellow rounded-[15px] text-lg flex items-center justify-center">
              주문 정정 요청
            </button>
            <button className="w-[154px] h-[47px] bg-yellow rounded-[15px] text-lg flex items-center justify-center">
              주문 확인하기
            </button>
          </div>
        </div>
      </div>
      <hr className="border-yellow" />
      <Chat />
      <Comment />
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
          className="relative w-full h-[51px] flex items-center border border-borderGray rounded-lg p-1 mb-2"
        >
          <div className="flex gap-4 items-center">
            <div className="w-[41px] h-[16px]">
              <Text size="14px" weight="300">
                {order.author}
              </Text>
            </div>
            <div className="w-[222px] h-[32px]">
              <Text size="14px" weight="300">
                {order.message}
              </Text>
            </div>
          </div>
          <div className="absolute right-2 bottom-1 w-[20px] h-[15px]">
            <Text size="10px" weight="500" color="text-dateGray">
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
    <div className="fixed bottom-0 w-full h-[91px] shadow-[0px_0px_11.8px_rgba(0,0,0,0.10)] flex items-center">
      <div className="w-[354px] h-[44px] flex items-center border border-yellow rounded-[20px] p-1">
        <input
          className="w-[300px] h-[20px] placeholder-borderGray"
          placeholder="댓글 쓰기"
        />
        <button className="w-[55px] h-[29px] bg-yellow rounded-[10px]">
          입력
        </button>
      </div>
    </div>
  );
};
