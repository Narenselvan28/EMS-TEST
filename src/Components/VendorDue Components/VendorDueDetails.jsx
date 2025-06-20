import React from 'react';
import * as XLSX from 'xlsx';

const VendorDueDetails = () => {
    // Dummy Data (You can replace with backend later)
    const VendorData = {
        VendorName: "TN Traders Pvt Ltd",
        VendorCode: "PTYTN1001",
        contactPerson: "R. Kannan",
        currentDueStatus: "Overdue",
        currentDueAmount: 23500,
        duetype: "Credit",
        transactions: [
            {
                id: 1,
                date: "2025-05-15",
                orderNo: "SO-1058",
                orderType: "Sales",
                amount: 7000,
                status: "Paid"
            },
            {
                id: 2,
                date: "2025-05-28",
                orderNo: "SO-1071",
                orderType: "Sales",
                amount: 5000,
                status: "Pending"
            },
            {
                id: 3,
                date: "2025-06-10",
                orderNo: "PO-2053",
                orderType: "Purchase",
                amount: 8500,
                status: "Overdue"
            },
            {
                id: 4,
                date: "2025-06-16",
                orderNo: "SO-1092",
                orderType: "Sales",
                amount: 3000,
                status: "Overdue"
            }
        ]
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(VendorData.transactions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Vendor Transactions");
        XLSX.writeFile(workbook, `${VendorData.VendorName}_Due_Details.xlsx`);
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
            {/* Back Button + Header */}
            <div className="flex items-center mb-8">
                <button onClick={() => window.history.back()} className="mr-4 p-2 rounded-full hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h1 className="text-3xl font-bold text-indigo-600">Vendor Due Details</h1>
            </div>

            {/* Vendor Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <InfoRow label="Vendor Name" value={VendorData.VendorName} />
                        <InfoRow label="Vendor Code" value={VendorData.VendorCode} />
                        <InfoRow label="Contact Person" value={VendorData.contactPerson} />
                    </div>
                    <div className="space-y-4">
                        <InfoRow label="Current Due Status" value={VendorData.currentDueStatus} valueClass="text-red-600 font-medium" />
                        <InfoRow label="Current Due Amount" value={`₹${VendorData.currentDueAmount.toLocaleString('en-IN')}.00`} />
                        <InfoRow label="Due Typr" value={`${VendorData.duetype}`} />

                    </div>
                </div>
            </div>

            {/* Transaction Table */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
                <button onClick={exportToExcel} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium">
                    Export to Excel
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-600 text-white text-xs uppercase tracking-wider">
                        <tr>
                            <TableHeader title="Sr. No" />
                            <TableHeader title="Date" />
                            <TableHeader title="Order No" />
                            <TableHeader title="Order Type" />
                            <TableHeader title="Amount" />
                            <TableHeader title="Status" />
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {VendorData.transactions.map((txn, index) => (
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

const InfoRow = ({ label, value, valueClass = "text-gray-900" }) => (
    <div className="flex">
        <div className="w-2/5 font-semibold text-gray-600">{label}:</div>
        <div className={`w-3/5 ${valueClass}`}>{value}</div>
    </div>
);

const TableHeader = ({ title }) => (
    <th className="px-6 py-3 text-left text-xs font-semibold text-white">{title}</th>
);

export default VendorDueDetails;
