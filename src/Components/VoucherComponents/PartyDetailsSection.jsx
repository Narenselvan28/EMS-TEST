import React from 'react';
import ExistingDuesTable from './ExistingDuesTable';

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
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-indigo-500 flex items-center">
                <i className="fas fa-handshake text-indigo-600 mr-3 text-xl"></i>
                Party Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Date */}
                <div>
                    <label htmlFor="partyDate" className="block mb-2 text-sm font-medium text-gray-700">
                        <i className="fas fa-calendar-alt mr-2 text-indigo-500"></i>
                        Date
                    </label>
                    <input
                        type="date"
                        id="partyDate"
                        value={partyDate}
                        onChange={(e) => setPartyDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Party Name */}
                <div>
                    <label htmlFor="partyName" className="block mb-2  text-sm font-medium text-gray-700">
                        <i className="fas fa-user-tie mr-2 text-indigo-500 "></i>
                        Party Name
                    </label>
                    <select
                        id="partyName"
                        value={partyName}
                        onChange={(e) => setPartyName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">— Select Party —</option>
                        <option>Ems Cocos</option>
                        <option>APA Rasu</option>
                        <option>Anand SOK</option>
                        <option>Mohan</option>
                        <option>Naveen</option>
                    </select>
                </div>

                {/* Transaction Method */}
                <div>
                    <label htmlFor="transactionMethod" className="block mb-2 text-sm font-medium text-gray-700">
                        <i className="fas fa-exchange-alt mr-2 text-indigo-500"></i>
                        Transaction Method
                    </label>
                    <select
                        id="transactionMethod"
                        value={transactionMethod}
                        onChange={(e) => setTransactionMethod(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">— Select Method —</option>
                        <option>Account</option>
                        <option>Cash</option>
                        <option>Others</option>
                    </select>
                </div>

                {/* Payout Amount */}
                <div>
                    <label htmlFor="payoutAmount" className="block mb-2 text-sm font-medium text-gray-700">
                        <i className="fas fa-dollar-sign mr-2 text-indigo-500"></i>
                        Payout Amount (₹)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        id="payoutAmount"
                        placeholder="Enter payout amount"
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Nafed Checkbox */}
                <div className="flex items-center gap-2 mt-8">
                    <input
                        type="checkbox"
                        id="nafedCheckbox"
                        className="hidden peer"
                        checked={nafedCheckbox}
                        onChange={(e) => setNafedCheckbox(e.target.checked)}
                    />
                    <label
                        htmlFor="nafedCheckbox"
                        className="w-6 h-6 flex items-center justify-center bg-white border-2 border-indigo-500 rounded-md cursor-pointer peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition duration-200 text-white text-xs font-bold"
                    >
                        <span className="peer-checked:inline hidden">✔</span>
                    </label>
                    <span className="text-xl text-gray-700 font-medium">
                        <i className="fas fa-check-circle text-indigo-500 mr-1"></i> Nafed
                    </span>
                </div>

            </div>

            {/* Existing Dues */}
            <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                <i className="fas fa-file-invoice-dollar text-indigo-600 mr-2 text-lg"></i>
                Existing Dues
            </h3>
            <ExistingDuesTable existingDues={existingDues} setExistingDues={setExistingDues} />
        </div>
    );
};

export default PartyDetailsSection;
