import React from 'react';

const ExistingDuesTable = ({ existingDues, setExistingDues }) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow-lg mb-6">
            <table className="table-auto border-collapse w-full text-sm">
                <thead>
                    <tr className="table-header">
                        <th className="border border-indigo-200 px-4 py-3 text-center rounded-tl-lg">Select</th>
                        <th className="border border-indigo-200 px-4 py-3 text-left">Purchase Order No.</th>
                        <th className="border border-indigo-200 px-4 py-3 text-left">Date</th>
                        <th className="border border-indigo-200 px-4 py-3 text-right">Amount (₹)</th>
                        <th className="border border-indigo-200 px-4 py-3 text-left rounded-tr-lg">Status</th>
                    </tr>
                </thead>
                <tbody id="existingDuesTableBody">
                    {existingDues.map((due, index) => (
                        <tr key={index} className="table-row">
                            <td className="border border-slate-100 px-4 py-3 text-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-indigo-600 no-enter-tab"
                                    checked={due.selected}
                                    onChange={() => {
                                        const newDues = [...existingDues];
                                        newDues[index].selected = !newDues[index].selected;
                                        setExistingDues(newDues);
                                    }}
                                />
                            </td>
                            <td className="border border-slate-100 px-4 py-3">{due.purchaseOrderNo}</td>
                            <td className="border border-slate-100 px-4 py-3">{due.date}</td>
                            <td className="border border-slate-100 px-4 py-3 text-right">₹{due.amount.toFixed(2)}</td>
                            <td className="border border-slate-100 px-4 py-3 text-green-700 font-medium">{due.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExistingDuesTable;