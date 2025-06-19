import React, { useState, useEffect, useCallback } from "react";

function SundrySection({ sundryEntries, onEntriesChange, errors }) {
    const [showSundry, setShowSundry] = useState(false);
    const [category, setCategory] = useState("");
    const [value, setValue] = useState("");
    const [remarks, setRemarks] = useState("");
    const [editingIndex, setEditingIndex] = useState(null); // State to store the index of the entry being edited

    // Effect to update inputValue when initialValue prop changes (e.g., when a new item row is added)
    // This effect is not directly used in this component as it manages its own inputs.
    // It would be relevant if an initialValue prop was passed for the input fields themselves.

    const addOrUpdateSundryEntry = useCallback(() => {
        // Basic local validation before adding/updating
        if (!category || !value || parseFloat(value) < 0) {
            // You could set a local error state here if you want immediate feedback before general validation
            return;
        }

        const newEntry = {
            category,
            value: parseFloat(value).toFixed(2),
            remarks
        };

        let updatedEntries;
        if (editingIndex !== null) {
            // Update existing entry
            updatedEntries = sundryEntries.map((entry, index) =>
                index === editingIndex ? newEntry : entry
            );
            setEditingIndex(null); // Exit edit mode
        } else {
            // Add new entry
            updatedEntries = [...sundryEntries, newEntry];
        }

        onEntriesChange(updatedEntries);

        // Clear input fields
        setCategory("");
        setValue("");
        setRemarks("");
    }, [category, value, remarks, sundryEntries, onEntriesChange, editingIndex]);

    const deleteEntry = useCallback((index) => {
        const updatedEntries = sundryEntries.filter((_, i) => i !== index);
        onEntriesChange(updatedEntries);
        // If the deleted entry was the one being edited, cancel edit mode
        if (editingIndex === index) {
            setEditingIndex(null);
            setCategory("");
            setValue("");
            setRemarks("");
        }
    }, [sundryEntries, onEntriesChange, editingIndex]);

    const editEntry = useCallback((index) => {
        const entryToEdit = sundryEntries[index];
        setCategory(entryToEdit.category);
        setValue(entryToEdit.value);
        setRemarks(entryToEdit.remarks);
        setEditingIndex(index);
        setShowSundry(true); // Ensure sundry section is open when editing
    }, [sundryEntries]);

    const cancelEdit = useCallback(() => {
        setEditingIndex(null);
        setCategory("");
        setValue("");
        setRemarks("");
    }, []);

    useEffect(() => {
        if (!showSundry) {
            setCategory("");
            setValue("");
            setRemarks("");
            setEditingIndex(null); // Also reset editing index when sundry is disabled
            onEntriesChange([]); // Clear entries when sundry is disabled
        }
    }, [showSundry, onEntriesChange]);

    return (
        <>
            <div className="flex items-center space-x-3 bg-white w-52  p-3 rounded-3xl my-0 d-lg mx-5">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showSundry}
                        onChange={() => setShowSundry(!showSundry)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                        {showSundry ? 'Sundry Enabled' : 'Sundry Disabled'}
                    </span>
                </label>
            </div>

            <div className="p-6 bg-white m-5 glass-card rounded-xl flex flex-col md:flex-row md:space-x-6 mb-6 transition-all hover:glow">
                <div
                    className={`w-full md:w-1/3 transition-all duration-300 space-y-4 ${
                        showSundry ? "opacity-100 pointer-events-auto" : "opacity-50 pointer-events-none"
                    }`}
                >
                    <h2 className="text-xl font-semibold text-primary">Sundry Details</h2>

                    <div>
                        <label className="block mb-2 font-medium text-secondary">Category <span className="text-red-500">*</span></label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={`glass-panel border ${errors[`sundry-${sundryEntries.length}-category`] && editingIndex === null ? 'border-red-500' : 'border-slate-200'} p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-200`}
                            disabled={!showSundry}
                        >
                            <option value="">- Select -</option>
                            <option>Gunny Bags</option>
                            <option>Loading Charges</option>
                            <option>Unloading Charges</option>
                            <option>Transport Charges</option>
                            <option>Roundoff (+)</option>
                            <option>Roundoff (-)</option>
                            <option>Other</option>
                        </select>
                        {/* Display error for the *next* sundry entry, as it's for the inputs, only when not editing */}
                        {errors[`sundry-${sundryEntries.length}-category`] && editingIndex === null && <p className="text-red-500 text-xs mt-1">{errors[`sundry-${sundryEntries.length}-category`]}</p>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-secondary">Value (₹) <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            step="0.01"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter Value"
                            disabled={!showSundry}
                            className={`glass-panel border ${errors[`sundry-${sundryEntries.length}-value`] && editingIndex === null ? 'border-red-500' : 'border-slate-200'} p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-200`}
                        />
                        {errors[`sundry-${sundryEntries.length}-value`] && editingIndex === null && <p className="text-red-500 text-xs mt-1">{errors[`sundry-${sundryEntries.length}-value`]}</p>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-secondary">Remarks</label>
                        <input
                            type="text"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Remarks"
                            disabled={!showSundry}
                            className="glass-panel border border-slate-200 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-200"
                        />
                    </div>

                    <button
                        onClick={addOrUpdateSundryEntry}
                        className="btn-primary px-4 py-3 rounded-lg w-full disabled:opacity-50 transition-all"
                        disabled={!showSundry || !category || !value || parseFloat(value) < 0}
                    >
                        {editingIndex !== null ? 'Update Sundry' : 'Add Sundry'}
                    </button>
                    {editingIndex !== null && (
                        <button
                            onClick={cancelEdit}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-3 rounded-lg w-full mt-2 transition-all"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>

                <div className="w-full md:w-2/3 glass-panel rounded-xl p-6 overflow-x-auto mt-6 md:mt-0 transition-all hover:glow">
                    <h2 className="text-xl font-semibold mb-4 text-primary">Sundry Entries</h2>
                    <table className="w-full border border-teal-200 text-left border-collapse">
                        <thead>
                            <tr className="table-header bg-teal-600 text-white font-bold rounded-lg">
                                <th className="py-3 px-4 border border-teal-200 rounded-tl-lg">Category</th>
                                <th className="py-3 px-4 border border-teal-200">Value (₹)</th>
                                <th className="py-3 px-4 border border-teal-200">Remarks</th>
                                <th className="py-3 px-4 border border-teal-200 rounded-tr-lg w-36">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-teal-100">
                            {sundryEntries.map((entry, index) => (
                                <tr key={index}>
                                    <td className="py-3 px-4 border border-teal-200">{entry.category}</td>
                                    <td className="py-3 px-4 border border-teal-200">₹ {entry.value}</td>
                                    <td className="py-3 px-4 border border-teal-200">{entry.remarks}</td>
                                    <td className="py-3 px-4 border border-teal-200 text-center flex space-x-2">
                                        <button
                                            onClick={() => editEntry(index)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                            disabled={!showSundry}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteEntry(index)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                            disabled={!showSundry}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {sundryEntries.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center text-gray-400 py-4">
                                        No sundry entries added.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* General sundry section error if needed */}
                    {errors.sundry && <p className="text-red-500 text-sm mt-1">{errors.sundry}</p>}
                </div>
            </div>
        </>
    );
}

export default SundrySection;