import React, { useState } from 'react';
import ConfirmResetModal from '../../essentials/ConfirmResetModel';
const Filters = ({ onApplyFilters, onResetFilters }) => {
    const [partyName, setPartyName] = useState('');
    const [status, setStatus] = useState('');
    const [dueType, setDueType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [showResetModal, setShowResetModal] = useState(false);

    const handleApply = () => {
        onApplyFilters({ partyName, status, dueType, startDate, endDate });
    };

    const confirmReset = () => {
        setPartyName('');
        setStatus('');
        setDueType('');
        setStartDate('');
        setEndDate('');
        onResetFilters();
        setShowResetModal(false);
    };

    return (
        <>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-6">
                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Party Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Party Name</label>
                        <input
                            type="text"
                            placeholder="Search party..."
                            value={partyName}
                            onChange={(e) => setPartyName(e.target.value)}
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
                            <option value="">— Select Status —</option>
                            <option value="all">All Dues</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="overdue">Overdue</option>
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
                            <option value="">— Select Due Type —</option>
                            <option value="all">All</option>
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
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

                {/* Action Buttons */}
                <div className="flex justify-end mt-6">
                    <div className="space-x-2">
                        <button
                            onClick={handleApply}
                            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                        >
                            <i className="fas fa-filter mr-2"></i> Apply
                        </button>
                        <button
                            onClick={() => setShowResetModal(true)}
                            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                        >
                            <i className="fas fa-redo-alt mr-2"></i> Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirm Reset Modal */}
            <ConfirmResetModal
                isOpen={showResetModal}
                onCancel={() => setShowResetModal(false)}
                onConfirm={confirmReset}
            />
        </>
    );
};

export default Filters;
