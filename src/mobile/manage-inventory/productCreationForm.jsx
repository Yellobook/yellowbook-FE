import React, { useState } from 'react';

function ProductCreationForm() {
  const [product, setProduct] = useState({
    productName: '',
    subProduct: '',
    partNumber: '',
    purchasePrice: '',
    salePrice: '',
    stockQuantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <div className="w-full sm:w-330 h-29 flex justify-between items-center p-5 pb-0 pt-18 ">
        <text className="text-orange font-gmarket text-3xl font-black ">
          제품 생성
        </text>
      </div>

      <div className="flex justify-end items-center mb-3 mt-4">
        <text className="text-orange font-gmarket text-l mr-3">
          기본정보
        </text>
        <div className="border-t-2 border-yellow flex-grow"></div>
        <div className="flex space-x-2 ml-3"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center">
          <label className="block text-sm font-medium w-1/2">
            제품명
          </label>
          <input type="text" name="productName" value={product.productName} onChange={handleChange} className="mt-1 block w-2/3 p-1  border border-yellow rounded-md" />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium w-1/2">
            하위제품
          </label>
          <input type="text" name="subProduct" value={product.subProduct} onChange={handleChange} className="mt-1 block w-2/3 p-1 border border-yellow rounded-md" />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium w-1/2">
            품번(SKU)
          </label>
          <input type="text" name="partNumber" value={product.partNumber} onChange={handleChange} className="mt-1 block w-2/3 p-1 border border-yellow rounded-md" />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium w-1/2">
            구매가
          </label>
          <input type="number" name="purchasePrice" value={product.purchasePrice} onChange={handleChange} placeholder="₩" className="mt-1 block w-2/3 p-1 border border-yellow rounded-md" />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium w-1/2">
            판매가
          </label>
          <input type="number" name="salePrice" value={product.salePrice} onChange={handleChange} placeholder="₩" className="mt-1 block w-2/3 p-1 border border-yellow rounded-md" />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium w-1/2">
            현재 재고 수량
          </label>
          <input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleChange} className="mt-1 block w-2/3 p-1 border border-yellow rounded-md" />
        </div>
        <button type="submit" className="w-full p-2 px-2 mt-2 bg-yellow rounded-3xl">
          제품 추가하기
        </button>
      </form>
    </div>
  );
}

export default ProductCreationForm;
