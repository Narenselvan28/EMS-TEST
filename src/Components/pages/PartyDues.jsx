import React, { useState, useMemo } from 'react';
import SummaryCard from '../PartyDue Components/SummaryCard';
import PartyCard from '../PartyDue Components/PartyCard';
import Filters from '../PartyDue Components/Filters';
import Pagination from '../PartyDue Components/Pagination';
import { useNavigate } from 'react-router-dom';

// SVG Icons for Summary Cards (converted to React components)
const CurrencyDollarIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CheckCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ExclamationCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ExportIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const PartyDues = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => navigate('/');
    const handleBackToDuesMgmt = () => navigate('/duesmanagement');

    // Simple Object Model for Party Dues Data
    const [allPartyDues] = useState([
        { id: '1001', partyName: 'ABC Suppliers', dueAmount: 1250.00, dueDate: '15 Jun 2023', contact: '+1 234 567 890', status: 'Paid' },
        { id: '1002', partyName: 'XYZ Traders', dueAmount: 3450.00, dueDate: '20 Jun 2023', contact: '+1 987 654 321', status: 'Pending' },
        { id: '1003', partyName: 'Global Imports', dueAmount: 5200.00, dueDate: '10 Jun 2023', contact: '+1 555 123 456', status: 'Overdue' },
        { id: '1004', partyName: 'Prime Distributors', dueAmount: 2100.00, dueDate: '25 Jun 2023', contact: '+1 222 333 444', status: 'Paid' },
        { id: '1005', partyName: 'Best Wholesale', dueAmount: 4750.00, dueDate: '18 Jun 2023', contact: '+1 777 888 999', status: 'Pending' },
        { id: '1006', partyName: 'Quality Goods Inc.', dueAmount: 1800.00, dueDate: '12 Jun 2023', contact: '+1 444 555 666', status: 'Paid' },
        { id: '1007', partyName: 'New Horizon Ltd.', dueAmount: 900.00, dueDate: '01 Jul 2023', contact: '+1 111 222 333', status: 'Pending' },
        { id: '1008', partyName: 'Apex Solutions', dueAmount: 1500.00, dueDate: '05 Jul 2023', contact: '+1 888 777 666', status: 'Overdue' },
    ]);

    const [filters, setFilters] = useState({
        partyName: '',
        status: 'All Dues',
        startDate: '',
        endDate: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setFilters({
            partyName: '',
            status: 'All Dues',
            startDate: '',
            endDate: '',
        });
        setCurrentPage(1);
    };

    // Sort parties with Overdue first, then Pending, then Paid
    const sortParties = (parties) => {
        return [...parties].sort((a, b) => {
            if (a.status === 'Overdue' && b.status !== 'Overdue') return -1;
            if (a.status !== 'Overdue' && b.status === 'Overdue') return 1;
            if (a.status === 'Pending' && b.status !== 'Pending') return -1;
            if (a.status !== 'Pending' && b.status === 'Pending') return 1;
            return 0;
        });
    };

    const filteredPartyDues = useMemo(() => {
        const filtered = allPartyDues.filter((party) => {
            const matchesPartyName = party.partyName.toLowerCase().includes(filters.partyName.toLowerCase());
            const matchesStatus = filters.status === 'All Dues' || party.status === filters.status;

            // Date filtering logic
            const partyDueDate = new Date(party.dueDate);
            const filterStartDate = filters.startDate ? new Date(filters.startDate) : null;
            const filterEndDate = filters.endDate ? new Date(filters.endDate) : null;

            const matchesDateRange = (!filterStartDate || partyDueDate >= filterStartDate) &&
                (!filterEndDate || partyDueDate <= filterEndDate);

            return matchesPartyName && matchesStatus && matchesDateRange;
        });

        return sortParties(filtered);
    }, [allPartyDues, filters]);

    const totalPages = Math.ceil(filteredPartyDues.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPartyDues = filteredPartyDues.slice(startIndex, startIndex + itemsPerPage);

    // Calculate summary values
    const totalDues = allPartyDues.reduce((sum, party) => sum + party.dueAmount, 0);
    const paidDues = allPartyDues.filter(party => party.status === 'Paid').reduce((sum, party) => sum + party.dueAmount, 0);
    const overdueDues = allPartyDues.filter(party => party.status === 'Overdue').reduce((sum, party) => sum + party.dueAmount, 0);

    return (
        <div className='p-5 m-3'>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-dark text-3xl font-bold">Party Dues Overview</h2>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-md flex items-center">
                        <ExportIcon />
                        Export
                    </button>
                </div>
            </div>

            <nav className="flex items-center mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="flex items-center">
                        <button
                            onClick={handleBackToHome}
                            className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 1.293a1 1 0 00-1.414 0L2 8.586V17a1 1 0 001 1h5a1 1 0 001-1v-4h2v4a1 1 0 001 1h5a1 1 0 001-1V8.586l-7.293-7.293z" />
                            </svg>
                            Dashboard
                        </button>
                    </li>
                    <li>
                        <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                        </svg>
                    </li>
                    <li className="inline-flex items-center">
                        <button
                            onClick={handleBackToDuesMgmt}
                            className="text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                            Dues Management
                        </button>
                    </li>
                    <li>
                        <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                        </svg>
                    </li>
                    <li aria-current="page">
                        <span className="text-gray-700 font-medium">Party Dues</span>
                    </li>
                </ol>
            </nav>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <SummaryCard
                    title="Total Debit Dues"
                    amount={`${totalDues.toFixed(2)}`}
                    icon={<CurrencyDollarIcon />}
                    borderColor="border-indigo-500"
                    bgColor="bg-primary/10"
                    textColor="text-primary"
                    desc="From 12 Parties"
                />
                <SummaryCard
                    title="Total Credit Dues"
                    amount={`$${paidDues.toFixed(2)}`}
                    icon={<CheckCircleIcon />}
                    borderColor="border-green-500"
                    bgColor="bg-green-100"
                    textColor="text-green-600"
                    desc="From 7 Parties"
                />
                <SummaryCard
                    title="Debit Overdues"
                    amount={`$${overdueDues.toFixed(2)}`}
                    icon={<ExclamationCircleIcon />}
                    borderColor="border-red-500"
                    bgColor="bg-red-100"
                    textColor="text-red-600"
                    desc="From 3 Parties"
                />
            </div>

            {/* Filters */}
            <Filters
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
            />

            {/* Party Dues Cards - Now sorted with Overdue first */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPartyDues.map((party) => (
                    <PartyCard key={party.id} party={party} />
                ))}
            </div>

            {/* Pagination */}
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

export default PartyDues;