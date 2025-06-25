import React from 'react';

const AdvanceByGroupSection = ({
    advGroupDate,
    setAdvGroupDate,
    advGroupEmployeeCategory,
    setAdvGroupEmployeeCategory,
    advGroupEmployeeGroup,
    setAdvGroupEmployeeGroup,
    advGroupAmount,
    setAdvGroupAmount,
    advGroupRemarks,
    setAdvGroupRemarks,
}) => {
    return (
        <div className={`glass-card p-6 rounded-xl mb-8 section-visible`}>
            <h2 className="text-2xl font-semibold mb-6 gradient-text flex items-center">
                <i className="fas fa-users-cog mr-3"></i> Advance by Group Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="advGroupDate" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-calendar-alt mr-2"></i> Date
                    </label>
                    <input
                        type="date"
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="advGroupDate"
                        value={advGroupDate}
                        onChange={(e) => setAdvGroupDate(e.target.value)}
                    />
                </div>
                <div className="select-wrapper">
                    <label htmlFor="advGroupEmployeeCategory" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-user-tag mr-2"></i> Employee Category
                    </label>
                    <select
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="advGroupEmployeeCategory"
                        value={advGroupEmployeeCategory}
                        onChange={(e) => setAdvGroupEmployeeCategory(e.target.value)}
                    >
                        <option value="">- Select Category -</option>
                        <option>Permanent</option>
                        <option>Contract</option>
                        <option>Intern</option>
                    </select>
                </div>
                <div className="select-wrapper">
                    <label htmlFor="advGroupEmployeeGroup" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-users mr-2"></i> Employee Group
                    </label>
                    <select
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="advGroupEmployeeGroup"
                        value={advGroupEmployeeGroup}
                        onChange={(e) => setAdvGroupEmployeeGroup(e.target.value)}
                    >
                        <option value="">- Select Group -</option>
                        <option>Management</option>
                        <option>Production</option>
                        <option>Sales</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="advGroupAmount" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-coins mr-2"></i> Amount (₹)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="advGroupAmount"
                        placeholder="Enter Amount"
                        value={advGroupAmount}
                        onChange={(e) => setAdvGroupAmount(e.target.value)}
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="advGroupRemarks" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-comment-alt mr-2"></i> Remarks
                    </label>
                    <textarea
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="advGroupRemarks"
                        placeholder="Enter Remarks"
                        value={advGroupRemarks}
                        onChange={(e) => setAdvGroupRemarks(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default AdvanceByGroupSection;