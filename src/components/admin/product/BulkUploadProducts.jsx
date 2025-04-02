import React, { useState } from "react";
import { FiUpload, FiCheck, FiX, FiFile, FiImage } from "react-icons/fi";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Model from "../../common/Model";
import { createProductAction } from "../../../redux/actions/productAction";

const BulkUploadProducts = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [products, setProducts] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    // 📌 Handle Excel file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            readExcel(selectedFile);
        }
    };

    // 📌 Read & Parse Excel file
    const readExcel = (file) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            const formattedData = jsonData.map((row) => ({
                name: row["name"] || "",
                companyName: row["companyName"] || "",
                modelName: row["modelName"] || "",
                color: row["color"] || "",
                price: row["price"] ? String(row["price"]) : "0",
                subcategory: row["subcategory"] || "",
                urlName: row["urlName"] || "",
                imageNames: row["images"] ? row["images"].split(",") : [],
                specifications: row["specifications"] ? row["specifications"].split(",") : [],
                pros: row["pros"] ? row["pros"].split(",") : [],
                cons: row["cons"] ? row["cons"].split(",") : [],
                sellers: row["sellers"] ? JSON.parse(row["sellers"]) : [],
                general: row["general"] ? JSON.parse(row["general"]) : {},
                performance: row["performance"] ? JSON.parse(row["performance"]) : {},
                display: row["display"] ? JSON.parse(row["display"]) : {},
                design: row["design"] ? JSON.parse(row["design"]) : {},
                camera: row["camera"] ? JSON.parse(row["camera"]) : {},
                battery: row["battery"] ? JSON.parse(row["battery"]) : {},
                storage: row["storage"] ? JSON.parse(row["storage"]) : {},
                network: row["network"] ? JSON.parse(row["network"]) : {},
                media: row["media"] ? JSON.parse(row["media"]) : {},
                sensor: row["sensor"] ? JSON.parse(row["sensor"]) : {},
                category: row["category"] || "",
                brand: row["brand"] || "",
            }));

            setProducts(formattedData);
        };
    };

    // 📌 Handle Image Upload
    const handleImageUpload = (event) => {
        const selectedImages = Array.from(event.target.files);
        setImageFiles(selectedImages);
    };

    // 📌 Handle Submit
    const handleSubmit = async () => {
        if (products.length === 0) {
            toast.error("No products found in the uploaded file.");
            return;
        }

        setUploading(true);
        setProgress(0);

        try {
            for (let index = 0; index < products.length; index++) {
                const product = products[index];
                const formData = new FormData();
                // Clone productData to avoid mutation
                const productDataCopy = { ...product };
                delete productDataCopy.imageNames; // Remove imageUrls as it's not needed in the JSON
                delete productDataCopy.category; // Remove category as it's not needed in the JSON
                delete productDataCopy.brand; // 

                // Append product data as JSON
                formData.append("product", JSON.stringify(productDataCopy));

                // Attach images for the current product
                if (product.imageNames.length > 0) {
                    product.imageNames.forEach((imageName) => {
                        const imageFile = imageFiles.find((file) => file.name === imageName.trim());
                        if (imageFile) {
                            formData.append("images", imageFile);
                        } else {
                            console.warn(`Image file not found: ${imageName}`);
                        }
                    });
                }

                // console.log("Uploading:", product.name);
                // console.log("Images:", product.imageNames);
                // console.log("Brand:", product.brand, "Category:", product.category);
                // for (let pair of formData.entries()) {
                //     console.log(pair[0], pair[1]);
                // }
                // Send data to API via Redux action
                await dispatch(createProductAction({
                    data: formData,
                    categoryId: product.category,
                    brandId: product.brand,

                }))
                    .unwrap()
                    .then(() => {
                        setProgress(((index + 1) / products.length) * 100);
                    })
                    .catch((error) => {
                        console.error(`Failed to upload product ${product.name}:`, error);
                        throw error;
                    });
            }

            toast.success("All products uploaded successfully!");
            onClose();
        } catch (error) {
            toast.error("Some products failed to upload.");
        } finally {
            setUploading(false);
        }
    };


    return (
        <Model title="Bulk Upload Products" isOpen={isOpen} onClose={onClose}>
            <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Bulk Upload Products</h2>

                {/* Upload Excel */}
                <div className="border-2 border-dashed border-gray-400 p-6 text-center rounded-lg bg-gray-100">
                    <label className="cursor-pointer">
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="hidden" />
                        <FiFile className="mx-auto text-gray-500" size={30} />
                        <p className="text-gray-700 mt-2">Click to upload Excel file</p>
                    </label>
                </div>
                {file && <p className="text-sm text-gray-600">📂 {file.name}</p>}

                {/* Upload Images */}
                <div className="border-2 border-dashed border-gray-400 p-6 text-center rounded-lg bg-gray-100">
                    <label className="cursor-pointer">
                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <FiImage className="mx-auto text-gray-500" size={30} />
                        <p className="text-gray-700 mt-2">Click to upload images</p>
                    </label>
                </div>
                {imageFiles.length > 0 && <p className="text-sm text-gray-600">🖼 {imageFiles.length} images selected</p>}

                {/* Progress Bar */}
                {uploading && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleSubmit}
                        className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 cursor-pointer"
                        disabled={uploading}
                    >
                        {uploading ? `Uploading... ${progress.toFixed(2)}%` : (
                            <>
                                <FiCheck size={20} className="mr-2 " /> Upload
                            </>
                        )}
                    </button>

                    <button
                        onClick={onClose}
                        className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 cursor-pointer"
                        disabled={uploading}
                    >
                        <FiX size={20} className="mr-2 " /> Cancel
                    </button>
                </div>
            </div>
        </Model>
    );
};

export default BulkUploadProducts;
