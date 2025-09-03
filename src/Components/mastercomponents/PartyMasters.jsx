import React, { useState } from 'react';
import Header from './MasterpageComponents/PartyMasterComponents/PartyMasterComponents/header';
import PartyFilters from './MasterpageComponents/PartyMasterComponents/PartyMasterComponents/PartyFilters';
import Pagination from '../../essentials/pagination4all';

const PartyMasterPage = () => {
    const allParties = [
        {
            partyId: 'PTY-1001',
            partyName: 'ABC Textiles',
            contact: '9876543210',
            gstNo: '33ABCDE1234F1Z5',
            state: 'Tamil Nadu',
            district: 'Coimbatore',
            status: 'Active',
            balance: 15000 // Positive = Debit (you owe them), Negative = Credit (they owe you)
        },
        {
            partyId: 'PTY-1002',
            partyName: 'XYZ Fabrics',
            contact: '8765432109',
            gstNo: '24XYZW65678H910',
            state: 'Gujarat',
            district: 'Ahmedabad',
            status: 'Active',
            balance: -5000 // Negative = Credit
        },
        {
            partyId: 'PTY-1003',
            partyName: 'PQR Yarns',
            contact: '7654321098',
            gstNo: '29PQRS3456E7F8',
            state: 'Punjab',
            district: 'Ludhiana',
            status: 'Inactive',
            balance: 0 // No due
        },
        {
            partyId: 'PTY-1004',
            partyName: 'LMN Textile Mills',
            contact: '6543210987',
            gstNo: '32LMNOP7890Q1R2',
            state: 'Maharashtra',
            district: 'Mumbai',
            status: 'Active',
            balance: 25000 // Debit
        },
        {
            partyId: 'PTY-1005',
            partyName: 'DEF Garments',
            contact: '5432109876',
            gstNo: '07DEFGH2345I6J7',
            state: 'Delhi',
            district: 'Central',
            status: 'Active',
            balance: -10000 // Credit
        },
    ];

    const [filters, setFilters] = useState({
        partyName: '',
        status: '',
        state: '',
        district: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleReset = () => {
        setFilters({ partyName: '', status: '', state: '', district: '' });
        setCurrentPage(1);
    };

    const applyFilters = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const filteredParties = allParties.filter((party) => {
        return (
            (!filters.partyName || party.partyName.toLowerCase().includes(filters.partyName.toLowerCase())) &&
            (!filters.status || party.status === filters.status) &&
            (!filters.state || party.state === filters.state) &&
            (!filters.district || party.district === filters.district)
        );
    });

    const totalPages = Math.ceil(filteredParties.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedParties = filteredParties.slice(startIndex, startIndex + itemsPerPage);

    const getStatusStyle = (status) => {
        return status === 'Active'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700';
    };

    const getDueDisplay = (balance) => {
        if (balance === 0) return 'No Due';
        if (balance > 0) return `₹${Math.abs(balance).toLocaleString('en-IN')} Debit`;
        return `₹${Math.abs(balance).toLocaleString('en-IN')} Credit`;
    };

    const getDueStyle = (balance) => {
        if (balance > 0) return 'bg-red-100 text-red-700'; // Debit
        if (balance < 0) return 'bg-green-100 text-green-700'; // Credit
        return 'bg-gray-100 text-gray-700'; // No due
    };

    return (
        <div className="min-h-screen px-4 md:px-8 py-6 space-y-6 bg-gray-50">
            <Header />
            <PartyFilters onApplyFilters={applyFilters} onResetFilters={handleReset} />

            {/* Stats Overview */}
            

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Party List</h3>
                    <span className="text-sm text-gray-500">
                        Showing {paginatedParties.length} of {filteredParties.length} parties
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GST No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedParties.map((party, index) => (
                                <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{party.partyId}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                <span className="text-blue-800 font-bold text-sm">
                                                    {party.partyName.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">{party.partyName}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{party.contact}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{party.gstNo}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{party.state}</div>
                                        <div className="text-xs text-gray-500">{party.district}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex text-xs leading-5 font-semibold px-2.5 py-0.5 rounded-full ${getDueStyle(party.balance)}`}>
                                            {getDueDisplay(party.balance)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex text-xs leading-5 font-semibold px-2.5 py-0.5 rounded-full ${getStatusStyle(party.status)}`}>
                                            {party.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end items-center space-x-2">
                                            <button className="text-blue-600 hover:text-blue-900 p-1.5 rounded-md hover:bg-blue-100 transition-colors" title="Edit">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button className="text-red-600 hover:text-red-900 p-1.5 rounded-md hover:bg-red-100 transition-colors" title="Delete">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-100 transition-colors" title="Info">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {paginatedParties.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No parties found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartyMasterPage;