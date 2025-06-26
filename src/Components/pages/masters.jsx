import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ForwardLoading from '../../essentials/ForwardLoading'; // adjust path if needed
import { motion } from "framer-motion";
import {
    Box,        // For Item Master
    Users,      // For Party Master
    Truck,      // For Vehicle Master
    UserCircle, // For Employee Master
    Briefcase,  // For ERP branding icon
    Building    // For Vendor Master
} from 'lucide-react';

function MastersPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null); // State to track which card is hovered

    const handleNavigate = (path) => {
        setLoading(true);
        setTimeout(() => {
            navigate(path);
        }, 1200); // Increased timeout for a smoother transition with ForwardLoading
    };

    // Define master options with additional styling properties
    const masterOptions = [
        {
            label: "Item Master",
            path: "/masters/item",
            icon: <Box className="w-8 h-8 md:w-10 md:h-10 text-indigo-600" />,
            color: "bg-indigo-50",
            hoverColor: "bg-indigo-100",
            iconBg: "bg-indigo-100/70", // Subtle icon background for hover effect
            iconHoverBg: "bg-indigo-200" // Icon background on card hover
        },
        {
            label: "Party Master",
            path: "/masters/party",
            icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />,
            color: "bg-blue-50",
            hoverColor: "bg-blue-100",
            iconBg: "bg-blue-100/70",
            iconHoverBg: "bg-blue-200"
        },
        {
            label: "Vehicle Master",
            path: "/masters/vehicle",
            icon: <Truck className="w-8 h-8 md:w-10 md:h-10 text-green-600" />,
            color: "bg-green-50",
            hoverColor: "bg-green-100",
            iconBg: "bg-green-100/70",
            iconHoverBg: "bg-green-200"
        },
        {
            label: "Vendor Master", // Corrected "vendor Master" to "Vendor Master" for consistency
            path: "/masters/vendor",
            icon: <Building className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />,
            color: "bg-purple-50",
            hoverColor: "bg-purple-100",
            iconBg: "bg-purple-100/70",
            iconHoverBg: "bg-purple-200"
        },
        {
            label: "Employee Master",
            path: "/masters/employee",
            icon: <UserCircle className="w-8 h-8 md:w-10 md:h-10 text-amber-600" />,
            color: "bg-amber-50",
            hoverColor: "bg-amber-100",
            iconBg: "bg-amber-100/70",
            iconHoverBg: "bg-amber-200"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-6 sm:p-8 md:p-10">
            {/* WEBSYRA ERP Branding Header */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                className="w-full max-w-4xl mb-12 text-center"
            >
                <div className="flex items-center justify-center gap-4 mb-4">
                    {/* Animated ERP Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 150 }}
                        className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg"
                    >
                        <Briefcase className="w-7 h-7 text-white" />
                    </motion.div>
                    {/* Animated and Styled Title */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 drop-shadow-sm">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">WEBSYRA</span> ERP
                    </h1>
                </div>
                <p className="text-lg sm:text-xl text-gray-600 font-light max-w-2xl mx-auto">
                    Streamline your business operations with intuitive and comprehensive master data management.
                </p>
            </motion.div>

            {loading ? (
                <ForwardLoading />
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-4xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">Explore Master Modules</h2>
                        <p className="text-gray-500 text-md">Dive into essential data management sections for your business.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {masterOptions.map((option, index) => (
                            <motion.div
                                key={index} // Using index as key is acceptable here as the list is static
                                whileHover={{ y: -8, scale: 1.02 }} // Lift and slightly scale on hover
                                whileTap={{ scale: 0.98 }} // Slight press effect on click
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => handleNavigate(option.path)}
                                className={`cursor-pointer p-6 sm:p-7 ${option.color} border border-gray-200 rounded-2xl transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:shadow-xl relative overflow-hidden`}
                            >
                                {/* Background gradient for card hover effect */}
                                <motion.div
                                    className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 ${option.hoverColor}`}
                                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                {/* Content container to ensure text/icons stay above the animated background */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <motion.div
                                        className={`mb-5 p-4 rounded-full shadow-md transition-colors duration-300 ${hoveredCard === index ? option.iconHoverBg : option.iconBg}`}
                                        animate={{ scale: hoveredCard === index ? 1.1 : 1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        {option.icon}
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{option.label}</h3>
                                    <p className="text-sm text-gray-600 max-w-[180px]">{option.label} management</p>
                                    {/* Animated underline */}
                                    <motion.div
                                        className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mt-4 rounded-full"
                                        animate={{
                                            width: hoveredCard === index ? '80px' : '0px',
                                            opacity: hoveredCard === index ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Footer */}
            <div className="mt-12 text-center text-sm text-gray-500">
                <p className="font-medium text-gray-700">© {new Date().getFullYear()} WEBSYRA ERP. All rights reserved.</p>
                <p className="mt-1 text-gray-600">Version 2.1.0</p>
            </div>
        </div>
    );
}

export default MastersPage;
