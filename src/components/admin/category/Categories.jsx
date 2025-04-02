import React, { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import { FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import Table from "../../common/Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryAction, getAllCategories, updateCategoryAction } from "../../../redux/actions/categoryAction";
import Model from "../../common/Model";
import DynamicForm from "../../common/DynamicForm";
import Form from "../../common/Form";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  // console.log(categories)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [categoryData, setCategoryData] = useState({
    title: "",
    urlName: "",
    description: "",
    image: "",
  });


  const handleEdit = (category) => {
    setEditCategory(category);
    // setEditTitle(brand.title);
    setCategoryId(category.categoryId)
    setCategoryData({
      title: category.title,
      urlName: category.urlName,
      description: category.description,
      image: category.image,
    })
    setIsModalOpen(true);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(categoryData);

    const formData = new FormData();
    formData.append(
      "category",
      JSON.stringify({
        title: categoryData.title,
        urlName: categoryData.urlName,
        description: categoryData.description,
      })
    );

    if (categoryData.image instanceof File) {
      formData.append("image", categoryData.image);
    } else {
      console.error("Image is not a valid file:", categoryData.image);
      return;
    }

    // // ✅ Debug FormData
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    // console.log(selectedId);

    // console.log(brandId,selectedId)

    // console.log(categoryId)
    // console.log(formData)

    dispatch(updateCategoryAction({ categoryId: categoryId, data: formData }))
      .unwrap()
      .then(() => {
        toast.success("Category updated successfully!");
        navigate('/admin/categories');
      })
      .catch((error) => {
        toast.error(error || "Failed to update category.");
      });
    // dispatch(updateBrandAction({ brandId: brandId, categoryId: selectedId, data: formData }));
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // Table columns
  const categoryColumns = [
    { key: "categoryId", label: "Category ID" },
    { key: "title", label: "Title" },
    { key: "urlName", label: "URL Name" },
    { key: "description", label: "Description" },
    { key: "image", label: "Image", type: "image" },

  ];







  const handleDelete = (category) => {
    // console.log(id)
    dispatch(deleteCategoryAction(category.categoryId))
      .unwrap()
      .then(() => {
        toast.success("Category deleted successfully!");
        dispatch(getAllCategories());
      })
      .catch((error) => {
        toast.error(error || "Failed to deleted category.");
      });
    // setProducts(products.filter((product) => product.id !== id));
  };

  const handleView = (product) => {
    // console.log("View product details:", product);
    // alert(`Viewing details of ${product.name}`);
  };

  return (
    <div>
      <Helmet>
        <title>Categories</title>
        <meta name=" categories" content=" categories" />
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
              <Link to={"/admin/add-category"} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                <FiPlus size={20} />
                <span >Add</span>
              </Link>
            </div>
          </div>
        </div>



      </div>
      <Table title="Manage Categories data" columns={categoryColumns} data={categories} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

      <Model title="Update Category" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form
          formData={categoryData}
          setFormData={setCategoryData}
          handleSubmit={handleSubmit}
          categories={categories}
          setCategoryId={setCategoryId}
        />
      </Model>
    </div>
  );
};

export default Categories;
