import React, {useState} from "react";

export default function Modal({ title, content1, content2, button1, button2, onClose, onClick }) {
  // 모달은 title, content1, content2, button1, button2으로 구분
  // content1, content2가 없으면 button은 '확인'이 default
  const hasContent2 = Boolean(content2);
  const hasContent1 = Boolean(content1);
  const containerHeight = hasContent2 ? "14.3rem" : "11rem";
  const buttonTop = hasContent2 ? "11.8rem" : "8.25rem";
  const borderTop = hasContent2 ? "10.8125rem" : "7.5rem";
  const titleLeft = hasContent2 ? "3rem" : "2.25rem";
  const content1Text = hasContent2 ? "0.9375" : "1.25rem";
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`w-[20.5rem] relative bg-white rounded-[15px]`}
        style={{ height: containerHeight }}
      >
        <div
          className="w-[20.5rem] h-0 left-0 absolute border border-borderGray"
          style={{ top: borderTop }}
        />
        {button1 && button2 ? (
          <>
            <Button
              width="6rem"
              text={button1}
              colorClass="text-lightblue"
              onClick={onClose}
              style={{ left: "2.4375rem", top: buttonTop }}
            />
            <Button
              width="6.5rem"
              text={button2}
              colorClass="text-red"
              onClick={onClick}
              style={{ left: "11.0625rem", top: buttonTop }}
            />
          </>
        ) : (
          <Button
            width="6rem"
            text="확인"
            colorClass="text-lightblue"
            onClick={onClose}
            style={{ left: "7.25rem", top: buttonTop }}
          />
        )}
        <Title text={title} style={{ left: titleLeft }} />
        {hasContent1 && <Content1 text={content1} textSize={content1Text} />}
        {hasContent2 && <Content2 text={content2}/>}
      </div>
    </div>
  );
}

// Title 컴포넌트
export const Title = ({ text, style }) => {
  return (
    <div
      className="top-[1.9375rem] left-9 right-9 absolute text-center text-black text-[1.375rem] font-light font-gmarket leading-[2.5rem] break-words"
      // style={{ ...style }}
    >
      {text}
    </div>
  );
};

// Content1 컴포넌트
export const Content1 = ({ text, textSize }) => {
  const textParts = text.split(",");

  return (
    <div
      className={`w-[16.9375rem] left-[1.8125rem] top-[4.375rem] absolute text-center text-customGray font-light font-gmarket leading-[1.625rem] break-words`}
      style={{ fontSize: textSize }}
    >
      {textParts.map((part, index) => (
        <div key={index}>
          {part}
          {index < textParts.length - 1 && <br />}
        </div>
      ))}
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
      style={{ ...style, width }}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
