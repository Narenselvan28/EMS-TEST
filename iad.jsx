<!DOCTYPE html>
<html lang="en">                    
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Modern Transaction Entry</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom styles for the new color palette and design adjustments */
        body {
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

        .bg-accent-orange-new { /* Renamed to avoid conflict if any */
            background-color: #ed8936; /* Tailwind orange-500 */
        }
        .bg-accent-orange-new-dark {
            background-color: #dd6b20; /* Tailwind orange-600 */
        }
        .text-accent-orange-new {
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
            border: 1px solid #cbd5e1; /* Lighter border */
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
        
        /* Badge styling (if needed, though not heavily used in this design) */
        .badge {
            display: inline-flex;
            align-items: center;
            border-radius: 9999px;
            padding: 0.25rem 0.75rem;
            font-size: 0.75rem;
            font-weight: 500;
        }
        
        /* Message box */
        #messageBox {
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
        
        #messageBox.show {
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
        
        /* Item entry form - Adjusted grid for better alignment */
        .item-entry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* More flexible columns */
            gap: 1rem;
        }
        @media (min-width: 768px) { /* md breakpoint */
            .item-entry-grid {
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }
        }
        @media (min-width: 1024px) { /* lg breakpoint */
            .item-entry-grid {
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            }
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
        }

        /* Custom Toggle Switch Styling */
        .peer:checked + div {
            background-color: #4299e1; /* Primary blue when checked */
        }
        .peer:checked + div:after {
            transform: translateX(100%); /* Move thumb to right */
            border-color: white;
        }
        .peer + div {
            background-color: #e2e8f0; /* Gray when unchecked */
            transition: background-color 0.2s ease-in-out;
        }
        .peer + div:after {
            background-color: white;
            border: 1px solid #cbd5e1;
            transition: transform 0.2s ease-in-out, border-color 0.2s ease-in-out;
        }

        /* Loader Animation */
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin 1s linear infinite;
        }

        /* Logistics Card Specific Loader */
        .logistics-loader-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white */
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.75rem; /* Match card border-radius */
            z-index: 10; /* Above card content */
            transition: opacity 0.3s ease;
            opacity: 0;
            pointer-events: none; /* Allow clicks through when hidden */
        }
        .logistics-loader-overlay.show {
            opacity: 1;
            pointer-events: auto; /* Block clicks when visible */
        }
        .logistics-loader-spinner {
            border: 4px solid #f3f3f3; /* Light grey */
            border-top: 4px solid #4299e1; /* Primary blue */
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }
    </style>
</head>

