import React, { useEffect, useState } from "react";
import { FiUpload, FiCheck, FiX, FiFile, FiImage } from "react-icons/fi";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Model from "../../common/Model";
import { createProductAction, getProducts } from "../../../redux/actions/productAction";
import { useSelector } from "react-redux";

const BulkUploadProducts = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { products: p, loading: productsLoading, error: productsError } = useSelector((state) => state.products);
    
    const [file, setFile] = useState(null);
    const [products, setProducts] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [existingProducts, setExistingProducts] = useState([]);
    const [duplicates, setDuplicates] = useState([]);


    useEffect(() => {
        if (isOpen) {
            dispatch(getProducts());
        }
        setExistingProducts(p.content)
    }, [isOpen]);

    // console.log(existingProducts)

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
            checkForDuplicates(formattedData);
        };
    };

    const checkForDuplicates = (newProducts) => {
        const duplicateItems = [];
        const uniqueItems = newProducts.filter(product => {
            const isDuplicate = existingProducts.some(
                existing => existing.urlName === product.urlName
            );
            if (isDuplicate) duplicateItems.push(product);
            return !isDuplicate;
        });
        
        setDuplicates(duplicateItems);
        return uniqueItems;
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

        // Filter out duplicates
        const uniqueProducts = checkForDuplicates(products);
        
        if (uniqueProducts.length === 0) {
            toast.warning("All products in this file already exist in the system.");
            return;
        }

        if (duplicates.length > 0) {
            toast.warning(`Skipping ${duplicates.length} duplicate product(s).`);
        }

        setUploading(true);
        setProgress(0);

        
        try {
            for (let index = 0; index < uniqueProducts.length; index++) {
                const product = uniqueProducts[index];
                const formData = new FormData();
                const productDataCopy = { ...product };
                delete productDataCopy.imageNames;
                delete productDataCopy.category;
                delete productDataCopy.brand;

                formData.append("product", JSON.stringify(productDataCopy));

                if (product.imageNames.length > 0) {
                    product.imageNames.forEach((imageName) => {
                        const imageFile = imageFiles.find((file) => file.name === imageName.trim());
                        if (imageFile) {
                            formData.append("images", imageFile);
                        }
                    });
                }

                for (let pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                }
        

                await dispatch(createProductAction({
                    data: formData,
                    categoryId: product.category,
                    brandId: product.brand,
                }))
                .unwrap()
                .then(() => {
                    setProgress(((index + 1) / uniqueProducts.length) * 100);
                })
                .catch((error) => {
                    if (Array.isArray(error)) {
                        error.forEach((errMsg) => {
                            toast.error(errMsg); // or push to a UI list
                        });
                    } else {
                        toast.error(error?.message || "Something went wrong while uploading.");
                    }
                });
            }

            toast.success(`${uniqueProducts.length} products uploaded successfully!`);
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
