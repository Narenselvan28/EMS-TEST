import React from 'react';

const GeneralVoucherSection = () => {
    return (
        <div className={`glass-card p-6 rounded-xl mb-8 section-visible`}>
            <h2 className="text-2xl font-semibold mb-6 gradient-text flex items-center">
                <i className="fas fa-file-alt mr-3"></i> General Voucher Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="generalAmount" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-coins mr-2"></i> Amount (₹)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="generalAmount"
                        placeholder="Enter Amount"
                    />
                </div>
                <div>
                    <label htmlFor="generalDescription" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-comment-dots mr-2"></i> Description
                    </label>
                    <textarea
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="generalDescription"
                        placeholder="Enter Description"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default GeneralVoucherSection;