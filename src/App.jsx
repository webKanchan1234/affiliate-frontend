import React, { useEffect, useState } from "react";
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/layout/NavBar";
import Header from "./components/layout/Header";
import MoveToTop from "./components/movetotop/MoveToTop";
import Home from "./pages/home/Home";
import Category from "./components/category/Category";
import ProductDetails from "./components/products/ProductDetails";
// import Review from "./components/review/Review";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Products from "./components/admin/product/Products";
import Brands from "./components/admin/brand/Brands";
import Payments from "./components/admin/payment/Payments";
import Categories from "./components/admin/category/Categories";
import AddProduct from "./components/admin/product/AddProduct";
import AddCategory from "./components/admin/category/AddCategory";
import AddBrand from "./components/admin/brand/AddBrand";
import Users from "./components/admin/user/Users";
import Login from "./components/loginSignUp/Login";
import Register from "./components/loginSignUp/Register";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./components/admin/adminheader/AdminLayout";
import Profile from "./components/user/Profile";
import UserRoute from "./routes/UserRoute";
import UpdateBrand from "./components/admin/brand/UpdateBrand";
import UpdateProduct from "./components/admin/product/UpdateProduct";
import SubCategory from "./components/category/SubCategory";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ServerStatus from "./components/common/ServerStatus";
import axios from "axios";
import Brand from "./components/brand/Brand";
import Reviews from "./components/admin/review/Reviews";
import AdminReviewCreate from "./components/admin/review/AdminReviewCreate";
import ProductReview from "./components/review/ProductReview";
import WriteReview from "./components/review/WriteReview";
import Footer from "./components/footer/Footer";
import Search from "./components/common/Search";
import DynamicPage from "./pages/dynamicPage/DynamicPage";
import SubmitProof from "./components/payment/SubmitProof";
import Messages from "./components/admin/message/Messages";


function App() {
  return (
    <ErrorBoundary>

      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [serverDown, setServerDown] = useState(false);

  useEffect(() => {
    let prevStatus = serverDown; // Store previous state
  
    const checkServer = async () => {
      try {
        const data=await axios.get("http://localhost:8080/health");
        console.log("servver",data)
        if (serverDown) {
          console.log("Backend is back online! Fetching data...");
          fetchData(); // Fetch data only when coming online
        }
        setServerDown(false);
      } catch (error) {
        setServerDown(true);
      }
    };
  
    const fetchData = async () => {
      try {
        // Example: Fetch products/categories when server is online
        // const response = await axios.get("http://localhost:8080/products");
        // console.log("Updated Products:", response.data);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };
  
    checkServer();
    const interval = setInterval(checkServer, 5000);
  
    return () => clearInterval(interval);
  }, [serverDown]); // Dependency to detect state change
  

  // console.log(serverDown)
  

  return (
    <>

      <HelmetProvider>
        <ToastContainer />
        <ServerStatus />
        {/* {!isAdminRoute && <Navbar />} */}
        {!isAdminRoute && <Navbar isServerDown={serverDown} />}
      {!isAdminRoute  && <Header />}


        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home isServerDown={serverDown} />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/brand/:brandName" element={<Brand />} />
          <Route path="/:category/:subcategory" element={<SubCategory />} />
          
          <Route path="/:details" element={<ProductDetails />} />
          <Route path="/:productName-write-review.html" element={<WriteReview />} />
          <Route path="/search" element={<Search />} />
          <Route path="/page/:pageName" element={<DynamicPage />} />
          {/* <Route path="/product/:details" element={<ProductDetails />} /> */}
          <Route path="/review/:url" element={<ProductReview />} />
          <Route path="/submit/proof" element={<SubmitProof />} />
          {/* <Route exact path="/:productName-write-review" element={<WriteReview />} /> */}

          {/* Public Auth Routes (Prevent Access if Logged In) */}
          <Route element={<PublicRoute />}>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/register" element={<Register />} />
          </Route>

          {/* Protected Route for Logged-in Users */}
          <Route element={<UserRoute />}>
            <Route path="/user/profile" element={<Profile />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/update-product" element={<UpdateProduct />} />
              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/add-category" element={<AddCategory />} />
              <Route path="/admin/brands" element={<Brands />} />
              <Route path="/admin/add-brand" element={<AddBrand />} />
              <Route path="/admin/payments" element={<Payments />} />
              <Route path="/admin/messages" element={<Messages />} />
              <Route path="/admin/reviews" element={<Reviews />} />
              <Route path="/admin/create-review/:productId" element={<AdminReviewCreate />} />
              {/* <Route path="/admin/update-brand" element={<UpdateBrand />} /> */}
              <Route path="/admin/users" element={<Users />} />
            </Route>
          </Route>
          {/* Redirect all unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <MoveToTop />
        <Footer/>
      </HelmetProvider>

    </>
  );
}
