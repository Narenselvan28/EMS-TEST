import React from 'react';
import * as XLSX from 'xlsx';

const EmployeeDueDetails = () => {
    const EmployeeData = {
        EmployeeName: "Sundar R",
        EmployeeCode: "EMP1024",
        contactPerson: "₹5,000.00",
        currentDueStatus: "Technical Staff",
        currentDueAmount: 12500,
        debitype: "₹30,000.00",
        gross: "₹45,000.00",
        transactions: [
            {
                id: 1,
                date: "2025-05-15",
                orderNo: "SAL-1058",
                orderType: "Salary",
                amount: 10000,
                status: "Paid"
            },
            {
                id: 2,
                date: "2025-05-28",
                orderNo: "SAL-1071",
                orderType: "Advance",
                amount: 5000,
                status: "Pending"
            },
            {
                id: 3,
                date: "2025-06-10",
                orderNo: "SAL-1091",
                orderType: "Salary",
                amount: 12500,
                status: "Overdue"
            }
        ]
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(EmployeeData.transactions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Transactions");
        XLSX.writeFile(workbook, `${EmployeeData.EmployeeName}_Due_Details.xlsx`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Paid': return 'text-green-600';
            case 'Pending': return 'text-yellow-600';
            case 'Overdue': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6 font-[Poppins]">
            {/* Header */}
            <div className="flex items-center mb-8">
                <button onClick={() => window.history.back()} className="mr-4 p-2 rounded-full hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h1 className="text-3xl font-bold">Employee Due Details</h1>
            </div>

            {/* Info Row */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                    <InfoRow label="Employee Name" value={EmployeeData.EmployeeName} />
                    <InfoRow label="Employee Code" value={EmployeeData.EmployeeCode} />
                    <InfoRow label="Total Amount in Advance" value={EmployeeData.contactPerson} />
                    <InfoRow label="Employee Category" value={EmployeeData.currentDueStatus} />
                    <InfoRow label="Current Due Status" value={`₹${EmployeeData.currentDueAmount.toLocaleString('en-IN')}.00`} />
                    <InfoRow label="Total Amount in Salary" value={EmployeeData.debitype} />
                    <InfoRow label="Employee Gross" value={EmployeeData.gross} />
                    <InfoRow label="Current Due Amount" value={`₹${EmployeeData.currentDueAmount.toLocaleString('en-IN')}.00`} />
                </div>
            </div>

            {/* Table Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
                <button onClick={exportToExcel} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium">
                    Export to Excel
                </button>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-600 text-white text-xs uppercase tracking-wider">
                        <tr>
                            <TableHeader title="Sr. No" />
                            <TableHeader title="Date" />
                            <TableHeader title="Voucher No" />
                            <TableHeader title="Payout Type" />
                            <TableHeader title="Amount" />
                            <TableHeader title="Status" />
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {EmployeeData.transactions.map((txn, index) => (
                            <tr key={txn.id}>
                                <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{txn.date}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{txn.orderNo}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{txn.orderType}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">₹{txn.amount.toLocaleString('en-IN')}.00</td>
                                <td className={`px-6 py-4 text-sm font-medium ${getStatusColor(txn.status)}`}>{txn.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// InfoRow - compact horizontal display
const InfoRow = ({ label, value, valueClass = "text-gray-900" }) => (
    <div className="flex items-center text-sm">
        <span className="font-semibold text-gray-600 min-w-[140px]">{label}:</span>
        <span className={`ml-2 ${valueClass}`}>{value}</span>
    </div>
);

const TableHeader = ({ title }) => (
    <th className="px-6 py-3 text-left text-xs font-semibold text-white">{title}</th>
);

export default EmployeeDueDetails;
