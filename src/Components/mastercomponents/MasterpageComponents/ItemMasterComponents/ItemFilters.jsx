import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faUndo, faTimes } from '@fortawesome/free-solid-svg-icons';

const ItemFilters = ({
    onApplyFilters,
    onResetFilters,
    categories = ['Raw Materials', 'Finished Goods', 'Consumables', 'Spares']
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

    // Color definitions based on #3182CE
    const colors = {
        primary: '#3182CE',
        primaryLight: '#EBF5FF',
        primaryDark: '#2C5282',
        border: '#E2E8F0',
        text: '#2D3748',
        textLight: '#4A5568'
    };

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

    // Custom confirmation modal component
    const ConfirmResetModal = ({ isOpen, onConfirm, onCancel, title, message }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl" style={{ borderColor: colors.border }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold" style={{ color: colors.text }}>{title}</h3>
                        <button
                            onClick={onCancel}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <p className="text-gray-600 mb-6">{message}</p>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                            style={{ color: colors.text }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 text-white rounded-lg transition"
                            style={{ backgroundColor: colors.primary, hoverBgColor: colors.primaryDark }}
                        >
                            Confirm Reset
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden" style={{ borderColor: colors.border, borderWidth: '1px' }}>
                {/* Header */}
                <div className="flex items-center p-4" style={{ backgroundColor: colors.primaryLight }}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg text-white mr-3" style={{ backgroundColor: colors.primary }}>
                        <FontAwesomeIcon icon={faFilter} className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold" style={{ color: colors.primaryDark }}>Filter Items</h2>
                        <p className="text-xs" style={{ color: colors.textLight }}>Refine your item search</p>
                    </div>
                </div>

                {/* Filter Content - Always Visible */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {/* Search Input */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Search Items</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="search"
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                    placeholder="Search by name or item code"
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg focus:outline-none transition"
                                    style={{
                                        borderColor: colors.border,
                                        backgroundColor: '#F7FAFC',
                                        focusRingColor: colors.primary
                                    }}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FontAwesomeIcon icon={faSearch} style={{ color: colors.textLight }} className="h-5 w-5" />
                                </div>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Category</label>
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2.5 rounded-lg focus:outline-none transition"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: '#F7FAFC',
                                    focusRingColor: colors.primary
                                }}
                            >
                                <option value="All">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Status</label>
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2.5 rounded-lg focus:outline-none transition"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: '#F7FAFC',
                                    focusRingColor: colors.primary
                                }}
                            >
                                <option value="All">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Stock Status Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Stock Status</label>
                            <select
                                name="stockStatus"
                                value={filters.stockStatus}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2.5 rounded-lg focus:outline-none transition"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: '#F7FAFC',
                                    focusRingColor: colors.primary
                                }}
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
                            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>SGST Rate</label>
                            <input
                                type="number"
                                name="sgst"
                                value={filters.sgst}
                                onChange={handleFilterChange}
                                placeholder="Filter by SGST %"
                                className="w-full px-3 py-2.5 rounded-lg focus:outline-none transition"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: '#F7FAFC',
                                    focusRingColor: colors.primary
                                }}
                            />
                        </div>

                        {/* CGST Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>CGST Rate</label>
                            <input
                                type="number"
                                name="cgst"
                                value={filters.cgst}
                                onChange={handleFilterChange}
                                placeholder="Filter by CGST %"
                                className="w-full px-3 py-2.5 rounded-lg focus:outline-none transition"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: '#F7FAFC',
                                    focusRingColor: colors.primary
                                }}
                            />
                        </div>
                    </div>

                    {/* Active filters indicator */}
                    <div className="flex items-center mb-4">
                        <span className="text-sm mr-2" style={{ color: colors.textLight }}>Active filters:</span>
                        <div className="flex flex-wrap gap-2">
                            {filters.search && (
                                <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                                    Search: {filters.search}
                                </span>
                            )}
                            {filters.category !== 'All' && (
                                <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                                    Category: {filters.category}
                                </span>
                            )}
                            {filters.status !== 'All' && (
                                <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                                    Status: {filters.status}
                                </span>
                            )}
                            {filters.stockStatus !== 'All' && (
                                <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                                    Stock: {filters.stockStatus}
                                </span>
                            )}
                            {filters.sgst && (
                                <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                                    SGST: {filters.sgst}%
                                </span>
                            )}
                            {filters.cgst && (
                                <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                                    CGST: {filters.cgst}%
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4" style={{ borderTopColor: colors.border, borderTopWidth: '1px' }}>
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="px-5 py-2.5 rounded-lg transition flex items-center font-medium"
                            style={{
                                backgroundColor: colors.primaryLight,
                                color: colors.primaryDark,
                                hoverBgColor: '#DBEAFE'
                            }}
                        >
                            <FontAwesomeIcon icon={faUndo} className="mr-2" />
                            <span>Reset All</span>
                        </button>
                        <button
                            onClick={handleApply}
                            className="px-5 py-2.5 text-white rounded-lg transition flex items-center font-medium shadow-sm"
                            style={{
                                backgroundColor: colors.primary,
                                hoverBgColor: colors.primaryDark
                            }}
                        >
                            <FontAwesomeIcon icon={faFilter} className="mr-2" />
                            <span>Apply Filters</span>
                        </button>
                    </div>
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