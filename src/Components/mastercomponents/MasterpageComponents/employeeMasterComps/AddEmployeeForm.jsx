import React, { useState } from "react";
import ConfirmModel from "../../../../essentials/ConfirmModel"; // ✅ adjust the path as per your project structure

export default function AddEmployeeForm() {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    window.history.back(); // go back on confirmation
  };

  return (
    <div className="min-h-screen font-poppins bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button and Heading */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="mr-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-dark">Add New Employee</h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">Please fill in all required employee details below.</p>

        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Info */}
            <SectionTitle title="Personal Information" />
            <Input label="First Name*" id="firstName" type="text" />
            <Input label="Last Name*" id="lastName" type="text" />
            <Input label="Date of Birth*" id="dob" type="date" />
            <Select label="Gender*" id="gender" options={["Male", "Female", "Other"]} />
            <Input label="Phone Number*" id="phone" type="tel" />
            <Select label="Address*" id="address" options={["Kinathukkadavu", "Kerala", "Kangeyam", "Trippur"]} />

            {/* Employment Info */}
            <SectionTitle title="Employment Information" />
            <Input label="Employee ID*" id="employeeId" type="text" defaultValue="EMP-1004" readOnly />
            <Input label="Join Date*" id="joinDate" type="date" />
            <Select label="Category*" id="category" options={["HR", "Finance", "IT", "Operations", "Marketing", "Sales"]} />
            <Select label="Special Category*" id="category" options={["HR", "Finance", "IT", "Operations", "Marketing", "Sales"]} />

            <Select label="Group*" id="group" options={["Group 1", "Group 2", "Group 3"]} />
            <Select label="Special Group*" id="group" options={["Group 1", "Group 2", "Group 3"]} />

            <Select label="Status*" id="status" options={["Active", "Probation", "Inactive"]} />
            {/* Removed the first duplicate "Due Type" Select component */}

            <Select label="Work Location*" id="workLocation" options={["Head Office", "Branch 1", "Branch 2", "Remote"]} />
            <Select label="Due Type" id="dueType" options={["Debit", "Credit"]} /> {/* This one remains, changed id to dueType for clarity */}
            <div>
              <label htmlFor="dueAmount" className="block text-sm font-medium text-gray-700 mb-1"> {/* Changed htmlFor to dueAmount */}
                Due Amount*
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">₹</span>
                <input
                  id="dueAmount" // Changed id to dueAmount
                  type="number"
                  placeholder="0.00"
                  className="pl-7 pr-20 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <select className="absolute right-2 top-2 text-sm text-gray-600 bg-transparent">
                  <option>INR</option>
                  <option>USD</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="col-span-2 flex justify-end mt-8 space-x-4">
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-secondary hover:scale-[1.02] transition duration-200"
              >
                Save Employee
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}

        {/* Confirm Cancel Modal */}
        <ConfirmModel
          isOpen={showCancelModal}
          title="Cancel Adding Employee?"
          message="All unsaved changes will be lost. Do you really want to cancel?"
          onConfirm={handleCancelConfirm}
          onCancel={() => setShowCancelModal(false)}
        />
      </div>
    </div>
  );
}

// Components
function SectionTitle({ title }) {
  return (
    <div className="col-span-2">
      <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-200 pb-1 mt-8">
        {title}
      </h3>
    </div>
  );
}

function Input({ label, id, type, defaultValue = "", readOnly = false }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        readOnly={readOnly}
        required
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
    </div>
  );
}

function Select({ label, id, options }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        required
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
      >
        <option value="">Select {label.replace("*", "")}</option>
        {options.map((option, i) => (
          <option key={i} value={option.toLowerCase()}>{option}</option>
        ))}
      </select>
    </div>
  );
}