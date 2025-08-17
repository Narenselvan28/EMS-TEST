import React from 'react';

const GeneralVoucherSection = () => {
    // Color palette based on #3182CE
    const colors = {
        primary: '#3182CE',
        primaryLight: '#EBF5FF',
        primaryDark: '#2C5282',
        border: '#BEE3F8',
        text: '#2D3748',
        textLight: '#4A5568'
    };

    return (
        <div className="bg-white rounded-xl border p-6 mb-8" style={{ 
            borderColor: colors.border,
            boxShadow: '0 1px 3px rgba(49, 130, 206, 0.12)'
        }}>
            {/* Header */}
            <div className="flex items-center mb-6 pb-4 border-b" style={{ borderColor: colors.border }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg text-white mr-3" style={{ backgroundColor: colors.primary }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold" style={{ color: colors.primary }}>
                    General Voucher Details
                </h2>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Amount */}
                <div>
                    <label htmlFor="generalAmount" className="block mb-2 text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Amount (₹)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        id="generalAmount"
                        placeholder="Enter Amount"
                        className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            focusRingColor: colors.primary
                        }}
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="generalDescription" className="block mb-2 text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        Description
                    </label>
                    <textarea
                        id="generalDescription"
                        placeholder="Enter Description"
                        rows="3"
                        className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            focusRingColor: colors.primary
                        }}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default GeneralVoucherSection; 