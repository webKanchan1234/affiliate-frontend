import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productAction';
import { getAllCategories } from '../../redux/actions/categoryAction';
import { getAllBrandsAction } from '../../redux/actions/brandAction';
import { Helmet } from 'react-helmet-async';
import TopCategory from '../../components/category/TopCategory';
import CategoryRowType from '../../components/category/CategoryRowType';
import Loader from '../../components/common/Loader';
import Card from '../../components/common/Card';
import { Link } from 'react-router-dom';
import RewardBanner from '../../components/reward/RewardBanner';

const Home = ({ isServerDown }) => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.products);
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categories);
  const { brands, loading: brandsLoading, error: brandsError } = useSelector((state) => state.allBrands);

  const [latest, setLatest] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [five5g, setFive5g] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobilesBrands, setMobilesBrands] = useState([]);
  const [laptopsBrands, setLaptopsBrands] = useState([]);
  const productsPerPage = 8;

  useEffect(() => {
    if (!isServerDown) {
      dispatch(getProducts());
      dispatch(getAllCategories());
      dispatch(getAllBrandsAction());
    }
  }, [isServerDown, dispatch]);

  useEffect(() => {
    if (products?.content) {
      setLatest(products.content.filter((p) => p.subcategory === 'latest-mobiles'));
      setUpcoming(products.content.filter((p) => p.subcategory === 'upcoming-mobiles'));
      setFive5g(products.content.filter((p) => p.subcategory === '5g-mobiles'));
    }
    setMobilesBrands(categories.filter((brand) => brand.title.toLowerCase() === 'mobiles'));
    setLaptopsBrands(categories.filter((brand) => brand.title.toLowerCase() === 'laptops'));
  }, [products, categories]);

  const isLoading = productsLoading || categoriesLoading || brandsLoading;
  const isError = productsError || categoriesError || brandsError;
  const BASE_URL = import.meta.env.VITE_BASE_URL

  const paginatedProducts = products?.content?.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );


  const totalPages = Math.ceil((products?.content?.length || 0) / productsPerPage);


  return (
    <>
      <Helmet>
        <title>Best Products & Deals - Your Website</title>
        <meta name="description" content="Find the latest and upcoming products, mobiles, laptops, and brands with the best deals." />
        <meta name="keywords" content="latest mobiles, upcoming mobiles, best laptops, top brands" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph for social media */}
        <meta property="og:title" content="Best Products & Deals" />
        <meta property="og:description" content="Explore the best products from top brands at unbeatable prices." />
        <meta property="og:image" content={`${BASE_URL}/assets/og-image.jpg`} />
        <meta property="og:url" content="https://yourwebsite.com" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Products & Deals" />
        <meta name="twitter:description" content="Find top products and brands at the best prices." />
        <meta name="twitter:image" content={`${BASE_URL}/assets/twitter-image.jpg`} />
      </Helmet>

      <Loader loading={isLoading} />

      {isServerDown ? (
        <div className="text-center text-red-600 font-bold text-lg mt-5">
          🚨 Server is down! Please try again later. 🚨
        </div>
      ) : isError ? (
        <div className="text-center text-red-600 font-bold text-lg mt-5">
          🚨 {productsError || categoriesError || brandsError || 'Something went wrong. Please try again!'} 🚨
          <button
            onClick={() => {
              dispatch(getProducts());
              dispatch(getAllCategories());
              dispatch(getAllBrandsAction());
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* <div className="w-full md:w-4/6 mx-auto px-4"> */}
          {/* <div className="w-full md:w-4/6 mx-auto px-4 py-1 mt-2 bg-white text-center">
            <h2 className="text-lg font-semibold text-indigo-600">Exclusive Offer for You! 🎉</h2>
            <p className="text-gray-600 mt-0">
              Buy from <span className="font-bold text-black">Amazon</span>, <span className="font-bold text-black">Flipkart</span>, or other links here and earn <span className="text-green-600 font-bold">3-4% cashback</span> as a reward! 🚀
            </p>

            <Link
              to="/submit/proof"
              className="mt-1 inline-block px-6 py-1 text-white font-bold text-lg rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 shadow-lg transform hover:scale-105 transition-all animate-blink"
            >
              🎁 Claim Your Reward Now! 🎁
            </Link>
          </div> */}
          {/* <RewardBanner page="home" /> */}
          {/* <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all hover:scale-105 z-50">
            <span className="text-lg animate-blink">🎁 Earn 3-4% Cashback!</span>
            <Link
              to="/submit/proof"
              className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Claim Now →
            </Link>
          </div> */}
          <TopCategory title="Top Categories" category="category" categories={categories} BASE_URL={BASE_URL} />
          <TopCategory title="Top Brands" category="brand" categories={brands} BASE_URL={BASE_URL} />
          <TopCategory title="Top Mobiles Brands" category="brand" categories={mobilesBrands[0]?.brands} BASE_URL={BASE_URL} />
          <TopCategory title="Top Laptops Brands" category="brand" categories={laptopsBrands[0]?.brands} BASE_URL={BASE_URL} />
          {/* </div> */}

          {[latest, upcoming, five5g].map((productsList, index) => (
            productsList.length > 0 && (
              <div className='w-full md:w-4/6 mx-auto' key={index}>
                <CategoryRowType
                  title={productsList[0]?.subcategory.replace('-', ' ')}
                  category={productsList[0]?.category?.title?.toLowerCase()}
                  products={productsList}
                  BASE_URL={BASE_URL}
                  fullWidth
                />
              </div>
            )
          ))}

          <div className="w-full md:w-4/6 mx-auto px-4 py-4 bg-white">
            <h2 className="text-lg font-semibold">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {paginatedProducts?.map((product) => (
                <Card
                  key={product.productId}
                  image={`${BASE_URL + product?.imageUrls[0]}`}
                  title={product.name}
                  price={product.price}
                  url={`/${product.urlName}`}
                />
              ))}
            </div>

            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer'}`}
              >
                Previous
              </button>

              <span className="text-gray-700">Page {currentPage} of {totalPages}</span>

              <button
                onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                disabled={currentPage >= totalPages}
                className={`px-4 py-2 border rounded-lg ${currentPage >= totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer'}`}
              >
                Next
              </button>
            </div>

          </div>
        </>
      )}
    </>
  );
};

export default Home;
