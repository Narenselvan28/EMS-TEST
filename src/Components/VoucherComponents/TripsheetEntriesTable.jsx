import React from 'react';

const TripsheetEntriesTable = ({ tripsheetEntries, updateTripsheetEntry, toggleTripsheetCloseVoucher }) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="table-auto border-collapse w-full text-sm">
                <thead>
                    <tr className="table-header">
                        <th className="border border-indigo-200 px-4 py-3 text-center rounded-tl-lg">Close Voucher</th>
                        <th className="border border-indigo-200 px-4 py-3 text-left">Tripsheet ID</th>
                        <th className="border border-indigo-200 px-4 py-3 text-left">Date</th>
                        <th className="border border-indigo-200 px-4 py-3 text-right">Fuel Amount (₹)</th>
                        <th className="border border-indigo-200 px-4 py-3 text-left rounded-tr-lg">Status</th>
                    </tr>
                </thead>
                <tbody id="tripsheetTableBody">
                    {tripsheetEntries.map((ts, index) => (
                        <tr key={index} className="table-row">
                            <td className="border border-slate-100 px-4 py-3 text-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-indigo-600 no-enter-tab"
                                    checked={ts.closeVoucher}
                                    disabled={ts.status === 'Closed'}
                                    onChange={() => toggleTripsheetCloseVoucher(index)}
                                />
                            </td>
                            <td className="border border-slate-100 px-4 py-3">
                                <input
                                    type="text"
                                    value={ts.id}
                                    className="glass-panel border border-slate-200 p-2 rounded-lg w-full"
                                    onChange={(e) => updateTripsheetEntry(index, 'id', e.target.value)}
                                    placeholder="TS ID"
                                />
                            </td>
                            <td className="border border-slate-100 px-4 py-3">
                                <input
                                    type="date"
                                    value={ts.date}
                                    className="glass-panel border border-slate-200 p-2 rounded-lg w-full"
                                    onChange={(e) => updateTripsheetEntry(index, 'date', e.target.value)}
                                />
                            </td>
                            <td className="border border-slate-100 px-4 py-3">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={ts.amount.toFixed(2)}
                                    className="glass-panel border border-slate-200 p-2 rounded-lg w-full text-right"
                                    onChange={(e) => updateTripsheetEntry(index, 'amount', parseFloat(e.target.value) || 0)}
                                />
                            </td>
                            <td className="border border-slate-100 px-4 py-3 text-left">
                                <select
                                    value={ts.status}
                                    className="glass-panel border border-slate-200 p-2 rounded-lg w-full"
                                    onChange={(e) => updateTripsheetEntry(index, 'status', e.target.value)}
                                >
                                    <option>Open</option>
                                    <option>Closed</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}; 

export default TripsheetEntriesTable;