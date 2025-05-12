import api from "./apiService";

export const fetchAllProducts = async () => {
  const response = await api.get("/products/");
  //   console.log("productapi",response.data);
  return response.data;
};

export const productDetails = async (urlName) => {
  const response = await api.get(`/products/${urlName}`);
  //   console.log("productapi",response.data);
  return response.data;
};

export const createProduct = async (data,categoryId,brandId) => {
  const response= await api.post(`/products/post/category/${categoryId}/brand/${brandId}`, data);
  return response.data
  // return "response.data"
};

export const updateProduct = async (productId,categoryId,brandId,data) => {
  try {
    const response= await api.put(`/products/update-product/${productId}/category/${categoryId}/brand/${brandId}`, data);
    console.log("productapi",response.data);
    return response.data;
  } catch (error) {
    console.log("error",error);
  }
};

export const fetchpProductByCategory = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  // console.log("productapi",response.data);
  return response.data;
};

export const fetchProductsByBrand = async (brand) => {
  const response = await api.get(`/products/brand/${brand}`);
  // console.log("productapi",response.data);
  return response.data;
};

export const fetchProductsBySubcategory = async (subcategory) => {
  const response = await api.get(`/products/subcategory/${subcategory}`);
  // console.log("productapi",response.data);
  return response.data;
};


export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  //   console.log("productapi",response.data);
  return response.data;
};


export const searchProducts = async (keyword) => {
  const response = await api.get(`/products/search?keyword=${keyword}`);
    // console.log("productapi",response.data);
  return response.data;
};

// export const addProduct = async (product) => {
//   const response = await api.post("/products", product);
// //   return response.data;
// };

// export const deleteProduct = async (productId) => {
// //   await api.delete(`/products/${productId}`);
// };
