import React, { useEffect, useState } from "react";
import { FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import Table from "../../common/Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrandAction, getAllBrandsAction, updateBrandAction } from "../../../redux/actions/brandAction";
import DynamicForm from "../../common/DynamicForm";
import { getAllCategories } from "../../../redux/actions/categoryAction";
import Model from "../../common/Model";

const UpdateBrand = () => {
  const dispatch = useDispatch();
  const { brands, loading, error } = useSelector((state) => state.allBrands);
  const { brand, loading:updateLoad, error:errorLoad } = useSelector((state) => state.updateBrand);
  const { categories } = useSelector((state) => state.categories);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandData, setBrandData] = useState({
    title: "",
    urlName: "",
    description: "",
    image: "",
    category: "" // Stores selected category ID for form submission
  });
  // Local state for editing
  const [editBrand, setEditBrand] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [selectedId, setSelectedId] = useState(null)
  const [brandId, setBrandId] = useState(null)
  const [categoryId, setCategoryId] = useState(null);

  // Fetch brands
  useEffect(() => {
    dispatch(getAllBrandsAction());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const selectedCategory = categories.find((category) => category.title === brandData.category);
    setSelectedId(selectedCategory?.categoryId)

  }, [brandData.category, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(brandData);

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
    } else {
      console.error("Image is not a valid file:", brandData.image);
      return;
    }

    // ✅ Debug FormData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    // console.log(selectedId);

    // console.log(brandId,selectedId)

    dispatch(updateBrandAction({ brandId: brandId, categoryId:selectedId,data: formData }));
    setIsModalOpen(false);
  };

  // Table columns
  const brandColumns = [
    { key: "brandId", label: "ID" },
    { key: "title", label: "Brand Name" },
    { key: "urlName", label: "Category" },
    { key: "description", label: "Country" },
    { key: "image", label: "Logo", type: "image" },
  ];

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteBrandAction(id));
  };

  // Handle edit
  const handleClose=()=>{
    setEditBrand(null)
  }
  const handleEdit = (brand) => {
    setEditBrand(brand);
    setEditTitle(brand.title);
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

  // Handle update submission
  const handleUpdate = () => {
    if (!editBrand) return;

    // dispatch(updateBrandAction({ brandId: editBrand.brandId, updatedData: { title: editTitle } }));
    setEditBrand(null);
  };

  return (
    <div>
      <div className="bg-white p-6 mb-2 rounded shadow">
        <div className="flex justify-between items-center">
          {/* Search Input */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full outline-none"
            />
            <FiSearch className="absolute left-3 text-gray-500" size={20} />
          </div>

          {/* Filter & Add Brand */}
          <div className="flex items-center">
            <div className="flex items-center mr-3 cursor-pointer text-gray-700">
              <FiFilter size={20} />
            </div>
            <Link to="/admin/add-brand" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              <FiPlus size={20} />
              <span>Add</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Brand Table */}
      <Table title="Manage Brands" columns={brandColumns} data={brands} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Edit Modal */}
      {/* Reusable Modal */}
      {/* <Model title="Update Brand" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DynamicForm
          formData={brandData}
          setFormData={setBrandData}
          handleSubmit={handleSubmit}
          categories={categories}
          setCategoryId={setCategoryId}
        />
      </Model> */}
    </div>
  );
};

export default UpdateBrand;
