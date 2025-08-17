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
    // Enhanced color palette based on #3182CE with better contrast
    const colors = {
        primary: '#3182CE',
        primaryLight: '#EBF5FF',
        primaryLighter: '#BEE3F8',
        primaryDark: '#2C5282',
        border: '#E2E8F0',
        borderDark: '#CBD5E0',
        text: '#2D3748',
        textLight: '#4A5568',
        background: '#F7FAFC'
    };

    // Party options for the dropdown
    const partyOptions = [
        { value: '', label: '— Select Party —', disabled: true },
        { value: 'Ems Cocos', label: 'Ems Cocos' },
        { value: 'APA Rasu', label: 'APA Rasu' },
        { value: 'Anand SOK', label: 'Anand SOK' },
        { value: 'Mohan', label: 'Mohan' },
        { value: 'Naveen', label: 'Naveen' }
    ];

    // Transaction method options
    const transactionOptions = [
        { value: '', label: '— Select Method —', disabled: true },
        { value: 'Account', label: 'Account' },
        { value: 'Cash', label: 'Cash' },
        { value: 'Others', label: 'Others' }
    ];

    return (
        <div className="bg-white rounded-xl border p-6 mb-8 transition-all duration-200 hover:shadow-md" style={{ 
            borderColor: colors.borderDark,
            boxShadow: '0 1px 3px rgba(49, 130, 206, 0.08)'
        }}>
            {/* Header with improved styling */}
            <div className="flex items-center mb-6 pb-4 border-b" style={{ borderColor: colors.border }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg text-white mr-3 shadow-sm" style={{ 
                    backgroundColor: colors.primary,
                    boxShadow: `0 2px 4px ${colors.primaryLight}`
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl font-semibold" style={{ color: colors.primaryDark }}>
                        Party Details
                    </h2>
                    <p className="text-xs" style={{ color: colors.textLight }}>
                        Enter party information and transaction details
                    </p>
                </div>
            </div>

            {/* Form Grid with better spacing and hover effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Date Field */}
                <div className="space-y-1">
                    <label htmlFor="partyDate" className="flex items-center text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Date
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            id="partyDate"
                            value={partyDate}
                            onChange={(e) => setPartyDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1 transition-all duration-150"
                            style={{
                                borderColor: colors.border,
                                color: colors.text,
                                backgroundColor: colors.background,
                                focusRingColor: colors.primary,
                                hoverBorderColor: colors.primaryLighter
                            }}
                        />
                    </div>
                </div>

                {/* Party Name Field */}
                <div className="space-y-1">
                    <label htmlFor="partyName" className="flex items-center text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Party Name
                    </label>
                    <div className="relative">
                        <select
                            id="partyName"
                            value={partyName}
                            onChange={(e) => setPartyName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1 appearance-none transition-all duration-150"
                            style={{
                                borderColor: colors.border,
                                color: partyName ? colors.text : colors.textLight,
                                backgroundColor: colors.background,
                                focusRingColor: colors.primary
                            }}
                        >
                            {partyOptions.map((option) => (
                                <option 
                                    key={option.value} 
                                    value={option.value} 
                                    disabled={option.disabled}
                                    style={{ color: option.disabled ? colors.textLight : colors.text }}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="h-4 w-4" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Transaction Method Field */}
                <div className="space-y-1">
                    <label htmlFor="transactionMethod" className="flex items-center text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                        Transaction Method
                    </label>
                    <div className="relative">
                        <select
                            id="transactionMethod"
                            value={transactionMethod}
                            onChange={(e) => setTransactionMethod(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1 appearance-none transition-all duration-150"
                            style={{
                                borderColor: colors.border,
                                color: transactionMethod ? colors.text : colors.textLight,
                                backgroundColor: colors.background,
                                focusRingColor: colors.primary
                            }}
                        >
                            {transactionOptions.map((option) => (
                                <option 
                                    key={option.value} 
                                    value={option.value} 
                                    disabled={option.disabled}
                                    style={{ color: option.disabled ? colors.textLight : colors.text }}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="h-4 w-4" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Payout Amount Field */}
                <div className="space-y-1">
                    <label htmlFor="payoutAmount" className="flex items-center text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Payout Amount (₹)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            step="0.01"
                            id="payoutAmount"
                            placeholder="0.00"
                            value={payoutAmount}
                            onChange={(e) => setPayoutAmount(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1 transition-all duration-150"
                            style={{
                                borderColor: colors.border,
                                color: colors.text,
                                backgroundColor: colors.background,
                                focusRingColor: colors.primary
                            }}
                        />
                        <span className="absolute left-3 top-2 text-sm" style={{ color: colors.textLight }}>
                            ₹
                        </span>
                    </div>
                </div>

                {/* Nafed Checkbox with better toggle */}
                <div className="flex items-end space-x-3">
                    <div className="flex items-center h-10">
                        <input
                            type="checkbox"
                            id="nafedCheckbox"
                            className="hidden peer"
                            checked={nafedCheckbox}
                            onChange={(e) => setNafedCheckbox(e.target.checked)}
                        />
                        <label
                            htmlFor="nafedCheckbox"
                            className="relative w-12 h-6 flex items-center flex-shrink-0 rounded-full p-1 transition duration-200 ease-in-out cursor-pointer"
                            style={{
                                backgroundColor: nafedCheckbox ? colors.primary : colors.border
                            }}
                        >
                            <span
                                className="bg-white w-4 h-4 rounded-full shadow-md transform transition duration-200 ease-in-out"
                                style={{
                                    transform: nafedCheckbox ? 'translateX(1.5rem)' : 'translateX(0)'
                                }}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="nafedCheckbox" className="block text-sm font-medium cursor-pointer" style={{ color: colors.text }}>
                            Nafed
                        </label>
                        <p className="text-xs" style={{ color: colors.textLight }}>
                            Check if this is a Nafed transaction
                        </p>
                    </div>
                </div>
            </div>

            {/* Existing Dues Section with improved header */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: colors.border }}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center" style={{ color: colors.primaryDark }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Existing Dues
                    </h3>
                    <button 
                        className="text-xs px-3 py-1 rounded-md flex items-center transition-colors duration-150"
                        style={{
                            backgroundColor: colors.primaryLight,
                            color: colors.primaryDark,
                            hoverBgColor: colors.primaryLighter
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Due
                    </button>
                </div>
                <ExistingDuesTable 
                    existingDues={existingDues} 
                    setExistingDues={setExistingDues} 
                    primaryColor={colors.primary}
                    borderColor={colors.border}
                />
            </div>
        </div>
    );
};

export default PartyDetailsSection;