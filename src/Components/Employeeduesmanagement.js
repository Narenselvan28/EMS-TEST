// src/pages/Employeeduesmanagements.js
import React from 'react';
import SummaryCards from './Employeeduesmanagement/SummaryCards';

import EmployeeCard from './Employeeduesmanagement/EmployeeCard';
import Filters from './Employeeduesmanagement/Filters4edm';
import { useNavigate } from 'react-router-dom';

const sampleDues = [
    {
        id: '#EMP-1001',
        name: 'John Smith',
        department: 'Marketing',
        type: 'Loan',
        amount: '$1,200.00',
        date: '15 Jun 2023',
        status: 'Paid'
    },
    {
        id: '#EMP-1024',
        name: 'Sarah Johnson',
        department: 'Finance',
        type: 'Advance',
        amount: '$800.00',
        date: '30 Jun 2023',
        status: 'Pending'
    },
    {
        id: '#EMP-1015',
        name: 'Michael Chen',
        department: 'IT',
        type: 'Equipment',
        amount: '$1,500.00',
        date: '10 May 2023',
        status: 'Overdue'
    },
    {
        id: '#EMP-1032',
        name: 'Emily Wilson',
        department: 'HR',
        type: 'Loan',
        amount: '$2,000.00',
        date: '25 Jul 2023',
        status: 'Partial'
    }
];




function Employeeduesmanagements(){
     const navigate = useNavigate(); // Call useNavigate inside the component

    const handleBackToHome = () => navigate('/');
    const handleBackToDuesMgmt = () => navigate('/duesmanagement');

    return( <div className="min-h-screen m-10 bg-gray-100">
        <h1 className='text-3xl font-bold mb-6'>Employee Dues Management</h1>
        <nav className="flex items-center mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">

                {/* Homepage */}
                <li className="flex items-center">
                    <button
                        onClick={handleBackToHome}
                        className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                        {/* Updated Home Icon */}
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 1.293a1 1 0 00-1.414 0L2 8.586V17a1 1 0 001 1h5a1 1 0 001-1v-4h2v4a1 1 0 001 1h5a1 1 0 001-1V8.586l-7.293-7.293z" />
                        </svg>
                        Dashboard
                    </button>
                </li>

                {/* Arrow */}
                <li>
                    <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                    </svg>
                </li>

                {/* Intermediate Page */}
                <li className="inline-flex items-center">
                    <button
                        onClick={handleBackToDuesMgmt}
                        className="text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                        Dues Management
                    </button>
                </li>

                {/* Arrow */}
                <li>
                    <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                    </svg>
                </li>

                {/* Current Page */}
                <li aria-current="page">
                    <span className="text-gray-700 font-medium">Employee Dues Management</span>
                </li>
            </ol>
        </nav>
        <SummaryCards />
<Filters />

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {sampleDues.map(due => (
        <EmployeeCard key={due.id} due={due} />
    ))}
</div>


    </div>)
}

export default Employeeduesmanagements;
