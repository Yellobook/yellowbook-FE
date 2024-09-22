import React, { useState, useEffect, useCallback } from "react";
import { Text } from "../calendar/order.jsx"; // color, size, weight
//import mention from "../../style/mention.js";
import mentionInput from "../../style/mentionInput.js";
import { MentionsInput, Mention } from "react-mentions";
import mention from "../../style/mention.js";
import { useParams } from "react-router-dom";
import debounce from "lodash/debounce";
import { GetNotice, DeleteNotice, PostComment } from "../../util/NoticeUtils.js";

export default function Notice() {
  const [value, setValue] = useState("");
  const [lastMention, setLastMention] = useState("");
  const [noticeData, setNoticeData] = useState(null);
  const { informId } = useParams();

  // 일정 삭제
  const DeleteSchedule = async () => {
    try {
      const response = await DeleteNotice(informId);
      console.log("공지 삭제 성공:", response);
      // 공지 삭제 성공 시의 추가 처리 (예: UI 업데이트, 알림 등)
    } catch (error) {
      console.error("공지 삭제 실패:", error);
      // 공지 삭제 실패 시의 추가 처리 (예: 오류 메시지 표시 등)
    }
  };

  // 조회
  const GetNoticeInfo = async () => {
    try {
      const response = await GetNotice(informId);
      if (response.isSuccess) {
        setNoticeData(response.data);
        console.log("공지 조회 성공:", response.data);
      } else {
        console.error("공지 조회 실패:", response.message);
      }
    } catch (error) {
      console.error("공지 조회 실패:", error);
    }
  };

  useEffect(() => {
    // 페이지가 렌더링되기 전에 공지 정보를 가져옴
    GetNoticeInfo();
  }, [informId]);

  // Notice 정보 새로 고침
  const refreshNoticeInfo = useCallback(() => {
    GetNoticeInfo();
  }, []);

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

  if (!noticeData) {
    return <div>Loading...</div>; // 데이터를 불러오는 동안 로딩 표시
  }

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
            <button
              className="w-[3.7rem] h-[1.25rem] text-sm mt-1"
              onClick={DeleteSchedule}
            >
              일정 삭제
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[1.75rem]">
          <div className="flex flex-col gap-[0.75rem]">
            <div className="flex justify-between w-full">
              <div className="flex justify-between w-[10rem]">
                <Text>날짜</Text>
                <Text color="text-dateGray">{noticeData.date}</Text>
              </div>
              <div className="flex justify-between w-[6rem] mr-1">
                <Text>작성자</Text>
                <Text color="text-dateGray">다나</Text>
              </div>
            </div>
            <div className="flex flex-col w-[20rem]">
              <Text>공지 제목</Text>
              <Text size="1.125rem">{noticeData.title}</Text>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full">
            <Text>메모</Text>
            <div className="w-full h-[4rem] border border-yellow text-xs font-light flex">
              {noticeData.memo}
            </div>
          </div>
          <div className="flex w-full justify-between">
            <Text>함께하는 멤버</Text>
            <div className="w-[14rem] h-[1.5rem] border border-yellow text-xs font-light flex justify-start items-center p-1 gap-2">
              {/* <input className="w-full h-full m-0 p-1" /> */}
              {/* <MentionsInput
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
              </MentionsInput> */}
              {/* {noticeData.mentions.map((mention) => (
                <div key={mention.id}>{mention.memberNickname}</div>
              ))} */}
              {noticeData.mentions.map((mention) => (
                <span key={mention.memberId}>{mention.memberNickname}</span>  // 특정 필드만 렌더링
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-yellow mt-[1.5rem] mb-[1rem]" />
      <Chat comments={noticeData.comments} />
      <Comment informId={informId} refreshNoticeInfo={refreshNoticeInfo} />
    </div>
  );
}

// 댓글 목록
const Chat = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="relative w-full h-[3.1875rem] flex items-center border border-borderGray rounded-lg p-1 mb-[0.5rem]"
        >
          <div className="flex gap-[1.25rem] items-center">
            <div className="w-[2.5625rem] h-[1rem]">
              <Text size="0.875rem" weight="300">
                {comment.memberId}
              </Text>
            </div>
            <div className="w-[13.875rem] h-[2rem]">
              <Text size="0.875rem" weight="300">
                {comment.content}
              </Text>
            </div>
          </div>
          <div className="absolute right-[0rem] bottom-[0rem] w-[2rem] h-[1rem] flex justify-center">
            <Text size="0.625rem" weight="500" color="text-dateGray">
              {comment.createdAt}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};

// 댓글 쓰기
const Comment = ({ informId, refreshNoticeInfo }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (comment.trim() === "") {
      alert("댓글을 입력하세요.");
      return;
    }

    console.log("댓글 제출 확인용: ", comment);

    try {
      const response = await PostComment(informId, comment);
      console.log("Comment posted successfully:", response);
      setComment(""); // Clear the input after successful submission
      refreshNoticeInfo();
    } catch (error) {
      console.error("Failed to post comment:", error);
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
