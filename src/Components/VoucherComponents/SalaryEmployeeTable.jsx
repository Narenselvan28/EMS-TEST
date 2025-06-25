import React from 'react';

const SalaryEmployeeTable = ({ employees, updateEmployeeAmounts, toggleEmployeeAttendance }) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="table-auto border-collapse w-full text-sm">
                <thead>
                    <tr className="table-header rounded-lg">
                        <th className="border border-indigo-200 px-4 py-3 text-left rounded-tl-lg">Employee Code</th>
                        <th className="border border-indigo-200 px-4 py-3 text-left">Employee Name</th>
                        <th className="border border-indigo-200 px-4 py-3 text-right">Amount in Advance (₹)</th>
                        <th className="border border-indigo-200 px-4 py-3 text-right">Gross Salary (₹)</th>
                        <th className="border border-indigo-200 px-4 py-3 text-right">Net Salary (₹)</th>
                        <th className="border border-indigo-200 px-4 py-3 text-right">Amount to be given (₹)</th>
                        <th className="border border-indigo-200 px-4 py-3 text-right">Amount Given (₹)</th>
                        <th className="border border-indigo-200 px-4 py-3 text-right rounded-tr-lg">Due Amount (₹)</th>
                    </tr>
                </thead>
                <tbody id="employeeTableBody">
                    {employees.map((emp, index) => (
                        <tr key={emp.empCode} className="table-row">
                            <td className="border border-slate-100 px-4 py-3">{emp.empCode}</td>
                            <td className="border border-slate-100 px-4 py-3 flex items-center">
                                <input
                                    type="checkbox"
                                    checked={emp.isPresent}
                                    onChange={() => toggleEmployeeAttendance(index)}
                                    className="form-checkbox h-4 w-4 text-indigo-600 mr-2 attendance-checkbox no-enter-tab"
                                />
                                {emp.name}
                            </td>
                            <td className="border border-slate-100 px-4 py-3 text-right">₹{emp.advance.toFixed(2)}</td>
                            <td className="border border-slate-100 px-4 py-3 text-right">₹{emp.gross.toFixed(2)}</td>
                            <td className="border border-slate-100 px-4 py-3 text-right">₹{emp.net.toFixed(2)}</td>
                            <td className="border border-slate-100 px-4 py-3 text-right amount-to-be-given">₹{Math.max(0, emp.amountToBeGiven).toFixed(2)}</td>
                            <td className="border border-slate-100 px-4 py-3">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={emp.amountGiven.toFixed(2)}
                                    className="amount-given-input glass-panel border border-slate-200 p-2 rounded-lg w-full text-right"
                                    onChange={(e) => updateEmployeeAmounts(index, e.target.value)}
                                />
                            </td>
                            <td className="border border-slate-100 px-4 py-3 text-right due-amount">₹{emp.dueAmount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalaryEmployeeTable;