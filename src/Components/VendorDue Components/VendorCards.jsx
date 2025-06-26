import React, { useState, useMemo } from 'react';
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
        status: 'Paid' // This will be filtered out
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
        name: 'Oceanic Distributors', // Added a new vendor to have more than 6 eligible cards
        code: '#VDR-7890',
        amount: '$4,500.00',
        due: '10 Jul 2023',
        contact: '+1 999 000 111',
        type: 'Credit',
        status: 'Pending'
    },
    {
        name: 'Elite Solutions', // Added another new vendor
        code: '#VDR-1122',
        amount: '$9,000.00',
        due: '01 Aug 2023',
        contact: '+1 123 987 654',
        type: 'Debit',
        status: 'Overdue'
    },
    {
        name: 'Harvest Farms', // Added another new vendor (making 7 non-paid)
        code: '#VDR-3344',
        amount: '$700.00',
        due: '20 Jul 2023',
        contact: '+1 234 567 890',
        type: 'Credit',
        status: 'Pending'
    }
];

const VendorCards = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const navigate = useNavigate();

    // Use useMemo to filter and sort vendors only when 'vendors' array changes
    const filteredAndSortedVendors = useMemo(() => {
        // 1. Filter: Keep only 'Overdue' and 'Pending' statuses
        const filtered = vendors.filter(
            (vendor) =>
                vendor.status.toLowerCase() === 'overdue' ||
                vendor.status.toLowerCase() === 'pending'
        );

        // 2. Sort: 'Overdue' first, then 'Pending'
        const sorted = [...filtered].sort((a, b) => {
            const statusOrder = { overdue: 1, pending: 2 };
            return statusOrder[a.status.toLowerCase()] - statusOrder[b.status.toLowerCase()];
        });

        return sorted;
    }, [vendors]); // Recalculate only if the 'vendors' array reference changes

    const totalPages = Math.ceil(filteredAndSortedVendors.length / itemsPerPage);

    const currentItems = filteredAndSortedVendors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusClasses = (status) => {
        switch (status.toLowerCase()) { // Use toLowerCase for consistent matching
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'overdue': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800'; // Fallback, though should not be hit for filtered list
        }
    };

    function handlenavigate() {
        navigate('/vendor-details');
    }

    return (
        <div className="space-y-6 p-4"> {/* Added padding to the main div */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Check if there are any items to display after filtering */}
                {currentItems.length > 0 ? (
                    currentItems.map((vendor) => (
                        <div
                            // Use a unique and stable key like vendor.code
                            // if vendor.code is truly unique for each vendor.
                            key={vendor.code}
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
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-600 text-lg py-10">
                        No overdue or pending vendor dues found.
                    </p>
                )}
            </div>

            {/* Pagination is shown only if the number of filtered cards is greater than itemsPerPage (6) */}
            {filteredAndSortedVendors.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};

export default VendorCards;
