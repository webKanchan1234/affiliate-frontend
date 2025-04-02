import React, { useEffect, useState } from "react";
import { FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import Table from "../../common/Table";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAction, getProducts } from "../../../redux/actions/productAction";
import BulkUploadProducts from "./BulkUploadProducts";
import { getAllCategories } from "../../../redux/actions/categoryAction";
import Model from "../../common/Model";
import DynamicForm from "../../common/DynamicForm";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Products = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const { products: p, loading: productsLoading, error: productsError } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);


  // Local state for products
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null)
  const [editProduct, setEditProduct] = useState(null)
  const [productId, setProductId] = useState(null)
  const [productsData, setProductsData] = useState([]);
  const [data, setData] = useState({
    name: "",
    companyName: "",
    modelName: "",
    color: "",
    price: "",
    subcategory: "",
    urlName: "",
    images: "",

    specifications: [
      ""
    ],
    sellers: [
      {
        name: "",
        logo: "",
        link: ""
      }
    ],
    pros: [
      ""
    ],
    cons: [
      ""
    ],
    general: {
      launchDate: "",
      brand: "",
      model: "",
      os: "",
      simSlot: "",
      simSize: "",
      network: ""
    },
    performance: {
      chip: "",
      cpu: "",
      architecture: "",
      graphics: "",
      ram: ""
    },
    display: {
      disType: "",
      screenSize: "",
      resolution: "",
      brightness: "",
      refreshRate: "",
      aspectRation: "",
      pixel: "",
      touch: "",
      hd: ""
    },
    design: {
      height: "",
      width: "",
      thickness: "",
      weight: "",
      material: "",
      colors: "",
      waterProof: ""
    },
    camera: {
      cameraSet: "",
      cameraResolution: "",
      focus: "",
      flash: "",
      imageResolution: "",
      features: "",
      recording: "",
      cameraOthers: ""
    },
    battery: {
      capacity: "",
      type: "",
      removal: "",
      charging: "",
      usb: ""
    },
    storage: {
      internal: "",
      expandable: "",
      usbs: ""
    },
    network: {
      slot: "",
      size: "",
      support: "",
      vlt: "",
      wifi: "",
      bluetooth: ""
    },
    media: {
      radio: "",
      speaker: "",
      audioJack: "",
      mediaOthers: ""
    },
    sensor: {
      finger: "",
      position: "",
      sensorType: "",
      sensorOthers: ""
    },
    category: ""
  }
  );

  useEffect(() => {
    if (categories.length > 0) {
      const selectedCategory = categories.find((category) => category.title === data.category);
      setSelectedId(selectedCategory?.categoryId || null);
    }
  }, [data.category, categories]);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // console.log(products)
  // Fetch products when component mounts
 

  // Update local state when Redux data updates
  useEffect(() => {
    if (p?.content) {
      setProductsData(p.content);
    }
  }, [p]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Define table columns
  const columns = [
    { key: "productId", label: "ID" },
    { key: "name", label: "Product Name" },
    { key: "categoryId", label: "Category", render: (row) => row.category?.title || "N/A" }, // Extract title
    { key: "price", label: "Price" },
    { key: "totalReviews", label: "Total Reviews", render: (row) => row.reviews?.length || 0 },
  ,
  ];

  // Handle edit and delete
  const handleEdit = (product) => {
    navigate("/admin/update-product", { state: { product } });
  };
  
  const handleDelete = async (product) => {
    try {
      await dispatch(deleteProductAction(product.productId)).unwrap();
      toast.success("Product deleted successfully!");
      dispatch(getProducts()); // Refresh product list after successful deletion
    } catch (error) {
      toast.error("Failed to delete product!");
    }
  };

  const handleView = (product) =>{
    // navigate("/admin/update-product", { state: { product } });
    console.log(product)
    navigate(`/admin/create-review/${product.productId}`, { state: { product } })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsModalOpen(false);
  };


  return (
    <div>
      <Helmet>
        <title> Products</title>
        <meta name=" products" content=" products" />
      </Helmet>
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

          {/* Filter & Add Product */}
          <div className="flex items-center">
            <div className="flex items-center mr-3 cursor-pointer text-gray-700">
              <FiFilter size={20} />
            </div>
            <Link
              onClick={() => setIsBulkUploadOpen(true)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 mr-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
            >
              <FiPlus size={20} />
              <span >Add Bulk</span>
            </Link>
            <BulkUploadProducts isOpen={isBulkUploadOpen} onClose={() => setIsBulkUploadOpen(false)} />

            <Link to="/admin/add-product" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              <FiPlus size={20} />
              <span>Add</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Ensure products exist before rendering Table */}
      {productsData.length > 0 ? (
        <Table title="Manage Products" columns={columns} data={[...productsData].reverse()} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
      ) : (
        <p className="text-center text-gray-500 mt-4">No products available.</p>
      )}
      <Model title="Update Brand" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white p-6 mb-2 rounded shadow">
          <DynamicForm
            formData={data} // Exclude category from form
            setFormData={setData}
            handleSubmit={handleSubmit}
            categories={categories}
          />
        </div>
      </Model>
    </div>
  );
};

export default Products;
