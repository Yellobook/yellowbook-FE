import React, { useEffect, useState, useCallback } from "react";
import { Text } from "./order"; // color, size, weight
import Modal from "../../components/modal";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
import {
  orderGet,
  orderGetComment,
  orderDelete,
  orderPostComment,
} from "../../util/OrderUtils";

export default function OrderCheckOrder() {
  const { orderId } = useParams();
  // 버튼 비활성화
  const [cancleDisabled, setCancleDisabled] = useState(false);
  // 모달
  const [showModal, setShowModal] = useState(false);
  // 주문 내역 상태관리
  const [date, setDate] = useState();
  const [writer, setWriter] = useState();
  const [productName, setProductName] = useState();
  const [subProductName, setSubProductName] = useState();
  const [amount, setAmount] = useState();
  const [memo, setMemo] = useState();
  // 댓글 상태관리
  const [comments, setComments] = useState([]);

  // 모달 띄우기
  const openModal = () => {
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  // 주문 조회하기
  const getOrder = async () => {
    try {
      const response = await orderGet(orderId);
      console.log("주문 내용: ", response.data);
      setDate(response.data.date);
      setWriter(response.data.writer);
      setProductName(response.data.productName);
      setSubProductName(response.data.subProductName);
      setAmount(response.data.amount);
      setMemo(response.data.memo);
    } catch (error) {
      console.log("주문 조회 실패: ", error);
    }
  };

  // 주문 댓글 조회
  const getComment = async () => {
    try {
      const response = await orderGetComment(orderId);
      console.log("댓글 내용: ", response.data.comments);
      setComments(response.data.comments || []);
    } catch (error) {
      console.log("댓글 조회 실패: ", error);
    }
  };

  // 처음 렌더링 했을 때 주문 조회하기
  useEffect(() => {
    getOrder();
    getComment();
  }, [orderId]);

  // 댓글 새로고침
  const refreshOrderComment = useCallback(() => {
    getComment();
  }, []);

  // 주문 취소하기 -> 모달 띄우기
  const handleCancleClick = () => {
    setShowModal(true);
    setCancleDisabled(true);
    console.log("주문 취소 클릭");
  };

  // 주문 삭제 로직 추가하기 !!!!!!!!!!!!!!!!1
  const handleOrderCancle = async () => {
    try {
      const response = await orderDelete(orderId);
      console.log("주문 취소: ", response);
    } catch (error) {
      console.log("주문 취소 실패: ", error);
    }
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
              <Text>{date}</Text>
            </div>
            <div className="flex justify-between w-[20rem]">
              <Text>제품</Text>
              <div className="w-[14rem] h-[1.5rem] border border-yellow text-xs font-light p-1 flex">
                <input className="w-full m-0" defaultValue={productName} />
              </div>
            </div>
            <div className="flex justify-between w-[20rem]">
              <Text>하위제품</Text>
              <div className="w-[14rem] h-[1.5rem] border border-yellow text-xs font-light p-1 flex">
                <input className="w-full m-0" defaultValue={subProductName} />
              </div>
            </div>
            <div className="flex justify-between w-[20rem]">
              <Text>주문수량</Text>
              <div className="w-[14rem] h-[1.5rem] border border-yellow text-xs font-light p-1 flex">
                <input className="w-full m-0" defaultValue={amount} />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-[20rem]">
            <Text>메모</Text>
            <div className="w-full h-[4rem] border border-yellow text-xs font-light p-1 flex">
              <textarea className="w-full" defaultValue={memo} />
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
      <Chat comments={comments} />
      <Comment orderId={orderId} refreshOrderComment={refreshOrderComment} />
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
export const Chat = ({ comments }) => {
  if (!comments || comments.length === 0) {
    console.log(comments);
    return <div>댓글이 없습니다.</div>; // 댓글이 없을 때 처리
  }

  return (
    <div>
      {comments.map((comment) => (
        <div
          key={comment.commentId}
          className="relative w-full h-[3.1875rem] flex items-center border border-borderGray rounded-lg p-1 mb-[0.5rem]"
        >
          <div className="flex gap-[1.25rem] items-center">
            <div className="w-[2.5625rem] h-[1rem]">
              <Text size="0.875rem" weight="300">
                {comment.role}
              </Text>
            </div>
            <div className="w-[13.875rem] h-[2rem] flex items-center">
              <Text size="0.875rem" weight="300">
                {comment.content}
              </Text>
            </div>
          </div>
          <div className="absolute right-[0rem] bottom-[0rem] w-[4rem] h-[1rem] flex justify-center">
            <Text size="0.625rem" weight="500" color="text-dateGray">
              {`${comment.createdAt.slice(5, 7)}-${comment.createdAt.slice(
                8,
                10
              )}-${comment.createdAt.slice(11, 13)}`}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};

// 댓글 쓰기
export const Comment = ({ orderId, refreshOrderComment }) => {
  const [comment, setComment] = useState("");

  // 댓글 작성하기
  const handleSubmit = async () => {
    if (comment.trim() === "") {
      alert("댓글을 입력하세요.");
      return;
    }

    try {
      const response = await orderPostComment(orderId, comment);
      console.log("댓글 내용: ", response.data.commentId);
      setComment("");
      refreshOrderComment();
    } catch (error) {
      console.error("failed to post comment: ", error);
    }
  };

  // 디바운스된 입력 변경 핸들러
  const debouncedHandleSubmit = useCallback(
    debounce(() => {
      handleSubmit();
    }, 1000),
    [comment] // This dependency should be an empty array if handleSubmit does not depend on comment
  );

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="fixed left-0 bottom-0 w-full h-[5.6875rem] shadow-[0px_0px_11.8px_rgba(0,0,0,0.10)] flex items-center justify-center">
      <div className="w-[22rem] h-[2.75rem] flex items-center border border-yellow rounded-[1.25rem] p-1">
        <input
          className="w-[18.75rem] h-[100%] placeholder-borderGray"
          placeholder="댓글 쓰기"
          value={comment}
          onChange={handleInputChange}
        />
        <button
          className="w-[3.4375rem] h-[1.8125rem] bg-yellow rounded-[0.625rem] mr-2"
          onClick={debouncedHandleSubmit}
        >
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
