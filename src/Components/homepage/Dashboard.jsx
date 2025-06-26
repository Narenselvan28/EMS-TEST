import React from 'react';
import { motion } from "framer-motion";
import {
    CheckCircle,
    AlertTriangle,
    UserPlus,
    ReceiptText,
    Plus,
    Package,
    Database,
    LineChart as LineChartIcon, 
    PieChart as PieChartIcon 
} from 'lucide-react';
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

const ERPDashboard = () => {
    // Animation variants for staggered cards/sections
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
        { name: 'Jan', Revenue: 12000 },
        { name: 'Feb', Revenue: 19000 },
        { name: 'Mar', Revenue: 15000 },
        { name: 'Apr', Revenue: 20000 },
        { name: 'May', Revenue: 18000 },
        { name: 'Jun', Revenue: 24000 },
    ];

    // Data for the Pie Chart (Sales by Region)
    const salesData = [
        { name: 'North', value: 8000 },
        { name: 'South', value: 12000 },
        { name: 'East', value: 6000 },
        { name: 'West', value: 9000 },
    ];

    // Colors for the Pie Chart slices
    const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Blues, greens, yellows, oranges

    return (
        // Outermost container maintains full screen height and background
        <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-teal-50 min-h-screen text-gray-800 p-4 sm:p-8 md:p-10 font-inter flex justify-center items-start w-screen">
            {/* Wrapper for scaling all content - removed fixed scale to improve responsiveness */}
            <div className="w-full flex flex-col items-center">
                {/* Main Content Container with Glassmorphism Effect */}
                <motion.main
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="bg-white/70 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-7xl mx-auto border border-gray-100"
                >
                    {/* Dashboard Header with WebSyra Branding */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">WebSyra</span> Dashboard Overview
                        </h1>
                        <p className="text-gray-600 text-md max-w-xl mx-auto">
                            A quick glance at your business performance and key metrics. Powered by WebSyra.
                        </p>
                    </div>

                    {/* Summary Cards */}
                    <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { title: 'Total Revenue', value: '$24,580', trend: '↑ 12% vs last month', color: 'green', iconColor: 'blue', icon: '💰' },
                            { title: 'Pending Orders', value: '56', trend: '↓ 5% vs last month', color: 'red', iconColor: 'orange', icon: '📦' },
                            { title: 'Low Stock Items', value: '8', trend: 'Check inventory', color: 'red', iconColor: 'red', icon: '⚠️' },
                            { title: 'Open Tasks', value: '14', trend: '3 overdue', color: 'amber', iconColor: 'purple', icon: '📝' },
                        ].map((card, i) => (
                            <motion.div key={i} variants={itemVariants} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-sm">{card.title}</p>
                                        <p className="text-2xl font-bold mt-1 text-gray-800">{card.value}</p>
                                        <p className={`text-${card.color}-600 text-sm mt-1`}>{card.trend}</p>
                                    </div>
                                    <div className={`bg-${card.iconColor}-100 p-3 rounded-xl text-xl flex items-center justify-center`}>{card.icon}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Metrics Sections with Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Monthly Revenue Trend - Line Chart */}
                        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                <LineChartIcon className="w-6 h-6 text-blue-500" /> Monthly Revenue Trend
                            </h2>
                            <div className="h-64 w-full"> {/* Responsive container for chart */}
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={revenueData}
                                        margin={{
                                            top: 5, right: 30, left: 20, bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                        <XAxis dataKey="name" stroke="#6b7280" />
                                        <YAxis stroke="#6b7280" />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '10px', border: '1px solid #e0e0e0', padding: '10px' }}
                                            labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                                            itemStyle={{ color: '#374151' }}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                                        <Line type="monotone" dataKey="Revenue" stroke="#3b82f6" activeDot={{ r: 8 }} strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Sales by Region - Pie Chart */}
                        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                <PieChartIcon className="w-6 h-6 text-teal-500" /> Sales by Region
                            </h2>
                            <div className="h-64 w-full"> {/* Responsive container for chart */}
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={salesData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={90}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {
                                                salesData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                                ))
                                            }
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '10px', border: '1px solid #e0e0e0', padding: '10px' }}
                                            labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                                            itemStyle={{ color: '#374151' }}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>

                    {/* Recent Activities & Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Activities */}
                        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md p-6 lg:col-span-2 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activities</h2>
                            <div className="space-y-4">
                                {[
                                    { title: 'Order #1234 completed', time: '2 minutes ago', color: 'green', icon: <CheckCircle /> },
                                    { title: 'Low stock: Product A', time: '30 minutes ago', color: 'red', icon: <AlertTriangle /> },
                                    { title: 'New employee onboarded', time: '2 hours ago', color: 'blue', icon: <UserPlus /> },
                                    { title: 'Invoice #9876 paid', time: '4 hours ago', color: 'purple', icon: <ReceiptText /> },
                                ].map((a, i) => (
                                    <div key={i} className="flex items-start space-x-3">
                                        <div className={`bg-${a.color}-100 p-2 rounded-full flex-shrink-0 text-${a.color}-600`}>
                                            {a.icon}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700">{a.title}</p>
                                            <p className="text-sm text-gray-500">{a.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
                            {[
                                { label: 'New Order', color: 'indigo', icon: <Plus className="w-5 h-5" /> },
                                { label: 'Generate Report', color: 'green', icon: <LineChartIcon className="w-5 h-5" /> },
                                { label: 'Check Inventory', color: 'amber', icon: <Package className="w-5 h-5" /> },
                                { label: 'Add Master Data', color: 'purple', icon: <Database className="w-5 h-5" /> },
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    className={`w-full flex items-center justify-center space-x-3 bg-${action.color}-50 hover:bg-${action.color}-100 text-${action.color}-700 px-4 py-3 rounded-xl transition mb-2 font-medium hover:shadow-sm`}
                                >
                                    {action.icon}
                                    <span>{action.label}</span>
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </motion.main>
            </div>
        </div>
    );
};

export default ERPDashboard;
