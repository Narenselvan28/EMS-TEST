import React, { useMemo, useState } from 'react';

function SummaryAndActions({ items, sundryEntries, showGST, onSave, onReset, onSaveReference }) {
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

    const handleResetConfirm = () => {
        onReset();
        setShowResetConfirm(false);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full space-y-6">
            {/* Summary Card - Centered */}
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Order Summary</h2>
                
                <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    {showGST && (
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Total GST:</span>
                            <span className="font-medium">₹{totalGST.toFixed(2)}</span>
                        </div>
                    )}
                    
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Sundry Total:</span>
                        <span className="font-medium">₹{sundryTotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between pt-3">
                        <span className="text-lg font-bold text-teal-800">Grand Total:</span>
                        <span className="text-lg font-bold text-teal-800">₹{grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons - Centered */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md">
                <button
                    onClick={onSaveReference}
                    className="flex items-center justify-center px-6 py-2.5 bg-teal-800 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
                >
                    <i className="fas fa-save mr-2"></i>
                    Save
                </button>
                
                <button
                    onClick={() => setShowResetConfirm(true)}
                    className="flex items-center justify-center px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                >
                    <i className="fas fa-redo mr-2"></i>
                    Reset
                </button>
                
                <button
                    onClick={onSaveReference}
                    className="flex items-center justify-center px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                    <i className="fas fa-times mr-2"></i>
                    Cancel
                </button>
            </div>

            {/* Reset Confirmation Modal - Centered by default */}
            {showResetConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Confirm Reset</h3>
                        <p className="text-gray-600 mb-6 text-center">
                            ⚠️ All entered data will be permanently deleted.
                        </p>
                        <div className="flex justify-center space-x-3">
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleResetConfirm}
                                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SummaryAndActions;