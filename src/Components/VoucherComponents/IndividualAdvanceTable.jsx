import React from 'react';

const IndividualAdvanceTable = ({ individualAdvances, updateIndividualAdvanceAmount, updateIndividualAdvanceField }) => {
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
        <div className="overflow-x-auto rounded-lg border" style={{ 
            borderColor: colors.border,
            boxShadow: '0 1px 3px rgba(49, 130, 206, 0.12)'
        }}>
            <table className="min-w-full divide-y" style={{ borderColor: colors.border }}>
                <thead className="bg-blue-50">
                    <tr>
                        <th 
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            style={{ 
                                color: colors.primaryDark,
                                backgroundColor: colors.primaryLight,
                                borderColor: colors.border
                            }}
                        >
                            Employee Code
                        </th>
                        <th 
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            style={{ 
                                color: colors.primaryDark,
                                backgroundColor: colors.primaryLight,
                                borderColor: colors.border
                            }}
                        >
                            Employee Name
                        </th>
                        <th 
                            scope="col"
                            className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider"
                            style={{ 
                                color: colors.primaryDark,
                                backgroundColor: colors.primaryLight,
                                borderColor: colors.border
                            }}
                        >
                            Total by Group (₹)
                        </th>
                        <th 
                            scope="col"
                            className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider"
                            style={{ 
                                color: colors.primaryDark,
                                backgroundColor: colors.primaryLight,
                                borderColor: colors.border
                            }}
                        >
                            Amount (₹)
                        </th>
                        <th 
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            style={{ 
                                color: colors.primaryDark,
                                backgroundColor: colors.primaryLight,
                                borderColor: colors.border
                            }}
                        >
                            Remarks
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y" style={{ borderColor: colors.border }}>
                    {individualAdvances.map((adv, index) => (
                        <tr 
                            key={index} 
                            className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
                            style={{ borderColor: colors.border }}
                        >
                            <td className="px-4 py-3 whitespace-nowrap">
                                <input
                                    type="text"
                                    value={adv.empCode}
                                    className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2"
                                    style={{
                                        borderColor: colors.border,
                                        color: colors.text,
                                        backgroundColor: 'white',
                                        focusRingColor: colors.primary
                                    }}
                                    onChange={(e) => updateIndividualAdvanceField(index, 'empCode', e.target.value)}
                                    placeholder="E.g., E001"
                                />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                                <input
                                    type="text"
                                    value={adv.name}
                                    className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2"
                                    style={{
                                        borderColor: colors.border,
                                        color: colors.text,
                                        backgroundColor: 'white',
                                        focusRingColor: colors.primary
                                    }}
                                    onChange={(e) => updateIndividualAdvanceField(index, 'name', e.target.value)}
                                    placeholder="Employee Name"
                                />
                            </td>
                            <td 
                                className="px-4 py-3 whitespace-nowrap text-sm text-right"
                                style={{ color: colors.text }}
                            >
                                ₹{adv.totalByGroup.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={adv.amount.toFixed(2)}
                                    className="w-full px-2 py-1 border rounded text-sm text-right focus:outline-none focus:ring-2"
                                    style={{
                                        borderColor: colors.border,
                                        color: colors.text,
                                        backgroundColor: 'white',
                                        focusRingColor: colors.primary
                                    }}
                                    onChange={(e) => updateIndividualAdvanceAmount(index, e.target.value)}
                                />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                                <input
                                    type="text"
                                    value={adv.remarks}
                                    className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2"
                                    style={{
                                        borderColor: colors.border,
                                        color: colors.text,
                                        backgroundColor: 'white',
                                        focusRingColor: colors.primary
                                    }}
                                    onChange={(e) => updateIndividualAdvanceField(index, 'remarks', e.target.value)}
                                    placeholder="Remarks"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IndividualAdvanceTable;