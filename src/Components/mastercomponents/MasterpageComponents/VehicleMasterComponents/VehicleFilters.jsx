// components/VehicleFilters.js
import React, { useState, useRef } from 'react';
import ConfirmResetModal from '../../../../essentials/ConfirmResetModel';

const VehicleFilters = () => {
    const [showModal, setShowModal] = useState(false);

    // Refs to control input values
    const searchRef = useRef();
    const vehicleTypeRef = useRef();
    const fuelTypeRef = useRef();
    const statusRef = useRef();

    const handleConfirmReset = () => {
        searchRef.current.value = '';
        vehicleTypeRef.current.value = '';
        fuelTypeRef.current.value = '';
        statusRef.current.value = '';
        setShowModal(false);
    };

    return (
        <div className="bg-white shadow rounded-lg p-4 mt-10 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <div className="relative">
                        <input
                            type="text"
                            id="search"
                            name="search"
                            ref={searchRef}
                            placeholder="Search vehicles..."
                            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Vehicle Type */}
                <div>
                    <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                    <select
                        id="vehicleType"
                        name="vehicleType"
                        ref={vehicleTypeRef}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="">All Types</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="bus">Bus</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="van">Van</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Fuel Type */}
                <div>
                    <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                    <select
                        id="fuelType"
                        name="fuelType"
                        ref={fuelTypeRef}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="">All Fuel Types</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="cng">CNG</option>
                        <option value="lpg">LPG</option>
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        id="status"
                        name="status"
                        ref={statusRef}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="under_maintenance">Under Maintenance</option>
                        <option value="sold">Sold</option>
                    </select>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-4 justify-end">
                <button
                    type="button"
                    className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                    Apply Filters
                </button>
                <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="bg-red-600 border border-gray-300 text-gray-100 px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mr-2"
                >
                    Reset
                </button>
            </div>

            {/* Modal */}
            <ConfirmResetModal
                isOpen={showModal}
                onConfirm={handleConfirmReset}
                onCancel={() => setShowModal(false)}
            />
        </div>
    );
};

export default VehicleFilters;
