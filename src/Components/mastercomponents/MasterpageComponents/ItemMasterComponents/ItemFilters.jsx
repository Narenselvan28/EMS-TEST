import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faUndo } from '@fortawesome/free-solid-svg-icons';
import ConfirmResetModal from '../../../../essentials/ConfirmResetModel';

const ItemFilters = ({
    onApplyFilters,
    onResetFilters,
    categories = [] // Pass categories as prop from parent
}) => {
    // State for all filter fields
    const [filters, setFilters] = useState({
        search: '',
        category: 'All',
        status: 'All',
        stockStatus: 'All',
        sgst: '',
        cgst: ''
    });

    const [showConfirm, setShowConfirm] = useState(false);

    // Handle individual filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Apply all filters
    const handleApply = () => {
        onApplyFilters(filters);
    };

    // Reset all filters
    const handleResetConfirmed = () => {
        setFilters({
            search: '',
            category: 'All',
            status: 'All',
            stockStatus: 'All',
            sgst: '',
            cgst: ''
        });
        onResetFilters?.();
        setShowConfirm(false);
    };

    const handleCancelReset = () => {
        setShowConfirm(false);
    };

    return (
        <>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search Items</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                placeholder="Search by name or item code"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="All">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="All">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Stock Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                        <select
                            name="stockStatus"
                            value={filters.stockStatus}
                            onChange={handleFilterChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="All">All Stock Levels</option>
                            <option value="in_stock">In Stock</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="over_stock">Over Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                        </select>
                    </div>

                    {/* SGST Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SGST Rate</label>
                        <input
                            type="number"
                            name="sgst"
                            value={filters.sgst}
                            onChange={handleFilterChange}
                            placeholder="Filter by SGST %"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* CGST Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CGST Rate</label>
                        <input
                            type="number"
                            name="cgst"
                            value={filters.cgst}
                            onChange={handleFilterChange}
                            placeholder="Filter by CGST %"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        onClick={handleApply}
                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center"
                    >
                        <FontAwesomeIcon icon={faFilter} className="mr-2" />
                        <span>Apply Filters</span>
                    </button>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center"
                    >
                        <FontAwesomeIcon icon={faUndo} className="mr-2" />
                        <span>Reset All</span>
                    </button>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmResetModal
                isOpen={showConfirm}
                onConfirm={handleResetConfirmed}
                onCancel={handleCancelReset}
                title="Confirm Reset"
                message="Are you sure you want to reset all filters? This action cannot be undone."
            />
        </>
    );
};

export default ItemFilters;