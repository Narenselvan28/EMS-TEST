import React from 'react';

const Breadcrumb = () => {
    return (
        <nav className="text-gray-700 mb-6" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">Home</a>
                    <i className="fas fa-chevron-right mx-2 text-gray-400"></i>
                </li>
                <li className="flex items-center">
                    <span id="breadcrumbDate" className="text-gray-500"></span>
                    <i className="fas fa-chevron-right mx-2 text-gray-400"></i>
                </li>
                <li className="flex items-center">
                    <span id="breadcrumbVoucherType" className="text-gray-500 capitalize"></span>
                    <i className="fas fa-chevron-right mx-2 text-gray-400"></i>
                </li>
                <li className="flex items-center">
                    <span id="breadcrumbVoucherCategory" className="text-gray-500 capitalize"></span>
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;