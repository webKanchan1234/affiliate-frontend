import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Filter from '../common/Filter';
import Card from '../common/Card';
import useProductFilters from '../../hooks/useProductFilters';
import { productsByCategoryAction, searchProductsAction } from '../../redux/actions/productAction';
// import { productsByCategoryAction } from '../../redux/actions/productAction';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // Get search keyword
  const BASE_URL = import.meta.env.VITE_BASE_URL;;

  const {
    products,
    filteredProducts,
    fetchProducts,
    handleBrandFilterChange,
    handlePriceFilterChange,
    handleRAMFilterChange,
    handleMemoryFilterChange,
  } = useProductFilters(searchProductsAction, (state) => state.productsByCategory);

  // Fetch products when categoryName changes
  useEffect(() => {
    fetchProducts(query);
  }, [fetchProducts, query]);

  // console.log(query)
  // console.log(filteredProducts)
  // Filter configurations
  const brands = [
    { value: 'samsung', label: 'Samsung' },
    { value: 'sony', label: 'Sony' },
    { value: 'apple', label: 'Apple' },
    { value: 'vivo', label: 'Vivo' },
    { value: 'oneplus', label: 'OnePlus' },
    { value: 'xiaomi', label: 'Xiaomi' },
    { value: 'oppo', label: 'Oppo' },
  ];

  const priceRanges = [
    { value: '0-10000', label: 'Under ₹10,000' },
    { value: '10000-20000', label: '₹10,000 - ₹20,000' },
    { value: '20000-30000', label: '₹20,000 - ₹30,000' },
    { value: '30000-50000', label: '₹30,000 - ₹50,000' },
    { value: '50000-100000', label: 'Over ₹50,000' },
  ];

  const ramOptions = [
    { value: '2gb', label: '2 GB' },
    { value: '4gb', label: '4 GB' },
    { value: '6gb', label: '6 GB' },
    { value: '8gb', label: '8 GB' },
    { value: '12gb', label: '12 GB' },
    { value: '16gb', label: '16 GB' },
  ];

  const memoryOptions = [
    { value: '32gb', label: '32 GB' },
    { value: '64gb', label: '64 GB' },
    { value: '128gb', label: '128 GB' },
    { value: '256gb', label: '256 GB' },
    { value: '512gb', label: '512 GB' },
  ];

  return (
    <div className='md:w-5/6 w-auto m-auto p-2 flex'>
      <Helmet>
        <title>Title</title>
        <meta name="category product" content="category product" />
      </Helmet>

      {/* Left div for filters */}
      <div className='w-1/6 mr-1 p-2 bg-white'>
        <Filter
          title="Brand"
          filters={brands}
          type="brand"
          onFilterChange={handleBrandFilterChange}
        />
        <Filter
          title="Price"
          filters={priceRanges}
          type="price"
          onFilterChange={handlePriceFilterChange}
        />
        <Filter
          title="RAM"
          filters={ramOptions}
          type="ram"
          onFilterChange={handleRAMFilterChange}
        />
        <Filter
          title="Memory"
          filters={memoryOptions}
          type="memory"
          onFilterChange={handleMemoryFilterChange}
        />
      </div>

      {/* Right div for products list */}
      <div className='w-5/6 ml-2 bg-white'>
        <h3 className='m-2 text-2xl font-bold capitalize'>Search</h3>
        <div className='flex flex-wrap'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card
                key={product.id}
                image={`${BASE_URL + product?.imageUrls[0]}`}
                title={product.name}
                price={product.price}
                url={`/${product.urlName}`}
              />
            ))
          ) : (
            <h1>No products</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;