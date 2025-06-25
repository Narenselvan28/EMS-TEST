import React, { useEffect } from 'react';
import SalaryEmployeeTable from './SalaryEmployeeTable'; // Assumed present

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
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
                Salary Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                    <label htmlFor="employeeCategory" className="block mb-2 font-medium text-gray-700">
                        Employee Category
                    </label>
                    <select
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-200"
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

                <div>
                    <label htmlFor="employeeGroup" className="block mb-2 font-medium text-gray-700">
                        Employee Group
                    </label>
                    <select
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-200"
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
                        Date Range From
                    </label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-200"
                        id="dateRangeFrom"
                        value={dateRangeFrom}
                        onChange={(e) => setDateRangeFrom(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="dateRangeTo" className="block mb-2 font-medium text-gray-700">
                        Date Range To
                    </label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-200"
                        id="dateRangeTo"
                        value={dateRangeTo}
                        onChange={(e) => setDateRangeTo(e.target.value)}
                    />
                </div>
                <div className="col-span-full flex justify-end mt-2">
                    <button
                        onClick={loadEmployeeData}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Load Employees
                    </button>
                </div>
            </div>

            <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm mb-6">
                <SalaryEmployeeTable
                    employees={employees}
                    updateEmployeeAmounts={updateEmployeeAmounts}
                    toggleEmployeeAttendance={toggleEmployeeAttendance}
                />
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Salary Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <span className="block text-gray-600 text-sm">Total Amount in Advance:</span>
                        <span className="font-bold text-lg text-indigo-700">₹{salarySummary.totalAdvance.toFixed(2)}</span>
                    </div>
                    <div>
                        <span className="block text-gray-600 text-sm">Total Gross Salary:</span>
                        <span className="font-bold text-lg text-indigo-700">₹{salarySummary.totalGrossSalary.toFixed(2)}</span>
                    </div>
                    <div>
                        <span className="block text-gray-600 text-sm">Total Net Salary:</span>
                        <span className="font-bold text-lg text-indigo-700">₹{salarySummary.totalNetSalary.toFixed(2)}</span>
                    </div>
                    <div>
                        <span className="block text-gray-600 text-sm">Total Amount to be given:</span>
                        <span className="font-bold text-lg text-indigo-700">₹{salarySummary.totalAmountToBeGiven.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryDetailsSection;
