import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { addProductToInventory } from './InventoryApi/InventoryAddApi'; // API 함수 임포트

function ProductCreationForm() {
  const [product, setProduct] = useState({
    name: '',
    subProduct: '',
    sku: 0,
    purchasePrice: 0,
    salePrice: 0,
    amount: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const inventoryId = location.state?.inventoryId; // state에서 inventoryId를 가져옴

  console.log('inventoryId:', inventoryId);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inventoryId) {
      setError("Inventory ID is missing.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      // 서버에 제품 추가 요청
      const { productId } = await addProductToInventory(inventoryId, product);
      
      // 제품 추가 후 EditInventory 페이지로 이동하며 새로 추가된 제품 데이터를 전달
      navigate('/manage-inventory/edit-inventory', { state: { newProduct: { ...product, productId } } });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-xl mx-auto p-5">
      <div className="w-full sm:w-330 h-29 flex justify-between items-center p-5 pb-0 pt-18 ">
        <span className="text-orange font-gmarket text-3xl font-black ">
          제품 생성
        </span>
      </div>

      <div className="flex justify-end items-center mb-3 mt-4">
        <span className="text-orange font-gmarket text-l mr-3">
          기본정보
        </span>
        <div className="border-t-2 border-yellow flex-grow"></div>
        <div className="flex space-x-2 ml-3"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center">
          <label className="block text-sm font-medium w-1/2">
            제품명
          </label>
          <input 
            type="text" 
            name="name" 
            value={product.name} 
            onChange={handleChange} 
            className="mt-1 block w-2/3 p-1 border border-yellow rounded-md" 
            required 
          />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium w-1/2">
            하위제품
          </label>
          <input 
            type="text" 
            name="subProduct" 
            value={product.subProduct} 
            onChange={handleChange} 
            className="mt-1 block w-2/3 p-1 border border-yellow rounded-md" 
            required 
          />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium w-1/2">
            품번(SKU)
          </label>
          <input 
            type="text" 
            name="sku" 
            value={product.sku} 
            onChange={handleChange} 
            className="mt-1 block w-2/3 p-1 border border-yellow rounded-md" 
            required 
          />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium w-1/2">
            구매가
          </label>
          <input 
            type="number" 
            name="purchasePrice" 
            value={product.purchasePrice} 
            onChange={handleChange} 
            placeholder="₩" 
            className="mt-1 block w-2/3 p-1 border border-yellow rounded-md" 
            required 
          />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium w-1/2">
            판매가
          </label>
          <input 
            type="number" 
            name="salePrice" 
            value={product.salePrice} 
            onChange={handleChange} 
            placeholder="₩" 
            className="mt-1 block w-2/3 p-1 border border-yellow rounded-md" 
            required 
          />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium w-1/2">
            현재 재고 수량
          </label>
          <input 
            type="number" 
            name="stockQuantity" 
            value={product.stockQuantity} 
            onChange={handleChange} 
            className="mt-1 block w-2/3 p-1 border border-yellow rounded-md" 
            required 
          />
        </div>
        <button type="submit" className="w-full p-2 px-2 mt-2 bg-yellow rounded-3xl" disabled={loading}>
          {loading ? '추가 중...' : '제품 추가하기'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default ProductCreationForm;
