import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ForwardLoading from '../../essentials/ForwardLoading'; // adjust path if needed
import { motion } from "framer-motion";
import {
    ShoppingCart,   // Purchase & Sales
    Clock,          // Dues Management
    LayoutGrid,     // Masters
    BarChart2,      // Reports
    Boxes,          // Inventory
    Banknote,       // Accounts
    Settings,       // Settings
    ScrollText,     // Vouchers
    DollarSign,     // Salary
    Fuel,           // Fuel Management
    HelpCircle,     // Help & Support
    Briefcase       // For ERP branding icon
} from 'lucide-react';

function Menu() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null); // State to track which card is hovered

    const handleNavigate = (path) => {
        setLoading(true);
        setTimeout(() => {
            navigate(path);
        }, 1200); // Increased timeout for a smoother transition with ForwardLoading
    };

    // Define a set of harmonious indigo/blue/purple-based color themes to cycle through
    const colorThemes = [
        { primaryText: "text-indigo-600", lightBg: "bg-indigo-50", darkBg: "bg-indigo-600", iconBg: "bg-indigo-100/70", iconHoverBg: "bg-white" },
        { primaryText: "text-blue-600", lightBg: "bg-blue-50", darkBg: "bg-blue-600", iconBg: "bg-blue-100/70", iconHoverBg: "bg-white" },
        { primaryText: "text-purple-600", lightBg: "bg-purple-50", darkBg: "bg-purple-600", iconBg: "bg-purple-100/70", iconHoverBg: "bg-white" },
        { primaryText: "text-violet-600", lightBg: "bg-violet-50", darkBg: "bg-violet-600", iconBg: "bg-violet-100/70", iconHoverBg: "bg-white" },
        { primaryText: "text-fuchsia-600", lightBg: "bg-fuchsia-50", darkBg: "bg-fuchsia-600", iconBg: "bg-fuchsia-100/70", iconHoverBg: "bg-white" },
    ];

    // Define menu options with icons and descriptions
    const options = [
        { label: "Purchase & Sales", path: "/purchase&sales", icon: ShoppingCart, description: "Manage buying and selling operations." },
        { label: "Dues Management", path: "/duesmanagement", icon: Clock, description: "Track and manage outstanding payments." },
        { label: "Masters", path: "/masters", icon: LayoutGrid, description: "Centralized data for core entities." },
        { label: "Reports", path: "/reports", icon: BarChart2, description: "Generate insightful business reports." },
        { label: "Inventory", path: "/inventory", icon: Boxes, description: "Manage stock and product movements." },
        { label: "Accounts", path: "/accounts", icon: Banknote, description: "Handle financial transactions and ledger." },
        { label: "Settings", path: "/settings", icon: Settings, description: "Configure system preferences and users." },
        { label: "Vouchers", path: "/vouchers", icon: ScrollText, description: "Record financial transactions via vouchers." },
        { label: "Salary", path: "/salary", icon: DollarSign, description: "Process employee salaries and payroll." },
        { label: "Fuel Management", path: "/fuelmanagement", icon: Fuel, description: "Track and optimize vehicle fuel consumption." },
        { label: "Help & Support", path: "/help", icon: HelpCircle, description: "Access help resources and customer support." },
    ];

    // Animation variants for staggered grid items
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.07, // Delay between each child's animation
                delayChildren: 0.2 // Delay before first child starts
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-6 sm:p-8 md:p-10 font-inter relative overflow-hidden pt-16"> {/* Adjusted for top margin */}
            {/* Decorative Blobs (for a more organic, human touch) */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
            <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 pointer-events-none"></div>

            {/* Main content wrapper (scaling removed) */}
            <div className="flex flex-col items-center w-full"> {/* Removed justify-center here as pt-16 handles top alignment */}
                {/* WEBSYRA ERP Branding Header */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    className="w-full max-w-4xl mb-12 text-center relative z-10"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        {/* Animated ERP Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 150 }}
                            className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg"
                        >
                            <Briefcase className="w-8 h-8 text-white" />
                        </motion.div>
                        {/* Animated and Styled Title */}
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 drop-shadow-md">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">WEBSYRA</span> ERP
                        </h1>
                    </div>
                    <p className="text-lg sm:text-2xl text-gray-600 font-light max-w-2xl mx-auto tracking-wide">
                        Your central hub for efficient business management.
                    </p>
                </motion.div>

                {loading ? (
                    <ForwardLoading />
                ) : (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="bg-white/70 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-screen-xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl relative z-10" /* Changed max-w to screen-xl */
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">Main Modules</h2>
                            <p className="text-gray-600 text-md">Select a module to navigate to its features.</p>
                        </div>

                        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
                            {options.map((option, index) => {
                                const theme = colorThemes[index % colorThemes.length]; // Cycle through color themes
                                const IconComponent = option.icon; // Get the Lucide icon component

                                return (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ y: -10, scale: 1.03, rotate: '1deg', transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.98 }}
                                        onMouseEnter={() => setHoveredCard(index)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        onClick={() => handleNavigate(option.path)}
                                        className={`group cursor-pointer p-6 sm:p-7 ${theme.lightBg} border border-gray-200 rounded-2xl transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:shadow-xl relative overflow-hidden`}
                                        style={{
                                            transform: `rotate(${index % 2 === 0 ? 0.5 : -0.5}deg)`
                                        }}
                                    >
                                        {/* Animated background fill on hover */}
                                        <motion.div
                                            className={`absolute inset-0 rounded-2xl transition-all duration-300 ${theme.darkBg}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        {/* Content container */}
                                        <div className="relative z-10 flex flex-col items-center">
                                            <motion.div
                                                className={`mb-3 p-4 rounded-full shadow-md transition-all duration-300 ${hoveredCard === index ? theme.iconHoverBg : theme.iconBg}`}
                                                animate={{ scale: hoveredCard === index ? 1.15 : 1 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            >
                                                <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${theme.primaryText} group-hover:text-white transition-colors duration-300`} />
                                            </motion.div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-white transition-colors duration-300">{option.label}</h3>
                                            {/* Animated description */}
                                            <motion.p
                                                className="text-sm text-gray-600 overflow-hidden text-center group-hover:text-gray-200 transition-colors duration-300"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{
                                                    height: hoveredCard === index ? 'auto' : 0,
                                                    opacity: hoveredCard === index ? 1 : 0
                                                }}
                                                transition={{ delay: hoveredCard === index ? 0.1 : 0, duration: 0.3 }}
                                            >
                                                {option.description}
                                            </motion.p>
                                            {/* Animated underline */}
                                            <motion.div
                                                className="h-1 bg-white mt-4 rounded-full"
                                                animate={{
                                                    width: hoveredCard === index ? '80px' : '0px',
                                                    opacity: hoveredCard === index ? 1 : 0
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}

                {/* Footer */}
                <div className="mt-20 text-center text-sm text-gray-600 relative z-10"> {/* Increased top margin for footer */}
                    <p className="font-medium text-gray-700">© {new Date().getFullYear()} WEBSYRA ERP. All rights reserved.</p>
                    <p className="mt-1 text-gray-600">Version 2.1.0</p>
                </div>
            </div> {/* End of main content wrapper */}

            {/* Global Styles for Blob Animation (Add these to your main CSS or a style block if this is a standalone component) */}
            <style jsx>{`
                @keyframes blob {
                    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                }
                .animate-blob {
                    animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
                }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </div>
    );
}

export default Menu;
