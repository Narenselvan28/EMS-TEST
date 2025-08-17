import React, { useEffect, useCallback } from 'react';
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
    // Color palette based on #3182CE
    const colors = {
        primary: '#3182CE',
        primaryLight: '#EBF5FF',
        primaryDark: '#2C5282',
        border: '#BEE3F8',
        text: '#2D3748',
        textLight: '#4A5568'
    };

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
        <div className="bg-white rounded-xl border p-6 mb-8" style={{ 
            borderColor: colors.border,
            boxShadow: '0 1px 3px rgba(49, 130, 206, 0.12)'
        }}>
            {/* Header */}
            <div className="flex items-center mb-6 pb-4 border-b" style={{ borderColor: colors.border }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg text-white mr-3" style={{ backgroundColor: colors.primary }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold" style={{ color: colors.primary }}>
                    Vendor Details
                </h2>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Vendor Name */}
                <div>
                    <label htmlFor="vendorName" className="block mb-2 text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Vendor Name
                    </label>
                    <select
                        id="vendorName"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            backgroundColor: 'white',
                            focusRingColor: colors.primary
                        }}
                    >
                        <option value="">— Select Vendor —</option>
                        <option>ABC Supplies</option>
                        <option>XYZ Services</option>
                        <option>Fuel Station A</option>
                        <option>Maintenance Co.</option>
                    </select>
                </div>

                {/* Expense Category */}
                <div>
                    <label htmlFor="expenseCategory" className="block mb-2 text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Expense Category
                    </label>
                    <select
                        id="expenseCategory"
                        value={expenseCategory}
                        onChange={(e) => setExpenseCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            backgroundColor: 'white',
                            focusRingColor: colors.primary
                        }}
                    >
                        <option value="">— Select Category —</option>
                        <option value="petrol">Petrol</option>
                        <option value="service">Service</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                {/* Transaction Method */}
                <div>
                    <label htmlFor="vendorTransactionMethod" className="block mb-2 text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                        Transaction Method
                    </label>
                    <select
                        id="vendorTransactionMethod"
                        value={vendorTransactionMethod}
                        onChange={(e) => setVendorTransactionMethod(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            backgroundColor: 'white',
                            focusRingColor: colors.primary
                        }}
                    >
                        <option value="">— Select Method —</option>
                        <option>Cash</option>
                        <option>Account</option>
                    </select>
                </div>

                {/* Amount */}
                <div>
                    <label htmlFor="vendorAmount" className="block mb-2 text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Amount (₹)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        id="vendorAmount"
                        placeholder="Enter amount"
                        value={vendorAmount}
                        onChange={(e) => setVendorAmount(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            focusRingColor: colors.primary
                        }}
                    />
                </div>

                {/* Remarks (full width) */}
                <div className="col-span-full">
                    <label htmlFor="vendorRemarks" className="block mb-2 text-sm font-medium" style={{ color: colors.text }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        Remarks
                    </label>
                    <textarea
                        id="vendorRemarks"
                        placeholder="Enter remarks"
                        value={vendorRemarks}
                        onChange={(e) => setVendorRemarks(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                            focusRingColor: colors.primary
                        }}
                    ></textarea>
                </div>
            </div>

            {/* Tripsheet Entries Section (conditionally shown) */}
            {(expenseCategory === 'petrol' || expenseCategory === 'fuel') && tripsheetEntries.length > 0 && (
                <div className="mt-8 pt-6 border-t" style={{ borderColor: colors.border }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold flex items-center" style={{ color: colors.primary }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Tripsheet Entries
                        </h3>
                        <button 
                            onClick={addTripsheetEntryRow} 
                            className="px-4 py-2 rounded-lg text-sm font-medium"
                            style={{
                                backgroundColor: colors.primary,
                                color: 'white',
                                hoverBackgroundColor: colors.primaryDark
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Entry
                        </button>
                    </div>

                    <TripsheetEntriesTable
                        tripsheetEntries={tripsheetEntries}
                        updateTripsheetEntry={updateTripsheetEntry}
                        toggleTripsheetCloseVoucher={toggleTripsheetCloseVoucher}
                        primaryColor={colors.primary}
                    />
                </div>
            )}
        </div>
    );
};


export default VendorDetailsSection;