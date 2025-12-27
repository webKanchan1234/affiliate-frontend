import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productAction";
import { getAllCategories } from "../../redux/actions/categoryAction";
import { getAllBrandsAction } from "../../redux/actions/brandAction";
import Loader from "../../components/common/Loader";
import Card from "../../components/common/Card";
import TopCategory from "../../components/category/TopCategory";
import CategoryRowType from "../../components/category/CategoryRowType";

const Home = ({ isServerDown }) => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading, error: productsError } = useSelector((s) => s.products);
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((s) => s.categories);
  const { brands, loading: brandsLoading, error: brandsError } = useSelector((s) => s.allBrands);

  const [latest, setLatest] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [five5g, setFive5g] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllCategories());
    dispatch(getAllBrandsAction());
  }, [dispatch]);

  console.log("categories in Home:", categories);

  useEffect(() => {
    if (products?.content) {
      setLatest(products.content.filter(p => p.subcategory === "latest-mobiles"));
      setUpcoming(products.content.filter(p => p.subcategory === "upcoming-mobiles"));
      setFive5g(products.content.filter(p => p.subcategory === "5g-mobiles"));
    }
  }, [products]);

  const isLoading = productsLoading || categoriesLoading || brandsLoading;
  const isError = productsError || categoriesError || brandsError;

  if (isServerDown) {
    return (
      <div className="text-center text-red-600 font-bold text-lg mt-10">
        🚨 Server is down. Please try again later.
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 font-bold text-lg mt-10">
        🚨 Something went wrong while loading data.
      </div>
    );
  }

  return (
    <>
      <Loader loading={isLoading} />

      <TopCategory title="Top Categories" category="category" categories={categories} />
      <TopCategory title="Top Brands" category="brand" categories={brands} />

      {[latest, upcoming, five5g].map(
        (list, i) =>
          list.length > 0 && (
            <CategoryRowType
              key={i}
              title={list[0].subcategory.replace("-", " ")}
              category={list[0].category?.title?.toLowerCase()}
              products={list}
              fullWidth
            />
          )
      )}
    </>
  );
};

export default Home;
