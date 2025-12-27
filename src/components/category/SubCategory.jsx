import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import Filter from '../common/Filter';
import Card from '../common/Card';
import useProductFilters from '../../hooks/useProductFilters';
import { productsBySubcategoryAction } from '../../redux/actions/productAction';
import { getAllBrandsAction } from '../../redux/actions/brandAction';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

// Constants for filter options
const PRICE_RANGES = [
  { value: '0-10000', label: 'Under ₹10,000' },
  { value: '10000-20000', label: '₹10,000 - ₹20,000' },
  { value: '20000-30000', label: '₹20,000 - ₹30,000' },
  { value: '30000-50000', label: '₹30,000 - ₹50,000' },
  { value: '50000-100000', label: 'Over ₹50,000' },
];

const RAM_OPTIONS = [
  { value: '2gb', label: '2 GB' },
  { value: '4gb', label: '4 GB' },
  { value: '6gb', label: '6 GB' },
  { value: '8gb', label: '8 GB' },
  { value: '12gb', label: '12 GB' },
  { value: '16gb', label: '16 GB' },
];

const MEMORY_OPTIONS = [
  { value: '32gb', label: '32 GB' },
  { value: '64gb', label: '64 GB' },
  { value: '128gb', label: '128 GB' },
  { value: '256gb', label: '256 GB' },
  { value: '512gb', label: '512 GB' },
];

const SubCategory = () => {
  const dispatch = useDispatch();
  const { category, subcategory } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { brands: allBrands, loading: brandsLoading, error: brandsError } = useSelector((state) => state.allBrands);

  const {
    products,
    filteredProducts,
    fetchProducts,
    handleBrandFilterChange,
    handlePriceFilterChange,
    handleRAMFilterChange,
    handleMemoryFilterChange,
    loading: productsLoading,
    error: productsError
  } = useProductFilters(productsBySubcategoryAction, (state) => state.productsBySubcategory);

  // Format subcategory name for display
  const displaySubcategoryName = useMemo(() => {
    return subcategory?.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }, [subcategory]);

  // Format brands for filter dropdown
  const formattedBrands = useMemo(() => {
    if (!allBrands) return [];
    return allBrands.map(brand => ({
      value: brand.urlName.split("-")[0].toLowerCase(),
      label: brand.title.replace(/\b\w/g, char => char.toUpperCase())
    }));
  }, [allBrands]);

  // Generate SEO-friendly description
  const seoDescription = useMemo(() => {
    const count = filteredProducts.length;
    if (count === 0) return `Explore ${displaySubcategoryName} products at competitive prices`;
    if (count === 1) return `Buy ${displaySubcategoryName} ${filteredProducts[0].name} at best price`;
    return `Shop ${count}+ ${displaySubcategoryName} products at best prices with free shipping. Latest models with specifications, reviews & ratings.`;
  }, [displaySubcategoryName, filteredProducts]);

  // Fetch data on component mount
  useEffect(() => {
    if (subcategory) {
      fetchProducts(subcategory);
      dispatch(getAllBrandsAction());
    }
  }, [subcategory, fetchProducts, dispatch]);

  // Loading and error states
  if (brandsLoading || productsLoading) {
    return <Loader fullPage />;
  }

  if (brandsError || productsError) {
    return <ErrorMessage 
      message={brandsError || productsError} 
      retry={() => {
        fetchProducts(subcategory);
        dispatch(getAllBrandsAction());
      }} 
    />;
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <Helmet>
        <title>{displaySubcategoryName} - Buy Online at Best Prices | Your Store</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={`${displaySubcategoryName}, buy ${displaySubcategoryName} online`} />
        <meta property="og:title" content={`${displaySubcategoryName} Products | Your Store`} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${BASE_URL}/${category}/${subcategory}`} />
      </Helmet>

      {/* Mobile Filters Button
      <div className="lg:hidden mb-4">
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-between">
          <span>Filters</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div> */}

      <div className='flex gap-6'>
        {/* Filters Sidebar */}
        <aside className='lg:w-1/5 bg-white p-4 rounded-lg shadow-sm'>
          <div className="sticky top-4">
            <Filter
              title="Brand"
              filters={formattedBrands}
              type="brand"
              onFilterChange={handleBrandFilterChange}
            />
            <Filter
              title="Price"
              filters={PRICE_RANGES}
              type="price"
              onFilterChange={handlePriceFilterChange}
            />
            <Filter
              title="RAM"
              filters={RAM_OPTIONS}
              type="ram"
              onFilterChange={handleRAMFilterChange}
            />
            <Filter
              title="Memory"
              filters={MEMORY_OPTIONS}
              type="memory"
              onFilterChange={handleMemoryFilterChange}
            />
          </div>
        </aside>

        {/* Products Grid */}
        <main className='w-full lg:w-4/5'>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h1 className='text-2xl md:text-3xl font-bold capitalize'>{displaySubcategoryName}</h1>
            <p className="text-gray-500 text-sm mt-1">
              {filteredProducts.length > 0 
                ? `Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? 'item' : 'items'}`
                : 'No products found'}
            </p>
          </div>
          
          {/* Sorting options */}
          <div className="bg-white p-3 rounded-lg shadow-sm mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-gray-600">
              {filteredProducts.length > 0 && `${filteredProducts.length} ${filteredProducts.length === 1 ? 'item' : 'items'}`}
            </div>
            <div className="flex items-center gap-2">
              <select className="border rounded p-2 text-sm">
                <option>Sort by Popularity</option>
                <option>Price -- Low to High</option>
                <option>Price -- High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  image={product.imageUrls[0]?.url}
                  title={product.name}
                  price={product.price}
                  url={`/${product.urlName}`}
                  brand={product.brand}
                  rating={product.rating}
                />
              ))}
            </div>
          ) : (
            <div className='bg-white rounded-lg shadow-sm p-8 text-center'>
              <div className="mx-auto max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className='text-xl font-medium text-gray-600 mt-4'>No products found</h2>
                <p className='text-gray-500 mt-2'>Try adjusting your filters or search for something else</p>
                <button 
                  className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors"
                  // onClick={() => {
                  //   // Reset all filters
                  //   handleBrandFilterChange([]);
                  //   handlePriceFilterChange([]);
                  //   handleRAMFilterChange([]);
                  //   handleMemoryFilterChange([]);
                  // }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default React.memo(SubCategory);