import React, { useState, useEffect, useRef } from 'react';

const PurchaseTransactionForm = () => {
  // State for form fields
  const [transactionDate, setTransactionDate] = useState('');
  const [orderType, setOrderType] = useState('');
  const [partyName, setPartyName] = useState('');
  const [brokerName, setBrokerName] = useState('');
  const [isGSTEnabled, setIsGSTEnabled] = useState(true);
  const [isSundryEnabled, setIsSundryEnabled] = useState(false);
  const [sundryCategory, setSundryCategory] = useState('');
  const [sundryValue, setSundryValue] = useState('');
  const [sundryRemarks, setSundryRemarks] = useState('');
  const [harvesterCount, setHarvesterCount] = useState('');
  const [vehicleCount, setVehicleCount] = useState('');
  const [differenceValue, setDifferenceValue] = useState('');
  const [weightmentReferenceNumber, setWeightmentReferenceNumber] = useState('');
  const [importantNotes, setImportantNotes] = useState('');
  const [message, setMessage] = useState({ text: '', type: '', visible: false });
  const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);
  const [showLogisticsLoader, setShowLogisticsLoader] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationConfig, setConfirmationConfig] = useState({});
  
  // State for items and sundry entries
  const [regularItems, setRegularItems] = useState([]);
  const [gstItems, setGstItems] = useState([]);
  const [sundryEntries, setSundryEntries] = useState([]);
  
  // Dropdown options
  const orderTypeOptions = ["Purchase", "Sale"];
  const partyNameOptions = ["Ems Cocos", "APA Rasu", "Anand SOK", "Bharath Traders", "Green Farms"];
  const brokerNameOptions = ["Ems Cocos", "APA Rasu", "Anand SOK", "No Broker"];
  const itemOptions = ["Coconut with Husk", "Coconut without Husk", "Copra", "Husk", "Coconut Oil"];
  const uomOptions = ["Nos", "Kgs", "Quintal", "Tons"];
  const debitCreditOptions = ["Debit", "Credit"];
  const sundryCategoryOptions = ["Gunny Bags", "Loading Charges", "Unloading Charges", "Roundoff (+)", "Roundoff (-)"];
  
  // Refs for dropdowns
  const orderTypeRef = useRef(null);
  const partyNameRef = useRef(null);
  const brokerNameRef = useRef(null);
  const sundryCategoryRef = useRef(null);
  
  // Initialize form
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setTransactionDate(`${year}-${month}-${day}`);
    addNewItemRow();
  }, []);

  // Calculate summary values
  const calculateSummary = () => {
    let totalItemValue = 0;
    let totalGst = 0;
    let totalSundry = sundryEntries.reduce((sum, entry) => sum + entry.value, 0);

    if (isGSTEnabled) {
      totalItemValue = gstItems.reduce((sum, item) => 
        sum + (item.qty * item.price * (1 - item.discount / 100)), 0);
      totalGst = gstItems.reduce((sum, item) => sum + parseFloat(item.totalGst || 0), 0);
    } else {
      totalItemValue = regularItems.reduce((sum, item) => {
        const itemTotal = item.qty * item.price * (1 - item.discount / 100);
        return item.debitCredit === "Credit" ? sum - itemTotal : sum + itemTotal;
      }, 0);
    }

    const grandTotal = totalItemValue + totalGst + totalSundry;

    return {
      totalItemValue: totalItemValue.toFixed(2),
      totalGst: totalGst.toFixed(2),
      totalSundry: totalSundry.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    };
  };

  const summary = calculateSummary();

  // Show message
  const showMessage = (text, type) => {
    setMessage({ text, type, visible: true });
    setTimeout(() => {
      setMessage({ text: '', type: '', visible: false });
    }, 3000);
  };

  // Show confirmation modal
  const showConfirmationModal = (message, onConfirm) => {
    setConfirmationConfig({ message, onConfirm });
    setShowConfirmation(true);
  };

  // Toggle GST mode
  const toggleGSTDetails = () => {
    if (isGSTEnabled) {
      // Migrate regular items to GST items
      const migratedItems = regularItems.map(item => ({
        ...item,
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
      // Migrate GST items to regular items
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

  // Add new item row
  const addNewItemRow = () => {
    const newItem = {
      id: Date.now(),
      itemName: "",
      qty: 0,
      uom: "",
      price: 0,
      discount: 0,
      debitCredit: "Debit"
    };

    if (isGSTEnabled) {
      setGstItems([...gstItems, {
        ...newItem,
        cgstPercent: 0,
        cgstAmt: 0,
        sgstPercent: 0,
        sgstAmt: 0,
        totalGst: 0,
        grandTotal: 0
      }]);
    } else {
      setRegularItems([...regularItems, newItem]);
    }
  };

  // Update item data
  const updateItemData = (id, field, value, isGST) => {
    const items = isGST ? gstItems : regularItems;
    const setItems = isGST ? setGstItems : setRegularItems;
    
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item };
        
        if (field === 'itemName' || field === 'uom' || field === 'debitCredit') {
          updatedItem[field] = value;
        } else {
          updatedItem[field] = parseFloat(value) || 0;
        }
        
        // Recalculate values for GST items
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
    
    setItems(updatedItems);
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

  // Sundry functions
  const clearSundryInputs = () => {
    setSundryCategory('');
    setSundryValue('');
    setSundryRemarks('');
  };

  const validateSundryInputs = () => {
    return sundryCategory && sundryValue && Number(sundryValue) > 0 && isSundryEnabled;
  };

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

  const deleteSundryEntry = (index) => {
    showConfirmationModal("Are you sure you want to delete this charge?", () => {
      const newEntries = [...sundryEntries];
      newEntries.splice(index, 1);
      setSundryEntries(newEntries);
      showMessage("Charge deleted", "success");
    });
  };

  // Fetch logistics data (simulated)
  const fetchLogisticsData = async (date) => {
    setShowLogisticsLoader(true);
    return new Promise(resolve => {
      setTimeout(() => {
        const harvesterCount = Math.floor(Math.random() * 500) + 1000;
        const vehicleCount = Math.floor(Math.random() * 1000) + 8000;
        resolve({ harvesterCount, vehicleCount });
        setShowLogisticsLoader(false);
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
      
      // Reinitialize with today's date
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      setTransactionDate(`${year}-${month}-${day}`);
      
      addNewItemRow();
      showMessage("Form cleared!", "success");
    });
  };

  // Save transaction
  const saveTransaction = async (action) => {
    setShowFullScreenLoader(true);
    
    // Validation
    if (!transactionDate || !orderType || !partyName) {
      setShowFullScreenLoader(false);
      showMessage("Please fill in Date, Order Type, and Party Name.", "error");
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
      totalItemValue: parseFloat(summary.totalItemValue),
      totalGst: parseFloat(summary.totalGst),
      totalSundry: parseFloat(summary.totalSundry),
      grandTotal: parseFloat(summary.grandTotal)
    };
    
    console.log("Saving Transaction:", payload);
    showMessage("Transaction saved successfully!", "success");
    setShowFullScreenLoader(false);
    
    if (action === 'new') {
      resetForm();
    } else if (action === 'next') {
      // For demonstration, just clear form
      resetForm();
    }
  };

  // Render item row
  const renderItemRow = (item, isGST) => {
    return (
      <div key={item.id} className="bg-white p-4 rounded-lg shadow-md space-y-4 mb-4">
        {/* Top section: Item Name and Delete button */}
        <div className="flex justify-between items-start">
          <div className="w-full mr-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              <i className="fas fa-box mr-1"></i> Item Name
            </label>
            <select
              value={item.itemName}
              onChange={(e) => updateItemData(item.id, 'itemName', e.target.value, isGST)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select item</option>
              {itemOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => deleteItemRow(item.id, isGST)}
            className="text-red-600 hover:text-red-800 p-2"
            title="Remove item"
          >
            <i className="fas fa-times-circle text-lg"></i>
          </button>
        </div>

        {/* Middle section: Quantity, UOM, Price, Discount */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              <i className="fas fa-hashtag mr-1"></i> Quantity
            </label>
            <input
              type="number"
              value={item.qty}
              onChange={(e) => updateItemData(item.id, 'qty', e.target.value, isGST)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              <i className="fas fa-ruler mr-1"></i> UOM
            </label>
            <select
              value={item.uom}
              onChange={(e) => updateItemData(item.id, 'uom', e.target.value, isGST)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select UOM</option>
              {uomOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              <i className="fas fa-rupee-sign mr-1"></i> Price
            </label>
            <input
              type="number"
              value={item.price}
              onChange={(e) => updateItemData(item.id, 'price', e.target.value, isGST)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              <i className="fas fa-percent mr-1"></i> Discount
            </label>
            <input
              type="number"
              value={item.discount}
              onChange={(e) => updateItemData(item.id, 'discount', e.target.value, isGST)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>

        {/* Bottom section: Debit/Credit and GST details (if applicable) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {!isGST && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                <i className="fas fa-exchange-alt mr-1"></i> Type
              </label>
              <select
                value={item.debitCredit}
                onChange={(e) => updateItemData(item.id, 'debitCredit', e.target.value, isGST)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {debitCreditOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          )}

          {isGST && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  <i className="fas fa-percent mr-1"></i> CGST %
                </label>
                <input
                  type="number"
                  value={item.cgstPercent}
                  onChange={(e) => updateItemData(item.id, 'cgstPercent', e.target.value, isGST)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  <i className="fas fa-rupee-sign mr-1"></i> CGST Amt
                </label>
                <input
                  type="number"
                  value={item.cgstAmt}
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  <i className="fas fa-percent mr-1"></i> SGST %
                </label>
                <input
                  type="number"
                  value={item.sgstPercent}
                  onChange={(e) => updateItemData(item.id, 'sgstPercent', e.target.value, isGST)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  <i className="fas fa-rupee-sign mr-1"></i> SGST Amt
                </label>
                <input
                  type="number"
                  value={item.sgstAmt}
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
            </>
          )}
        </div>

        {/* Total row */}
        <div className="flex justify-end pt-2 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold text-gray-600">
              {isGST ? 'Taxable Value:' : 'Item Value:'}
            </span>
            <span className="text-lg font-bold text-gray-800">
              ₹{(item.qty * item.price * (1 - item.discount / 100)).toFixed(2)}
            </span>
          </div>
        </div>

        {isGST && (
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-600">
                Total GST:
              </span>
              <span className="text-lg font-bold text-gray-800">
                ₹{item.totalGst || '0.00'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-600">
                Grand Total:
              </span>
              <span className="text-lg font-bold text-blue-600">
                ₹{item.grandTotal || '0.00'}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Message Box */}
      {message.visible && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${
          message.type === 'success' ? 'bg-green-600' : 
          message.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        }`}>
          <div className="flex items-center">
            <i className={`fas ${
              message.type === 'success' ? 'fa-check-circle' : 
              message.type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'
            } mr-2`}></i>
            <span>{message.text}</span>
          </div>
        </div>
      )}

      {/* Full-screen Loader */}
      {showFullScreenLoader && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="flex flex-col items-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4 text-lg">Processing...</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              <i className="fas fa-file-invoice text-blue-500 mr-2"></i>
              New Transaction
            </h1>
            <p className="text-gray-500 mt-1">Create purchase or sales entries efficiently</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
              <i className="fas fa-save mr-2"></i> Save Draft
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center">
              <i className="fas fa-history mr-2"></i> Recent Transactions
            </button>
          </div>
        </div>

        {/* Main Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Transaction Details */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Basic Info Card */}
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                <i className="fas fa-info-circle text-blue-500 mr-2"></i>
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-tag mr-1"></i> Order Type
                  </label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select order type</option>
                    {orderTypeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-user-tie mr-1"></i> Party Name
                  </label>
                  <select
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select party</option>
                    {partyNameOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-handshake mr-1"></i> Broker Name
                  </label>
                  <select
                    value={brokerName}
                    onChange={(e) => setBrokerName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select broker (optional)</option>
                    {brokerNameOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Items Card */}
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  <i className="fas fa-boxes text-blue-500 mr-2"></i>
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
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      <span className="ml-3 text-sm font-bold text-gray-700">
                        GST Mode
                      </span>
                    </label>
                  </div>
                  <button onClick={addNewItemRow} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded-lg flex items-center">
                    <i className="fas fa-plus-circle mr-2"></i> Add Item
                  </button>
                </div>
              </div>
              
              {/* Items Form */}
              <div className="space-y-4">
                {isGSTEnabled ? (
                  gstItems.length === 0 ? (
                    <div className="text-center py-3 text-gray-500 text-sm">
                      <i className="fas fa-info-circle mr-1"></i> No GST items added. Click "Add Item" to begin.
                    </div>
                  ) : (
                    gstItems.map(item => renderItemRow(item, true))
                  )
                ) : (
                  regularItems.length === 0 ? (
                    <div className="text-center py-3 text-gray-500 text-sm">
                      <i className="fas fa-info-circle mr-1"></i> No regular items added. Click "Add Item" to begin.
                    </div>
                  ) : (
                    regularItems.map(item => renderItemRow(item, false))
                  )
                )}
              </div>
            </div>

            {/* Sundry Details Card */}
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  <i className="fas fa-receipt text-blue-500 mr-2"></i>
                  Additional Charges
                </h2>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isSundryEnabled}
                      onChange={() => setIsSundryEnabled(!isSundryEnabled)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    <span className="ml-3 text-sm font-bold text-gray-700">
                      Enable
                    </span>
                  </label>
                </div>
              </div>
              
              <div className={`${isSundryEnabled ? '' : 'opacity-50 pointer-events-none'} transition-opacity duration-300 space-y-4`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-end">
                  <div className="col-span-full md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <i className="fas fa-tag mr-1"></i> Charge Type
                    </label>
                    <select
                      value={sundryCategory}
                      onChange={(e) => setSundryCategory(e.target.value)}
                      disabled={!isSundryEnabled}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select charge type</option>
                      {sundryCategoryOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-span-full md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <i className="fas fa-rupee-sign mr-1"></i> Amount
                    </label>
                    <input 
                      value={sundryValue}
                      onChange={(e) => setSundryValue(e.target.value)}
                      type="number" 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      placeholder="0.00" 
                      disabled={!isSundryEnabled}
                    />
                  </div>
                  
                  <div className="col-span-full md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <i className="fas fa-comment-dots mr-1"></i> Description
                    </label>
                    <input 
                      value={sundryRemarks}
                      onChange={(e) => setSundryRemarks(e.target.value)}
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      placeholder="Optional" 
                      disabled={!isSundryEnabled}
                    />
                  </div>
                  <div className="col-span-full">
                    <button 
                      onClick={addSundryEntry}
                      disabled={!validateSundryInputs()}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="fas fa-plus-circle mr-2"></i> Add Charge
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-base font-medium text-gray-700 mb-3">
                    <i className="fas fa-list-ul mr-1"></i> Added Charges
                  </h3>
                  {sundryEntries.length === 0 ? (
                    <div className="text-center py-3 text-gray-500 text-sm">
                      <i className="fas fa-info-circle mr-1"></i> No additional charges added
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sundryEntries.map((entry, index) => (
                        <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1 mr-4">
                            <div className="font-medium text-gray-800">{entry.category}</div>
                            <div className="text-xs text-gray-500">{entry.remarks}</div>
                          </div>
                          <div className="font-semibold text-gray-700 mr-4">₹{entry.value.toFixed(2)}</div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              onClick={() => deleteSundryEntry(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6 lg:space-y-8">
            {/* Logistics & Other Details Card */}
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm relative">
              {showLogisticsLoader && (
                <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                <i className="fas fa-truck-loading text-blue-500 mr-2"></i>
                Logistics & Other Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-tractor mr-1"></i> Harvester Count
                  </label>
                  <input 
                    type="number" 
                    value={harvesterCount}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
                    placeholder="e.g., 1500" 
                    readOnly 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-truck-moving mr-1"></i> Vehicle Count
                  </label>
                  <input 
                    type="number" 
                    value={vehicleCount}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
                    placeholder="e.g., 8500" 
                    readOnly 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-balance-scale mr-1"></i> Difference
                  </label>
                  <input 
                    type="text" 
                    value={differenceValue}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
                    readOnly 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-clipboard-list mr-1"></i> Weightment Reference Number
                  </label>
                  <input 
                    type="text" 
                    value={weightmentReferenceNumber}
                    onChange={(e) => setWeightmentReferenceNumber(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="e.g., WRTN12345" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <i className="fas fa-info-circle mr-1"></i> Important Notes
                  </label>
                  <textarea 
                    value={importantNotes}
                    onChange={(e) => setImportantNotes(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    rows="3" 
                    placeholder="Any important details or comments..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Transaction Summary Card */}
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                <i className="fas fa-calculator text-blue-500 mr-2"></i>
                Transaction Summary
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-medium">
                      <i className="fas fa-box-open mr-2"></i> Subtotal
                    </span>
                    <span className="font-semibold text-lg text-gray-800">₹{summary.totalItemValue}</span>
                  </div>
                  {isGSTEnabled && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 font-medium">
                        <i className="fas fa-percentage mr-2"></i> GST
                      </span>
                      <span className="font-semibold text-lg text-gray-800">₹{summary.totalGst}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      <i className="fas fa-money-bill-wave mr-2"></i> Charges
                    </span>
                    <span className="font-semibold text-lg text-gray-800">₹{summary.totalSundry}</span>
                  </div>
                </div>
                
                <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xl text-green-800">
                      <i className="fas fa-file-invoice-dollar mr-2"></i> Grand Total
                    </span>
                    <span className="font-bold text-xl text-green-800">₹{summary.grandTotal}</span>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <button onClick={() => saveTransaction('next')} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center">
                    <i className="fas fa-save mr-2"></i> Save & Continue
                  </button>
                  <button onClick={() => saveTransaction('new')} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg flex items-center justify-center">
                    <i className="fas fa-file mr-2"></i> Save & New
                  </button>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg flex items-center justify-center">
                    <i className="fas fa-check-circle mr-2"></i> Complete Transaction
                  </button>
                  <button onClick={resetForm} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center">
                    <i className="fas fa-trash-alt mr-2"></i> Clear Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-exclamation-circle text-orange-500 mr-2"></i> Confirm Action
            </h3>
            <p className="text-gray-600 mb-6">{confirmationConfig.message}</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  confirmationConfig.onConfirm();
                  setShowConfirmation(false);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseTransactionForm;

