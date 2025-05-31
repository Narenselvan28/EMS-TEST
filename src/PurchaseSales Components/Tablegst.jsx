import React from 'react';
import Dropdown from "../Dropdown"; // Assuming this is your Dropdown component

function Tablegst({ items, onUpdateItem, onDeleteRow, errors }) { // Receive errors prop
    return (
        <div className="h-72 bg-white mx-5 rounded-xl overflow-x-auto">
            <div className="min-w-[1400px]">
                <table className="min-w-full bg-white rounded-xl text-base shadow-sm border border-teal-200">
                    <thead className="bg-teal-700 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left border border-teal-200 w-[300px]">Item Name</th>
                            <th className="px-2 py-3 text-center border border-teal-200 w-[80px]">Qty</th>
                            <th className="px-2 py-3 text-center border border-teal-200 w-[150px]">UOM</th>
                            <th className="px-2 py-3 text-center border border-teal-200 w-[100px]">Price</th>
                            <th className="px-2 py-3 text-center border border-teal-200 w-[120px]">Amount</th>
                            <th className="px-2 py-3 text-center border border-teal-200 w-[100px]">CGST %</th>
                            <th className="px-2 py-3 text-center border border-teal-200 w-[120px]">CGST Amt</th>
                            <th className="px-2 py-3 text-center border border-teal-200 w-[100px]">SGST %</th>
                            <th className="px-2 py-3 text-center border border-teal-200 w-[120px]">SGST Amt</th>
                            <th className="px-2 py-3 text-center border border-teal-200 w-[120px]">Total GST</th>
                            <th className="px-2 py-3 text-center border border-teal-200 w-[140px]">Grand Total</th>
                            <th className="px-2 py-3 text-center border border-teal-200 w-[140px]">Debit/Credit</th>
                            <th className="px-2 py-3 text-center border border-teal-200 w-[100px] rounded-tr-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item.id}>
                                <td className="px-4 py-3 border border-teal-200">
                                    <Dropdown
                                        options={["Coconut With Husk", "Coconut Without Husk", "Copra", "Husk"]}
                                        width="w-full"
                                        placeholder="Select Item Name"
                                        
                                        onSelect={(value) => onUpdateItem(item.id, 'itemName', value)}
                                    />
                                    {errors[`item-${index}-itemName`] && <p className="text-red-500 text-xs mt-1">{errors[`item-${index}-itemName`]}</p>}
                                </td>
                                <td className="px-2 py-3 text-center border border-teal-200">
                                    <input
                                        type="number"
                                        max={9999}
                                        className={`border ${errors[`item-${index}-qty`] ? 'border-red-500' : 'border-gray-300'} h-10 rounded p-1 w-full text-center`}
                                        placeholder='Qty'
                                        onChange={(e) => onUpdateItem(item.id, 'qty', e.target.value)}
                                    />
                                    {errors[`item-${index}-qty`] && <p className="text-red-500 text-xs mt-1">{errors[`item-${index}-qty`]}</p>}
                                </td>
                                <td className="px-2 py-3 text-center border border-teal-200">
                                    <Dropdown
                                        options={["Grams", "Quintal", "Nos"]}
                                        width="w-full"
                                        placeholder={"Select UOM"}
                                        onSelect={(value) => onUpdateItem(item.id, 'uom', value)}
                                    />
                                </td>
                                <td className="px-2 py-3 text-center border border-teal-200">
                                    <input
                                        type="number"
                                        max={999999}
                                        className={`border ${errors[`item-${index}-price`] ? 'border-red-500' : 'border-gray-300'} h-10 rounded p-1 w-full text-center`}
                                        placeholder='Price'
                                        onChange={(e) => onUpdateItem(item.id, 'price', e.target.value)}
                                    />
                                    {errors[`item-${index}-price`] && <p className="text-red-500 text-xs mt-1">{errors[`item-${index}-price`]}</p>}
                                </td>
                                <td className="px-2 py-3 text-center border border-teal-200">
                                    <input
                                        type="number"
                                        readOnly
                                        className="border border-gray-300 h-10 rounded p-1 w-full text-center bg-gray-100"
                                        value={item.amount} placeholder='0'
                                    />
                                </td>
                                <td className="px-2 py-3 text-center border border-teal-200">
                                    <input
                                        type="number"
                                        max={100}
                                        className={`border ${errors[`item-${index}-cgstPercent`] ? 'border-red-500' : 'border-gray-300'} h-10 rounded p-1 w-full text-center`}
                                        placeholder='CGST %'
                                        onChange={(e) => onUpdateItem(item.id, 'cgstPercent', e.target.value)}
                                    />
                                    {errors[`item-${index}-cgstPercent`] && <p className="text-red-500 text-xs mt-1">{errors[`item-${index}-cgstPercent`]}</p>}
                                </td>
                                <td className="px-2 py-3 text-center border border-teal-200">
                                    <input
                                        type="number"
                                        readOnly
                                        className="border border-gray-300 h-10 rounded p-1 w-full text-center bg-gray-100"
                                        value={item.cgstAmt}
                                        placeholder='0'
                                    />
                                </td>
                                <td className="px-2 py-3 text-center border border-teal-200">
                                    <input
                                        type="number"
                                        max={100}
                                        className={`border ${errors[`item-${index}-sgstPercent`] ? 'border-red-500' : 'border-gray-300'} h-10 rounded p-1 w-full text-center`}
                                        placeholder='SGST %'
                                        onChange={(e) => onUpdateItem(item.id, 'sgstPercent', e.target.value)}
                                    />
                                    {errors[`item-${index}-sgstPercent`] && <p className="text-red-500 text-xs mt-1">{errors[`item-${index}-sgstPercent`]}</p>}
                                </td>
                                <td className="px-2 py-3 text-center border border-teal-200">
                                    <input
                                        type="number"
                                        readOnly
                                        className="border border-gray-300 h-10 rounded p-1 w-full text-center bg-gray-100"
                                        value={item.sgstAmt}
                                        placeholder='0'
                                    />
                                </td>
                                <td className="px-2 py-3 text-center border border-teal-200">
                                    <input
                                        type="number"
                                        readOnly
                                        className="border border-gray-300 h-10 rounded p-1 w-full text-center bg-gray-100"
                                        value={item.totalGst} placeholder='0'
                                    />
                                </td>
                                <td className="px-2 py-3 text-center border border-teal-200">
                                    <input
                                        type="number"
                                        readOnly
                                        className="border border-gray-300 h-10 rounded p-1 w-full text-center bg-gray-100"
                                        value={item.grandTotal} placeholder='0'
                                    />
                                </td>
                                <td className="px-2 py-3 text-center border border-teal-200">
                                    <Dropdown
                                        options={["Debit", "Credit"]}
                                        width="w-full"
                                        placeholder="Debit/Credit"
                                        onSelect={(value) => onUpdateItem(item.id, 'debitCredit', value)}
                                    />
                                </td>
                                <td className="px-2 py-3 text-center border border-teal-200 rounded-br-lg">
                                    <button
                                        onClick={() => onDeleteRow(item.id)}
                                        className="bg-red-600 hover:bg-red-700 rounded text-white py-1 px-2 w-full text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Tablegst;