import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditInventory() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { inventoryData = [], date = '' } = state || {};

  const [selectedProducts, setSelectedProducts] = useState([]);

  // 제품 선택 토글
  const toggleProductSelection = (index) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(index)) {
        return prevSelectedProducts.filter((item) => item !== index);
      } else {
        return [...prevSelectedProducts, index];
      }
    });
  };

  // 선택된 제품 삭제
  const deleteSelectedProducts = () => {
    const updatedInventory = inventoryData.filter(
      (item, idx) => !selectedProducts.includes(idx) 
    );
    console.log('Updated Inventory:', updatedInventory);
    // TODO: 서버 업데이트 로직을 여기에 추가
  };

  // 제품 추가 함수
  const addProduct = () => {
    navigate('/manage-inventory/productCreationForm'); 
  };

  if (!inventoryData.length) {
    return <div>재고 데이터가 없습니다.</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-orange font-gmarket text-xl font-black">{date} 재고현황</h2>
      </div>

      <div>
        <div className="flex justify-end items-center mb-3">
          <div className="border-t-2 border-yellow flex-grow"></div>
          <div className="flex space-x-2 ml-2">
            <button
              onClick={deleteSelectedProducts}
              className="px-2 py-1 bg-yellow text-black text-xs font-gmarket font-thin rounded-xl"
            >
              - 제품 삭제
            </button>
            <button
              onClick={addProduct}
              className="px-2 py-1 bg-yellow text-black text-xs font-gmarket font-thin rounded-xl"
            >
              + 제품 추가
            </button>
          </div>
        </div>
        <div className="flex py-2 space-x-4 mb-3">
          <input
            type="text"
            placeholder="제품 이름, SKU 검색"
            className="border border-yellow p-2 pl-3 text-sm rounded-lg w-full"
          />
        </div>
      </div>

      

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray py-2 px-4 mt-2">
              <th className="py-2 px-4 text-left"></th>
              <th className="py-2 px-0 text-left">제품 이름</th>
              <th className="py-2 px-7 text-left">SKU</th>
              <th className="py-2 px-4 text-left">기본 단가</th>
              <th className="py-2 px-4 text-left">수량</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item, index) => (
              <tr key={index} className="border-b  border-gray" >
                <td className="py-4 px-1">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(index)} // 인덱스를 사용하여 상태 관리
                    onChange={() => toggleProductSelection(index)}
                  />
                </td>
                
                <td className="text-sm py-2 px-1">{item.productName}</td>
                <td className="text-sm py-2 px-4">{item.sku}</td>
                <td className="text-sm py-2 px-4">{item.unitPrice}</td>
                <td className="text-sm py-2 px-4">{item.stockQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EditInventory;
