import React from "react";

const DesktopPlusProduct = () => {
  return (
    <div>
      <div
        style={{ color: "#FFAB08" }}
        className="inline-block border-b mt-10 mb-4"
      >
        제품 생성
      </div>
      <div className="relative border border-yellow rounded-xl mt-10 p-4">
        <div
          style={{ color: "#FFAB08" }}
          className="absolute -top-3 left-4 bg-white px-2"
        >
          기본 정보
        </div>
        <div className="flex flex-col items-start space-y-4 mt-4">
          <div className="flex items-center w-full">
            <label className="text-left mx-4" style={{ width: "150px" }}>
              제품명
            </label>
            <input
              type="text"
              className="flex-grow border mr-10 border-yellow px-2 py-1"
            />
          </div>
          <div className="flex items-center w-full">
            <label className="text-left mx-4" style={{ width: "150px" }}>
              하위 제품
            </label>
            <input
              type="text"
              className="flex-grow border mr-10 border-yellow px-2 py-1"
            />
          </div>
          <div className="flex items-center w-full">
            <label className="text-left mx-4" style={{ width: "150px" }}>
              품번(SKU)
            </label>
            <input
              type="text"
              className="flex-grow border mr-10 border-yellow px-2 py-1"
            />
          </div>
          <div className="flex items-center w-full">
            <label className="text-left mx-4" style={{ width: "150px" }}>
              구매가
            </label>
            <input
              type="text"
              placeholder="₩"
              className="flex-grow border mr-10 border-yellow px-2 py-1"
            />
          </div>
          <div className="flex items-center w-full">
            <label className="text-left mx-4" style={{ width: "150px" }}>
              판매가
            </label>
            <input
              placeholder="₩"
              type="text"
              className="flex-grow border mr-10 border-yellow px-2 py-1"
            />
          </div>
          <div className="flex items-center w-full">
            <label className="text-left mx-4" style={{ width: "150px" }}>
              현재 재고 수량
            </label>
            <input
              type="text"
              className="flex-grow border mr-10 border-yellow px-2 py-1"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <button
          style={{ backgroundColor: "#FFDE33" }}
          className="px-48 py-2 rounded-lg"
        >
          제품 추가하기
        </button>
      </div>
    </div>
  );
};

export default DesktopPlusProduct;
