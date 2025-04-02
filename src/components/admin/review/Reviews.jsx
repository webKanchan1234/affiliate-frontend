import React, { useEffect, useState } from "react";
import { FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import Table from "../../common/Table";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrandAction, getAllBrandsAction, updateBrandAction } from "../../../redux/actions/brandAction";
import { use } from "react";
import Model from "../../common/Model";
import DynamicForm from "../../common/DynamicForm";
import { getAllCategories } from "../../../redux/actions/categoryAction";
import Form from "../../common/Form";
import { toast } from 'react-toastify'
import { Helmet } from "react-helmet-async";
import { getAllReviewsAction } from "../../../redux/actions/reviewAction";

const Reviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { reviews } = useSelector((state) => state.reviews);

  const [reviewId, setReviewId] = useState(null)
  const [editReview, setEditReview] = useState(null);
  const [selectedId, setSelectedId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  


//   console.log(reviews)

  useEffect(() => {
    dispatch(getAllReviewsAction())
  }, [dispatch]);

  
  const reviewsColumns = [
    { key: "reviewId", label: "ID" },
    { key: "reviewerName", label: "Reviewer" },
    { key: "reviewTitle", label: "Title" },
    { key: "reviewDesc", label: "Description" },
    { key: "rating", label: "Rating" },
  ];



  const handleEdit = (review) => {
    setEditReview(review);
    // setEditTitle(brand.title);
    setReviewId(review.reviewId)
    
    setIsModalOpen(true);
  };

  const handleDelete = (review) => {
    // console.log(id)
    // dispatch(deleteBrandAction(brand.brandId))
    //   .unwrap()
    //   .then(() => {
    //     toast.success("Brand deleted successfully!");
    //     dispatch(getAllBrandsAction());
    //   })
    //   .catch((error) => {
    //     toast.error(error || "Failed to deleted brand.");
    //   });
  };

  const handleView = (product) => {
    // console.log("View product details:", product);
    // alert(`Viewing details of ${product.name}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(brandData);

    

    setIsModalOpen(false);
  };

  return (
    <div>
      <Helmet>
        <title> Reviews</title>
        <meta name="all Reviews" content="Reviews" />
      </Helmet>
      <div className="bg-white p-6 mb-2 rounded shadow">
        <div className="flex justify-between items-center ">
          <div className="relative flex items-center">
            {/* Input Field */}
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full outline-none"
            />

            {/* Search Icon inside Input */}
            <FiSearch className="absolute left-3 text-gray-500" size={20} />
          </div>
          <div>
            <div className="flex justify-between items-center ">
              {/* Filter Section */}
              <div className="flex items-center mr-3 cursor-pointer text-gray-700">
                <FiFilter size={20} />
                {/* <span className="font-medium"></span> */}
              </div>

              {/* Add Button */}
              {/* <Link to={"/admin/add-brand"} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                <FiPlus size={20} />
                <span >Add</span>
              </Link> */}
            </div>
          </div>
        </div>



      </div>
      <Table title="Manage Reviews data" columns={reviewsColumns} data={reviews||[]} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
      <Model title="Update Review" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white p-6 mb-2 rounded shadow">
          {/* <Form formData={brandData} setFormData={setBrandData} handleSubmit={handleSubmit} categories={categories} /> */}
        </div>
      </Model>
    </div>
  );
};

export default Reviews;
