import React, { useState } from 'react';

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
  // Color definitions based on #3182CE
  const colors = {
    primary: '#3182CE',
    primaryLight: '#EBF5FF',
    primaryDark: '#2C5282',
    border: '#E2E8F0',
    text: '#2D3748',
    textLight: '#4A5568',
    background: '#F7FAFC'
  };

  // Party options for the dropdown
  const partyOptions = [
    { value: '', label: '— Select Party —', disabled: true },
    { value: 'Ems Cocos', label: 'Ems Cocos' },
    { value: 'APA Rasu', label: 'APA Rasu' },
    { value: 'Anand SOK', label: 'Anand SOK' },
    { value: 'Mohan', label: 'Mohan' },
    { value: 'Naveen', label: 'Naveen' }
  ];

  // Transaction method options
  const transactionOptions = [
    { value: '', label: '— Select Method —', disabled: true },
    { value: 'Account', label: 'Account' },
    { value: 'Cash', label: 'Cash' },
    { value: 'Others', label: 'Others' }
  ];

  // Sample existing dues data
  const [dues, setDues] = useState([
    { id: 1, date: '12/05/2023', description: 'Product Purchase', amount: '₹15,250.00', status: 'Pending' },
    { id: 2, date: '28/04/2023', description: 'Service Charge', amount: '₹5,500.00', status: 'Paid' }
  ]);

  return (
    <div className="min-h-screen font-poppins bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button and Heading */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="mr-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ color: colors.primary }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Party Details</h2>
        </div>

        {/* Description */}
        <p className="mb-6" style={{ color: colors.textLight }}>Enter party information and transaction details</p>

        {/* Party Details Card */}
        <div className="bg-white rounded-xl p-8 mb-8" style={{ borderColor: colors.border, borderWidth: '1px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
          {/* Header */}
          <div className="flex items-center mb-6 pb-4" style={{ borderBottomColor: colors.border, borderBottomWidth: '1px' }}>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg text-white mr-3" style={{ backgroundColor: colors.primary }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold" style={{ color: colors.primaryDark }}>Party Details</h2>
              <p className="text-xs" style={{ color: colors.textLight }}>Enter party information and transaction details</p>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Date Field */}
            <div>
              <label htmlFor="partyDate" className="flex items-center text-sm font-medium mb-1" style={{ color: colors.text }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Date
              </label>
              <input
                type="date"
                id="partyDate"
                value={partyDate}
                onChange={(e) => setPartyDate(e.target.value)}
                className="w-full rounded-lg px-3 py-2.5 focus:outline-none transition"
                style={{ 
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                  focusRingColor: colors.primary
                }}
                required
              />
            </div>

            {/* Party Name Field */}
            <div>
              <label htmlFor="partyName" className="flex items-center text-sm font-medium mb-1" style={{ color: colors.text }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Party Name
              </label>
              <select
                id="partyName"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                className="w-full rounded-lg px-3 py-2.5 focus:outline-none transition appearance-none"
                style={{ 
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                  focusRingColor: colors.primary,
                  color: partyName ? colors.text : colors.textLight
                }}
                required
              >
                {partyOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    style={{ color: option.disabled ? colors.textLight : colors.text }}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Transaction Method Field */}
            <div>
              <label htmlFor="transactionMethod" className="flex items-center text-sm font-medium mb-1" style={{ color: colors.text }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Transaction Method
              </label>
              <select
                id="transactionMethod"
                value={transactionMethod}
                onChange={(e) => setTransactionMethod(e.target.value)}
                className="w-full rounded-lg px-3 py-2.5 focus:outline-none transition appearance-none"
                style={{ 
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                  focusRingColor: colors.primary,
                  color: transactionMethod ? colors.text : colors.textLight
                }}
                required
              >
                {transactionOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    style={{ color: option.disabled ? colors.textLight : colors.text }}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Payout Amount Field */}
            <div>
              <label htmlFor="payoutAmount" className="flex items-center text-sm font-medium mb-1" style={{ color: colors.text }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Payout Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm" style={{ color: colors.textLight }}>
                  ₹
                </span>
                <input
                  type="number"
                  step="0.01"
                  id="payoutAmount"
                  placeholder="0.00"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-lg focus:outline-none transition"
                  style={{ 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    focusRingColor: colors.primary
                  }}
                  required
                />
              </div>
            </div>

            {/* Nafed Checkbox */}
            <div className="flex items-end space-x-3">
              <input
                type="checkbox"
                id="nafedCheckbox"
                className="hidden peer"
                checked={nafedCheckbox}
                onChange={(e) => setNafedCheckbox(e.target.checked)}
              />
              <label
                htmlFor="nafedCheckbox"
                className="relative w-12 h-6 flex items-center flex-shrink-0 rounded-full p-1 transition duration-200 ease-in-out cursor-pointer"
                style={{
                  backgroundColor: nafedCheckbox ? colors.primary : colors.border
                }}
              >
                <span
                  className="bg-white w-4 h-4 rounded-full shadow-md transform transition duration-200 ease-in-out"
                  style={{
                    transform: nafedCheckbox ? 'translateX(1.5rem)' : 'translateX(0)'
                  }}
                />
              </label>
              <div>
                <label htmlFor="nafedCheckbox" className="block text-sm font-medium cursor-pointer" style={{ color: colors.text }}>
                  Nafed
                </label>
                <p className="text-xs" style={{ color: colors.textLight }}>
                  Check if this is a Nafed transaction
                </p>
              </div>
            </div>
          </div>

          {/* Existing Dues Section */}
          <div className="mt-8 pt-6" style={{ borderTopColor: colors.border, borderTopWidth: '1px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center" style={{ color: colors.primaryDark }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Existing Dues
              </h3>
              <button 
                className="text-xs px-3 py-1 rounded-md flex items-center transition-colors duration-150"
                style={{
                  backgroundColor: colors.primaryLight,
                  color: colors.primaryDark
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Due
              </button>
            </div>

            {/* Dues Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textLight }}>Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textLight }}>Description</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textLight }}>Amount (₹)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textLight }}>Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textLight }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dues.map((due) => (
                    <tr key={due.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.textLight }}>{due.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>{due.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>{due.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          due.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {due.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.textLight }}>
                        <button className="mr-2" style={{ color: colors.primary }}>Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-8 mt-8" style={{ borderTopColor: colors.border, borderTopWidth: '1px' }}>
            <button
              type="button"
              className="px-5 py-2 rounded-lg transition"
              style={{ 
                borderColor: colors.border,
                borderWidth: '1px',
                color: colors.text,
                hoverBgColor: colors.background
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white rounded-lg shadow-sm transition"
              style={{ 
                backgroundColor: colors.primary,
                hoverBgColor: colors.primaryDark
              }}
            >
              Save Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyDetailsSection;