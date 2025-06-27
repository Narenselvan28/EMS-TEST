import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ForwardLoading from '../../essentials/ForwardLoading'; // adjust path if needed
import { motion } from "framer-motion";
import {
    ShoppingCart,      // Purchase & Sales
    Banknote,          // Accounts
    Boxes,             // Inventory
    ScrollText,        // Vouchers
    LayoutGrid,        // Masters
    BarChart2,         // Reports
    Clock,             // Dues Management
    DollarSign,        // Salary
    Fuel,              // Fuel Management
    Settings,          // Settings
    FileEdit,          // Drafts
    HelpCircle,        // Help & Support
    Briefcase          // For ERP branding icon
} from 'lucide-react';

function Menu() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null); // State to track which card is hovered

    const handleNavigate = (path) => {
        setLoading(true);
        setTimeout(() => {
            navigate(path);
        }, 800); // Timeout allows ForwardLoading to show
    };

    // Define a set of harmonious color themes for the icons and text.
    // Ensure you have at least 12 distinct themes or they will repeat too quickly.
    const colorThemes = [
        { primaryText: "text-indigo-600", lightBg: "bg-indigo-50", iconBg: "bg-indigo-100", hoverBg: "bg-indigo-600", hoverText: "text-white" },
        { primaryText: "text-blue-600", lightBg: "bg-blue-50", iconBg: "bg-blue-100", hoverBg: "bg-blue-600", hoverText: "text-white" },
        { primaryText: "text-purple-600", lightBg: "bg-purple-50", iconBg: "bg-purple-100", hoverBg: "bg-purple-600", hoverText: "text-white" },
        { primaryText: "text-violet-600", lightBg: "bg-violet-50", iconBg: "bg-violet-100", hoverBg: "bg-violet-600", hoverText: "text-white" },
        { primaryText: "text-fuchsia-600", lightBg: "bg-fuchsia-50", iconBg: "bg-fuchsia-100", hoverBg: "bg-fuchsia-600", hoverText: "text-white" },
        { primaryText: "text-emerald-600", lightBg: "bg-emerald-50", iconBg: "bg-emerald-100", hoverBg: "bg-emerald-600", hoverText: "text-white" },
        { primaryText: "text-cyan-600", lightBg: "bg-cyan-50", iconBg: "bg-cyan-100", hoverBg: "bg-cyan-600", hoverText: "text-white" },
        { primaryText: "text-pink-600", lightBg: "bg-pink-50", iconBg: "bg-pink-100", hoverBg: "bg-pink-600", hoverText: "text-white" },
        { primaryText: "text-red-600", lightBg: "bg-red-50", iconBg: "bg-red-100", hoverBg: "bg-red-600", hoverText: "text-white" },
        { primaryText: "text-orange-600", lightBg: "bg-orange-50", iconBg: "bg-orange-100", hoverBg: "bg-orange-600", hoverText: "text-white" },
        { primaryText: "text-lime-600", lightBg: "bg-lime-50", iconBg: "bg-lime-100", hoverBg: "bg-lime-600", hoverText: "text-white" },
        { primaryText: "text-teal-600", lightBg: "bg-teal-50", iconBg: "bg-teal-100", hoverBg: "bg-teal-600", hoverText: "text-white" }, // New theme for 12th item
    ];

    // Define menu options with icons and descriptions, ordered by priority
    const options = [
        // High Priority
        { label: "Purchase & Sales", path: "/purchase&sales", icon: ShoppingCart, description: "Manage buying and selling operations with ease." },
        { label: "Accounts", path: "/accounts", icon: Banknote, description: "Handle all financial transactions, ledgers, and statements." },
        { label: "Inventory", path: "/inventory", icon: Boxes, description: "Manage stock levels, movements, and warehouse operations." },
        { label: "Vouchers", path: "/vouchers", icon: ScrollText, description: "Record and manage financial transactions via various vouchers." },

        // Medium Priority
        { label: "Masters", path: "/masters", icon: LayoutGrid, description: "Centralized data for core entities like products, customers." },
        { label: "Reports", path: "/reports", icon: BarChart2, description: "Generate insightful business reports for informed decisions." },
        { label: "Dues Management", path: "/duesmanagement", icon: Clock, description: "Efficiently track and collect outstanding payments." },
        { label: "Salary", path: "/salary", icon: DollarSign, description: "Process employee salaries, payroll, and deductions accurately." },

        // Lower Priority / Support / Specific Functions
        { label: "Fuel Management", path: "/fuelmanagement", icon: Fuel, description: "Track and optimize vehicle fuel consumption and expenses." },
        { label: "Settings", path: "/settings", icon: Settings, description: "Configure system preferences, user roles, and security." },
        { label: "Drafts", path: "/drafts", icon: FileEdit, description: "Access and manage your pending documents and entries." },
        { label: "Help & Support", path: "/help", icon: HelpCircle, description: "Access comprehensive help resources and customer support." },
    ];

    // Animation variants for staggered grid items
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
                mass: 0.5,
            }
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-start p-6 sm:p-8 md:p-10 relative overflow-hidden pt-16">
            <div className="flex flex-col items-center w-full">
                {/* WEBSYRA ERP Branding Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-4xl mb-12 text-center relative z-10"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                            <Briefcase className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">WEBSYRA</span> ERP
                        </h1>
                    </div>
                    <p className="text-lg sm:text-2xl text-gray-600 font-light max-w-2xl mx-auto tracking-wide">
                        Your central hub for **efficient business management**.
                    </p>
                </motion.div>

                {loading ? (
                    <ForwardLoading />
                ) : (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="bg-white/95 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-screen-xl border border-gray-100 relative z-10"
                    >
                        {/* Section Header for Main Modules */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">Main Modules</h2>
                            <p className="text-gray-600 text-md">Access your primary business functionalities.</p>
                        </div>

                        {/* Main Modules Grid - Adjusted for 4x3 layout */}
                        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                            {options.map((option, index) => {
                                // Cycle through color themes based on index
                                const theme = colorThemes[index % colorThemes.length];
                                const IconComponent = option.icon;

                                return (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ y: -6, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                                        whileTap={{ scale: 0.98 }}
                                        onMouseEnter={() => setHoveredCard(index)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        onClick={() => handleNavigate(option.path)}
                                        className={`group cursor-pointer p-6 sm:p-7 ${theme.lightBg} border border-gray-200 rounded-2xl transition-all duration-300 flex flex-col items-center text-center shadow-md relative overflow-hidden`}
                                    >
                                        {/* Dynamic background overlay on hover */}
                                        <motion.div
                                            className={`absolute inset-0 rounded-2xl ${theme.hoverBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                            initial={{ scale: 1.1 }}
                                            animate={{ scale: hoveredCard === index ? 1 : 1.1 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        />

                                        <div className={`relative z-10 flex flex-col items-center`}>
                                            <motion.div
                                                className={`mb-3 p-4 rounded-full shadow-sm transition-all duration-300
                                                           ${hoveredCard === index ? 'bg-white/30' : theme.iconBg}`}
                                                animate={{ scale: hoveredCard === index ? 1.08 : 1 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                            >
                                                <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${hoveredCard === index ? theme.hoverText : theme.primaryText} transition-colors duration-300`} />
                                            </motion.div>
                                            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${hoveredCard === index ? theme.hoverText : 'text-gray-800'}`}>{option.label}</h3>
                                            <p className={`text-sm text-gray-600 text-center transition-colors duration-300 ${hoveredCard === index ? 'text-gray-200' : ''}`}>
                                                {option.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}

                {/* Footer */}
                <div className="mt-20 text-center text-sm text-gray-600 relative z-10">
                    <p className="font-medium text-gray-700">© {new Date().getFullYear()} WEBSYRA ERP. All rights reserved.</p>
                    <p className="mt-1 text-gray-600">Version 2.1.0</p>
                </div>
            </div>
        </div>
    );
}

export default Menu;