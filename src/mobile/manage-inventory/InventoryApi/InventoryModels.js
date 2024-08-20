export const Inventory = {
    inventoryId: 0,  
    title: '',       
    createdAt: '',   
    updatedAt: '',   
    view: 0         
  };
  
  export const ApiResponse = {
    isSuccess: false, 
    message: '',      
    data: {
      page: 0,      
      size: 0,       
      inventories: [] 
    }
  };
  
export const Product = {
    productId: 0,
    name: '',
    subProduct: '',
    sku: 0,
    purchasePrice: 0,
    salePrice: 0,
    amount: 0
  };