import React from 'react';
import { useNavigate } from 'react-router-dom';

const PartyCard = ({ party }) => {
    const { partyName, partyId, dueAmount, dueDate, contact, status } = party;
    const navigate = useNavigate();

    const getStatusClasses = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Overdue': return 'bg-red-100 text-red-800';
            default: return '';
        }
    };

    const handleViewDetails = () => {
        navigate('/party-details');
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-dark">{partyName}</h3>
                        <p className="text-sm text-gray-500">#{partyId}</p>
                    </div>
                    {/* Show status only for Pending or Overdue - Paid status is not shown */}
                    {(status === 'Pending' || status === 'Overdue') && (
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(status)}`}>
                            {status}
                        </span>
                    )}
                </div>
                <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Due Amount</span>
                        <span className="text-sm font-medium">₹{dueAmount.toLocaleString('en-IN')}.00</span>
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
                {/* Buttons only for Pending or Overdue */}
                {status === 'Overdue' && (
                    <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                        Send Reminder
                    </button>
                )}
                {(status === 'Pending' || status === 'Overdue') && (
                    <button
                        onClick={handleViewDetails}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        View Details
                    </button>
                )}
            </div>
        </div>
    );
};

// This is how you would sort the parties before rendering them
export const sortParties = (parties) => {
    return [...parties].sort((a, b) => {
        // Overdue comes first
        if (a.status === 'Overdue' && b.status !== 'Overdue') return -1;
        if (a.status !== 'Overdue' && b.status === 'Overdue') return 1;
        
        // Then Pending
        if (a.status === 'Pending' && b.status !== 'Pending') return -1;
        if (a.status !== 'Pending' && b.status === 'Pending') return 1;
        
        // Then others (like Paid)
        return 0;
    });
};

export default PartyCard;