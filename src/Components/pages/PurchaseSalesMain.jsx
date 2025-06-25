import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch, faFilter, faPlus, faFileExport, faEye, faEdit, faTrashAlt,
    faChevronLeft, faChevronRight, faEllipsisH,
    faDatabase, faBoxOpen, faTags, faLayerGroup, faBarcode, faStopwatch, faIndianRupeeSign
} from '@fortawesome/free-solid-svg-icons';

const PurchaseMain = () => {
    const navigate = useNavigate();
    // State for search and filter inputs
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedParty, setSelectedParty] = useState('All Parties');
    const [selectedStatus, setSelectedStatus] = useState('All Status');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // You can adjust this value

    // Dummy data for the table - expanded for pagination example
    const [transactions] = useState([
        { id: 1, invoice: '#INV-2023-0482', partyName: 'OfficeTech Solutions', itemName: 'Coconut without Husk', amount: 3450.00, orderType: 'Sale', approvalStatus: 'Pending', statusClass: 'bg-indigo-100 text-indigo-800' },
        { id: 2, invoice: '#INV-2023-0517', partyName: 'TechCloud Inc.', itemName: 'Coconut with Husk', amount: 8750.00, orderType: 'Purchase', approvalStatus: 'Rejected', statusClass: 'bg-red-100 text-red-800' },
        { id: 3, invoice: '#INV-2023-0495', partyName: 'Facility Masters', itemName: 'Copra', amount: 5200.00, orderType: 'Purchase', approvalStatus: 'Approved', statusClass: 'bg-green-100 text-green-800' },
        { id: 4, invoice: '#INV-2023-0523', partyName: 'Business Consultants', itemName: 'Coconut with Husk', amount: 4800.00, orderType: 'Sale', approvalStatus: 'Rejected', statusClass: 'bg-red-100 text-red-800' },
        { id: 5, invoice: '#INV-2023-0500', partyName: 'Green Harvest Co.', itemName: 'Copra', amount: 6100.00, orderType: 'Sale', approvalStatus: 'Approved', statusClass: 'bg-green-100 text-green-800' },
        { id: 6, invoice: '#INV-2023-0501', partyName: 'Agro Products Ltd.', itemName: 'Coconut Oil', amount: 12000.00, orderType: 'Purchase', approvalStatus: 'Pending', statusClass: 'bg-indigo-100 text-indigo-800' },
        { id: 7, invoice: '#INV-2023-0502', partyName: 'Fresh Farms Inc.', itemName: 'Desiccated Coconut', amount: 7500.00, orderType: 'Sale', approvalStatus: 'Approved', statusClass: 'bg-green-100 text-green-800' },
        { id: 8, invoice: '#INV-2023-0503', partyName: 'Global Distributors', itemName: 'Coconut Water', amount: 2500.00, orderType: 'Purchase', approvalStatus: 'Approved', statusClass: 'bg-green-100 text-green-800' },
        { id: 9, invoice: '#INV-2023-0504', partyName: 'Natural Health Co.', itemName: 'Virgin Coconut Oil', amount: 15000.00, orderType: 'Sale', approvalStatus: 'Pending', statusClass: 'bg-indigo-100 text-indigo-800' },
        { id: 10, invoice: '#INV-2023-0505', partyName: 'Food Innovations', itemName: 'Coconut Milk', amount: 4000.00, orderType: 'Purchase', approvalStatus: 'Rejected', statusClass: 'bg-red-100 text-red-800' },
        { id: 11, invoice: '#INV-2023-0506', partyName: 'Eco Traders', itemName: 'Coconut Shell Craft', amount: 1500.00, orderType: 'Sale', approvalStatus: 'Approved', statusClass: 'bg-green-100 text-green-800' },
        { id: 12, invoice: '#INV-2023-0507', partyName: 'Tropical Foods', itemName: 'Coconut Flour', amount: 3000.00, orderType: 'Purchase', approvalStatus: 'Pending', statusClass: 'bg-indigo-100 text-indigo-800' },
        { id: 13, invoice: '#INV-2023-0508', partyName: 'Organic Growers', itemName: 'Tender Coconut', amount: 1800.00, orderType: 'Sale', approvalStatus: 'Approved', statusClass: 'bg-green-100 text-green-800' },
    ]);

    const handleNewTransaction = () => {
        navigate('/purchase&sale/addtransaction');
    };

    // Filtered transactions based on search and selected filters
    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.invoice.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesParty = selectedParty === 'All Parties' || transaction.partyName === selectedParty;
        const matchesStatus = selectedStatus === 'All Status' || transaction.approvalStatus === selectedStatus;
        return matchesSearch && matchesParty && matchesStatus;
    });

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate page numbers for pagination control
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPageButtons = 5; // Max number of page buttons to show (e.g., 1, 2, 3, ..., last)

        if (totalPages <= maxPageButtons) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always include first and last page
            pageNumbers.push(1);
            if (currentPage > 3) pageNumbers.push('...');

            // Pages around the current page
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pageNumbers.push(i);
            }

            if (currentPage < totalPages - 2) pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }
        return [...new Set(pageNumbers)]; // Remove duplicates for '...'
    };


    return (
        <div className="container mx-auto p-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Purchase & Sales Management</h1>
                <div className="flex space-x-4">
                    <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 flex items-center transition-colors">
                        <FontAwesomeIcon icon={faFileExport} className="mr-2" /> Export
                    </button>
                    <button
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center transition-colors"
                        onClick={handleNewTransaction}
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" /> New Transaction
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Purchases</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">₹124,750.00</h3>
                        </div>
                        <div className="bg-indigo-100 p-3 rounded-full">
                            <FontAwesomeIcon icon={faBoxOpen} className="text-indigo-600 text-xl" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Across 42 Parties</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">₹38,420.00</h3>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <FontAwesomeIcon icon={faStopwatch} className="text-yellow-600 text-xl" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">18 invoices</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Sales</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">₹187,950.00</h3>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <FontAwesomeIcon icon={faTags} className="text-green-600 text-xl" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">From 56 customers</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Outstanding Receivables</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">₹45,680.00</h3>
                        </div>
                        <div className="bg-red-100 p-3 rounded-full">
                            <FontAwesomeIcon icon={faIndianRupeeSign} className="text-red-600 text-xl" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">From 12 customers</p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-indigo-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Parties or Items"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} // Reset to first page on search
                            />
                            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <select
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={selectedParty}
                            onChange={(e) => { setSelectedParty(e.target.value); setCurrentPage(1); }} // Reset to first page on filter change
                        >
                            <option>All Parties</option>
                            <option>OfficeTech Solutions</option>
                            <option>TechCloud Inc.</option>
                            <option>Facility Masters</option>
                            <option>Business Consultants</option>
                            <option>Green Harvest Co.</option>
                            <option>Agro Products Ltd.</option>
                            <option>Fresh Farms Inc.</option>
                            <option>Global Distributors</option>
                            <option>Natural Health Co.</option>
                            <option>Food Innovations</option>
                            <option>Eco Traders</option>
                            <option>Tropical Foods</option>
                            <option>Organic Growers</option>
                        </select>

                        <select
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }} // Reset to first page on filter change
                        >
                            <option>All Status</option>
                            <option>Approved</option>
                            <option>Pending</option>
                            <option>Rejected</option>
                        </select>

                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center transition-colors"
                            onClick={() => setCurrentPage(1)} // Apply filters effectively means resetting to page 1 with new filtered data
                        >
                            <FontAwesomeIcon icon={faFilter} className="mr-2" /> Apply filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Purchase Records Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 border border-indigo-50">
                <div className="px-6 py-4 border-b border-gray-200 bg-indigo-50">
                    <h3 className="text-lg font-semibold text-indigo-800">Purchase & Sales Records</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider"><FontAwesomeIcon icon={faBarcode} className="mr-1" /> Invoice #</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">Party name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider"><FontAwesomeIcon icon={faBoxOpen} className="mr-1" /> Item name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider"><FontAwesomeIcon icon={faIndianRupeeSign} className="mr-1" /> Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">Order Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider"><FontAwesomeIcon icon={faStopwatch} className="mr-1" /> Approval Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-indigo-800 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentTransactions.length > 0 ? (
                                currentTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-indigo-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.invoice}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.partyName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{transaction.itemName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{transaction.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.orderType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${transaction.statusClass}`}>
                                                {transaction.approvalStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3"><FontAwesomeIcon icon={faEye} /></button>
                                            <button className="text-green-600 hover:text-green-900 mr-3"><FontAwesomeIcon icon={faEdit} /></button>
                                            <button className="text-red-600 hover:text-red-900"><FontAwesomeIcon icon={faTrashAlt} /></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No transactions found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{filteredTransactions.length > 0 ? indexOfFirstItem + 1 : 0}</span> to{' '}
                                <span className="font-medium">{Math.min(indexOfLastItem, filteredTransactions.length)}</span> of{' '}
                                <span className="font-medium">{filteredTransactions.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="sr-only">Previous</span>
                                    <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
                                </button>

                                {getPageNumbers().map((pageNumber, index) => (
                                    pageNumber === '...' ? (
                                        <span key={index} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                            <FontAwesomeIcon icon={faEllipsisH} className="h-4 w-4" />
                                        </span>
                                    ) : (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${pageNumber === currentPage
                                                ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    )
                                ))}

                                <button
                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="sr-only">Next</span>
                                    <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseMain;