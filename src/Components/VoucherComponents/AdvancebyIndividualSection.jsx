import React, { useEffect, useCallback } from 'react';
import IndividualAdvanceTable from './IndividualAdvanceTable'; // Import the new component

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
        setIndividualAdvances([]); // Clear existing data
        setAdvIndividualAdvanceByGroup(0);

        if (!advIndividualEmployeeCategory || !advIndividualEmployeeGroup) {
            return;
        }

        console.log(`Loading individual advances for Category: ${advIndividualEmployeeCategory}, Group: ${advIndividualEmployeeGroup}`);

        setTimeout(() => {
            const fetchedIndividualAdvances = [
                { empCode: 'E001', name: 'Alice Smith', totalByGroup: 5000, amount: 0, remarks: '' },
                { empCode: 'E002', name: 'Bob Johnson', totalByGroup: 5000, amount: 0, remarks: '' },
                { empCode: 'E006', name: 'Frank White', totalByGroup: 5000, amount: 0, remarks: '' }
            ];

            const totalAdvanceForGroup = fetchedIndividualAdvances.reduce((sum, adv) => sum + adv.totalByGroup, 0);
            setIndividualAdvances(fetchedIndividualAdvances);
            setAdvIndividualAdvanceByGroup(totalAdvanceForGroup);
        }, 500);
    }, [advIndividualEmployeeCategory, advIndividualEmployeeGroup, setAdvIndividualAdvanceByGroup, setIndividualAdvances]);

    useEffect(() => {
        loadAdvanceByIndividualData();
    }, [advIndividualEmployeeCategory, advIndividualEmployeeGroup, loadAdvanceByIndividualData]);


    const updateIndividualAdvanceAmount = (index, value) => {
        const newIndividualAdvances = [...individualAdvances];
        newIndividualAdvances[index].amount = parseFloat(value) || 0;
        setIndividualAdvances(newIndividualAdvances);
    };

    const updateIndividualAdvanceField = (index, field, value) => {
        const newIndividualAdvances = [...individualAdvances];
        newIndividualAdvances[index][field] = value;
        setIndividualAdvances(newIndividualAdvances);
    };

    const addIndividualAdvanceRow = () => {
        setIndividualAdvances([...individualAdvances, { empCode: '', name: '', totalByGroup: 0, amount: 0, remarks: '' }]);
    };

    const saveAdvanceIndividual = () => {
        alert('Advance by Individual data saved!');
        console.log("Advance by Individual Data:", {
            category: advIndividualEmployeeCategory,
            group: advIndividualEmployeeGroup,
            splitEven: splitEvenCheckbox,
            advances: individualAdvances
        });
    };

    return (
        <div className={`glass-card p-6 rounded-xl mb-8 section-visible`}>
            <h2 className="text-2xl font-semibold mb-6 gradient-text flex items-center">
                <i className="fas fa-user-plus mr-3"></i> Advance by Individual Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="select-wrapper">
                    <label htmlFor="advIndividualEmployeeCategory" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-user-tag mr-2"></i> Employee Category
                    </label>
                    <select
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="advIndividualEmployeeCategory"
                        value={advIndividualEmployeeCategory}
                        onChange={(e) => setAdvIndividualEmployeeCategory(e.target.value)}
                    >
                        <option value="">- Select Category -</option>
                        <option>Permanent</option>
                        <option>Contract</option>
                        <option>Intern</option>
                    </select>
                </div>

                <div className="select-wrapper">
                    <label htmlFor="advIndividualEmployeeGroup" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-users mr-2"></i> Employee Group
                    </label>
                    <select
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="advIndividualEmployeeGroup"
                        value={advIndividualEmployeeGroup}
                        onChange={(e) => setAdvIndividualEmployeeGroup(e.target.value)}
                    >
                        <option value="">- Select Group -</option>
                        <option>Management</option>
                        <option>Production</option>
                        <option>Sales</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="advIndividualAdvanceByGroup" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-money-bill mr-2"></i> Advance by Group (₹)
                    </label>
                    <input
                        type="text"
                        readOnly
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200 bg-gray-100 cursor-not-allowed"
                        id="advIndividualAdvanceByGroup"
                        value={`₹${advIndividualAdvanceByGroup.toFixed(2)}`}
                    />
                </div>

                <div className="flex items-center mt-6">
                    <input
                        type="checkbox"
                        id="splitEvenCheckbox"
                        className="form-checkbox h-5 w-5 text-indigo-600 no-enter-tab"
                        checked={splitEvenCheckbox}
                        onChange={(e) => setSplitEvenCheckbox(e.target.checked)}
                    />
                    <label htmlFor="splitEvenCheckbox" className="ml-2 block text-gray-700 font-medium">
                        <i className="fas fa-equals mr-1"></i> Split Even
                    </label>
                </div>
            </div>

            <div className="flex justify-end mb-4">
                <button onClick={addIndividualAdvanceRow} className="btn-primary px-4 py-2 rounded-lg text-sm">
                    <i className="fas fa-plus mr-2"></i> Add Employee Advance
                </button>
            </div>

            <IndividualAdvanceTable
                individualAdvances={individualAdvances}
                updateIndividualAdvanceAmount={updateIndividualAdvanceAmount}
                updateIndividualAdvanceField={updateIndividualAdvanceField}
            />

            <div className="flex justify-end mt-6">
                <button onClick={saveAdvanceIndividual} className="btn-primary px-6 py-3 rounded-lg text-base">
                    <i className="fas fa-save mr-2"></i> Save Advance
                </button>
            </div>
        </div>
    );
};

export default AdvanceByIndividualSection;