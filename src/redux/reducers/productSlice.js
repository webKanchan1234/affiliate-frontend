// src/redux/product/reducers/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { ERROR_FETCHING_ALL_PRODUCTS, ERROR_FETCHING_ALL_PRODUCTS_BY_BRAND, ERROR_FETCHING_ALL_PRODUCTS_BY_CATEGORY, ERROR_FETCHING_ALL_PRODUCTS_BY_SUBCATEGORY, ERROR_FETCHING_CREATE_PRODUCT, ERROR_FETCHING_PRODUCT_DETAILS, ERROR_FETCHING_SEARCH_PRODUCTS, ERROR_FETCHING_UPDATE_PRODUCT } from "../constants/productConstant";
import { createProductAction, deleteProductAction, getProducts, productDetailsAction, productsByBrandAction, productsByCategoryAction, productsBySubcategoryAction, searchProductsAction, updateProductAction } from "../actions/productAction";

// Slice for fetching all products
const createProductSlice = createSlice({
  name: "createProduct",
  initialState: { product: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProductAction.pending, (state) => { state.loading = true; })
      .addCase(createProductAction.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(createProductAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ERROR_FETCHING_CREATE_PRODUCT;
      })

      //update product
      .addCase(updateProductAction.pending, (state) => { state.loading = true; })
      .addCase(updateProductAction.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(updateProductAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ERROR_FETCHING_UPDATE_PRODUCT;
      })
  },
});



const getProductsSlice = createSlice({
  name: "getProducts",
  initialState: { products: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => { state.loading = true; })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ERROR_FETCHING_ALL_PRODUCTS;
      })

      
      // Delete product
      .addCase(deleteProductAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductAction.fulfilled, (state, action) => {
        state.loading = false;
        // Remove deleted brand from state
        state.products = state.products.content.filter((prod) => prod.productId !== action.payload);
      })
      .addCase(deleteProductAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Slice for fetching product by urlName
const productDetailsReducer = createSlice({
  name: "getProductByUrlName",
  initialState: { product: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productDetailsAction.pending, (state) => { state.loading = true; })
      .addCase(productDetailsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(productDetailsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ERROR_FETCHING_PRODUCT_DETAILS;
      });
  },
});

// Slice for fetching product by urlName
const productsByCategoryReducer = createSlice({
  name: "productsByCategoryReducer",
  initialState: { products: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsByCategoryAction.pending, (state) => { state.loading = true; })
      .addCase(productsByCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(productsByCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ERROR_FETCHING_ALL_PRODUCTS_BY_CATEGORY;
      })

      // search products
      .addCase(searchProductsAction.pending, (state) => { state.loading = true; })
      .addCase(searchProductsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProductsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ERROR_FETCHING_SEARCH_PRODUCTS;
      })

  },
});



const productsByBrandReducer = createSlice({
  name: "productsByBrandReducer",
  initialState: { products: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsByBrandAction.pending, (state) => { state.loading = true; })
      .addCase(productsByBrandAction.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(productsByBrandAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ERROR_FETCHING_ALL_PRODUCTS_BY_BRAND;
      });
  },
});



const productsBySubcategoryReducer = createSlice({
  name: "productsBySubcategoryReducer",
  initialState: { products: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsBySubcategoryAction.pending, (state) => { state.loading = true; })
      .addCase(productsBySubcategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(productsBySubcategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ERROR_FETCHING_ALL_PRODUCTS_BY_SUBCATEGORY;
      });
  },
});

// // Slice for creating a product
// const createProductSlice = createSlice({
//   name: "createProduct",
//   initialState: { loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createProduct.pending, (state) => { state.loading = true; })
//       .addCase(createProduct.fulfilled, (state) => { state.loading = false; })
//       .addCase(createProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || ERROR_CREATING_PRODUCT;
//       });
//   },
// });

// // Slice for updating a product
// const updateProductSlice = createSlice({
//   name: "updateProduct",
//   initialState: { loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(editProduct.pending, (state) => { state.loading = true; })
//       .addCase(editProduct.fulfilled, (state) => { state.loading = false; })
//       .addCase(editProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || ERROR_UPDATING_PRODUCT;
//       });
//   },
// });

// // Slice for deleting a product
// const deleteProductSlice = createSlice({
//   name: "deleteProduct",
//   initialState: { loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(removeProduct.pending, (state) => { state.loading = true; })
//       .addCase(removeProduct.fulfilled, (state) => { state.loading = false; })
//       .addCase(removeProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || ERROR_DELETING_PRODUCT;
//       });
//   },
// });

export const productReducers = {
  product: createProductSlice.reducer,
  getProducts: getProductsSlice.reducer,
  productDetails: productDetailsReducer.reducer,
  productsByCategory: productsByCategoryReducer.reducer,
  productsByBrand: productsByBrandReducer.reducer,
  productsBySubcategory: productsBySubcategoryReducer.reducer,
  // getProductById: getProductByIdSlice.reducer,
  // createProduct: createProductSlice.reducer,
  // updateProduct: updateProductSlice.reducer,
  // deleteProduct: deleteProductSlice.reducer,
};
