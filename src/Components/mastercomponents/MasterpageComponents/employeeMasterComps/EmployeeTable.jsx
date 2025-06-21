import React from 'react';

const EmployeeTable = ({ data = [] }) => {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            {['Emp Code', 'Name', 'Department', 'Role', 'Phone', 'Status', 'Actions'].map(header => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {data.map((emp, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{emp.code}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{emp.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{emp.dept}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{emp.role}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{emp.phone}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${emp.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right flex space-x-2 justify-end">
                                    <button className="text-blue-600 hover:text-blue-800" title="Edit">✏️</button>
                                    <button className="text-red-600 hover:text-red-800" title="Delete">🗑️</button>
                                    <button className="text-gray-600 hover:text-gray-800" title="View">👁️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data.length === 0 && (
                    <div className="text-center py-6 text-sm text-gray-500">No matching employees found.</div>
                )}
            </div>
        </div>
    );
};

export default EmployeeTable;
