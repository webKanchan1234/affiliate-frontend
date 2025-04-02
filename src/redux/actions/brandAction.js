import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBrand, deleteBrand, fetchAllBrands, updateBrand } from "../../api/brandApi";
import { CREATE_BRAND, DELETE_BRAND, ERROR_FETCHING_ALL_BRANDS, ERROR_FETCHING_CREATE_BRAND, ERROR_FETCHING_DELETE_BRAND, ERROR_FETCHING_UPDATE_BRAND, GET_ALL_BRANDS, UPDATE_BRAND } from "../constants/brandConstant";
import { handleApiError } from "../../utils/handleApiError";

export const createBrandAction = createAsyncThunk(
  CREATE_BRAND,
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await createBrand(data, id);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateBrandAction = createAsyncThunk(
  UPDATE_BRAND,
  async ({ brandId,categoryId,data }, { rejectWithValue }) => {
    try {
      // console.log(id)
      return await updateBrand(brandId,categoryId,data);
      
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);


export const deleteBrandAction = createAsyncThunk(
  DELETE_BRAND,
  async (id, { rejectWithValue }) => {
    try {
      // console.log(id)
      await deleteBrand(id);
      return id
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);


export const getAllBrandsAction = createAsyncThunk(GET_ALL_BRANDS, async (_, { rejectWithValue }) => {
  try {
    return await fetchAllBrands();
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});