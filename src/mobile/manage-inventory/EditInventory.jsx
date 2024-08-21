import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function EditInventory() {
  const location = useLocation();
  const { state } = location;
  const { inventoryData = [], date = '', inventoryId, newProduct } = state || {};

  const [products, setProducts] = useState(inventoryData);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  // 새로운 제품이 추가된 경우, 기존 목록에 추가
  useEffect(() => {
    if (newProduct) {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }
  }, [newProduct]);

  const deleteSelectedProducts = () => {
    const updatedInventory = products.filter((item, idx) => !selectedProducts.includes(idx));
    setProducts(updatedInventory);
  };

  const toggleProductSelection = (index) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(index)) {
        return prevSelectedProducts.filter((item) => item !== index);
      } else {
        return [...prevSelectedProducts, index];
      }
    });
  };

  const navigateToAddProduct = () => {
    navigate('/manage-inventory/add-product', { 
      state: { inventoryId, inventoryData: products, date } 
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-orange font-gmarket text-xl font-black">{date}</h2> 
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
              onClick={navigateToAddProduct}
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
            {products.map((item, index) => (
              <tr key={index} className="border-b border-gray">
                <td className="py-4 px-1">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(index)}
                    onChange={() => toggleProductSelection(index)}
                  />
                </td>
                <td className="text-sm py-2 px-1">{item.name}</td>
                <td className="text-sm py-2 px-4">{item.sku}</td>
                <td className="text-sm py-2 px-4">{item.purchasePrice}</td>
                <td className="text-sm py-2 px-4">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EditInventory;
