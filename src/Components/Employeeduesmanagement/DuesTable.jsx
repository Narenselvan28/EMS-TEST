// src/components/DuesTable.js
import React from 'react';

const DuesTable = ({ dues }) => (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Employee Dues Records</h2>
            <div className="flex space-x-3">
                <button className="px-3 py-1.5 border rounded-lg text-sm font-medium hover:bg-gray-50">Export</button>
                <button className="px-3 py-1.5 border rounded-lg text-sm font-medium hover:bg-gray-50">Filter</button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {['Employee ID', 'Name', 'Department', 'Due Type', 'Amount', 'Due Date', 'Status', 'Actions'].map(header => (
                            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {dues.map((due, i) => (
                        <tr key={i}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{due.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{due.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{due.department}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{due.type}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{due.amount}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{due.date}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor(due.status)}`}>
                                    {due.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-medium">
                                <button className="text-primary hover:text-secondary mr-3">View</button>
                                <button className="text-gray-600 hover:text-gray-900">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const statusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'paid':
            return 'bg-green-100 text-green-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'overdue':
            return 'bg-red-100 text-red-800';
        case 'partial':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default DuesTable;
