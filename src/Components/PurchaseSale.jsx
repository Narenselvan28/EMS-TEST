import React, { useState, useEffect, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// Import your sub-components (ensure these paths are correct in your project)
import Orderinfo from "../PurchaseSales Components/Orderinfo";
import Tablegst from '../PurchaseSales Components/Tablegst';
import Tablenogst from '../PurchaseSales Components/Tablenogst';
import SundrySection from '../PurchaseSales Components/Sundry';
import SummaryAndActions from '../PurchaseSales Components/Summary';

function PurchaseSale() {
    const today = new Date().toISOString().split('T')[0];

    // State for all form values
    const [formData, setFormData] = useState({
        entryDate: today,
        orderType: 'purchase', // 'purchase' or 'sales'
        partyName: '',
        brokerName: ''
    });

    // State for GST toggle
    const [showGST, setShowGST] = useState(false);

    // State for table items (GST or No-GST)
    const [items, setItems] = useState([]);

    // State for sundry entries
    const [sundryEntries, setSundryEntries] = useState([]);

    // State for reference items table
    const [referenceItems, setReferenceItems] = useState([]);

    // State for validation errors
    const [errors, setErrors] = useState({});

    // State for reference table sorting
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });


    // --- Utility Functions ---

    // Function to create a new empty row object (helper)
    const createNewItemRow = useCallback((withGST) => {
        const defaultItemName = "Coconut With Husk"; // Default item name
        return withGST ?
            {
                id: uuidv4(),
                itemName: defaultItemName,
                qty: '', uom: '', price: '', amount: '',
                cgstPercent: '', cgstAmt: '', sgstPercent: '', sgstAmt: '',
                totalGst: '', grandTotal: '', debitCredit: 'Debit'
            } :
            {
                id: uuidv4(),
                itemName: defaultItemName,
                qty: '', uom: '', price: '', amount: '',
                debitCredit: 'Debit'
            };
    }, []);

    // Helper to calculate totals for a single item row (used by Tablegst)
    const calculateRowTotals = useCallback((item) => {
        const qty = parseFloat(item.qty) || 0;
        const price = parseFloat(item.price) || 0;
        const cgstPercent = parseFloat(item.cgstPercent) || 0;
        const sgstPercent = parseFloat(item.sgstPercent) || 0;

        const amount = qty * price;
        const cgstAmt = amount * (cgstPercent / 100);
        const sgstAmt = amount * (sgstPercent / 100);
        const totalGst = cgstAmt + sgstAmt;
        const grandTotal = amount + totalGst;

        return {
            ...item,
            amount: isNaN(amount) ? '' : amount.toFixed(2),
            cgstAmt: isNaN(cgstAmt) ? '' : cgstAmt.toFixed(2),
            sgstAmt: isNaN(sgstAmt) ? '' : sgstAmt.toFixed(2),
            totalGst: isNaN(totalGst) ? '' : totalGst.toFixed(2),
            grandTotal: isNaN(grandTotal) ? '' : grandTotal.toFixed(2)
        };
    }, []);

    // --- Validation Logic ---
    const validateForm = useCallback(() => {
        const newErrors = {};

        // 1. Validate Order Info
        if (!formData.partyName.trim()) {
            newErrors.partyName = 'Party Name is required.';
        }
        if (!formData.brokerName.trim()) {
            newErrors.brokerName = 'Broker Name is required.';
        }

        // 2. Validate Table Items
        if (items.length === 0) {
            newErrors.items = 'At least one item is required.';
        } else {
            items.forEach((item, index) => {
                if (!item.itemName) {
                    newErrors[`item-${index}-itemName`] = `Item Name is required for row ${index + 1}.`;
                }
                const qty = parseFloat(item.qty);
                if (isNaN(qty) || qty <= 0) {
                    newErrors[`item-${index}-qty`] = `Quantity must be a positive number for row ${index + 1}.`;
                }
                const price = parseFloat(item.price);
                if (isNaN(price) || price <= 0) {
                    newErrors[`item-${index}-price`] = `Price must be a positive number for row ${index + 1}.`;
                }

                if (showGST) {
                    const cgstPercent = parseFloat(item.cgstPercent);
                    if (isNaN(cgstPercent) || cgstPercent < 0 || cgstPercent > 100) {
                        newErrors[`item-${index}-cgstPercent`] = `CGST % must be between 0 and 100 for row ${index + 1}.`;
                    }
                    const sgstPercent = parseFloat(item.sgstPercent);
                    if (isNaN(sgstPercent) || sgstPercent < 0 || sgstPercent > 100) {
                        newErrors[`item-${index}-sgstPercent`] = `SGST % must be between 0 and 100 for row ${index + 1}.`;
                    }
                }
            });
        }

        // 3. Validate Sundry Entries
        sundryEntries.forEach((entry, index) => {
            if (!entry.category) {
                newErrors[`sundry-${index}-category`] = `Category is required for sundry entry ${index + 1}.`;
            }
            const value = parseFloat(entry.value);
            if (isNaN(value) || value < 0) { // Allow zero for some cases like 'Roundoff (-)'
                newErrors[`sundry-${index}-value`] = `Value must be a non-negative number for sundry entry ${index + 1}.`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    }, [formData, items, showGST, sundryEntries]);


    // --- Handlers ---

    // Function to reset all form-related states (excluding reference items)
    // DEFINE handleReset FIRST, as it's used by handleSaveBill and addReferenceItem
    const handleReset = useCallback(() => {
        setFormData({
            entryDate: today,
            orderType: 'purchase',
            partyName: '',
            brokerName: ''
        });
        setShowGST(false); // Reset GST toggle to false
        setItems([createNewItemRow(false)]); // Explicitly set items to be one new empty row (without GST)
        setSundryEntries([]);
        setErrors({}); // Clear all validation errors on reset
        console.log("Form has been reset.");
    }, [today, createNewItemRow]);


    // Handler for the main "Save Bill" button (for the current form)
    // NOW handleSaveBill can safely use handleReset
    const handleSaveBill = useCallback(() => {
        const isValid = validateForm();
        if (!isValid) {
            alert('Please correct the errors before saving the bill.');
            return;
        }

        const dataToSave = {
            formData,
            items,
            sundryEntries,
            showGST,
        };
        console.log(`Saving complete form data (Bill):`, dataToSave);

        // Implement your actual API call here to send data to the backend for the bill
        // e.g., fetch('/api/save-purchase-sale', { method: 'POST', body: JSON.stringify(dataToSave) });

        alert('Bill saved successfully!');
        handleReset(); // Now handleReset is defined
    }, [formData, items, sundryEntries, showGST, validateForm, handleReset]);


    // Handle changes in the Order Info section
    const handleFormChange = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear specific error when field changes
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
        });
    }, []);


    // Handle GST toggle switch
    const handleGSTToggle = useCallback((e) => {
        const newShowGST = e.target.checked;
        setShowGST(newShowGST);
        // When toggling, clear items and add one new row based on the new GST state
        setItems([createNewItemRow(newShowGST)]);
        setSundryEntries([]); // Clear sundry entries for consistency on toggle
        setErrors({}); // Clear errors on GST toggle as table structure changes
    }, [createNewItemRow]);


    // Update individual item in the table
    const updateItem = useCallback((id, field, value) => {
        setItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.id === id) {
                    let updatedItem = { ...item, [field]: value };

                    // Recalculate amounts if relevant fields change and GST is on
                    if (['qty', 'price', 'cgstPercent', 'sgstPercent'].includes(field) && showGST) {
                        updatedItem = calculateRowTotals(updatedItem);
                    } else if (['qty', 'price'].includes(field) && !showGST) {
                        // For No-GST table, only recalculate amount
                        const qty = parseFloat(updatedItem.qty) || 0;
                        const price = parseFloat(updatedItem.price) || 0;
                        const amount = qty * price;
                        updatedItem.amount = isNaN(amount) ? '' : amount.toFixed(2);
                    }
                    return updatedItem;
                }
                return item;
            });
            return updatedItems;
        });
        // Clear specific item error when field changes
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            // Find the index of the item that was updated to clear its specific error
            const itemIndexToClear = items.findIndex(item => item.id === id);
            if (itemIndexToClear !== -1) {
                delete newErrors[`item-${itemIndexToClear}-${field}`];
            }
            return newErrors;
        });
    }, [showGST, calculateRowTotals, items]); // Added `items` to dependencies for `findIndex`


    // Delete a row from the items table
    const deleteRow = useCallback((id) => {
        setItems(prevItems => {
            const filteredItems = prevItems.filter(item => item.id !== id);
            // If after deleting, the table becomes empty, add one new row
            if (filteredItems.length === 0) {
                return [createNewItemRow(showGST)];
            }
            return filteredItems;
        });
        // Recalculate errors as indices might shift. Clearing all is simplest for now.
        setErrors({});
    }, [createNewItemRow, showGST]);


    // Callback for SundrySection to update sundry entries
    const handleSundryEntriesChange = useCallback((newEntries) => {
        setSundryEntries(newEntries);
        // Clear sundry errors when entries change
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            Object.keys(newErrors).forEach(key => {
                if (key.startsWith('sundry-')) {
                    delete newErrors[key];
                }
            });
            return newErrors;
        });
    }, []);


    // Handler for adding a reference item when "Save as Reference" is clicked in SummaryAndActions
    const addReferenceItem = useCallback(() => {
        const isValid = validateForm();
        if (!isValid) {
            alert('Please correct the errors before saving as reference.');
            return;
        }

        let currentSubtotal = 0;
        let currentGstTotal = 0;
        items.forEach(item => {
            currentSubtotal += parseFloat(item.amount) || 0;
            if (showGST) {
                currentGstTotal += parseFloat(item.totalGst) || 0;
            }
        });
        const currentSundryTotal = sundryEntries.reduce((sum, entry) => {
            const value = parseFloat(entry.value) || 0;
            return entry.category === 'Roundoff (-)' ? sum - value : sum + value;
        }, 0);
        const grandTotal = currentSubtotal + (showGST ? currentGstTotal : 0) + currentSundryTotal;

        // Create a descriptive item name for the reference
        const itemNames = items
            .map(item => item.itemName)
            .filter(name => name && name.trim() !== ''); // Filter out empty/null names

        let descriptiveItemName = '';
        if (itemNames.length === 1) {
            descriptiveItemName = itemNames[0];
        } else if (itemNames.length > 1) {
            descriptiveItemName = `${itemNames[0]} & ${itemNames.length - 1} more`;
        } else {
            descriptiveItemName = 'No Items Specified'; // Fallback if no items
        }

        const newRefNo = `REF-${Math.floor(Math.random() * 10000)}`; // Simple random ref no for example
        const newReference = {
            refNo: newRefNo,
            date: formData.entryDate,
            party: formData.partyName || 'N/A',
            itemName: descriptiveItemName,
            amount: grandTotal.toFixed(2),
            type: formData.orderType === 'purchase' ? 'Purchase' : 'Sale',
            status: 'Approved' // Example status
        };

        setReferenceItems(prevRefItems => [...prevRefItems, newReference]);
        console.log("New reference item added:", newReference);
        alert('Reference saved successfully!');
        handleReset(); // Call handleReset here to clear the current form
    }, [formData, items, sundryEntries, showGST, handleReset, validateForm]);


    // --- useEffect Hooks ---

    // Initial load: Add one row if the component mounts and items are empty
    useEffect(() => {
        if (items.length === 0) {
            setItems([createNewItemRow(showGST)]);
        }
    }, []); // Empty dependency array means it runs only once on mount.


    // Keyboard shortcut for F2 to add a new row
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F2') {
                event.preventDefault(); // Prevent default browser action (e.g., help menu)
                setItems(prevItems => [...prevItems, createNewItemRow(showGST)]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [createNewItemRow, showGST]);


    // --- Sorting Logic for Reference Table ---
    const sortedReferenceItems = useMemo(() => {
        let sortableItems = [...referenceItems];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    // Special handling for date string comparison
                    if (sortConfig.key === 'date') {
                        const dateA = new Date(aValue);
                        const dateB = new Date(bValue);
                        if (dateA < dateB) {
                            return sortConfig.direction === 'ascending' ? -1 : 1;
                        }
                        if (dateA > dateB) {
                            return sortConfig.direction === 'ascending' ? 1 : -1;
                        }
                        return 0;
                    }
                    // Case-insensitive string comparison for other string fields
                    if (aValue.toLowerCase() < bValue.toLowerCase()) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (aValue.toLowerCase() > bValue.toLowerCase()) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                } else {
                    // Numeric comparison for amount
                    const numA = parseFloat(aValue);
                    const numB = parseFloat(bValue);
                    if (numA < numB) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (numA > numB) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                }
            });
        }
        return sortableItems;
    }, [referenceItems, sortConfig]);

    const requestSort = useCallback((key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }, [sortConfig]);

    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
        }
        return '';
    };

    return (
        <div className="hidden md:block space-y-6 p-4">
          <div className="flex justify-between">  <h1 className='text-4xl ml-5 text-center my-10 font-bold'>Purchase/Sales</h1> 
         <div className="my-10 flex gap-5 mr-5">   <button className="bg-slate-600 p-2 rounded text-white">Sales Transactions</button>
<button className="bg-teal-600 p-2 rounded text-white">Purchase Transactions</button></div>
         </div>

            <Orderinfo
                formData={formData}
                onFormChange={handleFormChange}
                errors={errors} // Pass errors to Orderinfo
            />

            <div className="flex items-center space-x-3 bg-white  w-48 p-3 rounded-xl mx-5">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showGST}
                        onChange={handleGSTToggle}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                        {showGST ? 'With GST' : 'Without GST'}
                    </span>
                </label>
            </div>

            {showGST ?
                <Tablegst
                    items={items}
                    onUpdateItem={updateItem}
                    onDeleteRow={deleteRow}
                    errors={errors} // Pass errors to Tablegst
                /> :
                <Tablenogst
                    items={items}
                    onUpdateItem={updateItem}
                    onDeleteRow={deleteRow}
                    errors={errors} // Pass errors to Tablenogst
                />}

            <div className="p-4 flex justify-center">
                {errors.items && <p className="text-red-500 text-sm mt-1">{errors.items}</p>}
            </div>

            <SundrySection
                sundryEntries={sundryEntries}
                onEntriesChange={handleSundryEntriesChange}
                errors={errors} // Pass errors to SundrySection
            />

            {/* Display general form errors if any */}
            {Object.keys(errors).length > 0 && (
                <div className="m-5 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
                    <p className="font-bold">Please fix the following issues:</p>
                    <ul className="list-disc list-inside mt-2">
                        {Object.entries(errors).map(([key, message]) => (
                            // Filter out specific item/sundry errors if you prefer to show them inline
                            // or just list all of them here for a general overview
                            <li key={key}>{message}</li>
                        ))}
                    </ul>
                </div>
            )}

            <SummaryAndActions
                items={items}
                sundryEntries={sundryEntries}
                showGST={showGST}
                onSave={handleSaveBill} // Now uses the validated save handler
                onReset={handleReset}
                onSaveReference={addReferenceItem} // Now uses the validated save reference handler
            />

            {/* Reference Items Table Section */}
            <div className="mb-6 bg-white rounded-2xl m-5 glass-card p-6 rounded-xl transition-all hover:glow">
                <h2 className="text-2xl font-semibold mb-6 gradient-text">Reference Items with Sundry Details</h2>

                {/* Filter/Search Controls for Reference Table */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                        <label htmlFor="refOrderType" className="block mb-2 font-medium text-secondary">Order Type</label>
                        <select
                            className="glass-panel border border-slate-200 p-3 rounded-lg w-full text-base focus:ring-2 focus:ring-teal-700"
                            id="refOrderType">
                            <option value="">- All -</option>
                            <option value="purchase">Purchase</option>
                            <option value="sale">Sale</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="refPartyName" className="block mb-2 font-medium text-secondary">Party Name</label>
                        <select
                            className="glass-panel border border-slate-200 p-3 rounded-lg w-full text-base focus:ring-2 focus:ring-teal-700"
                            id="refPartyName">
                            <option value="">- All -</option>
                            <option>Ems Cocos</option>
                            <option>APA Rasu</option>
                            <option>Anand SOK</option>
                            {/* Add more party names dynamically if needed */}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="refStatus" className="block mb-2 font-medium text-secondary">Status</label>
                        <select
                            className="glass-panel border border-slate-200 p-3 rounded-lg w-full text-base focus:ring-2 focus:ring-teal-700"
                            id="refStatus">
                            <option value="">- All -</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            className="btn-primary px-6 py-3 bg-teal-700 text-white font-bold rounded-lg text-base w-full glow transition-all">
                            <i className="fas fa-search mr-2"></i> Search
                        </button>
                    </div>
                </div>

                {/* Reference Items Display Table */}
                <div className="overflow-x-auto rounded-lg">
                    <table className="table-auto border border-teal-700 border-collapse w-full text-sm" id="referenceTable">
                        <thead className="bg-teal-700 text-white ">
                            <tr className="table-header rounded-lg">
                                <th className="border  border-teal-200 px-4 py-3 rounded-tl-lg cursor-pointer" onClick={() => requestSort('refNo')}>
                                    Ref No.{getSortIndicator('refNo')}
                                </th>
                                <th className="border  border-teal-200 px-4 py-3 cursor-pointer" onClick={() => requestSort('date')}>
                                    Date{getSortIndicator('date')}
                                </th>
                                <th className=" px-4 border border-teal-200 py-3 cursor-pointer" onClick={() => requestSort('party')}>
                                    Party{getSortIndicator('party')}
                                </th>
                                <th className="  px-4 border border-teal-200 py-3 cursor-pointer" onClick={() => requestSort('itemName')}>
                                    Item Name{getSortIndicator('itemName')}
                                </th>
                                <th className=" px-4 border border-teal-200 py-3 cursor-pointer" onClick={() => requestSort('amount')}>
                                    Amount{getSortIndicator('amount')}
                                </th>
                                <th className=" px-4 border border-teal-200 py-3 cursor-pointer" onClick={() => requestSort('type')}>
                                    Type{getSortIndicator('type')}
                                </th>
                                <th className=" px-4 border border-teal-200 py-3 cursor-pointer" onClick={() => requestSort('status')}>
                                    Status{getSortIndicator('status')}
                                </th>
                                <th className=" px-4 border border-teal-200 py-3 rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="referenceTableBody">
                            {/* Render reference items */}
                            {sortedReferenceItems.map((refItem, index) => (
                                <tr key={index} className="table-row">
                                    <td className=" border border-teal-500 border-slate-100 px-4 py-2">{refItem.refNo}</td>
                                    <td className=" px-4 border border-teal-200 py-2">{refItem.date}</td>
                                    <td className=" px-4 border border-teal-200 py-2">{refItem.party}</td>
                                    <td className=" px-4 border border-teal-200 py-2">{refItem.itemName}</td>
                                    <td className=" px-4 border border-teal-200 py-2">₹{parseFloat(refItem.amount).toFixed(2)}</td>
                                    <td className=" px-4 border border-teal-200 py-2">{refItem.type}</td>
                                    <td className=" px-4 border border-teal-200 py-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            refItem.status === 'Approved' ? 'badge-approved' :
                                            refItem.status === 'Pending' ? 'badge-pending' :
                                            'badge-rejected'
                                        }`}>{refItem.status}</span>
                                    </td>
                                    <td className="border border-slate-100 px-4 py-2">
                                        <button className="btn-primary px-3 py-1 rounded text-xs mr-1">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="btn-secondary px-3 py-1 rounded text-xs">
                                            <i className="fas fa-copy"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {referenceItems.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="text-center text-gray-400 py-4">No reference items added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PurchaseSale;