import React, { useState } from 'react';
import Filters from './MasterpageComponents/VendorMasterComponents/Filters';
import VendorTable from './MasterpageComponents/VendorMasterComponents/VendorTable';
import ItemPagination from './MasterpageComponents/ItemMasterComponents/ItemPagination';
import ConfirmResetModal from '../../essentials/ConfirmResetModel';
import { useNavigate } from 'react-router-dom';

const vendorData = [
    {
        code: 'VND-1001',
        name: 'ABC Raw Materials',
        category: 'Raw Materials',
        contact: 'Ramesh Kumar',
        phone: '9876543210',
        gst: '33ABCDE1234F1Z5',
        status: 'active'
    },
    {
        code: 'VND-1002',
        name: 'XYZ Logistics',
        category: 'Logistics Services',
        contact: 'Suresh Patel',
        phone: '8765432109',
        gst: '24XYZWG5678H9I0',
        status: 'active'
    },
    {
        code: 'VND-1003',
        name: 'PQR Maintenance',
        category: 'Maintenance Services',
        contact: 'Arun Sharma',
        phone: '7654321098',
        gst: '29PQRSD3456E7F8',
        status: 'on_hold'
    },
    {
        code: 'VND-1004',
        name: 'LMN IT Solutions',
        category: 'IT Equipment',
        contact: 'Priya Iyer',
        phone: '6543210987',
        gst: '32LMNOP7890Q1R2',
        status: 'active'
    },
    {
        code: 'VND-1005',
        name: 'DEF Office Supplies',
        category: 'Office Supplies',
        contact: 'Neha Gupta',
        phone: '5432109876',
        gst: '07DEFGH2345I6J7',
        status: 'blacklisted'
    }
];

function VendorMaster() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showResetModal, setShowResetModal] = useState(false);
    const navigate = useNavigate();
    const itemsPerPage = 3;

    const Handleaddvendor = () => {
        navigate('/masters/vendor/addvendor');
    };

    const handleResetClick = () => {
        setShowResetModal(true);
    };

    const handleConfirmReset = () => {
        setSearchTerm('');
        setCategoryFilter('');
        setStatusFilter('');
        setCurrentPage(1);
        setShowResetModal(false);
    };

    const handleCancelReset = () => {
        setShowResetModal(false);
    };

    const filteredItems = vendorData.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter ? vendor.category === categoryFilter : true) &&
        (statusFilter ? vendor.status === statusFilter : true)
    );

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-gray-50 px-10 pt-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-dark">Vendor Master</h2>
                    <button
                        onClick={Handleaddvendor}
                        className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md"
                    >
                        + Add New Vendor
                    </button>
                </div>

                {/* Breadcrumb */}
                <nav className="flex items-center text-sm text-gray-600" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="flex items-center">
                            <a href="/" className="text-gray-500 hover:text-indigo-600 flex items-center">
                                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.707 1.293a1 1 0 00-1.414 0L2 8.586V17a1 1 0 001 1h5a1 1 0 001-1v-4h2v4a1 1 0 001 1h5a1 1 0 001-1V8.586l-7.293-7.293z" />
                                </svg>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                            </svg>
                        </li>
                        <li className="text-gray-700 font-medium">Vendor Master</li>
                    </ol>
                </nav>
            </div>

            {/* Filters */}
            <Filters
                search={searchTerm}
                setSearch={setSearchTerm}
                category={categoryFilter}
                setCategory={setCategoryFilter}
                status={statusFilter}
                setStatus={setStatusFilter}
                onResetFilters={handleResetClick}
            />

            {/* Vendor Table */}
            <VendorTable vendors={currentItems} />

            {/* Pagination */}
            <ItemPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                filteredItems={filteredItems}
                itemsPerPage={itemsPerPage}
            />

            {/* Confirm Reset Modal */}
            <ConfirmResetModal
                isOpen={showResetModal}
                onConfirm={handleConfirmReset}
                onCancel={handleCancelReset}
            />
        </div>
    );
}

export default VendorMaster;
