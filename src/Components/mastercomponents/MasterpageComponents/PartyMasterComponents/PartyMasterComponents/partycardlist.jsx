import React from 'react';

const PartyTable = ({ parties = [] }) => {
    if (!Array.isArray(parties) || parties.length === 0) {
        return (
            <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md text-center">
                No party records found.
            </div>
        );
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-700';
            case 'Inactive':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-xs text-gray-600 uppercase font-bold">
                    <tr>
                        <th className="px-6 py-3">Party Code</th>
                        <th className="px-6 py-3">Party Name</th>
                        <th className="px-6 py-3">Contact Person</th>
                        <th className="px-6 py-3">Phone</th>
                        <th className="px-6 py-3">GST No</th>
                        <th className="px-6 py-3">State</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {parties.map((party, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{party.partyId}</td>
                            <td className="px-6 py-4">{party.partyName}</td>
                            <td className="px-6 py-4">{party.contactPerson}</td>
                            <td className="px-6 py-4">{party.contact}</td>
                            <td className="px-6 py-4">{party.gst}</td>
                            <td className="px-6 py-4">{party.state}</td>
                            <td className="px-6 py-4">
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusClass(party.status)}`}>
                                    {party.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end items-center space-x-3 text-lg">
                                    <button className="text-blue-600 hover:text-blue-800" title="Edit">✏️</button>
                                    <button className="text-red-600 hover:text-red-800" title="Delete">🗑️</button>
                                    <button className="text-gray-600 hover:text-gray-800" title="Details">ℹ️</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="px-6 py-3 text-sm text-gray-500 border-t">
                Showing 1 to {parties.length} of {parties.length} results
            </div>
        </div>
    );
};

export default PartyTable;
