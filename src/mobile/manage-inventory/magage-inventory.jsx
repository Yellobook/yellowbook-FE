import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import InventoryDetails from "./manageInventoryDetail";
import { fetchInventories } from '../../util/InventoryApi'; 


// 메인 컴포넌트
function MobileManageInventory() {
  return (
    <div>
      <InventoryHeader />
      <InventoryInfo />
      <InventoryList />
      <Outlet />
    </div>
  );
}

// 재고 현황 헤더 컴포넌트
function InventoryHeader() {
  return (
    <div className="w-full sm:w-330 h-29 flex justify-between items-center p-5 pb-0 pt-18">
      <span className="text-orange font-gmarket text-2xl font-black">
        재고 현황 게시글
      </span>
      <button className="bg-yellow text-black text-xs w-21 h-10 p-2 rounded-lg justify-center items-center font-gmarket">
        파일 불러오기 +
      </button>
    </div>
  );
}

// 재고 정보 안내 컴포넌트
function InventoryInfo() {
  return (
    <div className="flex-col w-full sm:w-330 h-30 items-center p-6 pb-10">
      <p className="text-gray font-gmarket text-xs font-bold mr-4">
        파일 불러오기 이용시,
        <br /> 옐로우북에서 제공하는 재고현황 엑셀 형식을 이용해주세요!
      </p>
      <Link
        to="/guide"
        className="text-xs text-orange underline hover:text-orange"
      >
        옐로우북 이용가이드 바로가기
      </Link>
    </div>
  );
}

// 재고 현황 리스트 컴포넌트
function InventoryList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInventories = async () => {
      try {
        setLoading(true);
        const response = await fetchInventories(1, 1); // API 호출
        setData(response); // 받아온 데이터를 상태로 업데이트
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadInventories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data.map((item) => (
        <InventoryItem key={item.inventoryId} item={item} />
      ))}
    </div>
  );
}

// 개별 재고 현황 아이템 컴포넌트
function InventoryItem({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className="border-t border-gray-200 py-2 px-4 mt-2 first:mt-0 cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="font-bold font-gmarket">{item.title}</div>

        <div className="flex justify-end items-center mt-1">
          <div className="text-sm text-gray font-gmarket font-thin">작성일자: {item.createdAt}</div>
        </div>

        <div className="flex justify-between items-center mt-1">
          <div className="text-sm text-gray font-gmarket font-thin">조회수: {item.view}</div>
          <div className="text-sm text-gray font-gmarket font-thin">마지막 업데이트: {item.updatedAt}</div>
        </div>
      </div>

      {isModalOpen && (
        <InventoryDetails isOpen={isModalOpen} onClose={handleCloseModal} date={item.title} inventoryId={item.inventoryId} >
          <div>
            <strong>재고 현황 상세</strong>
            <p>날짜: {item.createdAt}</p>
            <p>작성일자: {item.createdAt}</p>
            <p>마지막 업데이트: {item.updatedAt}</p>
            <p>조회수: {item.view}</p>
          </div>
        </InventoryDetails>
      )}
    </div>
  );
}

export default MobileManageInventory;
