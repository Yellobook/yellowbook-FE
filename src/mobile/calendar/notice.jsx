import React, { useState, useEffect } from "react";
import { Text } from "./order"; // color, size, weight
//import mention from "../../style/mention.js";
import mentionInput from "../../style/mentionInput.js";
import { MentionsInput, Mention } from "react-mentions";
import mention from "../../style/mention";

export default function Notice() {
  const [value, setValue] = useState("");
  const [lastMention, setLastMention] = useState("");

  // 일정 삭제
  const deleteSchedule = () => {
    // 일정 삭제 로직 추가
  };

  // 임시 데이터 - 팀 구성원
  const teamMembers = [
    { id: "1", display: "다나" },
    { id: "2", display: "캐빈" },
    { id: "3", display: "tak" },
    { id: "4", display: "myo" },
  ];

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleAdd = (id, display) => {
    setLastMention(display);
  };

  useEffect(() => {
    if (lastMention) {
      setValue((prevValue) => `${prevValue} `);
      setLastMention("");
    }
  }, [lastMention]);

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col gap-[1.5rem]">
        <div className="flex justify-between">
          <div className="w-[6.5rem] h-[2.5rem]">
            <Text color="text-orange" size="1.6875rem" weight="700">
              공지사항
            </Text>
            <hr className="border-orange w-full" />
          </div>
          <div className="bg-yellow rounded-[0.6rem] w-[4.6875rem] h-[2.1875rem] flex justify-center items-center leading-5">
            <button className="w-[3.7rem] h-[1.25rem] text-sm mt-1">
              일정 삭제
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[1.75rem]">
          <div className="flex flex-col gap-[0.75rem]">
            <div className="flex justify-between w-full">
              <div className="flex justify-between w-[10rem]">
                <Text>날짜</Text>
                <Text color="text-dateGray">2024. 05. 20</Text>
              </div>
              <div className="flex justify-between w-[6rem] mr-1">
                <Text>작성자</Text>
                <Text color="text-dateGray">다나</Text>
              </div>
            </div>
            <div className="flex flex-col w-[20rem]">
              <Text>공지 제목</Text>
              <Text size="1.125rem">20일 다나 근무시간 조정</Text>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full">
            <Text>메모</Text>
            <div className="w-full h-[4rem] border border-yellow text-xs font-light flex">
              <textarea className="w-full" />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <Text>함께하는 멤버</Text>
            <div className="w-[14rem] h-[1.5rem] border border-yellow text-xs font-light flex justify-center items-center">
              {/* <input className="w-full h-full m-0 p-1" /> */}
              <MentionsInput
                style={mentionInput}
                value={value}
                onChange={handleChange}
                className="w-full h-full leading-5"
                placeholder="여기에 @를 입력하세요"
              >
                <Mention
                  style={mention}
                  trigger="@"
                  data={teamMembers}
                  onAdd={handleAdd}
                />
              </MentionsInput>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-yellow mt-[1.5rem] mb-[1rem]" />
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
          className="relative w-full h-[3.1875rem] flex items-center border border-borderGray rounded-lg p-1 mb-[0.5rem]"
        >
          <div className="flex gap-[1.25rem] items-center">
            <div className="w-[2.5625rem] h-[1rem]">
              <Text size="0.875rem" weight="300">
                {order.author}
              </Text>
            </div>
            <div className="w-[13.875rem] h-[2rem]">
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
