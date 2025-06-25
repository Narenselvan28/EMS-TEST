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
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <i className="fas fa-store-alt text-indigo-600 mr-3"></i> Vendor Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div>
                    <label htmlFor="vendorName" className="block mb-2 text-sm font-medium text-gray-700">
                        <i className="fas fa-building text-indigo-500 mr-2"></i> Vendor Name
                    </label>
                    <select
                        id="vendorName"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">— Select Vendor —</option>
                        <option>ABC Supplies</option>
                        <option>XYZ Services</option>
                        <option>Fuel Station A</option>
                        <option>Maintenance Co.</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="expenseCategory" className="block mb-2 text-sm font-medium text-gray-700">
                        <i className="fas fa-tags text-indigo-500 mr-2"></i> Expense Category
                    </label>
                    <select
                        id="expenseCategory"
                        value={expenseCategory}
                        onChange={(e) => setExpenseCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">— Select Category —</option>
                        <option value="petrol">Petrol</option>
                        <option value="service">Service</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="vendorTransactionMethod" className="block mb-2 text-sm font-medium text-gray-700">
                        <i className="fas fa-exchange-alt text-indigo-500 mr-2"></i> Transaction Method
                    </label>
                    <select
                        id="vendorTransactionMethod"
                        value={vendorTransactionMethod}
                        onChange={(e) => setVendorTransactionMethod(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">— Select Method —</option>
                        <option>Cash</option>
                        <option>Account</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="vendorAmount" className="block mb-2 text-sm font-medium text-gray-700">
                        <i className="fas fa-coins text-indigo-500 mr-2"></i> Amount (₹)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        id="vendorAmount"
                        placeholder="Enter amount"
                        value={vendorAmount}
                        onChange={(e) => setVendorAmount(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div className="col-span-full">
                    <label htmlFor="vendorRemarks" className="block mb-2 text-sm font-medium text-gray-700">
                        <i className="fas fa-comment-alt text-indigo-500 mr-2"></i> Remarks
                    </label>
                    <textarea
                        id="vendorRemarks"
                        placeholder="Enter remarks"
                        value={vendorRemarks}
                        onChange={(e) => setVendorRemarks(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    ></textarea>
                </div>
            </div>

            {(expenseCategory === 'petrol' || expenseCategory === 'fuel') && tripsheetEntries.length > 0 && (
                <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl mt-6">
                    <h3 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center">
                        <i className="fas fa-clipboard-list mr-2"></i> Tripsheet Entries
                    </h3>

                    <div className="flex justify-end mb-4">
                        <button onClick={addTripsheetEntryRow} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                            <i className="fas fa-plus mr-2"></i> Add Entry
                        </button>
                    </div>

                    <TripsheetEntriesTable
                        tripsheetEntries={tripsheetEntries}
                        updateTripsheetEntry={updateTripsheetEntry}
                        toggleTripsheetCloseVoucher={toggleTripsheetCloseVoucher}
                    />
                </div>
            )}
        </div>
    );
};

export default VendorDetailsSection;
