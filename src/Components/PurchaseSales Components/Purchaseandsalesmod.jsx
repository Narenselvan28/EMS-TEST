import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const TransactionEntryForm = () => {
  // State for form fields
  const [transactionDate, setTransactionDate] = useState('');
  const [orderType, setOrderType] = useState('');
  const [partyName, setPartyName] = useState('');
  const [brokerName, setBrokerName] = useState('');
  const [sundryCategory, setSundryCategory] = useState('');
  const [sundryValue, setSundryValue] = useState('');
  const [sundryRemarks, setSundryRemarks] = useState('');
  const [isGSTEnabled, setIsGSTEnabled] = useState(true);
  const [isSundryEnabled, setIsSundryEnabled] = useState(false);
  const [harvesterCount, setHarvesterCount] = useState('');
  const [vehicleCount, setVehicleCount] = useState('');
  const [differenceValue, setDifferenceValue] = useState('');
  const [weightmentReferenceNumber, setWeightmentReferenceNumber] = useState('');
  const [importantNotes, setImportantNotes] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isLogisticsLoading, setIsLogisticsLoading] = useState(false);

  // State for items and sundries
  const [regularItems, setRegularItems] = useState([]);
  const [gstItems, setGstItems] = useState([]);
  const [sundryEntries, setSundryEntries] = useState([]);

  // Refs for dropdown instances
  const orderTypeDropdownRef = useRef(null);
  const partyNameDropdownRef = useRef(null);
  const brokerNameDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  // Data options
  const orderTypeOptions = ["Purchase", "Sale"];
  const partyNameOptions = ["Ems Cocos", "APA Rasu", "Anand SOK", "Bharath Traders", "Green Farms"];
  const brokerNameOptions = ["Ems Cocos", "APA Rasu", "Anand SOK", "No Broker"];
  const itemOptions = ["Coconut with Husk", "Coconut without Husk", "Copra", "Husk", "Coconut Oil"];
  const uomOptions = ["Nos", "Kgs", "Quintal", "Tons"];
  const debitCreditOptions = ["Debit", "Credit"];
  const sundryCategoryOptions = ["Gunny Bags", "Loading Charges", "Unloading Charges", "Roundoff (+)", "Roundoff (-)"];

  // Calculate summary values
  const calculateSummary = () => {
    let totalItemValue = 0;
    let totalGst = 0;
    let totalSundry = sundryEntries.reduce((sum, entry) => sum + entry.value, 0);

    if (isGSTEnabled) {
      totalItemValue = gstItems.reduce((sum, item) => sum + (item.qty * item.price * (1 - item.discount / 100)), 0);
      totalGst = gstItems.reduce((sum, item) => sum + parseFloat(item.totalGst), 0);
    } else {
      totalItemValue = regularItems.reduce((sum, item) => {
        const itemTotal = item.qty * item.price * (1 - item.discount / 100);
        return item.debitCredit === "Credit" ? sum - itemTotal : sum + itemTotal;
      }, 0);
    }

    const grandTotal = totalItemValue + totalGst + totalSundry;

    return {
      totalItemValue,
      totalGst,
      totalSundry,
      grandTotal
    };
  };

  const summary = calculateSummary();

  // Initialize form with today's date
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setTransactionDate(`${year}-${month}-${day}`);
    addNewItemRow();
  }, []);

  // Update logistics values when date changes
  useEffect(() => {
    if (transactionDate) {
      updateLogisticsValues();
    }
  }, [transactionDate]);

  // Show message
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  // Toggle GST mode
  const toggleGSTDetails = () => {
    if (isGSTEnabled) {
      // Migrate regular items to GST items
      const migratedItems = regularItems.map(item => ({
        id: item.id,
        itemName: item.itemName,
        qty: item.qty,
        uom: item.uom,
        price: item.price,
        discount: item.discount,
        cgstPercent: 0,
        cgstAmt: 0,
        sgstPercent: 0,
        sgstAmt: 0,
        totalGst: 0,
        grandTotal: (item.qty * item.price * (1 - item.discount / 100))
      }));
      setGstItems(migratedItems);
      setRegularItems([]);
    } else {
      // Migrate GST items back to regular items
      const migratedItems = gstItems.map(item => ({
        id: item.id,
        itemName: item.itemName,
        qty: item.qty,
        uom: item.uom,
        price: item.price,
        discount: item.discount,
        debitCredit: "Debit"
      }));
      setRegularItems(migratedItems);
      setGstItems([]);
    }
  };

  // Toggle sundry section
  const toggleSundrySection = () => {
    if (!isSundryEnabled) {
      clearSundryInputs();
      setSundryEntries([]);
    }
  };

  // Clear sundry inputs
  const clearSundryInputs = () => {
    setSundryCategory('');
    setSundryValue('');
    setSundryRemarks('');
  };

  // Add sundry entry
  const addSundryEntry = () => {
    const newEntry = {
      id: Date.now(),
      category: sundryCategory,
      value: parseFloat(sundryValue),
      remarks: sundryRemarks || "N/A"
    };
    setSundryEntries([...sundryEntries, newEntry]);
    clearSundryInputs();
    showMessage("Additional charge added!", "success");
  };

  // Edit sundry entry
  const editSundryEntry = (index) => {
    const entryToEdit = sundryEntries[index];
    setSundryCategory(entryToEdit.category);
    setSundryValue(entryToEdit.value);
    setSundryRemarks(entryToEdit.remarks);
  };

  // Update sundry entry
  const updateSundryEntry = (index) => {
    const updatedEntries = [...sundryEntries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      category: sundryCategory,
      value: parseFloat(sundryValue),
      remarks: sundryRemarks || "N/A"
    };
    setSundryEntries(updatedEntries);
    clearSundryInputs();
    showMessage("Charge updated successfully!", "success");
  };

  // Delete sundry entry
  const deleteSundryEntry = (index) => {
    showConfirmationModal("Are you sure you want to delete this charge?", () => {
      const updatedEntries = sundryEntries.filter((_, i) => i !== index);
      setSundryEntries(updatedEntries);
      showMessage("Charge deleted", "success");
    });
  };

  // Add new item row
  const addNewItemRow = () => {
    const newItem = {
      id: Date.now(),
      itemName: "",
      qty: 0,
      uom: "",
      price: 0,
      discount: 0,
      ...(isGSTEnabled ? {
        cgstPercent: 0,
        cgstAmt: 0,
        sgstPercent: 0,
        sgstAmt: 0,
        totalGst: 0,
        grandTotal: 0
      } : {
        debitCredit: "Debit"
      })
    };

    if (isGSTEnabled) {
      setGstItems([...gstItems, newItem]);
    } else {
      setRegularItems([...regularItems, newItem]);
    }
  };

  // Update item data
  const updateItemData = (id, field, value, isGST) => {
    const list = isGST ? gstItems : regularItems;
    const setList = isGST ? setGstItems : setRegularItems;
    
    const updatedItems = list.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: field === 'itemName' || field === 'uom' || field === 'debitCredit' ? value : parseFloat(value) || 0 };
        
        if (isGST) {
          const taxableValue = updatedItem.qty * updatedItem.price * (1 - updatedItem.discount / 100);
          updatedItem.cgstAmt = (taxableValue * (updatedItem.cgstPercent / 100)).toFixed(2);
          updatedItem.sgstAmt = (taxableValue * (updatedItem.sgstPercent / 100)).toFixed(2);
          updatedItem.totalGst = (parseFloat(updatedItem.cgstAmt) + parseFloat(updatedItem.sgstAmt)).toFixed(2);
          updatedItem.grandTotal = (taxableValue + parseFloat(updatedItem.totalGst)).toFixed(2);
        } else {
          updatedItem.grandTotal = (updatedItem.qty * updatedItem.price * (1 - updatedItem.discount / 100)).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    });
    
    setList(updatedItems);
  };

  // Delete item row
  const deleteItemRow = (id, isGST) => {
    showConfirmationModal("Are you sure you want to remove this item?", () => {
      if (isGST) {
        setGstItems(gstItems.filter(item => item.id !== id));
      } else {
        setRegularItems(regularItems.filter(item => item.id !== id));
      }
      showMessage("Item removed", "success");
    });
  };

  // Fetch logistics data
  const fetchLogisticsData = async (date) => {
    setIsLogisticsLoading(true);
    return new Promise(resolve => {
      setTimeout(() => {
        const harvesterCount = Math.floor(Math.random() * 500) + 1000;
        const vehicleCount = Math.floor(Math.random() * 1000) + 8000;
        resolve({ harvesterCount, vehicleCount });
        setIsLogisticsLoading(false);
      }, 1500);
    });
  };

  // Update logistics values
  const updateLogisticsValues = async () => {
    if (transactionDate) {
      const data = await fetchLogisticsData(transactionDate);
      setHarvesterCount(data.harvesterCount);
      setVehicleCount(data.vehicleCount);
      setDifferenceValue(Math.abs(data.harvesterCount - data.vehicleCount).toFixed(2));
    } else {
      setHarvesterCount('');
      setVehicleCount('');
      setDifferenceValue('');
    }
  };

  // Reset form
  const resetForm = () => {
    showConfirmationModal("Are you sure you want to clear the entire form?", () => {
      setTransactionDate('');
      setOrderType('');
      setPartyName('');
      setBrokerName('');
      setSundryCategory('');
      setRegularItems([]);
      setGstItems([]);
      setSundryEntries([]);
      setIsGSTEnabled(true);
      setIsSundryEnabled(false);
      setHarvesterCount('');
      setVehicleCount('');
      setDifferenceValue('');
      setWeightmentReferenceNumber('');
      setImportantNotes('');
      
      // Add initial item row
      addNewItemRow();
      showMessage("Form cleared!", "success");
    });
  };

  // Save transaction
  const saveTransaction = async (action) => {
    setIsLoading(true);
    
    // Basic validation
    if (!transactionDate || !orderType || !partyName) {
      setIsLoading(false);
      showMessage("Please fill in Date, Order Type, and Party Name.", "error");
      return;
    }

    const payload = {
      transactionDate,
      orderType,
      partyName,
      brokerName,
      items: isGSTEnabled ? gstItems : regularItems,
      sundryCharges: sundryEntries,
      harvesterCount,
      vehicleCount,
      weightmentReferenceNumber,
      importantNotes,
      totalItemValue: summary.totalItemValue,
      gstTotal: summary.totalGst,
      sundryTotal: summary.totalSundry,
      grandTotal: summary.grandTotal
    };

    console.log("Saving Transaction:", payload);
    showMessage("Transaction saved successfully!", "success");

    setIsLoading(false);

    if (action === 'new') {
      resetForm();
    } else if (action === 'next') {
      showMessage("Continuing to next transaction step...", "success");
    }
  };

  // Confirmation modal
  const showConfirmationModal = (message, onConfirm) => {
    const modal = document.createElement('div');
    modal.id = 'confirmationModal';
    modal.className = 'fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto animate-fade-in-slide">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-exclamation-circle text-orange-500 mr-2"></i> Confirm Action
        </h3>
        <p class="text-gray-600 mb-6">${message}</p>
        <div class="flex justify-end space-x-3">
          <button id="cancelConfirm" class="btn btn-secondary text-sm">Cancel</button>
          <button id="confirmAction" class="btn btn-primary bg-danger-red hover:bg-danger-red-dark text-sm">Confirm</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('confirmAction').onclick = () => {
      onConfirm();
      modal.remove();
    };
    document.getElementById('cancelConfirm').onclick = () => {
      modal.remove();
    };
  };

  // Create item row element
  const createItemRowElement = (item, isGST) => {
    return (
      <div key={`item-row-${item.id}`} className="card p-4 shadow-md space-y-4">
        <div className="flex justify-between items-start">
          <div className="w-full mr-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              <i className="fas fa-box mr-1"></i> Item Name
            </label>
            <div id={`${isGST ? 'gstItemNameDropdown' : 'itemNameDropdown'}-${item.id}`}></div>
          </div>
          <button
            onClick={() => deleteItemRow(item.id, isGST)}
            className="text-danger-red hover:text-danger-red-dark transition-colors duration-200 p-2 rounded-full"
            title="Remove Item"
          >
            <i className="fas fa-times-circle text-lg"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          {/* Quantity */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              <i className="fas fa-hashtag mr-1"></i> Quantity
            </label>
            <input
              type="number"
              value={item.qty}
              onChange={(e) => updateItemData(item.id, 'qty', e.target.value, isGST)}
              className="qty-input input-field w-full text-sm"
              name="qty"
            />
          </div>

          {/* UOM */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              <i className="fas fa-balance-scale mr-1"></i> Unit
            </label>
            <div id={`${isGST ? 'gstUomDropdown' : 'uomDropdown'}-${item.id}`}></div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              <i className="fas fa-rupee-sign mr-1"></i> Price (per unit)
            </label>
            <input
              type="number"
              value={item.price}
              onChange={(e) => updateItemData(item.id, 'price', e.target.value, isGST)}
              className="price-input input-field w-full text-sm"
              name="price"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              <i className="fas fa-percent mr-1"></i> Discount (%)
            </label>
            <input
              type="number"
              value={item.discount}
              onChange={(e) => updateItemData(item.id, 'discount', e.target.value, isGST)}
              className="discount-input input-field w-full text-sm"
              name="discount"
            />
          </div>

          {/* Transaction Type (only for Regular Items) */}
          {!isGST && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                <i className="fas fa-exchange-alt mr-1"></i> Transaction Type
              </label>
              <div id={`debitCreditDropdown-${item.id}`}></div>
            </div>
          )}
        </div>

        {/* GST specific fields */}
        {isGST && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            {/* CGST % */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">CGST (%)</label>
              <input
                type="number"
                value={item.cgstPercent}
                onChange={(e) => updateItemData(item.id, 'cgstPercent', e.target.value, isGST)}
                className="input-field w-full text-sm"
                name="cgstPercent"
              />
            </div>

            {/* CGST Amt (Read-only) */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">CGST Amt</label>
              <input
                type="number"
                value={item.cgstAmt}
                readOnly
                className="input-field w-full text-sm bg-gray-100 cursor-not-allowed font-bold"
                name="cgstAmt"
              />
            </div>

            {/* SGST % */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">SGST (%)</label>
              <input
                type="number"
                value={item.sgstPercent}
                onChange={(e) => updateItemData(item.id, 'sgstPercent', e.target.value, isGST)}
                className="input-field w-full text-sm"
                name="sgstPercent"
              />
            </div>

            {/* SGST Amt (Read-only) */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">SGST Amt</label>
              <input
                type="number"
                value={item.sgstAmt}
                readOnly
                className="input-field w-full text-sm bg-gray-100 cursor-not-allowed font-bold"
                name="sgstAmt"
              />
            </div>

            {/* Total GST (Read-only) */}
            <div className="col-span-full sm:col-span-2 lg:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Total GST</label>
              <input
                type="number"
                value={item.totalGst}
                readOnly
                className="input-field w-full text-sm bg-gray-100 cursor-not-allowed font-bold"
                name="totalGst"
              />
            </div>

            {/* Grand Total (Read-only) */}
            <div className="col-span-full sm:col-span-2 lg:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Grand Total (Item)</label>
              <input
                type="number"
                value={item.grandTotal}
                readOnly
                className="input-field w-full text-sm bg-gray-100 cursor-not-allowed font-bold text-lg text-primary-blue"
                name="grandTotalItem"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  // Initialize dropdowns after render
  useEffect(() => {
    // Initialize dropdowns for items
    const initializeItemDropdowns = () => {
      const items = isGSTEnabled ? gstItems : regularItems;
      items.forEach(item => {
        // Item Name dropdown
        createSearchableDropdown(
          document.getElementById(`${isGSTEnabled ? 'gstItemNameDropdown' : 'itemNameDropdown'}-${item.id}`),
          'Item Name',
          itemOptions,
          item.itemName,
          (value) => updateItemData(item.id, 'itemName', value, isGSTEnabled),
          false,
          "Select item",
          false
        );

        // UOM dropdown
        createSearchableDropdown(
          document.getElementById(`${isGSTEnabled ? 'gstUomDropdown' : 'uomDropdown'}-${item.id}`),
          'Unit of Measurement',
          uomOptions,
          item.uom,
          (value) => updateItemData(item.id, 'uom', value, isGSTEnabled),
          false,
          "Select UOM",
          false
        );

        // Debit/Credit dropdown (for regular items)
        if (!isGSTEnabled) {
          createSearchableDropdown(
            document.getElementById(`debitCreditDropdown-${item.id}`),
            'Type',
            debitCreditOptions,
            item.debitCredit,
            (value) => updateItemData(item.id, 'debitCredit', value, isGSTEnabled),
            false,
            "Select type",
            false
          );
        }
      });
    };

    initializeItemDropdowns();
  }, [isGSTEnabled, gstItems, regularItems]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Message Box */}
      {message.text && (
        <div id="messageBox" className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center text-white animate-fade-in-slide ${
          message.type === 'success' ? 'bg-green-600' : 'bg-danger-red'
        }`}>
          <i className={`fas ${
            message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'
          } mr-2`}></i>
          <span>{message.text}</span>
        </div>
      )}

      {/* Full-screen Loader Overlay */}
      {isLoading && (
        <div id="loaderOverlay" className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="flex flex-col items-center text-white">
            <div className="animate-spin-slow rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4 text-lg">Processing...</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              <i className="fas fa-file-invoice text-primary-blue mr-2"></i>
              New Transaction
            </h1>
            <p className="text-gray-500 mt-1">Create purchase or sales entries efficiently</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="btn btn-primary">
              <i className="fas fa-save mr-2"></i> Save Draft
            </button>
            <button className="btn btn-secondary">
              <i className="fas fa-history mr-2"></i> Recent Transactions
            </button>
          </div>
        </div>

        {/* Main Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Transaction Details */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Basic Info Card */}
            <div className="card p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                <i className="fas fa-info-circle text-primary-blue mr-2"></i>
                Transaction Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-calendar-alt mr-1"></i> Date
                  </label>
                  <input
                    type="date"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                    className="input-field w-full"
                  />
                </div>
                
                <div id="orderTypeDropdown" ref={orderTypeDropdownRef}></div>
                <div id="partyNameDropdown" ref={partyNameDropdownRef}></div>
                <div id="brokerNameDropdown" ref={brokerNameDropdownRef}></div>
              </div>
            </div>

            {/* Items Card */}
            <div className="card p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  <i className="fas fa-boxes text-primary-blue mr-2"></i>
                  Items
                </h2>
                <div className="flex flex-wrap items-center space-x-3">
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isGSTEnabled}
                        onChange={() => {
                          setIsGSTEnabled(!isGSTEnabled);
                          toggleGSTDetails();
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-blue-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                      <span className="ml-3 text-sm font-bold text-gray-700">
                        GST Mode
                      </span>
                    </label>
                  </div>
                  <button
                    onClick={addNewItemRow}
                    className="btn btn-primary text-sm px-3 py-2"
                  >
                    <i className="fas fa-plus-circle mr-2"></i> Add Item
                  </button>
                </div>
              </div>
              
              {/* Items Form */}
              {isGSTEnabled ? (
                <div id="gstItemsForm" className="space-y-4">
                  {gstItems.length === 0 ? (
                    <div className="text-center py-3 text-gray-500 text-sm">
                      <i className="fas fa-info-circle mr-1"></i> No GST items added. Click "Add Item" to begin.
                    </div>
                  ) : (
                    gstItems.map(item => createItemRowElement(item, true))
                  )}
                </div>
              ) : (
                <div id="regularItemsForm" className="space-y-4">
                  {regularItems.length === 0 ? (
                    <div className="text-center py-3 text-gray-500 text-sm">
                      <i className="fas fa-info-circle mr-1"></i> No regular items added. Click "Add Item" to begin.
                    </div>
                  ) : (
                    regularItems.map(item => createItemRowElement(item, false))
                  )}
                </div>
              )}
            </div>

            {/* Sundry Details Card */}
            <div className="card p-6 lg:p-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  <i className="fas fa-receipt text-primary-blue mr-2"></i>
                  Additional Charges
                </h2>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSundryEnabled}
                      onChange={() => {
                        setIsSundryEnabled(!isSundryEnabled);
                        toggleSundrySection();
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-blue-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                    <span className="ml-3 text-sm font-bold text-gray-700">
                      Enable
                    </span>
                  </label>
                </div>
              </div>
              
              <div
                id="sundrySection"
                className={`transition-opacity duration-300 space-y-4 ${
                  isSundryEnabled ? '' : 'opacity-50 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-end">
                  <div className="col-span-full md:col-span-1" id="categoryInputDropdown" ref={categoryDropdownRef}></div>
                  
                  <div className="col-span-full md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <i className="fas fa-rupee-sign mr-1"></i> Amount
                    </label>
                    <input
                      id="valueInput"
                      type="number"
                      value={sundryValue}
                      onChange={(e) => setSundryValue(e.target.value)}
                      className="input-field w-full"
                      placeholder="0.00"
                      disabled={!isSundryEnabled}
                    />
                  </div>
                  
                  <div className="col-span-full md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <i className="fas fa-comment-dots mr-1"></i> Description
                    </label>
                    <input
                      id="remarksInput"
                      type="text"
                      value={sundryRemarks}
                      onChange={(e) => setSundryRemarks(e.target.value)}
                      className="input-field w-full"
                      placeholder="Optional"
                      disabled={!isSundryEnabled}
                    />
                  </div>
                  <div className="col-span-full">
                    <button
                      id="addSundryBtn"
                      onClick={sundryCategory && sundryValue && isSundryEnabled ? addSundryEntry : undefined}
                      className={`btn btn-primary w-full md:w-auto ${
                        !(sundryCategory && sundryValue && isSundryEnabled) ? 'disabled:opacity-50' : ''
                      }`}
                      disabled={!(sundryCategory && sundryValue && isSundryEnabled)}
                    >
                      <i className="fas fa-plus-circle mr-2"></i> Add Charge
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-base font-medium text-gray-700 mb-3">
                    <i className="fas fa-list-ul mr-1"></i> Added Charges
                  </h3>
                  <div id="sundryTableBody" className="space-y-3">
                    {sundryEntries.length === 0 ? (
                      <div className="text-center py-3 text-gray-500 text-sm">
                        <i className="fas fa-info-circle mr-1"></i> No additional charges added
                      </div>
                    ) : (
                      sundryEntries.map((entry, index) => (
                        <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
                          <div className="flex-1 mr-4">
                            <div className="font-medium text-gray-800">{entry.category}</div>
                            <div className="text-xs text-gray-500">{entry.remarks}</div>
                          </div>
                          <div className="font-semibold text-gray-700 mr-4">₹{entry.value.toFixed(2)}</div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => editSundryEntry(index)}
                              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                              title="Edit Charge"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => deleteSundryEntry(index)}
                              className="text-red-600 hover:text-red-800 transition-colors duration-200"
                              title="Delete Charge"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6 lg:space-y-8">
            {/* Logistics & Other Details Card */}
            <div className="card p-6 lg:p-8 relative">
              {isLogisticsLoading && (
                <div className="logistics-loader-overlay show">
                  <div className="logistics-loader-spinner"></div>
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                <i className="fas fa-truck-loading text-primary-blue mr-2"></i>
                Logistics & Other Details
              </h2>
              <div className="space-y-4">
                {/* Harvester Count */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-tractor mr-1"></i> Harvester Count
                  </label>
                  <input
                    type="number"
                    value={harvesterCount}
                    readOnly
                    className="input-field w-full bg-gray-100 cursor-not-allowed"
                    placeholder="e.g., 1500"
                  />
                </div>
                
                {/* Vehicle Count */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-truck-moving mr-1"></i> Vehicle Count
                  </label>
                  <input
                    type="number"
                    value={vehicleCount}
                    readOnly
                    className="input-field w-full bg-gray-100 cursor-not-allowed"
                    placeholder="e.g., 8500"
                  />
                </div>
                
                {/* Difference */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-balance-scale mr-1"></i> Difference
                  </label>
                  <input
                    type="text"
                    value={differenceValue}
                    readOnly
                    className="input-field w-full bg-gray-100 cursor-not-allowed"
                  />
                </div>
                
                {/* Weightment Reference Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-clipboard-list mr-1"></i> Weightment Reference Number
                  </label>
                  <input
                    type="text"
                    value={weightmentReferenceNumber}
                    onChange={(e) => setWeightmentReferenceNumber(e.target.value)}
                    className="input-field w-full"
                    placeholder="e.g., WRTN12345"
                  />
                </div>
                
                {/* Important Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-info-circle mr-1"></i> Important Notes
                  </label>
                  <textarea
                    value={importantNotes}
                    onChange={(e) => setImportantNotes(e.target.value)}
                    className="input-field w-full resize-y"
                    rows="3"
                    placeholder="Any important details or comments..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Transaction Summary Card */}
            <div className="card p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                <i className="fas fa-calculator text-primary-blue mr-2"></i>
                Transaction Summary
              </h2>
              
              <div className="space-y-4">
                <div className="summary-card">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-medium">
                      <i className="fas fa-box-open mr-2"></i> Subtotal
                    </span>
                    <span id="totalItemValue" className="font-semibold text-lg text-gray-800">
                      ₹{summary.totalItemValue.toFixed(2)}
                    </span>
                  </div>
                  {isGSTEnabled && (
                    <div className="flex justify-between items-center mb-2" id="gstTotalRow">
                      <span className="text-gray-600 font-medium">
                        <i className="fas fa-percentage mr-2"></i> GST
                      </span>
                      <span id="gstTotal" className="font-semibold text-lg text-gray-800">
                        ₹{summary.totalGst.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      <i className="fas fa-money-bill-wave mr-2"></i> Charges
                    </span>
                    <span id="sundryTotal" className="font-semibold text-lg text-gray-800">
                      ₹{summary.totalSundry.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="summary-card bg-secondary-green border border-secondary-green">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xl text-secondary-green-dark">
                      <i className="fas fa-file-invoice-dollar mr-2"></i> Grand Total
                    </span>
                    <span id="grandTotal" className="font-bold text-xl text-secondary-green-dark">
                      ₹{summary.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => saveTransaction('next')}
                    className="btn btn-primary w-full"
                  >
                    <i className="fas fa-save mr-2"></i> Save & Continue
                  </button>
                  <button
                    onClick={() => saveTransaction('new')}
                    className="btn btn-secondary w-full"
                  >
                    <i className="fas fa-file mr-2"></i> Save & New
                  </button>
                  <button className="btn btn-primary w-full bg-accent-orange-new hover:bg-accent-orange-new-dark">
                    <i className="fas fa-check-circle mr-2"></i> Complete Transaction
                  </button>
                  <button
                    onClick={resetForm}
                    className="btn w-full bg-danger-red text-white hover:bg-danger-red-dark"
                  >
                    <i className="fas fa-trash-alt mr-2"></i> Clear Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Searchable Dropdown Component
const createSearchableDropdown = (containerElement, labelText, options, initialValue, onChange, disabled, placeholder, renderLabel = true) => {
  let currentValue = initialValue || "";
  let filteredOptions = [];
  let highlightedIndex = -1;
  let isDropdownOpen = false;

  if (!containerElement) {
    console.error("createSearchableDropdown: containerElement is null or undefined for label:", labelText);
    return null;
  }

  containerElement.innerHTML = '';

  let labelElement;
  if (renderLabel) {
    labelElement = document.createElement('label');
    labelElement.className = `block text-sm font-semibold text-gray-700 mb-1 ${disabled ? "opacity-50" : ""}`;
    labelElement.innerHTML = `<i class="fas fa-tag mr-1"></i> ${labelText}`;
    containerElement.appendChild(labelElement);
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'relative w-full';

  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.className = `input-field w-full searchable-dropdown-input ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`;
  inputElement.placeholder = placeholder || '';
  inputElement.disabled = disabled;
  inputElement.setAttribute('autocomplete', 'off');

  const dropdownIcon = document.createElement('span');
  dropdownIcon.className = 'absolute top-1/2 transform -translate-y-1/2 text-gray-400 searchable-dropdown-icon';
  dropdownIcon.innerHTML = '<i class="fas fa-chevron-down"></i>';

  const optionsList = document.createElement('ul');
  optionsList.className = 'absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg hidden searchable-dropdown-list';

  wrapper.appendChild(inputElement);
  wrapper.appendChild(dropdownIcon);
  wrapper.appendChild(optionsList);
  containerElement.appendChild(wrapper);

  const updateInputDisabledState = () => {
    inputElement.disabled = disabled;
    if (renderLabel && labelElement) {
      labelElement.classList.toggle("opacity-50", disabled);
    }
    if (disabled) {
      inputElement.classList.add("bg-gray-100", "cursor-not-allowed");
      dropdownIcon.classList.add("text-gray-300");
    } else {
      inputElement.classList.remove("bg-gray-100", "cursor-not-allowed");
      dropdownIcon.classList.remove("text-gray-300");
    }
  };

  const renderOptions = () => {
    filteredOptions = options.filter(opt =>
      opt.toLowerCase().includes(inputElement.value.toLowerCase())
    );
    optionsList.innerHTML = '';

    if (filteredOptions.length > 0) {
      filteredOptions.forEach((opt, idx) => {
        const li = document.createElement('li');
        li.className = `px-4 py-2 cursor-pointer text-gray-800 transition-colors duration-150 ${highlightedIndex === idx ? 'bg-primary-blue text-white' : 'hover:bg-gray-100'}`;
        li.textContent = opt;
        li.addEventListener('mousedown', (e) => {
          e.preventDefault();
          selectOption(opt);
        });
        optionsList.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.className = "px-4 py-2 text-gray-500 select-none";
      li.textContent = "No options found";
      optionsList.appendChild(li);
    }

    optionsList.classList.toggle('hidden', !isDropdownOpen);
    dropdownIcon.innerHTML = isDropdownOpen ? '<i class="fas fa-chevron-up"></i>' : '<i class="fas fa-chevron-down"></i>';
  };

  const selectOption = (value) => {
    currentValue = value;
    inputElement.value = value;
    onChange(value);
    isDropdownOpen = false;
    renderOptions();
  };

  inputElement.addEventListener('input', (e) => {
    currentValue = e.target.value;
    onChange(currentValue);
    isDropdownOpen = true;
    highlightedIndex = -1;
    renderOptions();
  });

  inputElement.addEventListener('focus', () => {
    if (!disabled) {
      isDropdownOpen = true;
      renderOptions();
    }
  });

  inputElement.addEventListener('blur', () => {
    setTimeout(() => {
      isDropdownOpen = false;
      renderOptions();
    }, 100);
  });

  inputElement.addEventListener('keydown', (e) => {
    if (!isDropdownOpen || disabled) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (inputElement.value && filteredOptions.length > 0) {
          selectOption(filteredOptions[0]);
        }
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      highlightedIndex = (highlightedIndex < filteredOptions.length - 1) ? highlightedIndex + 1 : 0;
      renderOptions();
      optionsList.children[highlightedIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      highlightedIndex = (highlightedIndex > 0) ? highlightedIndex - 1 : filteredOptions.length - 1;
      renderOptions();
      optionsList.children[highlightedIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex !== -1 && filteredOptions[highlightedIndex]) {
        selectOption(filteredOptions[highlightedIndex]);
      } else if (filteredOptions.length > 0) {
        selectOption(filteredOptions[0]);
      }
      inputElement.blur();
    } else if (e.key === "Escape") {
      isDropdownOpen = false;
      renderOptions();
      inputElement.blur();
    }
  });

  inputElement.value = currentValue;
  updateInputDisabledState();
  renderOptions()

  return {
    update: (newValue, newOptions, newDisabled) => {
      currentValue = newValue !== undefined ? newValue : currentValue;
      inputElement.value = currentValue

      if (newOptions !== undefined) {
        options = newOptions
      }
      if (newDisabled !== undefined) {
        disabled = newDisabled
        updateInputDisabledState()
      }
      renderOptions()
    }
  }
}
