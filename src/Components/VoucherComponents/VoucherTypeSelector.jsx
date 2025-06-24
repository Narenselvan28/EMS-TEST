import React from 'react';

const VoucherTypeSelector = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 glass-card p-6 floating transition-all">
            <div>
                <label htmlFor="voucherDate" className="block mb-2 font-medium text-gray-700">
                    <i className="fas fa-calendar-alt mr-2"></i> Date
                </label>
                <input type="date" className="w-full glass-panel focus:ring-2 focus:ring-indigo-200" id="voucherDate" />
            </div>

            <div className="select-wrapper">
                <label htmlFor="voucherType" className="block mb-2 font-medium text-gray-700">
                    <i className="fas fa-cash-register mr-2"></i> Voucher Type
                </label>
                <select className="w-full glass-panel focus:ring-2 focus:ring-indigo-200" id="voucherType">
                    <option value="">- Select Voucher Type -</option>
                    <option value="payout">Payout</option>
                    <option value="receipt">Receipt</option>
                </select>
            </div>

            <div className="select-wrapper">
                <label htmlFor="voucherCategory" className="block mb-2 font-medium text-gray-700">
                    <i className="fas fa-tags mr-2"></i> Voucher Category
                </label>
                <select className="w-full glass-panel focus:ring-2 focus:ring-indigo-200" id="voucherCategory">
                    <option value="">- Select Voucher Category -</option>
                </select>
            </div>
        </div>
    );
};

export default VoucherTypeSelector; 