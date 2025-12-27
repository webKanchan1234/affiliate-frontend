import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DynamicForm from '../../common/DynamicForm';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../../redux/actions/categoryAction';
import Form from '../../common/Form';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import useFormValidation from "../../../hooks/useFormValidation";
import { categorySchema } from "../../../utils/formSchemas";

const AddCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const {category,loading,error}=useSelector(state=>state.createCategory);
    const { errors, validate } = useFormValidation(categorySchema);

    const [categoryData, setCategoryData] = useState({
        title: "",
        urlName: "",
        description: "",
        image: "",
    });

    // console.log("Category Data:", category);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate(categoryData)) {
            toast.error("Please fix validation errors");
            return;
        }

        const formData = new FormData();
        formData.append("category", JSON.stringify({
            title: categoryData.title,
            urlName: categoryData.urlName,
            description: categoryData.description,
            // brands: categoryData.brands
        }));

        if (categoryData.image instanceof File) {
            formData.append("image", categoryData.image);
        } else {
            console.error("Image is not a valid file:", categoryData.image);
            return;
        }

        // ✅ Debug FormData
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        dispatch(createCategoryAction(formData))
            .unwrap()
            .then(() => {
                toast.success("Category created successfully!");
                navigate('/admin/categories');
            })
            .catch((error) => {
                toast.error(error || "Failed to created category.");
            });
    };

    return (
        <div>
            <Helmet>
                <title>Create Category</title>
                <meta name="create category" content="create category" />
            </Helmet>
            <div className="bg-white p-6 mb-2 rounded shadow">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-2xl">Create Category</h2>
                    <Link to={"/admin/categories"} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Back
                    </Link>
                </div>
            </div>

            <div className="bg-white p-6 mb-2 rounded shadow">
                {/* <Form initialData={productData} onSubmit={handleSubmit} /> */}
                <Form formData={categoryData} setFormData={setCategoryData} handleSubmit={handleSubmit} errors={errors} />
            </div>
        </div>
    );
}

export default AddCategory