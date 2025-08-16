import React from 'react';
import ExistingDuesTable from './ExistingDuesTable';

const PartyDetailsSection = ({
    partyDate,
    setPartyDate,
    partyName,
    setPartyName,
    transactionMethod,
    setTransactionMethod,
    payoutAmount,
    setPayoutAmount,
    nafedCheckbox,
    setNafedCheckbox,
    existingDues,
    setExistingDues,
}) => {
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-2a2 2 0 01-2-2V6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2zM7 20h2a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold" style={{ color: colors.primary }}>
                    Party Details
                </h2>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Date */}
                <div>
                    <label htmlFor="partyDate" className="block mb-2 text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Date
                    </label>
                    <input
                        type="date"
                        id="partyDate"
                        value={partyDate}
                        onChange={(e) => setPartyDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            focusRingColor: colors.primary
                        }}
                    />
                </div>

                {/* Party Name */}
                <div>
                    <label htmlFor="partyName" className="block mb-2 text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Party Name
                    </label>
                    <select
                        id="partyName"
                        value={partyName}
                        onChange={(e) => setPartyName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            backgroundColor: 'white',
                            focusRingColor: colors.primary
                        }}
                    >
                        <option value="">— Select Party —</option>
                        <option>Ems Cocos</option>
                        <option>APA Rasu</option>
                        <option>Anand SOK</option>
                        <option>Mohan</option>
                        <option>Naveen</option>
                    </select>
                </div>

                {/* Transaction Method */}
                <div>
                    <label htmlFor="transactionMethod" className="block mb-2 text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                        Transaction Method
                    </label>
                    <select
                        id="transactionMethod"
                        value={transactionMethod}
                        onChange={(e) => setTransactionMethod(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            backgroundColor: 'white',
                            focusRingColor: colors.primary
                        }}
                    >
                        <option value="">— Select Method —</option>
                        <option>Account</option>
                        <option>Cash</option>
                        <option>Others</option>
                    </select>
                </div>

                {/* Payout Amount */}
                <div>
                    <label htmlFor="payoutAmount" className="block mb-2 text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Payout Amount (₹)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        id="payoutAmount"
                        placeholder="Enter payout amount"
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            focusRingColor: colors.primary
                        }}
                    />
                </div>

                {/* Nafed Checkbox */}
                <div className="flex items-center gap-3 mt-2">
                    <input
                        type="checkbox"
                        id="nafedCheckbox"
                        className="hidden peer"
                        checked={nafedCheckbox}
                        onChange={(e) => setNafedCheckbox(e.target.checked)}
                    />
                    <label
                        htmlFor="nafedCheckbox"
                        className="w-6 h-6 flex items-center justify-center bg-white border-2 rounded cursor-pointer transition duration-200"
                        style={{
                            borderColor: colors.primary,
                            backgroundColor: nafedCheckbox ? colors.primary : 'white'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </label>
                    <label htmlFor="nafedCheckbox" className="text-sm font-medium cursor-pointer" style={{ color: colors.text }}>
                        Nafed
                    </label>
                </div>
            </div>

            {/* Existing Dues Section */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: colors.border }}>
                <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: colors.primary }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Existing Dues
                </h3>
                <ExistingDuesTable existingDues={existingDues} setExistingDues={setExistingDues} primaryColor={colors.primary} />
            </div>
        </div>
    );
};

export default PartyDetailsSection;