// src/Components/mastercomponents/MasterpageComponents/employeeMasterComps/EmployeeFilters.jsx

import React, { useState } from 'react';
import ConfirmResetModal from '../../../../essentials/ConfirmResetModel';

const EmployeeFilters = ({
  search,
  setSearch,
  department,
  setDepartment,
  role,
  setRole,
  status,
  setStatus,
  onApplyFilters,
  onResetFilters
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleApply = () => {
    onApplyFilters({ search, department, role, status });
  };

  const handleReset = () => {
    setSearch('');
    setDepartment('All');
    setRole('All');
    setStatus('All');
    onResetFilters?.(); // Optional chaining
    setShowModal(false); // Close modal after reset
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or emp code"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Departments</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Production">Production</option>
          </select>
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Roles</option>
            <option value="Manager">Manager</option>
            <option value="Executive">Executive</option>
            <option value="Intern">Intern</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-2">
        <button
          onClick={handleApply}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Apply
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Reset
        </button>
      </div>

      {/* Confirm Reset Modal */}
      <ConfirmResetModal
        isOpen={showModal}
        onConfirm={handleReset}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default EmployeeFilters;
