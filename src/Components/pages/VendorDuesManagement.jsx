import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../VendorDue Components/Header4vd';
import SummaryCards from '../VendorDue Components/SummaryCards4vd';
import Filters from '../VendorDue Components/Filters4vd';
import VendorCards from '../VendorDue Components/VendorCards';

const VendorDuesManagement = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => navigate('/');
    const handleBackToDuesMgmt = () => navigate('/duesmanagement');

    return (
        <div className="min-h-screen m-2 ">
            <Header />

            {/* Remove max-width and center constraint */}
            <main className="w-full px-6 py-6">
                {/* Breadcrumb */}
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
                            <span className="text-gray-700 font-medium">Vendor Dues</span>
                        </li>
                    </ol>
                </nav>

                <SummaryCards />
                <Filters />
                <VendorCards />
            </main>
        </div>
    );
};

export default VendorDuesManagement;
