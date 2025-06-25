import React, { useEffect, useCallback } from 'react';
import SalaryEmployeeTable from './SalaryEmployeeTable'; // Import the new component

const SalaryDetailsSection = ({
    employeeCategory,
    setEmployeeCategory,
    employeeGroup,
    setEmployeeGroup,
    dateRangeFrom,
    setDateRangeFrom,
    dateRangeTo,
    setDateRangeTo,
    employees,
    setEmployees,
    employeeLoader,
    setEmployeeLoader,
    salarySummary,
    setSalarySummary,
}) => {
    const loadEmployeeData = () => {
        setEmployeeLoader(true);
        setEmployees([]); // Clear existing data

        console.log(`Loading employees for Category: ${employeeCategory}, Group: ${employeeGroup}, From: ${dateRangeFrom}, To: ${dateRangeTo}`);

        setTimeout(() => {
            const fetchedEmployees = [
                { empCode: 'E001', name: 'Alice Smith', advance: 1500, gross: 30000, net: 27000, amountGiven: 0, isPresent: true },
                { empCode: 'E002', name: 'Bob Johnson', advance: 500, gross: 25000, net: 23500, amountGiven: 0, isPresent: true },
                { empCode: 'E003', name: 'Charlie Brown', advance: 0, gross: 35000, net: 32000, amountGiven: 0, isPresent: true },
                { empCode: 'E004', name: 'Diana Prince', advance: 2000, gross: 40000, net: 36000, amountGiven: 0, isPresent: true },
                { empCode: 'E005', name: 'Eve Adams', advance: 1000, gross: 28000, net: 25500, amountGiven: 0, isPresent: true },
            ].map(emp => ({
                ...emp,
                amountToBeGiven: Math.max(0, emp.net - emp.advance - emp.amountGiven),
                dueAmount: (emp.advance + emp.amountGiven) > emp.net ? (emp.advance + emp.amountGiven) - emp.net : 0,
            }));
            setEmployees(fetchedEmployees);
            setEmployeeLoader(false);
        }, 1000);
    };

    const updateEmployeeAmounts = (index, value) => {
        const newEmployees = [...employees];
        const emp = newEmployees[index];
        emp.amountGiven = parseFloat(value) || 0;
        emp.amountToBeGiven = Math.max(0, emp.net - emp.advance - emp.amountGiven);
        emp.dueAmount = (emp.advance + emp.amountGiven) > emp.net ? (emp.advance + emp.amountGiven) - emp.net : 0;
        setEmployees(newEmployees);
    };

    const toggleEmployeeAttendance = (index) => {
        const newEmployees = [...employees];
        newEmployees[index].isPresent = !newEmployees[index].isPresent;
        setEmployees(newEmployees);
    };

    useEffect(() => {
        let totalAdvance = 0;
        let totalGrossSalary = 0;
        let totalNetSalary = 0;
        let totalAmountToBeGiven = 0;

        employees.forEach(emp => {
            totalAdvance += emp.advance;
            totalGrossSalary += emp.gross;
            totalNetSalary += emp.net;
            totalAmountToBeGiven += emp.amountToBeGiven;
        });

        setSalarySummary({
            totalAdvance,
            totalGrossSalary,
            totalNetSalary,
            totalAmountToBeGiven,
        });
    }, [employees, setSalarySummary]);

    return (
        <div className={`glass-card p-6 rounded-xl mb-8 section-visible`}>
            <h2 className="text-2xl font-semibold mb-6 gradient-text flex items-center">
                <i className="fas fa-money-bill-wave mr-3"></i> Salary Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="select-wrapper">
                    <label htmlFor="employeeCategory" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-user-tag mr-2"></i> Employee Category
                    </label>
                    <select
                        className="w-full glass-panel  focus:ring-2 focus:ring-indigo-200"
                        id="employeeCategory"
                        value={employeeCategory}
                        onChange={(e) => setEmployeeCategory(e.target.value)}
                    >
                        <option value="">- Select Category -</option>
                        <option>Permanent</option>
                        <option>Contract</option>
                        <option>Intern</option>
                    </select>
                </div>

                <div className="select-wrapper">
                    <label htmlFor="employeeGroup" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-users mr-2"></i> Employee Group
                    </label>
                    <select
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="employeeGroup"
                        value={employeeGroup}
                        onChange={(e) => setEmployeeGroup(e.target.value)}
                    >
                        <option value="">- Select Group -</option>
                        <option>Management</option>
                        <option>Production</option>
                        <option>Sales</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="dateRangeFrom" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-calendar-day mr-2"></i> Date Range From
                    </label>
                    <input
                        type="date"
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="dateRangeFrom"
                        value={dateRangeFrom}
                        onChange={(e) => setDateRangeFrom(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="dateRangeTo" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-calendar-day mr-2"></i> Date Range To
                    </label>
                    <input
                        type="date"
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="dateRangeTo"
                        value={dateRangeTo}
                        onChange={(e) => setDateRangeTo(e.target.value)}
                    />
                </div>
                <div className="col-span-full flex justify-end">
                    <button onClick={loadEmployeeData} className="btn-primary px-6 py-3 rounded-lg text-base">
                        <i className="fas fa-search mr-2"></i> Load Employees
                    </button>
                </div>
            </div>

            <div id="employeeLoader" className={`loader ${employeeLoader ? '' : 'hidden'}`}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <SalaryEmployeeTable
                employees={employees}
                updateEmployeeAmounts={updateEmployeeAmounts}
                toggleEmployeeAttendance={toggleEmployeeAttendance}
            />

            <div className="glass-panel p-6 rounded-xl mt-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <i className="fas fa-chart-pie mr-2"></i> Salary Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <span className="block text-gray-600 text-sm">Total Amount in Advance:</span>
                        <span id="summaryAdvance" className="font-bold text-lg text-indigo-700">₹{salarySummary.totalAdvance.toFixed(2)}</span>
                    </div>
                    <div>
                        <span className="block text-gray-600 text-sm">Total Gross Salary:</span>
                        <span id="summaryGrossSalary" className="font-bold text-lg text-indigo-700">₹{salarySummary.totalGrossSalary.toFixed(2)}</span>
                    </div>
                    <div>
                        <span className="block text-gray-600 text-sm">Total Net Salary:</span>
                        <span id="summaryNetSalary" className="font-bold text-lg text-indigo-700">₹{salarySummary.totalNetSalary.toFixed(2)}</span>
                    </div>
                    <div>
                        <span className="block text-gray-600 text-sm">Total Amount to be given:</span>
                        <span id="summaryToBeGiven" className="font-bold text-lg text-indigo-700">₹{salarySummary.totalAmountToBeGiven.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryDetailsSection;