import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import { getTeam } from "../../util/ProfileUtils";
import { fetchInventories } from "../../util/inventory";
import { fetchProductsByInventoryId, uploadFile } from "../../util/inventory";

const DesktopManageInventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const teamData = await getTeam();
    setTeamId(teamData?.teamId);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file); // 선택한 파일 상태 저장

    if (file) {
      try {
        const response = await uploadFile(file); // API 호출
        alert("파일 업로드 성공: 재고가 업데이트되었습니다.");
        getAllInventories(); // 업로드 후 재고 목록 갱신
      } catch (error) {
        console.error("파일 업로드 실패:", error);
        alert("파일 업로드 중 오류가 발생했습니다.");
      }
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  useEffect(() => {
    getAllInventories();
  }, []);

  const openModal = async (inventory) => {
    try {
      const products = await fetchProductsByInventoryId(inventory.inventoryId);
      setSelectedInventory({ ...inventory, products });
      setIsModalOpen(true);
    } catch (error) {
      console.error("재고 상세 정보를 불러오는 중 오류 발생:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInventory(null);
  };

  const getAllInventories = async () => {
    try {
      const inventoriesData = await fetchInventories(1, 5);
      setInventories(inventoriesData);
    } catch (error) {
      console.error("전체 재고 현황 조회 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <div className="mt-20 flex justify-between">
        <div
          className="text-[#FFAB08] font-bold text-2xl"
          onClick={() => navigate("/manage-inventory/edit")}
        >
          재고 현황 게시글
        </div>
        <div>
          <div
            style={{ backgroundColor: "#FFDE33" }}
            className="cursor-pointer inline-block rounded p-1 pt-2 text-sm text-center"
            onClick={handleClick}
          >
            + 파일 불러오기
          </div>
          <input
            id="fileInput"
            type="file"
            accept=".xlsx,.xls"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {selectedFile && (
            <p className="text-xs mt-2 text-gray">
              선택된 파일: {selectedFile.name}
            </p>
          )}
        </div>
      </div>
      <p style={{ color: "#97A5A4" }} className="mt-6 text-xs">
        파일 불러오기 이용시, 옐로우북에서 제공하는 재고현황 엑셀 형식을
        이용해주세요!
      </p>
      <div
        style={{ color: "#FFAB08" }}
        className="cursor-pointer inline-block border-b mt-2 text-xs"
        onClick={() =>
          (window.location.href =
            "https://yellobook-business-helper.notion.site/YELLOBOOK-INTRO-4a9c74f194544087a2b3c495f328307f")
        }
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
        className="bg-white rounded-lg max-w-5xl w-auto max-h-full p-4 overflow-y-auto"
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
            <h2 className="text-center text-xl" style={{ color: "#FFAB08" }}>
              {format(
                new Date(selectedInventory.createdAt),
                "yyyy년 MM월 dd일"
              )}{" "}
              재고현황
            </h2>
            <div className="p-4 overflow-x-auto">
              <table className="">
                <thead>
                  <tr className="text-gray">
                    <th className="py-2 pr-20">제품이름</th>
                    <th className="py-2 px-4">하위제품</th>
                    <th className="py-2 px-4">SKU</th>
                    <th className="py-2 px-4">기본단가</th>
                    <th className="py-2 px-4">판매가</th>
                    <th className="py-2 px-4">수량</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInventory.products.map((product) => (
                    <tr className="text-center" key={product.productId}>
                      <td className="py-2 pr-20 text-lg font-bold">
                        {product.name}
                      </td>
                      <td className="py-2 px-4 text-gray">
                        {product.subProduct}
                      </td>
                      <td className="py-2 px-4 text-gray">{product.sku}</td>
                      <td className="py-2 px-4 text-gray">
                        {product.purchasePrice.toLocaleString()}
                      </td>
                      <td className="py-2 px-4 text-gray">
                        {product.salePrice.toLocaleString()}
                      </td>
                      <td className="py-2 px-4 text-gray">
                        <div className="flex items-center">
                          <span className="text-sm">
                            {product.amount.toLocaleString()}
                          </span>
                          <div className="">
                            <div
                              style={{
                                width: `${(product.amount / 5000) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() =>
                  navigate(
                    `/manage-inventory/edit?date=${selectedInventory.createdAt}&id=${selectedInventory.inventoryId}`
                  )
                }
                className="mb-5 px-4 py-3 rounded-xl text-xs"
                style={{ backgroundColor: "#FFDE33" }}
              >
                재고현황 수정하기
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default DesktopManageInventory;
