import React from 'react';
import Loader from './Loader';

const SalarySection = () => {
    return (
        <div id="salarySection" className="glass-card p-6 rounded-xl mb-6 section-hidden">
            <h2 className="text-2xl font-semibold mb-4 gradient-text flex items-center">
                <i className="fas fa-money-bill-wave mr-3"></i> Salary Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Employee filters */}
                <div className="select-wrapper">
                    <label htmlFor="employeeCategory" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-user-tag mr-2"></i> Employee Category
                    </label>
                    <select className="w-full glass-panel focus:ring-2 focus:ring-indigo-200" id="employeeCategory">
                        <option value="">- Select Category -</option>
                        <option>Permanent</option>
                        <option>Contract</option>
                        <option>Intern</option>
                    </select>
                </div>

                {/* Date range inputs */}
                <div>
                    <label htmlFor="dateRangeFrom" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-calendar-day mr-2"></i> Date Range From
                    </label>
                    <input type="date" className="w-full glass-panel focus:ring-2 focus:ring-indigo-200" id="dateRangeFrom" />
                </div>

                {/* Load button */}
                <div className="col-span-full flex justify-end">
                    <button className="btn-primary px-6 py-3 rounded-lg text-base">
                        <i className="fas fa-search mr-2"></i> Load Employees
                    </button>
                </div>
            </div>

            <Loader id="employeeLoader" className="hidden" />

            {/* Employee table */}
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="table-auto border-collapse w-full text-sm">
                    <thead>
                        <tr className="table-header rounded-lg">
                            <th className="border border-indigo-200 px-4 py-3 text-left rounded-tl-lg">Employee Code</th>
                            <th className="border border-indigo-200 px-4 py-3 text-left">Employee Name</th>
                            {/* ... other table headers ... */}
                        </tr>
                    </thead>
                    <tbody id="employeeTableBody">
                        {/* Will be populated dynamically */}
                    </tbody>
                </table>
            </div>

            {/* Salary summary */}
            <div className="glass-panel p-6 rounded-xl mt-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <i className="fas fa-chart-pie mr-2"></i> Salary Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <span className="block text-gray-600 text-sm">Total Amount in Advance:</span>
                        <span id="summaryAdvance" className="font-bold text-lg text-indigo-700">₹0.00</span>
                    </div>
                    {/* ... other summary items ... */}
                </div>
            </div>
        </div>
    );
};

export default SalarySection;