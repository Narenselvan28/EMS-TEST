import React from 'react';

const PartyCard = ({ party }) => {
    const { partyName, partyId, dueAmount, dueDate, contact, status } = party;

    const getStatusClasses = (status) => {
        switch (status) {
            case 'Paid':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Overdue':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getButtonText = (status) => {
        switch (status) {
            case 'Paid':
                return { btn1: '', btn2: 'View Details' };
            case 'Pending':
                return { btn1: '', btn2: 'View Details' };
            case 'Overdue':
                return { btn1: 'Send Reminder', btn2: 'View Details' };
            default:
                return { btn1: '', btn2: 'View Details' };
        }
    };

    const statusClasses = getStatusClasses(status);
    const { btn1, btn2 } = getButtonText(status);

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-dark  ">{partyName}</h3>
                        <p className="text-sm text-gray-500">#{partyId}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses}`}>
                        {status}
                    </span>
                </div>
                <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Due Amount</span>
                        <span className="text-sm font-medium">${dueAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Due Date</span>
                        <span className="text-sm font-medium">{dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Contact</span>
                        <span className="text-sm font-medium">{contact}</span>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-3">
                <button className="text-sm text-primary text-red-600 hover:text-primary/80 font-medium">{btn1}</button>
                <button className="text-sm text-indigo-600 text-secondary hover:text-secondary/80 font-medium">{btn2}</button>
            </div>
        </div>
    );
};

export default PartyCard;