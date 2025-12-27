import React, { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/NavBar";
import Header from "./components/layout/Header";
import MoveToTop from "./components/movetotop/MoveToTop";
import Footer from "./components/footer/Footer";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ServerStatus from "./components/common/ServerStatus";
import axios from "axios";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/home/Home"));
const Category = lazy(() => import("./components/category/Category"));
const Brand = lazy(() => import("./components/brand/Brand"));
const ProductDetails = lazy(() => import("./components/products/ProductDetails"));
const SubCategory = lazy(() => import("./components/category/SubCategory"));
const WriteReview = lazy(() => import("./components/review/WriteReview"));
const Search = lazy(() => import("./components/common/Search"));
const DynamicPage = lazy(() => import("./pages/dynamicPage/DynamicPage"));
const SubmitProof = lazy(() => import("./components/payment/SubmitProof"));
const ProductReview = lazy(() => import("./components/review/ProductReview"));
const AuthPage = lazy(() => import("./components/loginSignUp/AuthPage"));
const Register = lazy(() => import("./components/loginSignUp/Register"));
const Profile = lazy(() => import("./components/user/Profile"));
const NotFound = lazy(() => import("./components/notFound/NotFound"));

// Admin
const AdminLayout = lazy(() => import("./components/admin/adminheader/AdminLayout"));
const Dashboard = lazy(() => import("./components/admin/dashboard/Dashboard"));
const Products = lazy(() => import("./components/admin/product/Products"));
const AddProduct = lazy(() => import("./components/admin/product/AddProduct"));
const UpdateProduct = lazy(() => import("./components/admin/product/UpdateProduct"));
const Categories = lazy(() => import("./components/admin/category/Categories"));
const AddCategory = lazy(() => import("./components/admin/category/AddCategory"));
const Brands = lazy(() => import("./components/admin/brand/Brands"));
const AddBrand = lazy(() => import("./components/admin/brand/AddBrand"));
const Payments = lazy(() => import("./components/admin/payment/Payments"));
const Messages = lazy(() => import("./components/admin/message/Messages"));
const Reviews = lazy(() => import("./components/admin/review/Reviews"));
const AdminReviewCreate = lazy(() => import("./components/admin/review/AdminReviewCreate"));
const Users = lazy(() => import("./components/admin/user/Users"));

// Route guards
const PublicRoute = lazy(() => import("./routes/PublicRoute"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));
const UserRoute = lazy(() => import("./routes/UserRoute"));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <AppContent />
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [serverDown, setServerDown] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let intervalId;

    const checkServer = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/health`);
        if (isMounted && res.status === 200) {
          setServerDown(false);
        }
      } catch (err) {
        if (isMounted) setServerDown(true);
      }
    };

    checkServer();
    intervalId = setInterval(checkServer, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <HelmetProvider>
      <ToastContainer position="top-right" autoClose={5000} />

      <ServerStatus />

      {!isAdminRoute && (
        <>
          <Navbar isServerDown={serverDown} />
          <Header />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home isServerDown={serverDown} />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/brand/:brandName" element={<Brand />} />
        <Route path="/:category/:subcategory" element={<SubCategory />} />
        <Route path="/:details" element={<ProductDetails />} />
        <Route path="/:productName-write-review.html" element={<WriteReview />} />
        <Route path="/search" element={<Search />} />
        <Route path="/page/:pageName" element={<DynamicPage />} />
        <Route path="/review/:url" element={<ProductReview />} />
        <Route path="/submit/proof" element={<SubmitProof />} />

        <Route element={<PublicRoute />}>
          <Route path="/admin-login/login" element={<AuthPage />} />
          <Route path="/admin/register" element={<Register />} />
        </Route>

        <Route element={<UserRoute />}>
          <Route path="/user/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute adminOnly />}>
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
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <MoveToTop />
      {!isAdminRoute && <Footer />}
    </HelmetProvider>
  );
}

export default App;
