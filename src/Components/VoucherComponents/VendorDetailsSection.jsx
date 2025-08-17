import React, { useEffect, useCallback, useState, useRef } from 'react';
import TripsheetEntriesTable from './TripsheetEntriesTable';

const VendorDetailsSection = ({
    vendorName,
    setVendorName,
    expenseCategory,
    setExpenseCategory,
    vendorTransactionMethod,
    setVendorTransactionMethod,
    vendorAmount,
    setVendorAmount,
    vendorRemarks,
    setVendorRemarks,
    tripsheetEntries,
    setTripsheetEntries,
}) => {
    // Enhanced color palette with better contrast and additional shades
    const colors = {
        primary: '#3182CE',
        primaryLight: '#EBF5FF',
        primaryLighter: '#BEE3F8',
        primaryDark: '#2C5282',
        border: '#E2E8F0',
        borderDark: '#CBD5E0',
        text: '#2D3748',
        textLight: '#4A5568',
        background: '#F7FAFC',
        success: '#38A169',
        warning: '#DD6B20',
        error: '#E53E3E'
    };

    // State for dropdown visibility and filtered options
    const [showVendorDropdown, setShowVendorDropdown] = useState(false);
    const [showExpenseDropdown, setShowExpenseDropdown] = useState(false);
    const [showTransactionDropdown, setShowTransactionDropdown] = useState(false);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    // Create a ref for each dropdown container
    const vendorDropdownRef = useRef(null);
    const expenseDropdownRef = useRef(null);
    const transactionDropdownRef = useRef(null);

    // Vendor options data
    const vendorOptions = [
        { value: 'ABC Supplies', label: 'ABC Supplies' },
        { value: 'XYZ Services', label: 'XYZ Services' },
        { value: 'Fuel Station A', label: 'Fuel Station A' },
        { value: 'Maintenance Co.', label: 'Maintenance Co.' },
        { value: 'Logistics Partners', label: 'Logistics Partners' },
        { value: 'Truck Repair Inc.', label: 'Truck Repair Inc.' },
        { value: 'Highway Fuel Stop', label: 'Highway Fuel Stop' }
    ];

    // Expense category options
    const expenseOptions = [
        { value: 'petrol', label: 'Petrol' },
        { value: 'fuel', label: 'Fuel' },
        { value: 'service', label: 'Service' },
        { value: 'maintenance', label: 'Maintenance' },
        { value: 'toll', label: 'Toll Charges' },
        { value: 'repair', label: 'Repairs' },
        { value: 'others', label: 'Others' }
    ];

    // Transaction method options
    const transactionOptions = [
        { value: 'Cash', label: 'Cash' },
        { value: 'Account', label: 'Account' },
        { value: 'Credit', label: 'Credit' },
        { value: 'Cheque', label: 'Cheque' },
        { value: 'Online', label: 'Online Transfer' }
    ];

    // Filter options based on input - only filters when there's input
    const filterOptions = (input, options) => {
        if (!input) return options; // Return all options when no input
        return options.filter(option =>
            option.label.toLowerCase().includes(input.toLowerCase()) ||
            option.value.toLowerCase().includes(input.toLowerCase())
        );
    };

    // Handle vendor input changes
    const handleVendorInputChange = (e) => {
        const value = e.target.value;
        setVendorName(value);
        setFilteredVendors(filterOptions(value, vendorOptions));
        setShowVendorDropdown(true);
    };

    const handleVendorSelect = (vendor) => {
        setVendorName(vendor.value);
        setShowVendorDropdown(false);
    };

    // Handle expense input changes
    const handleExpenseInputChange = (e) => {
        const value = e.target.value;
        setExpenseCategory(value);
        setFilteredExpenses(filterOptions(value, expenseOptions));
        setShowExpenseDropdown(true);
    };

    const handleExpenseSelect = (expense) => {
        setExpenseCategory(expense.value);
        setShowExpenseDropdown(false);
    };

    // Handle transaction input changes
    const handleTransactionInputChange = (e) => {
        const value = e.target.value;
        setVendorTransactionMethod(value);
        setFilteredTransactions(filterOptions(value, transactionOptions));
        setShowTransactionDropdown(true);
    };

    const handleTransactionSelect = (transaction) => {
        setVendorTransactionMethod(transaction.value);
        setShowTransactionDropdown(false);
    };
    
    // Updated function to show all options and toggle dropdown visibility
    const handleDropdownClick = (type) => {
        // Close all other dropdowns
        setShowVendorDropdown(type === 'vendor' ? !showVendorDropdown : false);
        setShowExpenseDropdown(type === 'expense' ? !showExpenseDropdown : false);
        setShowTransactionDropdown(type === 'transaction' ? !showTransactionDropdown : false);

        // Reset filtered options to show all available options
        switch (type) {
            case 'vendor':
                setFilteredVendors(vendorOptions);
                break;
            case 'expense':
                setFilteredExpenses(expenseOptions);
                break;
            case 'transaction':
                setFilteredTransactions(transactionOptions);
                break;
            default:
                break;
        }
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Use the ref to check if the click is outside the dropdown
            if (vendorDropdownRef.current && !vendorDropdownRef.current.contains(event.target)) {
                setShowVendorDropdown(false);
            }
            if (expenseDropdownRef.current && !expenseDropdownRef.current.contains(event.target)) {
                setShowExpenseDropdown(false);
            }
            if (transactionDropdownRef.current && !transactionDropdownRef.current.contains(event.target)) {
                setShowTransactionDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Initialize filtered options when component mounts
    useEffect(() => {
        setFilteredVendors(vendorOptions);
        setFilteredExpenses(expenseOptions);
        setFilteredTransactions(transactionOptions);
    }, []);

    const toggleTripsheetEntry = useCallback(() => {
        if (expenseCategory === 'petrol' || expenseCategory === 'fuel') {
            loadTripsheetEntries();
        } else {
            setTripsheetEntries([]);
        }
    }, [expenseCategory, setTripsheetEntries]);

    useEffect(() => {
        toggleTripsheetEntry();
    }, [expenseCategory, toggleTripsheetEntry]);

    const loadTripsheetEntries = () => {
        setTripsheetEntries([]);

        setTimeout(() => {
            const fetchedTripsheetData = [
                { id: 'TS001', date: '2023-06-01', amount: 2500, status: 'Open', closeVoucher: false },
                { id: 'TS002', date: '2023-06-05', amount: 1800, status: 'Open', closeVoucher: false },
                { id: 'TS003', date: '2023-05-28', amount: 3000, status: 'Closed', closeVoucher: true }
            ];
            setTripsheetEntries(fetchedTripsheetData);
        }, 500);
    };

    const updateTripsheetEntry = (index, field, value) => {
        const newEntries = [...tripsheetEntries];
        newEntries[index][field] = value;
        setTripsheetEntries(newEntries);
    };

    const toggleTripsheetCloseVoucher = (index) => {
        const newEntries = [...tripsheetEntries];
        if (newEntries[index].status !== 'Closed') {
            newEntries[index].closeVoucher = !newEntries[index].closeVoucher;
        }
        setTripsheetEntries(newEntries);
    };

    const addTripsheetEntryRow = () => {
        setTripsheetEntries([
            ...tripsheetEntries,
            { id: '', date: '', amount: 0, status: 'Open', closeVoucher: false }
        ]);
    };

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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl font-semibold" style={{ color: colors.primaryDark }}>
                        Vendor Details
                    </h2>
                    <p className="text-xs" style={{ color: colors.textLight }}>
                        Enter vendor information and payment details
                    </p>
                </div>
            </div>

            {/* Form Grid with better spacing and hover effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Vendor Name Field */}
                <div className="space-y-1 relative" ref={vendorDropdownRef}>
                    <label htmlFor="vendorName" className="flex items-center text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Vendor Name
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="vendorName"
                            value={vendorName}
                            onChange={handleVendorInputChange}
                            onClick={() => handleDropdownClick('vendor')}
                            placeholder="Type or select vendor"
                            className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1 transition-all duration-150"
                            style={{
                                borderColor: colors.border,
                                color: vendorName ? colors.text : colors.textLight,
                                backgroundColor: colors.background,
                                focusRingColor: colors.primary
                            }}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="h-4 w-4" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    {showVendorDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border" style={{
                            borderColor: colors.border,
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }}>
                            {filteredVendors.length > 0 ? (
                                filteredVendors.map((vendor) => (
                                    <div
                                        key={vendor.value}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        style={{ color: colors.text }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleVendorSelect(vendor);
                                        }}
                                    >
                                        {vendor.label}
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-sm text-gray-500">No vendors found</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Expense Category Field */}
                <div className="space-y-1 relative" ref={expenseDropdownRef}>
                    <label htmlFor="expenseCategory" className="flex items-center text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Expense Category
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="expenseCategory"
                            value={expenseCategory}
                            onChange={handleExpenseInputChange}
                            onClick={() => handleDropdownClick('expense')}
                            placeholder="Type or select category"
                            className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1 transition-all duration-150"
                            style={{
                                borderColor: colors.border,
                                color: expenseCategory ? colors.text : colors.textLight,
                                backgroundColor: colors.background,
                                focusRingColor: colors.primary
                            }}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="h-4 w-4" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    {showExpenseDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border" style={{
                            borderColor: colors.border,
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }}>
                            {filteredExpenses.length > 0 ? (
                                filteredExpenses.map((expense) => (
                                    <div
                                        key={expense.value}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        style={{ color: colors.text }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleExpenseSelect(expense);
                                        }}
                                    >
                                        {expense.label}
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-sm text-gray-500">No categories found</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Transaction Method Field */}
                <div className="space-y-1 relative" ref={transactionDropdownRef}>
                    <label htmlFor="vendorTransactionMethod" className="flex items-center text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                        Transaction Method
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="vendorTransactionMethod"
                            value={vendorTransactionMethod}
                            onChange={handleTransactionInputChange}
                            onClick={() => handleDropdownClick('transaction')}
                            placeholder="Type or select method"
                            className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1 transition-all duration-150"
                            style={{
                                borderColor: colors.border,
                                color: vendorTransactionMethod ? colors.text : colors.textLight,
                                backgroundColor: colors.background,
                                focusRingColor: colors.primary
                            }}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="h-4 w-4" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    {showTransactionDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border" style={{
                            borderColor: colors.border,
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }}>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((transaction) => (
                                    <div
                                        key={transaction.value}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        style={{ color: colors.text }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleTransactionSelect(transaction);
                                        }}
                                    >
                                        {transaction.label}
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-sm text-gray-500">No methods found</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Amount Field */}
                <div className="space-y-1">
                    <label htmlFor="vendorAmount" className="flex items-center text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Amount (₹)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            step="0.01"
                            id="vendorAmount"
                            placeholder="0.00"
                            value={vendorAmount}
                            onChange={(e) => setVendorAmount(e.target.value)}
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

                {/* Remarks Field (full width) - Fixed height */}
                <div className="col-span-1 space-y-1">
                    <label htmlFor="vendorRemarks" className="flex items-center text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        Remarks
                    </label>
                    <textarea
                        id="vendorRemarks"
                        placeholder="Enter any additional remarks..."
                        value={vendorRemarks}
                        onChange={(e) => setVendorRemarks(e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1 transition-all duration-150 resize-none"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            backgroundColor: colors.background,
                            focusRingColor: colors.primary,
                            minHeight: '80px',
                            maxHeight: '80px',
                            overflowY: 'auto'
                        }}
                    ></textarea>
                </div>
            </div>

            {/* Tripsheet Entries Section (conditionally shown) */}
            {(expenseCategory === 'petrol' || expenseCategory === 'fuel') && (
                <div className="mt-8 pt-6 border-t" style={{ borderColor: colors.border }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center" style={{ color: colors.primaryDark }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            Tripsheet Entries
                        </h3>
                        <button
                            onClick={addTripsheetEntryRow}
                            className="px-3 py-1.5 rounded-md text-sm font-medium flex items-center transition-colors duration-150"
                            style={{
                                backgroundColor: colors.primary,
                                color: 'white',
                                hoverBackgroundColor: colors.primaryDark
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Entry
                        </button>
                    </div>

                    {tripsheetEntries.length > 0 ? (
                        <TripsheetEntriesTable
                            tripsheetEntries={tripsheetEntries}
                            updateTripsheetEntry={updateTripsheetEntry}
                            toggleTripsheetCloseVoucher={toggleTripsheetCloseVoucher}
                            primaryColor={colors.primary}
                            borderColor={colors.border}
                        />
                    ) : (
                        <div className="text-center py-8" style={{ color: colors.textLight }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke={colors.border} strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            <p className="text-sm">No tripsheet entries found. Click "Add Entry" to create one.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VendorDetailsSection;