import { createSlice } from "@reduxjs/toolkit";
import { ERROR_FETCHING_ALL_CATEGORIES, ERROR_FETCHING_CREATE_CATEGORY, ERROR_FETCHING_UPDATE_CATEGORY } from "../constants/categoryConstant";
import { createCategoryAction, deleteCategoryAction, getAllCategories, updateCategoryAction } from "../actions/categoryAction";
import { deleteBrandAction } from "../actions/brandAction";


export const createCategorySlice = createSlice({
    name: "createCategory",
    initialState: { category: {}, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCategoryAction.pending, (state) => { state.loading = true; })
            .addCase(createCategoryAction.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(createCategoryAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || ERROR_FETCHING_CREATE_CATEGORY;
            })

            // update category
            .addCase(updateCategoryAction.pending, (state) => { state.loading = true; })
            .addCase(updateCategoryAction.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(updateCategoryAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || ERROR_FETCHING_UPDATE_CATEGORY;
            })
    },
})


export const getAllCategoriesSlice = createSlice({
    name: "getAllCategories",
    initialState: { categories: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => { state.loading = true; })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || ERROR_FETCHING_ALL_CATEGORIES;
            })

            // Delete Brand
            .addCase(deleteCategoryAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategoryAction.fulfilled, (state, action) => {
                state.loading = false;
                // Remove deleted brand from state
                state.categories = state.categories.filter((brand) => brand.categoryId !== action.payload);
            })
            .addCase(deleteCategoryAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})




export const categoryReducers = {
    getCategories: getAllCategoriesSlice.reducer,
    createCategory: createCategorySlice.reducer,
};