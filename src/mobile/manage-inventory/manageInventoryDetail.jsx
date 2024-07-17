import React from 'react';

//재고현황 선택시 모달 뷰
function InventoryDetails({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        {children}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          닫기
        </button>
      </div>
    </div>
  );
}

export default InventoryDetails;