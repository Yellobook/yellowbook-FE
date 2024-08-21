import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { addProductToInventory } from "../../util/InventoryAddApi";

const DesktopPlusProduct = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [subProduct, setSubProduct] = useState("");
  const [sku, setSku] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [amount, setAmount] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParams = params.get("id");
    setId(idParams);
  }, [location.search]);

  const handleButton = async () => {
    try {
      const productData = {
        name: name,
        subProduct: subProduct,
        sku: sku,
        purchasePrice: purchasePrice,
        salePrice: salePrice,
        amount: amount,
      };

      // 인벤토리에 제품 추가
      await addProductToInventory(id, productData);
      alert("제품이 성공적으로 추가되었습니다!");
    } catch (error) {
      alert("제품 추가 중 오류 발생: " + error.message);
    }
  };

  // 이하 코드 그대로 유지
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubProduct = (e) => {
    setSubProduct(e.target.value);
  };

  const handleSku = (e) => {
    setSku(e.target.value);
  };

  const handlePurchasePrice = (e) => {
    setPurchasePrice(e.target.value);
  };

  const handleSalePrice = (e) => {
    setSalePrice(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

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
              onChange={handleName}
              type="text"
              className="flex-grow border mr-10 border-yellow px-2 py-1"
            />
          </div>
          <div className="flex items-center w-full">
            <label className="text-left mx-4" style={{ width: "150px" }}>
              하위 제품
            </label>
            <input
              onChange={handleSubProduct}
              type="text"
              className="flex-grow border mr-10 border-yellow px-2 py-1"
            />
          </div>
          <div className="flex items-center w-full">
            <label className="text-left mx-4" style={{ width: "150px" }}>
              품번(SKU)
            </label>
            <input
              onChange={handleSku}
              type="text"
              className="flex-grow border mr-10 border-yellow px-2 py-1"
            />
          </div>
          <div className="flex items-center w-full">
            <label className="text-left mx-4" style={{ width: "150px" }}>
              구매가
            </label>
            <input
              onChange={handlePurchasePrice}
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
              onChange={handleSalePrice}
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
              onChange={handleAmount}
              type="text"
              className="flex-grow border mr-10 border-yellow mb-10 px-2 py-1"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handleButton}
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
