import React from 'react';
import ExistingDuesTable from './ExistingDuesTable'; // Import the new component

const PartyDetailsSection = ({
    partyDate,
    setPartyDate,
    partyName,
    setPartyName,
    transactionMethod,
    setTransactionMethod,
    payoutAmount,
    setPayoutAmount,
    nafedCheckbox,
    setNafedCheckbox,
    existingDues,
    setExistingDues,
}) => {
    return (
        <div className={`glass-card p-6 rounded-xl mb-8 section-visible`}>
            <h2 className="text-2xl font-semibold mb-6 gradient-text flex items-center">
                <i className="fas fa-handshake mr-3"></i> Party Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div>
                    <label htmlFor="partyDate" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-calendar-alt mr-2"></i> Date
                    </label>
                    <input
                        type="date"
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="partyDate"
                        value={partyDate}
                        onChange={(e) => setPartyDate(e.target.value)}
                    />
                </div>
                <div className="select-wrapper">
                    <label htmlFor="partyName" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-user-tie mr-2"></i> Party Name
                    </label>
                    <select
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="partyName"
                        value={partyName}
                        onChange={(e) => setPartyName(e.target.value)}
                    >
                        <option value="">- Select Party -</option>
                        <option>Ems Cocos</option>
                        <option>APA Rasu</option>
                        <option>Anand SOK</option>
                        <option>Mohan</option>
                        <option>Naveen</option>
                    </select>
                </div>
                <div className="select-wrapper">
                    <label htmlFor="transactionMethod" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-exchange-alt mr-2"></i> Transaction Method
                    </label>
                    <select
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="transactionMethod"
                        value={transactionMethod}
                        onChange={(e) => setTransactionMethod(e.target.value)}
                    >
                        <option value="">- Select Method -</option>
                        <option>Account</option>
                        <option>Cash</option>
                        <option>Others</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="payoutAmount" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-dollar-sign mr-2"></i> Payout Amount (₹)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="payoutAmount"
                        placeholder="Enter Payout Amount"
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(e.target.value)}
                    />
                </div>
                <div className="flex items-center mt-6">
                    <input
                        type="checkbox"
                        id="nafedCheckbox"
                        className="form-checkbox h-5 w-5 text-indigo-600 no-enter-tab"
                        checked={nafedCheckbox}
                        onChange={(e) => setNafedCheckbox(e.target.checked)}
                    />
                    <label htmlFor="nafedCheckbox" className="ml-2 block text-gray-700 font-medium">
                        <i className="fas fa-check-circle mr-1"></i> Nafed
                    </label>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                <i className="fas fa-file-invoice-dollar mr-2"></i> Existing Dues
            </h3>
            <ExistingDuesTable
                existingDues={existingDues}
                setExistingDues={setExistingDues}
            />
        </div>
    );
};

export default PartyDetailsSection;