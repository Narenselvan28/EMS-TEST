import React from 'react';

const VoucherDetailsSection = ({
    voucherDate,
    setVoucherDate,
    voucherType,
    setVoucherType,
    voucherCategory,
    setVoucherCategory,
    payoutCategories,
    receiptCategories,
    validateDateYear
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 glass-card p-6 floating transition-all">
            <div>
                <label htmlFor="voucherDate" className="block mb-2 font-medium text-gray-700">
                    <i className="fas fa-calendar-alt mr-2"></i> Date
                </label>
                <input
                    type="date"
                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                    id="voucherDate"
                    value={voucherDate}
                    onChange={validateDateYear}
                    onInput={validateDateYear}
                />
            </div>

            <div className="select-wrapper">
                <label htmlFor="voucherType" className="block mb-2 font-medium text-gray-700">
                    <i className="fas fa-cash-register mr-2"></i> Voucher Type
                </label>
                <select
                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                    id="voucherType"
                    value={voucherType}
                    onChange={(e) => setVoucherType(e.target.value)}
                >
                    <option value="">- Select Voucher Type -</option>
                    <option value="payout">Payout</option>
                    <option value="receipt">Receipt</option>
                </select>
            </div>

            <div className="select-wrapper">
                <label htmlFor="voucherCategory" className="block mb-2 font-medium text-gray-700">
                    <i className="fas fa-tags mr-2"></i> Voucher Category
                </label>
                <select
                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                    id="voucherCategory"
                    value={voucherCategory}
                    onChange={(e) => setVoucherCategory(e.target.value)}
                >
                    <option value="">- Select Voucher Category -</option>
                    {voucherType === 'payout' && payoutCategories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.text}</option>
                    ))}
                    {voucherType === 'receipt' && receiptCategories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.text}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default VoucherDetailsSection;