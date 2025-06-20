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
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm mb-6 overflow-x-auto">
            {/* Top Filter Fields - Single Row */}
            <div className="flex gap-4 whitespace-nowrap">
                {/* Party Name */}
                <div className="min-w-[240px]">
                    <label htmlFor="partyName" className="block text-sm font-medium text-gray-700 mb-1">Party Name</label>
                    <input
                        type="text"
                        id="partyName"
                        placeholder="Search..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={partyName}
                        onChange={(e) => setPartyName(e.target.value)}
                    />
                </div>

                {/* Status */}
                <div className="min-w-[180px]">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        id="status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="" disabled>Select status</option>
                        <option>All Dues</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Overdue</option>
                    </select>
                </div>

                {/* Due Type */}
                <div className="min-w-[180px]">
                    <label htmlFor="dueType" className="block text-sm font-medium text-gray-700 mb-1">Due Type</label>
                    <select
                        id="dueType"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={dueType}
                        onChange={(e) => setDueType(e.target.value)}
                    >
                        <option value="" disabled>Select due type</option>
                        <option>All</option>
                        <option>Credit</option>
                        <option>Debit</option>
                    </select>
                </div>

                {/* Date Range */}
                <div className="min-w-[270px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <div className="flex space-x-2">
                        <input
                            type="date"
                            className="w-[50%] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            className="w-[50%] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Buttons Row */}
            <div className="flex justify-end mt-4">
                <div className="space-x-2">
                    <button
                        onClick={handleApply}
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
