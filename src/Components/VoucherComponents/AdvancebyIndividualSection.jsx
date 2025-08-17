import React, { useEffect, useCallback, useState } from 'react';

// The main App component to contain the AdvanceByIndividualSection
export default function App() {
  const [advIndividualEmployeeCategory, setAdvIndividualEmployeeCategory] = useState('');
  const [advIndividualEmployeeGroup, setAdvIndividualEmployeeGroup] = useState('');
  const [advIndividualAdvanceByGroup, setAdvIndividualAdvanceByGroup] = useState(0);
  const [splitEvenCheckbox, setSplitEvenCheckbox] = useState(false);
  const [individualAdvances, setIndividualAdvances] = useState([]);

  // Mock data for the component. In a real app, this would come from a backend.
  const props = {
    advIndividualEmployeeCategory,
    setAdvIndividualEmployeeCategory,
    advIndividualEmployeeGroup,
    setAdvIndividualEmployeeGroup,
    advIndividualAdvanceByGroup,
    setAdvIndividualAdvanceByGroup,
    splitEvenCheckbox,
    setSplitEvenCheckbox,
    individualAdvances,
    setIndividualAdvances,
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <AdvanceByIndividualSection {...props} />
      </div>
    </div>
  );
}

const AdvanceByIndividualSection = ({
  advIndividualEmployeeCategory,
  setAdvIndividualEmployeeCategory,
  advIndividualEmployeeGroup,
  setAdvIndividualEmployeeGroup,
  advIndividualAdvanceByGroup,
  setAdvIndividualAdvanceByGroup,
  individualAdvances,
  setIndividualAdvances,
}) => {
  const [pendingGroupAdvances, setPendingGroupAdvances] = useState([
    { id: 1, date: '2023-05-15', amount: 15000 },
    { id: 2, date: '2023-06-20', amount: 20000 },
    { id: 3, date: '2023-07-10', amount: 12000 },
  ]);
  const [selectedPendingAdvance, setSelectedPendingAdvance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [employeesLoaded, setEmployeesLoaded] = useState(false);

  // State for the new employee to be added via the modal
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeCode, setNewEmployeeCode] = useState('');

  const loadAdvanceByIndividualData = useCallback(() => {
    setIsLoading(true);
    setIndividualAdvances([]);
    setEmployeesLoaded(false);

    if (!advIndividualEmployeeCategory || !advIndividualEmployeeGroup) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const fetched = [
        { empCode: 'E001', name: 'Alice Smith', totalByGroup: 5000, amount: 0, remarks: '' },
        { empCode: 'E002', name: 'Bob Johnson', totalByGroup: 5000, amount: 0, remarks: '' },
        { empCode: 'E006', name: 'Frank White', totalByGroup: 5000, amount: 0, remarks: '' },
      ];

      const total = fetched.reduce((sum, emp) => sum + emp.totalByGroup, 0);
      setIndividualAdvances(fetched);
      setAdvIndividualAdvanceByGroup(total);
      setIsLoading(false);
      setEmployeesLoaded(true);
    }, 800);
  }, [advIndividualEmployeeCategory, advIndividualEmployeeGroup, setIndividualAdvances, setAdvIndividualAdvanceByGroup]);

  const handleLoadEmployees = () => {
    if (!advIndividualEmployeeCategory || !advIndividualEmployeeGroup) {
      console.log('Please select both category and group first');
      return;
    }
    loadAdvanceByIndividualData();
  };

  const handlePendingAdvanceChange = (e) => {
    const selectedId = e.target.value;
    setSelectedPendingAdvance(selectedId);

    if (selectedId) {
      const selectedAdvance = pendingGroupAdvances.find(adv => adv.id.toString() === selectedId);
      setAdvIndividualAdvanceByGroup(selectedAdvance ? selectedAdvance.amount : 0);
    } else {
      setAdvIndividualAdvanceByGroup(0);
    }
  };

  const updateIndividualAdvanceAmount = (index, value) => {
    const updated = [...individualAdvances];
    updated[index].amount = parseFloat(value) || 0;
    setIndividualAdvances(updated);
  };

  const updateIndividualAdvanceField = (index, field, value) => {
    const updated = [...individualAdvances];
    updated[index][field] = value;
    setIndividualAdvances(updated);
  };

  // Handler to add a new employee from the modal
  const handleAddNewEmployee = () => {
    if (!newEmployeeCode || !newEmployeeName) {
      console.error('Employee Code and Name are required.');
      return;
    }
    const newEmployee = {
      empCode: newEmployeeCode,
      name: newEmployeeName,
      totalByGroup: 0, // Default value, can be updated later
      amount: 0,
      remarks: '',
    };
    setIndividualAdvances([...individualAdvances, newEmployee]);
    setNewEmployeeCode('');
    setNewEmployeeName('');
    setShowAddEmployeeModal(false);
  };

  const removeIndividualAdvanceRow = (index) => {
    const updated = individualAdvances.filter((_, i) => i !== index);
    setIndividualAdvances(updated);
  };

  const splitAmountEvenly = () => {
    if (individualAdvances.length === 0 || !advIndividualAdvanceByGroup) return;

    const evenAmount = Math.round(advIndividualAdvanceByGroup / individualAdvances.length);
    const updated = individualAdvances.map(emp => ({
      ...emp,
      amount: evenAmount
    }));
    setIndividualAdvances(updated);
  };

  const filteredAdvances = individualAdvances.filter(advance =>
    advance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advance.empCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-gray-100 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Individual Advance Allocation</h2>
            <p className="text-sm text-gray-500">Manage employee advance payments by individual</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* Employee Category */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Employee Category
          </label>
          <select
            value={advIndividualEmployeeCategory}
            onChange={(e) => setAdvIndividualEmployeeCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
          >
            <option value="">Select Category</option>
            <option>Permanent</option>
            <option>Contract</option>
            <option>Intern</option>
          </select>
        </div>

        {/* Employee Group */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Employee Group
          </label>
          <select
            value={advIndividualEmployeeGroup}
            onChange={(e) => setAdvIndividualEmployeeGroup(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
          >
            <option value="">Select Group</option>
            <option>Management</option>
            <option>Production</option>
            <option>Sales</option>
          </select>
        </div>

        {/* Pending Group Advances Dropdown */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pending Advances
          </label>
          <select
            value={selectedPendingAdvance}
            onChange={handlePendingAdvanceChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
          >
            <option value="">Select pending advance</option>
            {pendingGroupAdvances.map(advance => (
              <option key={advance.id} value={advance.id}>
                {advance.date} - ₹{advance.amount.toLocaleString('en-IN')}
              </option>
            ))}
          </select>
        </div>

        {/* Advance by Group */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Group Advance
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-sm">
              ₹
            </div>
            <input
              type="text"
              value={(advIndividualAdvanceByGroup || 0).toLocaleString('en-IN')}
              readOnly
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-not-allowed shadow-sm"
            />
          </div>
        </div>

        {/* Load Employees Button */}
        <div className="flex items-end">
          <button
            onClick={handleLoadEmployees}
            disabled={isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-1.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Load Employees
              </>
            )}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-3">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Employee Advances
          </h3>

          {individualAdvances.length > 0 && (
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10 w-full sm:w-64 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">
                      Emp. Code
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[160px]">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[140px]">
                      Group Amt
                    </th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[160px]">
                      Advance Amt
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remarks
                    </th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[80px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAdvances.length > 0 ? (
                    filteredAdvances.map((advance, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center gap-2 bg-gray-50 px-2.5 py-1.5 rounded border border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                            {advance.empCode}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2 bg-gray-50 px-2.5 py-1.5 rounded border border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {advance.name}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <span>₹{advance.totalByGroup.toLocaleString('en-IN')}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-sm">
                              ₹
                            </div>
                            <input
                              type="number"
                              value={advance.amount || ''}
                              onChange={(e) => updateIndividualAdvanceAmount(index, e.target.value)}
                              className="pl-8 w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm text-right"
                              placeholder="0.00"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                              </svg>
                            </div>
                            <input
                              type="text"
                              value={advance.remarks}
                              onChange={(e) => updateIndividualAdvanceField(index, 'remarks', e.target.value)}
                              className="w-full pl-8 px-2.5 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              placeholder="Add remarks"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <button
                            onClick={() => removeIndividualAdvanceRow(index)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-lg hover:bg-red-50"
                            title="Remove employee"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-6 text-center text-sm text-gray-500">
                        {individualAdvances.length === 0 ? (
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-2xl mb-2">😔</span>
                            <p>No employee data loaded.</p>
                            <p>Click "Load Employees" to fetch data.</p>
                          </div>
                        ) : (
                          'No employees match your search criteria.'
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Add Employee Button - Only shown after loading employees */}
            {employeesLoaded && (
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredAdvances.length}</span> of <span className="font-medium">{individualAdvances.length}</span> employees
                </div>
                <button
                  onClick={() => setShowAddEmployeeModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm shadow-sm transition flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Employee
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Employees</p>
              <p className="text-lg font-semibold text-blue-800">{individualAdvances.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-green-600 uppercase tracking-wider">Total Amount</p>
              <p className="text-lg font-semibold text-green-800">
                ₹{individualAdvances.reduce((sum, emp) => sum + (emp.amount || 0), 0).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-purple-600 uppercase tracking-wider">Group Advance</p>
              <p className="text-lg font-semibold text-purple-800">
                ₹{(advIndividualAdvanceByGroup || 0).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Add Employee</h3>
                <button
                  onClick={() => setShowAddEmployeeModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Input for new employee code */}
                <div>
                  <label htmlFor="new-emp-code" className="block text-sm font-medium text-gray-700 mb-1">Employee Code</label>
                  <input
                    id="new-emp-code"
                    type="text"
                    value={newEmployeeCode}
                    onChange={(e) => setNewEmployeeCode(e.target.value)}
                    placeholder="e.g., E007"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {/* Input for new employee name */}
                <div>
                  <label htmlFor="new-emp-name" className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                  <input
                    id="new-emp-name"
                    type="text"
                    value={newEmployeeName}
                    onChange={(e) => setNewEmployeeName(e.target.value)}
                    placeholder="e.g., John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddEmployeeModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNewEmployee}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};