import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchComments,
  orderPostComment,
  orderPatchCorr,
  orderPatchConfirm,
  orderDelete,
} from "../../util/OrderUtils";
import { getProfile, getTeam } from "../../util/ProfileUtils";
import { orderGet } from "../../util/OrderUtils";
import { template } from "lodash";

const DesktopCheckInventory = () => {
  const [product, setProduct] = useState("");
  const [subProduct, setSubProduct] = useState("");
  const [quantity, setQuantity] = useState(""); // 주문 수량 상태
  const [memo, setMemo] = useState(""); // 메모 상태
  const [orderId, setOrderId] = useState(null);
  const [isCorrectBtnDisabled, setIsCorrectBtnDisabled] = useState(false);
  const [isCheckBtnDisabled, setIsCheckBtnDisabled] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [role, setRole] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [teamId, setTeamId] = useState(null);

  const { id } = useParams();

  // orderId 설정
  useEffect(() => {
    setOrderId(id);
  }, [id]);

  // teamId 설정
  useEffect(() => {
    const fetchTeam = async () => {
      const idResult = await getTeam();
      const currentTeamId = idResult.teamId; // teamId 설정
      setTeamId(currentTeamId);

      const profile = await getProfile();
      const matchedTeam = profile.teams.find(
        (team) => team.teamId === currentTeamId
      );
      setRole(matchedTeam.role);
    };

    fetchTeam();
  }, []);

  console.log(teamId, role);

  const fetchOrder = async (id) => {
    try {
      const data = await orderGet(id);
      setOrderData(data); // orderData 상태 업데이트
      setQuantity(data?.data.amount || ""); // 주문 수량 초기화
      setMemo(data?.data.memo || ""); // 메모 초기화
    } catch (error) {
      console.error("주문 데이터 불러오기 중 오류 발생:", error);
    }
  };
  const getComments = async (id) => {
    try {
      const commentData = await fetchComments(id);
      console.log(commentData);
      setComments(commentData);
    } catch (error) {
      console.error("주문 댓글 불러오기 중 오류 발생", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      // 서버로 업데이트 데이터 전송
      const updatedData = {
        ...orderData.data,
        amount: quantity,
        memo: memo,
      };

      await orderPatchCorr(orderId, updatedData);

      // 업데이트 성공 시 UI 상태 업데이트
      setOrderData((prev) => ({
        ...prev,
        data: updatedData,
      }));

      alert("수정사항이 저장되었습니다.");
    } catch (error) {
      console.error("수정사항 저장 중 오류 발생:", error);
      alert("수정사항 저장에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrder(id);
      getComments(id);
    }
  }, [id]);

  const handleCommentSubmit = async () => {
    try {
      const postedComment = await orderPostComment(orderId, newComment);
      setComments((prevComments) => [
        ...prevComments,
        {
          commentId: postedComment.commentId,
          role: role,
          content: newComment,
        },
      ]);
      setNewComment("");
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleCorrectBtnClick = async () => {
    setIsCheckBtnDisabled(true); // '주문 확인하기' 버튼 비활성화
    await orderPatchCorr(orderId);
    setIsCheckBtnDisabled(false); // '주문 확인하기' 버튼 활성화
  };

  const handleCheckBtnClick = async () => {
    setIsCorrectBtnDisabled(true); // '주문 정정 요청' 버튼 비활성화
    await orderPatchConfirm(orderId);
    setIsCorrectBtnDisabled(false); // '주문 정정 요청' 버튼 활성화
  };

  const handleCancelBtnClick = async () => {
    await orderDelete(orderId);
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
          <div className="text-gray">{orderData?.data.date}</div>
        </div>
        <div className="flex justify-between mt-5">
          <div>작성자</div>
          <div className="text-gray">{orderData?.data.writer}</div>
        </div>
        <div className="flex justify-between mt-5">
          <div>제품</div>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="border border-yellow mt-2 p-2 rounded text-gray w-2/3"
          >
            <option value="">제품 선택</option>
            <option value="product">{orderData?.data.productName}</option>
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
            <option value="subProduct">{orderData?.data.subProductName}</option>
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
        <div>
          {role === "관리자" && (
            <div className="flex justify-between mt-6">
              <button
                onClick={handleCorrectBtnClick}
                className={`px-20 py-3 rounded-xl cursor-pointer ${
                  isCorrectBtnDisabled ? "bg-yellowDisable" : "bg-yellow"
                }`}
                disabled={isCheckBtnDisabled}
              >
                주문 정정 요청
              </button>
              <button
                onClick={handleCheckBtnClick}
                className={`px-20 py-3 rounded-xl cursor-pointer ${
                  isCheckBtnDisabled ? "bg-yellowDisable" : "bg-yellow"
                }`}
                disabled={isCorrectBtnDisabled}
              >
                주문 확인하기
              </button>
            </div>
          )}
          {role === "주문자" && (
            <div className="flex justify-center">
              <button
                onClick={handleCancelBtnClick}
                className={`w-5/6 py-3 my-3 rounded-xl cursor-pointer ${
                  isCheckBtnDisabled ? "bg-yellowDisable" : "bg-yellow"
                }`}
                disabled={isCorrectBtnDisabled}
              >
                주문 취소하기
              </button>
            </div>
          )}
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
            onClick={handleCommentSubmit}
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
