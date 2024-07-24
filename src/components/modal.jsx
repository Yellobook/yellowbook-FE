import React from "react";

export default function Modal({ title, content1, content2, button1, button2 }) {
  return (
    <div className="w-[20.5rem] h-[14.3rem] relative bg-slate-500 rounded-[15px] fixed top-[15rem] left-1/2 transform -translate-x-1/2">
      <div className="w-[20.5rem] h-0 left-0 top-[10.8125rem] absolute border border-borderGray"></div>
      {button1 && button2 ? (
        <>
          <Button
            width="6rem"
            text={button2}
            colorClass="text-lightblue"
            onClick={() => console.log("버튼1 클릭")}
            style={{ left: "2.4375rem", top: "11.8rem" }}
          />
          <Button
            width="6.5rem"
            text={button1}
            colorClass="text-red"
            onClick={() => console.log("버튼2 클릭")}
            style={{ left: "11.0625rem", top: "11.8rem" }}
          />
        </>
      ) : (
        <Button
          width="6rem"
          text="확인"
          colorClass="text-lightblue"
          onClick={() => console.log("확인 버튼 클릭")}
          style={{ left: "7.25rem", top: "11.8rem" }}
        />
      )}

      <Title text={title} />
      <Content1 text={content1} />
      <Content2 text={content2} />
    </div>
  );
}

// Title 컴포넌트
export const Title = ({ text }) => {
  return (
    <div className="left-[3rem] top-[1.9375rem] absolute text-center text-black text-[1.375rem] font-light font-gmarket leading-[2.5rem] break-words">
      {text}
    </div>
  );
};

// Content1 컴포넌트
export const Content1 = ({ text }) => {
  return (
    <div className="w-[16.9375rem] left-[1.8125rem] top-[4.375rem] absolute text-center text-customGray text-[0.9375rem] font-light font-gmarket leading-[1.625rem] break-words">
      {text}
    </div>
  );
};

// Content2 컴포넌트
export const Content2 = ({ text }) => {
  return (
    <div className="w-[16.9375rem] left-[1.8125rem] top-[8.4375rem] absolute text-center text-black text-[0.9375rem] font-medium font-gmarket leading-[1.625rem] break-words">
      {text}
    </div>
  );
};

// Button 컴포넌트
export const Button = ({ text, colorClass, onClick, style, width }) => {
  return (
    <div
      className={`w-[${width}] h-[1.875rem] absolute text-center text-[1.5rem] font-medium font-gmarket leading-[3.4375rem] break-words flex justify-center items-center ${colorClass}`}
      style={style}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
