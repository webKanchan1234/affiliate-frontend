import { useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { productsByCategoryAction } from '../../redux/actions/productAction';

const useProductFilters = (fetchAction, selector) => {
  const dispatch = useDispatch();
  const { products } = useSelector(selector);

  // State for selected filters
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRAM, setSelectedRAM] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState([]);

  // Fetch products when the dynamic parameter (e.g., categoryName or brandName) changes
  const fetchProducts = useCallback(
    (param) => {
      if (param) {
        dispatch(fetchAction(param));
      }
    },
    [dispatch, fetchAction]
  );

  // Handle filter changes
  const handleBrandFilterChange = useCallback((brand, isChecked) => {
    setSelectedBrands((prev) => (isChecked ? [...prev, brand] : prev.filter((b) => b !== brand)));
  }, []);

  const handlePriceFilterChange = useCallback((price) => {
    setSelectedPrice(price);
  }, []);

  const handleRAMFilterChange = useCallback((ram, isChecked) => {
    setSelectedRAM((prev) => (isChecked ? [...prev, ram] : prev.filter((r) => r !== ram)));
  }, []);

  const handleMemoryFilterChange = useCallback((memory, isChecked) => {
    setSelectedMemory((prev) => (isChecked ? [...prev, memory] : prev.filter((m) => m !== memory)));
  }, []);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.companyName);
      const matchesPrice = !selectedPrice || (
        parseInt(product.price) >= parseInt(selectedPrice.split('-')[0]) &&
        parseInt(product.price) <= parseInt(selectedPrice.split('-')[1])
      );
      const matchesRAM = selectedRAM.length === 0 || selectedRAM.includes(product.performance.ram);
      const matchesMemory = selectedMemory.length === 0 || selectedMemory.includes(product.storage.internal);

      return matchesBrand && matchesPrice && matchesRAM && matchesMemory;
    });
  }, [products, selectedBrands, selectedPrice, selectedRAM, selectedMemory]);

  return {
    products,
    filteredProducts,
    fetchProducts,
    handleBrandFilterChange,
    handlePriceFilterChange,
    handleRAMFilterChange,
    handleMemoryFilterChange,
  };
};

export default useProductFilters;