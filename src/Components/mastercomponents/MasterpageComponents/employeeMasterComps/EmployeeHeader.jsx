import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeHeader = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => navigate('/');
    const handleBackToMasters = () => navigate('/masters');

    return (
        <div className="mb-6">
            {/* Top Title and Button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-dark">Employee Masters</h2>
                <div className="flex space-x-3">
                    <button
                        onClick={() => navigate('/masters/employee/addemployee')}
                        className="px-4 py-2 border bg-indigo-600 text-white border-gray-300 hover:bg-indigo-700 rounded-md flex items-center"
                    >
                        Add New Employee
                    </button>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center text-sm text-gray-600" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    {/* Home */}
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

                    {/* Arrow */}
                    <li>
                        <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                        </svg>
                    </li>

                    {/* Masters */}
                    <li className="inline-flex items-center">
                        <button
                            onClick={handleBackToMasters}
                            className="text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                            Masters
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
                        <span className="text-gray-700 font-medium">Employee Masters</span>
                    </li>
                </ol>
            </nav>
        </div>
    );
};

export default EmployeeHeader;
