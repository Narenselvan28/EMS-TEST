import React, { useState } from 'react';
import Pagination from '../PartyDue Components/Pagination'; // Make sure path is correct
import { useNavigate } from 'react-router-dom';

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
    }
];

const VendorCards = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
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
    const navigate = useNavigate()
    function handlenavigate(){
        navigate('/vendor-details')
    }
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentItems.map((vendor, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                    >
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{vendor.name}</h3>
                                    <p className="text-sm text-gray-500">{vendor.code}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(vendor.status)}`}>
                                    {vendor.status}
                                </span>
                            </div>

                            <div className="mt-4 space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Contact</span>
                                    <span className="font-medium">{vendor.contact}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Due Amount</span>
                                    <span className="font-medium">{vendor.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Due Date</span>
                                    <span className="font-medium">{vendor.due}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-3">
                            {vendor.status.toLowerCase() === 'overdue' && (
                                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                                    Send Reminder
                                </button>
                            )}
                            <button onClick={handlenavigate} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ Pagination Integration */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}
        </div>
    );
};

export default VendorCards;
