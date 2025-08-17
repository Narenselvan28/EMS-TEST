import React from 'react';

const SalaryEmployeeTable = ({ employees, updateEmployeeAmounts }) => {
    // Enhanced color palette with additional semantic colors
    const colors = {
        primary: '#3182CE',
        primaryLight: '#EBF5FF',
        primaryLighter: '#F7FAFC',
        primaryDark: '#2C5282',
        border: '#BEE3F8',
        text: '#2D3748',
        textLight: '#4A5568',
        textLighter: '#718096',
        error: '#E53E3E',
        success: '#38A169'
    };

    // Add sample due amounts if not provided
    const employeesWithDue = employees.map(emp => ({
        ...emp,
        dueAmount: emp.dueAmount !== undefined ? emp.dueAmount : 
                  Math.max(0, (emp.amountToBeGiven || 0) - (emp.amountGiven || 0))
    }));

    return (
        <div className="overflow-hidden rounded-lg border shadow-sm" style={{ 
            borderColor: colors.border,
            backgroundColor: 'white',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}>
            {/* Table Header */}
            <div className="px-5 py-3 border-b" style={{ 
                borderColor: colors.border,
                backgroundColor: colors.primaryLight
            }}>
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md mr-3" 
                         style={{ backgroundColor: colors.primary }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold" style={{ color: colors.primaryDark }}>
                            Employee Salary Details
                        </h3>
                        <p className="text-xs" style={{ color: colors.textLight }}>
                            Manage salary advances, payments, and dues
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y" style={{ borderColor: colors.border }}>
                    <thead>
                        <tr>
                            <th className="px-3 py-2 text-xs font-medium text-left w-[80px]" style={{ 
                                color: colors.primaryDark,
                                backgroundColor: colors.primaryLighter,
                                letterSpacing: '0.05em'
                            }}>
                                Code
                            </th>
                            <th className="px-8 py-2 text-xs font-medium text-left w-[160px]" style={{ 
                                color: colors.primaryDark,
                                backgroundColor: colors.primaryLighter,
                                letterSpacing: '0.05em'
                            }}>
                                Name
                            </th>
                            {['Advance', 'Gross', 'Net', 'To Give', 'Given', 'Due'].map((header) => (
                                <th 
                                    key={header}
                                    scope="col"
                                    className="px-3 py-2 text-xs font-medium text-right"
                                    style={{ 
                                        color: colors.primaryDark,
                                        backgroundColor: colors.primaryLighter,
                                        letterSpacing: '0.05em'
                                    }}
                                >
                                    {header} (₹)
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: colors.border }}>
                        {employeesWithDue.map((emp, index) => (
                            <tr 
                                key={emp.empCode} 
                                className="hover:bg-blue-50 transition-colors duration-100"
                                style={{ backgroundColor: index % 2 === 0 ? 'white' : colors.primaryLight }}
                            >
                                {/* Employee Code */}
                                <td className="px-3 py-2 whitespace-nowrap w-[80px]">
                                    <span className="text-sm font-medium" style={{ color: colors.text }}>
                                        {emp.empCode}
                                    </span>
                                </td>
                                
                                {/* Employee Name - Reduced gap */}
                                <td className="px-8 py-2 whitespace-nowrap w-[160px] truncate">
                                    <span className="text-sm" style={{ color: colors.text }}>
                                        {emp.name}
                                    </span>
                                </td>
                                
                                {/* Advance Amount */}
                                <td className="px-3 py-2 whitespace-nowrap text-right">
                                    <span className="text-sm" style={{ color: colors.text }}>
                                        {emp.advance.toLocaleString('en-IN', { 
                                            style: 'currency', 
                                            currency: 'INR', 
                                            maximumFractionDigits: 0 
                                        })}
                                    </span>
                                </td>
                                
                                {/* Gross Salary */}
                                <td className="px-3 py-2 whitespace-nowrap text-right">
                                    <span className="text-sm" style={{ color: colors.text }}>
                                        {emp.gross.toLocaleString('en-IN', { 
                                            style: 'currency', 
                                            currency: 'INR', 
                                            maximumFractionDigits: 0 
                                        })}
                                    </span>
                                </td>
                                
                                {/* Net Salary */}
                                <td className="px-3 py-2 whitespace-nowrap text-right">
                                    <span className="text-sm font-medium" style={{ color: colors.primaryDark }}>
                                        {emp.net.toLocaleString('en-IN', { 
                                            style: 'currency', 
                                            currency: 'INR', 
                                            maximumFractionDigits: 0 
                                        })}
                                    </span>
                                </td>
                                
                                {/* Amount To Give */}
                                <td className="px-3 py-2 whitespace-nowrap text-right">
                                    <span className="text-sm" style={{ color: colors.text }}>
                                        {Math.max(0, emp.amountToBeGiven).toLocaleString('en-IN', { 
                                            style: 'currency', 
                                            currency: 'INR', 
                                            maximumFractionDigits: 0 
                                        })}
                                    </span>
                                </td>
                                
                                {/* Amount Given (Editable) */}
                                <td className="px-3 py-2 whitespace-nowrap text-right">
                                    <div className="flex justify-end">
                                        <input
                                            type="number"
                                            step="1"
                                            value={Math.round(emp.amountGiven)}
                                            className="w-24 px-2 py-1 border rounded text-sm text-right focus:ring-1 focus:outline-none transition"
                                            style={{
                                                borderColor: colors.border,
                                                color: colors.text,
                                                backgroundColor: 'white'
                                            }}
                                            onChange={(e) => updateEmployeeAmounts(index, parseInt(e.target.value) || 0)}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </div>
                                </td>
                                
                                {/* Due Amount */}
                                <td className="px-3 py-2 whitespace-nowrap text-right">
                                    <span className="text-sm font-medium" style={{ 
                                        color: emp.dueAmount > 0 ? colors.error : colors.success
                                    }}>
                                        {emp.dueAmount.toLocaleString('en-IN', { 
                                            style: 'currency', 
                                            currency: 'INR', 
                                            maximumFractionDigits: 0 
                                        })}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Empty State */}
            {employees.length === 0 && (
                <div className="p-6 text-center" style={{ color: colors.textLight }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm">No employee records found</p>
                </div>
            )}
            
            {/* Table Footer */}
            <div className="px-5 py-2 border-t flex justify-between items-center" style={{ 
                borderColor: colors.border,
                backgroundColor: colors.primaryLighter
            }}>
                <p className="text-xs" style={{ color: colors.textLight }}>
                    Showing <span className="font-medium" style={{ color: colors.primaryDark }}>{employees.length}</span> employee{employees.length !== 1 ? 's' : ''}
                </p>
                <button 
                    className="px-3 py-1.5 text-xs font-medium rounded border transition-colors hover:bg-blue-50"
                    style={{
                        borderColor: colors.border,
                        color: colors.primaryDark,
                        backgroundColor: 'white'
                    }}
                >
                    Export Data
                </button>
            </div>
        </div>
    );
};

export default SalaryEmployeeTable;