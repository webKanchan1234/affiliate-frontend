// src/redux/product/actions/productActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, fetchAllProducts,fetchpProductByCategory,fetchProductsByBrand,fetchProductsBySubcategory,productDetails, searchProducts, updateProduct } from "../../api/productApi";
import { GET_ALL_PRODUCTS, ERROR_FETCHING_ALL_PRODUCTS, PRODUCT_DETAILS, ALL_PRODUCTS_BY_CATEGORY, ERROR_FETCHING_ALL_PRODUCTS_BY_CATEGORY, DELETE_PRODUCT, ERROR_FETCHING_DELETE_PRODUCT, CREATE_PRODUCT, ERROR_FETCHING_CREATE_PRODUCT, UPDATE_PRODUCT, ERROR_FETCHING_UPDATE_PRODUCT, ALL_PRODUCTS_BY_BRAND, ALL_PRODUCTS_BY_SUBCATEGORY, SEARCH_PRODUCTS } from "../constants/productConstant"; 
import { handleApiError } from "../../utils/handleApiError";




// Async Thunks for CRUD operations
export const createProductAction = createAsyncThunk(CREATE_PRODUCT, async ({data,categoryId,brandId}, { rejectWithValue }) => {
  try {
    // console.log("data",data)
    return await createProduct(data,categoryId,brandId);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});


export const updateProductAction = createAsyncThunk(UPDATE_PRODUCT, async ({productId,categoryId,brandId,data}, { rejectWithValue }) => {
  try {
    // console.log("data",data)
    const res=await updateProduct(productId,categoryId,brandId,data);
    console.log("res",res)
    return res.data
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});


export const getProducts = createAsyncThunk(GET_ALL_PRODUCTS, async (_, { rejectWithValue }) => {
  try {
    return await fetchAllProducts();
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});


export const productDetailsAction = createAsyncThunk(PRODUCT_DETAILS, async (urlName, { rejectWithValue }) => {
  try {
    return await productDetails(urlName);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});


export const productsByCategoryAction = createAsyncThunk(ALL_PRODUCTS_BY_CATEGORY, async (category, { rejectWithValue }) => {
  try {
    return await fetchpProductByCategory(category);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});



export const productsByBrandAction = createAsyncThunk(ALL_PRODUCTS_BY_BRAND, async (brand, { rejectWithValue }) => {
  try {
    return await fetchProductsByBrand(brand);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});


export const productsBySubcategoryAction = createAsyncThunk(ALL_PRODUCTS_BY_SUBCATEGORY, async (subcategory, { rejectWithValue }) => {
  try {
    return await fetchProductsBySubcategory(subcategory);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});


// delete product
export const deleteProductAction = createAsyncThunk(DELETE_PRODUCT, async (id, { rejectWithValue }) => {
  try {
    await deleteProduct(id);
    return id;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});



// search product
export const searchProductsAction = createAsyncThunk(SEARCH_PRODUCTS, async (keyword, { rejectWithValue }) => {
  try {
    const res=await searchProducts(keyword);
    // console.log(res) 
    return res;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
