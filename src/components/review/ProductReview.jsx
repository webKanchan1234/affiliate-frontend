import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDetailsAction } from "../../redux/actions/productAction";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductReview = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const { url } = useParams();
  const { product, loading: productsLoading, error: productsError } = useSelector((state) => state.productDetails);

  const [reviews, setReviews] = useState([]);
  const [activeTag, setActiveTag] = useState("all");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(productDetailsAction(url));
  }, [dispatch, url]);

  useEffect(() => {
    if (product) {
      if (product?.adminReview?.length) {
        setReviews(product.adminReview[0].sections || []);
      }
      
      // Get related products (for demo, we'll use similar category products)
      // In a real app, you might fetch these from an API or Redux store
      const related = product.relatedProducts || [];
      setRelatedProducts(related);
      
      // Extract unique tags from related products
      const allTags = ["all"];
      related.forEach(prod => {
        if (prod.tags) {
          prod.tags.forEach(tag => {
            if (!allTags.includes(tag)) {
              allTags.push(tag);
            }
          });
        }
      });
      setTags(allTags);
    }
  }, [product]);

  const filteredProducts = activeTag === "all" 
    ? relatedProducts 
    : relatedProducts.filter(product => 
        product.tags && product.tags.includes(activeTag)
      );

  return (
    <div className="p-3 bg-white w-5/6 mx-auto mt-2 flex flex-col md:flex-row gap-6">
      {/* Review Section - 70% */}
      <div className="w-full md:w-8/12 p-1">
        {reviews.length > 0 ? (
          reviews.map((section, index) => (
            <div key={index} className="w-full mb-6 flex flex-wrap md:flex-nowrap gap-4">
              {section.type === "text" ? (
                <div 
                  className="w-full md:w-full p-1"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              ) : (
                <div className="w-full p-1 flex justify-center">
                  {section.content && (
                    <div className="relative w-full max-w-4xl">
                      <img
                        src={`${BASE_URL + section.content}`}
                        alt="Blog"
                        className="w-full h-auto max-h-[600px] object-contain mx-auto rounded-lg shadow-md"
                      />
                      {section.caption && (
                        <p className="text-center text-sm text-gray-500 mt-2">
                          {section.caption}
                        </p>
                      )}
                    </div>
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
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        
        {/* Tags Filter */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                  activeTag === tag
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Related Products List */}
        <ul className="space-y-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <li key={product._id} className="p-3 rounded-lg shadow-sm bg-white">
                <Link 
                  to={`/product/${product.url}`} 
                  className="flex items-center gap-3 hover:no-underline"
                >
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={`${BASE_URL}${product.images[0]}`} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-gray-800 hover:text-blue-600">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">${product.price}</p>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No related products found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductReview;