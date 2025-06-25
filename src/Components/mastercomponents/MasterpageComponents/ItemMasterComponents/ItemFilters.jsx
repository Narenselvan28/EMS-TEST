import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ConfirmResetModal from '../../../../essentials/ConfirmResetModel';
const ItemFilters = ({
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
    onApplyFilters,
    onResetFilters
}) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleApply = () => {
        onApplyFilters({ search, category, status });
    };

    const handleResetConfirmed = () => {
        setSearch('');
        setCategory('All');
        setStatus('All');
        onResetFilters?.();
        setShowConfirm(false);
    };

    return (
        <>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Search Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search Items</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
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
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="All">All Categories</option>
                            <option value="Apparel">Apparel</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Utilities">Utilities</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
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
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="All">All Stock Statuses</option>
                            <option value="in_stock">In Stock</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                        </select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-6 space-x-2">
                    <button
                        onClick={handleApply}
                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center"
                    >
                        <span>Apply</span>
                    </button>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
                    >
                        <span>Reset</span>
                    </button>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmResetModal
                isOpen={showConfirm}
                onConfirm={handleResetConfirmed}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
};

export default ItemFilters;
