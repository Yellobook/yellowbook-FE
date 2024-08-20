import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DesktopNotice = () => {
  const [inform, setInform] = useState(null);
  const [comment, setComment] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    getInform();
  }, []);

  // todo : informId로 바꿔야 됨
  const informDelete = async () => {
    try {
      await axios.delete(`https://api.yellobook.site/api/v1/informs/1`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate("/calendar");
    } catch (error) {
      console.error("공지 삭제 중 오류 발생", error);
    }
  };

  // todo : informId로 바꿔야 됨
  const getInform = async () => {
    try {
      const inform_res = await axios.get(
        `https://api.yellobook.site/api/v1/informs/1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setInform(inform_res.data.data);
    } catch (error) {
      console.error("공지 목록 조회 중 오류 발생", error);
    }
  };

  // todo : informId로 바꿔야 됨
  const PostComment = async () => {
    try {
      await axios.post(
        `https://api.yellobook.site/api/v1/informs/1/comment`,
        {
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setComment("");
      getInform();
    } catch (error) {
      console.error("공지 댓글 작성 중 오류 발생", error);
    }
  };

  const handleBtnClick = () => {
    PostComment();
  };

  if (!inform) {
    return <div>공지사항 불러오는 중...</div>;
  }

  return (
    <>
      <div className="flex justify-between">
        <div
          style={{ color: "#FFAB08" }}
          className="inline-block border-b text-xl"
        >
          공지사항
        </div>
        <button
          style={{ backgroundColor: "#FFDE33" }}
          className="px-2 py-1 text-sm rounded-lg"
          onClick={informDelete}
        >
          일정 삭제
        </button>
      </div>
      <div style={{ borderColor: "#D9D9D9" }} className="px-10 pb-10 border-b">
        <div className="flex flex-row mt-10">
          <div className="space-x-36 flex mr-24">
            <div>날짜</div>
            <div style={{ color: "#97A5A4" }}>{inform.date}</div>
          </div>
          <div className="flex space-x-24">
            <div>작성자</div>
            <div style={{ color: "#97A5A4" }}>다나</div>{" "}
          </div>
        </div>
        <div className="mt-5">공지 제목</div>
        <div className="mt-5 text-lg font-bold">{inform.title}</div>
        <div className="mt-5">메모</div>
        <div className="mt-2 p-2 w-full">{inform.memo}</div>
        <div className="mt-5 flex flex-row items-center">
          <div className="mr-10 whitespace-nowrap">함께하는 멤버</div>
          <div className="flex-grow border-yellow text-gray">
            {inform?.mentions?.map((mention) => (
              <span key={mention.memberNickname} className="text-gray-500 mr-2">
                @{mention.memberNickname}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        {inform?.comments?.map((comment) => (
          <div
            key={comment.id}
            style={{ borderColor: "#D9D9D9" }}
            className="py-3 pl-3 pr-3 rounded border flex flex-row justify-between items-start relative"
          >
            <div className="mr-8">ID: {comment.memberId}</div>
            <div className="flex-1">{comment.content}</div>
            <div className="absolute bottom-1 right-3 text-gray text-xs">
              {new Date(comment.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderColor: "#d9d9d9" }} className="border-t mt-10">
        <div className="border mt-6 border-yellow w-full rounded-3xl py-3 px-6 flex items-center">
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="flex-grow bg-transparent border-none outline-none"
            placeholder="댓글 쓰기"
          />
          <button
            onClick={handleBtnClick}
            className="ml-4 bg-yellow rounded-md px-8 py-2"
          >
            입력
          </button>
        </div>
      </div>
    </>
  );
};

export default DesktopNotice;
