import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DynamicForm from '../../common/DynamicForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../redux/actions/categoryAction';
import { createBrandAction } from '../../../redux/actions/brandAction';
import Form from '../../common/Form';
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async';

const AddBrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { categories } = useSelector((state) => state.categories);
    const { loading, error } = useSelector((state) => state.brand)
    const [brandData, setBrandData] = useState({
        title: "",
        urlName: "",
        description: "",
        image: "",
        category: "" // Stores selected category ID for form submission
    });

    // console.log(categories)
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error); // Display the specific error message
        }
    }, [error]);


    const [categoryId, setCategoryId] = useState(null); // Separate category ID for URL
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        const selectedCategory = categories.find((category) => category.title === brandData.category);
        setSelectedId(selectedCategory?.categoryId)

    }, [brandData.category, categories]);
    // console.log(selectedId)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(brandData)

        const formData = new FormData();
        formData.append("brand", JSON.stringify({
            title: brandData.title,
            urlName: brandData.urlName,
            description: brandData.description,
        }));

        if (brandData.image instanceof File) {
            formData.append("image", brandData.image);
        } else {
            toast.error("Please upload a valid image file.");
            return;
        }

        // ✅ Debug FormData
        // for (let pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        // console.log(selectedId)
        dispatch(createBrandAction({ data: formData, id: selectedId }))
            .unwrap()
            .then(() => {
                toast.success("Brand created successfully!");
                navigate('/admin/brands');
            })
            .catch((error) => {
                toast.error(error || "Failed to create brand.");
            });
    };

    return (
        <div>
            <Helmet>
                <title>Create Brand</title>
                <meta name="create brand" content="create brand" />
            </Helmet>
            <div className="bg-white p-6 mb-2 rounded shadow">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-2xl">Create Brand</h2>
                    <Link to={"/admin/brands"} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Back
                    </Link>
                </div>
            </div>

            <div className="bg-white p-6 mb-2 rounded shadow">
                <Form formData={brandData} setFormData={setBrandData} handleSubmit={handleSubmit} categories={categories} loading={loading} />
            </div>
        </div>
    );
};

export default AddBrand;