<body class="p-4 sm:p-6 lg:p-8">
    <!-- Message Box -->
    <div id="messageBox" class="hidden text-white"></div>

    <!-- Full-screen Loader Overlay (for Save actions) -->
    <div id="loaderOverlay" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 hidden">
        <div class="flex flex-col items-center text-white">
            <div class="animate-spin-slow rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p class="mt-4 text-lg">Processing...</p>
        </div>
    </div>

    <div class="max-w-7xl mx-auto">
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                    <i class="fas fa-file-invoice text-primary-blue mr-2"></i>
                    New Transaction
                </h1>
                <p class="text-gray-500 mt-1">Create purchase or sales entries efficiently</p>
            </div>
            <div class="flex flex-wrap gap-3">
                <button class="btn btn-primary">
                    <i class="fas fa-save mr-2"></i> Save Draft
                </button>
                <button class="btn btn-secondary">
                    <i class="fas fa-history mr-2"></i> Recent Transactions
                </button>
            </div>
        </div>

        <!-- Main Form Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <!-- Left Column - Transaction Details -->
            <div class="lg:col-span-2 space-y-6 lg:space-y-8">
                <!-- Basic Info Card -->
                <div class="card p-6 lg:p-8">
                    <h2 class="text-xl font-semibold text-gray-800 mb-5">
                        <i class="fas fa-info-circle text-primary-blue mr-2"></i>
                        Transaction Information
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">
                                <i class="fas fa-calendar-alt mr-1"></i> Date
                            </label>
                            <input type="date" id="transactionDate" class="input-field w-full">
                        </div>
                        
                        <div id="orderTypeDropdown"></div>
                        <div id="partyNameDropdown"></div>
                        <div id="brokerNameDropdown"></div>
                    </div>
                </div>

                <!-- Items Card -->
                <div class="card p-6 lg:p-8">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
                        <h2 class="text-xl font-semibold text-gray-800">
                            <i class="fas fa-boxes text-primary-blue mr-2"></i>
                            Items
                        </h2>
                        <div class="flex flex-wrap items-center space-x-3">
                            <div class="flex items-center">
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="toggleGST" onchange="toggleGSTDetails()" class="sr-only peer" checked>
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-blue-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                                    <span class="ml-3 text-sm font-bold text-gray-700">
                                        GST Mode
                                    </span>
                                </label>
                            </div>
                            <button onclick="addNewItemRow()" class="btn btn-primary text-sm px-3 py-2">
                                <i class="fas fa-plus-circle mr-2"></i> Add Item
                            </button>
                        </div>
                    </div>
                    
                    <!-- Regular Items Form -->
                    <div id="regularItemsForm" class="space-y-4 hidden">
                        <div id="regularTableBody" class="space-y-4"></div>
                    </div>
                    
                    <!-- GST Items Form (Hidden by default) -->
                    <div id="gstItemsForm" class="space-y-4">
                        <div id="gstTableBody" class="space-y-4"></div>
                    </div>
                </div>

                <!-- Sundry Details Card -->
                <div class="card p-6 lg:p-8">
                    <div class="flex items-center justify-between mb-5">
                        <h2 class="text-xl font-semibold text-gray-800">
                            <i class="fas fa-receipt text-primary-blue mr-2"></i>
                            Additional Charges
                        </h2>
                        <div class="flex items-center">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="toggleSundry" onchange="toggleSundrySection()" class="sr-only peer">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-blue-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                                <span class="ml-3 text-sm font-bold text-gray-700">
                                     Enable
                                </span>
                            </label>
                        </div>
                    </div>
                    
                    <div id="sundrySection" class="opacity-50 pointer-events-none transition-opacity duration-300 space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-end">
                            <div class="col-span-full md:col-span-1" id="categoryInputDropdown"></div>
                            
                            <div class="col-span-full md:col-span-1">
                                <label class="block text-sm font-semibold text-gray-700 mb-1">
                                    <i class="fas fa-rupee-sign mr-1"></i> Amount
                                </label>
                                <input id="valueInput" type="number" class="input-field w-full" placeholder="0.00" disabled>
                            </div>
                            
                            <div class="col-span-full md:col-span-1">
                                <label class="block text-sm font-semibold text-gray-700 mb-1">
                                    <i class="fas fa-comment-dots mr-1"></i> Description
                                </label>
                                <input id="remarksInput" type="text" class="input-field w-full" placeholder="Optional" disabled>
                            </div>
                            <div class="col-span-full">
                                <button id="addSundryBtn" class="btn btn-primary disabled:opacity-50 w-full md:w-auto" disabled>
                                    <i class="fas fa-plus-circle mr-2"></i> Add Charge
                                </button>
                            </div>
                        </div>
                        
                        <div class="border-t border-gray-200 pt-4 mt-4">
                            <h3 class="text-base font-medium text-gray-700 mb-3">
                                <i class="fas fa-list-ul mr-1"></i> Added Charges
                            </h3>
                            <div id="sundryTableBody" class="space-y-3"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column - Summary & Actions -->
            <div class="space-y-6 lg:space-y-8">
                <!-- Logistics & Other Details Card -->
                <div class="card p-6 lg:p-8 relative">
                    <h2 class="text-xl font-semibold text-gray-800 mb-5">
                        <i class="fas fa-truck-loading text-primary-blue mr-2"></i>
                        Logistics & Other Details
                    </h2>
                    <!-- Logistics Loader Overlay -->
                    <div id="logisticsLoaderOverlay" class="logistics-loader-overlay">
                        <div class="logistics-loader-spinner"></div>
                    </div>
                    <div class="space-y-4">
                        <!-- Harvester Count field - always visible, value conditional -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">
                                <i class="fas fa-tractor mr-1"></i> Harvester Count
                            </label>
                            <input type="number" id="harvesterCountInput" class="input-field w-full bg-gray-100 cursor-not-allowed" placeholder="e.g., 1500" readonly>
                        </div>
                        <!-- Vehicle Count field - always visible, value conditional -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">
                                <i class="fas fa-truck-moving mr-1"></i> Vehicle Count
                            </label>
                            <input type="number" id="vehicleCountInput" class="input-field w-full bg-gray-100 cursor-not-allowed" placeholder="e.g., 8500" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">
                                <i class="fas fa-balance-scale mr-1"></i> Difference
                            </label>
                            <input type="text" id="differenceValue" class="input-field w-full bg-gray-100 cursor-not-allowed" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">
                                <i class="fas fa-clipboard-list mr-1"></i> Weightment Reference Number
                            </label>
                            <input type="text" id="weightmentReferenceNumber" class="input-field w-full" placeholder="e.g., WRTN12345">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">
                                <i class="fas fa-info-circle mr-1"></i> Important Notes
                            </label>
                            <textarea id="importantNotes" class="input-field w-full resize-y" rows="3" placeholder="Any important details or comments..."></textarea>
                        </div>
                    </div>
                </div>

                <!-- Transaction Summary Card (Moved to Last) -->
                <div class="card p-6 lg:p-8">
                    <h2 class="text-xl font-semibold text-gray-800 mb-5">
                        <i class="fas fa-calculator text-primary-blue mr-2"></i>
                        Transaction Summary
                    </h2>
                    
                    <div class="space-y-4">
                        <div class="summary-card">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-gray-600 font-medium">
                                    <i class="fas fa-box-open mr-2"></i> Subtotal
                                </span>
                                <span id="totalItemValue" class="font-semibold text-lg text-gray-800">₹0.00</span>
                            </div>
                            <div class="flex justify-between items-center mb-2" id="gstTotalRow">
                                <span class="text-gray-600 font-medium">
                                    <i class="fas fa-percentage mr-2"></i> GST
                                </span>
                                <span id="gstTotal" class="font-semibold text-lg text-gray-800">₹0.00</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600 font-medium">
                                    <i class="fas fa-money-bill-wave mr-2"></i> Charges
                                </span>
                                <span id="sundryTotal" class="font-semibold text-lg text-gray-800">₹0.00</span>
                            </div>
                        </div>
                        
                        <div class="summary-card bg-secondary-green border border-secondary-green">
                            <div class="flex justify-between items-center">
                                <span class="font-bold text-xl text-secondary-green-dark">
                                    <i class="fas fa-file-invoice-dollar mr-2"></i> Grand Total
                                </span>
                                <span id="grandTotal" class="font-bold text-xl text-secondary-green-dark">₹0.00</span>
                            </div>
                        </div>
                        
                        <div class="space-y-3 pt-4 border-t border-gray-200">
                            <button onclick="saveTransaction('next')" class="btn btn-primary w-full">
                                <i class="fas fa-save mr-2"></i> Save & Continue
                            </button>
                            <button onclick="saveTransaction('new')" class="btn btn-secondary w-full">
                                <i class="fas fa-file mr-2"></i> Save & New
                            </button>
                            <button class="btn btn-primary w-full bg-accent-orange-new hover:bg-accent-orange-new-dark">
                                <i class="fas fa-check-circle mr-2"></i> Complete Transaction
                            </button>
                            <button onclick="resetForm()" class="btn w-full bg-danger-red text-white hover:bg-danger-red-dark">
                                <i class="fas fa-trash-alt mr-2"></i> Clear Form
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // --- Searchable Dropdown Component ---
        /**
         * Creates a searchable dropdown component.
         * @param {HTMLElement} containerElement - The DOM element to append the dropdown to.
         * @param {string} labelText - The label for the dropdown.
         * @param {string[]} options - An array of string options for the dropdown.
         * @param {string} initialValue - The initial selected value.
         * @param {function(string): void} onChange - Callback function when a value is selected or input changes.
         * @param {boolean} disabled - Whether the dropdown should be disabled initially.
         * @param {string} placeholder - The placeholder text for the input field.
         * @param {boolean} renderLabel - Whether to render a label element for the dropdown.
         * @returns {{update: function(string, string[], boolean): void}|null} An object with an update method, or null if containerElement is invalid.
         */
        function createSearchableDropdown(containerElement, labelText, options, initialValue, onChange, disabled, placeholder, renderLabel = true) {
            let currentValue = initialValue || "";
            let filteredOptions = [];
            let highlightedIndex = -1;
            let isDropdownOpen = false;

            // Ensure containerElement is not null before proceeding
            if (!containerElement) {
                console.error("createSearchableDropdown: containerElement is null or undefined for label:", labelText);
                return null; // Return null to indicate failure
            }

            containerElement.innerHTML = ''; // Clear existing content

            let labelElement;
            if (renderLabel) {
                labelElement = document.createElement('label');
                // Changed to font-semibold as requested
                labelElement.className = `block text-sm font-semibold text-gray-700 mb-1 ${disabled ? "opacity-50" : ""}`;
                labelElement.innerHTML = `<i class="fas fa-tag mr-1"></i> ${labelText}`; // Added icon to label
                containerElement.appendChild(labelElement);
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'relative w-full';

            const inputElement = document.createElement('input');
            inputElement.type = 'text';
            inputElement.className = `input-field w-full searchable-dropdown-input ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`;
            inputElement.placeholder = placeholder || '';
            inputElement.disabled = disabled;
            inputElement.setAttribute('autocomplete', 'off'); // Prevent browser autocomplete

            const dropdownIcon = document.createElement('span');
            dropdownIcon.className = 'absolute top-1/2 transform -translate-y-1/2 text-gray-400 searchable-dropdown-icon';
            dropdownIcon.innerHTML = '<i class="fas fa-chevron-down"></i>';

            const optionsList = document.createElement('ul');
            optionsList.className = 'absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg hidden searchable-dropdown-list';

            wrapper.appendChild(inputElement);
            wrapper.appendChild(dropdownIcon);
            wrapper.appendChild(optionsList);
            containerElement.appendChild(wrapper);

            // Function to update the disabled state of the input and label
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

            // Function to render the options list
            const renderOptions = () => {
                filteredOptions = options.filter(opt =>
                    opt.toLowerCase().includes(inputElement.value.toLowerCase())
                );
                optionsList.innerHTML = ''; // Clear previous options

                if (filteredOptions.length > 0) {
                    filteredOptions.forEach((opt, idx) => {
                        const li = document.createElement('li');
                        li.className = `px-4 py-2 cursor-pointer text-gray-800 transition-colors duration-150 ${highlightedIndex === idx ? 'bg-primary-blue text-white' : 'hover:bg-gray-100'}`;
                        li.textContent = opt;
                        li.addEventListener('mousedown', (e) => {
                            e.preventDefault(); // Prevent blur event from firing before click
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

                // Show/hide dropdown list
                optionsList.classList.toggle('hidden', !isDropdownOpen);
                dropdownIcon.innerHTML = isDropdownOpen ? '<i class="fas fa-chevron-up"></i>' : '<i class="fas fa-chevron-down"></i>';
            };

            // Function to select an option
            const selectOption = (value) => {
                currentValue = value;
                inputElement.value = value;
                onChange(value); // Call the provided onChange callback
                isDropdownOpen = false;
                renderOptions();
            };

            // Event listeners for input field
            inputElement.addEventListener('input', (e) => {
                currentValue = e.target.value;
                onChange(currentValue);
                isDropdownOpen = true;
                highlightedIndex = -1; // Reset highlight on new input
                renderOptions();
            });

            inputElement.addEventListener('focus', () => {
                if (!disabled) {
                    isDropdownOpen = true;
                    renderOptions();
                }
            });

            inputElement.addEventListener('blur', () => {
                // Delay hiding to allow click on options
                setTimeout(() => {
                    isDropdownOpen = false;
                    renderOptions();
                }, 100);
            });

            inputElement.addEventListener('keydown', (e) => {
                if (!isDropdownOpen || disabled) {
                    // If dropdown is not open or disabled, but Enter is pressed,
                    // still try to move to the next field if a value is present.
                    if (e.key === "Enter") {
                        e.preventDefault();
                        if (inputElement.value && filteredOptions.length > 0) {
                            selectOption(filteredOptions[0]); // Select the first option even if dropdown is not explicitly open
                        }
                        focusNextInputField(inputElement);
                    }
                    return;
                }

                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    highlightedIndex = (highlightedIndex < filteredOptions.length - 1) ? highlightedIndex + 1 : 0;
                    renderOptions();
                    // Scroll into view if needed
                    optionsList.children[highlightedIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    highlightedIndex = (highlightedIndex > 0) ? highlightedIndex - 1 : filteredOptions.length - 1;
                    renderOptions();
                    optionsList.children[highlightedIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                } else if (e.key === "Enter") {
                    e.preventDefault();
                    if (highlightedIndex !== -1 && filteredOptions[highlightedIndex]) {
                        // If an option is highlighted, select it
                        selectOption(filteredOptions[highlightedIndex]);
                    } else if (filteredOptions.length > 0) { // If no highlight, but options exist, select the first one
                        selectOption(filteredOptions[0]);
                    }
                    inputElement.blur(); // Hide dropdown after selection (or attempt to select)
                    focusNextInputField(inputElement); // Move to the next field
                } else if (e.key === "Escape") {
                    isDropdownOpen = false;
                    renderOptions();
                    inputElement.blur();
                }
            });

            // Initial setup
            inputElement.value = currentValue;
            updateInputDisabledState();
            renderOptions();

            // Public update method for the dropdown instance
            const update = (newValue, newOptions, newDisabled) => {
                currentValue = newValue !== undefined ? newValue : currentValue;
                inputElement.value = currentValue;

                if (newOptions !== undefined) {
                    options = newOptions;
                }
                if (newDisabled !== undefined) {
                    disabled = newDisabled;
                    updateInputDisabledState();
                }
                renderOptions();
            };

            return { update };
        }

        // --- Global Form Navigation ---
        let focusableElements = [];

        function updateFocusableElements() {
            // Select all relevant input fields and searchable dropdown inputs
            focusableElements = Array.from(document.querySelectorAll(
                'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([readonly]), ' +
                'textarea:not([readonly]), ' +
                'button:not([disabled]), ' +
                '.searchable-dropdown-input:not([disabled])'
            )).filter(element => {
                // Further filter out elements that are part of the 'toggle' switches visually,
                // or elements that are explicitly hidden or disabled via parent containers
                const style = window.getComputedStyle(element);
                return style.display !== 'none' && style.visibility !== 'hidden' && element.offsetParent !== null;
            });
        }

        function focusNextInputField(currentElement) {
            updateFocusableElements(); // Re-evaluate focusable elements
            const currentIndex = focusableElements.indexOf(currentElement);
            if (currentIndex > -1) {
                for (let i = currentIndex + 1; i < focusableElements.length; i++) {
                    const nextElement = focusableElements[i];
                    // Skip toggle/checkbox inputs and any disabled/readonly elements
                    if (nextElement.type !== 'checkbox' && nextElement.type !== 'radio' && !nextElement.disabled && !nextElement.readOnly) {
                        nextElement.focus();
                        // If it's a dropdown input, ensure the dropdown opens
                        if (nextElement.classList.contains('searchable-dropdown-input')) {
                            // Programmatically trigger focus to open the dropdown if it's not already
                            nextElement.dispatchEvent(new Event('focus'));
                        }
                        return; // Successfully moved focus
                    }
                }
            }
        }
        
        // --- Application Logic ---
        const transactionDateInput = document.getElementById('transactionDate');
        const weightmentReferenceNumberInput = document.getElementById('weightmentReferenceNumber'); // Added ID
        const importantNotesInput = document.getElementById('importantNotes'); // Added ID
        let orderType = '';
        let partyName = '';
        let brokerName = '';
        let sundryCategory = '';

        // Dropdown instances will be stored here
        let orderTypeDropdownInstance;
        let partyNameDropdownInstance;
        let brokerNameDropdownInstance;
        let categoryInputDropdownInstance;

        // Data options for dropdowns
        const orderTypeOptions = ["Purchase", "Sale"];
        const partyNameOptions = ["Ems Cocos", "APA Rasu", "Anand SOK", "Bharath Traders", "Green Farms"];
        const brokerNameOptions = ["Ems Cocos", "APA Rasu", "Anand SOK", "No Broker"]; // Added "No Broker" option
        const itemOptions = ["Coconut with Husk", "Coconut without Husk", "Copra", "Husk", "Coconut Oil"];
        const uomOptions = ["Nos", "Kgs", "Quintal", "Tons"];
        const debitCreditOptions = ["Debit", "Credit"];
        const sundryCategoryOptions = ["Gunny Bags", "Loading Charges", "Unloading Charges", "Roundoff (+)", "Roundoff (-)"];

        // Data arrays for items and sundries
        let regularItems = [];
        let gstItems = [];
        let sundryEntries = [];

        // DOM elements references
        const regularItemsForm = document.getElementById('regularItemsForm');
        const regularTableBody = document.getElementById('regularTableBody');
        const gstItemsForm = document.getElementById('gstItemsForm');
        const gstTableBody = document.getElementById('gstTableBody');
        const toggleGST = document.getElementById('toggleGST');
        const sundrySection = document.getElementById('sundrySection');
        const toggleSundry = document.getElementById('toggleSundry');
        const valueInput = document.getElementById('valueInput');
        const remarksInput = document.getElementById('remarksInput');
        const addSundryBtn = document.getElementById('addSundryBtn');
        const sundryTableBody = document.getElementById('sundryTableBody');
        const totalItemValueEl = document.getElementById('totalItemValue');
        const gstTotalEl = document.getElementById('gstTotal');
        const gstTotalRow = document.getElementById('gstTotalRow');
        const sundryTotalEl = document.getElementById('sundryTotal');
        const grandTotalEl = document.getElementById('grandTotal');
        const messageBox = document.getElementById('messageBox');
        const loaderOverlay = document.getElementById('loaderOverlay');
        
        // New DOM elements for logistics
        const harvesterCountInput = document.getElementById('harvesterCountInput');
        const vehicleCountInput = document.getElementById('vehicleCountInput');
        const differenceValueInput = document.getElementById('differenceValue');
        const logisticsLoaderOverlay = document.getElementById('logisticsLoaderOverlay');


        /**
         * Displays a message box with a given message and type (success/error).
         * @param {string} message - The message to display.
         * @param {'success'|'error'} type - The type of message.
         */
        function showMessage(message, type) {
            messageBox.classList.remove('hidden', 'bg-green-600', 'bg-red-600', 'text-white', 'bg-gray-800');
            messageBox.classList.add('animate-fade-in-slide');

            let iconHtml = '';
            let bgColorClass = 'bg-gray-800'; // Default neutral background for message box

            if (type === 'success') {
                iconHtml = '<i class="fas fa-check-circle mr-2"></i>';
                bgColorClass = 'bg-green-600';
            } else if (type === 'error') {
                iconHtml = '<i class="fas fa-exclamation-triangle mr-2"></i>';
                bgColorClass = 'bg-danger-red'; // Using the custom danger-red class
            }

            messageBox.classList.add(bgColorClass, 'text-white');
            messageBox.innerHTML = `${iconHtml}<span>${message}</span>`;
            messageBox.classList.add('show');
            
            setTimeout(() => {
                messageBox.classList.remove('show');
                setTimeout(() => {
                    messageBox.classList.add('hidden');
                    messageBox.classList.remove('animate-fade-in-slide');
                }, 500); // Allow fade-out animation to complete
            }, 3000); // Message visible for 3 seconds
        }

        /**
         * Shows the full-screen loader overlay.
         */
        function showFullScreenLoader() {
            loaderOverlay.classList.remove('hidden');
        }

        /**
         * Hides the full-screen loader overlay.
         */
        function hideFullScreenLoader() {
            loaderOverlay.classList.add('hidden');
        }

        /**
         * Shows the logistics card loader.
         */
        function showLogisticsLoader() {
            logisticsLoaderOverlay.classList.add('show');
        }

        /**
         * Hides the logistics card loader.
         */
        function hideLogisticsLoader() {
            logisticsLoaderOverlay.classList.remove('show');
        }

        /**
         * Initializes the form with today's date and adds the first item row.
         */
        function initializeForm() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            transactionDateInput.value = `${year}-${month}-${day}`;

            // Ensure GST mode is checked by default and render GST table initially
            toggleGST.checked = true; // Set GST mode to checked by default
            toggleGSTDetails(); // Call to render the correct item table based on default state
            addNewItemRow(); // Add an initial item row
            updateSummary(); // Update summary calculations
            updateLogisticsValues(); // Initial check for logistics values

            // Add keydown listeners to non-dropdown input fields for navigation
            transactionDateInput.addEventListener('keydown', (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    focusNextInputField(transactionDateInput);
                }
            });
            valueInput.addEventListener('keydown', (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    focusNextInputField(valueInput);
                }
            });
            remarksInput.addEventListener('keydown', (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    focusNextInputField(remarksInput);
                }
            });
            weightmentReferenceNumberInput.addEventListener('keydown', (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    focusNextInputField(weightmentReferenceNumberInput);
                }
            });
            importantNotesInput.addEventListener('keydown', (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    focusNextInputField(importantNotesInput);
                }
            });

        }

        /**
         * Toggles between regular and GST item entry forms.
         */
        function toggleGSTDetails() {
            if (toggleGST.checked) {
                regularItemsForm.classList.add('hidden');
                gstItemsForm.classList.remove('hidden');
                gstTotalRow.classList.remove('hidden');
                // Migrate regular items to GST items if they exist and are not already in GST array
                regularItems.forEach(item => {
                    if (!gstItems.some(gstItem => gstItem.id === item.id)) {
                        gstItems.push({
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
                            grandTotal: (item.qty * item.price * (1 - item.discount / 100)) // Initial grand total without GST
                        });
                    }
                });
                regularItems = []; // Clear regular items after migration
                renderGSTTable();
            } else {
                gstItemsForm.classList.add('hidden');
                regularItemsForm.classList.remove('hidden');
                gstTotalRow.classList.add('hidden');
                // Migrate GST items back to regular items
                gstItems.forEach(item => {
                    if (!regularItems.some(regItem => regItem.id === item.id)) {
                        regularItems.push({
                            id: item.id,
                            itemName: item.itemName,
                            qty: item.qty,
                            uom: item.uom,
                            price: item.price,
                            discount: item.discount,
                            debitCredit: item.debitCredit
                        });
                    }
                });
                gstItems = []; // Clear GST items after migration
                renderRegularTable();
            }
            updateSummary(); // Recalculate summary after toggle
        }

        /**
         * Toggles the visibility and interactivity of the sundry charges section.
         */
        function toggleSundrySection() {
            const sundryInputElements = [valueInput, remarksInput, addSundryBtn];
            if (toggleSundry.checked) {
                sundrySection.classList.remove('opacity-50', 'pointer-events-none');
                sundryInputElements.forEach(input => (input.disabled = false));
                // Enable the sundry category dropdown
                categoryInputDropdownInstance.update(sundryCategory, sundryCategoryOptions, false);
                renderSundryTable(); // Re-render to show current state
            } else {
                sundrySection.classList.add('opacity-50', 'pointer-events-none');
                sundryInputElements.forEach(input => (input.disabled = true));
                // Disable the sundry category dropdown
                categoryInputDropdownInstance.update('', sundryCategoryOptions, true);
                clearSundryInputs(); // Clear inputs when disabled
                sundryEntries = []; // Clear sundry entries when disabled
                renderSundryTable(); // Re-render (will show "No charges added")
            }
            updateSummary(); // Recalculate summary
        }

        /**
         * Clears the input fields for sundry charges.
         */
        function clearSundryInputs() {
            sundryCategory = ""; // Update dropdown to clear selection and set disabled state based on toggle
            categoryInputDropdownInstance.update('', sundryCategoryOptions, !toggleSundry.checked);
            valueInput.value = "";
            remarksInput.value = "";
            addSundryBtn.textContent = "Add Charge";
            addSundryBtn.innerHTML = '<i class="fas fa-plus-circle mr-2"></i> Add Charge';
            addSundryBtn.onclick = addSundryEntry; // Reset click handler to add
        }

        /**
         * Validates sundry input fields to enable/disable the add/update button.
         */
        function validateInputs() {
            // Button is enabled if category is selected, value is entered and is positive, and sundry section is enabled
            if (sundryCategory && valueInput.value && Number(valueInput.value) > 0 && toggleSundry.checked) {
                addSundryBtn.disabled = false;
                addSundryBtn.classList.remove('opacity-50');
            } else {
                addSundryBtn.disabled = true;
                addSundryBtn.classList.add('opacity-50');
            }
        }

        /**
         * Adds a new sundry entry to the list.
         */
        function addSundryEntry() {
            const newEntry = {
                id: Date.now(), // Unique ID for the entry
                category: sundryCategory,
                value: parseFloat(valueInput.value),
                remarks: remarksInput.value || "N/A" // Default remark if empty
            };
            sundryEntries.push(newEntry);
            renderSundryTable();
            clearSundryInputs();
            addSundryBtn.disabled = true; // Disable button after adding
            updateSummary();
            showMessage("Additional charge added!", "success");
        }

        /**
         * Renders the sundry charges table.
         */
        function renderSundryTable() {
            sundryTableBody.innerHTML = ""; // Clear existing content
            if (sundryEntries.length === 0) {
                sundryTableBody.innerHTML = `
                    <div class="text-center py-3 text-gray-500 text-sm">
                        <i class="fas fa-info-circle mr-1"></i> No additional charges added
                    </div>
                `;
                return;
            }
            sundryEntries.forEach((entry, index) => {
                const entryElement = document.createElement('div');
                entryElement.className = "flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm";
                entryElement.innerHTML = `
                    <div class="flex-1 mr-4">
                        <div class="font-medium text-gray-800">${entry.category}</div>
                        <div class="text-xs text-gray-500">${entry.remarks}</div>
                    </div>
                    <div class="font-semibold text-gray-700 mr-4">₹${entry.value.toFixed(2)}</div>
                    <div class="flex space-x-2">
                        <button onclick="editSundryEntry(${index})" class="text-blue-600 hover:text-blue-800 transition-colors duration-200" title="Edit Charge">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteSundryEntry(${index})" class="text-red-600 hover:text-red-800 transition-colors duration-200" title="Delete Charge">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
                sundryTableBody.appendChild(entryElement);
            });
        }

        /**
         * Populates the sundry input fields with data for editing.
         * @param {number} index - The index of the sundry entry to edit.
         */
        function editSundryEntry(index) {
            const entryToEdit = sundryEntries[index];
            sundryCategory = entryToEdit.category;
            categoryInputDropdownInstance.update(sundryCategory, sundryCategoryOptions, false); // Update dropdown
            valueInput.value = entryToEdit.value;
            remarksInput.value = entryToEdit.remarks;
            addSundryBtn.innerHTML = '<i class="fas fa-save mr-2"></i> Update Charge'; // Change button text
            addSundryBtn.onclick = () => updateSundryEntry(index); // Change click handler
            validateInputs(); // Re-validate to enable button
        }

        /**
         * Updates an existing sundry entry.
         * @param {number} index - The index of the sundry entry to update.
         */
        function updateSundryEntry(index) {
            sundryEntries[index].category = sundryCategory;
            sundryEntries[index].value = parseFloat(valueInput.value);
            sundryEntries[index].remarks = remarksInput.value || "N/A";
            renderSundryTable();
            clearSundryInputs();
            addSundryBtn.disabled = true;
            addSundryBtn.onclick = addSundryEntry; // Reset click handler
            addSundryBtn.innerHTML = '<i class="fas fa-plus-circle mr-2"></i> Add Charge'; // Reset button text
            updateSummary();
            showMessage("Charge updated successfully!", "success");
        }

        /**
         * Deletes a sundry entry.
         * @param {number} index - The index of the sundry entry to delete.
         */
        function deleteSundryEntry(index) {
            // Using a custom modal for confirmation instead of alert/confirm
            showConfirmationModal("Are you sure you want to delete this charge?", () => {
                sundryEntries.splice(index, 1);
                renderSundryTable();
                updateSummary();
                showMessage("Charge deleted", "success");
            });
        }

        /**
         * Creates and returns a new item row DOM element.
         * @param {object} item - The item data object.
         * @param {boolean} isGST - True if it's a GST item, false otherwise.
         * @returns {HTMLElement} The created item row element.
         */
        function createItemRowElement(item, isGST) {
            const itemId = item.id;
            const itemElement = document.createElement('div');
            itemElement.id = `item-row-${itemId}`; // Assign unique ID to the row
            itemElement.className = "card p-4 shadow-md space-y-4"; // Added space-y for internal spacing
            
            // Top section: Item Name dropdown and Delete button
            const topSection = document.createElement('div');
            topSection.className = "flex justify-between items-start";
            itemElement.appendChild(topSection);

            const itemNameContainer = document.createElement('div');
            itemNameContainer.className = "w-full mr-4";
            itemNameContainer.innerHTML = `<label class="block text-xs font-semibold text-gray-500 mb-1"><i class="fas fa-box mr-1"></i> Item Name</label>`;
            const itemNameDropdownDiv = document.createElement('div');
            itemNameDropdownDiv.id = `${isGST ? 'gstItemNameDropdown' : 'itemNameDropdown'}-${itemId}`;
            itemNameContainer.appendChild(itemNameDropdownDiv);
            topSection.appendChild(itemNameContainer);

            const deleteButton = document.createElement('button');
            deleteButton.onclick = () => deleteItemRow(itemId, isGST);
            deleteButton.className = "text-danger-red hover:text-danger-red-dark transition-colors duration-200 p-2 rounded-full";
            deleteButton.title = "Remove Item";
            deleteButton.innerHTML = '<i class="fas fa-times-circle text-lg"></i>';
            topSection.appendChild(deleteButton);

            // Basic Input Fields Group (Quantity, Unit, Price, Discount, Debit/Credit)
            const basicInputsGroup = document.createElement('div');
            basicInputsGroup.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"; // Added styling for grouping
            itemElement.appendChild(basicInputsGroup);

            // Quantity
            let qtyDiv = document.createElement('div');
            qtyDiv.innerHTML = `<label class="block text-xs font-semibold text-gray-700 mb-1"><i class="fas fa-hashtag mr-1"></i> Quantity</label>`;
            let qtyInput = document.createElement('input');
            qtyInput.type = 'number';
            qtyInput.value = item.qty;
            qtyInput.className = "qty-input input-field w-full text-sm";
            qtyInput.name = "qty"; // Added name attribute
            qtyInput.oninput = (e) => updateItemDataAndDisplay(itemId, 'qty', e.target.value, isGST);
            qtyInput.addEventListener('keydown', (e) => { if (e.key === "Enter") { e.preventDefault(); focusNextInputField(qtyInput); } });
            qtyDiv.appendChild(qtyInput);
            basicInputsGroup.appendChild(qtyDiv);

            // UOM
            let uomDiv = document.createElement('div');
            uomDiv.innerHTML = `<label class="block text-xs font-semibold text-gray-700 mb-1"><i class="fas fa-balance-scale mr-1"></i> Unit</label>`;
            const uomDropdownDiv = document.createElement('div');
            uomDropdownDiv.id = `${isGST ? 'gstUomDropdown' : 'uomDropdown'}-${itemId}`;
            uomDiv.appendChild(uomDropdownDiv);
            basicInputsGroup.appendChild(uomDiv);

            // Price
            let priceDiv = document.createElement('div');
            priceDiv.innerHTML = `<label class="block text-xs font-semibold text-gray-700 mb-1"><i class="fas fa-rupee-sign mr-1"></i> Price (per unit)</label>`;
            let priceInput = document.createElement('input');
            priceInput.type = 'number';
            priceInput.value = item.price;
            priceInput.className = "price-input input-field w-full text-sm";
            priceInput.name = "price"; // Added name attribute
            priceInput.oninput = (e) => updateItemDataAndDisplay(itemId, 'price', e.target.value, isGST);
            priceInput.addEventListener('keydown', (e) => { if (e.key === "Enter") { e.preventDefault(); focusNextInputField(priceInput); } });
            priceDiv.appendChild(priceInput);
            basicInputsGroup.appendChild(priceDiv);

            // Discount
            let discountDiv = document.createElement('div');
            discountDiv.innerHTML = `<label class="block text-xs font-semibold text-gray-700 mb-1"><i class="fas fa-percent mr-1"></i> Discount (%)</label>`;
            let discountInput = document.createElement('input');
            discountInput.type = 'number';
            discountInput.value = item.discount;
            discountInput.className = "discount-input input-field w-full text-sm";
            discountInput.name = "discount"; // Added name attribute
            discountInput.oninput = (e) => updateItemDataAndDisplay(itemId, 'discount', e.target.value, isGST);
            discountInput.addEventListener('keydown', (e) => { if (e.key === "Enter") { e.preventDefault(); focusNextInputField(discountInput); } });
            discountDiv.appendChild(discountInput);
            basicInputsGroup.appendChild(discountDiv);

            // Transaction Type (only for Regular Items)
            let debitCreditDropdownDiv;
            if (!isGST) {
                let transactionTypeDiv = document.createElement('div');
                transactionTypeDiv.innerHTML = `<label class="block text-xs font-semibold text-gray-700 mb-1"><i class="fas fa-exchange-alt mr-1"></i> Transaction Type</label>`;
                debitCreditDropdownDiv = document.createElement('div');
                debitCreditDropdownDiv.id = `debitCreditDropdown-${itemId}`;
                transactionTypeDiv.appendChild(debitCreditDropdownDiv);
                basicInputsGroup.appendChild(transactionTypeDiv);
            }

            // GST specific fields (Calculated/Read-only Group)
            if (isGST) {
                const gstDetailsGroup = document.createElement('div');
                gstDetailsGroup.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200"; // Distinct styling for GST group
                itemElement.appendChild(gstDetailsGroup);

                // CGST %
                let cgstPercentDiv = document.createElement('div');
                cgstPercentDiv.innerHTML = `<label class="block text-xs font-semibold text-gray-600 mb-1">CGST (%)</label>`;
                let cgstPercentInput = document.createElement('input');
                cgstPercentInput.type = 'number';
                cgstPercentInput.value = item.cgstPercent;
                cgstPercentInput.className = "input-field w-full text-sm";
                cgstPercentInput.name = "cgstPercent"; // Added name attribute
                cgstPercentInput.oninput = (e) => updateItemDataAndDisplay(itemId, 'cgstPercent', e.target.value, isGST);
                cgstPercentInput.addEventListener('keydown', (e) => { if (e.key === "Enter") { e.preventDefault(); focusNextInputField(cgstPercentInput); } });
                cgstPercentDiv.appendChild(cgstPercentInput);
                gstDetailsGroup.appendChild(cgstPercentDiv);

                // CGST Amt (Read-only)
                let cgstAmtDiv = document.createElement('div');
                cgstAmtDiv.innerHTML = `<label class="block text-xs font-semibold text-gray-600 mb-1">CGST Amt</label>`;
                let cgstAmtInput = document.createElement('input');
                cgstAmtInput.type = 'number';
                cgstAmtInput.value = item.cgstAmt;
                cgstAmtInput.className = "input-field w-full text-sm bg-gray-100 cursor-not-allowed font-bold";
                cgstAmtInput.name = "cgstAmt"; // Added name attribute
                cgstAmtInput.readOnly = true;
                cgstAmtDiv.appendChild(cgstAmtInput);
                gstDetailsGroup.appendChild(cgstAmtDiv);

                // SGST %
                let sgstPercentDiv = document.createElement('div');
                sgstPercentDiv.innerHTML = `<label class="block text-xs font-semibold text-gray-600 mb-1">SGST (%)</label>`;
                let sgstPercentInput = document.createElement('input');
                sgstPercentInput.type = 'number';
                sgstPercentInput.value = item.sgstPercent;
                sgstPercentInput.className = "input-field w-full text-sm";
                sgstPercentInput.name = "sgstPercent"; // Added name attribute
                sgstPercentInput.oninput = (e) => updateItemDataAndDisplay(itemId, 'sgstPercent', e.target.value, isGST);
                sgstPercentInput.addEventListener('keydown', (e) => { if (e.key === "Enter") { e.preventDefault(); focusNextInputField(sgstPercentInput); } });
                sgstPercentDiv.appendChild(sgstPercentInput);
                gstDetailsGroup.appendChild(sgstPercentDiv);

                // SGST Amt (Read-only)
                let sgstAmtDiv = document.createElement('div');
                sgstAmtDiv.innerHTML = `<label class="block text-xs font-semibold text-gray-600 mb-1">SGST Amt</label>`;
                let sgstAmtInput = document.createElement('input');
                sgstAmtInput.type = 'number';
                sgstAmtInput.value = item.sgstAmt;
                sgstAmtInput.className = "input-field w-full text-sm bg-gray-100 cursor-not-allowed font-bold";
                sgstAmtInput.name = "sgstAmt"; // Added name attribute
                sgstAmtInput.readOnly = true;
                sgstAmtDiv.appendChild(sgstAmtInput);
                gstDetailsGroup.appendChild(sgstAmtDiv);

                // Total GST (Read-only)
                let totalGstDiv = document.createElement('div');
                totalGstDiv.className = "col-span-full sm:col-span-2 lg:col-span-2"; // Span across columns
                totalGstDiv.innerHTML = `<label class="block text-xs font-semibold text-gray-600 mb-1">Total GST</label>`;
                let totalGstInput = document.createElement('input');
                totalGstInput.type = 'number';
                totalGstInput.value = item.totalGst;
                totalGstInput.className = "input-field w-full text-sm bg-gray-100 cursor-not-allowed font-bold";
                totalGstInput.name = "totalGst"; // Added name attribute
                totalGstInput.readOnly = true;
                totalGstDiv.appendChild(totalGstInput);
                gstDetailsGroup.appendChild(totalGstDiv);

                // Grand Total (Read-only)
                let grandTotalDiv = document.createElement('div');
                grandTotalDiv.className = "col-span-full sm:col-span-2 lg:col-span-2"; // Span across columns
                grandTotalDiv.innerHTML = `<label class="block text-xs font-semibold text-gray-600 mb-1">Grand Total (Item)</label>`;
                let grandTotalInput = document.createElement('input');
                grandTotalInput.type = 'number';
                grandTotalInput.value = item.grandTotal;
                grandTotalInput.className = "input-field w-full text-sm bg-gray-100 cursor-not-allowed font-bold text-lg text-primary-blue";
                grandTotalInput.name = "grandTotalItem"; // Added name attribute
                grandTotalInput.readOnly = true;
                grandTotalDiv.appendChild(grandTotalInput);
                gstDetailsGroup.appendChild(grandTotalDiv);
            }

            // Initialize dropdowns for the new row
            item.itemNameDropdownInstance = createSearchableDropdown(
                itemNameDropdownDiv,
                'Item Name',
                itemOptions,
                item.itemName,
                (value) => updateItemDataAndDisplay(itemId, 'itemName', value, isGST),
                false,
                "Select item"
            );
            item.uomDropdownInstance = createSearchableDropdown(
                uomDropdownDiv,
                'Unit of Measurement',
                uomOptions,
                item.uom,
                (value) => updateItemDataAndDisplay(itemId, 'uom', value, isGST),
                false,
                "Select UOM",
                false // Don't render label as it's part of the existing label div
            );

            if (!isGST) {
                item.debitCreditDropdownInstance = createSearchableDropdown(
                    debitCreditDropdownDiv,
                    'Type',
                    debitCreditOptions,
                    item.debitCredit,
                    (value) => updateItemDataAndDisplay(itemId, 'debitCredit', value, isGST),
                    false,
                    "Select type",
                    false // Don't render label
                );
            }

            return itemElement;
        }


        /**
         * Adds a new item row to the appropriate table (regular or GST).
         */
        function addNewItemRow() {
            const newItem = {
                id: Date.now(),
                itemName: "",
                qty: 0, // Reverted
                uom: "", // Reverted
                price: 0, // Reverted
                discount: 0, // Reverted
                debitCredit: "Debit" // Default for regular items
            };

            if (toggleGST.checked) {
                newItem.cgstPercent = 0;
                newItem.cgstAmt = 0;
                newItem.sgstPercent = 0;
                newItem.sgstAmt = 0;
                newItem.totalGst = 0;
                newItem.grandTotal = 0; // Calculated
                gstItems.push(newItem);
                renderGSTTable();
            } else {
                regularItems.push(newItem);
                renderRegularTable();
            }
            updateSummary();
        }

        /**
         * Updates item data and re-renders the relevant table.
         * @param {number} id - The ID of the item to update.
         * @param {string} field - The field to update (e.g., 'qty', 'price', 'cgstPercent').
         * @param {*} value - The new value for the field.
         * @param {boolean} isGST - True if it's a GST item, false otherwise.
         */
        function updateItemDataAndDisplay(id, field, value, isGST) {
            const list = isGST ? gstItems : regularItems;
            const itemIndex = list.findIndex(item => item.id === id);
            if (itemIndex > -1) {
                const item = list[itemIndex];
                item[field] = field === 'itemName' || field === 'uom' || field === 'debitCredit' ? value : parseFloat(value) || 0;

                // Recalculate based on changes
                if (isGST) {
                    const taxableValue = item.qty * item.price * (1 - item.discount / 100);
                    item.cgstAmt = (taxableValue * (item.cgstPercent / 100)).toFixed(2);
                    item.sgstAmt = (taxableValue * (item.sgstPercent / 100)).toFixed(2);
                    item.totalGst = (parseFloat(item.cgstAmt) + parseFloat(item.sgstAmt)).toFixed(2);
                    item.grandTotal = (taxableValue + parseFloat(item.totalGst)).toFixed(2);
                } else {
                    // For regular items, grandTotal is just value after discount
                    item.grandTotal = (item.qty * item.price * (1 - item.discount / 100)).toFixed(2);
                }

                // --- Direct DOM Update for the specific item row ---
                const itemRowElement = document.getElementById(`item-row-${id}`);
                if (itemRowElement) {
                    // Update basic inputs
                    itemRowElement.querySelector('input[name="qty"]').value = item.qty;
                    itemRowElement.querySelector('input[name="price"]').value = item.price;
                    itemRowElement.querySelector('input[name="discount"]').value = item.discount;

                    // Update dropdowns using their instances
                    if (item.itemNameDropdownInstance) {
                        item.itemNameDropdownInstance.update(item.itemName);
                    }
                    if (item.uomDropdownInstance) { // Re-added UOM dropdown update
                        item.uomDropdownInstance.update(item.uom);
                    }
                    if (!isGST && item.debitCreditDropdownInstance) {
                        item.debitCreditDropdownInstance.update(item.debitCredit);
                    }

                    // Update GST specific read-only fields if applicable
                    if (isGST) {
                        itemRowElement.querySelector('input[name="cgstPercent"]').value = item.cgstPercent;
                        itemRowElement.querySelector('input[name="cgstAmt"]').value = item.cgstAmt;
                        itemRowElement.querySelector('input[name="sgstPercent"]').value = item.sgstPercent;
                        itemRowElement.querySelector('input[name="sgstAmt"]').value = item.sgstAmt;
                        itemRowElement.querySelector('input[name="totalGst"]').value = item.totalGst;
                        itemRowElement.querySelector('input[name="grandTotalItem"]').value = item.grandTotal;
                    }
                }
                // --- End Direct DOM Update ---

                updateSummary();
            }
        }

        /**
         * Deletes an item row from the appropriate table.
         * @param {number} id - The ID of the item to delete.
         * @param {boolean} isGST - True if it's a GST item, false otherwise.
         */
        function deleteItemRow(id, isGST) {
            showConfirmationModal("Are you sure you want to remove this item?", () => {
                if (isGST) {
                    gstItems = gstItems.filter(item => item.id !== id);
                    renderGSTTable(); // Re-render the GST table after deletion
                } else {
                    regularItems = regularItems.filter(item => item.id !== id);
                    renderRegularTable(); // Re-render the Regular table after deletion
                }
                updateSummary();
                showMessage("Item removed", "success");
            });
        }


        /**
         * Renders the regular items table.
         */
        function renderRegularTable() {
            regularTableBody.innerHTML = '';
            if (regularItems.length === 0) {
                regularTableBody.innerHTML = `
                    <div class="text-center py-3 text-gray-500 text-sm">
                        <i class="fas fa-info-circle mr-1"></i> No regular items added. Click "Add Item" to begin.
                    </div>
                `;
                return;
            }
            regularItems.forEach(item => {
                regularTableBody.appendChild(createItemRowElement(item, false));
            });
        }

        /**
         * Renders the GST items table.
         */
        function renderGSTTable() {
            gstTableBody.innerHTML = '';
            if (gstItems.length === 0) {
                gstTableBody.innerHTML = `
                    <div class="text-center py-3 text-gray-500 text-sm">
                        <i class="fas fa-info-circle mr-1"></i> No GST items added. Click "Add Item" to begin.
                    </div>
                `;
                return;
            }
            gstItems.forEach(item => {
                gstTableBody.appendChild(createItemRowElement(item, true));
            });
        }


        /**
         * Updates the transaction summary totals.
         */
        function updateSummary() {
            let totalItemValue = 0;
            let totalGst = 0;
            let totalSundry = sundryEntries.reduce((sum, entry) => sum + entry.value, 0);

            if (toggleGST.checked) {
                totalItemValue = gstItems.reduce((sum, item) => sum + (item.qty * item.price * (1 - item.discount / 100)), 0);
                totalGst = gstItems.reduce((sum, item) => sum + parseFloat(item.totalGst), 0);
            } else {
                totalItemValue = regularItems.reduce((sum, item) => {
                    const itemTotal = item.qty * item.price * (1 - item.discount / 100);
                    return item.debitCredit === "Credit" ? sum - itemTotal : sum + itemTotal;
                }, 0);
            }

            const grandTotal = totalItemValue + totalGst + totalSundry;

            totalItemValueEl.textContent = `₹${totalItemValue.toFixed(2)}`;
            gstTotalEl.textContent = `₹${totalGst.toFixed(2)}`;
            sundryTotalEl.textContent = `₹${totalSundry.toFixed(2)}`;
            grandTotalEl.textContent = `₹${grandTotal.toFixed(2)}`;
        }

        /**
         * Placeholder for fetching logistics data.
         * In a real application, this would make an API call.
         * It simulates an asynchronous operation with a delay.
         */
        async function fetchLogisticsData(date) {
            showLogisticsLoader();
            console.log(`Fetching logistics data for date: ${date}`);
            return new Promise(resolve => {
                setTimeout(() => {
                    // Simulate data based on date, or random data
                    const harvesterCount = Math.floor(Math.random() * 500) + 1000; // 1000-1499
                    const vehicleCount = Math.floor(Math.random() * 1000) + 8000; // 8000-8999
                    resolve({ harvesterCount, vehicleCount });
                    hideLogisticsLoader();
                }, 1500); // Simulate network delay
            });
        }

        /**
         * Updates the logistics values (Harvester Count, Vehicle Count, Difference).
         * This function is called when transactionDate changes.
         */
        async function updateLogisticsValues() {
            const date = transactionDateInput.value;
            if (date) {
                const data = await fetchLogisticsData(date);
                harvesterCountInput.value = data.harvesterCount;
                vehicleCountInput.value = data.vehicleCount;
                differenceValueInput.value = Math.abs(data.harvesterCount - data.vehicleCount).toFixed(2);
            } else {
                harvesterCountInput.value = '';
                vehicleCountInput.value = '';
                differenceValueInput.value = '';
            }
        }

        /**
         * Resets the entire form to its initial state.
         */
        function resetForm() {
            showConfirmationModal("Are you sure you want to clear the entire form?", () => {
                transactionDateInput.value = "";
                orderType = "";
                partyName = "";
                brokerName = "";
                sundryCategory = "";

                orderTypeDropdownInstance.update('', orderTypeOptions, false);
                partyNameDropdownInstance.update('', partyNameOptions, false);
                brokerNameDropdownInstance.update('', brokerNameOptions, false);
                categoryInputDropdownInstance.update('', sundryCategoryOptions, true); // Sundry disabled by default

                regularItems = [];
                gstItems = [];
                sundryEntries = [];

                toggleGST.checked = true; // Reset GST toggle to default checked
                toggleGSTDetails(); // Re-render tables based on toggle

                toggleSundry.checked = false; // Reset Sundry toggle to default unchecked
                toggleSundrySection(); // Re-render based on toggle

                harvesterCountInput.value = '';
                vehicleCountInput.value = '';
                differenceValueInput.value = '';
                document.getElementById('weightmentReferenceNumber').value = ''; // Clear the new input
                document.getElementById('importantNotes').value = ''; // Clear the new textarea


                initializeForm(); // Re-initialize form with today's date and first item row
                updateSummary(); // Ensure summary is reset
                showMessage("Form cleared!", "success");
            });
        }


        /**
         * Generic confirmation modal.
         * @param {string} message - The message to display in the modal.
         * @param {function} onConfirm - Callback function to execute on confirmation.
         */
        function showConfirmationModal(message, onConfirm) {
            // Check if a modal already exists to prevent duplicates
            let modal = document.getElementById('confirmationModal');
            if (modal) {
                modal.remove();
            }

            modal = document.createElement('div');
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
        }


        /**
         * Handles saving the transaction.
         * @param {'next'|'new'} action - The action to perform after saving.
         */
        async function saveTransaction(action) {
            showFullScreenLoader();
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Basic validation
            if (!transactionDateInput.value || !orderType || !partyName) {
                hideFullScreenLoader();
                showMessage("Please fill in Date, Order Type, and Party Name.", "error");
                return;
            }

            const payload = {
                transactionDate: transactionDateInput.value,
                orderType: orderType,
                partyName: partyName,
                brokerName: brokerName,
                items: toggleGST.checked ? gstItems : regularItems,
                sundryCharges: sundryEntries,
                harvesterCount: harvesterCountInput.value,
                vehicleCount: vehicleCountInput.value,
                weightmentReferenceNumber: document.getElementById('weightmentReferenceNumber').value,
                importantNotes: document.getElementById('importantNotes').value,
                totalItemValue: parseFloat(totalItemValueEl.textContent.replace('₹', '')),
                gstTotal: parseFloat(gstTotalEl.textContent.replace('₹', '')),
                sundryTotal: parseFloat(sundryTotalEl.textContent.replace('₹', '')),
                grandTotal: parseFloat(grandTotalEl.textContent.replace('₹', ''))
            };

            console.log("Saving Transaction:", payload);
            showMessage("Transaction saved successfully!", "success");

            hideFullScreenLoader();

            if (action === 'new') {
                resetForm();
            } else if (action === 'next') {
                // Implement logic to go to next step/page or similar
                showMessage("Continuing to next transaction step...", "success");
                // For demonstration, just clear form to simulate new entry context
                resetForm(); 
            }
        }


        // Initialize form on DOMContentLoaded
        document.addEventListener('DOMContentLoaded', () => {
            orderTypeDropdownInstance = createSearchableDropdown(
                document.getElementById('orderTypeDropdown'),
                "Order Type",
                orderTypeOptions,
                orderType,
                (value) => { orderType = value; validateInputs(); },
                false,
                "Select order type"
            );

            partyNameDropdownInstance = createSearchableDropdown(
                document.getElementById('partyNameDropdown'),
                "Party Name",
                partyNameOptions,
                partyName,
                (value) => { partyName = value; validateInputs(); },
                false,
                "Select party"
            );

            brokerNameDropdownInstance = createSearchableDropdown(
                document.getElementById('brokerNameDropdown'),
                "Broker Name",
                brokerNameOptions,
                brokerName,
                (value) => { brokerName = value; },
                false,
                "Select broker (optional)"
            );

            categoryInputDropdownInstance = createSearchableDropdown(
                document.getElementById('categoryInputDropdown'),
                "Charge Type",
                sundryCategoryOptions,
                sundryCategory,
                (value) => {
                    sundryCategory = value;
                    validateInputs(); // Validate inputs when sundry category changes
                },
                true, // Initially disabled
                "Select charge type"
            );

            // Event listeners for sundry section inputs
            toggleSundry.addEventListener('change', toggleSundrySection);
            valueInput.addEventListener('input', validateInputs);
            remarksInput.addEventListener('input', validateInputs);
            addSundryBtn.addEventListener('click', addSundryEntry);

            // Event listener for transaction date to update logistics values
            transactionDateInput.addEventListener('change', updateLogisticsValues);

            initializeForm(); // Call the form initialization function
        });
    </script>
</body>
</html>
