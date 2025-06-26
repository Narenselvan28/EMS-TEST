import React, { useState } from 'react';

const EmployeeTable = ({ data = [], itemsPerPage = 5 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const getDueClass = (due) => {
        if (due === 'Credit') return 'bg-green-100 text-green-700';
        if (due === 'Debit') return 'bg-orange-100 text-orange-700';
        return 'bg-gray-100 text-gray-600';
    };

    const getStatusClass = (status) => {
        return status === 'Active'
            ? 'bg-green-200 text-green-900'
            : 'bg-red-200 text-red-800';
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 text-sm">
                    <thead className="bg-indigo-100  text-xs uppercase font-semibold tracking-wider">
                        <tr>
                            {['Emp Code', 'Name', 'Category', 'Group', 'Phone', 'Status', 'Employee Due', 'Actions'].map((header) => (
                                <th key={header} className="px-6 py-4 text-left">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {paginatedData.map((emp, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{emp.code}</td>
                                <td className="px-6 py-4 text-gray-800">{emp.name}</td>
                                <td className="px-6 py-4 text-gray-700">{emp.dept}</td>
                                <td className="px-6 py-4 text-gray-700">{emp.role}</td>
                                <td className="px-6 py-4 text-gray-700">{emp.phone}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(emp.status)}`}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getDueClass(emp.due)}`}>
                                        {emp.due}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-start space-x-3">
                                        <button className="text-[#002147] hover:text-indigo-700" title="Edit">
                                            ✏️
                                        </button>
                                        <button className="text-red-600 hover:text-red-800" title="Delete">
                                            🗑️
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-800" title="View">
                                            👁️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {data.length === 0 && (
                    <div className="text-center py-6 text-sm text-gray-500">
                        No matching employees found.
                    </div>
                )}
            </div>

            {/* Pagination */}
            {data.length > itemsPerPage && (
                <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50 text-sm text-gray-700">
                    <span>
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
                    </span>
                    <div className="space-x-2">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className={`px-4 py-1 rounded-md border transition ${currentPage === 1
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-white hover:bg-orange-50 border-orange-300'
                                }`}
                        >
                            Prev
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-1 rounded-md border transition ${currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-white hover:bg-green-50 border-green-300'
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
