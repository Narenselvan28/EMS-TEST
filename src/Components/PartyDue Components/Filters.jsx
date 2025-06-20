import React, { useState } from 'react';

const Filters = ({ onApplyFilters, onResetFilters }) => {
    const [partyName, setPartyName] = useState('');
    const [status, setStatus] = useState('');
    const [dueType, setDueType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleApply = () => {
        onApplyFilters({ partyName, status, dueType, startDate, endDate });
    };

    const handleReset = () => {
        setPartyName('');
        setStatus('');
        setDueType('');
        setStartDate('');
        setEndDate('');
        onResetFilters();
    };

    return (
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-6">
            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Search */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Party Name</label>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        defaultValue=""
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="" disabled>Select status</option>
                        <option>All Dues</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Overdue</option>
                    </select>
                </div>

                {/* Due Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Type</label>
                    <select
                        defaultValue=""
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="" disabled>Select due type</option>
                        <option>All</option>
                        <option>Credit</option>
                        <option>Debit</option>
                    </select>
                </div>

                {/* Date Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <div className="flex space-x-2">
                        <input
                            type="date"
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                            type="date"
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6">
                <div className="space-x-2">
                    <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg transition">Apply</button>
                    <button className="px-5 py-2 bg-red-600 text-white border border-red-400 rounded-lg transition">Reset</button>
                </div>
            </div>
        </div>


    );
};

export default Filters;
