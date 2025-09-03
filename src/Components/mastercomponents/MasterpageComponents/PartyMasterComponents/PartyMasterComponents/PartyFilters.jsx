import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faFilter,
    faUndo,
    faTimes,
    faBuilding,
    faPhone,
    faMapMarker,
    faIdCard,
    faMoneyBillWave,
    faUserCheck,
    faUserSlash
} from '@fortawesome/free-solid-svg-icons';

const PartyFilters = ({
    onApplyFilters,
    onResetFilters,
    states = ['Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'Rajasthan', 'Delhi', 'Uttar Pradesh']
}) => {
    // State for all filter fields
    const [filters, setFilters] = useState({
        search: '',
        state: 'All',
        status: 'All',
        balanceStatus: 'All',
        gstType: 'All',
        city: ''
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
            state: 'All',
            status: 'All',
            balanceStatus: 'All',
            gstType: 'All',
            city: ''
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
                            style={{ backgroundColor: colors.primary }}
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
                        <h2 className="text-lg font-semibold" style={{ color: colors.primaryDark }}>Filter Parties</h2>
                        <p className="text-xs" style={{ color: colors.textLight }}>Refine your party search</p>
                    </div>
                </div>

                {/* Filter Content - Always Visible */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {/* Search Input */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                                <FontAwesomeIcon icon={faSearch} className="mr-1" />
                                Search Parties
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="search"
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                    placeholder="Search by name or party code"
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg focus:outline-none transition"
                                    style={{
                                        borderColor: colors.border,
                                        backgroundColor: '#F7FAFC',
                                        focusRingColor: colors.primary
                                    }}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FontAwesomeIcon icon={faSearch} style={{ color: colors.textLight }} className="h-4 w-4" />
                                </div>
                            </div>
                        </div>

                        {/* State Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                                <FontAwesomeIcon icon={faMapMarker} className="mr-1" />
                                State
                            </label>
                            <select
                                name="state"
                                value={filters.state}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2.5 rounded-lg focus:outline-none transition"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: '#F7FAFC',
                                    focusRingColor: colors.primary
                                }}
                            >
                                <option value="All">All States</option>
                                {states.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                                <FontAwesomeIcon icon={faUserCheck} className="mr-1" />
                                Status
                            </label>
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
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Balance Status Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                                <FontAwesomeIcon icon={faMoneyBillWave} className="mr-1" />
                                Balance Status
                            </label>
                            <select
                                name="balanceStatus"
                                value={filters.balanceStatus}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2.5 rounded-lg focus:outline-none transition"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: '#F7FAFC',
                                    focusRingColor: colors.primary
                                }}
                            >
                                <option value="All">All Balance Types</option>
                                <option value="Debit">Debit (Owes Money)</option>
                                <option value="Credit">Credit (Has Credit)</option>
                                <option value="No Due">No Dues</option>
                            </select>
                        </div>

                        {/* GST Type Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                                <FontAwesomeIcon icon={faIdCard} className="mr-1" />
                                GST Type
                            </label>
                            <select
                                name="gstType"
                                value={filters.gstType}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2.5 rounded-lg focus:outline-none transition"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: '#F7FAFC',
                                    focusRingColor: colors.primary
                                }}
                            >
                                <option value="All">All GST Types</option>
                                <option value="Registered">GST Registered</option>
                                <option value="Unregistered">Non-GST</option>
                            </select>
                        </div>

                        {/* City Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                                <FontAwesomeIcon icon={faBuilding} className="mr-1" />
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={filters.city}
                                onChange={handleFilterChange}
                                placeholder="Filter by city"
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
                            {filters.state !== 'All' && (
                                <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                                    State: {filters.state}
                                </span>
                            )}
                            {filters.status !== 'All' && (
                                <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                                    Status: {filters.status}
                                </span>
                            )}
                            {filters.balanceStatus !== 'All' && (
                                <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                                    Balance: {filters.balanceStatus}
                                </span>
                            )}
                            {filters.gstType !== 'All' && (
                                <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                                    GST: {filters.gstType}
                                </span>
                            )}
                            {filters.city && (
                                <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                                    City: {filters.city}
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
                                color: colors.primaryDark
                            }}
                        >
                            <FontAwesomeIcon icon={faUndo} className="mr-2" />
                            <span>Reset All</span>
                        </button>
                        <button
                            onClick={handleApply}
                            className="px-5 py-2.5 text-white rounded-lg transition flex items-center font-medium shadow-sm"
                            style={{
                                backgroundColor: colors.primary
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

export default PartyFilters;