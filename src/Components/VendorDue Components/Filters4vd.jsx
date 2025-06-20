import React, { useState } from 'react';

const Filters = ({ onResetFilters }) => {
    const [status, setStatus] = useState('');
    const [vendor, setVendor] = useState('');
    const [dueType, setDueType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleReset = () => {
        const confirmed = window.confirm("Are you sure you want to reset all filters?");
        if (confirmed) {
            setStatus('');
            setVendor('');
            setDueType('');
            setStartDate('');
            setEndDate('');
            if (typeof onResetFilters === 'function') {
                onResetFilters();
            }
        }
    };

    return (
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm mb-6 overflow-x-auto">
            <div className="flex flex-wrap gap-4">
                {/* Vendor Search */}
                <div className="min-w-[200px]">
                    <label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                    <input
                        type="text"
                        id="vendor"
                        placeholder="Enter vendor name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={vendor}
                        onChange={(e) => setVendor(e.target.value)}
                    />
                </div>

                {/* Status Dropdown */}
                <div className="min-w-[180px]">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        id="status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Overdue</option>
                        <option>Disputed</option>
                    </select>
                </div>

                {/* Vendor Type Dropdown */}
                <div className="min-w-[180px]">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Vendor Type</label>
                    <select
                        id="type"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={dueType}
                        onChange={(e) => setDueType(e.target.value)}
                    >
                        <option value="">Select Type</option>
                        <option>Petrol Agencies</option>
                        <option>Maintenance</option>
                    </select>
                </div>

                {/* Date Range */}
                <div className="min-w-[260px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <div className="flex gap-2">
                        <input
                            type="date"
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Buttons (only Reset works) */}
            <div className="flex justify-end mt-4">
                <div className="space-x-2">
                    <button
                        className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition"
                    >
                        Apply
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-5 py-2 bg-red-600 text-white hover:bg-white hover:text-black border border-red-400 rounded-lg transition"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filters;
