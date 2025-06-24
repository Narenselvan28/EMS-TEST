import React from 'react';

const Summary = ({ total1, total2 }) => {
    return (
        <div className="card bg-white p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
                <div>1st Table Total: ₹{total1.toFixed(2)}</div>
                <div>2nd Table Total: ₹{total2.toFixed(2)}</div>
                <div>Total Salary: ₹{(total1 + total2).toFixed(2)}</div>
            </div>
        </div>
    );
};

export default Summary;
