import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Order = ({ setIsModal }) => {
  const month = Array.from({ length: 12 }, (_, i) => i + 1);
  const day = Array.from({ length: 31 }, (_, i) => i + 1);
  const [subProducts, setSubProducts] = useState(["하위 제품이 없습니다."]);
  const [members, setMembers] = useState([]);
  const [selectedMem, setSelectedMem] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [submitDataa, setSubmitDataa] = useState({});
  const { register, handleSubmit } = useForm();
  const onValid = (IData) => {
    IData["members"] = selectedMem;
    let memberIds = [];
    IData.members.forEach((m) => memberIds.push(m.memberId));
    IData["mentionIds"] = memberIds;
    const submitData = {
      title:
        IData.type === "order"
          ? `[주문] ${IData.title}`
          : `[공지] ${IData.title}`,
      memo: IData.memo,
      mentionIds: IData.mentionIds,
      date: `${IData.year}-${IData.month}-${IData.date}`,
    };
    setSubmitDataa({
      title:
        IData.type === "order"
          ? `[주문] ${IData.title}`
          : `[공지] ${IData.title}`,
      memo: IData.memo,
      mentionIds: IData.mentionIds,
      date: `${IData.year}-${IData.month}-${IData.date}`,
    });
    console.log(submitData);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/v1/informs`, submitData, {
        headers: {
          Authorizatioin: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/teams/members`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setMembers(res.data.data.members))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-black bg-opacity-50 absolute w-full h-full top-0 left-0 z-50 flex items-center justify-center">
      <form
        className="bg-white rounded-md min-h-[70%] w-[50%] py-5 px-10 flex flex-col items-start"
        onSubmit={handleSubmit(onValid)}
      >
        <XMarkIcon
          className="text-yellow w-10 self-end"
          onClick={() => {
            setIsModal(false);
          }}
        />
        <div id="date" className="w-full">
          <div>날짜</div>
          <select
            name="year"
            id="year"
            className="select"
            onClick={(e) => {
              console.log(e);
            }}
            {...register("year")}
          >
            <option value="2024" selected>
              2024
            </option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
          년
          <select
            name="month"
            id="month"
            className="select ml-10"
            {...register("month")}
          >
            {month.map((i, v) => {
              const now = new Date().getMonth() + 1;
              if (now == i) {
                return (
                  <option value={i} key={i} selected>
                    {i}
                  </option>
                );
              } else {
                return (
                  <option value={i} key={i}>
                    {i}
                  </option>
                );
              }
            })}
          </select>
          월
          <select
            name="date"
            id="date"
            className="select ml-10"
            {...register("date")}
          >
            {day.map((i, v) => {
              const now = new Date().getDate();
              if (now == i) {
                return (
                  <option value={i} key={i} selected>
                    {i}
                  </option>
                );
              } else {
                return (
                  <option value={i} key={i}>
                    {i}
                  </option>
                );
              }
            })}
          </select>
          일
        </div>

        <div id="type" className="mt-10 w-full">
          <div>일정 종류</div>
          <select
            name="type"
            id="type"
            className="select w-full ml-1 py-1"
            {...register("type")}
          >
            <option value="order">주문</option>
            <option value="inform">공지사항</option>
          </select>
        </div>

        <div id="title" className="mt-10 w-full">
          <div>공지 제목</div>
          <input
            {...register("title")}
            type="text"
            className="w-full border-yellow border-2 placeholder:text-opacity-55 py-1 px-1"
            placeholder="공지 또는 업무 타이틀을 입력해주세요."
          />
        </div>

        <div
          id="product"
          className="mt-10 w-full flex  items-center justify-between"
        >
          <div className="w-[150px] text-[16px]">제품</div>
          <input
            {...register("product")}
            type="text"
            className=" w-full border-yellow border-2 placeholder:text-opacity-55 py-1 px-1"
            placeholder="제품명을 입력해주세요."
          />
        </div>

        <div id="product" className="flex items-center justify-start w-full">
          <div className="w-[150px] text-[16px]">하위제품</div>
          <select
            {...register("subProduct")}
            name="subProduct"
            id="subProduct"
            className="select w-full py-1 mx-1"
          >
            {subProducts.map((v, i) => {
              if (v === "하위 제품이 없습니다.") {
                return (
                  <option value={"none"} key={v} disabled>
                    {v}
                  </option>
                );
              } else {
                return (
                  <option value={v} key={v}>
                    {v}
                  </option>
                );
              }
            })}
          </select>
        </div>

        <div id="number" className="w-full flex  items-center justify-between">
          <div className="w-[150px] text-[16px]">주문수량</div>
          <input
            {...register("number")}
            type="number"
            className=" w-full border-yellow border-2 placeholder:text-opacity-55 py-1 px-1"
          />
        </div>

        <div id="memo" className="w-full mt-10">
          <div className="w-[150px] text-[16px]">메모</div>
          <textarea
            {...register("memo")}
            className="w-full border-yellow border-2 placeholder:text-opacity-55 py-1 px-1 resize-none"
            placeholder="주문 또는 공지와 업무에 관한 상세 정보나 메모를 입력해주세요."
          />
        </div>

        <div className="relative w-full">
          <div>함께 하는 멤버</div>
          <div
            name="member"
            id="member"
            className="select cursor-pointer px-2 py-1 text-neutral-400 select-none"
            onClick={() => setIsSelecting((prev) => !prev)}
          >
            {selectedMem.length > 0 ? (
              <div className="flex items-center gap-3">
                {selectedMem.map((m) => {
                  return <div key={m.memberId}>{m.nickname}</div>;
                })}
              </div>
            ) : (
              "함께 하는 멤버가 없습니다."
            )}
          </div>
          <div className="absolute bottom-[-40%] left-0 bg-neutral-200 rounded-sm w-full ">
            {isSelecting & (members.length >= 0) ? (
              <div>
                {members.map((v, i) => {
                  return (
                    <option
                      value={v.memberId}
                      key={v.memberId}
                      className="cursor-pointer"
                      onClick={() => {
                        if (selectedMem.includes(v)) {
                          let idx = selectedMem.indexOf(v);
                          if (idx === -1) {
                            idx = selectedMem.length - 1;
                          }
                          const temp = selectedMem;
                          const upper = temp.slice(0, idx);
                          const downer = temp.slice(idx + 1, -1);
                          setSelectedMem(upper.concat(...downer));
                          setIsSelecting(false);
                        } else {
                          setSelectedMem((prev) => [...prev, v]);
                          setIsSelecting(false);
                        }
                      }}
                    >
                      {v.nickname}
                    </option>
                  );
                })}
                <option
                  className="cursor-pointer"
                  value={"everyone"}
                  onClick={() => {
                    if (selectedMem.length <= 0) {
                      setSelectedMem(members);
                      setIsSelecting(false);
                    } else {
                      setSelectedMem([]);
                      setIsSelecting(false);
                    }
                  }}
                >
                  everyone
                </option>
              </div>
            ) : null}
          </div>
        </div>

        <input
          type="submit"
          value="일정 게시하기"
          className="rounded-md bg-yellow text-white py-2 px-5 mt-5 self-center cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Order;
