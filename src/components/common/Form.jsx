import React from "react";
import { FiTrash } from "react-icons/fi";

const Form = ({ formData, setFormData, handleSubmit, errors, categories = [], loading }) => {
    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Get single file

        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file, // Store single image file
                imageUrl: URL.createObjectURL(file), // Preview image
            }));
        }
    };

    const handleRemoveImage = () => {
        setFormData((prev) => ({
            ...prev,
            image: null, // Remove image file
            imageUrl: null, // Remove preview
        }));
        document.getElementById("imageUpload").value = ""; // Reset file input
    };

    return (
        <form className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit} encType="multipart/form-data">
            {Object.keys(formData).map((field) => {
                if (field === "image") {
                    return (
                        <div key={field} className="col-span-2">
                            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className={`w-full border rounded-lg px-4 py-2
      ${errors?.image ? "border-red-500" : "border-gray-300"}
      file:bg-blue-500 file:text-white file:px-3 file:py-2
      file:border-none file:rounded-lg file:cursor-pointer
    `}
                            />


                            {/* Image Preview */}
                            {formData.imageUrl && (
                                <div className="mt-4 relative group w-32">
                                    <img src={formData.imageUrl} alt="Uploaded" className="w-full h-24 object-cover rounded-lg shadow" />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <FiTrash size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                } else if (field === "category" && categories.length > 0) {
                    return (
                        <div key={field}>
                            <label className="block text-gray-700 font-medium capitalize">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => handleChange(field, e.target.value)}
                                className={`w-full border rounded-lg px-4 py-2 mt-1
          ${errors?.category ? "border-red-500" : "border-gray-300"}
        `}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.categoryId} value={category.title}>
                                        {category.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                } else {
                    return (
                        <div key={field}>
                            <label className="block text-gray-700 font-medium capitalize">{field}</label>
                            <input
                                type="text"
                                placeholder={`Enter ${field}`}
                                value={formData[field] || ""}
                                onChange={(e) => handleChange(field, e.target.value)}
                                className={`w-full border rounded-lg px-4 py-2 mt-1
      ${errors?.[field] ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
    `}
                            />

                        </div>
                    );
                }
            })}

            {/* Submit Button */}
            <div className="col-span-2 flex justify-end mt-4 ">
                <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
                    {loading ? "Creating..." : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default Form;
