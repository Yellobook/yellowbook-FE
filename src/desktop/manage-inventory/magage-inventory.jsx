import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";

const sampleData = {
  isSuccess: true,
  message: "요청이 성공적으로 처리되었습니다.",
  data: {
    page: 0,
    size: 5,
    inventories: [
      {
        inventoryId: 1,
        title: "2024년 03월 25일 재고현황",
        createdAt: "2024-03-25",
        updatedAt: "2024-03-26",
        view: 20,
      },
      {
        inventoryId: 2,
        title: "2024년 04월 29일 재고현황",
        createdAt: "2024-04-29",
        updatedAt: "2024-04-30",
        view: 20,
      },
      {
        inventoryId: 3,
        title: "2024년 04월 15일 재고현황",
        createdAt: "2024-04-15",
        updatedAt: "2024-04-16",
        view: 20,
      },
      {
        inventoryId: 4,
        title: "2024년 04월 29일 재고현황",
        createdAt: "2024-04-29",
        updatedAt: "2024-04-30",
        view: 20,
      },
      {
        inventoryId: 5,
        title: "2024년 05월 09일 재고현황",
        createdAt: "2024-05-09",
        updatedAt: "2024-05-10",
        view: 20,
      },
    ],
  },
};

const DesktopManageInventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventories = () => {
      const inventories = sampleData.data.inventories;
      setInventories(inventories);
    };

    fetchInventories();
  }, []);

  const openModal = (inventory) => {
    setSelectedInventory(inventory);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInventory(null);
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
      <div className="mt-10">
        {inventories.length > 0 ? (
          inventories
            .slice()
            .reverse()
            .map((inventory) => (
              <div
                key={inventory.inventoryId}
                className="border-t py-4 cursor-pointer"
                onClick={() => openModal(inventory)}
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">{inventory.title}</h3>
                  <p className="text-xs text-customGray1">
                    작성일자:{" "}
                    {format(new Date(inventory.createdAt), "yyyy년 MM월 dd일", {
                      locale: ko,
                    })}
                  </p>
                </div>
                <div className="flex justify-between mt-5">
                  <p className="text-xs text-customGray1">
                    조회수: {inventory.view}
                  </p>
                  <p className="text-xs text-customGray1">
                    마지막 업데이트 일시:{" "}
                    {format(new Date(inventory.updatedAt), "yyyy년 MM월 dd일", {
                      locale: ko,
                    })}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <p>재고 현황을 불러오는 중입니다...</p>
        )}
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
        {selectedInventory && (
          <>
            <h2 style={{ color: "#FFAB08" }}>
              {format(
                new Date(selectedInventory.createdAt),
                "yyyy년 MM월 dd일"
              )}{" "}
              재고현황
            </h2>
            <div className="p-4">표</div>
            <button
              onClick={() => navigate("/manage-inventory/edit")}
              className="mb-5 p-2 rounded-md text-xs"
              style={{ backgroundColor: "#FFDE33" }}
            >
              재고현황 수정하기
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default DesktopManageInventory;
