import api from "./apiService";

export const allPayments = async () => {
  const response = await api.get(`/affiliate/`);
  // console.log("payments",response.data);
  return response.data;
};


export const updateVerifyStatus = async (orderId,status) => {
  const response = await api.put(`/affiliate/verify/${orderId}?status=${status}`);
  // console.log("payments",response.data);
  return response.data;
};

export const updatePaymentStatus = async (orderId,status) => {
  const response = await api.put(`/affiliate/update-payment/${orderId}?paymentStatus=${status}`);
  // console.log("payments",response.data);
  return response.data;
};


export const checkStatus = async (orderId) => {
  const response = await api.get(`/affiliate/status/${orderId}`);
  // console.log("payments",response.data);
  return response.data;
};


export const submitProof = async (data) => {
  const response = await api.post(`/affiliate/submit`,data);
  console.log("payments",response.data);
  return response.data;
};