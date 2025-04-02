import { createAsyncThunk } from "@reduxjs/toolkit";
import { ALL_MESSAGE, CONTACT_US } from "../constants/contactusConstant";
import { allMesssages, contactUs, deleteMessage } from "../../api/contactusApi";
import { handleApiError } from "../../utils/handleApiError";



export const contactusAction = createAsyncThunk(
    CONTACT_US,
    async (data, { rejectWithValue }) => {
        try {
            const response = await contactUs(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);



export const allMessageAction = createAsyncThunk(
    ALL_MESSAGE,
    async (_, { rejectWithValue }) => {
        try {
            const response = await allMesssages();
            // console.log(response)
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);


export const deleteMessageAction = createAsyncThunk(
    CONTACT_US,
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteMessage(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);