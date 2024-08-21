import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { fetchProductsByInventoryId } from "../../mobile/manage-inventory/InventoryApi/InventoryDetailApi";
import { deleteProduct } from "../../util/InventoryDelete";

const DesktopEditInventory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [id, setId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParams = params.get("id");
    const dateParams = params.get("date");
    setDate(format(new Date(dateParams), "yyyy년 MM월 dd일"));
    setId(idParams);

    if (idParams) {
      const fetchInventoryData = async () => {
        try {
          const products = await fetchProductsByInventoryId(idParams);
          setInventoryData(products);
        } catch (error) {
          console.error("재고 데이터를 불러오는 중 오류 발생", error);
        }
      };

      fetchInventoryData();
    }
  }, [location.search]);

  const handleCheckboxChange = (productId) => {
    setSelectedProductId(productId);
  };

  const handleDelete = async (selectedProductId) => {
    try {
      await deleteProduct(selectedProductId);
      setInventoryData((prevData) =>
        prevData.filter((product) => product.productId !== selectedProductId)
      );
      location.reload();
    } catch (error) {
      console.error("제품 삭제 중 오류 발생", error);
    }
  };

  return (
    <div>
      <div className="mt-10 inline-block border-b" style={{ color: "#FFAB08" }}>
        {date} 재고현황
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/manage-inventory/edit/plus?id=${id}`)}
          className="rounded px-3 py-1 mr-4 text-xs"
          style={{ backgroundColor: "#FFDE33" }}
        >
          + 제품 추가
        </button>

        <button
          className="rounded px-3 py-1 text-xs"
          style={{ backgroundColor: "#FFDE33" }}
          onClick={() => handleDelete(selectedProductId)}
        >
          - 제품 삭제
        </button>
      </div>

      <div className="flex items-center border mt-5 text-xs rounded-full px-4 border-yellow">
        <div className="mt-1">🔍</div>
        <input
          type="text"
          placeholder="제품이름, SKU 검색"
          className="flex-grow pl-2 focus:outline-none"
        />
      </div>
      <div
        style={{ color: "#97A5A4" }}
        className="border border-yellow rounded-xl text-center mt-10 p-4 overflow-x-auto"
      >
        <table className="flex justify-center">
          <thead>
            <tr className="text-base text-gray">
              <th className="py-2 px-4"></th>
              <th className="py-2 px-4">제품이름</th>
              <th className="py-2 px-4">하위제품</th>
              <th className="py-2 px-4">SKU</th>
              <th className="py-2 px-4">기본단가</th>
              <th className="py-2 px-4">판매가</th>
              <th className="py-2 px-4">수량</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {inventoryData.map((inventory) => (
              <tr
                className="text-center items-center"
                key={inventory.productId}
              >
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(inventory.productId)}
                  />
                </td>
                <td className="py-2 text-black text-base font-bold">
                  {inventory.name}
                </td>
                <td className="py-2 px-4 text-gray">{inventory.subProduct}</td>
                <td className="py-2 px-4 text-gray">{inventory.sku}</td>
                <td className="py-2 px-4 text-gray">
                  {inventory.purchasePrice.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-gray">
                  {inventory.salePrice.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-gray">
                  <div className="flex items-center">
                    <span>{inventory.amount.toLocaleString()}</span>
                    <div className="">
                      <div
                        style={{
                          width: `${(inventory.amount / 5000) * 100}%`,
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
    </div>
  );
};

export default DesktopEditInventory;
