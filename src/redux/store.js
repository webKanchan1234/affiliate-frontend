import { configureStore } from "@reduxjs/toolkit";
import { productReducers } from "./reducers/productSlice";
import { categoryReducers } from "./reducers/categorySlice";
import { brandReducers } from "./reducers/brandSlice";
import { userReducers } from "./reducers/userSlice";
import { reviewReducers } from "./reducers/reviewSlice";
import { paymentsReducers } from "./reducers/paymentSlice";
import { contactusReducers } from "./reducers/contactusSlice";


const store = configureStore({
  reducer: {
    product: productReducers.product,
    products: productReducers.getProducts,
    productDetails:productReducers.productDetails,
    productsByCategory: productReducers.productsByCategory,
    productsByBrand: productReducers.productsByBrand,
    productsBySubcategory: productReducers.productsBySubcategory,
    categories:categoryReducers.getCategories,
    category:categoryReducers.createCategory,
    brand:brandReducers.createBrand,
    updateBrand:brandReducers.updateBrand,
    allBrands:brandReducers.allBrands,
    allPayments:paymentsReducers.allPayments,
    payment:paymentsReducers.payment,
    allMessages:contactusReducers.allMessages,
    message:contactusReducers.message,
    loginUser:userReducers.loginUser,
    registerUser:userReducers.registerUser,
    userProfile:userReducers.userProfile,
    loadUser:userReducers.loadUser,
    allUsers:userReducers.allUsers,
    logoutUser:userReducers.logoutUser,
    review:reviewReducers.createReview,
    reviews:reviewReducers.allReviews
  },
});

export default store;
