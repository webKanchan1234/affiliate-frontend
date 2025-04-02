import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ item }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigation = (link) => {
        if (link) navigate(link);
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Main Menu Button */}
            <button
                onClick={() => !item.subMenu && handleNavigation(item.link)}
                className="px-4 py-2 text-black hover:bg-gray-800 hover:text-white flex items-center cursor-pointer"
            >
                {item.label}
                {item.subMenu && <ChevronDown className="ml-2" size={16} />}
            </button>

            {/* Sub-menu (Appears on Hover) */}
            {item.subMenu && isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full min-w-max bg-gray-600 shadow-lg pointer-events-auto mt-0 z-50"
                >
                    <div>
                        <table className="text-white">
                            <thead>
                                <tr className="bg-red-400 uppercase text-left ">
                                    {item.subMenu.map((category, index) => (
                                        <th key={index} className="px-4">{category.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {item.subMenu.map((category, index) => (
                                        <td key={index} className="py-2 align-top">
                                            {category.items.map((subItem, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleNavigation(subItem.link)}
                                                    className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700 cursor-pointer"
                                                >
                                                    {subItem.label}
                                                </button>
                                            ))}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default MenuItem;
