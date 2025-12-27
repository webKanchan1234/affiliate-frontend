import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Filter from '../common/Filter';
import Card from '../common/Card';
import useProductFilters from '../../hooks/useProductFilters';
import { searchProductsAction } from '../../redux/actions/productAction';
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

const BRAND_OPTIONS = [
  { value: 'samsung', label: 'Samsung' },
  { value: 'sony', label: 'Sony' },
  { value: 'apple', label: 'Apple' },
  { value: 'vivo', label: 'Vivo' },
  { value: 'oneplus', label: 'OnePlus' },
  { value: 'xiaomi', label: 'Xiaomi' },
  { value: 'oppo', label: 'Oppo' },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

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
  } = useProductFilters(searchProductsAction, (state) => state.productsByCategory);

  // Generate SEO-friendly description
  const seoDescription = useMemo(() => {
    const count = filteredProducts.length;
    if (count === 0) return `Search results for "${query}"`;
    if (count === 1) return `Found 1 product matching "${query}"`;
    return `Found ${count} products matching "${query}"`;
  }, [query, filteredProducts]);

  // Fetch products when query changes
  useEffect(() => {
    if (query) {
      fetchProducts(query);
    }
  }, [query, fetchProducts]);

  // Loading and error states
  if (productsLoading) {
    return <Loader fullPage />;
  }

  if (productsError) {
    return <ErrorMessage 
      message={productsError} 
      retry={() => fetchProducts(query)} 
    />;
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <Helmet>
        <title>Search Results for "{query}" | Your Store</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={`${query}, search results`} />
        <meta property="og:title" content={`Search Results for "${query}"`} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${BASE_URL}/search?q=${query}`} />
      </Helmet>

      

      <div className='flex gap-6'>
        {/* Filters Sidebar */}
        <aside className='lg:block lg:w-1/5 bg-white p-4 rounded-lg shadow-sm'>
          <div className="sticky top-4">
            <Filter
              title="Brand"
              filters={BRAND_OPTIONS}
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
            <h1 className='text-2xl md:text-3xl font-bold'>Search Results for "{query}"</h1>
            <p className="text-gray-500 text-sm mt-1">
              {filteredProducts.length > 0 
                ? `Found ${filteredProducts.length} ${filteredProducts.length === 1 ? 'item' : 'items'}`
                : 'No products found'}
            </p>
          </div>
          
          {/* Sorting options */}
          <div className="bg-white p-3 rounded-lg shadow-sm mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-gray-600">
              {filteredProducts.length > 0 && `${filteredProducts.length} ${filteredProducts.length === 1 ? 'result' : 'results'}`}
            </div>
            <div className="flex items-center gap-2">
              <select className="border rounded p-2 text-sm">
                <option>Sort by Relevance</option>
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
                <p className='text-gray-500 mt-2'>No results found for "{query}"</p>
                <p className='text-gray-500 mt-1'>Try different keywords or remove filters</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default React.memo(Search);