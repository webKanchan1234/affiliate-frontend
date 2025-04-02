import api from "./apiService";

export const createCategory = async (data) => {
  // console.log("create cat",data);
  const response = await api.post("/categories/create",data);
  // console.log("categories",response.data);
  return response.data;
};

export const fetchAllCategories = async () => {
  const response = await api.get("/categories/");
  // console.log("categories",response.data);
  return response.data;
};

export const updateCategory = async (categoryId,data) => {
  // console.log("create cat",data);
  const response = await api.put(`/categories/update-category/${categoryId}`,data);
  // console.log("categories",response.data);
  return response.data;
};

export const deleteCategory = async (id) => {
  // console.log("create cat",data);
  const response = await api.delete(`/categories/${id}`);
  // console.log("categories",response.data);
  return response.data;
};

