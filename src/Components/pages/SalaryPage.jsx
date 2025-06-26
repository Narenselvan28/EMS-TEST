import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faUsers,
    faObjectGroup,
    faBuilding,
    faMapMarkerAlt,
    faCalculator,
    faClipboardCheck,
    faIdCard,
    faUser,
    faMoneyBillWave,
    faListOl,
    faComment,
    faUserPlus,
    faUserCheck,
    faUserTimes,
    faRupeeSign,
    faUndo,
    faTimes,
    faSave
} from '@fortawesome/free-solid-svg-icons';

// Import the modal components
import ConfirmModel from '../../essentials/ConfirmModel'; // Adjust path if necessary
import ConfirmResetModal from '../../essentials/ConfirmResetModel'; // Adjust path if necessary

// Sample employee data
const sampleEmployeesData = [
    { code: "EMP001", name: "John Doe", group: "driver", rate: 500, count: 1, remarks: '', isPresent: true },
    { code: "EMP002", name: "Jane Smith", group: "helper", rate: 300, count: 1, remarks: '', isPresent: true },
    { code: "EMP003", name: "Robert Johnson", group: "driver", rate: 550, count: 1, remarks: '', isPresent: true },
    { code: "EMP004", name: "Emily Davis", group: "supervisor", rate: 800, count: 1, remarks: '', isPresent: true },
    { code: "EMP005", name: "Michael Wilson", group: "helper", rate: 350, count: 1, remarks: '', isPresent: true }
];

const SalaryManagement = () => {
    // Form States
    const [date, setDate] = useState('');
    const [employeeCategory, setEmployeeCategory] = useState('');
    const [employeeGroup, setEmployeeGroup] = useState('');
    const [partyName, setPartyName] = useState('');
    const [tripLocation, setTripLocation] = useState('');
    const [totalCountChecked, setTotalCountChecked] = useState(false);
    const [totalCountValue, setTotalCountValue] = useState('');
    const [ratePerCountValue, setRatePerCountValue] = useState('');

    // Table and Loader States
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showEmployeeTable, setShowEmployeeTable] = useState(false);
    const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);

    // Modal States
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false); // Renamed for clarity
    const [isResetConfirmModalOpen, setIsResetConfirmModalOpen] = useState(false); // For reset action
    const [isCancelConfirmModalOpen, setIsCancelConfirmModalOpen] = useState(false); // For cancel action

    const [modalSelectedGroup, setModalSelectedGroup] = useState('');
    const [modalSelectedEmployeeCode, setModalSelectedEmployeeCode] = useState('');
    const [filteredModalEmployees, setFilteredModalEmployees] = useState([]);

    // Summary States
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);
    const [totalShiftCount, setTotalShiftCount] = useState(0);

    // Function to calculate total amount for a single employee row
    const calculateRowAmount = useCallback((rate, count, isPresent) => {
        return isPresent ? (parseFloat(rate) || 0) * (parseFloat(count) || 0) : 0;
    }, []);

    // Function to update summary counts
    const updateSummary = useCallback(() => {
        let currentPresentCount = 0;
        let currentAbsentCount = 0;
        let currentTotalSalary = 0;
        let currentTotalShiftCount = 0;

        employees.forEach(employee => {
            if (employee.isPresent) {
                currentPresentCount++;
                currentTotalSalary += calculateRowAmount(employee.rate, employee.count, employee.isPresent);
                currentTotalShiftCount += (parseFloat(employee.count) || 0);
            } else {
                currentAbsentCount++;
            }
        });

        setPresentCount(currentPresentCount);
        setAbsentCount(currentAbsentCount);
        setTotalSalary(currentTotalSalary.toFixed(2));
        setTotalShiftCount(currentTotalShiftCount);
    }, [employees, calculateRowAmount]);

    // Effect to update summary whenever employees array changes
    useEffect(() => {
        if (showAdditionalOptions) {
            updateSummary();
        }
    }, [employees, updateSummary, showAdditionalOptions]);

    // Handle Total Count input change
    const handleTotalCountInputChange = (e) => {
        const value = e.target.value;
        setTotalCountValue(value);
        if (totalCountChecked && showAdditionalOptions) {
            const presentEmployees = employees.filter(emp => emp.isPresent).length;
            const individualCount = presentEmployees > 0 ? (parseFloat(value) || 0) / presentEmployees : 0;

            setEmployees(prevEmployees =>
                prevEmployees.map(emp => ({
                    ...emp,
                    count: emp.isPresent ? individualCount : 0,
                    amount: calculateRowAmount(emp.rate, emp.isPresent ? individualCount : 0, emp.isPresent)
                }))
            );
        }
    };

    // Handle Rate Per Count input change
    const handleRatePerCountInputChange = (e) => {
        const value = e.target.value;
        setRatePerCountValue(value);
        if (showAdditionalOptions) {
            setEmployees(prevEmployees =>
                prevEmployees.map(emp => ({
                    ...emp,
                    rate: value,
                    amount: calculateRowAmount(value, emp.count, emp.isPresent)
                }))
            );
        }
    };

    // Handle attendance checkbox change
    const handleAttendanceChange = (index) => {
        setEmployees(prevEmployees => {
            const updatedEmployees = prevEmployees.map((emp, i) => {
                if (i === index) {
                    const newIsPresent = !emp.isPresent;
                    const newAmount = newIsPresent ? calculateRowAmount(emp.rate, emp.count, true) : 0;
                    return { ...emp, isPresent: newIsPresent, amount: newAmount };
                }
                return emp;
            });

            // Recalculate counts if total count is checked
            if (totalCountChecked && totalCountValue !== '') {
                const presentCount = updatedEmployees.filter(emp => emp.isPresent).length;
                const individualCount = presentCount > 0 ? (parseFloat(totalCountValue) || 0) / presentCount : 0;

                return updatedEmployees.map(emp => ({
                    ...emp,
                    count: emp.isPresent ? individualCount : 0,
                    amount: calculateRowAmount(emp.rate, emp.isPresent ? individualCount : 0, emp.isPresent)
                }));
            }

            return updatedEmployees;
        });
    };

    // Handle count input change in table
    const handleEmployeeDataChange = (index, field, value) => {
        // Only allow remarks to be changed when total count is checked
        if (totalCountChecked && field !== 'remarks') {
            return;
        }

        setEmployees(prevEmployees =>
            prevEmployees.map((emp, i) => {
                if (i === index) {
                    const updatedEmp = { ...emp, [field]: value };
                    const newAmount = calculateRowAmount(updatedEmp.rate, updatedEmp.count, updatedEmp.isPresent);
                    return { ...updatedEmp, amount: newAmount };
                }
                return emp;
            })
        );
    };

    // Load Employees Button Handler
    const handleLoadEmployees = () => {
        // If already showing, just return (we won't hide the table anymore)
        if (showEmployeeTable) {
            return;
        }

        // Otherwise, load the employees
        setIsLoading(true);
        setShowEmployeeTable(false);

        setTimeout(() => {
            const initialEmployees = sampleEmployeesData.map(emp => {
                let count = emp.count;
                if (totalCountChecked && totalCountValue !== '') {
                    const presentCount = sampleEmployeesData.filter(e => e.isPresent).length;
                    count = presentCount > 0 ? (parseFloat(totalCountValue) || 0) / presentCount : 0;
                }

                const rate = ratePerCountValue !== '' ? ratePerCountValue : emp.rate;

                return {
                    ...emp,
                    count,
                    rate,
                    amount: calculateRowAmount(rate, count, emp.isPresent)
                };
            });

            setEmployees(initialEmployees);
            setIsLoading(false);
            setShowEmployeeTable(true);
            setShowAdditionalOptions(true);
        }, 1500);
    };

    // Add Employee Button Handler (Opens Modal)
    const handleAddEmployeeClick = () => {
        setIsAddEmployeeModalOpen(true);
        setModalSelectedGroup('');
        setModalSelectedEmployeeCode('');
        setFilteredModalEmployees([]);
    };

    // Modal Cancel Button Handler (for Add Employee Modal)
    const handleAddEmployeeModalCancel = () => {
        setIsAddEmployeeModalOpen(false);
    };

    // Populate employee names in modal based on group selection
    useEffect(() => {
        if (modalSelectedGroup) {
            setFilteredModalEmployees(sampleEmployeesData.filter(emp => emp.group === modalSelectedGroup));
        } else {
            setFilteredModalEmployees([]);
        }
    }, [modalSelectedGroup]);

    // Modal Save Button Handler (Adds New Employee)
    const handleAddEmployeeModalSave = () => {
        if (!modalSelectedEmployeeCode) {
            alert('Please select an employee');
            return;
        }

        const employeeToAdd = sampleEmployeesData.find(emp => emp.code === modalSelectedEmployeeCode);

        if (employeeToAdd) {
            if (employees.some(emp => emp.code === employeeToAdd.code)) {
                alert(`${employeeToAdd.name} is already in the table.`);
                return;
            }

            let count = 1;
            if (totalCountChecked && totalCountValue !== '') {
                const presentCount = employees.filter(emp => emp.isPresent).length + 1;
                count = presentCount > 0 ? (parseFloat(totalCountValue) || 0) / presentCount : 0;
            }

            const newEmployee = {
                ...employeeToAdd,
                count,
                rate: ratePerCountValue !== '' ? ratePerCountValue : employeeToAdd.rate,
                remarks: '',
                isPresent: true,
            };
            newEmployee.amount = calculateRowAmount(newEmployee.rate, newEmployee.count, newEmployee.isPresent);

            // Update counts for all employees if total count is checked
            if (totalCountChecked && totalCountValue !== '') {
                const presentCount = employees.filter(emp => emp.isPresent).length + 1;
                const individualCount = presentCount > 0 ? (parseFloat(totalCountValue) || 0) / presentCount : 0;

                setEmployees(prevEmployees => [
                    ...prevEmployees.map(emp => ({
                        ...emp,
                        count: emp.isPresent ? individualCount : 0,
                        amount: calculateRowAmount(emp.rate, emp.isPresent ? individualCount : 0, emp.isPresent)
                    })),
                    newEmployee
                ]);
            } else {
                setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
            }

            setIsAddEmployeeModalOpen(false);
        }
    };

    // Reset Button Handler - Opens the ConfirmResetModal
    const handleReset = () => {
        setIsResetConfirmModalOpen(true);
    };

    const confirmReset = () => {
        setDate('');
        setEmployeeCategory('');
        setEmployeeGroup('');
        setPartyName('');
        setTripLocation('');
        setTotalCountChecked(false);
        setTotalCountValue('');
        setRatePerCountValue('');
        setEmployees([]);
        setShowEmployeeTable(false);
        setShowAdditionalOptions(false);
        setIsResetConfirmModalOpen(false); // Close modal after reset
    };

    // Cancel Button Handler - Opens the ConfirmModel
    const handleCancel = () => {
        setIsCancelConfirmModalOpen(true);
    };

    const confirmCancel = () => {
        console.log('Cancelled');
        alert('Operation cancelled.');
        setIsCancelConfirmModalOpen(false); // Close modal after confirming cancel
    };

    // Save Button Handler
    const handleSave = () => {
        if (!date) {
            alert('Please select a date');
            return;
        }
        if (!employeeCategory) {
            alert('Please select employee category');
            return;
        }
        if (employees.length === 0) {
            alert('Please add at least one employee');
            return;
        }

        const isValid = employees.every(emp => emp.code && emp.name && emp.rate !== undefined && emp.count !== undefined);
        if (!isValid) {
            alert('Please ensure all employee rows have valid data.');
            return;
        }

        console.log('Saving data:', {
            date,
            employeeCategory,
            employeeGroup,
            partyName,
            tripLocation,
            employees,
            summary: { presentCount, absentCount, totalSalary, totalShiftCount }
        });
        alert('Salary data saved successfully!');
    };

    return (
        <div className="bg-gray-50 min-h-screen font-poppins">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Salary Management</h1>

                {/* Salary Management Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-6">Salary Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /><strong>Date</strong>
                            </label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <FontAwesomeIcon icon={faUsers} className="mr-2" /><strong>Employee Category</strong>
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={employeeCategory}
                                onChange={(e) => setEmployeeCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="permanent">Permanent</option>
                                <option value="contract">Contract</option>
                                <option value="temporary">Temporary</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <FontAwesomeIcon icon={faObjectGroup} className="mr-2" /><strong>Employee Group</strong>
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={employeeGroup}
                                onChange={(e) => setEmployeeGroup(e.target.value)}
                            >
                                <option value="">Select Group</option>
                                <option value="driver">Driver</option>
                                <option value="helper">Helper</option>
                                <option value="supervisor">Supervisor</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <FontAwesomeIcon icon={faBuilding} className="mr-2" /><strong>Party Name</strong>
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={partyName}
                                onChange={(e) => setPartyName(e.target.value)}
                            >
                                <option value="">Select Party</option>
                                <option value="party1">Party 1</option>
                                <option value="party2">Party 2</option>
                                <option value="party3">Party 3</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /><strong>Trip/Work Location</strong>
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter location"
                                value={tripLocation}
                                onChange={(e) => setTripLocation(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" /> <strong>Rate Per Count</strong>
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter rate per count"
                                value={ratePerCountValue}
                                onChange={handleRatePerCountInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            {/* Checkbox with label */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="totalCountCheckbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    checked={totalCountChecked}
                                    onChange={(e) => setTotalCountChecked(e.target.checked)}
                                />
                                <label
                                    htmlFor="totalCountCheckbox"
                                    className="flex items-center space-x-1 text-sm text-gray-800 cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faCalculator} className="text-indigo-600" />
                                    <span className="font-medium">Total Count</span>
                                </label>
                            </div>

                            {/* Input Field */}
                            <div className={`${totalCountChecked ? '' : 'opacity-50'}`}>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    placeholder="Enter total count"
                                    value={totalCountValue}
                                    onChange={handleTotalCountInputChange}
                                    disabled={!totalCountChecked}
                                />
                            </div>
                        </div>
                    </div>


                </div>
                <div className="flex justify-end mt-5 mb-5 col-span-1 md:col-span-2 lg:col-span-3">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={handleLoadEmployees}
                            disabled={showEmployeeTable}
                        >
                            <FontAwesomeIcon icon={faUsers} className="mr-2" />
                            Load Employees
                        </button>
                    </div>

                {/* Only show these sections after Load Employees is clicked */}
                {showAdditionalOptions && (
                    <>
                        {/* Loader Animation */}
                        {isLoading && (
                            <div className="text-center">
                                <div className="loader"></div>
                                <p className="text-center text-gray-600">Loading employees...</p>
                            </div>
                        )}

                        {/* Employee Table Section with Title */}
                        {showEmployeeTable && (
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-6">Employee Details</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                {['Attendance', 'Employee Code', 'Employee Name', 'Rate per Count', 'Count/Shift', 'Total Amount', 'Remarks'].map((th, i) => (
                                                    <th key={i} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                        {th === 'Attendance' && <FontAwesomeIcon icon={faClipboardCheck} className="mr-1" />}
                                                        {th === 'Employee Code' && <FontAwesomeIcon icon={faIdCard} className="mr-1" />}
                                                        {th === 'Employee Name' && <FontAwesomeIcon icon={faUser} className="mr-1" />}
                                                        {th === 'Rate per Count' && <FontAwesomeIcon icon={faMoneyBillWave} className="mr-1" />}
                                                        {th === 'Count/Shift' && <FontAwesomeIcon icon={faListOl} className="mr-1" />}
                                                        {th === 'Total Amount' && <FontAwesomeIcon icon={faCalculator} className="mr-1" />}
                                                        {th === 'Remarks' && <FontAwesomeIcon icon={faComment} className="mr-1" />}
                                                        {th}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {employees.map((employee, index) => (
                                                <tr key={employee.code} className={!employee.isPresent ? 'bg-gray-100' : ''}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <input
                                                            type="checkbox"
                                                            className="attendance-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                            checked={employee.isPresent}
                                                            onChange={() => handleAttendanceChange(index)}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{employee.code}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{employee.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <input
                                                            type="number"
                                                            className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 rate-input"
                                                            value={employee.rate}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <input
                                                            type="number"
                                                            className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 count-input"
                                                            value={employee.count}
                                                            onChange={(e) => handleEmployeeDataChange(index, 'count', e.target.value)}
                                                            disabled={totalCountChecked}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center amount-cell">
                                                        {employee.amount ? employee.amount.toFixed(2) : '0.00'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <input
                                                            type="text"
                                                            className="w-32 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            placeholder="Remarks"
                                                            value={employee.remarks}
                                                            onChange={(e) => handleEmployeeDataChange(index, 'remarks', e.target.value)}
                                                            disabled={!employee.isPresent}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Add Employee Button */}
                        <div className="flex justify-end mb-6">
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                onClick={handleAddEmployeeClick}
                            >
                                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />Add Employee
                            </button>
                        </div>

                        {/* Summary Section */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-blue-800">
                                    <FontAwesomeIcon icon={faUserCheck} className="mr-1" /> No. of Employee Present
                                </h3>
                                <p className="text-2xl font-bold text-blue-600">{presentCount}</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-red-800">
                                    <FontAwesomeIcon icon={faUserTimes} className="mr-1" /> No. of Employee Absent
                                </h3>
                                <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-green-800">
                                    <FontAwesomeIcon icon={faRupeeSign} className="mr-1" /> Total Salary
                                </h3>
                                <p className="text-2xl font-bold text-green-600">{totalSalary}</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-purple-800">
                                    <FontAwesomeIcon icon={faListOl} className="mr-1" /> Total Count/Shift
                                </h3>
                                <p className="text-2xl font-bold text-purple-600">{totalShiftCount}</p>
                            </div>
                        </div>
                    </>
                )}

                {/* Action Buttons - Only show after Load Employees is clicked */}
                {showAdditionalOptions && (
                    <div className="flex justify-end space-x-4 bg-white p-4 rounded-lg shadow-md">
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            onClick={handleReset} // This will now open ConfirmResetModal
                        >
                            <FontAwesomeIcon icon={faUndo} className="mr-2" />Reset
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            onClick={handleCancel} // This will now open ConfirmModel
                        >
                            <FontAwesomeIcon icon={faTimes} className="mr-2" />Cancel
                        </button>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={handleSave}
                        >
                            <FontAwesomeIcon icon={faSave} className="mr-2" />Save
                        </button>
                    </div>
                )}

                {/* Add Employee Modal */}
                {isAddEmployeeModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                        <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add Employee</h3>

                                <div className="mt-2 px-7 py-3">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            <FontAwesomeIcon icon={faObjectGroup} className="mr-2" /><strong>Employee Group</strong>
                                        </label>
                                        <select
                                            id="modalEmployeeGroup"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={modalSelectedGroup}
                                            onChange={(e) => setModalSelectedGroup(e.target.value)}
                                        >
                                            <option value="">Select Group</option>
                                            <option value="driver">Driver</option>
                                            <option value="helper">Helper</option>
                                            <option value="supervisor">Supervisor</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            <FontAwesomeIcon icon={faUser} className="mr-2" /><strong>Employee Name</strong>
                                        </label>
                                        <select
                                            id="modalEmployeeName"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={modalSelectedEmployeeCode}
                                            onChange={(e) => setModalSelectedEmployeeCode(e.target.value)}
                                        >
                                            <option value="">Select Employee</option>
                                            {filteredModalEmployees.map(emp => (
                                                <option key={emp.code} value={emp.code}>{emp.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-center space-x-4 px-4 py-3">
                                    <button
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        onClick={handleAddEmployeeModalCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onClick={handleAddEmployeeModalSave}
                                    >
                                        Add Employee
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Confirm Reset Modal */}
                <ConfirmResetModal
                    isOpen={isResetConfirmModalOpen}
                    onConfirm={confirmReset}
                    onCancel={() => setIsResetConfirmModalOpen(false)}
                />

                {/* Confirm Cancel Modal */}
                <ConfirmModel
                    isOpen={isCancelConfirmModalOpen}
                    title="Confirm Cancellation"
                    message="Are you sure you want to cancel? All unsaved changes will be lost."
                    onConfirm={confirmCancel}
                    onCancel={() => setIsCancelConfirmModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default SalaryManagement;