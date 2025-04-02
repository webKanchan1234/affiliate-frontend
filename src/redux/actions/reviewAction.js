import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAdminReview, createReview, getAllReviews, uploadAdminReviewImage } from "../../api/reviewApi";
import { CREATE_ADMIN_REVIEW, CREATE_REVIEW, GET_ALL_REVIEWS, UPLOAD_ADMIN_REVIEW_IMG } from "../constants/reviewConstant";
import { handleApiError } from "../../utils/handleApiError";



export const createReviewAction = createAsyncThunk(
    CREATE_REVIEW,
    async ({ data, productId }, { rejectWithValue }) => {
        try {
            const response = await createReview(data, productId);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);


export const createAdminReviewAction = createAsyncThunk(
    CREATE_ADMIN_REVIEW,
    async ({ data, productId }, { rejectWithValue }) => {
        try {
            const response = await createAdminReview(data, productId);
            console.log(response)
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);


export const uploadAdminReviewImageAction = createAsyncThunk(
    UPLOAD_ADMIN_REVIEW_IMG,
    async (formData, { rejectWithValue }) => {
        try {
            const response = await uploadAdminReviewImage(formData);
            console.log(response)
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);


export const getAllReviewsAction = createAsyncThunk(
    GET_ALL_REVIEWS,
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllReviews();
            // console.log(response)
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);




