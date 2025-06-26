import React, { useState } from 'react';
import Header from './MasterpageComponents/PartyMasterComponents/PartyMasterComponents/header';
import PartyFilters from './MasterpageComponents/PartyMasterComponents/PartyMasterComponents/PartyFilters';
import Pagination from '../../essentials/pagination4all';

const PartyMasterPage = () => {
    const allParties = [
        {
            partyId: 'PTY-1001',
            partyName: 'ABC Textiles',
            contactPerson: 'Ramesh Kumar',
            contact: '9876543210',
            gstNo: '33ABCDE1234F1Z5',
            state: 'Tamil Nadu',
            district: 'Coimbatore',
            status: 'Active',
        },
        {
            partyId: 'PTY-1002',
            partyName: 'XYZ Fabrics',
            contactPerson: 'Suresh Patel',
            contact: '8765432109',
            gstNo: '24XYZW65678H910',
            state: 'Gujarat',
            district: 'Ahmedabad',
            status: 'Active',
        },
        {
            partyId: 'PTY-1003',
            partyName: 'PQR Yarns',
            contactPerson: 'Arun Sharma',
            contact: '7654321098',
            gstNo: '29PQRS3456E7F8',
            state: 'Punjab',
            district: 'Ludhiana',
            status: 'Inactive',
        },
        {
            partyId: 'PTY-1004',
            partyName: 'LMN Textile Mills',
            contactPerson: 'Priya Iyer',
            contact: '6543210987',
            gstNo: '32LMNOP7890Q1R2',
            state: 'Maharashtra',
            district: 'Mumbai',
            status: 'Active',
        },
        {
            partyId: 'PTY-1005',
            partyName: 'DEF Garments',
            contactPerson: 'Neha Gupta',
            contact: '5432109876',
            gstNo: '07DEFGH2345I6J7',
            state: 'Delhi',
            district: 'Central',
            status: 'Active',
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

    // Moved above JSX call
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

    return (
        <div className="min-h-screen px-8 py-6 space-y-6 bg-gray-50">
            <Header />
            <PartyFilters onApplyFilters={applyFilters} onResetFilters={handleReset} />

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Party Code</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Party Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Contact Person</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">GST No</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">State</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-bold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {paginatedParties.map((party, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-semibold text-gray-700">{party.partyId}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{party.partyName}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{party.contactPerson}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{party.contact}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{party.gstNo}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{party.state}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusStyle(party.status)}`}>
                                        {party.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2 text-lg">
                                        <button className="text-blue-600 hover:text-blue-800" title="Edit">✏️</button>
                                        <button className="text-red-600 hover:text-red-800" title="Delete">🗑️</button>
                                        <button className="text-gray-600 hover:text-gray-800" title="Info">ℹ️</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};

export default PartyMasterPage;
