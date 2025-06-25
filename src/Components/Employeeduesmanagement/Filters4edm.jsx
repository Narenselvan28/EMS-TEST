import React, { useState } from 'react';
import ConfirmResetModal from '../../essentials/ConfirmResetModel';
const Filters = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const [dueType, setDueType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleResetClick = () => {
        setShowModal(true);
    };

    const handleConfirmReset = () => {
        setSearchTerm('');
        setStatus('');
        setDueType('');
        setStartDate('');
        setEndDate('');
        setShowModal(false);
    };

    const handleCancelReset = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-6">
                {/* Filter Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Search by Name or Emp ID
                        </label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="e.g., John / E012"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
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
                            value={dueType}
                            onChange={(e) => setDueType(e.target.value)}
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
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end mt-6">
                    <div className="space-x-2">
                        <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg transition hover:bg-indigo-700">
                            Apply
                        </button>
                        <button
                            onClick={handleResetClick}
                            className="px-5 py-2 bg-red-600 text-white border border-red-400 rounded-lg transition hover:bg-red-700"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirm Reset Modal */}
            <ConfirmResetModal
                isOpen={showModal}
                onConfirm={handleConfirmReset}
                onCancel={handleCancelReset}
            />
        </>
    );
};

export default Filters;
