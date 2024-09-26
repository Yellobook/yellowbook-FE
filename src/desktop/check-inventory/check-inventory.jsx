import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  fetchComments,
  orderPostComment,
  orderPatchCorr,
} from "../../util/OrderUtils";
import { getProfile } from "../../util/ProfileUtils";

const DesktopCheckInventory = () => {
  const location = useLocation();
  const [product, setProduct] = useState("");
  const [subProduct, setSubProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [memo, setMemo] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [isCorrectBtnDisabled, setIsCorrectBtnDisabled] = useState(false);
  const [isCheckBtnDisabled, setIsCheckBtnDisabled] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParams = params.get("id");
    setOrderId(idParams);

    if (idParams) {
      fetchComments(idParams);
    }

    // 관리자 여부 데이터 불러오기
    getProfile()
      .then((profile) => {
        const userRole = profile.teams[0].role;
        setRole(userRole);
      })
      .catch((error) => {
        console.error("프로필 정보 불러오기 중 오류 발생 : ", error);
      });
  }, [location.search]);

  const handleCorrectBtnClick = async () => {
    setIsCheckBtnDisabled(true); // '주문 확인하기' 버튼 비활성화
    await orderPatchCorr(orderId);
    setIsCheckBtnDisabled(false); // '주문 확인하기' 버튼 활성화
  };

  const handleCheckBtnClick = () => {
    setIsCorrectBtnDisabled(true); // '주문 정정 요청' 버튼 비활성화
    alert("주문 확인");
    setIsCorrectBtnDisabled(false); // '주문 정정 요청' 버튼 활성화
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
            onClick={handleCorrectBtnClick}
            className={`px-20 py-3 rounded-xl ${
              isCorrectBtnDisabled ? "bg-yellowDisable" : "bg-yellow"
            }`}
            disabled={isCheckBtnDisabled}
          >
            주문 정정 요청
          </button>
          <button
            onClick={handleCheckBtnClick}
            className={`px-20 py-3 rounded-xl ${
              isCheckBtnDisabled ? "bg-yellowDisable" : "bg-yellow"
            }`}
            disabled={isCorrectBtnDisabled}
          >
            주문 확인하기
          </button>
        </div>
      </div>
      {/* 댓글 */}
      <div className="mt-6">
        {comments?.map((chat) => (
          <div
            key={chat.commentId}
            style={{ borderColor: "#D9D9D9" }}
            className="py-3 pl-3 pr-3 rounded border flex relative"
          >
            <div className="mr-8">{chat.role}</div>
            <div className="flex-1">{chat.content}</div>
          </div>
        ))}
      </div>
      <div style={{ borderColor: "#d9d9d9" }} className="border-t mt-10">
        <div className="border mt-6 border-yellow w-full rounded-3xl py-3 px-6 flex items-center">
          <input
            className="flex-grow bg-transparent border-none outline-none"
            placeholder="댓글 쓰기"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={() => orderPostComment(orderId, newComment)}
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
