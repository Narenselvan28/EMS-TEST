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
    const [itemsPerPage] = useState(5);

    // Dummy data for the table
    const [transactions] = useState([
        { id: 1, invoice: '#INV-2023-0482', partyName: 'OfficeTech Solutions', itemName: 'Coconut without Husk', amount: 3450.00, orderType: 'Sale', approvalStatus: 'Pending', statusClass: 'bg-blue-100 text-blue-800' },
        { id: 2, invoice: '#INV-2023-0517', partyName: 'TechCloud Inc.', itemName: 'Coconut with Husk', amount: 8750.00, orderType: 'Purchase', approvalStatus: 'Rejected', statusClass: 'bg-red-100 text-red-800' },
        { id: 3, invoice: '#INV-2023-0495', partyName: 'Facility Masters', itemName: 'Copra', amount: 5200.00, orderType: 'Purchase', approvalStatus: 'Approved', statusClass: 'bg-green-100 text-green-800' },
        { id: 4, invoice: '#INV-2023-0523', partyName: 'Business Consultants', itemName: 'Coconut with Husk', amount: 4800.00, orderType: 'Sale', approvalStatus: 'Rejected', statusClass: 'bg-red-100 text-red-800' },
        { id: 5, invoice: '#INV-2023-0500', partyName: 'Green Harvest Co.', itemName: 'Copra', amount: 6100.00, orderType: 'Sale', approvalStatus: 'Approved', statusClass: 'bg-green-100 text-green-800' },
        { id: 6, invoice: '#INV-2023-0501', partyName: 'Agro Products Ltd.', itemName: 'Coconut Oil', amount: 12000.00, orderType: 'Purchase', approvalStatus: 'Pending', statusClass: 'bg-blue-100 text-blue-800' },
        { id: 7, invoice: '#INV-2023-0502', partyName: 'Fresh Farms Inc.', itemName: 'Desiccated Coconut', amount: 7500.00, orderType: 'Sale', approvalStatus: 'Approved', statusClass: 'bg-green-100 text-green-800' },
        { id: 8, invoice: '#INV-2023-0503', partyName: 'Global Distributors', itemName: 'Coconut Water', amount: 2500.00, orderType: 'Purchase', approvalStatus: 'Approved', statusClass: 'bg-green-100 text-green-800' },
        { id: 9, invoice: '#INV-2023-0504', partyName: 'Natural Health Co.', itemName: 'Virgin Coconut Oil', amount: 15000.00, orderType: 'Sale', approvalStatus: 'Pending', statusClass: 'bg-blue-100 text-blue-800' },
        { id: 10, invoice: '#INV-2023-0505', partyName: 'Food Innovations', itemName: 'Coconut Milk', amount: 4000.00, orderType: 'Purchase', approvalStatus: 'Rejected', statusClass: 'bg-red-100 text-red-800' },
        { id: 11, invoice: '#INV-2023-0506', partyName: 'Eco Traders', itemName: 'Coconut Shell Craft', amount: 1500.00, orderType: 'Sale', approvalStatus: 'Approved', statusClass: 'bg-green-100 text-green-800' },
        { id: 12, invoice: '#INV-2023-0507', partyName: 'Tropical Foods', itemName: 'Coconut Flour', amount: 3000.00, orderType: 'Purchase', approvalStatus: 'Pending', statusClass: 'bg-blue-100 text-blue-800' },
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
        const maxPageButtons = 5;

        if (totalPages <= maxPageButtons) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            if (currentPage > 3) pageNumbers.push('...');

            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pageNumbers.push(i);
            }

            if (currentPage < totalPages - 2) pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }
        return [...new Set(pageNumbers)];
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 md:p-8">
            <style jsx>{`
                .btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.625rem 1.25rem;
                    border-radius: 0.375rem;
                    font-weight: 500;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                    transition: all 0.2s ease;
                    cursor: pointer;
                    border: 1px solid transparent;
                }
                
                .btn-primary {
                    background: #3182CE;
                    color: white;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                }
                
                .btn-primary:hover {
                    background: #2b6cb0;
                    transform: translateY(-1px);
                }
                
                .btn-primary:active {
                    transform: translateY(0);
                }
                
                .btn-secondary {
                    background: white;
                    color: #3182CE;
                    border-color: #3182CE;
                }
                
                .btn-secondary:hover {
                    background: #ebf5ff;
                    transform: translateY(-1px);
                }
                
                .btn-secondary:active {
                    transform: translateY(0);
                }
                
                .btn-icon {
                    margin-right: 0.5rem;
                    width: 1rem;
                    height: 1rem;
                }
                
                .card {
                    background: white;
                    border-radius: 0.5rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: all 0.2s ease;
                }
                
                .card:hover {
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                .card-header {
                    border-bottom: 1px solid #e2e8f0;
                    background: #ebf5ff;
                }
                
                .status-badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                }
                
                .action-btn {
                    padding: 0.375rem;
                    border-radius: 0.25rem;
                    transition: all 0.2s ease;
                }
                
                .action-btn:hover {
                    background: #ebf5ff;
                }
                
                .pagination-btn {
                    min-width: 2.25rem;
                    padding: 0.5rem;
                    border: 1px solid #e2e8f0;
                    background: white;
                    color: #4a5568;
                }
                
                .pagination-btn:hover {
                    background: #ebf5ff;
                }
                
                .pagination-btn.active {
                    background: #3182CE;
                    color: white;
                    border-color: #3182CE;
                }
                
                .pagination-btn.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>

            <div className="flex flex-col space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Purchase & Sales Management</h1>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="btn btn-secondary">
                            <FontAwesomeIcon icon={faFileExport} className="btn-icon" /> Export
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleNewTransaction}
                        >
                            <FontAwesomeIcon icon={faPlus} className="btn-icon" /> New Transaction
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="card p-4 border-l-4 border-blue-500">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Purchases</p>
                                <h3 className="text-xl font-bold text-gray-800 mt-1">₹124,750.00</h3>
                                <p className="text-xs text-gray-500 mt-1">Across 42 Parties</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <FontAwesomeIcon icon={faBoxOpen} className="text-blue-600 text-lg" />
                            </div>
                        </div>
                    </div>

                    <div className="card p-4 border-l-4 border-yellow-500">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                                <h3 className="text-xl font-bold text-gray-800 mt-1">₹38,420.00</h3>
                                <p className="text-xs text-gray-500 mt-1">18 invoices</p>
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <FontAwesomeIcon icon={faStopwatch} className="text-yellow-600 text-lg" />
                            </div>
                        </div>
                    </div>

                    <div className="card p-4 border-l-4 border-green-500">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                                <h3 className="text-xl font-bold text-gray-800 mt-1">₹187,950.00</h3>
                                <p className="text-xs text-gray-500 mt-1">From 56 customers</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <FontAwesomeIcon icon={faTags} className="text-green-600 text-lg" />
                            </div>
                        </div>
                    </div>

                    <div className="card p-4 border-l-4 border-red-500">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Outstanding Receivables</p>
                                <h3 className="text-xl font-bold text-gray-800 mt-1">₹45,680.00</h3>
                                <p className="text-xs text-gray-500 mt-1">From 12 customers</p>
                            </div>
                            <div className="bg-red-100 p-3 rounded-full">
                                <FontAwesomeIcon icon={faIndianRupeeSign} className="text-red-600 text-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="card p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative flex-grow max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search Parties or Items"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <select
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={selectedParty}
                                onChange={(e) => { setSelectedParty(e.target.value); setCurrentPage(1); }}
                            >
                                <option>All Parties</option>
                                {Array.from(new Set(transactions.map(t => t.partyName))).map(party => (
                                    <option key={party} value={party}>{party}</option>
                                ))}
                            </select>

                            <select
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={selectedStatus}
                                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            >
                                <option>All Status</option>
                                <option>Approved</option>
                                <option>Pending</option>
                                <option>Rejected</option>
                            </select>

                            <button
                                className="btn btn-primary"
                                onClick={() => setCurrentPage(1)}
                            >
                                <FontAwesomeIcon icon={faFilter} className="btn-icon" /> Apply filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Purchase Records Table */}
                <div className="card overflow-hidden">
                    <div className="card-header px-4 py-3">
                        <h3 className="text-lg font-semibold text-blue-800">Purchase & Sales Records</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FontAwesomeIcon icon={faBarcode} className="mr-1" /> Invoice #
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Party name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FontAwesomeIcon icon={faBoxOpen} className="mr-1" /> Item name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FontAwesomeIcon icon={faIndianRupeeSign} className="mr-1" /> Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order Type
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FontAwesomeIcon icon={faStopwatch} className="mr-1" /> Approval Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentTransactions.length > 0 ? (
                                    currentTransactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-blue-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {transaction.invoice}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {transaction.partyName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {transaction.itemName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ₹{transaction.amount.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {transaction.orderType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`status-badge ${transaction.statusClass}`}>
                                                    {transaction.approvalStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                <button className="action-btn text-blue-600 hover:text-blue-800">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                                <button className="action-btn text-green-600 hover:text-green-800">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button className="action-btn text-red-600 hover:text-red-800">
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
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
                    <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className={`pagination-btn ml-3 ${currentPage === totalPages ? 'disabled' : ''}`}
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
                                <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className={`pagination-btn rounded-l-md ${currentPage === 1 ? 'disabled' : ''}`}
                                    >
                                        <span className="sr-only">Previous</span>
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </button>

                                    {getPageNumbers().map((pageNumber, index) => (
                                        pageNumber === '...' ? (
                                            <span key={index} className="pagination-btn">
                                                <FontAwesomeIcon icon={faEllipsisH} />
                                            </span>
                                        ) : (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                                className={`pagination-btn ${pageNumber === currentPage ? 'active' : ''}`}
                                            >
                                                {pageNumber}
                                            </button>
                                        )
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className={`pagination-btn rounded-r-md ${currentPage === totalPages ? 'disabled' : ''}`}
                                    >
                                        <span className="sr-only">Next</span>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseMain;