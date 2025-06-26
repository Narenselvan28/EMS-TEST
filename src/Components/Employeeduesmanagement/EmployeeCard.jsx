import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForwardLoading from '../../essentials/ForwardLoading'; // ✅ Adjust path accordingly

const EmployeeCard = ({ due }) => {
    const { id, name, department, type, amount, date, status } = due;
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'paid': return 'hidden';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'overdue': return 'bg-red-100 text-red-800';
            case 'partial': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handlenavigate = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate('/employee-details');
        }, 800);
    };

    if (isLoading) return <ForwardLoading />;

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                        <p className="text-sm text-gray-500">{id}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(status)}`}>
                        {status}
                    </span>
                </div>
                <div className="mt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Department</span>
                        <span className="font-medium">{department}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Due Type</span>
                        <span className="font-medium">{type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Amount</span>
                        <span className="font-medium">{amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Due Date</span>
                        <span className="font-medium">{date}</span>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-3">
                {status.toLowerCase() === 'overdue' && (
                    <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                        Send Reminder
                    </button>
                )}
                <button onClick={handlenavigate} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default EmployeeCard;
