import React from 'react';

function VendorTable({ vendors = [] }) {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            case 'on_hold':
                return 'bg-yellow-100 text-yellow-800';
            case 'blacklisted':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GST</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {vendors.map((vendor) => (
                        <tr key={vendor.code} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{vendor.code}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{vendor.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{vendor.category}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{vendor.contact}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{vendor.phone}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{vendor.gst}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(vendor.status)}`}>
                                    {vendor.status.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex space-x-2 justify-end">
                                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                    <button className="text-red-600 hover:text-red-800">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VendorTable;
