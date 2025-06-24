import React from 'react';
import VehicleFilters from './MasterpageComponents/VehicleMasterComponents/VehicleFilters';
import VehicleTable from './MasterpageComponents/VehicleMasterComponents/VehicleTable';

const VehicleMaster = () => {
    const vehicles = [
        {
            code: 'VH-001',
            number: 'MH12AB1234',
            model: 'Toyota Innova',
            type: 'Car',
            fuelType: 'Diesel',
            odometer: '55000',
            status: 'Active'
        },
        {
            code: 'VH-002',
            number: 'KA01CD5678',
            model: 'Ashok Leyland Truck',
            type: 'Truck',
            fuelType: 'Diesel',
            odometer: '120000',
            status: 'Active'
        },
        {
            code: 'VH-003',
            number: 'TN07EF9012',
            model: 'Tata Ace',
            type: 'Mini Truck',
            fuelType: 'Diesel',
            odometer: '80000',
            status: 'Under Maintenance'
        },
        {
            code: 'VH-004',
            number: 'DL01MN3456',
            model: 'Maruti Swift',
            type: 'Car',
            fuelType: 'Petrol',
            odometer: '30000',
            status: 'Active'
        },
        {
            code: 'VH-005',
            number: 'UP65QR7890',
            model: 'Eicher Bus',
            type: 'Bus',
            fuelType: 'Diesel',
            odometer: '250000',
            status: 'Sold'
        }
    ];

    const handleAddVehicle = () => {
        window.location.href = '/masters/vehicle/addvehicle';
    };

    return (
        <div className="min-h-screen m-2 bg-gray-50">
            

            <main className="flex-grow">
                <div className="w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-3xl font-bold text-dark">Vehicle Master</h2>
                            <a
                                onClick={handleAddVehicle}
                                href="/masters/vehicle/addvehicle"
                                className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md"
                            >
                                + Add New Vehicle
                            </a>
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
                                <li className="text-gray-700 font-medium">Vehicle Master</li>
                            </ol>
                        </nav>
                    </div>

                    <VehicleFilters />
                    <VehicleTable vehicles={vehicles} />
                </div>
            </main>
        </div>
    );
};

export default VehicleMaster;
