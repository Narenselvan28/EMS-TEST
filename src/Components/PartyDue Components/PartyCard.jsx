import React from 'react';
import { useNavigate } from 'react-router-dom';

const PartyCard = ({ party }) => {
    // Destructure party props
    const { id, partyName, dueAmount, dueDate, contact, status } = party;
    const navigate = useNavigate();

    // Helper function to get Tailwind CSS classes based on status
    const getStatusClasses = (currentStatus) => {
        switch (currentStatus.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'overdue':
                return 'bg-red-100 text-red-800';
            default:
                return ''; // For any other status, though generally 'Paid' cards won't reach here
        }
    };

    const handleViewDetails = () => {
        // You might want to navigate to a specific details page for this party,
        // for example: navigate(`/party-details/${id}`);
        navigate('/party-details');
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-dark">{partyName}</h3>
                        {/* Using 'id' from the party object, assuming it's the unique identifier */}
                        <p className="text-sm text-gray-500">#{id}</p>
                    </div>
                    {/* Display status tag only for 'Pending' or 'Overdue' parties */}
                    {(status.toLowerCase() === 'pending' || status.toLowerCase() === 'overdue') && (
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
                {/* 'Send Reminder' button only for 'Overdue' parties */}
                {status.toLowerCase() === 'overdue' && (
                    <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                        Send Reminder
                    </button>
                )}
                {/* 'View Details' button for both 'Pending' and 'Overdue' parties */}
                {(status.toLowerCase() === 'pending' || status.toLowerCase() === 'overdue') && (
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

// This sorting function is typically used by the parent component (PartyDues)
// to arrange the list of parties before they are passed to PartyCard for rendering.
// It can be kept here or moved to PartyDues or a utility file based on your project structure.
export const sortParties = (parties) => {
    return [...parties].sort((a, b) => {
        const priority = { Overdue: 1, Pending: 2, Paid: 3 };
        return priority[a.status] - priority[b.status];
    });
};

export default PartyCard;