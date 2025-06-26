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
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Inactive': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

  const getDueClass = (balance) => {
    const num = parseFloat(balance);
    if (num > 0) return 'bg-red-100 text-red-700';
    if (num < 0) return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-700';
};

    const formatBalance = (balance) => {
        if (balance === 0) return 'No Due';
        if (balance > 0) return `Debit`;
        return `Credit`;
    };

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-xs text-gray-600 uppercase font-bold">
                    <tr>
                        <th className="px-6 py-3">Party Code</th>
                        <th className="px-6 py-3">Party Name</th>
                        <th className="px-6 py-3">Contact</th>
                        <th className="px-6 py-3">GST No</th>
                        <th className="px-6 py-3">State</th>
                        <th className="px-6 py-3">Balance</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {parties.map((party, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{party.partyId}</td>
                            <td className="px-6 py-4">{party.partyName}</td>
                            <td className="px-6 py-4">{party.contact}</td>
                            <td className="px-6 py-4">{party.gstNo}</td>
                            <td className="px-6 py-4">{party.state}</td>
                            <td className="px-6 py-4">
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDueClass(party.balance)}`}>
                                    {formatBalance(party.balance)}
                                </span>
                            </td>
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
        </div>
    );
};

export default PartyTable;