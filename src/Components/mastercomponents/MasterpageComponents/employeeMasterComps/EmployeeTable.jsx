import React, { useState } from 'react';

const EmployeeTable = ({ data = [], itemsPerPage = 5 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            {['Emp Code', 'Name', 'Department', 'Role', 'Phone', 'Status', 'Actions'].map(header => (
                                <th
                                    key={header}
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {paginatedData.map((emp, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{emp.code}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{emp.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{emp.dept}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{emp.role}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{emp.phone}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                                        emp.status === 'Active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end space-x-3">
                                        <button className="text-blue-600 hover:text-blue-800" title="Edit">✏️</button>
                                        <button className="text-red-600 hover:text-red-800" title="Delete">🗑️</button>
                                        <button className="text-gray-600 hover:text-gray-800" title="View">👁️</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* No data */}
                {data.length === 0 && (
                    <div className="text-center py-6 text-sm text-gray-500">
                        No matching employees found.
                    </div>
                )}
            </div>

            {/* Pagination */}
            {data.length > itemsPerPage && (
                <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50 text-sm text-gray-600">
                    <span>
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
                    </span>
                    <div className="space-x-2">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 border rounded-md ${
                                currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
                            }`}
                        >
                            Prev
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 border rounded-md ${
                                currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeTable;
