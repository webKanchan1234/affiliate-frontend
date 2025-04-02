import api from "./apiService";

export const createBrand = async (data,id) => {
  const response = await api.post(`/brands/create/category/${id}`, data);
  // console.log("categories",response.data);
  return response.data;
};

export const fetchAllBrands = async () => {
  const response = await api.get("/brands/");
  // console.log("categories",response.data);
  return response.data;
};

export const updateBrand = async (brandId,categoryId,data) => {
  const response = await api.put(`/brands/${brandId}/category/${categoryId}`,data);
  // console.log("categories",response.data);
  return response.data;
};


export const deleteBrand = async (id) => {
  const response = await api.delete(`/brands/${id}`);
  // console.log("categories",response.data);
  return response.data;
};