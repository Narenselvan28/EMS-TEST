import React from 'react';
import { motion } from "framer-motion";
import {
    CheckCircle,
    AlertTriangle,
    Wallet,
    Package,
    BellRing,
    Car,
    Plus,
    Database,
    LineChart as LineChartIcon,
    DollarSign,
    CalendarDays,
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';

// Custom Tooltip Component for a more unique look
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const revenueValue = payload[0].value;
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-blue-100 text-gray-800 font-semibold"
            >
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className="text-lg font-bold">
                    Revenue: <span className="text-blue-600">₹{revenueValue.toLocaleString()}</span>
                </p>
                <div className="flex items-center mt-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mr-2"></span>
                    <span className="text-xs text-gray-600">Monthly Performance</span>
                </div>
            </motion.div>
        );
    }
    return null;
};


const ERPDashboardBalancesRefined = () => {
    // Animation variants for staggered cards/sections
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    // Data for the Line Chart (Monthly Revenue Trend)
    const revenueData = [
        { name: 'Jan', Revenue: 120000 },
        { name: 'Feb', Revenue: 190000 },
        { name: 'Mar', Revenue: 150000 },
        { name: 'Apr', Revenue: 200000 },
        { name: 'May', Revenue: 180000 },
        { name: 'Jun', Revenue: 240000 },
    ];

    // Card data for easy mapping
    const summaryCards = [
        { title: 'Total Revenue', value: '₹2,45,800', trend: '12% vs last month', color: 'green', iconColor: 'blue', icon: <DollarSign className="w-5 h-5" /> },
        { title: 'Current Stock', value: '₹8,50,000', trend: 'Based on latest inventory', color: 'green', iconColor: 'teal', icon: <Package className="w-5 h-5" /> },
        { title: 'Total Reminders', value: '7', trend: '2 overdue actions', color: 'red', iconColor: 'red', icon: <BellRing className="w-5 h-5" /> },
    ];

    const balanceData = [ // Combined balance data for side-by-side display
        { title: 'Opening Balance', value: '₹1,50,000', context: 'As of April 1', iconColor: 'purple' },
        { title: 'Closing Balance', value: '₹1,85,500', context: 'As of June 27, 2025', iconColor: 'indigo' },
    ];

    const recentActivities = [
        { title: 'Order #1234 completed', time: '2 minutes ago', color: 'green', icon: <CheckCircle /> },
        { title: 'Low stock: Product A - Reorder now!', time: '30 minutes ago', color: 'red', icon: <AlertTriangle /> },
        { title: 'Vehicle MH04AB1234 performance report generated', time: '1 hour ago', color: 'blue', icon: <Car /> },
        { title: 'Vehicle KA01CD5678 service reminder (due in 3 days)', time: '5 hours ago', color: 'purple', icon: <BellRing /> },
    ];

    const quickActions = [
        { label: 'Create New Order', color: 'blue', icon: <Plus className="w-5 h-5" /> },
        { label: 'Generate Financial Report', color: 'emerald', icon: <LineChartIcon className="w-5 h-5" /> },
        { label: 'Update Inventory', color: 'orange', icon: <Package className="w-5 h-5" /> },
        { label: 'Manage Master Data', color: 'violet', icon: <Database className="w-5 h-5" /> },
    ];

    // Helper for card background gradients - More pronounced gradient
    const cardBgGradient = "bg-gradient-to-br from-white to-blue-100/50";

    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-gray-50 min-h-screen text-gray-800 p-4 sm:p-8 md:p-10 flex justify-center w-screen overflow-hidden relative">
            {/* Subtle Textured Background Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a0c4ff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34.545V43.455h2v-8.91h-2zm-6 0V43.455h2v-8.91h-2zm-6 0V43.455h2v-8.91h-2zm-6 0V43.455h2v-8.91h-2zm-6 0V43.455h2v-8.91h-2zM36 25.09V34h2v-8.91h-2zm-6 0V34h2v-8.91h-2zm-6 0V34h2v-8.91h-2zm-6 0V34h2v-8.91h-2zm-6 0V34h2v-8.91h-2zM36 15.636V24.545h2v-8.91h-2zm-6 0V24.545h2v-8.91h-2zm-6 0V24.545h2v-8.91h-2zm-6 0V24.545h2v-8.91h-2zm-6 0V24.545h2v-8.91h-2zM36 6.182V15.09h2V6.182h-2zm-6 0V15.09h2V6.182h-2zm-6 0V15.09h2V6.182h-2zm-6 0V15.09h2V6.182h-2zm-6 0V15.09h2V6.182h-2zM36 3.636V.909h2v2.727h-2zm-6 0V.909h2v2.727h-2zm-6 0V.909h2v2.727h-2zm-6 0V.909h2v2.727h-2zm-6 0V.909h2v2.727h-2zM36 44V3.636h2v40.364h-2zm-6 0V3.636h2v40.364h-2zm-6 0V3.636h2v40.364h-2zm-6 0V3.636h2v40.364h-2zm-6 0V3.636h2v40.364h-2zM36 53.455V60h2v-6.545h-2zm-6 0V60h2v-6.545h-2zm-6 0V60h2v-6.545h-2zm-6 0V60h2v-6.545h-2zm-6 0V60h2v-6.545h-2zM36 43.455V52.364h2v-8.909h-2zm-6 0V52.364h2v-8.909h-2zm-6 0V52.364h2v-8.909h-2zm-6 0V52.364h2v-8.909h-2zm-6 0V52.364h2v-8.909h-2zM45 60h2V0h-2v60zM0 60h2V0H0v60zM54 60h2V0h-2v60z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    backgroundSize: '24px 24px', // Adjust size for desired density
                }}
            ></div>

            <div className="w-full flex flex-col items-center relative z-10">
                <motion.main
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="bg-white/75 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl shadow-blue-200/40 w-full max-w-7xl mx-auto border border-blue-100 relative overflow-hidden"
                >
                    {/* Subtle Brand Element in Corner - Increased opacity and shadow for depth */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/15 to-transparent rounded-bl-[50px] opacity-70 blur-sm pointer-events-none shadow-inner shadow-blue-300"></div>

                    {/* Dashboard Header */}
                    <motion.div variants={itemVariants} className="text-center mb-12 relative z-10">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800">WebSyra</span> Insights Dashboard
                        </h1>
                        <p className="text-gray-700 text-lg max-w-xl mx-auto opacity-90 font-medium">
                            Your comprehensive and intuitive operational overview.
                        </p>
                    </motion.div>

                    {/* Main Content Grid (Top 3 Summaries + Revenue Chart) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Column 1: Core Metrics (3 Cards) */}
                        <div className="lg:col-span-1 flex flex-col gap-6">
                            {summaryCards.map((card, i) => (
                                <motion.div key={i} variants={itemVariants} className={`${cardBgGradient} rounded-2xl shadow-lg shadow-gray-100/50 p-6 border border-blue-100/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="text-gray-600 text-sm font-semibold mb-1">{card.title}</p>
                                            <p className="text-3xl font-extrabold text-gray-900 leading-none">{card.value}</p>
                                        </div>
                                        <div className={`bg-${card.iconColor}-100 p-3 rounded-xl flex items-center justify-center text-${card.iconColor}-700 shadow-md`}>
                                            {card.icon}
                                        </div>
                                    </div>
                                    <p className={`text-${card.color}-700 text-sm font-medium flex items-center gap-1`}>
                                        {card.color === 'green' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                                        {card.trend}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Column 2: Revenue Trend Chart (Larger) */}
                        <motion.div variants={itemVariants} className={`${cardBgGradient} lg:col-span-2 rounded-2xl shadow-lg shadow-gray-100/50 p-6 border border-blue-100/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                <LineChartIcon className="w-6 h-6 text-blue-700" /> Monthly Revenue Trend
                            </h2>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={revenueData}
                                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            {/* Enhanced gradient for the area fill */}
                                            <linearGradient id="colorRevenueArea" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#8884d8" stopOpacity={0.3} /> {/* Start higher opacity */}
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.05} /> {/* End lower opacity */}
                                            </linearGradient>
                                            {/* Gradient for the line stroke */}
                                            <linearGradient id="colorRevenueLine" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#4a90e2" /> {/* Start blue */}
                                                <stop offset="100%" stopColor="#9b59b6" /> {/* End purple */}
                                            </linearGradient>
                                            {/* Gradient for the dot fill */}
                                            <linearGradient id="colorDotFill" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#4a90e2" />
                                                <stop offset="100%" stopColor="#9b59b6" />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" vertical={false} opacity={0.8} /> {/* Slightly more visible grid */}
                                        <XAxis dataKey="name" stroke="#6b7280" tickLine={false} axisLine={false} />
                                        <YAxis stroke="#6b7280" tickFormatter={(value) => `₹${value / 1000}k`} tickLine={false} axisLine={false} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ paddingTop: '15px' }} iconType="circle" />
                                        <Area
                                            type="monotone"
                                            dataKey="Revenue"
                                            stroke="url(#colorRevenueLine)"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorRevenueArea)"
                                            // Animate the line and dots
                                            dot={(
                                                <motion.circle
                                                    cx={0} cy={0} r={5}
                                                    fill="url(#colorDotFill)" // Use gradient for dot fill
                                                    stroke="white" strokeWidth={2}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.3, delay: 0.5 }}
                                                />
                                            )}
                                            activeDot={(
                                                <motion.circle
                                                    cx={0} cy={0} r={7}
                                                    fill="white"
                                                    stroke="#4a90e2" strokeWidth={3}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>

                    {/* NEW: Dedicated Balances Section (Side-by-Side) */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                            <Wallet className="w-6 h-6 text-green-700" /> Financial Overview
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {balanceData.map((card, i) => (
                                <motion.div key={i} variants={itemVariants} className={`${cardBgGradient} rounded-2xl shadow-lg shadow-gray-100/50 p-6 border border-blue-100/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-gray-600 text-base font-semibold">{card.title}</p>
                                        <div className={`bg-${card.iconColor}-100 p-2 rounded-xl flex items-center justify-center text-${card.iconColor}-700 shadow-sm`}>
                                            <Wallet className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-extrabold text-gray-900 leading-tight mb-1">{card.value}</p>
                                    <p className="text-gray-600 text-sm">{card.context}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Actions & Recent Activities Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Quick Actions (Column 1/3 on large screens) */}
                        <motion.div variants={itemVariants} className={`${cardBgGradient} rounded-2xl shadow-lg shadow-gray-100/50 p-6 lg:col-span-1 border border-blue-100/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                <Plus className="w-6 h-6 text-indigo-700" /> Quick Actions
                            </h2>
                            <div className="grid grid-cols-1 gap-3">
                                {quickActions.map((action, i) => (
                                    <button
                                        key={i}
                                        className={`w-full flex items-center justify-start space-x-3 bg-${action.color}-50 hover:bg-${action.color}-100 text-${action.color}-700 px-4 py-3 rounded-xl transition duration-200 font-medium hover:shadow-sm`}
                                    >
                                        {action.icon}
                                        <span>{action.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Activities Section - (Column 2/3 on large screens) */}
                        <motion.div variants={itemVariants} className={`${cardBgGradient} rounded-2xl shadow-lg shadow-gray-100/50 p-6 lg:col-span-2 border border-blue-100/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                <CalendarDays className="w-6 h-6 text-purple-700" /> Recent Activities
                            </h2>
                            <div className="space-y-4">
                                {recentActivities.map((a, i) => (
                                    <div key={i} className="flex items-start space-x-4 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                                        <div className={`bg-${a.color}-50 p-2 rounded-full flex-shrink-0 text-${a.color}-700 shadow-sm`}>
                                            {a.icon}
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-medium text-gray-800">{a.title}</p>
                                            <p className="text-sm text-gray-600">{a.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.main>
            </div>
        </div>
    );
};

export default ERPDashboardBalancesRefined;