import React from 'react';

const IndividualAdvanceTable = ({ individualAdvances, updateIndividualAdvanceAmount, updateIndividualAdvanceField }) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="table-auto border-collapse w-full text-sm">
                <thead>
                    <tr className="table-header rounded-lg">
                        <th className="border border-indigo-200 px-4 py-3 text-left rounded-tl-lg">Employee Code</th>
                        <th className="border border-indigo-200 px-4 py-3 text-left">Employee Name</th>
                        <th className="border border-indigo-200 px-4 py-3 text-right">Total by Group (₹)</th>
                        <th className="border border-indigo-200 px-4 py-3 text-right">Amount (₹)</th>
                        <th className="border border-indigo-200 px-4 py-3 text-left rounded-tr-lg">Remarks</th>
                    </tr>
                </thead>
                <tbody id="advIndividualTableBody">
                    {individualAdvances.map((adv, index) => (
                        <tr key={index} className="table-row">
                            <td className="border border-slate-100 px-4 py-3">
                                <input
                                    type="text"
                                    value={adv.empCode}
                                    className="glass-panel border border-slate-200 p-2 rounded-lg w-full"
                                    onChange={(e) => updateIndividualAdvanceField(index, 'empCode', e.target.value)}
                                    placeholder="E.g., E001"
                                />
                            </td>
                            <td className="border border-slate-100 px-4 py-3">
                                <input
                                    type="text"
                                    value={adv.name}
                                    className="glass-panel border border-slate-200 p-2 rounded-lg w-full"
                                    onChange={(e) => updateIndividualAdvanceField(index, 'name', e.target.value)}
                                    placeholder="Employee Name"
                                />
                            </td>
                            <td className="border border-slate-100 px-4 py-3 text-right">₹{adv.totalByGroup.toFixed(2)}</td>
                            <td className="border border-slate-100 px-4 py-3">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={adv.amount.toFixed(2)}
                                    className="glass-panel border border-slate-200 p-2 rounded-lg w-full text-right"
                                    onChange={(e) => updateIndividualAdvanceAmount(index, e.target.value)}
                                />
                            </td>
                            <td className="border border-slate-100 px-4 py-3">
                                <input
                                    type="text"
                                    value={adv.remarks}
                                    className="glass-panel border border-slate-200 p-2 rounded-lg w-full"
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