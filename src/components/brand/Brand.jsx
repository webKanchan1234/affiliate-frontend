import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Filter from '../common/Filter';
import { productsByBrandAction, productsByCategoryAction } from '../../redux/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { categoryFilters } from '../common/categoryFilters';
import Card from '../common/Card';
import useProductFilters from '../../hooks/useProductFilters';
import { getAllBrandsAction } from '../../redux/actions/brandAction';
// import { Card } from '../products/Card';

const Brand = () => {
    const { brandName } = useParams();
    const dispatch = useDispatch();
    const BASE_URL = import.meta.env.VITE_BASE_URL;;
const { brands:p, loading, error } = useSelector((state) => state.allBrands);
  

    const {
        products,
        filteredProducts,
        fetchProducts,
        handleBrandFilterChange,
        handlePriceFilterChange,
        handleRAMFilterChange,
        handleMemoryFilterChange,
      } = useProductFilters(productsByBrandAction, (state) => state.productsByBrand);
    
      // Fetch products when categoryName changes
      useEffect(() => {
        fetchProducts(brandName);
        dispatch(getAllBrandsAction());
      }, [fetchProducts, brandName]);

      const capitalizeTitle = (title) => {
        return title.replace(/\b\w/g, char => char.toUpperCase());
      };
      const formattedBrands = p.map(brand => ({
        value: brand.urlName.split("-")[0].toLowerCase(), // Extracting the main brand name from `urlName`
        label: capitalizeTitle(brand.title)
      }));
    
    // Dummy data for products
    const dummyProducts = [
        {
            id: 1, name: 'Samsung Galaxy S21', brand: 'samsung', price: 69999, ram: '8gb', memory: '128gb', imageUrls
                : ['https://images.samsung.com/in/smartphones/galaxy-s25-ultra/buy/product_color_pinkGold_MO.png']
        },
        {
            id: 2, name: 'iPhone 13', brand: 'apple', price: 79999, ram: '6gb', memory: '128gb', imageUrls
                : ['https://images.samsung.com/in/smartphones/galaxy-s25-ultra/buy/product_color_pinkGold_MO.png']
        },
        {
            id: 3, name: 'OnePlus 9 Pro', brand: 'oneplus', price: 64999, ram: '12gb', memory: '256gb', imageUrls
                : ['https://images.samsung.com/in/smartphones/galaxy-s25-ultra/buy/product_color_pinkGold_MO.png']
        },
        {
            id: 4, name: 'Xiaomi Mi 11', brand: 'xiaomi', price: 54999, ram: '8gb', memory: '128gb', imageUrls
                : ['https://images.samsung.com/in/smartphones/galaxy-s25-ultra/buy/product_color_pinkGold_MO.png']
        },
        {
            id: 5, name: 'Vivo V21', brand: 'vivo', price: 29999, ram: '8gb', memory: '128gb', imageUrls
                : ['https://images.samsung.com/in/smartphones/galaxy-s25-ultra/buy/product_color_pinkGold_MO.png']
        },
        {
            id: 6, name: 'Sony Xperia 1 III', brand: 'sony', price: 89999, ram: '12gb', memory: '256gb', imageUrls
                : ['https://images.samsung.com/in/smartphones/galaxy-s25-ultra/buy/product_color_pinkGold_MO.png']
        },
    ];

    // State for selected filters
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedRAM, setSelectedRAM] = useState([]);
    const [selectedMemory, setSelectedMemory] = useState([]);

    // Filter configurations
    const brands = [
        { value: 'samsung', label: 'Samsung' },
        { value: 'sony', label: 'Sony' },
        { value: 'apple', label: 'Apple' },
        { value: 'vivo', label: 'Vivo' },
        { value: 'oneplus', label: 'OnePlus' },
        { value: 'xiaomi', label: 'Xiaomi' },
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

    // const filters = useMemo(() => categoryFilters[categoryName] || {}, [categoryName]);
    // console.log(products)

    // useEffect(() => {
    //     if (categoryName) {
    //         dispatch(productsByCategoryAction(categoryName));
    //     }
    // }, [dispatch, categoryName]);
    // console.log(categoryName)
    // Handle filter changes
    // const handleBrandFilterChange = useCallback((brand, isChecked) => {
    //     setSelectedBrands((prev) =>
    //         isChecked ? [...prev, brand] : prev.filter((b) => b !== brand)
    //     );
    // }, []);

    // const handlePriceFilterChange = (price) => {
    //     setSelectedPrice(price);
    // };

    // const handleRAMFilterChange = (ram, isChecked) => {
    //     if (isChecked) {
    //         setSelectedRAM([...selectedRAM, ram]);
    //     } else {
    //         setSelectedRAM(selectedRAM.filter((r) => r !== ram));
    //     }
    // };

    // const handleMemoryFilterChange = (memory, isChecked) => {
    //     if (isChecked) {
    //         setSelectedMemory([...selectedMemory, memory]);
    //     } else {
    //         setSelectedMemory(selectedMemory.filter((m) => m !== memory));
    //     }
    // };

    // Filter products based on selected filters
    // const filteredProducts = useMemo(() => {
    //     return products.filter((product) => {
    //         const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.companyName);
    //         const matchesPrice = !selectedPrice || (
    //             parseInt(product.price) >= parseInt(selectedPrice.split('-')[0]) &&
    //             parseInt(product.price) <= parseInt(selectedPrice.split('-')[1])
    //         );
    //         const matchesRAM = selectedRAM.length === 0 || selectedRAM.includes(product.performance.ram);
    //         const matchesMemory = selectedMemory.length === 0 || selectedMemory.includes(product.storage.internal);

    //         return matchesBrand && matchesPrice && matchesRAM && matchesMemory;
    //     });
    // }, [products, selectedBrands, selectedPrice, selectedRAM, selectedMemory]);

    // console.log(filteredProducts)

    return (
        <div className='md:w-5/6 w-auto m-auto p-2 flex'>
          <Helmet>
            <title>{brandName}</title>
            <meta name="category product" content="category product" />
          </Helmet>
    
          {/* Left div for filters */}
          <div className='w-1/6 mr-1 p-2 bg-white'>
            <Filter
              title="Brand"
              filters={formattedBrands}
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
            <h3 className='m-2 text-2xl font-bold capitalize'>{brandName.replace("-", " ")}</h3>
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

export default Brand;