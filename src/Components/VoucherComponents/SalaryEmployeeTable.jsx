import React from 'react';

const SalaryEmployeeTable = ({ employees, updateEmployeeAmounts }) => {
    // Color palette based on #3182CE
    const colors = {
        primary: '#3182CE',
        primaryLight: '#EBF5FF',
        primaryDark: '#2C5282',
        border: '#BEE3F8',
        text: '#2D3748',
        textLight: '#4A5568'
    };

    return (
        <div className="overflow-x-auto rounded-lg border" style={{ borderColor: colors.border }}>
            <table className="min-w-full divide-y" style={{ borderColor: colors.border }}>
                <thead className="bg-blue-50">
                    <tr>
                        <th 
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            style={{ color: colors.primaryDark }}
                        >
                            Employee Code
                        </th>
                        <th 
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            style={{ color: colors.primaryDark }}
                        >
                            Employee Name
                        </th>
                        <th 
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                            style={{ color: colors.primaryDark }}
                        >
                            Advance (₹)
                        </th>
                        <th 
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                            style={{ color: colors.primaryDark }}
                        >
                            Gross (₹)
                        </th>
                        <th 
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                            style={{ color: colors.primaryDark }}
                        >
                            Net (₹)
                        </th>
                        <th 
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                            style={{ color: colors.primaryDark }}
                        >
                            To Give (₹)
                        </th>
                        <th 
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                            style={{ color: colors.primaryDark }}
                        >
                            Given (₹)
                        </th>
                        <th 
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                            style={{ color: colors.primaryDark }}
                        >
                            Due (₹)
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y" style={{ borderColor: colors.border }}>
                    {employees.map((emp, index) => (
                        <tr key={emp.empCode} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>
                                {emp.empCode}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: colors.text }}>
                                {emp.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right" style={{ color: colors.text }}>
                                ₹{Math.round(emp.advance)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right" style={{ color: colors.text }}>
                                ₹{Math.round(emp.gross)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right" style={{ color: colors.text }}>
                                ₹{Math.round(emp.net)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right" style={{ color: colors.text }}>
                                ₹{Math.max(0, Math.round(emp.amountToBeGiven))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                <input
                                    type="number"
                                    step="1"
                                    value={Math.round(emp.amountGiven)}
                                    className="w-24 px-2 py-1 border rounded text-right focus:ring-2 focus:outline-none"
                                    style={{
                                        borderColor: colors.border,
                                        color: colors.text,
                                        backgroundColor: 'white',
                                        focusRingColor: colors.primary
                                    }}
                                    onChange={(e) => updateEmployeeAmounts(index, parseInt(e.target.value) || 0)}
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right" style={{ 
                                color: emp.dueAmount > 0 ? colors.primaryDark : colors.text 
                            }}>
                                ₹{Math.round(emp.dueAmount)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalaryEmployeeTable;