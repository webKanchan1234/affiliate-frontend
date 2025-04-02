import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDetailsAction } from "../../redux/actions/productAction";
import { useParams } from "react-router-dom";

const ProductReview = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;;
  const dispatch = useDispatch();
  const { url } = useParams();
  const { product, loading: productsLoading, error: productsError } = useSelector((state) => state.productDetails);
  
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    dispatch(productDetailsAction(url));
  }, [dispatch, url]);

  useEffect(() => {
    if (product?.adminReview?.length) {
      setReviews(product.adminReview[0].sections || []);
    }
  }, [product]);

  return (
    <div className="p-1 bg-white w-5/6 mx-auto mt-2 flex flex-col md:flex-row gap-6">
      {/* Review Section - 70% */}
      <div className="w-full md:w-8/12  p-1  ">
        {reviews.length > 0 ? (
          reviews.map((section, index) => (
            <div key={index} className="w-full mb-6 flex flex-wrap md:flex-nowrap gap-4">
              {section.type === "text" ? (
                <div className="w-full md:w-full p-1" 
                     dangerouslySetInnerHTML={{ __html: section.content }} 
                />
              ) : (
                <div className="w-full md:w-full p-1">
                  {section.content && (
                    <img 
                      src={`${BASE_URL + section.content}`} 
                      alt="Blog" 
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews available.</p>
        )}
      </div>

      {/* Sidebar Section - 30% */}
      <div className="w-full md:w-4/12 bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent News</h2>
        <ul className="space-y-3">
          <li className="p-3  rounded-lg shadow-sm">
            <a href="#" className="text-blue-600 hover:underline">New smartphone launches this week</a>
          </li>
          <li className="p-3  rounded-lg shadow-sm">
            <a href="#" className="text-blue-600 hover:underline">Best budget laptops in 2025</a>
          </li>
          <li className="p-3  rounded-lg shadow-sm">
            <a href="#" className="text-blue-600 hover:underline">5G vs WiFi 6: What you need to know</a>
          </li>
          <li className="p-3  rounded-lg shadow-sm">
            <a href="#" className="text-blue-600 hover:underline">Top gaming monitors for 2025</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductReview;
