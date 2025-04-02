import api from "./apiService";



export const createReview = async (data, productId) => {
    const response = await api.post(`/reviews/create/product/${productId}`, data);
    // console.log("categories",response.data);
    return response.data;
};

export const createAdminReview = async (data, productId) => {
    const response = await api.post(`/reviews/admin/create-admin-review/${productId}`, data);
    // console.log("categories",response);
    return response.data;
};

export const uploadAdminReviewImage = async (formData) => {
    const response = await api.post(`/reviews/admin/upload`, formData);
    // console.log("categories",response);
    return response.data;
};




export const getAllReviews = async (data, productId) => {
    const response = await api.get(`/reviews/`);
    // console.log("reviews",response.data);
    return response.data;
};