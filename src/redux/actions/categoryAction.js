import { createAsyncThunk } from "@reduxjs/toolkit";
import {GET_ALL_CATEGORIES,ERROR_FETCHING_ALL_CATEGORIES, CREATE_CATEGORY, ERROR_FETCHING_CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY, ERROR_FETCHING_UPDATE_CATEGORY} from "../constants/categoryConstant";
import { createCategory, deleteCategory, fetchAllCategories, updateCategory } from "../../api/categoryApi";
import { handleApiError } from "../../utils/handleApiError";



export const createCategoryAction=createAsyncThunk(CREATE_CATEGORY, async (data, { rejectWithValue }) => {
  try {
    return await createCategory(data);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const getAllCategories=createAsyncThunk(GET_ALL_CATEGORIES, async (_, { rejectWithValue }) => {
  try {
    return await fetchAllCategories();
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});


export const updateCategoryAction=createAsyncThunk(UPDATE_CATEGORY, async ({categoryId,data}, { rejectWithValue }) => {
  try {
    return await updateCategory(categoryId,data);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});


export const deleteCategoryAction=createAsyncThunk(DELETE_CATEGORY, async (id, { rejectWithValue }) => {
  try {
    
    return await deleteCategory(id);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});