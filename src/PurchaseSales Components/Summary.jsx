import React, { useMemo, useState } from 'react';

function SummaryAndActions({ items, sundryEntries, showGST, onSave, onReset, onSaveReference }) {
    // State to control the visibility of the reset confirmation popup
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const calculateTotals = useMemo(() => {
        let subtotal = 0;
        let totalGST = 0;
        let grandTotal = 0;
        let sundryTotal = 0;

        items.forEach(item => {
            const amount = parseFloat(item.amount) || 0;
            subtotal += amount;

            if (showGST) {
                totalGST += parseFloat(item.totalGst) || 0;
            }
        });

        sundryEntries.forEach(entry => {
            const value = parseFloat(entry.value) || 0;
            if (entry.category === 'Roundoff (-)') {
                sundryTotal -= value;
            } else {
                sundryTotal += value;
            }
        });

        grandTotal = subtotal + (showGST ? totalGST : 0) + sundryTotal;

        return { subtotal, totalGST, grandTotal, sundryTotal };
    }, [items, sundryEntries, showGST]);

    const { subtotal, totalGST, grandTotal, sundryTotal } = calculateTotals;

    // Handler for confirming the reset action
    const handleResetConfirm = () => {
        onReset(); // Call the parent's onReset function
        setShowResetConfirm(false); // Close the popup
    };

    return (
        <div className='flex flex-col items-center'>  
          <div className="bg-white p-6 w-[30%] rounded-2xl m-5 shadow-lg flex flex-col md:flex-col justify-between items-start md:items-center space-y-4 md:space-y-0 ">
            {/* Summary Section */}
            <h1 className='font-bold text-2xl mt-3 mb-5'>Summary</h1>
            <div className="w-full flex flex-col gap-2  md:w-auto flex-grow space-y-2 text-gray-700">
                <div className="flex justify-between  border-b border-gray-200  text-lg">
                    <span className="font-semibold">Sub total:</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                {showGST && (
                    <div className="flex justify-between gap-5 border-b border-gray-200 items-center text-lg">
                        <span className="font-semibold">Total GST:</span>
                        <span className="font-semibold">₹{totalGST.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between items-center gap-5 *: text-lg">
                    <span className="font-semibold">Sundry Total:</span>
                    <span className="font-semibold">₹{sundryTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xl text-[#5C53DE] font-bold mt-4 pt-2 border-t border-gray-200">
                    <span>Grand Total:</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                </div>
            </div>



            {/* Custom Reset Confirmation Popup */}
            {showResetConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Reset</h3>
                        <p className="text-gray-700 mb-6">
                            ⚠️ Warning: All data will be reset. This action cannot be undone.
                            Are you sure you want to proceed?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md font-medium transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleResetConfirm}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-medium transition-all"
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
            {/* Action Buttons */}
            <div className="w-full mr-6 md:w-auto flex flex-col md:flex-row md:ml-8 space-y-3 md:space-y-0 md:space-x-4">
                <button
                    onClick={onSaveReference}
                    className="btn-primary pr-5 bg-indigo-600 text-white font-bold   p-3 rounded-lg text-base font-medium glow transition-all"
                >
                    <i className="fas fa-save mr-2 "></i> Save
                </button>

                <button
                    onClick={() => setShowResetConfirm(true)} // Open the custom popup
                    className="bg-red-600 hover:bg-red-300 text-white p-3 pr-5  rounded-lg text-base font-medium shadow-md transition-all"
                >
                    <i className="fas fa-redo mr-2"></i> Reset
                </button>

                <button
                    onClick={onSaveReference}
                    className="btn-primary pr-5 bg-red-600 text-white font-bold   p-3 rounded-lg text-base font-medium glow transition-all"
                >
                    <i className="fas fa-save mr-2"></i> Cancel
                </button>
            </div>
        </div>
    );
}

export default SummaryAndActions;
