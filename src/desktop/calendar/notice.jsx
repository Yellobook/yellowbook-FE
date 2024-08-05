import React from "react";

const DesktopNotice = () => {
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
        >
          일정 삭제
        </button>
      </div>
      <div style={{ borderColor: "#D9D9D9" }} className="px-10 pb-10 border-b">
        <div className="flex flex-row mt-10">
          <div className="space-x-36 flex mr-24">
            <div>날짜</div>
            <div style={{ color: "#97A5A4" }}>2024. 05. 20</div>
          </div>
          <div className="flex space-x-24">
            <div>작성자</div>
            <div style={{ color: "#97A5A4" }}>다나</div>
          </div>
        </div>
        <div className="mt-5">공지 제목</div>
        <div className="mt-5 text-lg font-bold">20일 다나 근무시간 조정</div>
        <div className="mt-5">메모</div>
        <textarea
          className="border border-yellow text-gray mt-2 p-2  w-full"
          rows="4"
        />
        <div className="mt-5 flex flex-row items-center">
          <div className="mr-10 whitespace-nowrap">함께하는 멤버</div>
          <input className="border border-yellow text-gray py-2 flex-grow" />
        </div>
      </div>
      <div className="mt-6">
        <div
          style={{ borderColor: "#D9D9D9" }}
          className="py-3 pl-3 pr-3 rounded border flex flex-row justify-between items-start relative"
        >
          <div className="mr-8">다나</div>
          <div className="flex-1">
            재고가 오후에 들어오면 수량 실사 체크 바랍니다!
          </div>
          <div className="absolute bottom-1 right-3 text-gray text-xs">
            시간
          </div>
        </div>
        <div
          style={{ borderColor: "#D9D9D9" }}
          className="py-3 pl-3 pr-3 rounded border flex flex-row justify-between items-start relative"
        >
          <div className="mr-8">myo</div>
          <div className="flex-1">네, 제가 해놓을게요!</div>
          <div className="absolute bottom-1 right-3 text-gray text-xs">
            시간
          </div>
        </div>
        <div
          style={{ borderColor: "#D9D9D9" }}
          className="py-3 pl-3 pr-3 rounded border flex flex-row justify-between items-start relative"
        >
          <div className="mr-8">케빈</div>
          <div className="flex-1">myo 같이해요! 저도 도울게요!</div>
          <div className="absolute bottom-1 right-3 text-gray text-xs">
            시간
          </div>
        </div>
        <div
          style={{ borderColor: "#D9D9D9" }}
          className="py-3 pl-3 pr-3 rounded border flex flex-row justify-between items-start relative"
        >
          <div className="mr-8">tok</div>
          <div className="flex-1">
            myo, 케빈! 더 도울 일 없나요? <br />
            있으면 알려주세요
          </div>
          <div className="absolute bottom-1 right-3 text-gray text-xs">
            시간
          </div>
        </div>
        <div
          style={{ borderColor: "#D9D9D9" }}
          className="py-3 pl-3 pr-3 rounded border flex flex-row justify-between items-start relative"
        >
          <div className="mr-8">다나</div>
          <div className="flex-1">
            음! 여러분 천천히 하시고 제가 내일 마무리 하도록 할게요..
            <br />
            감사합니다-!
          </div>
          <div className="absolute bottom-1 right-3 text-gray text-xs">
            시간
          </div>
        </div>
      </div>
      <div style={{ borderColor: "#d9d9d9" }} className="border-t mt-10">
        <div className="border mt-6 border-yellow w-full rounded-3xl py-3 px-6 flex items-center">
          <input
            className="flex-grow bg-transparent border-none outline-none"
            placeholder="댓글 쓰기"
          />
          <button className="ml-4 bg-yellow rounded-md px-8 py-2">입력</button>
        </div>
      </div>
    </>
  );
};

export default DesktopNotice;
