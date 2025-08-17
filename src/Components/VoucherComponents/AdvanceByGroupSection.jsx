import React from 'react';

const AdvanceByGroupSection = ({
    advGroupDate,
    setAdvGroupDate,
    advGroupEmployeeCategory,
    setAdvGroupEmployeeCategory,
    advGroupEmployeeGroup,
    setAdvGroupEmployeeGroup,
    advGroupAmount,
    setAdvGroupAmount,
    advGroupRemarks,
    setAdvGroupRemarks,
}) => {
    // Color palette based on #3182CE
    const colors = {
        primary: '#3182CE',
        primaryLight: '#EBF5FF',
        primaryLighter: '#F7FAFC',
        primaryDark: '#2C5282',
        border: '#BEE3F8',
        text: '#2D3748',
        textLight: '#4A5568',
        textLighter: '#718096'
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8 transition-all duration-200 hover:shadow-md" 
             style={{ borderColor: colors.border }}>
            
            {/* Header with accent color */}
            <div className="flex items-center mb-6 pb-4 border-b" style={{ borderColor: colors.border }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg mr-3" 
                     style={{ backgroundColor: colors.primary, color: 'white' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>
                    Group Advance Allocation
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Date Input */}
                <div className="space-y-1">
                    <label className="block text-sm text-black font-medium mb-1" style={{ color: 'black' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 font-semibold inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Date
                    </label>
                    <input
                        type="date"
                        value={advGroupDate}
                        onChange={(e) => setAdvGroupDate(e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:outline-none transition-all"
                        style={{
                            borderColor: colors.border,
                            color:  'black' ,
                            focusRingColor: colors.primary,
                            ':focus': {
                                ringColor: `${colors.primary}50`,
                                borderColor: colors.primary
                            }
                        }}
                    />
                </div>

                {/* Employee Category */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium mb-1" style={{ color:  'black'  }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Employee Category
                    </label>
                    <select
                        value={advGroupEmployeeCategory}
                        onChange={(e) => setAdvGroupEmployeeCategory(e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:outline-none transition-all appearance-none bg-no-repeat bg-[center_right_0.75rem]"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMTgyQ0UiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTkgOS03IDctNy03Ii8+PC9zdmc+")`,
                            ':focus': {
                                ringColor: `${colors.primary}50`,
                                borderColor: colors.primary
                            }
                        }}
                    >
                        <option value="">Select Category</option>
                        <option>Permanent</option>
                        <option>Contract</option>
                        <option>Intern</option>
                    </select>
                </div>

                {/* Employee Group */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium mb-1" style={{ color:  'black'  }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Employee Group
                    </label>
                    <select
                        value={advGroupEmployeeGroup}
                        onChange={(e) => setAdvGroupEmployeeGroup(e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:outline-none transition-all appearance-none bg-no-repeat bg-[center_right_0.75rem]"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMTgyQ0UiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTkgOS03IDctNy03Ii8+PC9zdmc+")`,
                            ':focus': {
                                ringColor: `${colors.primary}50`,
                                borderColor: colors.primary
                            }
                        }}
                    >
                        <option value="">Select Group</option>
                        <option>Management</option>
                        <option>Production</option>
                        <option>Sales</option>
                    </select>
                </div>

                {/* Amount Input */}
                <div className="space-y-1 ">
                    <label className="block text-sm font-medium mb-1" style={{ color:  'black' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Amount (₹)
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: colors.textLight }}>₹</span>
                        <input
                            type="number"
                            step="0.01"
                            value={advGroupAmount}
                            onChange={(e) => setAdvGroupAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-8 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:outline-none transition-all"
                            style={{
                                borderColor: colors.border,
                                color: colors.text,
                                ':focus': {
                                    ringColor: `${colors.primary}50`,
                                    borderColor: colors.primary
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Remarks - Full width */}
                <div className="md:col-span-2 space-y-1">
                    <label className="block text-sm font-medium mb-1" style={{ color:  'black' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        Remarks
                    </label>
                    <textarea
                        rows="3"
                        value={advGroupRemarks}
                        onChange={(e) => setAdvGroupRemarks(e.target.value)}
                        placeholder="Additional notes..."
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:outline-none transition-all resize-none"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            ':focus': {
                                ringColor: `${colors.primary}50`,
                                borderColor: colors.primary
                            }
                        }}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default AdvanceByGroupSection;