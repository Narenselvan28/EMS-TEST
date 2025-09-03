import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ItemHeader = () => {
    const navigate = useNavigate();
    
    // Color definitions for professional design
    const colors = {
        primary: '#3182CE',
        primaryLight: '#EBF5FF',
        primaryDark: '#2C5282',
        text: '#2D3748',
        textLight: '#718096',
    };

    const handleBackToHome = () => navigate('/');
    const handleBackToMasters = () => navigate('/masters');

    return (
        <div className="mb-6 px-6 py-4">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center text-sm mb-4" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-2">
                    {/* Dashboard */}
                    <li className="flex items-center">
                        <button
                            onClick={handleBackToHome}
                            className="flex items-center transition-colors hover:text-indigo-700"
                            style={{ color: colors.textLight }}
                        >
                            <FontAwesomeIcon icon={faHome} className="w-4 h-4 mr-2" />
                            Dashboard
                        </button>
                    </li>

                    {/* Arrow */}
                    <li>
                        <FontAwesomeIcon 
                            icon={faChevronRight} 
                            className="w-3 h-3" 
                            style={{ color: colors.textLight }}
                        />
                    </li>

                    {/* Masters */}
                    <li className="flex items-center">
                        <button
                            onClick={handleBackToMasters}
                            className="transition-colors hover:text-indigo-700"
                            style={{ color: colors.textLight }}
                        >
                            Masters
                        </button>
                    </li>

                    {/* Arrow */}
                    <li>
                        <FontAwesomeIcon 
                            icon={faChevronRight} 
                            className="w-3 h-3" 
                            style={{ color: colors.textLight }}
                        />
                    </li>

                    {/* Current Page */}
                    <li aria-current="page">
                        <span className="font-medium" style={{ color: colors.primaryDark }}>
                            Item Masters
                        </span>
                    </li>
                </ol>
            </nav>

            {/* Title and Add Button */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
                        Item Master
                    </h1>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>
                        Manage your inventory items and product catalog
                    </p>
                </div>
                
                <button
                    onClick={() => navigate('/masters/item/additem')}
                    className="px-4 py-2.5 rounded-lg flex items-center justify-center transition-colors shadow-sm"
                    style={{ 
                        backgroundColor: colors.primary,
                        color: 'white',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = colors.primaryDark}
                    onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add New Item
                </button>
            </div>
        </div>
    );
};

export default ItemHeader;