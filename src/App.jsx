import React, { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/layout/NavBar";
import Header from "./components/layout/Header";
import MoveToTop from "./components/movetotop/MoveToTop";
import Footer from "./components/footer/Footer";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ServerStatus from "./components/common/ServerStatus";
import axios from "axios";
import AuthPage from "./components/loginSignUp/AuthPage";

// Lazy-loaded components
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
const Login = lazy(() => import("./components/loginSignUp/Login"));
const Register = lazy(() => import("./components/loginSignUp/Register"));
const Profile = lazy(() => import("./components/user/Profile"));
const NotFound = lazy(() => import("./components/notFound/NotFound"));

// Admin components
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

// Routes
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
    const controller = new AbortController();

    const checkServer = async () => {
      try {
        const { signal } = controller;
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/health`, { signal });

        if (isMounted && serverDown) {
          console.log("Backend is back online!");
          setServerDown(false);
        }
      } catch (error) {
        if (isMounted && !axios.isCancel(error)) {
          setServerDown(true);
        }
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 30000); // Check every 30 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
      controller.abort();
    };
  }, [serverDown]);

  return (
    <HelmetProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ServerStatus />

      {!isAdminRoute && (
        <>
          <Navbar isServerDown={serverDown} />
          <Header />
        </>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home isServerDown={serverDown} />
          </Suspense>
        } />

        <Route path="/category/:categoryName" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Category />
          </Suspense>
        } />

        <Route path="/brand/:brandName" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Brand />
          </Suspense>
        } />

        <Route path="/:category/:subcategory" element={
          <Suspense fallback={<div>Loading...</div>}>
            <SubCategory />
          </Suspense>
        } />

        <Route path="/:details" element={
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetails />
          </Suspense>
        } />

        <Route path="/:productName-write-review.html" element={
          <Suspense fallback={<div>Loading...</div>}>
            <WriteReview />
          </Suspense>
        } />

        <Route path="/search" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Search />
          </Suspense>
        } />

        <Route path="/page/:pageName" element={
          <Suspense fallback={<div>Loading...</div>}>
            <DynamicPage />
          </Suspense>
        } />

        <Route path="/review/:url" element={
          <Suspense fallback={<div>Loading...</div>}>
            <ProductReview />
          </Suspense>
        } />

        <Route path="/submit/proof" element={
          <Suspense fallback={<div>Loading...</div>}>
            <SubmitProof />
          </Suspense>
        } />

        {/* Public Auth Routes */}
        <Route element={
          <Suspense fallback={<div>Loading...</div>}>
            <PublicRoute />
          </Suspense>
        }>
          <Route path="/admin-login/login" element={
            <Suspense fallback={<div>Loading...</div>}>
              <AuthPage />
            </Suspense>
          } />
          <Route path="/admin/register" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Register />
            </Suspense>
          } />
        </Route>

        {/* User Routes */}
        <Route element={
          <Suspense fallback={<div>Loading...</div>}>
            <UserRoute />
          </Suspense>
        }>
          <Route path="/user/profile" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          } />
        </Route>

        {/* Admin Routes */}
        <Route element={
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute adminOnly={true} />
          </Suspense>
        }>
          <Route element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminLayout />
            </Suspense>
          }>
            <Route path="/admin/dashboard" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="/admin/products" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Products />
              </Suspense>
            } />
            <Route path="/admin/add-product" element={
              <Suspense fallback={<div>Loading...</div>}>
                <AddProduct />
              </Suspense>
            } />
            <Route path="/admin/update-product" element={
              <Suspense fallback={<div>Loading...</div>}>
                <UpdateProduct />
              </Suspense>
            } />
            <Route path="/admin/categories" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Categories />
              </Suspense>
            } />
            <Route path="/admin/add-category" element={
              <Suspense fallback={<div>Loading...</div>}>
                <AddCategory />
              </Suspense>
            } />
            <Route path="/admin/brands" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Brands />
              </Suspense>
            } />
            <Route path="/admin/add-brand" element={
              <Suspense fallback={<div>Loading...</div>}>
                <AddBrand />
              </Suspense>
            } />
            <Route path="/admin/payments" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Payments />
              </Suspense>
            } />
            <Route path="/admin/messages" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Messages />
              </Suspense>
            } />
            <Route path="/admin/reviews" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Reviews />
              </Suspense>
            } />
            <Route path="/admin/create-review/:productId" element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminReviewCreate />
              </Suspense>
            } />
            <Route path="/admin/users" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Users />
              </Suspense>
            } />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        } />
      </Routes>

      <MoveToTop />
      {!isAdminRoute && <Footer />}
    </HelmetProvider>
  );
}

export default App;