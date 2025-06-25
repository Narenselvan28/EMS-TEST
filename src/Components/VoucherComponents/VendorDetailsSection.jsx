import React, { useEffect, useCallback } from 'react';
import TripsheetEntriesTable from './TripsheetEntriesTable'; // Import the new component

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

        console.log('Loading tripsheet entries for Fuel expense category...');

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
        const newTripsheetEntries = [...tripsheetEntries];
        newTripsheetEntries[index][field] = value;
        setTripsheetEntries(newTripsheetEntries);
    };

    const toggleTripsheetCloseVoucher = (index) => {
        const newTripsheetEntries = [...tripsheetEntries];
        if (newTripsheetEntries[index].status !== 'Closed') { // Only allow toggling if not already 'Closed'
            newTripsheetEntries[index].closeVoucher = !newTripsheetEntries[index].closeVoucher;
        }
        setTripsheetEntries(newTripsheetEntries);
    };

    const addTripsheetEntryRow = () => {
        setTripsheetEntries([...tripsheetEntries, { id: '', date: '', amount: 0, status: 'Open', closeVoucher: false }]);
    };

    return (
        <div className={`glass-card p-6 rounded-xl mb-8 section-visible`}>
            <h2 className="text-2xl font-semibold mb-6 gradient-text flex items-center">
                <i className="fas fa-store-alt mr-3"></i> Vendor Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="select-wrapper">
                    <label htmlFor="vendorName" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-building mr-2"></i> Vendor Name
                    </label>
                    <select
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="vendorName"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                    >
                        <option value="">- Select Vendor -</option>
                        <option>ABC Supplies</option>
                        <option>XYZ Services</option>
                        <option>Fuel Station A</option>
                        <option>Maintenance Co.</option>
                    </select>
                </div>
                <div className="select-wrapper">
                    <label htmlFor="expenseCategory" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-tags mr-2"></i> Expense Category
                    </label>
                    <select
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="expenseCategory"
                        value={expenseCategory}
                        onChange={(e) => setExpenseCategory(e.target.value)}
                    >
                        <option value="">- Select Category -</option>
                        <option value="petrol">Petrol</option>
                        <option value="service">Service</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <div className="select-wrapper">
                    <label htmlFor="vendorTransactionMethod" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-exchange-alt mr-2"></i> Transaction Method
                    </label>
                    <select
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="vendorTransactionMethod"
                        value={vendorTransactionMethod}
                        onChange={(e) => setVendorTransactionMethod(e.target.value)}
                    >
                        <option value="">- Select Method -</option>
                        <option>Cash</option>
                        <option>Account</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="vendorAmount" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-coins mr-2"></i> Amount (₹)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="vendorAmount"
                        placeholder="Enter Amount"
                        value={vendorAmount}
                        onChange={(e) => setVendorAmount(e.target.value)}
                    />
                </div>
                <div className="col-span-full">
                    <label htmlFor="vendorRemarks" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-comment-alt mr-2"></i> Remarks
                    </label>
                    <textarea
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="vendorRemarks"
                        placeholder="Enter Remarks"
                        value={vendorRemarks}
                        onChange={(e) => setVendorRemarks(e.target.value)}
                    ></textarea>
                </div>
            </div>

            {(expenseCategory === 'petrol' || expenseCategory === 'fuel') && (
                <div id="tripsheetEntrySection" className={`glass-panel p-6 rounded-xl mt-6 ${tripsheetEntries.length > 0 ? 'section-visible' : 'section-hidden'}`}>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <i className="fas fa-clipboard-list mr-2"></i> Tripsheet Entries
                    </h3>

                    <div className="flex justify-end mb-4">
                        <button onClick={addTripsheetEntryRow} className="btn-primary px-4 py-2 rounded-lg text-sm">
                            <i className="fas fa-plus mr-2"></i> Add Tripsheet Entry
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