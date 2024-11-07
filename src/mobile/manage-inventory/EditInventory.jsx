import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { deleteProduct } from '../../util/inventory';

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

  // 제품 삭제 선택 시 삭제 되어야 함
  const deleteSelectedProducts = async () => {
    try {
      // 선택된 제품 ID를 비동기로 삭제
      await Promise.all(
        selectedProducts.map(async (productId) => {
          //console.log('PRODUCTS: ', products);
          //const id = products[index].productId; // 제품 ID 가져오기
          //console.log('제품 아이디: ', id, 'type:', typeof id);
          console.log(products);
          await deleteProduct(productId); // API 호출로 DB에서 삭제
        })
      );
  
      // 선택된 제품을 제외한 새로운 목록으로 업데이트
      const updatedInventory = products.filter((item) => !selectedProducts.includes(item.productId));
      setProducts(updatedInventory);
      setSelectedProducts([]); // 선택 항목 초기화
  
      alert("선택한 제품이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("제품 삭제 중 오류 발생:", error.message);
      alert("제품 삭제에 실패했습니다.");
    }
  };

  const toggleProductSelection = (productId) => {
    //const productId = products[index]?.productId;
    //console.log(productId);
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(productId)) {
        return prevSelectedProducts.filter((item) => item !== productId);
      } else {
        return [...prevSelectedProducts, productId];
      }
    });
  };

  const navigateToAddProduct = () => {
    navigate('/manage-inventory/add-product', { 
      state: { inventoryId, inventoryData: products, date } 
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5 mt-5">
        <h2 className="text-orange font-gmarket text-2xl font-black">{date}</h2> 
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
      <th className="py-2 px-4  font-gmarket text-sm font-black text-gray text-left min-w-[100px]">제품 이름</th> {/* 최소 너비 설정 */}
      <th className="py-2 px-4 font-gmarket text-sm font-black text-gray text-left min-w-[100px]">하위 제품</th> {/* 최소 너비 설정 */}
      <th className="py-2 px-4 font-gmarket text-sm font-black text-gray text-left min-w-[100px]">SKU</th> {/* 최소 너비 설정 */}
      <th className="py-2 px-4 font-gmarket text-sm font-black text-gray text-left min-w-[100px]">구매가</th> {/* 최소 너비 설정 */}
      <th className="py-2 px-4 font-gmarket text-sm font-black text-gray text-left min-w-[100px]">판매가</th> {/* 최소 너비 설정 */}
      <th className="py-2 px-4 font-gmarket text-sm font-black text-gray text-left min-w-[100px]">수량</th> {/* 최소 너비 설정 */}
    </tr>
  </thead>
  <tbody>
    {products.map((item, index) => (
      <tr key={index} className="border-b border-gray">
        <td className="py-4 px-4">
          <input
            type="checkbox"
            checked={selectedProducts.includes(item.productId)}
            onChange={() => toggleProductSelection(item.productId)}
          />
        </td>
        <td className="text-lg py-2 px-4 min-w-[100px]">{item.name}</td> {/* 최소 너비 설정 */}
        <td className="text-s font-thin text-gray py-2 px-4 min-w-[150px]">{item.subProduct}</td> {/* 최소 너비 설정 */}
        <td className="text-s font-thin text-gray py-2 px-4 min-w-[150px]">{item.sku}</td> {/* 최소 너비 설정 */}
        <td className="text-s font-thin text-gray py-2 px-4 min-w-[100px]">{item.purchasePrice}</td> {/* 최소 너비 설정 */}
        <td className="text-s font-thin text-gray py-2 px-4 min-w-[100px]">{item.salePrice}</td> {/* 최소 너비 설정 */}
        <td className="text-s font-thin text-gray py-2 px-4 min-w-[100px]">{item.amount}</td> {/* 최소 너비 설정 */}
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
}

export default EditInventory;