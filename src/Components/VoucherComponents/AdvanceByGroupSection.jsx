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
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold  mb-6  flex items-center">
                <i className="fas fa-users-cog text-indigo-600 mr-3 text-xl"></i>
                Advance by Group Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Input */}
                <div>
                    <label
                        htmlFor="advGroupDate"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        <i className="fas fa-calendar-alt mr-2 text-indigo-500"></i>
                        Date
                    </label>
                    <input
                        type="date"
                        id="advGroupDate"
                        value={advGroupDate}
                        onChange={(e) => setAdvGroupDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Employee Category */}
                <div>
                    <label
                        htmlFor="advGroupEmployeeCategory"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        <i className="fas fa-user-tag mr-2 text-indigo-500"></i>
                        Employee Category
                    </label>
                    <select
                        id="advGroupEmployeeCategory"
                        value={advGroupEmployeeCategory}
                        onChange={(e) => setAdvGroupEmployeeCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">— Select Category —</option>
                        <option>Permanent</option>
                        <option>Contract</option>
                        <option>Intern</option>
                    </select>
                </div>

                {/* Employee Group */}
                <div>
                    <label
                        htmlFor="advGroupEmployeeGroup"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        <i className="fas fa-users mr-2 text-indigo-500"></i>
                        Employee Group
                    </label>
                    <select
                        id="advGroupEmployeeGroup"
                        value={advGroupEmployeeGroup}
                        onChange={(e) => setAdvGroupEmployeeGroup(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">— Select Group —</option>
                        <option>Management</option>
                        <option>Production</option>
                        <option>Sales</option>
                    </select>
                </div>

                {/* Amount Input */}
                <div>
                    <label
                        htmlFor="advGroupAmount"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        <i className="fas fa-coins mr-2 text-indigo-500"></i>
                        Amount (₹)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        id="advGroupAmount"
                        value={advGroupAmount}
                        onChange={(e) => setAdvGroupAmount(e.target.value)}
                        placeholder="Enter advance amount"
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Remarks */}
                <div className="md:col-span-2">
                    <label
                        htmlFor="advGroupRemarks"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        <i className="fas fa-comment-alt mr-2 text-indigo-500"></i>
                        Remarks
                    </label>
                    <textarea
                        id="advGroupRemarks"
                        rows="3"
                        value={advGroupRemarks}
                        onChange={(e) => setAdvGroupRemarks(e.target.value)}
                        placeholder="Add any remarks..."
                        className="w-full px-3 py-2 border rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default AdvanceByGroupSection;
