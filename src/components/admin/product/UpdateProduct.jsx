import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DynamicForm from "../../common/DynamicForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../redux/actions/categoryAction";
import { createProductAction, updateProductAction } from "../../../redux/actions/productAction";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { getAllBrandsAction } from "../../../redux/actions/brandAction";

const UpdateProduct = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const productFromState = location.state?.product || null;
    const { categories } = useSelector((state) => state.categories);
    const { brands, loading, error } = useSelector((state) => state.allBrands);

    const [selectedId, setSelectedId] = useState(null)
    const [selectedbrand, setSelectedbrand] = useState(null)
    // console.log("selectedId", selectedId)

    const [productData, setProductData] = useState(
        productFromState ? { ...productFromState, images: productFromState.images || [] } : {
            name: "",
            companyName: "",
            modelName: "",
            color: "",
            price: "",
            subcategory: "",
            urlName: "",
            images: [""],
            specifications: [""],
            sellers: [{ name: "", logo: "", link: "" }],
            pros: [""],
            cons: [""],
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
    const [productId, setProductId] = useState(productData.productId);


    // Fetch categories on component mount
    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllBrandsAction());
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
            const selectedCategory = categories.find((category) => category.title === productData.category);
            setSelectedId(selectedCategory?.categoryId || null);
        }
        if (brands.length > 0) {
            const selected = brands.find((brand) => brand.title === productData.brand);
            setSelectedbrand(selected?.brandId || null);
        }
    }, [productData.category,productData.brand, categories,brands]);

    // console.log(selectedId)
    // console.log(selectedbrand)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const productDataCopy = { ...productData };

        // Remove unnecessary fields
        delete productDataCopy.images;
        delete productDataCopy.category;
        delete productDataCopy.brand;
        delete productDataCopy.productId;
        delete productDataCopy.adminReview;
        delete productDataCopy.reviews;
        delete productDataCopy.imageUrls;

        // Append product JSON as a string
        formData.append("product", JSON.stringify(productDataCopy));

        if (Array.isArray(productData.images) && productData.images.length > 0) {
            productData.images.forEach((file) => {
                if (file instanceof File) {
                    formData.append("images", file);
                }
            });
        }

        // for (let pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        

        try {

            dispatch(updateProductAction({ productId: productId, categoryId: selectedId,brandId:selectedbrand, data: formData }))
                .unwrap()
                .then(() => {
                    toast.success("product updated successfully!");
                    navigate('/admin/products');
                })
                .catch((error) => {
                    toast.error(error || "Failed to update product.");
                });
            // console.log("productData.productId",productData.productId)
            // console.log("category id",selectedId)
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };



    return (
        <div>
            <Helmet>
                <title>Update Product</title>
                <meta name="update product" content="update product" />
            </Helmet>
            <div className="bg-white p-6 mb-2 rounded shadow">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-2xl">Update Product</h2>
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

export default UpdateProduct;