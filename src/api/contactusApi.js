import api from "./apiService";

export const contactUs = async (data) => {
    const response = await api.post(`/contactus/post`, data);
    // console.log("categories",response.data);
    return response.data;
};


export const allMesssages = async () => {
    const response = await api.get(`/contactus/messages`);
    // console.log("categories",response.data);
    return response.data;
};

export const deleteMessage = async (id) => {
    const response = await api.delete(`/contactus/${id}`);
    // console.log("categories",response.data);
    return response.data;
};