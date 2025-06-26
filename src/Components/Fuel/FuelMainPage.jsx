import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaGasPump, FaCalendarAlt, FaTag, FaDrum, FaSearch, FaFilter,
    FaFileExport, FaPlus, FaEye, FaEdit, FaTrashAlt, FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';
import ConfirmModel from '../../essentials/ConfirmModel';
import { IoMdHome } from "react-icons/io";


const FuelExpensesManagement = () => {
    const navigate = useNavigate();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);

    const handleNewTransaction = () => {
        navigate('/fuelmanagement/addtransaction');
    };

    // Placeholder function for navigating back to home/dashboard
    const handleBackToHome = () => {
        navigate('/');
    };



    const handleDeleteClick = (transactionId) => {
        setTransactionToDelete(transactionId);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        // Here you would typically call an API to delete the transaction
        console.log('Deleting transaction:', transactionToDelete);
        setShowDeleteConfirm(false);
        setTransactionToDelete(null);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setTransactionToDelete(null);
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Fuel Expenses Management</h1>

                    <div className="flex space-x-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                            <FaFileExport className="mr-2" /> Export
                        </button>
                        <button
                            onClick={handleNewTransaction}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                        >
                            <FaPlus className="mr-2" /> New Transaction
                        </button>
                    </div>
                </div>  <nav className="flex items-center mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">

                        {/* Homepage */}
                        <li className="flex items-center ">
                            <button
                                onClick={handleBackToHome}
                                className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                            >
                                {/* Updated Home Icon */}
                                <p className='text-xl mb-1 mr-2 '><IoMdHome /></p>

                                Dashboard
                            </button>
                        </li>

                        {/* Arrow */}




                        {/* Arrow */}
                        <li>
                            <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                            </svg>
                        </li>

                        {/* Current Page */}
                        <li aria-current="page">
                            <span className="text-gray-700 font-medium">Fuel Management</span>
                        </li>
                    </ol>
                </nav>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Fuel Expenses</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">₹87,450.00</h3>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <FaGasPump className="text-blue-600 text-xl" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Across 32 vehicles</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">This Month</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">₹12,850.00</h3>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <FaCalendarAlt className="text-purple-600 text-xl" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">5% increase from last month</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Average per Liter</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">₹96.50</h3>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <FaTag className="text-green-600 text-xl" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Current market rate: ₹97.20</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Barrel Purchases</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">₹24,680.00</h3>
                            </div>
                            <div className="bg-orange-100 p-3 rounded-full">
                                <FaDrum className="text-orange-600 text-xl" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">8 barrel transactions</p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search vehicles/drivers"
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Vehicles</option>
                                <option>MH-12-AB-1234</option>
                                <option>DL-01-CD-5678</option>
                                <option>KA-05-EF-9012</option>
                                <option>TN-09-GH-3456</option>
                            </select>

                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Vendors</option>
                                <option>Bharat Petroleum</option>
                                <option>Indian Oil</option>
                                <option>HPCL</option>
                                <option>Shell India</option>
                            </select>

                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Time</option>
                                <option>Today</option>
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>Last Month</option>
                            </select>

                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                                <FaFilter className="mr-2" /> Apply filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Fuel Expenses Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Fuel Transactions</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Voucher No</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicle #</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Driver</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Vendor</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Qty (L)</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">15 Jun 2023</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">FUEL-1208</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">MH-12-AB-1234</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rajesh Kumar</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bharat Petroleum</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35.50</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹3,415.10</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3"><FaEye /></button>
                                        <button className="text-green-600 hover:text-green-900 mr-3"><FaEdit /></button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => handleDeleteClick('FUEL-1208')}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">14 Jun 2023</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">FUEL-1207</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">DL-01-CD-5678</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mohan Singh</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Indian Oil</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹4,023.60</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3"><FaEye /></button>
                                        <button className="text-green-600 hover:text-green-900 mr-3"><FaEdit /></button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => handleDeleteClick('FUEL-1207')}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">13 Jun 2023</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">FUEL-1206</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KA-05-EF-9012</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Suresh Patel</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Shell India</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28.75</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹2,803.13</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3"><FaEye /></button>
                                        <button className="text-green-600 hover:text-green-900 mr-3"><FaEdit /></button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => handleDeleteClick('FUEL-1206')}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">12 Jun 2023</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">FUEL-1205</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">TN-09-GH-3456</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Arun Joshi</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">HPCL</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹4,800.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3"><FaEye /></button>
                                        <button className="text-green-600 hover:text-green-900 mr-3"><FaEdit /></button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => handleDeleteClick('FUEL-1205')}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
                            <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">32</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Previous</span>
                                        <FaChevronLeft />
                                    </a>
                                    <a href="#" aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </a>
                                    <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>
                                    <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 3 </a>
                                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Next</span>
                                        <FaChevronRight />
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModel
                isOpen={showDeleteConfirm}
                title="Confirm Delete"
                message="Are you sure you want to delete this fuel transaction? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
};

export default FuelExpensesManagement;