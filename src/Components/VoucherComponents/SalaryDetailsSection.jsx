import React, { useState, useEffect, useRef } from 'react';
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
    // State and functions for the Searchable Dropdowns
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isGroupOpen, setIsGroupOpen] = useState(false);
    const [categorySearchTerm, setCategorySearchTerm] = useState(employeeCategory);
    const [groupSearchTerm, setGroupSearchTerm] = useState(employeeGroup);

    const categoryRef = useRef(null);
    const groupRef = useRef(null);

    // Hardcoded options for the dropdowns
    const employeeCategories = ['Permanent', 'Contract', 'Intern'];
    const employeeGroups = ['Management', 'Production', 'Sales'];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
            if (groupRef.current && !groupRef.current.contains(event.target)) {
                setIsGroupOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sync search terms with selected values
    useEffect(() => {
        setCategorySearchTerm(employeeCategory);
    }, [employeeCategory]);

    useEffect(() => {
        setGroupSearchTerm(employeeGroup);
    }, [employeeGroup]);

    /**
     * Simulates fetching employee data from a backend based on selected filters.
     * Sets a loading state, fetches mock data, and then updates the employee list.
     */
    const loadEmployeeData = () => {
        setEmployeeLoader(true);
        setEmployees([]);

        setTimeout(() => {
            const fetchedEmployees = [
                { empCode: 'E001', name: 'Alice Smith', advance: 1500, gross: 30000, net: 27000, amountGiven: 0, isPresent: true },
                { empCode: 'E002', name: 'Bob Johnson', advance: 500, gross: 25000, net: 23500, amountGiven: 0, isPresent: true },
                { empCode: 'E003', name: 'Charlie Brown', advance: 0, gross: 35000, net: 32000, amountGiven: 0, isPresent: true },
                { empCode: 'E004', name: 'Diana Prince', advance: 2000, gross: 40000, net: 36000, amountGiven: 0, isPresent: true },
                { empCode: 'E005', name: 'Eve Adams', advance: 1000, gross: 28000, net: 25500, amountGiven: 0, isPresent: true },
            ].map(emp => ({
                ...emp,
                // Calculate the remaining amount to be given after deductions
                amountToBeGiven: Math.max(0, emp.net - emp.advance - emp.amountGiven),
                // Calculate any due amount (e.g., if advances and amount given exceed net salary)
                dueAmount: (emp.advance + emp.amountGiven) > emp.net ? (emp.advance + emp.amountGiven) - emp.net : 0,
            }));
            setEmployees(fetchedEmployees);
            setEmployeeLoader(false);
        }, 1000);
    };

    /**
     * Updates the 'amountGiven' field for a specific employee and recalculates related fields.
     * @param {number} index - The index of the employee in the array.
     * @param {string} value - The new value for the amount given.
     */
    const updateEmployeeAmounts = (index, value) => {
        const newEmployees = [...employees];
        const emp = newEmployees[index];
        emp.amountGiven = parseFloat(value) || 0;
        emp.amountToBeGiven = Math.max(0, emp.net - emp.advance - emp.amountGiven);
        emp.dueAmount = (emp.advance + emp.amountGiven) > emp.net ? (emp.advance + emp.amountGiven) - emp.net : 0;
        setEmployees(newEmployees);
    };

    /**
     * Toggles the 'isPresent' status for a specific employee.
     * @param {number} index - The index of the employee in the array.
     */
    const toggleEmployeeAttendance = (index) => {
        const newEmployees = [...employees];
        newEmployees[index].isPresent = !newEmployees[index].isPresent;
        setEmployees(newEmployees);
    };

    /**
     * Recalculates the total salary summary whenever the 'employees' state changes.
     * This ensures the summary is always up-to-date with user edits.
     */
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 transition-all duration-200 hover:shadow-md">
            {/* Header Section with Icon and Title */}
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#3182CE] text-white mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#3182CE]">
                    Salary Details
                </h2>
            </div>

            {/* Input fields for filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Employee Category Dropdown */}
                <div className="relative" ref={categoryRef}>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2 text-[#3182CE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h10M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Employee Category
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={categorySearchTerm}
                            onChange={(e) => {
                                setCategorySearchTerm(e.target.value);
                                setEmployeeCategory(e.target.value);
                            }}
                            onFocus={() => setIsCategoryOpen(true)}
                            placeholder="- Search Category -"
                            className="w-full pl-8 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3182CE]/50 focus:border-[#3182CE] transition-all"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#3182CE] pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h10M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </div>
                    {isCategoryOpen && (
                        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {employeeCategories.filter(opt => opt.toLowerCase().includes(categorySearchTerm.toLowerCase())).map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setEmployeeCategory(option);
                                        setCategorySearchTerm(option);
                                        setIsCategoryOpen(false);
                                    }}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Employee Group Dropdown */}
                <div className="relative" ref={groupRef}>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2 text-[#3182CE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-8a2 2 0 01-2-2V7a2 2 0 012-2h8a2 2 0 012 2v11a2 2 0 01-2 2z" />
                        </svg>
                        Employee Group
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={groupSearchTerm}
                            onChange={(e) => {
                                setGroupSearchTerm(e.target.value);
                                setEmployeeGroup(e.target.value);
                            }}
                            onFocus={() => setIsGroupOpen(true)}
                            placeholder="- Search Group -"
                            className="w-full pl-8 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3182CE]/50 focus:border-[#3182CE] transition-all"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#3182CE] pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-8a2 2 0 01-2-2V7a2 2 0 012-2h8a2 2 0 012 2v11a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </div>
                    {isGroupOpen && (
                        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {employeeGroups.filter(opt => opt.toLowerCase().includes(groupSearchTerm.toLowerCase())).map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setEmployeeGroup(option);
                                        setGroupSearchTerm(option);
                                        setIsGroupOpen(false);
                                    }}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Date Range Fields (unchanged) */}
                <div>
                    <label htmlFor="dateRangeFrom" className="block text-sm font-medium text-gray-900 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2 text-[#3182CE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Date Range From
                    </label>
                    <input
                        type="date"
                        className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3182CE]/50 focus:border-[#3182CE] transition-all"
                        id="dateRangeFrom"
                        value={dateRangeFrom}
                        onChange={(e) => setDateRangeFrom(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="dateRangeTo" className="block text-sm font-medium text-gray-900 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2 text-[#3182CE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Date Range To
                    </label>
                    <input
                        type="date"
                        className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3182CE]/50 focus:border-[#3182CE] transition-all"
                        id="dateRangeTo"
                        value={dateRangeTo}
                        onChange={(e) => setDateRangeTo(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <button
                    onClick={loadEmployeeData}
                    className="bg-gradient-to-br from-[#3182CE] to-indigo-800 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-800 hover:to-[#3182CE] transition duration-200 shadow-sm"
                >
                    Load Employees
                </button>
            </div>

            {/* Salary Employee Table */}
            <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <SalaryEmployeeTable
                    employees={employees}
                    updateEmployeeAmounts={updateEmployeeAmounts}
                    toggleEmployeeAttendance={toggleEmployeeAttendance}
                />
            </div>

            {/* Salary Summary Section */}
            <div className="mt-8 border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Salary Summary
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <span className="block text-gray-900 text-sm">Total Advance:</span>
                        <span className="font-bold text-lg text-[#3182CE]">₹{salarySummary.totalAdvance.toFixed(2)}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <span className="block text-gray-900 text-sm">Total Gross Salary:</span>
                        <span className="font-bold text-lg text-[#3182CE]">₹{salarySummary.totalGrossSalary.toFixed(2)}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <span className="block text-gray-900 text-sm">Total Net Salary:</span>
                        <span className="font-bold text-lg text-[#3182CE]">₹{salarySummary.totalNetSalary.toFixed(2)}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <span className="block text-gray-900 text-sm">Total Amount to be given:</span>
                        <span className="font-bold text-lg text-[#3182CE]">₹{salarySummary.totalAmountToBeGiven.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryDetailsSection;