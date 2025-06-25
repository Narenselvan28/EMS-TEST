import React, { useEffect, useCallback } from 'react';
import IndividualAdvanceTable from './IndividualAdvanceTable';

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
  }, [advIndividualEmployeeCategory, advIndividualEmployeeGroup]);

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
    setIndividualAdvances([...individualAdvances, { empCode: '', name: '', totalByGroup: 0, amount: 0, remarks: '' }]);
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
    <div className="bg-white shadow-md rounded-2xl p-6 mb-8 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <i className="fas fa-user-plus text-indigo-600 mr-3 text-xl"></i>
        Advance by Individual Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Employee Category */}
        <div>
          <label htmlFor="advIndividualEmployeeCategory" className="block mb-2 text-sm font-medium text-gray-700">
            <i className="fas fa-user-tag mr-2 text-indigo-500"></i> Employee Category
          </label>
          <select
            id="advIndividualEmployeeCategory"
            value={advIndividualEmployeeCategory}
            onChange={(e) => setAdvIndividualEmployeeCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">— Select Category —</option>
            <option>Permanent</option>
            <option>Contract</option>
            <option>Intern</option>
          </select>
        </div>

        {/* Employee Group */}
        <div>
          <label htmlFor="advIndividualEmployeeGroup" className="block mb-2 text-sm font-medium text-gray-700">
            <i className="fas fa-users mr-2 text-indigo-500"></i> Employee Group
          </label>
          <select
            id="advIndividualEmployeeGroup"
            value={advIndividualEmployeeGroup}
            onChange={(e) => setAdvIndividualEmployeeGroup(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">— Select Group —</option>
            <option>Management</option>
            <option>Production</option>
            <option>Sales</option>
          </select>
        </div>

        {/* Advance by Group */}
        <div>
          <label htmlFor="advIndividualAdvanceByGroup" className="block mb-2 text-sm font-medium text-gray-700">
            <i className="fas fa-money-bill mr-2 text-indigo-500"></i> Advance by Group (₹)
          </label>
          <input
            type="text"
            id="advIndividualAdvanceByGroup"
            value={`₹${advIndividualAdvanceByGroup.toFixed(2)}`}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
          />
        </div>

        {/* Split Even Checkbox */}
        <div className="flex items-center mt-8">
          <input
            type="checkbox"
            id="splitEvenCheckbox"
            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={splitEvenCheckbox}
            onChange={(e) => setSplitEvenCheckbox(e.target.checked)}
          />
          <label htmlFor="splitEvenCheckbox" className="ml-2 text-sm text-gray-700 font-medium">
            <i className="fas fa-equals mr-1 text-indigo-500"></i> Split Even
          </label>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={addIndividualAdvanceRow}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <i className="fas fa-plus mr-2"></i> Add Employee Advance
        </button>
      </div>

      {/* Table */}
      <IndividualAdvanceTable
        individualAdvances={individualAdvances}
        updateIndividualAdvanceAmount={updateIndividualAdvanceAmount}
        updateIndividualAdvanceField={updateIndividualAdvanceField}
      />

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={saveAdvanceIndividual}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-base shadow hover:bg-indigo-700 transition"
        >
          <i className="fas fa-save mr-2"></i> Save Advance
        </button>
      </div>
    </div>
  );
};

export default AdvanceByIndividualSection;
