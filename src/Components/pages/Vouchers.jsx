import React, { useState, useEffect, useCallback } from 'react';

const VoucherEntryForm = () => {
    // State for Voucher Details
    const [voucherDate, setVoucherDate] = useState(new Date().toISOString().slice(0, 10));
    const [voucherType, setVoucherType] = useState('');
    const [voucherCategory, setVoucherCategory] = useState('');
    const [generalLoader, setGeneralLoader] = useState(false);

    // State for Salary Section
    const [employeeCategory, setEmployeeCategory] = useState('');
    const [employeeGroup, setEmployeeGroup] = useState('');
    const [dateRangeFrom, setDateRangeFrom] = useState('');
    const [dateRangeTo, setDateRangeTo] = useState('');
    const [employees, setEmployees] = useState([]);
    const [employeeLoader, setEmployeeLoader] = useState(false);
    const [salarySummary, setSalarySummary] = useState({
        totalAdvance: 0,
        totalGrossSalary: 0,
        totalNetSalary: 0,
        totalAmountToBeGiven: 0,
    });

    // State for Advance by Group Section
    const [advGroupDate, setAdvGroupDate] = useState(new Date().toISOString().slice(0, 10));
    const [advGroupEmployeeCategory, setAdvGroupEmployeeCategory] = useState('');
    const [advGroupEmployeeGroup, setAdvGroupEmployeeGroup] = useState('');
    const [advGroupAmount, setAdvGroupAmount] = useState('');
    const [advGroupRemarks, setAdvGroupRemarks] = useState('');

    // State for Advance by Individual Section
    const [advIndividualEmployeeCategory, setAdvIndividualEmployeeCategory] = useState('');
    const [advIndividualEmployeeGroup, setAdvIndividualEmployeeGroup] = useState('');
    const [advIndividualAdvanceByGroup, setAdvIndividualAdvanceByGroup] = useState(0);
    const [splitEvenCheckbox, setSplitEvenCheckbox] = useState(false);
    const [individualAdvances, setIndividualAdvances] = useState([]);

    // State for Party Section
    const [partyDate, setPartyDate] = useState(new Date().toISOString().slice(0, 10));
    const [partyName, setPartyName] = useState('');
    const [transactionMethod, setTransactionMethod] = useState('');
    const [payoutAmount, setPayoutAmount] = useState('');
    const [nafedCheckbox, setNafedCheckbox] = useState(false);
    const [existingDues, setExistingDues] = useState([
        { selected: true, purchaseOrderNo: 'PO-2023-001', date: '2023-01-15', amount: 12500.00, status: 'Credit' },
        { selected: false, purchaseOrderNo: 'PO-2023-005', date: '2023-03-20', amount: 8000.50, status: 'Credit' },
    ]);

    // State for Vendor Section
    const [vendorName, setVendorName] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [vendorTransactionMethod, setVendorTransactionMethod] = useState('');
    const [vendorAmount, setVendorAmount] = useState('');
    const [vendorRemarks, setVendorRemarks] = useState('');
    const [tripsheetEntries, setTripsheetEntries] = useState([]);

    const payoutCategories = [
        { value: 'salary', text: 'Salary' },
        { value: 'advance_group', text: 'Advance by Group' },
        { value: 'advance_individual', text: 'Advance by Individual' },
        { value: 'party', text: 'Party' },
        { value: 'vendor', text: 'Vendor' },
        { value: 'others', text: 'Others' }
    ];

    const receiptCategories = [
        { value: 'party', text: 'Party' },
        { value: 'investments', text: 'Investments' },
        { value: 'others', text: 'Others' }
    ];

    const updateBreadcrumb = useCallback(() => {
        // This function is now mostly for display and is implicitly handled by state
    }, []);

    const validateDateYear = (e) => {
        const input = e.target;
        const year = input.value.substring(0, 4);
        if (year.length > 4) {
            input.value = input.value.substring(0, 10); // Truncate to YYYY-MM-DD
        }
        setVoucherDate(input.value);
    };

    const filterVoucherCategories = useCallback(() => {
        let categoriesToDisplay = [];
        if (voucherType === 'payout') {
            categoriesToDisplay = payoutCategories;
        } else if (voucherType === 'receipt') {
            categoriesToDisplay = receiptCategories;
        }
        // No direct DOM manipulation, the select options will re-render based on voucherType state
        setVoucherCategory(''); // Reset category when type changes
    }, [voucherType]);

    useEffect(() => {
        filterVoucherCategories();
    }, [voucherType, filterVoucherCategories]);

    const toggleCategorySpecificSections = useCallback(() => {
        setGeneralLoader(true);
        // Simulate loading delay for section transitions
        const timer = setTimeout(() => {
            setGeneralLoader(false);
        }, 500); // Match CSS transition duration

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        toggleCategorySpecificSections();
    }, [voucherCategory, toggleCategorySpecificSections]);

    const loadEmployeeData = () => {
        setEmployeeLoader(true);
        setEmployees([]); // Clear existing data

        console.log(`Loading employees for Category: ${employeeCategory}, Group: ${employeeGroup}, From: ${dateRangeFrom}, To: ${dateRangeTo}`);

        setTimeout(() => {
            const fetchedEmployees = [
                { empCode: 'E001', name: 'Alice Smith', advance: 1500, gross: 30000, net: 27000, amountGiven: 0, isPresent: true },
                { empCode: 'E002', name: 'Bob Johnson', advance: 500, gross: 25000, net: 23500, amountGiven: 0, isPresent: true },
                { empCode: 'E003', name: 'Charlie Brown', advance: 0, gross: 35000, net: 32000, amountGiven: 0, isPresent: true },
                { empCode: 'E004', name: 'Diana Prince', advance: 2000, gross: 40000, net: 36000, amountGiven: 0, isPresent: true },
                { empCode: 'E005', name: 'Eve Adams', advance: 1000, gross: 28000, net: 25500, amountGiven: 0, isPresent: true },
            ].map(emp => ({
                ...emp,
                amountToBeGiven: Math.max(0, emp.net - emp.advance - emp.amountGiven),
                dueAmount: (emp.advance + emp.amountGiven) > emp.net ? (emp.advance + emp.amountGiven) - emp.net : 0,
            }));
            setEmployees(fetchedEmployees);
            setEmployeeLoader(false);
        }, 1000);
    };

    const updateEmployeeAmounts = (index, value) => {
        const newEmployees = [...employees];
        const emp = newEmployees[index];
        emp.amountGiven = parseFloat(value) || 0;
        emp.amountToBeGiven = Math.max(0, emp.net - emp.advance - emp.amountGiven);
        emp.dueAmount = (emp.advance + emp.amountGiven) > emp.net ? (emp.advance + emp.amountGiven) - emp.net : 0;
        setEmployees(newEmployees);
    };

    const toggleEmployeeAttendance = (index) => {
        const newEmployees = [...employees];
        newEmployees[index].isPresent = !newEmployees[index].isPresent;
        setEmployees(newEmployees);
    };

    useEffect(() => {
        let totalAdvance = 0;
        let totalGrossSalary = 0;
        let totalNetSalary = 0;
        let totalAmountToBeGiven = 0;

        employees.forEach(emp => {
            totalAdvance += emp.advance;
            totalGrossSalary += emp.gross;
            totalNetSalary += emp.net;
            totalAmountToBeGiven += emp.amountToBeGiven;
        });

        setSalarySummary({
            totalAdvance,
            totalGrossSalary,
            totalNetSalary,
            totalAmountToBeGiven,
        });
    }, [employees]);

    const loadAdvanceByIndividualData = useCallback(() => {
        setIndividualAdvances([]); // Clear existing data
        setAdvIndividualAdvanceByGroup(0);

        if (!advIndividualEmployeeCategory || !advIndividualEmployeeGroup) {
            return;
        }

        console.log(`Loading individual advances for Category: ${advIndividualEmployeeCategory}, Group: ${advIndividualEmployeeGroup}`);

        setTimeout(() => {
            const fetchedIndividualAdvances = [
                { empCode: 'E001', name: 'Alice Smith', totalByGroup: 5000, amount: 0, remarks: '' },
                { empCode: 'E002', name: 'Bob Johnson', totalByGroup: 5000, amount: 0, remarks: '' },
                { empCode: 'E006', name: 'Frank White', totalByGroup: 5000, amount: 0, remarks: '' }
            ];

            const totalAdvanceForGroup = fetchedIndividualAdvances.reduce((sum, adv) => sum + adv.totalByGroup, 0);
            setIndividualAdvances(fetchedIndividualAdvances);
            setAdvIndividualAdvanceByGroup(totalAdvanceForGroup);
        }, 500);
    }, [advIndividualEmployeeCategory, advIndividualEmployeeGroup]);

    useEffect(() => {
        if (voucherCategory === 'advance_individual') {
            loadAdvanceByIndividualData();
        }
    }, [voucherCategory, advIndividualEmployeeCategory, advIndividualEmployeeGroup, loadAdvanceByIndividualData]);


    const updateIndividualAdvanceAmount = (index, value) => {
        const newIndividualAdvances = [...individualAdvances];
        newIndividualAdvances[index].amount = parseFloat(value) || 0;
        setIndividualAdvances(newIndividualAdvances);
    };

    const updateIndividualAdvanceRemarks = (index, value) => {
        const newIndividualAdvances = [...individualAdvances];
        newIndividualAdvances[index].remarks = value;
        setIndividualAdvances(newIndividualAdvances);
    };

    const addIndividualAdvanceRow = () => {
        setIndividualAdvances([...individualAdvances, { empCode: '', name: '', totalByGroup: 0, amount: 0, remarks: '' }]);
    };

    const saveAdvanceIndividual = () => {
        alert('Advance by Individual data saved!');
        console.log("Advance by Individual Data:", {
            category: advIndividualEmployeeCategory,
            group: advIndividualEmployeeGroup,
            splitEven: splitEvenCheckbox,
            advances: individualAdvances
        });
    };

    const toggleTripsheetEntry = useCallback(() => {
        if (expenseCategory === 'petrol' || expenseCategory === 'fuel') {
            loadTripsheetEntries();
        } else {
            setTripsheetEntries([]);
        }
    }, [expenseCategory]);

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

    const saveVendorVoucher = () => {
        alert('Vendor Voucher Saved Successfully!');
        console.log("Vendor Voucher Data:", {
            vendorName,
            expenseCategory,
            vendorTransactionMethod,
            vendorAmount,
            vendorRemarks,
            tripsheetEntries: expenseCategory === 'petrol' || expenseCategory === 'fuel' ? tripsheetEntries : []
        });
    };

    const saveVoucher = () => {
        if (!voucherDate || !voucherType || !voucherCategory) {
            alert('Please fill in all Voucher Details (Date, Type, Category).');
            return;
        }

        let formData = {
            date: voucherDate,
            type: voucherType,
            category: voucherCategory
        };

        if (voucherCategory === 'salary') {
            if (!employeeCategory || !employeeGroup || !dateRangeFrom || !dateRangeTo) {
                alert('Please select Employee Category, Group, and Date Range for Salary details.');
                return;
            }
            formData.salaryDetails = {
                employeeCategory,
                employeeGroup,
                dateRange: { from: dateRangeFrom, to: dateRangeTo },
                employees: employees,
                summary: salarySummary
            };
        } else if (voucherCategory === 'advance_group') {
            if (!advGroupDate || !advGroupEmployeeCategory || !advGroupEmployeeGroup || !advGroupAmount || !advGroupRemarks) {
                alert('Please fill in all Advance by Group details.');
                return;
            }
            formData.advanceByGroupDetails = {
                date: advGroupDate,
                employeeCategory: advGroupEmployeeCategory,
                employeeGroup: advGroupEmployeeGroup,
                amount: parseFloat(advGroupAmount),
                remarks: advGroupRemarks
            };
        } else if (voucherCategory === 'advance_individual') {
            if (!advIndividualEmployeeCategory || !advIndividualEmployeeGroup) {
                alert('Please select Employee Category and Employee Group for Advance by Individual.');
                return;
            }
            formData.advanceByIndividualDetails = {
                employeeCategory: advIndividualEmployeeCategory,
                employeeGroup: advIndividualEmployeeGroup,
                splitEven: splitEvenCheckbox,
                advances: individualAdvances
            };
        } else if (voucherCategory === 'party') {
            if (!partyDate || !partyName || !transactionMethod || !payoutAmount) {
                alert('Please fill in all Party details (Date, Party Name, Transaction Method, Payout Amount).');
                return;
            }
            formData.partyDetails = {
                date: partyDate,
                partyName: partyName,
                transactionMethod: transactionMethod,
                payoutAmount: parseFloat(payoutAmount),
                nafed: nafedCheckbox,
                existingDues: existingDues
            };
        } else if (voucherCategory === 'vendor') {
            if (!vendorName || !expenseCategory || !vendorTransactionMethod || !vendorAmount || !vendorRemarks) {
                alert('Please fill in all Vendor details.');
                return;
            }
            formData.vendorDetails = {
                vendorName: vendorName,
                expenseCategory: expenseCategory,
                transactionMethod: vendorTransactionMethod,
                amount: parseFloat(vendorAmount),
                remarks: vendorRemarks,
                tripsheetEntries: expenseCategory === 'petrol' || expenseCategory === 'fuel' ? tripsheetEntries : []
            };
        } else if (voucherCategory) {
            const generalAmount = document.getElementById('generalAmount').value;
            const generalDescription = document.getElementById('generalDescription').value;

            if (!generalAmount || !generalDescription) {
                alert('Please enter Amount and Description for the voucher.');
                return;
            }
            formData.generalDetails = {
                amount: parseFloat(generalAmount),
                description: generalDescription
            };
        }

        console.log('Saving Voucher:', formData);
        alert('Voucher Saved Successfully! Check console for data.');
    };

    const resetForm = () => {
        setVoucherDate(new Date().toISOString().slice(0, 10));
        setVoucherType('');
        setVoucherCategory('');

        setEmployeeCategory('');
        setEmployeeGroup('');
        setDateRangeFrom('');
        setDateRangeTo('');
        setEmployees([]);
        setSalarySummary({
            totalAdvance: 0,
            totalGrossSalary: 0,
            totalNetSalary: 0,
            totalAmountToBeGiven: 0,
        });

        setAdvGroupDate(new Date().toISOString().slice(0, 10));
        setAdvGroupEmployeeCategory('');
        setAdvGroupEmployeeGroup('');
        setAdvGroupAmount('');
        setAdvGroupRemarks('');

        setAdvIndividualEmployeeCategory('');
        setAdvIndividualEmployeeGroup('');
        setAdvIndividualAdvanceByGroup(0);
        setSplitEvenCheckbox(false);
        setIndividualAdvances([]);

        setPartyDate(new Date().toISOString().slice(0, 10));
        setPartyName('');
        setTransactionMethod('');
        setPayoutAmount('');
        setNafedCheckbox(false);
        setExistingDues([
            { selected: true, purchaseOrderNo: 'PO-2023-001', date: '2023-01-15', amount: 12500.00, status: 'Credit' },
            { selected: false, purchaseOrderNo: 'PO-2023-005', date: '2023-03-20', amount: 8000.50, status: 'Credit' },
        ]);

        setVendorName('');
        setExpenseCategory('');
        setVendorTransactionMethod('');
        setVendorAmount('');
        setVendorRemarks('');
        setTripsheetEntries([]);
    };

    // This useEffect handles the Enter key functionality for form navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const focusableElements = Array.from(
                    document.querySelectorAll(
                        'input:not([type="hidden"]):not([readonly]):not(.no-enter-tab), select:not(.no-enter-tab), button:not([disabled]):not(.no-enter-tab), textarea:not(.no-enter-tab)'
                    )
                ).filter(el => el.offsetParent !== null); // Only visible elements

                const currentActiveElement = document.activeElement;
                const currentIndex = focusableElements.indexOf(currentActiveElement);

                if (currentIndex > -1 && currentIndex < focusableElements.length - 1) {
                    focusableElements[currentIndex + 1].focus();
                } else if (currentIndex === focusableElements.length - 1) {
                    const saveButton = document.querySelector('.btn-primary');
                    if (saveButton) {
                        saveButton.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div className="p-6 sm:p-8 md:p-10 lg:p-12"> {/* Increased overall padding */}
            <style jsx>{`
                body {
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                    min-height: 100vh;
                    color: #1e293b;
                }

                input,
                select,
                textarea {
                    min-width: 100px;
                    height: 42px;
                    border: 1px solid #cbd5e1;
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    background-color: rgba(255, 255, 255, 0.85);
                    transition: all 0.2s ease-in-out;
                    color: #334155;
                }

                input:focus,
                select:focus,
                textarea:focus {
                    border-color: #818cf8;
                    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
                    outline: none;
                    background: rgba(255, 255, 255, 0.9);
                }

                textarea {
                    height: auto;
                    min-height: 80px;
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                }

                .glass-card {
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out, transform 0.3s ease, box-shadow 0.3s ease;
                }

                .glass-panel {
                    background: rgba(255, 255, 255, 0.75);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border-radius: 12px;
                    border: 1px solid rgba(203, 213, 225, 0.2);
                    transition: all 0.3s ease;
                }

                .glass-panel:hover {
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                }

                .btn-primary {
                    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                    color: white;
                    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
                    transition: all 0.3s ease;
                    border: none;
                }

                .btn-primary:hover {
                    background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
                    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
                    transform: translateY(-2px);
                }

                .btn-danger {
                    background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
                    color: white;
                    box-shadow: 0 4px 15px rgba(244, 63, 94, 0.3);
                    transition: all 0.3s ease;
                    border: none;
                }

                .btn-danger:hover {
                    background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
                    box-shadow: 0 6px 20px rgba(244, 63, 94, 0.4);
                    transform: translateY(-2px);
                }

                .table-header {
                    background: linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(67, 56, 202, 0.9) 100%);
                    color: white;
                    backdrop-filter: blur(8px);
                }

                .table-row:hover {
                    background-color: rgba(224, 231, 255, 0.3);
                }

                .gradient-text {
                    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }

                .select-wrapper {
                    position: relative;
                }

                .select-wrapper select {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    padding-right: 2.5rem;
                }

                .select-wrapper::after {
                    content: '\\f0d7';
                    font-family: "Font Awesome 5 Free";
                    font-weight: 900;
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    pointer-events: none;
                    color: #64748b;
                }

                .section-hidden {
                    opacity: 0;
                    visibility: hidden;
                    pointer-events: none;
                    max-height: 0;
                    overflow: hidden;
                    padding-top: 0;
                    padding-bottom: 0;
                    margin-top: 0;
                    margin-bottom: 0;
                }

                .section-visible {
                    opacity: 1;
                    visibility: visible;
                    pointer-events: auto;
                    max-height: 2000px; /* Sufficiently large to allow expansion */
                    padding-top: 1.5rem;
                    padding-bottom: 1.5rem;
                    margin-top: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .loader {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 60px;
                    margin: 20px auto;
                }

                .loader > div {
                    width: 12px;
                    height: 12px;
                    background-color: #6366f1;
                    border-radius: 50%;
                    margin: 0 4px;
                    animation: stretch 1s infinite ease-in-out;
                }

                .loader div:nth-child(1) {
                    animation-delay: -0.32s;
                }

                .loader div:nth-child(2) {
                    animation-delay: -0.16s;
                }

                @keyframes stretch {
                    0%,
                    100% {
                        transform: scale(0.6);
                        opacity: 0.6;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 1;
                    }
                }
            `}</style>
            <div className="w-full mx-auto">
                <nav className="text-gray-700 mb-6" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <a href="#" className="text-indigo-600 hover:text-indigo-800">Home</a>
                            <i className="fas fa-chevron-right mx-2 text-gray-400"></i>
                        </li>
                        <li className="flex items-center">
                            <span id="breadcrumbDate" className="text-gray-500">{voucherDate}</span>
                            <i className="fas fa-chevron-right mx-2 text-gray-400"></i>
                        </li>
                        <li className="flex items-center">
                            <span id="breadcrumbVoucherType" className="text-gray-500 capitalize">{voucherType || 'Select Type'}</span>
                            <i className="fas fa-chevron-right mx-2 text-gray-400"></i>
                        </li>
                        <li className="flex items-center">
                            <span id="breadcrumbVoucherCategory" className="text-gray-500 capitalize">{voucherCategory || 'Select Category'}</span>
                        </li>
                    </ol>
                </nav>

                <h1 className="text-4xl font-bold mb-6 gradient-text flex items-center">
                    <i className="fas fa-receipt mr-3"></i> Voucher Entry
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 glass-card p-6 floating transition-all">
                    <div>
                        <label htmlFor="voucherDate" className="block mb-2 font-medium text-gray-700">
                            <i className="fas fa-calendar-alt mr-2"></i> Date
                        </label>
                        <input
                            type="date"
                            className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                            id="voucherDate"
                            value={voucherDate}
                            onChange={validateDateYear}
                            onInput={validateDateYear}
                        />
                    </div>

                    <div className="select-wrapper">
                        <label htmlFor="voucherType" className="block mb-2 font-medium text-gray-700">
                            <i className="fas fa-cash-register mr-2"></i> Voucher Type
                        </label>
                        <select
                            className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                            id="voucherType"
                            value={voucherType}
                            onChange={(e) => setVoucherType(e.target.value)}
                        >
                            <option value="">- Select Voucher Type -</option>
                            <option value="payout">Payout</option>
                            <option value="receipt">Receipt</option>
                        </select>
                    </div>

                    <div className="select-wrapper">
                        <label htmlFor="voucherCategory" className="block mb-2 font-medium text-gray-700">
                            <i className="fas fa-tags mr-2"></i> Voucher Category
                        </label>
                        <select
                            className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                            id="voucherCategory"
                            value={voucherCategory}
                            onChange={(e) => setVoucherCategory(e.target.value)}
                        >
                            <option value="">- Select Voucher Category -</option>
                            {voucherType === 'payout' && payoutCategories.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.text}</option>
                            ))}
                            {voucherType === 'receipt' && receiptCategories.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.text}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div id="generalLoader" className={`loader ${generalLoader ? '' : 'hidden'}`}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                {voucherCategory === 'salary' && (
                    <div id="salarySection" className={`glass-card p-6 rounded-xl mb-8 ${voucherCategory === 'salary' ? 'section-visible' : 'section-hidden'}`}>
                        <h2 className="text-2xl font-semibold mb-6 gradient-text flex items-center">
                            <i className="fas fa-money-bill-wave mr-3"></i> Salary Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="select-wrapper">
                                <label htmlFor="employeeCategory" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-user-tag mr-2"></i> Employee Category
                                </label>
                                <select
                                    className="w-full glass-panel  focus:ring-2 focus:ring-indigo-200"
                                    id="employeeCategory"
                                    value={employeeCategory}
                                    onChange={(e) => setEmployeeCategory(e.target.value)}
                                >
                                    <option value="">- Select Category -</option>
                                    <option>Permanent</option>
                                    <option>Contract</option>
                                    <option>Intern</option>
                                </select>
                            </div>

                            <div className="select-wrapper">
                                <label htmlFor="employeeGroup" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-users mr-2"></i> Employee Group
                                </label>
                                <select
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="employeeGroup"
                                    value={employeeGroup}
                                    onChange={(e) => setEmployeeGroup(e.target.value)}
                                >
                                    <option value="">- Select Group -</option>
                                    <option>Management</option>
                                    <option>Production</option>
                                    <option>Sales</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="dateRangeFrom" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-calendar-day mr-2"></i> Date Range From
                                </label>
                                <input
                                    type="date"
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="dateRangeFrom"
                                    value={dateRangeFrom}
                                    onChange={(e) => setDateRangeFrom(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="dateRangeTo" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-calendar-day mr-2"></i> Date Range To
                                </label>
                                <input
                                    type="date"
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="dateRangeTo"
                                    value={dateRangeTo}
                                    onChange={(e) => setDateRangeTo(e.target.value)}
                                />
                            </div>
                            <div className="col-span-full flex justify-end">
                                <button onClick={loadEmployeeData} className="btn-primary px-6 py-3 rounded-lg text-base">
                                    <i className="fas fa-search mr-2"></i> Load Employees
                                </button>
                            </div>
                        </div>

                        <div id="employeeLoader" className={`loader ${employeeLoader ? '' : 'hidden'}`}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>

                        <div className="overflow-x-auto rounded-lg shadow-lg">
                            <table className="table-auto border-collapse w-full text-sm">
                                <thead>
                                    <tr className="table-header rounded-lg">
                                        <th className="border border-indigo-200 px-4 py-3 text-left rounded-tl-lg">Employee Code</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-left">Employee Name</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-right">Amount in Advance (₹)</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-right">Gross Salary (₹)</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-right">Net Salary (₹)</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-right">Amount to be given (₹)</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-right">Amount Given (₹)</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-right rounded-tr-lg">Due Amount (₹)</th>
                                    </tr>
                                </thead>
                                <tbody id="employeeTableBody">
                                    {employees.map((emp, index) => (
                                        <tr key={emp.empCode} className="table-row">
                                            <td className="border border-slate-100 px-4 py-3">{emp.empCode}</td>
                                            <td className="border border-slate-100 px-4 py-3 flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={emp.isPresent}
                                                    onChange={() => toggleEmployeeAttendance(index)}
                                                    className="form-checkbox h-4 w-4 text-indigo-600 mr-2 attendance-checkbox no-enter-tab"
                                                />
                                                {emp.name}
                                            </td>
                                            <td className="border border-slate-100 px-4 py-3 text-right">₹{emp.advance.toFixed(2)}</td>
                                            <td className="border border-slate-100 px-4 py-3 text-right">₹{emp.gross.toFixed(2)}</td>
                                            <td className="border border-slate-100 px-4 py-3 text-right">₹{emp.net.toFixed(2)}</td>
                                            <td className="border border-slate-100 px-4 py-3 text-right amount-to-be-given">₹{Math.max(0, emp.amountToBeGiven).toFixed(2)}</td>
                                            <td className="border border-slate-100 px-4 py-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={emp.amountGiven.toFixed(2)}
                                                    className="amount-given-input glass-panel border border-slate-200 p-2 rounded-lg w-full text-right"
                                                    onChange={(e) => updateEmployeeAmounts(index, e.target.value)}
                                                />
                                            </td>
                                            <td className="border border-slate-100 px-4 py-3 text-right due-amount">₹{emp.dueAmount.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="glass-panel p-6 rounded-xl mt-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                                <i className="fas fa-chart-pie mr-2"></i> Salary Summary
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <span className="block text-gray-600 text-sm">Total Amount in Advance:</span>
                                    <span id="summaryAdvance" className="font-bold text-lg text-indigo-700">₹{salarySummary.totalAdvance.toFixed(2)}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-600 text-sm">Total Gross Salary:</span>
                                    <span id="summaryGrossSalary" className="font-bold text-lg text-indigo-700">₹{salarySummary.totalGrossSalary.toFixed(2)}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-600 text-sm">Total Net Salary:</span>
                                    <span id="summaryNetSalary" className="font-bold text-lg text-indigo-700">₹{salarySummary.totalNetSalary.toFixed(2)}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-600 text-sm">Total Amount to be given:</span>
                                    <span id="summaryToBeGiven" className="font-bold text-lg text-indigo-700">₹{salarySummary.totalAmountToBeGiven.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {voucherCategory === 'advance_group' && (
                    <div id="advanceByGroupSection" className={`glass-card p-6 rounded-xl mb-8 ${voucherCategory === 'advance_group' ? 'section-visible' : 'section-hidden'}`}>
                        <h2 className="text-2xl font-semibold mb-6 gradient-text flex items-center">
                            <i className="fas fa-users-cog mr-3"></i> Advance by Group Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="advGroupDate" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-calendar-alt mr-2"></i> Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="advGroupDate"
                                    value={advGroupDate}
                                    onChange={(e) => setAdvGroupDate(e.target.value)}
                                />
                            </div>
                            <div className="select-wrapper">
                                <label htmlFor="advGroupEmployeeCategory" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-user-tag mr-2"></i> Employee Category
                                </label>
                                <select
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="advGroupEmployeeCategory"
                                    value={advGroupEmployeeCategory}
                                    onChange={(e) => setAdvGroupEmployeeCategory(e.target.value)}
                                >
                                    <option value="">- Select Category -</option>
                                    <option>Permanent</option>
                                    <option>Contract</option>
                                    <option>Intern</option>
                                </select>
                            </div>
                            <div className="select-wrapper">
                                <label htmlFor="advGroupEmployeeGroup" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-users mr-2"></i> Employee Group
                                </label>
                                <select
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="advGroupEmployeeGroup"
                                    value={advGroupEmployeeGroup}
                                    onChange={(e) => setAdvGroupEmployeeGroup(e.target.value)}
                                >
                                    <option value="">- Select Group -</option>
                                    <option>Management</option>
                                    <option>Production</option>
                                    <option>Sales</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="advGroupAmount" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-coins mr-2"></i> Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="advGroupAmount"
                                    placeholder="Enter Amount"
                                    value={advGroupAmount}
                                    onChange={(e) => setAdvGroupAmount(e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="advGroupRemarks" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-comment-alt mr-2"></i> Remarks
                                </label>
                                <textarea
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="advGroupRemarks"
                                    placeholder="Enter Remarks"
                                    value={advGroupRemarks}
                                    onChange={(e) => setAdvGroupRemarks(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                )}

                {voucherCategory === 'advance_individual' && (
                    <div id="advanceByIndividualSection" className={`glass-card p-6 rounded-xl mb-8 ${voucherCategory === 'advance_individual' ? 'section-visible' : 'section-hidden'}`}>
                        <h2 className="text-2xl font-semibold mb-6 gradient-text flex items-center">
                            <i className="fas fa-user-plus mr-3"></i> Advance by Individual Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="select-wrapper">
                                <label htmlFor="advIndividualEmployeeCategory" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-user-tag mr-2"></i> Employee Category
                                </label>
                                <select
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="advIndividualEmployeeCategory"
                                    value={advIndividualEmployeeCategory}
                                    onChange={(e) => setAdvIndividualEmployeeCategory(e.target.value)}
                                >
                                    <option value="">- Select Category -</option>
                                    <option>Permanent</option>
                                    <option>Contract</option>
                                    <option>Intern</option>
                                </select>
                            </div>

                            <div className="select-wrapper">
                                <label htmlFor="advIndividualEmployeeGroup" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-users mr-2"></i> Employee Group
                                </label>
                                <select
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="advIndividualEmployeeGroup"
                                    value={advIndividualEmployeeGroup}
                                    onChange={(e) => setAdvIndividualEmployeeGroup(e.target.value)}
                                >
                                    <option value="">- Select Group -</option>
                                    <option>Management</option>
                                    <option>Production</option>
                                    <option>Sales</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="advIndividualAdvanceByGroup" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-money-bill mr-2"></i> Advance by Group (₹)
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200 bg-gray-100 cursor-not-allowed"
                                    id="advIndividualAdvanceByGroup"
                                    value={`₹${advIndividualAdvanceByGroup.toFixed(2)}`}
                                />
                            </div>

                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="splitEvenCheckbox"
                                    className="form-checkbox h-5 w-5 text-indigo-600 no-enter-tab"
                                    checked={splitEvenCheckbox}
                                    onChange={(e) => setSplitEvenCheckbox(e.target.checked)}
                                />
                                <label htmlFor="splitEvenCheckbox" className="ml-2 block text-gray-700 font-medium">
                                    <i className="fas fa-equals mr-1"></i> Split Even
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end mb-4">
                            <button onClick={addIndividualAdvanceRow} className="btn-primary px-4 py-2 rounded-lg text-sm">
                                <i className="fas fa-plus mr-2"></i> Add Employee Advance
                            </button>
                        </div>

                        <div className="overflow-x-auto rounded-lg shadow-lg">
                            <table className="table-auto border-collapse w-full text-sm">
                                <thead>
                                    <tr className="table-header rounded-lg">
                                        <th className="border border-indigo-200 px-4 py-3 text-left rounded-tl-lg">Employee Code</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-left">Employee Name</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-right">Total by Group (₹)</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-right">Amount (₹)</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-left rounded-tr-lg">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody id="advIndividualTableBody">
                                    {individualAdvances.map((adv, index) => (
                                        <tr key={index} className="table-row">
                                            <td className="border border-slate-100 px-4 py-3">
                                                <input
                                                    type="text"
                                                    value={adv.empCode}
                                                    className="glass-panel border border-slate-200 p-2 rounded-lg w-full"
                                                    onChange={(e) => updateIndividualAdvanceRemarks(index, 'empCode', e.target.value)}
                                                    placeholder="E.g., E001"
                                                />
                                            </td>
                                            <td className="border border-slate-100 px-4 py-3">
                                                <input
                                                    type="text"
                                                    value={adv.name}
                                                    className="glass-panel border border-slate-200 p-2 rounded-lg w-full"
                                                    onChange={(e) => updateIndividualAdvanceRemarks(index, 'name', e.target.value)}
                                                    placeholder="Employee Name"
                                                />
                                            </td>
                                            <td className="border border-slate-100 px-4 py-3 text-right">₹{adv.totalByGroup.toFixed(2)}</td>
                                            <td className="border border-slate-100 px-4 py-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={adv.amount.toFixed(2)}
                                                    className="glass-panel border border-slate-200 p-2 rounded-lg w-full text-right"
                                                    onChange={(e) => updateIndividualAdvanceAmount(index, e.target.value)}
                                                />
                                            </td>
                                            <td className="border border-slate-100 px-4 py-3">
                                                <input
                                                    type="text"
                                                    value={adv.remarks}
                                                    className="glass-panel border border-slate-200 p-2 rounded-lg w-full"
                                                    onChange={(e) => updateIndividualAdvanceRemarks(index, 'remarks', e.target.value)}
                                                    placeholder="Remarks"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button onClick={saveAdvanceIndividual} className="btn-primary px-6 py-3 rounded-lg text-base">
                                <i className="fas fa-save mr-2"></i> Save Advance
                            </button>
                        </div>
                    </div>
                )}


                {voucherCategory === 'party' && (
                    <div id="partySection" className={`glass-card p-6 rounded-xl mb-8 ${voucherCategory === 'party' ? 'section-visible' : 'section-hidden'}`}>
                        <h2 className="text-2xl font-semibold mb-6 gradient-text flex items-center">
                            <i className="fas fa-handshake mr-3"></i> Party Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label htmlFor="partyDate" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-calendar-alt mr-2"></i> Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="partyDate"
                                    value={partyDate}
                                    onChange={(e) => setPartyDate(e.target.value)}
                                />
                            </div>
                            <div className="select-wrapper">
                                <label htmlFor="partyName" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-user-tie mr-2"></i> Party Name
                                </label>
                                <select
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="partyName"
                                    value={partyName}
                                    onChange={(e) => setPartyName(e.target.value)}
                                >
                                    <option value="">- Select Party -</option>
                                    <option>Ems Cocos</option>
                                    <option>APA Rasu</option>
                                    <option>Anand SOK</option>
                                    <option>Mohan</option>
                                    <option>Naveen</option>
                                </select>
                            </div>
                            <div className="select-wrapper">
                                <label htmlFor="transactionMethod" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-exchange-alt mr-2"></i> Transaction Method
                                </label>
                                <select
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="transactionMethod"
                                    value={transactionMethod}
                                    onChange={(e) => setTransactionMethod(e.target.value)}
                                >
                                    <option value="">- Select Method -</option>
                                    <option>Account</option>
                                    <option>Cash</option>
                                    <option>Others</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="payoutAmount" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-dollar-sign mr-2"></i> Payout Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="payoutAmount"
                                    placeholder="Enter Payout Amount"
                                    value={payoutAmount}
                                    onChange={(e) => setPayoutAmount(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="nafedCheckbox"
                                    className="form-checkbox h-5 w-5 text-indigo-600 no-enter-tab"
                                    checked={nafedCheckbox}
                                    onChange={(e) => setNafedCheckbox(e.target.checked)}
                                />
                                <label htmlFor="nafedCheckbox" className="ml-2 block text-gray-700 font-medium">
                                    <i className="fas fa-check-circle mr-1"></i> Nafed
                                </label>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                            <i className="fas fa-file-invoice-dollar mr-2"></i> Existing Dues
                        </h3>
                        <div className="overflow-x-auto rounded-lg shadow-lg mb-6">
                            <table className="table-auto border-collapse w-full text-sm">
                                <thead>
                                    <tr className="table-header">
                                        <th className="border border-indigo-200 px-4 py-3 text-center rounded-tl-lg">Select</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-left">Purchase Order No.</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-left">Date</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-right">Amount (₹)</th>
                                        <th className="border border-indigo-200 px-4 py-3 text-left rounded-tr-lg">Status</th>
                                    </tr>
                                </thead>
                                <tbody id="existingDuesTableBody">
                                    {existingDues.map((due, index) => (
                                        <tr key={index} className="table-row">
                                            <td className="border border-slate-100 px-4 py-3 text-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-4 w-4 text-indigo-600 no-enter-tab"
                                                    checked={due.selected}
                                                    onChange={() => {
                                                        const newDues = [...existingDues];
                                                        newDues[index].selected = !newDues[index].selected;
                                                        setExistingDues(newDues);
                                                    }}
                                                />
                                            </td>
                                            <td className="border border-slate-100 px-4 py-3">{due.purchaseOrderNo}</td>
                                            <td className="border border-slate-100 px-4 py-3">{due.date}</td>
                                            <td className="border border-slate-100 px-4 py-3 text-right">₹{due.amount.toFixed(2)}</td>
                                            <td className="border border-slate-100 px-4 py-3 text-green-700 font-medium">{due.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {voucherCategory === 'vendor' && (
                    <div id="vendorSection" className={`glass-card p-6 rounded-xl mb-8 ${voucherCategory === 'vendor' ? 'section-visible' : 'section-hidden'}`}>
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

                                <div className="overflow-x-auto rounded-lg shadow-lg">
                                    <table className="table-auto border-collapse w-full text-sm">
                                        <thead>
                                            <tr className="table-header">
                                                <th className="border border-indigo-200 px-4 py-3 text-center rounded-tl-lg">Close Voucher</th>
                                                <th className="border border-indigo-200 px-4 py-3 text-left">Tripsheet ID</th>
                                                <th className="border border-indigo-200 px-4 py-3 text-left">Date</th>
                                                <th className="border border-indigo-200 px-4 py-3 text-right">Fuel Amount (₹)</th>
                                                <th className="border border-indigo-200 px-4 py-3 text-left rounded-tr-lg">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tripsheetTableBody">
                                            {tripsheetEntries.map((ts, index) => (
                                                <tr key={index} className="table-row">
                                                    <td className="border border-slate-100 px-4 py-3 text-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox h-4 w-4 text-indigo-600 no-enter-tab"
                                                            checked={ts.closeVoucher}
                                                            disabled={ts.status === 'Closed'}
                                                            onChange={() => toggleTripsheetCloseVoucher(index)}
                                                        />
                                                    </td>
                                                    <td className="border border-slate-100 px-4 py-3">
                                                        <input
                                                            type="text"
                                                            value={ts.id}
                                                            className="glass-panel border border-slate-200 p-2 rounded-lg w-full"
                                                            onChange={(e) => updateTripsheetEntry(index, 'id', e.target.value)}
                                                            placeholder="TS ID"
                                                        />
                                                    </td>
                                                    <td className="border border-slate-100 px-4 py-3">
                                                        <input
                                                            type="date"
                                                            value={ts.date}
                                                            className="glass-panel border border-slate-200 p-2 rounded-lg w-full"
                                                            onChange={(e) => updateTripsheetEntry(index, 'date', e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="border border-slate-100 px-4 py-3">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value={ts.amount.toFixed(2)}
                                                            className="glass-panel border border-slate-200 p-2 rounded-lg w-full text-right"
                                                            onChange={(e) => updateTripsheetEntry(index, 'amount', parseFloat(e.target.value) || 0)}
                                                        />
                                                    </td>
                                                    <td className="border border-slate-100 px-4 py-3 text-left">
                                                        <select
                                                            value={ts.status}
                                                            className="glass-panel border border-slate-200 p-2 rounded-lg w-full"
                                                            onChange={(e) => updateTripsheetEntry(index, 'status', e.target.value)}
                                                        >
                                                            <option>Open</option>
                                                            <option>Closed</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {voucherCategory && !['salary', 'advance_group', 'advance_individual', 'party', 'vendor'].includes(voucherCategory) && (
                    <div id="generalSection" className={`glass-card p-6 rounded-xl mb-8 ${voucherCategory ? 'section-visible' : 'section-hidden'}`}>
                        <h2 className="text-2xl font-semibold mb-6 gradient-text flex items-center">
                            <i className="fas fa-file-alt mr-3"></i> General Voucher Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="generalAmount" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-coins mr-2"></i> Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="generalAmount"
                                    placeholder="Enter Amount"
                                />
                            </div>
                            <div>
                                <label htmlFor="generalDescription" className="block mb-2 font-medium text-gray-700">
                                    <i className="fas fa-comment-dots mr-2"></i> Description
                                </label>
                                <textarea
                                    className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                                    id="generalDescription"
                                    placeholder="Enter Description"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                )}


                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    <button onClick={saveVoucher} className="btn-primary px-8 py-4 rounded-xl text-base font-medium">
                        <i className="fas fa-save mr-2"></i> Save Voucher
                    </button>
                    <button onClick={resetForm} className="btn-danger px-8 py-4 rounded-xl text-base font-medium">
                        <i className="fas fa-redo mr-2"></i> Reset Form
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VoucherEntryForm;