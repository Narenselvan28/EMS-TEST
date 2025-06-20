import React, { useState } from 'react';

const vendors = [
    {
        name: 'OfficeTech Solutions',
        code: '#VDR-2048',
        amount: '$3,450.00',
        due: '15 Jun 2023',
        contact: '+1 234 567 890',
        type: 'Credit',
        status: 'Pending'
    },
    {
        name: 'TechCloud Inc.',
        code: '#VDR-1932',
        amount: '$8,750.00',
        due: '10 Jun 2023',
        contact: '+1 987 654 321',
        type: 'Debit',
        status: 'Overdue'
    },
    {
        name: 'Facility Masters',
        code: '#VDR-1234',
        amount: '$5,000.00',
        due: '25 Jun 2023',
        contact: '+1 333 222 444',
        type: 'Credit',
        status: 'Paid'
    },
    {
        name: 'GreenFuel Pvt Ltd',
        code: '#VDR-8888',
        amount: '$6,000.00',
        due: '28 Jun 2023',
        contact: '+1 555 666 777',
        type: 'Credit',
        status: 'Overdue'
    },
    {
        name: 'Skyline Builders',
        code: '#VDR-5656',
        amount: '$2,800.00',
        due: '05 Jul 2023',
        contact: '+1 666 777 888',
        type: 'Debit',
        status: 'Pending'
    },
    {
        name: 'AquaPure Systems',
        code: '#VDR-2222',
        amount: '$1,200.00',
        due: '02 Jul 2023',
        contact: '+1 444 333 222',
        type: 'Debit',
        status: 'Pending'
    }, {
        name: 'Skyline Builders',
        code: '#VDR-5656',
        amount: '$2,800.00',
        due: '05 Jul 2023',
        contact: '+1 666 777 888',
        type: 'Debit',
        status: 'Pending'
    },
    {
        name: 'AquaPure Systems',
        code: '#VDR-2222',
        amount: '$1,200.00',
        due: '02 Jul 2023',
        contact: '+1 444 333 222',
        type: 'Debit',
        status: 'Pending'
    }
];

const VendorCards = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // 👈 now 6 cards per page

    const totalPages = Math.ceil(vendors.length / itemsPerPage);
    const currentItems = vendors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getStatusClasses = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Overdue': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentItems.map((vendor, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg shadow border border-gray-200 flex flex-col justify-between">
                        {/* Top Section */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
                                <p className="text-xs text-gray-400">{vendor.code}</p>
                            </div>
                            <div className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusClasses(vendor.status)}`}>
                                {vendor.status}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="mt-4 space-y-1 text-sm text-gray-700">
                            <p><strong>Due Amount:</strong> {vendor.amount}</p>
                            <p><strong>Due Date:</strong> {vendor.due}</p>
                            <p><strong>Contact:</strong> {vendor.contact}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex justify-end space-x-4 text-sm font-medium">
                            {vendor.status === 'Overdue' && (
                                <button className="text-red-600 hover:underline">Send Reminder</button>
                            )}
                            <button className="text-purple-600 hover:underline">View Details</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                                currentPage === i + 1
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VendorCards;
