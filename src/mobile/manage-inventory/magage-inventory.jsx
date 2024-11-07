import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import InventoryDetails from "./manageInventoryDetail";
import { fetchInventories } from "../../util/inventory";
import { uploadFile } from "../../util/inventory";
import { fetchInventoryView } from "../../util/inventory";



// 메인 컴포넌트
function MobileManageInventory() {
  // 파일 업로드 성공 여부
  const [uploadSuccess, setUploadSuccess] = useState(false);

  return (
    <div>
      <InventoryHeader onUploadSuccess={() => setUploadSuccess(prev => !prev)} />
      <InventoryInfo />
      <InventoryList uploadSuccess={uploadSuccess} />
      <Outlet />
    </div>
  );
}

// 재고 현황 헤더 컴포넌트
function InventoryHeader({onUploadSuccess}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  
    if (file) {
      handleFileUpload(file); // 파일 선택 후 바로 업로드
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  // 파일 삭제
  const handleFileClear = () => {
    setSelectedFile(null);
    document.getElementById("fileInput").value = ""; // input 필드 초기화
  };

  // 파일 업로드
  const handleFileUpload = async (selectedFile) => {
    try {
        const response = await uploadFile(selectedFile);
        console.log("서버 응답:", response);
        onUploadSuccess();
    } catch (error) {
        console.error("파일 업로드 에러:", error);
    }
  };

  return (
    <div className="w-full sm:w-330 h-29 flex justify-between items-center p-5 pb-0 pt-18">
      <span className="text-orange font-gmarket text-2xl font-black">
        재고 현황 게시글
      </span>
      <button className="bg-yellow text-black text-xs w-21 h-10 p-2 rounded-lg justify-center items-center font-gmarket"
      onClick={handleClick}>
        파일 불러오기 +
      </button>
      <input
            id="fileInput"
            type="file"
            accept=".xlsx,.xls"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {/* {selectedFile && (
            <div className="text-xs mt-2 ">
              <p className="text-gray">선택된 파일: {selectedFile.name}</p>
              <button
                style={{ color: "red" }}
                className="underline mt-1"
                onClick={handleFileClear}
              >
              선택 취소
              </button>
            </div>
            
          )} */}
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
        to="https://yellobook-business-helper.notion.site/YELLOBOOK-INTRO-4a9c74f194544087a2b3c495f328307f?pvs=4"
        className="text-xs text-orange underline hover:text-orange"
      >
        옐로우북 이용가이드 바로가기
      </Link>
    </div>
  );
}

// 재고 현황 리스트 컴포넌트
function InventoryList({uploadSuccess}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 데이터가 더 있는지 확인
  const itemCnt = 4; // 한 페이지에 로드되는 항목 수

  
    const loadInventories = async (page) => {
      try {
        setLoading(true);
        const response = await fetchInventories(page, itemCnt);
        console.log('항목 개수: ', response.length);
        const nextPageData = await fetchInventories(page+1, itemCnt);
        setHasMore(response.length === itemCnt && nextPageData.length !== 0); // 페이지가 꽉 차고, 다음 페이지에 대해 조회하여 데이터가 있으면 `hasMore`를 true로 설정
        setData(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadInventories(page);
  }, [uploadSuccess, page]);

  // 페이지 이동
  const handlePageChange = (newPage) => {
    if ((newPage > 0 && hasMore) || newPage < page) {
      console.log('새로운 페이지: ', newPage);
      console.log('현재 페이지: ', page);
      setPage(newPage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data.map((item) => (
        <InventoryItem key={item.inventoryId} item={item} />
      ))}
      <Pagination currentPage={page} hasMore={hasMore} onPageChange={handlePageChange} />
    </div>
  );
}

// 페이지네이션 컴포넌트
const Pagination=({ currentPage, hasMore, onPageChange }) => {
  const getPages = () => {
    if (currentPage === 1) {
      return hasMore ? [1, 2] : [1];
    }
    
    if (currentPage === 2) {
      return hasMore ? [1, 2, 3] : [1, 2];
    }
    
    // currentPage가 3 이상인 경우
    return hasMore
      ? [currentPage - 1, currentPage, currentPage + 1]
      : [currentPage - 2, currentPage - 1, currentPage];
  };
  
  const pages = getPages();

  return (
    <div className="flex items-center space-x-2 mt-4 justify-center">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // 첫 페이지일 때 비활성화
        className={`px-2 py-1 border-0 ${currentPage === 1 ? "text-gray-400" : "text-black"}`}
      >
        {"<"}
      </button>

      {/* 페이지 번호 버튼 */}
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-2 py-1 border-0 ${
            pageNumber === currentPage ? "text-orange font-bold" : "text-gray-500"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore} // 더 이상 불러올 데이터가 없을 때 비활성화
        className={`px-2 py-1 border-0 ${!hasMore ? "text-gray-400" : "text-black"}`}
      >
        {">"}
      </button>
    </div>
  );
}

// 날짜 형식 변환 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
};


// 개별 재고 현황 아이템 컴포넌트
function InventoryItem({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 조회수 상태 관리
  const [viewCnt, setViewCnt] = useState(item.view);

  const handleViewCnt = async () => {
    try {
      await fetchInventoryView(item.inventoryId); // 서버에 조회수 증가 요청을 보냄
      setViewCnt((prevViewCnt) => prevViewCnt + 1); // 요청 성공 시 상태에서 조회수를 1 증가
    } catch (error) {
      console.error('조회수 증가 실패: ', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleViewCnt();
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
          <div className="text-sm text-gray font-gmarket font-thin">작성일자: {formatDate(item.createdAt)}</div> 
        </div>

        <div className="flex justify-between items-center mt-1">
          <div className="text-sm text-gray font-gmarket font-thin">조회수: {viewCnt}</div>
          <div className="text-sm text-gray font-gmarket font-thin">마지막 업데이트: {formatDate(item.updatedAt)}</div> 
        </div>
      </div>

      {isModalOpen && (
        <InventoryDetails isOpen={isModalOpen} onClose={handleCloseModal} date={item.title} inventoryId={item.inventoryId} >
          <div>
            <strong>재고 현황 상세</strong>
            <p>날짜: {formatDate(item.createdAt)}</p>
            <p>작성일자: {formatDate(item.createdAt)}</p>
            <p>마지막 업데이트: {formatDate(item.updatedAt)}</p>
            <p>조회수: {item.view}</p>
          </div>
        </InventoryDetails>
      )}
    </div>
  );
}

export default MobileManageInventory;
