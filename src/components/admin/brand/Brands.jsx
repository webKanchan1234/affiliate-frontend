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

const Brands = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { brands, loading, error } = useSelector((state) => state.allBrands);
  const { categories } = useSelector((state) => state.categories);

  const [brandId, setBrandId] = useState(null)
  const [categoryId, setCategoryId] = useState(null);
  const [editBrand, setEditBrand] = useState(null);
  const [selectedId, setSelectedId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandData, setBrandData] = useState({
    title: "",
    urlName: "",
    description: "",
    image: "",
    category: "" // Stores selected category ID for form submission
  });


  // console.log(brands)

  useEffect(() => {
    dispatch(getAllBrandsAction());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const selectedCategory = categories.find((category) => category.title === brandData.category);
    setSelectedId(selectedCategory?.categoryId)

  }, [brandData.category, categories]);

  const brandColumns = [
    { key: "brandId", label: "ID" },
    { key: "title", label: "Brand Name" },
    { key: "urlName", label: "urlName" },
    { key: "description", label: "description" },
    { key: "image", label: "image" },
  ];



  const handleEdit = (brand) => {
    setEditBrand(brand);
    // setEditTitle(brand.title);
    setBrandId(brand.brandId)
    setBrandData({
      title: brand.title,
      urlName: brand.urlName,
      description: brand.description,
      image: brand.image,
      category: brand.category // Stores selected category ID for form submission
    })
    setIsModalOpen(true);
  };

  const handleDelete = (brand) => {
    // console.log(id)
    dispatch(deleteBrandAction(brand.brandId))
      .unwrap()
      .then(() => {
        toast.success("Brand deleted successfully!");
        dispatch(getAllBrandsAction());
      })
      .catch((error) => {
        toast.error(error || "Failed to deleted brand.");
      });
  };

  const handleView = (product) => {
    // console.log("View product details:", product);
    // alert(`Viewing details of ${product.name}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(brandData);

    const formData = new FormData();
    formData.append(
      "brand",
      JSON.stringify({
        title: brandData.title,
        urlName: brandData.urlName,
        description: brandData.description,
      })
    );

    if (brandData.image instanceof File) {
      formData.append("image", brandData.image);
    } 

    // ✅ Debug FormData
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    // console.log(selectedId);

    // console.log(brandId,selectedId)

    dispatch(updateBrandAction({ brandId: brandId, categoryId: selectedId, data: formData }))
      .unwrap()
      .then(() => {
        toast.success("Brand updated successfully!");
        navigate('/admin/brands');
      })
      .catch((error) => {
        toast.error(error || "Failed to updated brand.");
      });
    setIsModalOpen(false);
  };

  return (
    <div>
      <Helmet>
        <title> Brands</title>
        <meta name="all brands" content="brands" />
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
              <Link to={"/admin/add-brand"} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                <FiPlus size={20} />
                <span >Add</span>
              </Link>
            </div>
          </div>
        </div>



      </div>
      <Table title="Manage Brands data" columns={brandColumns} data={brands} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
      <Model title="Update Brand" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white p-6 mb-2 rounded shadow">
          <Form formData={brandData} setFormData={setBrandData} handleSubmit={handleSubmit} categories={categories} />
        </div>
      </Model>
    </div>
  );
};

export default Brands;
