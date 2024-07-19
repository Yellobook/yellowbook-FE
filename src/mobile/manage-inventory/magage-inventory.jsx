import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InventoryDetails from './manageInventoryDetail'; 

// 메인 컴포넌트
function MobileManageInventory() {
  return (
    <div>
      <InventoryHeader />
      <InventoryInfo/>
      <InventoryList />
    </div>
  );
}

// 재고 현황 헤더 컴포넌트
function InventoryHeader() {
  return (
    <div className="w-full sm:w-330 h-29 flex justify-between items-center p-5 pb-0 pt-18 ">
      <text class="text-orange font-gmarket text-2xl font-black ">재고 현황 게시글</text>
      <button className="bg-yellow text-black text-xs w-21 h-10 p-2 rounded-lg justify-center items-center font-gmarket">파일 불러오기 +</button>
    </div>
  );
}

//TODO:- 이용가이드 바로가기 연결
function InventoryInfo() {
  return(
    <div className="flex-col w-full sm:w-330 h-30 items-center p-6 pb-10">
      <p className="text-gray font-gmarket text-xs font-bold mr-4">
        파일 불러오기 이용시,<br/> 옐로우북에서 제공하는 재고현황 엑셀 형식을 이용해주세요!
      </p>
      <Link to="/guide" className="text-xs text-orange underline hover:text-orange">
        옐로우북 이용가이드 바로가기
      </Link>
    </div>
  );
}
 
// 재고 현황 리스트 컴포넌트
function InventoryList() {
  //임시 데이터
  const inventoryData = [
    {
      date: "2024년 07월 17일",
      creationDate: "2024년 07월 17일",
      lastUpdated: "2024년 07월 17일",
      views: 150
    },
    {
      date: "2024년 07월 16일",
      creationDate: "2024년 07월 16일",
      lastUpdated: "2024년 07월 16일",
      views: 120
    },
    {
      date: "2024년 07월 16일",
      creationDate: "2024년 07월 16일",
      lastUpdated: "2024년 07월 16일",
      views: 120
    },
    {
      date: "2024년 07월 16일",
      creationDate: "2024년 07월 16일",
      lastUpdated: "2024년 07월 16일",
      views: 120
    },
  ];

  return (
    <div>
      {inventoryData.map((item, index) => (
        <InventoryItem key={index} item={item} />
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
        <div className="font-bold font-gmarket">{item.date} 재고 현황</div>

        <div className="flex justify-end items-center mt-1">
          <div className="text-sm text-gray font-gmarket font-thin">작성일자: {item.creationDate}</div>
        </div>

        <div className="flex justify-between items-center mt-1">
          <div className="text-sm text-gray font-gmarket font-thin">조회수: {item.views}</div>
          <div className="text-sm text-gray font-gmarket font-thin">마지막 업데이트: {item.lastUpdated}</div>
        </div>
      </div>

      <InventoryDetails isOpen={isModalOpen} onClose={handleCloseModal} date={item.date}>
        <div>
          <strong>재고 현황 상세</strong>
          <p>날짜: {item.date}</p>
          <p>작성일자: {item.creationDate}</p>
          <p>마지막 업데이트: {item.lastUpdated}</p>
          <p>조회수: {item.views}</p>
        </div>
      </InventoryDetails>
    </div>
  );
}

export default MobileManageInventory;