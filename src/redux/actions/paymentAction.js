import { createAsyncThunk } from "@reduxjs/toolkit";
import { CHECK_STATUS, GET_ALL_PAYMENTS, SUBMIT_PROOF, UPDATE_PAYMENT_STATUS, UPDATE_VERIFY_STATUS } from "../constants/paymentContant";
import { allPayments, checkStatus, submitProof, updatePaymentStatus, updateVerifyStatus } from "../../api/paymentApi";
import { handleApiError } from "../../utils/handleApiError";



export const getAllPaymentsAction = createAsyncThunk(GET_ALL_PAYMENTS, async (_, { rejectWithValue }) => {
    try {
        return await allPayments();
    } catch (error) {
        return rejectWithValue(handleApiError(error));
    }
});


export const updateVerifyStatusAction = createAsyncThunk(UPDATE_VERIFY_STATUS, async ({orderId,status}, { rejectWithValue }) => {
    try {
        return await updateVerifyStatus(orderId,status);
    } catch (error) {
        return rejectWithValue(handleApiError(error));
    }
});


export const updatePaymentStatusAction = createAsyncThunk(UPDATE_PAYMENT_STATUS, async ({orderId,status}, { rejectWithValue }) => {
    try {
        return await updatePaymentStatus(orderId,status);
    } catch (error) {
        return rejectWithValue(handleApiError(error));
    }
});



export const checkStatusAction = createAsyncThunk(CHECK_STATUS, async (orderId, { rejectWithValue }) => {
    try {
        return await checkStatus(orderId);
    } catch (error) {
        return rejectWithValue(handleApiError(error));
    }
});


export const submitProofAction = createAsyncThunk(SUBMIT_PROOF, async (data, { rejectWithValue }) => {
    try {
        return await submitProof(data);
    } catch (error) {
        return rejectWithValue(handleApiError(error));
    }
});