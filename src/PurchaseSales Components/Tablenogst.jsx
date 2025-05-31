import React from 'react';
import Dropdown from "../Dropdown"; // Assuming this is your Dropdown component

function Tablenogst({ items, onUpdateItem, onDeleteRow, errors }) { // Receive errors prop
    return (
        <div className="h-72 bg-white mx-5 rounded-xl overflow-x-auto">
            <div className="min-w-[900px]">
                <table className="min-w-full bg-white text-base shadow-sm border border-teal-200 rounded-xl">
                    <thead className="bg-teal-700 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left border border-teal-200 w-[250px] rounded-tl-lg">Item Name</th>
                            <th className="px-4 py-3 text-center border border-teal-200 w-[80px]">Qty</th>
                            <th className="px-4 py-3 text-center border border-teal-200 w-[160px]">UOM</th>
                            <th className="px-4 py-3 text-center border border-teal-200 w-[120px]">Price</th>
                            <th className="px-4 py-3 text-center border border-teal-200 w-[120px]">Amount</th>
                            <th className="px-4 py-3 text-center border border-teal-200 w-[140px]">Debit/Credit</th>
                            <th className="px-4 py-3 text-center border border-teal-200 w-[100px] rounded-tr-lg">Action</th>
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
                                <td className="px-4 py-3 text-center border border-teal-200">
                                    <input
                                        type="number"
                                        className={`border ${errors[`item-${index}-qty`] ? 'border-red-500' : 'border-gray-300'} h-10 rounded p-1 w-full text-center`}
                                        value={item.qty}
                                         placeholder='Qty'
                                        onChange={(e) => onUpdateItem(item.id, 'qty', e.target.value)}
                                    />
                                    {errors[`item-${index}-qty`] && <p className="text-red-500 text-xs mt-1">{errors[`item-${index}-qty`]}</p>}
                                </td>
                                <td className="px-4 py-3 text-center border border-teal-200">
                                    <Dropdown
                                        options={["Grams", "Quintal", "Nos"]}
                                        width="w-full"
                                       
                                         placeholder='Select UOM'
                                        onSelect={(value) => onUpdateItem(item.id, 'uom', value)}
                                    />
                                </td>
                                <td className="px-4 py-3 text-center border border-teal-200">
                                    <input
                                        type="number"
                                        className={`border ${errors[`item-${index}-price`] ? 'border-red-500' : 'border-gray-300'} h-10 rounded p-1 w-full text-center`}
                                        value={item.price}
                                         placeholder='0'
                                        onChange={(e) => onUpdateItem(item.id, 'price', e.target.value)}
                                    />
                                    {errors[`item-${index}-price`] && <p className="text-red-500 text-xs mt-1">{errors[`item-${index}-price`]}</p>}
                                </td>
                                <td className="px-4 py-3 text-center border border-teal-200">
                                    <input
                                        type="number"
                                        readOnly
                                        className="border border-gray-300 rounded h-10 p-1 w-full text-center bg-gray-100"
                                        value={item.amount}
                                         placeholder='0'
                                    />
                                </td>
                                <td className="px-4 py-3 text-center border border-teal-200">
                                    <Dropdown
                                        options={["Debit", "Credit"]}
                                        width="w-full"
                                        placeholder="Debit/Credit"
                                        onSelect={(value) => onUpdateItem(item.id, 'debitCredit', value)}
                                    />
                                </td>
                                <td className="px-4 py-3 text-center border border-teal-200">
                                    <button
                                        onClick={() => onDeleteRow(item.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 w-full text-sm"
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

export default Tablenogst;