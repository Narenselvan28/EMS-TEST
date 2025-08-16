import React, { useEffect, useCallback } from 'react';

const AdvanceByIndividualSection = ({
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
}) => {
  const loadAdvanceByIndividualData = useCallback(() => {
    setIndividualAdvances([]);
    setAdvIndividualAdvanceByGroup(0);

    if (!advIndividualEmployeeCategory || !advIndividualEmployeeGroup) return;

    setTimeout(() => {
      const fetched = [
        { empCode: 'E001', name: 'Alice Smith', totalByGroup: 5000, amount: 0, remarks: '' },
        { empCode: 'E002', name: 'Bob Johnson', totalByGroup: 5000, amount: 0, remarks: '' },
        { empCode: 'E006', name: 'Frank White', totalByGroup: 5000, amount: 0, remarks: '' },
      ];

      const total = fetched.reduce((sum, emp) => sum + emp.totalByGroup, 0);
      setIndividualAdvances(fetched);
      setAdvIndividualAdvanceByGroup(total);
    }, 500);
  }, [advIndividualEmployeeCategory, advIndividualEmployeeGroup]);

  useEffect(() => {
    loadAdvanceByIndividualData();
  }, [advIndividualEmployeeCategory, advIndividualEmployeeGroup, loadAdvanceByIndividualData]);

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

  const addIndividualAdvanceRow = () => {
    setIndividualAdvances([
      ...individualAdvances,
      { empCode: '', name: '', totalByGroup: 0, amount: 0, remarks: '' },
    ]);
  };

  const removeIndividualAdvanceRow = (index) => {
    const updated = individualAdvances.filter((_, i) => i !== index);
    setIndividualAdvances(updated);
  };

  const saveAdvanceIndividual = () => {
    alert('Advance by Individual data saved!');
    console.log('Advance by Individual:', {
      category: advIndividualEmployeeCategory,
      group: advIndividualEmployeeGroup,
      splitEven: splitEvenCheckbox,
      advances: individualAdvances,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-5 border-b border-gray-200 gap-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#3182CE] to-[#2C5282] text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 leading-tight">Individual Advance Allocation</h2>
            <p className="text-base text-gray-500 mt-1">Manage employee advance payments by individual</p>
          </div>
        </div>
        <button
          onClick={saveAdvanceIndividual}
          className="bg-gradient-to-br from-[#3182CE] to-[#2C5282] text-white px-6 py-3 rounded-lg shadow hover:shadow-md transition flex items-center justify-center h-12 text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Employee Category */}
        <div>
          <label className="block text-base font-medium text-gray-600 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3182CE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Employee Category
          </label>
          <select
            value={advIndividualEmployeeCategory}
            onChange={(e) => setAdvIndividualEmployeeCategory(e.target.value)}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3182CE]/50 focus:border-[#3182CE] transition-all"
          >
            <option value="">Select Category</option>
            <option>Permanent</option>
            <option>Contract</option>
            <option>Intern</option>
          </select>
        </div>

        {/* Employee Group */}
        <div>
          <label className="block text-base font-medium text-gray-600 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3182CE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Employee Group
          </label>
          <select
            value={advIndividualEmployeeGroup}
            onChange={(e) => setAdvIndividualEmployeeGroup(e.target.value)}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3182CE]/50 focus:border-[#3182CE] transition-all"
          >
            <option value="">Select Group</option>
            <option>Management</option>
            <option>Production</option>
            <option>Sales</option>
          </select>
        </div>

        {/* Advance by Group */}
        <div>
          <label className="block text-base font-medium text-gray-600 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3182CE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Group Advance
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              ₹
            </div>
            <input
              type="text"
              value={(advIndividualAdvanceByGroup || 0).toFixed(2)}
              readOnly
              className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Split Even Checkbox */}
        <div className="flex items-end">
          <div className="flex items-center h-full pt-1">
            <input
              type="checkbox"
              id="splitEvenCheckbox"
              className="h-5 w-5 text-[#3182CE] focus:ring-[#3182CE] border-gray-300 rounded"
              checked={splitEvenCheckbox}
              onChange={(e) => setSplitEvenCheckbox(e.target.checked)}
            />
            <label htmlFor="splitEvenCheckbox" className="ml-3 text-base text-gray-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3182CE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
              Split Evenly
            </label>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h3 className="text-base font-medium text-gray-500 uppercase tracking-wider">Employee Advances</h3>
          <button
            onClick={addIndividualAdvanceRow}
            className="bg-[#3182CE] hover:bg-[#2a6fba] text-white px-4 py-2.5 rounded-md text-base shadow-sm transition flex items-center justify-center w-full sm:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Row
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-5 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider w-[140px]">
                  Emp. Code
                </th>
                <th scope="col" className="px-5 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
                  Name
                </th>
                <th scope="col" className="px-5 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider w-[160px]">
                  Group Amt (₹)
                </th>
                <th scope="col" className="px-5 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider w-[180px]">
                  Advance Amt (₹)
                </th>
                <th scope="col" className="px-5 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Remarks
                </th>
                <th scope="col" className="px-5 py-4 text-right text-base font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {individualAdvances.map((advance, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                    {advance.empCode}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-base text-gray-500">
                    {advance.name}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-base text-gray-500">
                    ₹{advance.totalByGroup.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-base">
                        ₹
                      </div>
                      <input
                        type="number"
                        value={advance.amount}
                        onChange={(e) => updateIndividualAdvanceAmount(index, e.target.value)}
                        className="pl-8 w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-[#3182CE] focus:border-[#3182CE] text-base"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <input
                      type="text"
                      value={advance.remarks}
                      onChange={(e) => updateIndividualAdvanceField(index, 'remarks', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-[#3182CE] focus:border-[#3182CE] text-base"
                      placeholder="Add remarks"
                    />
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-right">
                    <button 
                      onClick={() => removeIndividualAdvanceRow(index)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-md hover:bg-red-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdvanceByIndividualSection;
