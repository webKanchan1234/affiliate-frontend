import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DynamicForm from "../../common/DynamicForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../redux/actions/categoryAction";
import { createProductAction } from "../../../redux/actions/productAction";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories } = useSelector((state) => state.categories);
    const { brands, loading, error } = useSelector((state) => state.allBrands);
    const [selectedId, setSelectedId] = useState(null);

    // Initial product data state
    const [productData, setProductData] = useState({
        name: "",
        companyName: "",
        modelName: "",
        color: "",
        price: "",
        subcategory: "",
        urlName: "",
        images: [""],

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
        category: "",
        brand: ""
    }
    );

    useEffect(() => {
        if (categories.length > 0) {
            const selectedCategory = categories.find((category) => category.title === productData.category);
            setSelectedId(selectedCategory?.categoryId || null);
        }
    }, [productData.category, categories]);

    // Fetch categories on component mount
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Clone productData to avoid mutation
        const productDataCopy = { ...productData };
        delete productDataCopy.images; // Remove imageUrls as it's not needed in the JSON
        delete productDataCopy.category; // Remove category as it's not needed in the JSON
        delete productDataCopy.brand; // Remove category as it's not needed in the JSON

        // Append product JSON as a string
        formData.append("product", JSON.stringify(productDataCopy));


        // Append image files under the same key ("images")
        if (Array.isArray(productData.images) && productData.images.length > 0) {
            productData.images.forEach((file) => {
                if (file instanceof File) {
                    formData.append("images", file); // Append all files under the same key
                }
            });
        }

        // Debugging: Check what is being sent
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            dispatch(createProductAction({ data: formData, categoryId: selectedId,brandId:2 }))
                .unwrap()
                .then(() => {
                    toast.success("product created successfully!");
                    navigate('/admin/products');
                })
                .catch((error) => {
                    toast.error(error || "Failed to product product.");
                });
            // alert("Product created successfully!");
            // navigate('/admin/products')
        } catch (error) {
            console.error("Failed to create product:", error);
            alert("Failed to create product. Please check the console for more details.");
        }
    };


    useEffect(() => {
        const selectedCategory = categories.find((category) => category.title === productData.category);
        setSelectedId(selectedCategory?.categoryId)

    }, [productData.category, categories]);
    // console.log(selectedId)

    return (
        <div>
            <Helmet>
                <title>Create Product</title>
                <meta name="create product" content="create product" />
            </Helmet>
            <div className="bg-white p-6 mb-2 rounded shadow">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-2xl">Create Product</h2>
                    <Link to={"/admin/products"} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Back
                    </Link>
                </div>
            </div>

            <div className="bg-white p-6 mb-2 rounded shadow">
                <DynamicForm
                    formData={productData} // Exclude category from form
                    setFormData={setProductData}
                    handleSubmit={handleSubmit}
                    categories={categories}
                    brands={brands}
                />
            </div>
        </div>
    );
};

export default AddProduct;