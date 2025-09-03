import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => navigate('/');
    const handleBackToDuesMgmt = () => navigate('/masters');

    return (
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            {/* Top Title and Button */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Party Masters</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage all party information and details</p>
                </div>
                <div className="flex">
                    <button
                        onClick={() => navigate('/masters/party/addparty')}
                        className="px-5 py-2.5 bg-[#3182CE] text-white font-medium rounded-lg hover:bg-[#2c74b8] transition-colors duration-200 flex items-center shadow-md hover:shadow-lg transition-shadow"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add New Party
                    </button>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center text-sm text-gray-600" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                    {/* Home */}
                    <li className="flex items-center">
                        <button
                            onClick={handleBackToHome}
                            className="flex items-center text-gray-500 hover:text-[#3182CE] transition-colors duration-200"
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 1.293a1 1 0 00-1.414 0L2 8.586V17a1 1 0 001 1h5a1 1 0 001-1v-4h2v4a1 1 0 001 1h5a1 1 0 001-1V8.586l-7.293-7.293z" />
                            </svg>
                            Dashboard
                        </button>
                    </li>

                    {/* Arrow */}
                    <li>
                        <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </li>

                    {/* Intermediate Page */}
                    <li className="inline-flex items-center">
                        <button
                            onClick={handleBackToDuesMgmt}
                            className="text-gray-500 hover:text-[#3182CE] transition-colors duration-200"
                        >
                            Masters
                        </button>
                    </li>

                    {/* Arrow */}
                    <li>
                        <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </li>

                    {/* Current Page */}
                    <li aria-current="page" className="flex items-center">
                        <span className="text-[#3182CE] font-medium flex items-center">
                            
                            Party Masters
                        </span>
                    </li>
                </ol>
            </nav>
        </div>
    );
};

export default Header;