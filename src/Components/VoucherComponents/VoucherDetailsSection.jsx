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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-white shadow-md rounded-xl p-6 transition-all">
            <div>
                <label htmlFor="voucherDate" className="block mb-2 font-medium text-gray-700">
                    Date
                </label>
                <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200"
                    id="voucherDate"
                    value={voucherDate}
                    onChange={validateDateYear}
                    onInput={validateDateYear}
                />
            </div>

            <div>
                <label htmlFor="voucherType" className="block mb-2 font-medium text-gray-700">
                    Voucher Type
                </label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200"
                    id="voucherType"
                    value={voucherType}
                    onChange={(e) => setVoucherType(e.target.value)}
                >
                    <option value="">- Select Voucher Type -</option>
                    <option value="payout">Payout</option>
                    <option value="receipt">Receipt</option>
                </select>
            </div>

            <div>
                <label htmlFor="voucherCategory" className="block mb-2 font-medium text-gray-700">
                    Voucher Category
                </label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200"
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
