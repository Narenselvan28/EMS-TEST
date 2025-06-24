import React from 'react';

const AdvanceByGroupSection = () => {
    return (
        <div id="advanceByGroupSection" className="glass-card p-6 rounded-xl mb-6 section-hidden">
            <h2 className="text-2xl font-semibold mb-4 gradient-text flex items-center">
                <i className="fas fa-users-cog mr-3"></i> Advance by Group Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="advGroupDate" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-calendar-alt mr-2"></i> Date
                    </label>
                    <input type="date" className="w-full glass-panel focus:ring-2 focus:ring-indigo-200" id="advGroupDate" />
                </div>
                {/* ... other form fields ... */}
            </div>
        </div>
    );
};

export default AdvanceByGroupSection;