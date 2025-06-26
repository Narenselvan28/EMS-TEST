import React, { useState, useEffect, useCallback } from 'react';

import VoucherDetailsSection from '../VoucherComponents/VoucherDetailsSection';
import SalaryDetailsSection from '../VoucherComponents/SalaryDetailsSection';
import AdvanceByGroupSection from '../VoucherComponents/AdvanceByGroupSection';
import AdvanceByIndividualSection from '../VoucherComponents/AdvancebyIndividualSection';
import PartyDetailsSection from '../VoucherComponents/PartyDetailsSection';
import VendorDetailsSection from '../VoucherComponents/VendorDetailsSection';
import GeneralVoucherSection from '../VoucherComponents/GeneralVoucherSection';
import ConfirmResetModal from '../../essentials/ConfirmResetModel';
const Vouchers = () => {
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

    // State for Reset Confirmation Modal
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

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

    const performReset = () => { // Renamed original resetForm to performReset
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

    // Functions to handle reset modal interactions
    const handleResetClick = () => {
        setIsResetModalOpen(true);
    };

    const handleResetConfirm = () => {
        performReset();
        setIsResetModalOpen(false);
    };

    const handleResetCancel = () => {
        setIsResetModalOpen(false);
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

function handleBackToHome(){
    window.history.back()
}
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
               

                <h1 className="text-4xl text-black font-bold mb-6 gradient-text flex items-center">
                    <i className="fas fa-receipt mr-3"></i> Voucher Entry
                </h1>
                    <nav className="flex items-center mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="flex items-center">
                                <button onClick={handleBackToHome} className="flex items-center text-gray-500 hover:text-indigo-600">
                                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.707 1.293a1 1 0 00-1.414 0L2 8.586V17a1 1 0 001 1h5a1 1 0 001-1v-4h2v4a1 1 0 001 1h5a1 1 0 001-1V8.586l-7.293-7.293z" />
                                    </svg>
                                    Dashboard
                                </button>
                            </li>
                            <li>
                                <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                                </svg>
                            </li>
                            <li>
                                <button className="text-gray-500 hover:text-indigo-600">
                                    Vouchers
                                </button>
                            </li>

                        </ol>
                    </nav>

                <VoucherDetailsSection
                    voucherDate={voucherDate}
                    setVoucherDate={setVoucherDate}
                    voucherType={voucherType}
                    setVoucherType={setVoucherType}
                    voucherCategory={voucherCategory}
                    setVoucherCategory={setVoucherCategory}
                    payoutCategories={payoutCategories}
                    receiptCategories={receiptCategories}
                    validateDateYear={validateDateYear}
                />


                {voucherCategory === 'salary' && (
                    <SalaryDetailsSection
                        employeeCategory={employeeCategory}
                        setEmployeeCategory={setEmployeeCategory}
                        employeeGroup={employeeGroup}
                        setEmployeeGroup={setEmployeeGroup}
                        dateRangeFrom={dateRangeFrom}
                        setDateRangeFrom={setDateRangeFrom}
                        dateRangeTo={dateRangeTo}
                        setDateRangeTo={setDateRangeTo}
                        employees={employees}
                        setEmployees={setEmployees}
                        employeeLoader={employeeLoader}
                        setEmployeeLoader={setEmployeeLoader}
                        salarySummary={salarySummary}
                        setSalarySummary={setSalarySummary}
                    />
                )}

                {voucherCategory === 'advance_group' && (
                    <AdvanceByGroupSection
                        advGroupDate={advGroupDate}
                        setAdvGroupDate={setAdvGroupDate}
                        advGroupEmployeeCategory={advGroupEmployeeCategory}
                        setAdvGroupEmployeeCategory={setAdvGroupEmployeeCategory}
                        advGroupEmployeeGroup={advGroupEmployeeGroup}
                        setAdvGroupEmployeeGroup={setAdvGroupEmployeeGroup}
                        advGroupAmount={advGroupAmount}
                        setAdvGroupAmount={setAdvGroupAmount}
                        advGroupRemarks={advGroupRemarks}
                        setAdvGroupRemarks={setAdvGroupRemarks}
                    />
                )}

                {voucherCategory === 'advance_individual' && (
                    <AdvanceByIndividualSection
                        advIndividualEmployeeCategory={advIndividualEmployeeCategory}
                        setAdvIndividualEmployeeCategory={setAdvIndividualEmployeeCategory}
                        advIndividualEmployeeGroup={advIndividualEmployeeGroup}
                        setAdvIndividualEmployeeGroup={setAdvIndividualEmployeeGroup}
                        advIndividualAdvanceByGroup={advIndividualAdvanceByGroup}
                        setAdvIndividualAdvanceByGroup={setAdvIndividualAdvanceByGroup}
                        splitEvenCheckbox={splitEvenCheckbox}
                        setSplitEvenCheckbox={setSplitEvenCheckbox}
                        individualAdvances={individualAdvances}
                        setIndividualAdvances={setIndividualAdvances}
                    />
                )}

                {voucherCategory === 'party' && (
                    <PartyDetailsSection
                        partyDate={partyDate}
                        setPartyDate={setPartyDate}
                        partyName={partyName}
                        setPartyName={setPartyName}
                        transactionMethod={transactionMethod}
                        setTransactionMethod={setTransactionMethod}
                        payoutAmount={payoutAmount}
                        setPayoutAmount={setPayoutAmount}
                        nafedCheckbox={nafedCheckbox}
                        setNafedCheckbox={setNafedCheckbox}
                        existingDues={existingDues}
                        setExistingDues={setExistingDues}
                    />
                )}

                {voucherCategory === 'vendor' && (
                    <VendorDetailsSection
                        vendorName={vendorName}
                        setVendorName={setVendorName}
                        expenseCategory={expenseCategory}
                        setExpenseCategory={setExpenseCategory}
                        vendorTransactionMethod={vendorTransactionMethod}
                        setVendorTransactionMethod={setVendorTransactionMethod}
                        vendorAmount={vendorAmount}
                        setVendorAmount={setVendorAmount}
                        vendorRemarks={vendorRemarks}
                        setVendorRemarks={setVendorRemarks}
                        tripsheetEntries={tripsheetEntries}
                        setTripsheetEntries={setTripsheetEntries}
                    />
                )}

                {voucherCategory && !['salary', 'advance_group', 'advance_individual', 'party', 'vendor'].includes(voucherCategory) && (
                    <GeneralVoucherSection />
                )}


                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    <button onClick={saveVoucher} className="btn-primary px-8 py-4 rounded-xl text-base font-medium">
                        <i className="fas fa-save mr-2"></i> Save Voucher
                    </button>
                    <button onClick={handleResetClick} className="btn-danger px-8 py-4 rounded-xl text-base font-medium"> { /* Modified onClick to open modal */}
                        <i className="fas fa-redo mr-2"></i> Reset Form
                    </button>
                </div>
            </div>

            {/* Confirm Reset Modal */}
            <ConfirmResetModal
                isOpen={isResetModalOpen}
                onConfirm={handleResetConfirm}
                onCancel={handleResetCancel}
            />
        </div>
    );
};

export default Vouchers;