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

    const validateDateYear = (e) => {
        const input = e.target;
        const year = input.value.substring(0, 4);
        if (year.length > 4) {
            input.value = input.value.substring(0, 10);
        }
        setVoucherDate(input.value);
    };

    const filterVoucherCategories = useCallback(() => {
        setVoucherCategory('');
    }, [voucherType]);

    useEffect(() => {
        filterVoucherCategories();
    }, [voucherType, filterVoucherCategories]);

    const toggleCategorySpecificSections = useCallback(() => {
        setGeneralLoader(true);
        const timer = setTimeout(() => {
            setGeneralLoader(false);
        }, 500);
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

    const performReset = () => {
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

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const focusableElements = Array.from(
                    document.querySelectorAll(
                        'input:not([type="hidden"]):not([readonly]):not(.no-enter-tab), select:not(.no-enter-tab), button:not([disabled]):not(.no-enter-tab), textarea:not(.no-enter-tab)'
                    )
                ).filter(el => el.offsetParent !== null);

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

    function handleBackToHome() {
        window.history.back();
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p- bg-gray-50 min-h-screen">


            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col space-y-6">
                    {/* Header Section */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center">
                                <svg className="w-8 h-8 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span className="gradient-text">Voucher Entry</span>
                            </h1>
                        </div>

                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-2">
                                <li>
                                    <button
                                        onClick={handleBackToHome}
                                        className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 1.293a1 1 0 00-1.414 0L2 8.586V17a1 1 0 001 1h5a1 1 0 001-1v-4h2v4a1 1 0 001 1h5a1 1 0 001-1V8.586l-7.293-7.293z" />
                                        </svg>
                                        Dashboard
                                    </button>
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-2 text-blue-600 font-medium">Vouchers</span>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 gap-6">
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

                        <div className="action-buttons">
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={handleResetClick}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Reset
                                </button>

                                <button
                                    onClick={saveVoucher}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                    Save Voucher
                                </button>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmResetModal
                isOpen={isResetModalOpen}
                onConfirm={handleResetConfirm}
                onCancel={handleResetCancel}
            />
        </div>
    );
};

export default Vouchers;