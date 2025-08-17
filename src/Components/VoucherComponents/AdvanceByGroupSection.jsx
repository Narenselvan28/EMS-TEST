import React, { useState, useEffect, useRef } from 'react';

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
    // State for Searchable Dropdowns
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isGroupOpen, setIsGroupOpen] = useState(false);
    const [categorySearchTerm, setCategorySearchTerm] = useState(advGroupEmployeeCategory);
    const [groupSearchTerm, setGroupSearchTerm] = useState(advGroupEmployeeGroup);

    const categoryRef = useRef(null);
    const groupRef = useRef(null);

    // Hardcoded options for the dropdowns
    const employeeCategories = ['Permanent', 'Contract', 'Intern'];
    const employeeGroups = ['Management', 'Production', 'Sales'];

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

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
            if (groupRef.current && !groupRef.current.contains(event.target)) {
                setIsGroupOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sync search terms with selected values
    useEffect(() => {
        setCategorySearchTerm(advGroupEmployeeCategory);
    }, [advGroupEmployeeCategory]);

    useEffect(() => {
        setGroupSearchTerm(advGroupEmployeeGroup);
    }, [advGroupEmployeeGroup]);

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

            {/* Top row with Date, Employee Category, and Employee Group */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {/* Date Input */}
                <div className="flex flex-col space-y-1">
                    <label className="block text-sm text-black font-medium" style={{ color: 'black' }}>
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
                            color: 'black',
                            focusRingColor: colors.primary,
                            ':focus': {
                                ringColor: `${colors.primary}50`,
                                borderColor: colors.primary
                            }
                        }}
                    />
                </div>

                {/* Employee Category Dropdown */}
                <div className="flex flex-col space-y-1 relative" ref={categoryRef}>
                    <label className="block text-sm font-medium" style={{ color: 'black' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Employee Category
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={categorySearchTerm}
                            onChange={(e) => {
                                setCategorySearchTerm(e.target.value);
                                setAdvGroupEmployeeCategory(e.target.value);
                            }}
                            onFocus={() => setIsCategoryOpen(true)}
                            placeholder="Select Category"
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3182CE]/50 focus:border-[#3182CE] transition-all"
                            style={{ borderColor: colors.border, color: colors.text }}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </div>
                    {isCategoryOpen && (
                        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {employeeCategories.filter(opt => opt.toLowerCase().includes(categorySearchTerm.toLowerCase())).map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setAdvGroupEmployeeCategory(option);
                                        setCategorySearchTerm(option);
                                        setIsCategoryOpen(false);
                                    }}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Employee Group Dropdown */}
                <div className="flex flex-col space-y-1 relative" ref={groupRef}>
                    <label className="block text-sm font-medium" style={{ color: 'black' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Employee Group
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={groupSearchTerm}
                            onChange={(e) => {
                                setGroupSearchTerm(e.target.value);
                                setAdvGroupEmployeeGroup(e.target.value);
                            }}
                            onFocus={() => setIsGroupOpen(true)}
                            placeholder="Select Group"
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3182CE]/50 focus:border-[#3182CE] transition-all"
                            style={{ borderColor: colors.border, color: colors.text }}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </div>
                    {isGroupOpen && (
                        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {employeeGroups.filter(opt => opt.toLowerCase().includes(groupSearchTerm.toLowerCase())).map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setAdvGroupEmployeeGroup(option);
                                        setGroupSearchTerm(option);
                                        setIsGroupOpen(false);
                                    }}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Bottom row with Amount and Remarks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Amount Input */}
                <div className="flex flex-col space-y-1">
                    <label className="block text-sm font-medium" style={{ color: 'black' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Amount (₹)
                    </label>
                    <div className="relative flex-grow">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: colors.textLight }}></span>
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

                {/* Remarks */}
                <div className="flex flex-col space-y-1">
                    <label className="block text-sm font-medium" style={{ color: 'black' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        Remarks
                    </label>
                    <textarea
                        value={advGroupRemarks}
                        onChange={(e) => setAdvGroupRemarks(e.target.value)}
                        placeholder="Additional notes..."
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:outline-none transition-all resize-none"
                        style={{
                            minHeight: '42px', // Explicitly set height to match the input field
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