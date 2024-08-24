import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Text } from "./order"; // color, size, weight
import { Chat } from "./orderer-check-order";
import { Comment } from "./orderer-check-order";
import { orderPatchCorr, orderPatchConfirm, orderGet, orderGetComment } from "../../util/OrderUtils";

export default function ManageCheckOrder() {
  // 버튼 비활성화
  const [correctDisabled, setCorrectDisabled] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(false);
  const { orderId } = useParams(); // URL에서 orderId 가져오기

  // 댓글 내용
  const [comments, setComments] = useState([]);

  // 주문 내역 상태관리
  const [date, setDate] = useState();
  const [writer, setWriter] = useState();
  const [productName, setProductName] = useState();
  const [subProductName, setSubProductName] = useState();
  const [amount, setAmount] = useState();
  const [memo, setMemo] = useState();

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

  // 처음 렌더링 했을 때 주문 조회하기
  useEffect(() => {
    getOrder();
    getComment();
  }, [orderId]);

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

  // 댓글 새로고침
  const refreshOrderComment = useCallback(() => {
    getComment();
  }, []);

  // 주문 정정 요청
  const handleCorrectClick = async () => {
    setConfirmDisabled(true);
    setCorrectDisabled(false);
    console.log("주문 정정 클릭");
    // api 연동
    try {
      const response = await orderPatchCorr(orderId);
      console.log("정정 요청 성공:", response);
      // 성공적으로 정정 요청이 완료되었을 때의 처리
    } catch (error) {
      console.error("정정 요청 실패:", error);
      // 정정 요청이 실패했을 때의 처리
    }
  };

  // 주문 확인 요청
  const handleConfirmClick = async () => {
    setConfirmDisabled(false);
    setCorrectDisabled(true);
    console.log("주문 확인 클릭");
    // api 연동
    try {
      const response = await orderPatchConfirm(orderId);
      console.log("확인 요청 성공:", response);
      // 성공적으로 확인 요청이 완료되었을 때의 처리
    } catch (error) {
      console.error("확인 요청 실패:", error);
      // 확인 요청이 실패했을 때의 처리
    }
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
            <div className="flex justify-between w-[15rem]">
              <Text>작성자</Text>
              <Text>{writer}</Text>
            </div>
            <div className="flex justify-between w-[20rem]">
              <Text>제품</Text>
              <div className="w-[14rem] h-[1.5rem] border border-yellow text-xs font-light p-1 flex">
                <input className="w-full m-0" value={productName} />
              </div>
            </div>
            <div className="flex justify-between w-[20rem]">
              <Text>하위제품</Text>
              <div className="w-[14rem] h-[1.5rem] border border-yellow text-xs font-light p-1 flex">
                <input className="w-full m-0" value={subProductName} />
              </div>
            </div>
            <div className="flex justify-between w-[20rem]">
              <Text>주문수량</Text>
              <div className="w-[14rem] h-[1.5rem] border border-yellow text-xs font-light p-1 flex">
                <input className="w-full m-0" value={amount} />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-[20rem]">
            <Text>메모</Text>
            <div className="w-full h-[4rem] border border-yellow text-xs font-light p-1 flex">
              <textarea className="w-full" value={memo} />
            </div>
          </div>
          <div className="flex justify-between w-[20rem]">
            <Button onClick={handleCorrectClick} disabled={correctDisabled}>
              주문 정정 요청
            </Button>
            <Button onClick={handleConfirmClick} disabled={confirmDisabled}>
              주문 확인하기
            </Button>
          </div>
        </div>
      </div>
      <hr className="border-yellow mt-[1.5rem] mb-[1rem]" />
      <Chat comments={comments} />
      <Comment orderId={orderId} refreshOrderComment={refreshOrderComment}/>
    </div>
  );
}

// // 댓글 목록
// const Chat = () => {
//   // 임시 데이터
//   const orders = [
//     {
//       id: 1,
//       author: "생산자",
//       message: "20일까지 20개는 불가할 것 같아요! 15개로 정정해주세요.",
//       time: "시간",
//     },
//     {
//       id: 2,
//       author: "생산자",
//       message: "20일까지 30개는 가능합니다.",
//       time: "시간",
//     },
//   ];

//   return (
//     <div>
//       {orders.map((order) => (
//         <div
//           key={order.id}
//           className="relative w-full h-[3.1875rem] flex items-center border border-borderGray rounded-lg p-1 mb-[0.5rem]"
//         >
//           <div className="flex gap-[1.25rem] items-center">
//             <div className="w-[2.5625rem] h-[1rem]">
//               <Text size="0.875rem" weight="300">
//                 {order.author}
//               </Text>
//             </div>
//             <div className="w-[13.875rem] h-[2rem]">
//               <Text size="0.875rem" weight="300">
//                 {order.message}
//               </Text>
//             </div>
//           </div>
//           <div className="absolute right-[0rem] bottom-[0rem] w-[2rem] h-[1rem] flex justify-center">
//             <Text size="0.625rem" weight="500" color="text-dateGray">
//               {order.time}
//             </Text>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // 댓글 쓰기
// const Comment = () => {
//   return (
//     <div className="fixed left-0 bottom-0 w-full h-[5.6875rem] shadow-[0px_0px_11.8px_rgba(0,0,0,0.10)] flex items-center justify-center">
//       <div className="w-[22rem] h-[2.75rem] flex items-center border border-yellow rounded-[1.25rem] p-1">
//         <input
//           className="w-[18.75rem] h-[100%] placeholder-borderGray"
//           placeholder="댓글 쓰기"
//         />
//         <button className="w-[3.4375rem] h-[1.8125rem] bg-yellow rounded-[0.625rem] mr-2">
//           입력
//         </button>
//       </div>
//     </div>
//   );
// };

// 버튼
const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      className={`w-[9.625rem] h-[2.9375rem] rounded-[1rem] text-lg flex items-center justify-center ${
        disabled ? "bg-yellowDisable cursor-not-allowed" : "bg-yellow"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
