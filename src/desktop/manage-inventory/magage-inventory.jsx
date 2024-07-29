import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";

const getTotalInventory = async ({ page, size }) => {
  try {
    const response = await axios.get(
      `https://api.yellobook.site/api/v1/inventories?page=${page}&size=${size}`,
      {}
    );
    return response.data.data.inventories;
  } catch (error) {
    console.error("전체 재고 현황 조회 중 오류 발생", error);
  }
};

const DesktopManageInventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventories, setInventories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventories = async () => {
      const inventories = await getTotalInventory({ page: 1, size: 5 });
      setInventories(inventories);
    };

    fetchInventories();
  }, []);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mt-20 flex justify-between">
        <div
          style={{ color: "#FFAB08" }}
          className="inline-block border-b text-xl"
        >
          재고 현황 게시글
        </div>
        <div
          style={{ backgroundColor: "#FFDE33" }}
          className="cursor-pointer inline-block rounded p-1 pt-2 text-sm text-center"
        >
          + 파일 불러오기
        </div>
      </div>
      <p style={{ color: "#97A5A4" }} className="mt-6 text-xs">
        파일 불러오기 이용시, 옐로우북에서 제공하는 재고현황 엑셀 형식을
        이용해주세요!
      </p>
      <div
        style={{ color: "#FFAB08" }}
        className="cursor-pointer inline-block border-b mt-2 text-xs"
      >
        옐로우북 이용가이드 바로가기
      </div>
      <div
        onClick={openModal}
        className="cursor-pointer inline-block bg-yellow mt-10"
      >
        <span>api 연결 전 모달 버튼 예시</span>
      </div>
      <div className="mt-10">
        {inventories?.map((inventory) => (
          <div key={inventory.inventoryId} className="border-b py-4">
            <h3 className="text-lg font-bold">{inventory.title}</h3>
            <p className="text-xs text-gray-500">조회수: {inventory.view}</p>
            <p className="text-xs text-gray-500">
              작성일자:{" "}
              {format(new Date(inventory.createdAt), "yyyy년 MM월 dd일", {
                locale: ko,
              })}
            </p>
            <p className="text-xs text-gray-500">
              마지막 업데이트 일시:{" "}
              {format(new Date(inventory.updatedAt), "yyyy년 MM월 dd일", {
                locale: ko,
              })}
            </p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        className="bg-white rounded-lg w-72 text-center"
      >
        <div
          onClick={closeModal}
          style={{ color: "#FFAB08" }}
          className="cursor-pointer flex justify-end mr-2"
        >
          x
        </div>
        <h2 style={{ color: "#FFAB08" }}>YYYY MM월 DD일 재고현황</h2>
        <div className="p-4">표</div>
        <button
          onClick={() => navigate("/manage-inventory/edit")}
          className="mb-5 p-2 rounded-md text-xs"
          style={{ backgroundColor: "#FFDE33" }}
        >
          재고현황 수정하기
        </button>
      </Modal>
    </div>
  );
};

export default DesktopManageInventory;
