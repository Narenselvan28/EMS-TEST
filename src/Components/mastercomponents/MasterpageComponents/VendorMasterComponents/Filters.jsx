// components/Filters.jsx
import React from 'react';

function Filters() {
    return (
        <div className="bg-white shadow rounded-lg mt-10     p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Input */}
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <div className="relative">
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Search vendors..."
                            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* State Filter */}
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <select
                        id="state"
                        name="state"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="">All States</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                    </select>
                </div>

                {/* Category Filter */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        id="category"
                        name="category"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="">All Categories</option>
                        <option value="fuel">Fuel</option>
                        <option value="service_maintenance">Service Maintenance</option>
                        <option value="etc">Etc.</option>
                        <option value="raw_materials">Raw Materials</option>
                        <option value="finished_goods">Finished Goods</option>
                        <option value="services_logistics">Logistics Services</option>
                    </select>
                </div>

                {/* Status Filter */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="on_hold">On Hold</option>
                        <option value="blacklisted">Blacklisted</option>
                    </select>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="mt-4 flex justify-end gap-2 ">
                <button
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center"
                >
                    <span>Apply </span>
                </button>
                <button

                    className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
                >
                    <span>Reset</span>
                </button>


            </div>
        </div>
    );
}

export default Filters;