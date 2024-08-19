import React from 'react';
import { ReactComponent as BackIcon } from '../../assets/mobile/calendar/back.svg'; 
import { useNavigate } from 'react-router-dom';

function InventoryDetails({ isOpen, onClose, date }) {
  const navigate = useNavigate();
  if (!isOpen) return null;
  
  const handleNavigateToEditInventory = () => {
    navigate('/manage-inventory/edit-inventory' , { state: { inventoryData, date } });
  };

  // 임시 데이터
  const inventoryData = [
    {
      productName: 'Row 1',
      subProduct: 'red',
      sku: '2018102',
      unitPrice: '100,000',
      stockQuantity: 5000,
    },
    {
      productName: 'Row 2',
      subProduct: 'red',
      sku: '2018102',
      unitPrice: '10000',
      stockQuantity: 650,
    },
    {
      productName: 'Row 3',
      subProduct: 'red',
      sku: '2018102',
      unitPrice: '100',
      stockQuantity: 150,
    },
    {
      productName: 'Row 4',
      subProduct: 'red',
      sku: '2018102',
      unitPrice: '100,000',
      stockQuantity: 100,
    },
  ];

  // 최대 수량 값을 기준으로 막대 그래프의 너비를 백분율로 계산
  const maxStockQuantity = Math.max(...inventoryData.map(item => item.stockQuantity));


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-slate-50 pt-3 pb-3 rounded-lg w-full max-w-sm"> 
      <div className="flex justify-end items-center m-3">
          <button onClick={onClose} className="mt-2 flex">
            <BackIcon className="w-6 h-6 mr-2" />
          </button>
        </div>
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-orange font-gmarket text-2xl font-black">{date} 재고 현황</h2>
        </div>
        <div className=" bg-white rounded-lg max-h-96 overflow-y-auto">
          <InventoryTable data={inventoryData} maxStockQuantity={maxStockQuantity} />
        </div>
        <div className="flex justify-end items-end m-4">
          <button  onClick={handleNavigateToEditInventory} className="px-3 py-2 bg-yellow text-black text-sm font-gmarket font-thin rounded-xl">
            재고현황 수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

function InventoryTable({ data, maxStockQuantity }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-slate-100">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left text-gray font-gmarket text-xs font-black">제품 이름</th>
            <th className="py-2 px-4 text-left text-gray font-gmarket text-xs font-black">하위 제품</th>
            <th className="py-2 px-4 text-left text-gray font-gmarket text-xs font-black">SKU</th>
            <th className="py-2 px-4 text-left text-gray font-gmarket text-xs font-black">기본 단가</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="py-2 px-4 font-gmarket text-l font-thin">{item.productName}</td>
                <td className="py-2 px-4 font-gmarket text-sm font-thin text-gray">{item.subProduct}</td>
                <td className="py-2 px-4 font-gmarket text-sm font-thin text-gray">{item.sku}</td>
                <td className="py-2 px-4 font-gmarket text-sm font-thin text-gray">{item.unitPrice}</td>
              </tr>
              <tr>
                <td colSpan="4" className="py-2 px-4">
                  <div className="flex items-center">
                    <span className="text-xs mr-2 font-gmarket font-thin text-gray">{item.stockQuantity}</span>
                    <div className="relative w-full bg-slate-200 rounded-full h-4">
                      <div
                        className="absolute top-0 left-0 h-full bg-yellow rounded-full"
                        style={{ width: `${(item.stockQuantity / maxStockQuantity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryDetails;