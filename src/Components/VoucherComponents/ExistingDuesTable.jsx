import React from 'react';

const ExistingDuesTable = ({ existingDues, setExistingDues, primaryColor = '#3182CE' }) => {
    // Color palette based on #3182CE
    const colors = {
        primary: primaryColor,
        primaryLight: '#EBF5FF',
        primaryDark: '#2C5282',
        border: '#BEE3F8',
        text: '#2D3748',
        textLight: '#4A5568',
        success: '#38A169', // For paid status (kept as it's essential for UX)
        danger: '#E53E3E'   // For unpaid status (kept as it's essential for UX)
    };

    return (
        <div className="overflow-x-auto rounded-lg border mb-6" style={{ 
            borderColor: colors.border,
            boxShadow: '0 1px 3px rgba(49, 130, 206, 0.12)'
        }}>
            <table className="min-w-full divide-y" style={{ borderColor: colors.border }}>
                <thead className="bg-blue-50">
                    <tr>
                        <th 
                            scope="col"
                            className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider"
                            style={{ 
                                color: colors.primaryDark,
                                backgroundColor: colors.primaryLight,
                                borderColor: colors.border
                            }}
                        >
                            Select
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
                            Purchase Order No.
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
                            Date
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
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y" style={{ borderColor: colors.border }}>
                    {existingDues.map((due, index) => (
                        <tr 
                            key={index} 
                            className="hover:bg-blue-50 transition-colors"
                            style={{ borderColor: colors.border }}
                        >
                            <td 
                                className="px-4 py-3 text-center text-sm"
                                style={{ 
                                    color: colors.text,
                                    borderColor: colors.border
                                }}
                            >
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 rounded"
                                    style={{
                                        color: colors.primary,
                                        borderColor: colors.border,
                                        focusRingColor: colors.primary
                                    }}
                                    checked={due.selected}
                                    onChange={() => {
                                        const newDues = [...existingDues];
                                        newDues[index].selected = !newDues[index].selected;
                                        setExistingDues(newDues);
                                    }}
                                />
                            </td>
                            <td 
                                className="px-4 py-3 text-sm"
                                style={{ 
                                    color: colors.text,
                                    borderColor: colors.border
                                }}
                            >
                                {due.purchaseOrderNo}
                            </td>
                            <td 
                                className="px-4 py-3 text-sm"
                                style={{ 
                                    color: colors.text,
                                    borderColor: colors.border
                                }}
                            >
                                {due.date}
                            </td>
                            <td 
                                className="px-4 py-3 text-right text-sm"
                                style={{ 
                                    color: colors.text,
                                    borderColor: colors.border
                                }}
                            >
                                ₹{due.amount.toFixed(2)}
                            </td>
                            <td 
                                className="px-4 py-3 text-sm font-medium"
                                style={{ 
                                    color: due.status === 'Paid' ? colors.success : colors.danger,
                                    borderColor: colors.border
                                }}
                            >
                                {due.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExistingDuesTable;