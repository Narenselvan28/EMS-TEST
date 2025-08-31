import React, { useState, useEffect, useRef, useCallback } from 'react';

// Add the CSS styles
const styles = `
  /* Custom styles for the new color palette and design adjustments */
  .purchase-transaction-form {
    font-family: 'Poppins', sans-serif;
    background-color: #f7fafc; /* Very light blue-gray background */
    color: #2d3748; /* Dark text */
  }
  
  /* New Color Palette */
  .bg-primary-blue {
    background-color: #4299e1; /* Tailwind blue-500 */
  }
  .bg-primary-blue-dark {
    background-color: #3182ce; /* Tailwind blue-600 */
  }
  .text-primary-blue {
    color: #4299e1;
  }
  .border-primary-blue {
    border-color: #4299e1;
  }
  .ring-primary-blue-light {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1); /* Light blue ring for focus */
  }

  .bg-secondary-green {
    background-color: #48bb78; /* Tailwind green-500 */
  }
  .text-secondary-green-dark {
    color: #2f855a; /* Tailwind green-700 text for contrast */
  }
  .border-secondary-green {
    border-color: #68d391; /* Tailwind green-400 */
  }

  .bg-accent-orange { 
    background-color: #ed8936; /* Tailwind orange-500 */
  }
  .bg-accent-orange-dark {
    background-color: #dd6b20; /* Tailwind orange-600 */
  }
  .text-accent-orange {
    color: #ed8936;
  }

  .bg-danger-red { /* Keep red for danger */
    background-color: #e53e3e; /* Tailwind red-600 */
  }
  .bg-danger-red-dark {
    background-color: #c53030; /* Tailwind red-700 */
  }
  .text-danger-red {
    color: #e53e3e;
  }
  
  /* Card styling - subtle changes */
  .card {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.02); /* Slightly softer shadow */
    transition: all 0.3s ease;
  }
  
  /* Button styling */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.625rem; /* Slightly more rounded buttons */
    font-weight: 500;
    transition: all 0.2s ease;
    padding: 0.625rem 1.25rem; /* Slightly larger padding */
    font-size: 0.9375rem; /* Slightly larger font */
  }

  .btn-primary {
    background-color: #4299e1; /* New primary blue */
    color: white;
    box-shadow: 0 2px 4px rgba(66, 153, 225, 0.2);
  }
  
  .btn-primary:hover {
    background-color: #3182ce; /* Darker blue on hover */
    box-shadow: 0 4px 8px rgba(66, 153, 225, 0.3);
  }

  .btn-secondary {
    background-color: #e2e8f0; /* Light gray from Tailwind */
    color: #2d3748; /* Dark text */
    border: 1px solid #cbd5e0; /* Lighter border */
  }

  .btn-secondary:hover {
    background-color: #cbd5e1; /* Slightly darker gray on hover */
    border-color: #a0aec0;
  }
  
  /* Input styling */
  .input-field {
    border: 1px solid #cbd5e1; /* Lighter border */
    border-radius: 0.625rem; /* Rounded corners */
    padding: 0.625rem 1rem; /* Consistent padding */
    transition: all 0.2s ease;
    font-size: 0.9375rem; /* Match button font size */
  }
  
  .input-field:focus {
    border-color: #4299e1; /* Primary blue border on focus */
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1); /* Light blue ring */
    outline: none;
  }
  
  /* Remove arrows from number inputs */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type="number"] {
    -moz-appearance: textfield;
  }
  
  /* Message box */
  .message-box {
    position: fixed;
    top: 1.5rem; /* Slightly lower */
    right: 1.5rem; /* Slightly more inward */
    z-index: 50;
    padding: 1rem 1.5rem; /* More horizontal padding */
    border-radius: 0.75rem; /* Rounded corners */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Stronger shadow */
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    max-width: 28rem; /* Wider message box */
    display: flex;
    align-items: center;
    background-color: #2d3748; /* Dark text color for message box */
  }
  
  .message-box.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Animation */
  @keyframes fadeInSlide {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in-slide {
    animation: fadeInSlide 0.4s ease-out forwards;
  }
  
  /* Summary cards */
  .summary-card {
    background-color: white;
    border-radius: 0.625rem;
    padding: 1.25rem; /* More padding */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  /* Specific styling for the searchable dropdown */
  .searchable-dropdown-input {
    padding-right: 2.5rem; /* Space for icon */
  }
  .searchable-dropdown-icon {
    right: 1rem; /* Position icon */
  }
  .searchable-dropdown-list {
    border-radius: 0.625rem; /* Match input field roundedness */
    max-height: 200px;
    overflow-y: auto;
    z-index: 100;
  }

  /* Custom Toggle Switch Styling */
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e2e8f0;
    transition: .4s;
    border-radius: 34px;
  }
  
  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    border: 1px solid #cbd5e1;
  }
  
  input:checked + .toggle-slider {
    background-color: #4299e1;
  }
  
  input:checked + .toggle-slider:before {
    transform: translateX(20px);
    border-color: white;
  }

  /* Loader Animation */
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }

  /* Item row styling */
  .item-row {
    background-color: white;
    border-radius: 0.75rem;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 1rem;
    border: 1px solid #e2e8f0;
  }
  
  .item-row-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .item-fields {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .gst-fields {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
    padding: 1rem;
    background-color: #f0f9ff;
    border-radius: 0.5rem;
    border: 1px solid #bae6fd;
  }
  
  .delete-btn {
    color: #e53e3e;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.25rem;
    padding: 0.25rem;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
  
  .delete-btn:hover {
    background-color: #fed7d7;
  }
  
  /* Table styling */
  .sundry-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  .sundry-table th,
  .sundry-table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .sundry-table th {
    background-color: #f7fafc;
    font-weight: 600;
  }
  
  .sundry-table tr:hover {
    background-color: #f7fafc;
  }
  
  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
  }
  
  .edit-btn {
    color: #4299e1;
  }
  
  .edit-btn:hover {
    background-color: #ebf8ff;
  }
  
  .remove-btn {
    color: #e53e3e;
  }
  
  .remove-btn:hover {
    background-color: #fed7d7;
  }
  
  /* Remove row button */
  .remove-row-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fed7d7;
    color: #c53030;
    border: 1px solid #feb2b2;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-weight: 500;
    margin-top: 1rem;
    width: 100%;
    transition: all 0.2s;
  }
  
  .remove-row-btn:hover {
    background-color: #feb2b2;
  }
`;

const PurchaseTransactionForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    transactionDate: new Date().toISOString().split('T')[0],
    orderType: '',
    partyName: '',
    brokerName: '',
    toggleGST: false, // GST mode off by default
    toggleSundry: false,
    sundryCategory: '',
    sundryValue: '',
    sundryRemarks: '',
    weightmentReferenceNumber: '',
    importantNotes: '',
    harvesterCount: '',
    vehicleCount: '',
    differenceValue: ''
  });

  // State for items and sundry entries
  const [regularItems, setRegularItems] = useState([]);
  const [gstItems, setGstItems] = useState([]);
  const [sundryEntries, setSundryEntries] = useState([]);
  
  // State for UI elements
  const [messageState, setMessageState] = useState({ visible: false, text: '', type: '' });
  const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);
  const [showLogisticsLoader, setShowLogisticsLoader] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState({ visible: false, message: '', onConfirm: null });

  // Data options
  const orderTypeOptions = ["Purchase", "Sale"];
  const partyNameOptions = ["Ems Cocos", "APA Rasu", "Anand SOK", "Bharath Traders", "Green Farms"];
  const brokerNameOptions = ["Ems Cocos", "APA Rasu", "Anand SOK", "No Broker"];
  const itemOptions = ["Coconut with Husk", "Coconut without Husk", "Copra", "Husk", "Coconut Oil"];
  const uomOptions = ["Nos", "Kgs", "Quintal", "Tons"];
  const debitCreditOptions = ["Debit", "Credit"];
  const sundryCategoryOptions = ["Gunny Bags", "Loading Charges", "Unloading Charges", "Roundoff (+)", "Roundoff (-)"];

  // Calculate summary values
  const calculateSummary = useCallback(() => {
    let totalItemValue = 0;
    let totalGst = 0;
    let totalSundry = sundryEntries.reduce((sum, entry) => sum + entry.value, 0);

    if (formData.toggleGST) {
      totalItemValue = gstItems.reduce((sum, item) => sum + (item.qty * item.price * (1 - item.discount / 100)), 0);
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
  }, [formData.toggleGST, gstItems, regularItems, sundryEntries]);

  const summary = calculateSummary();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Toggle GST mode
  const toggleGSTDetails = () => {
    if (formData.toggleGST) {
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

    if (formData.toggleGST) {
      setGstItems(prev => [...prev, {
        ...newItem,
        cgstPercent: 0,
        cgstAmt: 0,
        sgstPercent: 0,
        sgstAmt: 0,
        totalGst: 0,
        grandTotal: 0
      }]);
    } else {
      setRegularItems(prev => [...prev, newItem]);
    }
  };

  // Update item data
  const updateItemData = (id, field, value, isGST) => {
    const setItems = isGST ? setGstItems : setRegularItems;
    
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { 
          ...item, 
          [field]: field === 'itemName' || field === 'uom' || field === 'debitCredit' ? value : parseFloat(value) || 0 
        };
        
        if (isGST) {
          // Recalculate GST values
          const taxableValue = updatedItem.qty * updatedItem.price * (1 - updatedItem.discount / 100);
          updatedItem.cgstAmt = (taxableValue * (updatedItem.cgstPercent / 100)).toFixed(2);
          updatedItem.sgstAmt = (taxableValue * (updatedItem.sgstPercent / 100)).toFixed(2);
          updatedItem.totalGst = (parseFloat(updatedItem.cgstAmt) + parseFloat(updatedItem.sgstAmt)).toFixed(2);
          updatedItem.grandTotal = (taxableValue + parseFloat(updatedItem.totalGst)).toFixed(2);
        } else {
          // Calculate regular item total
          updatedItem.grandTotal = (updatedItem.qty * updatedItem.price * (1 - updatedItem.discount / 100)).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  // Delete item row
  const deleteItemRow = (id, isGST) => {
    setShowConfirmationModal({
      visible: true,
      message: "Are you sure you want to remove this item?",
      onConfirm: () => {
        if (isGST) {
          setGstItems(prev => prev.filter(item => item.id !== id));
        } else {
          setRegularItems(prev => prev.filter(item => item.id !== id));
        }
        displayMessage("Item removed", "success");
      }
    });
  };

  // Sundry functions
  const validateSundryInputs = () => {
    return formData.sundryCategory && formData.sundryValue && Number(formData.sundryValue) > 0 && formData.toggleSundry;
  };

  const addSundryEntry = () => {
    const newEntry = {
      id: Date.now(),
      category: formData.sundryCategory,
      value: parseFloat(formData.sundryValue),
      remarks: formData.sundryRemarks || "N/A"
    };
    
    setSundryEntries(prev => [...prev, newEntry]);
    setFormData(prev => ({ ...prev, sundryCategory: '', sundryValue: '', sundryRemarks: '' }));
    displayMessage("Additional charge added!", "success");
  };

  const editSundryEntry = (index) => {
    const entryToEdit = sundryEntries[index];
    setFormData(prev => ({
      ...prev,
      sundryCategory: entryToEdit.category,
      sundryValue: entryToEdit.value,
      sundryRemarks: entryToEdit.remarks,
      editingSundryIndex: index
    }));
  };

  const updateSundryEntry = () => {
    setSundryEntries(prev => prev.map((entry, index) => 
      index === formData.editingSundryIndex ? {
        ...entry,
        category: formData.sundryCategory,
        value: parseFloat(formData.sundryValue),
        remarks: formData.sundryRemarks || "N/A"
      } : entry
    ));
    
    setFormData(prev => ({ 
      ...prev, 
      sundryCategory: '', 
      sundryValue: '', 
      sundryRemarks: '',
      editingSundryIndex: null 
    }));
    
    displayMessage("Charge updated successfully!", "success");
  };

  const deleteSundryEntry = (index) => {
    setShowConfirmationModal({
      visible: true,
      message: "Are you sure you want to delete this charge?",
      onConfirm: () => {
        setSundryEntries(prev => prev.filter((_, i) => i !== index));
        displayMessage("Charge deleted", "success");
      }
    });
  };

  // Logistics functions
  const fetchLogisticsData = async (date) => {
    setShowLogisticsLoader(true);
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        const harvesterCount = Math.floor(Math.random() * 500) + 1000;
        const vehicleCount = Math.floor(Math.random() * 1000) + 8000;
        resolve({ harvesterCount, vehicleCount });
        setShowLogisticsLoader(false);
      }, 1500);
    });
  };

  const updateLogisticsValues = async () => {
    if (formData.transactionDate) {
      const data = await fetchLogisticsData(formData.transactionDate);
      setFormData(prev => ({
        ...prev,
        harvesterCount: data.harvesterCount,
        vehicleCount: data.vehicleCount,
        differenceValue: Math.abs(data.harvesterCount - data.vehicleCount).toFixed(2)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        harvesterCount: '',
        vehicleCount: '',
        differenceValue: ''
      }));
    }
  };

  // Save transaction
  const saveTransaction = async (action) => {
    setShowFullScreenLoader(true);
    
    // Basic validation
    if (!formData.transactionDate || !formData.orderType || !formData.partyName) {
      setShowFullScreenLoader(false);
      displayMessage("Please fill in Date, Order Type, and Party Name.", "error");
      return;
    }

    const payload = {
      transactionDate: formData.transactionDate,
      orderType: formData.orderType,
      partyName: formData.partyName,
      brokerName: formData.brokerName,
      items: formData.toggleGST ? gstItems : regularItems,
      sundryCharges: sundryEntries,
      harvesterCount: formData.harvesterCount,
      vehicleCount: formData.vehicleCount,
      weightmentReferenceNumber: formData.weightmentReferenceNumber,
      importantNotes: formData.importantNotes,
      totalItemValue: parseFloat(summary.totalItemValue),
      gstTotal: parseFloat(summary.totalGst),
      sundryTotal: parseFloat(summary.totalSundry),
      grandTotal: parseFloat(summary.grandTotal)
    };

    console.log("Saving Transaction:", payload);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowFullScreenLoader(false);
    displayMessage("Transaction saved successfully!", "success");

    if (action === 'new') {
      resetForm();
    } else if (action === 'next') {
      displayMessage("Continuing to next transaction step...", "success");
      resetForm();
    }
  };

  // Reset form
  const resetForm = () => {
    setShowConfirmationModal({
      visible: true,
      message: "Are you sure you want to clear the entire form?",
      onConfirm: () => {
        setFormData({
          transactionDate: new Date().toISOString().split('T')[0],
          orderType: '',
          partyName: '',
          brokerName: '',
          toggleGST: false, // GST mode off by default
          toggleSundry: false,
          sundryCategory: '',
          sundryValue: '',
          sundryRemarks: '',
          weightmentReferenceNumber: '',
          importantNotes: '',
          harvesterCount: '',
          vehicleCount: '',
          differenceValue: ''
        });
        
        setRegularItems([]);
        setGstItems([]);
        setSundryEntries([]);
        
        // Add initial item row
        addNewItemRow();
        
        displayMessage("Form cleared!", "success");
      }
    });
  };

  // Display message
  const displayMessage = (text, type) => {
    setMessageState({ visible: true, text, type });
    setTimeout(() => {
      setMessageState({ visible: false, text: '', type: '' });
    }, 3000);
  };

  // Close confirmation modal
  const closeConfirmationModal = () => {
    setShowConfirmationModal({ visible: false, message: '', onConfirm: null });
  };

  // Initialize form
  useEffect(() => {
    // Add initial item row
    addNewItemRow();
  }, []);

  // Update logistics when date changes
  useEffect(() => {
    updateLogisticsValues();
  }, [formData.transactionDate]);

  // SearchableDropdown component
  const SearchableDropdown = React.memo(({
    label,
    options,
    value,
    onChange,
    disabled = false,
    placeholder = "",
    renderLabel = true
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [inputValue, setInputValue] = useState(value);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);

    // Filter options based on input value
    useEffect(() => {
      setFilteredOptions(
        options.filter(opt =>
          opt.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }, [inputValue, options]);

    // Handle click outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleInputChange = (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange(newValue);
      setIsOpen(true);
      setHighlightedIndex(-1);
    };

    const handleSelectOption = (option) => {
      setInputValue(option);
      onChange(option);
      setIsOpen(false);
    };

    const handleKeyDown = (e) => {
      if (!isOpen || disabled) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex !== -1 && filteredOptions[highlightedIndex]) {
          handleSelectOption(filteredOptions[highlightedIndex]);
        } else if (filteredOptions.length > 0) {
          handleSelectOption(filteredOptions[0]);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    return (
      <div className="w-full">
        {renderLabel && (
          <label className={`block text-sm font-semibold text-gray-700 mb-1 ${disabled ? "opacity-50" : ""}`}>
            <i className="fas fa-tag mr-1"></i> {label}
          </label>
        )}
        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => !disabled && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            className={`input-field w-full searchable-dropdown-input ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
            autoComplete="off"
          />
          <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400">
            <i className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
          </span>
          
          {isOpen && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg searchable-dropdown-list">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, idx) => (
                  <li
                    key={idx}
                    className={`px-4 py-2 cursor-pointer text-gray-800 transition-colors duration-150 ${highlightedIndex === idx ? 'bg-primary-blue text-white' : 'hover:bg-gray-100'}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectOption(option);
                    }}
                  >
                    {option}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 select-none">
                  No options found
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    );
  });

  // ItemRow component
  const ItemRow = React.memo(({ item, isGST, onUpdate, onDelete }) => {
    const handleFieldChange = (field, value) => {
      onUpdate(item.id, field, value, isGST);
    };

    return (
      <div className="item-row" id={`item-row-${item.id}`}>
        {/* Top section: Item Name and Delete button */}
        <div className="item-row-header">
          <div className="w-full mr-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <i className="fas fa-box mr-1"></i> Item Name
            </label>
            <SearchableDropdown
              options={itemOptions}
              value={item.itemName}
              onChange={(value) => handleFieldChange('itemName', value)}
              placeholder="Select item"
              renderLabel={false}
            />
          </div>
          <button
            onClick={() => onDelete(item.id, isGST)}
            className="delete-btn"
            title="Remove Item"
          >
            <i className="fas fa-times-circle"></i>
          </button>
        </div>

        {/* Basic Input Fields */}
        <div className="item-fields">
          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <i className="fas fa-hashtag mr-1"></i> Quantity
            </label>
            <input
              type="number"
              value={item.qty}
              onChange={(e) => handleFieldChange('qty', e.target.value)}
              className="input-field w-full"
            />
          </div>

          {/* UOM */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <i className="fas fa-balance-scale mr-1"></i> Unit
            </label>
            <SearchableDropdown
              options={uomOptions}
              value={item.uom}
              onChange={(value) => handleFieldChange('uom', value)}
              placeholder="Select UOM"
              renderLabel={false}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <i className="fas fa-rupee-sign mr-1"></i> Price (per unit)
            </label>
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleFieldChange('price', e.target.value)}
              className="input-field w-full"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <i className="fas fa-percent mr-1"></i> Discount (%)
            </label>
            <input
              type="number"
              value={item.discount}
              onChange={(e) => handleFieldChange('discount', e.target.value)}
              className="input-field w-full"
            />
          </div>

          {/* Transaction Type (only for Regular Items) */}
          {!isGST && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <i className="fas fa-exchange-alt mr-1"></i> Transaction Type
              </label>
              <SearchableDropdown
                options={debitCreditOptions}
                value={item.debitCredit}
                onChange={(value) => handleFieldChange('debitCredit', value)}
                placeholder="Select type"
                renderLabel={false}
              />
            </div>
          )}
        </div>

        {/* GST specific fields */}
        {isGST && (
          <div className="gst-fields">
            {/* CGST % */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                CGST (%)
              </label>
              <input
                type="number"
                value={item.cgstPercent}
                onChange={(e) => handleFieldChange('cgstPercent', e.target.value)}
                className="input-field w-full"
              />
            </div>

            {/* CGST Amt (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                CGST Amt
              </label>
              <input
                type="number"
                value={item.cgstAmt}
                readOnly
                className="input-field w-full bg-gray-100 cursor-not-allowed font-bold"
              />
            </div>

            {/* SGST % */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                SGST (%)
              </label>
              <input
                type="number"
                value={item.sgstPercent}
                onChange={(e) => handleFieldChange('sgstPercent', e.target.value)}
                className="input-field w-full"
              />
            </div>

            {/* SGST Amt (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                SGST Amt
              </label>
              <input
                type="number"
                value={item.sgstAmt}
                readOnly
                className="input-field w-full bg-gray-100 cursor-not-allowed font-bold"
              />
            </div>

            {/* Total GST (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Total GST
              </label>
              <input
                type="number"
                value={item.totalGst}
                readOnly
                className="input-field w-full bg-gray-100 cursor-not-allowed font-bold"
              />
            </div>

            {/* Grand Total (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Grand Total (Item)
              </label>
              <input
                type="number"
                value={item.grandTotal}
                readOnly
                className="input-field w-full bg-gray-100 cursor-not-allowed font-bold text-primary-blue"
              />
            </div>
          </div>
        )}
        
        {/* Remove Row Button */}
        <button
          onClick={() => onDelete(item.id, isGST)}
          className="remove-row-btn"
        >
          <i className="fas fa-trash-alt mr-2"></i> Remove Row
        </button>
      </div>
    );
  });

  return (
    <>
      <style>{styles}</style>
      <div className="purchase-transaction-form p-4 sm:p-6 lg:p-8">
        {/* Message Box */}
        {messageState.visible && (
          <div className={`message-box animate-fade-in-slide ${
            messageState.type === 'success' ? 'bg-green-600' : 
            messageState.type === 'error' ? 'bg-danger-red' : 'bg-gray-800'
          } show`}>
            <i className={`fas ${
              messageState.type === 'success' ? 'fa-check-circle' : 
              messageState.type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'
            } mr-2`}></i>
            {messageState.text}
          </div>
        )}

        {/* Full-screen Loader Overlay */}
        {showFullScreenLoader && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="flex flex-col items-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p className="mt-4 text-lg">Processing...</p>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmationModal.visible && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto animate-fade-in-slide">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-exclamation-circle text-orange-500 mr-2"></i> Confirm Action
              </h3>
              <p className="text-gray-600 mb-6">{showConfirmationModal.message}</p>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={closeConfirmationModal}
                  className="btn btn-secondary text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    showConfirmationModal.onConfirm();
                    closeConfirmationModal();
                  }}
                  className="btn btn-primary bg-danger-red hover:bg-danger-red-dark text-sm"
                >
                  Confirm
                </button>
              </div>
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
                      name="transactionDate"
                      value={formData.transactionDate}
                      onChange={handleInputChange}
                      className="input-field w-full"
                    />
                  </div>
                  
                  <SearchableDropdown
                    label="Order Type"
                    options={orderTypeOptions}
                    value={formData.orderType}
                    onChange={(value) => setFormData(prev => ({ ...prev, orderType: value }))}
                    placeholder="Select order type"
                  />
                  
                  <SearchableDropdown
                    label="Party Name"
                    options={partyNameOptions}
                    value={formData.partyName}
                    onChange={(value) => setFormData(prev => ({ ...prev, partyName: value }))}
                    placeholder="Select party"
                  />
                  
                  <SearchableDropdown
                    label="Broker Name"
                    options={brokerNameOptions}
                    value={formData.brokerName}
                    onChange={(value) => setFormData(prev => ({ ...prev, brokerName: value }))}
                    placeholder="Select broker (optional)"
                  />
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
                      <label className="relative inline-flex items-center cursor-pointer mr-3">
                        <input
                          type="checkbox"
                          name="toggleGST"
                          checked={formData.toggleGST}
                          onChange={(e) => {
                            handleInputChange(e);
                            toggleGSTDetails();
                          }}
                          className="sr-only peer"
                        />
                        <span className="toggle-switch">
                          <span className="toggle-slider"></span>
                        </span>
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
                <div className="space-y-4">
                  {formData.toggleGST ? (
                    gstItems.length > 0 ? (
                      gstItems.map(item => (
                        <ItemRow
                          key={item.id}
                          item={item}
                          isGST={true}
                          onUpdate={updateItemData}
                          onDelete={deleteItemRow}
                        />
                      ))
                    ) : (
                      <div className="text-center py-3 text-gray-500 text-sm">
                        <i className="fas fa-info-circle mr-1"></i> No GST items added. Click "Add Item" to begin.
                      </div>
                    )
                  ) : (
                    regularItems.length > 0 ? (
                      regularItems.map(item => (
                        <ItemRow
                          key={item.id}
                          item={item}
                          isGST={false}
                          onUpdate={updateItemData}
                          onDelete={deleteItemRow}
                        />
                      ))
                    ) : (
                      <div className="text-center py-3 text-gray-500 text-sm">
                        <i className="fas fa-info-circle mr-1"></i> No regular items added. Click "Add Item" to begin.
                      </div>
                    )
                  )}
                </div>
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
                        name="toggleSundry"
                        checked={formData.toggleSundry}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <span className="toggle-switch">
                        <span className="toggle-slider"></span>
                      </span>
                      <span className="ml-3 text-sm font-bold text-gray-700">
                        Enable
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className={`space-y-4 transition-opacity duration-300 ${
                  !formData.toggleSundry ? 'opacity-50 pointer-events-none' : ''
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-end">
                    <div className="col-span-full md:col-span-1">
                      <SearchableDropdown
                        label="Charge Type"
                        options={sundryCategoryOptions}
                        value={formData.sundryCategory}
                        onChange={(value) => setFormData(prev => ({ ...prev, sundryCategory: value }))}
                        disabled={!formData.toggleSundry}
                        placeholder="Select charge type"
                      />
                    </div>
                    
                    <div className="col-span-full md:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <i className="fas fa-rupee-sign mr-1"></i> Amount
                      </label>
                      <input
                        type="number"
                        name="sundryValue"
                        value={formData.sundryValue}
                        onChange={handleInputChange}
                        className="input-field w-full"
                        placeholder="0.00"
                        disabled={!formData.toggleSundry}
                      />
                    </div>
                    
                    <div className="col-span-full md:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <i className="fas fa-sticky-note mr-1"></i> Remarks
                      </label>
                      <input
                        type="text"
                        name="sundryRemarks"
                        value={formData.sundryRemarks}
                        onChange={handleInputChange}
                        className="input-field w-full"
                        placeholder="Optional remarks"
                        disabled={!formData.toggleSundry}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    {formData.editingSundryIndex !== null ? (
                      <button
                        onClick={updateSundryEntry}
                        className="btn btn-primary text-sm px-4 py-2"
                        disabled={!validateSundryInputs()}
                      >
                        <i className="fas fa-sync-alt mr-2"></i> Update Charge
                      </button>
                    ) : (
                      <button
                        onClick={addSundryEntry}
                        className="btn btn-primary text-sm px-4 py-2"
                        disabled={!validateSundryInputs()}
                      >
                        <i className="fas fa-plus-circle mr-2"></i> Add Charge
                      </button>
                    )}
                  </div>
                  
                  {/* Sundry Entries Table */}
                  {sundryEntries.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-base font-medium text-gray-700 mb-3">
                        <i className="fas fa-list-ul mr-1"></i> Added Charges
                      </h3>
                      <table className="sundry-table">
                        <thead>
                          <tr>
                            <th>Charge Type</th>
                            <th>Amount</th>
                            <th>Remarks</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sundryEntries.map((entry, index) => (
                            <tr key={entry.id}>
                              <td>{entry.category}</td>
                              <td className="font-medium text-primary-blue">₹{entry.value.toFixed(2)}</td>
                              <td>{entry.remarks}</td>
                              <td>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => editSundryEntry(index)}
                                    className="action-btn edit-btn"
                                    title="Edit"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    onClick={() => deleteSundryEntry(index)}
                                    className="action-btn remove-btn"
                                    title="Delete"
                                  >
                                    <i className="fas fa-trash-alt"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Information Card */}
              <div className="card p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-5">
                  <i className="fas fa-file-alt text-primary-blue mr-2"></i>
                  Additional Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <i className="fas fa-hashtag mr-1"></i> Weightment Reference No.
                    </label>
                    <input
                      type="text"
                      name="weightmentReferenceNumber"
                      value={formData.weightmentReferenceNumber}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="Enter reference number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <i className="fas fa-sticky-note mr-1"></i> Important Notes
                    </label>
                    <textarea
                      name="importantNotes"
                      value={formData.importantNotes}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="Add any important notes"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Summary and Logistics */}
            <div className="space-y-6 lg:space-y-8">
              {/* Logistics Card */}
              <div className="card p-6 lg:p-8 relative">
                <h2 className="text-xl font-semibold text-gray-800 mb-5">
                  <i className="fas fa-truck-loading text-primary-blue mr-2"></i>
                  Logistics & Other Details
                </h2>
                
                <div className="space-y-4">
                  {/* Harvester Count field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <i className="fas fa-tractor mr-1"></i> Harvester Count
                    </label>
                    <input 
                      type="number" 
                      id="harvesterCountInput" 
                      className="input-field w-full bg-gray-100 cursor-not-allowed" 
                      placeholder="e.g., 1500" 
                      readOnly
                      value={formData.harvesterCount}
                    />
                  </div>
                  
                  {/* Vehicle Count field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <i className="fas fa-truck-moving mr-1"></i> Vehicle Count
                    </label>
                    <input 
                      type="number" 
                      id="vehicleCountInput" 
                      className="input-field w-full bg-gray-100 cursor-not-allowed" 
                      placeholder="e.g., 8500" 
                      readOnly
                      value={formData.vehicleCount}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <i className="fas fa-balance-scale mr-1"></i> Difference
                    </label>
                    <input 
                      type="text" 
                      id="differenceValue" 
                      className="input-field w-full bg-gray-100 cursor-not-allowed" 
                      readOnly
                      value={formData.differenceValue}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <i className="fas fa-clipboard-list mr-1"></i> Weightment Reference Number
                    </label>
                    <input 
                      type="text" 
                      id="weightmentReferenceNumber" 
                      className="input-field w-full" 
                      placeholder="e.g., WRTN12345"
                      value={formData.weightmentReferenceNumber}
                      onChange={handleInputChange}
                      name="weightmentReferenceNumber"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      <i className="fas fa-info-circle mr-1"></i> Important Notes
                    </label>
                    <textarea 
                      id="importantNotes" 
                      className="input-field w-full resize-y" 
                      rows="3" 
                      placeholder="Any important details or comments..."
                      value={formData.importantNotes}
                      onChange={handleInputChange}
                      name="importantNotes"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Summary Card */}
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
                      <span id="totalItemValue" className="font-semibold text-lg text-gray-800">₹{summary.totalItemValue}</span>
                    </div>
                    
                    {formData.toggleGST && (
                      <div className="flex justify-between items-center mb-2" id="gstTotalRow">
                        <span className="text-gray-600 font-medium">
                          <i className="fas fa-percentage mr-2"></i> GST
                        </span>
                        <span id="gstTotal" className="font-semibold text-lg text-gray-800">₹{summary.totalGst}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        <i className="fas fa-money-bill-wave mr-2"></i> Charges
                      </span>
                      <span id="sundryTotal" className="font-semibold text-lg text-gray-800">₹{summary.totalSundry}</span>
                    </div>
                  </div>
                  
                  <div className="summary-card bg-secondary-green border border-secondary-green">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xl text-secondary-green-dark">
                        <i className="fas fa-file-invoice-dollar mr-2"></i> Grand Total
                      </span>
                      <span id="grandTotal" className="font-bold text-xl text-secondary-green-dark">₹{summary.grandTotal}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <button onClick={() => saveTransaction('next')} className="btn btn-primary w-full">
                      <i className="fas fa-save mr-2"></i> Save & Continue
                    </button>
                    <button onClick={() => saveTransaction('new')} className="btn btn-secondary w-full">
                      <i className="fas fa-file mr-2"></i> Save & New
                    </button>
                    <button className="btn btn-primary w-full bg-accent-orange hover:bg-accent-orange-dark">
                      <i className="fas fa-check-circle mr-2"></i> Complete Transaction
                    </button>
                    <button onClick={resetForm} className="btn w-full bg-danger-red text-white hover:bg-danger-red-dark">
                      <i className="fas fa-trash-alt mr-2"></i> Clear Form
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseTransactionForm;