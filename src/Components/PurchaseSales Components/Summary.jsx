import React, { useMemo, useState } from 'react';
import ConfirmModel from '../../essentials/ConfirmModel';
function SummaryAndActions({ items, sundryEntries, showGST, onSave, onReset, onSaveReference }) {
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    const calculateTotals = useMemo(() => {
        let subtotal = 0, totalGST = 0, grandTotal = 0, sundryTotal = 0;

        items.forEach(item => {
            const amount = parseFloat(item.amount) || 0;
            subtotal += amount;
            if (showGST) totalGST += parseFloat(item.totalGst) || 0;
        });

        sundryEntries.forEach(entry => {
            const value = parseFloat(entry.value) || 0;
            sundryTotal += entry.category === 'Roundoff (-)' ? -value : value;
        });

        grandTotal = subtotal + (showGST ? totalGST : 0) + sundryTotal;
        return { subtotal, totalGST, grandTotal, sundryTotal };
    }, [items, sundryEntries, showGST]);

    const { subtotal, totalGST, grandTotal, sundryTotal } = calculateTotals;

    return (
        <div className="flex flex-col items-center justify-center w-full space-y-6">
            {/* Summary */}
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Order Summary</h2>
                <div className="space-y-3">
                    <div className="flex justify-between border-b py-2">
                        <span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {showGST && (
                        <div className="flex justify-between border-b py-2">
                            <span>Total GST:</span><span>₹{totalGST.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between border-b py-2">
                        <span>Sundry Total:</span><span>₹{sundryTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-3 text-indigo-800 font-bold text-lg">
                        <span>Grand Total:</span><span>₹{grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md">
                <button
                    onClick={onSaveReference}
                    className="px-6 py-2.5 bg-indigo-800 text-white rounded-lg flex items-center justify-center"
                >
                    <i className="fas fa-save mr-2"></i> Save
                </button>

                <button
                    onClick={() => setShowResetConfirm(true)}
                    className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center"
                >
                    <i className="fas fa-redo mr-2"></i> Reset
                </button>

                <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-lg flex items-center justify-center"
                >
                    <i className="fas fa-times mr-2"></i> Cancel
                </button>
            </div>

            {/* Reset Confirmation Modal */}
            <ConfirmModel
                isOpen={showResetConfirm}
                title="Confirm Reset"
                message="Are you sure you want to reset all entries? This action cannot be undone."
                onConfirm={() => {
                    onReset();
                    setShowResetConfirm(false);
                }}
                onCancel={() => setShowResetConfirm(false)}
            />

            {/* Cancel Confirmation Modal */}
            <ConfirmModel
                isOpen={showCancelConfirm}
                title="Confirm Cancel"
                message="Are you sure you want to cancel? All unsaved data will be lost."
                onConfirm={() => {
                    // handle cancel logic or navigate away
                    console.log("Cancelled");
                    setShowCancelConfirm(false);
                }}
                onCancel={() => setShowCancelConfirm(false)}
            />
        </div>
    );
}

export default SummaryAndActions;
