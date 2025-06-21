import React, { useState } from 'react';

const PartyFilters = ({ onApplyFilters, onResetFilters }) => {
    const [partyName, setPartyName] = useState(''); // Re-added partyName state
    const [status, setStatus] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');

    const handleApply = () => {
        // Include partyName when applying filters
        onApplyFilters({ partyName, status, state, district });
    };

    const handleReset = () => {
        // Reset partyName state
        setPartyName('');
        setStatus('');
        setState('');
        setDistrict('');
        onResetFilters();
    };

    return (
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Party Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Party Name</label>
                    <input
                        type="text"
                        value={partyName}
                        onChange={(e) => setPartyName(e.target.value)}
                        placeholder="Search..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* State */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">All States</option>
                        <option>Tamil Nadu</option>
                        <option>Kerala</option>
                        <option>Karnataka</option>
                        <option>Andhra Pradesh</option>
                        <option>Gujarat</option>
                        <option>Punjab</option>
                        <option>Maharashtra</option>
                        <option>Delhi</option>
                    </select>
                </div>

                {/* District */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">All Districts</option>
                        <option>Coimbatore</option>
                        <option>Erode</option>
                        <option>Tiruppur</option>
                        <option>Salem</option>
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-6 space-x-2">
                <button
                    onClick={handleApply}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    Apply
                </button>
                <button
                    onClick={handleReset}
                    className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default PartyFilters;