import React, { useState, useEffect, useMemo } from "react";

const DynamicForm = ({ formData, setFormData, handleSubmit, categories = [],brands=[] }) => {
    const [imagePreviews, setImagePreviews] = useState([]);

    // Generate previews for image files
    useEffect(() => {
        if (!formData.images || !Array.isArray(formData.images)) {
            setImagePreviews([]);
            return;
        }

        const previews = formData.images.map((file) =>
            typeof file === "string" ? file : URL.createObjectURL(file)
        );

        setImagePreviews(previews);

        // Cleanup function to revoke object URLs
        return () => {
            previews.forEach((preview) => {
                if (preview.startsWith("blob:")) {
                    URL.revokeObjectURL(preview);
                }
            });
        };
    }, [formData.images]);

    // Handle change for normal fields, nested fields, and arrays
    const handleChange = (field, value, parentField = null) => {
        setFormData((prev) => {
            if (parentField) {
                return {
                    ...prev,
                    [parentField]: {
                        ...prev[parentField],
                        [field]: value,
                    },
                };
            }

            return {
                ...prev,
                [field]: value,
            };
        });
    };

    // Handle adding and removing array elements
    const handleArrayChange = (field, index, subField, value) => {
        setFormData((prev) => {
            const updatedArray = [...(prev[field] || [])];

            // Check if it's an array of strings (like pros, cons, specifications)
            if (typeof updatedArray[index] === "string") {
                updatedArray[index] = value; // Directly update string value
            } else {
                updatedArray[index] = {
                    ...updatedArray[index],
                    [subField]: value,
                };
            }

            return { ...prev, [field]: updatedArray };
        });
    };

    const addArrayItem = (field, initialValue = {}) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...(prev[field] || []), initialValue],
        }));
    };

    const removeArrayItem = (field, index) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setFormData((prev) => ({
            ...prev,
            images: Array.isArray(prev.images) ? [...prev.images, ...files] : files,
        }));
    };

    const removeImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: Array.isArray(prev.images) ? prev.images.filter((_, i) => i !== index) : [],
        }));
    };

    // Memoized category options for better performance
    const categoryOptions = useMemo(
        () =>
            categories.map((category) => (
                <option key={category.categoryId} value={category.title}>
                    {category.title}
                </option>
            )),
        [categories]
    );

    const brandOptions = useMemo(
        () =>
            brands.map((brand) => (
                <option key={brand.brandId} value={brand.title}>
                    {brand.title}
                </option>
            )),
        [brands]
    );

    return (
        <form className="bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Render fields dynamically */}
                {Object.keys(formData).map((key) => {
                    const value = formData[key];

                    // Handle category dropdown
                    if (key === "category") {
                        return (
                            <div key={key} className="mb-4">
                                <label className="block text-gray-700 font-medium capitalize">Category</label>
                                <select
                                    value={value || ""}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className="w-full border px-3 py-2 rounded-lg mt-1"
                                >
                                    <option value="">Select Category</option>
                                    {categoryOptions}
                                </select>
                            </div>
                        );
                    }


                    // Handle brand dropdown
                    if (key === "brand") {
                        return (
                            <div key={key} className="mb-4">
                                <label className="block text-gray-700 font-medium capitalize">Brand</label>
                                <select
                                    value={value || ""}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className="w-full border px-3 py-2 rounded-lg mt-1"
                                >
                                    <option value="">Select Brand</option>
                                    {brandOptions}
                                </select>
                            </div>
                        );
                    }

                    // Handle nested objects
                    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
                        return (
                            <div key={key} className="col-span-3 bg-gray-100 p-4 rounded">
                                <h3 className="text-lg font-semibold mb-2">{key.toUpperCase()}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {Object.keys(value).map((subKey) => (
                                        <div key={subKey} className="mb-2">
                                            <label className="block text-gray-700 font-medium capitalize">{subKey}</label>
                                            <input
                                                type="text"
                                                placeholder={`Enter ${subKey}`}
                                                value={value[subKey] || ""}
                                                onChange={(e) => handleChange(subKey, e.target.value, key)}
                                                className="w-full border px-3 py-2 rounded-lg mt-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    // Handle arrays of objects (e.g., sellers)
                    if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
                        return (
                            <div key={key} className="mb-4 col-span-3">
                                <label className="block text-gray-700 font-medium capitalize">{key}</label>
                                {value.map((item, index) => (
                                    <div key={index} className="bg-gray-100 p-4 rounded mb-2">
                                        {Object.keys(item).map((subKey) => (
                                            <div key={subKey} className="mb-2">
                                                <label className="block text-gray-700 font-medium capitalize">{subKey}</label>
                                                <input
                                                    type="text"
                                                    placeholder={`Enter ${subKey}`}
                                                    value={item[subKey] || ""}
                                                    onChange={(e) => handleArrayChange(key, index, subKey, e.target.value)}
                                                    className="w-full border px-3 py-2 rounded-lg"
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem(key, index)}
                                            className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayItem(key, { name: "", logo: "", link: "" })}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                                >
                                    + Add {key}
                                </button>
                            </div>
                        );
                    }

                    // Handle arrays of strings
                    if (Array.isArray(value) && typeof value[0] === "string") {
                        return (
                            <div key={key} className="mb-4 col-span-3">
                                <label className="block text-gray-700 font-medium capitalize">{key}</label>
                                {value.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => handleArrayChange(key, index, null, e.target.value)}
                                            className="w-full border px-3 py-2 rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem(key, index)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayItem(key, "")}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                                >
                                    + Add {key}
                                </button>
                            </div>
                        );
                    }

                    // Default input field
                    return (
                        <div key={key} className="mb-4">
                            <label className="block text-gray-700 font-medium capitalize">{key}</label>
                            <input
                                type="text"
                                placeholder={`Enter ${key}`}
                                value={value || ""}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="w-full border px-3 py-2 rounded-lg mt-1"
                            />
                        </div>
                    );
                })}

                {/* Image Upload Section */}
                <div className="mb-4 col-span-3">
                    <label className="block text-gray-700 font-medium">Upload Image(s)</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="block w-full border px-3 py-2 rounded-lg mt-1"
                    />
                    <div className="flex flex-wrap mt-2 gap-2">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="relative">
                                <img src={src} alt="Preview" className="w-20 h-20 object-cover rounded" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default DynamicForm;