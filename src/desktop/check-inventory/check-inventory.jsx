import React, { useState } from "react";
import axios from "axios";

const chatSampleData = [
  {
    id: 1,
    author: "생산자",
    message: "20일까지 20개는 불가할 것 같아요! 15개로 정정해주세요",
    time: "시간",
  },
  {
    id: 2,
    author: "주문자",
    message: "네, 확인했어요~",
    time: "시간",
  },
];

const DesktopCheckInventory = () => {
  const [product, setProduct] = useState("");
  const [subProduct, setSubProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [memo, setMemo] = useState("");

  // todo : orderId 넣어서 하는거로 바꿔야 됨
  const correctOrder = async () => {
    try {
      await axios.post(
        `https://api.yellobook.site/api/v1/orders/orderId/correction`
      );
    } catch (error) {
      alert("주문 정정 요청 중 오류 발생", error);
    }
  };

  // todo : parameter informId 추가해야 됨
  const writeChat = async () => {
    try {
      await axios.post(`https://api.yellobook.site/api/v1/informs/1/comment`, {
        content: "댓글",
      });
    } catch (error) {
      alert("댓글 작성 중 오류 발생", error);
    }
  };

  return (
    <div>
      {/* 제목 */}
      <div
        style={{ color: "#FFAB08" }}
        className="mt-10 inline-block text-xl border-b"
      >
        주문글 확인하기
      </div>
      {/* form들 */}
      <div
        style={{ borderColor: "#BCBDC1" }}
        className="mt-10 px-10 pb-10 border-b"
      >
        <div className="flex justify-between">
          <div>날짜</div>
          <div className="text-gray">2024. 05. 20</div>
        </div>
        <div className="flex justify-between mt-5">
          <div>작성자</div>
          <div className="text-gray">다나</div>
        </div>
        <div className="flex justify-between mt-5">
          <div>제품</div>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="border border-yellow mt-2 p-2 rounded text-gray w-2/3"
          >
            <option value="">제품 선택</option>
            <option value="제품 A">제품 A</option>
            <option value="제품 B">제품 B</option>
            <option value="제품 C">제품 C</option>
          </select>
        </div>
        <div className="flex justify-between mt-5">
          <div>하위제품</div>
          <select
            value={subProduct}
            onChange={(e) => setSubProduct(e.target.value)}
            className="border border-yellow text-gray mt-2 p-2 rounded w-2/3"
          >
            <option value="">하위제품 선택</option>
            <option value="red">red</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
          </select>
        </div>
        <div className="flex justify-between mt-5">
          <div>주문수량</div>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-yellow text-gray mt-2 p-2 rounded w-2/3"
          />
        </div>
        <div className="mt-5">
          <div>메모</div>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="border border-yellow text-gray mt-2 p-2 rounded w-full"
            rows="4"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={correctOrder()}
            className="bg-yellowDisable px-20 py-3 rounded-xl"
          >
            주문 정정 요청
          </button>
          <button className="bg-yellow px-20 py-3 rounded-xl">
            주문 확인하기
          </button>
        </div>
      </div>
      {/* 댓글 */}
      <div className="mt-6">
        {chatSampleData.map((chat) => (
          <div
            key={chat.id}
            style={{ borderColor: "#D9D9D9" }}
            className="py-3 pl-3 pr-3 rounded border flex relative"
          >
            <div className="mr-8">{chat.author}</div>
            <div className="flex-1">{chat.message}</div>
            <div className="absolute bottom-1 right-3 text-gray text-xs">
              {chat.time}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderColor: "#d9d9d9" }} className="border-t mt-10">
        <div className="border mt-6 border-yellow w-full rounded-3xl py-3 px-6 flex items-center">
          <input
            className="flex-grow bg-transparent border-none outline-none"
            placeholder="댓글 쓰기"
          />
          <button
            onClick={writeChat}
            className="ml-4 bg-yellow rounded-md px-8 py-2"
          >
            입력
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopCheckInventory;
