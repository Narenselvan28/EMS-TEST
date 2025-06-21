import React from "react";

export default function AddItemForm() {
  return (
    <div className="min-h-screen font-poppins bg-gray-50 py-10 px-6">
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
          <h2 className="text-2xl font-bold text-dark">Add New Item</h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">Fill in the item details below</p>

        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-xl p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Item Code*" id="itemCode" type="text" defaultValue="ITEM-1004" readOnly />
            <Input label="Item Name*" id="itemName" type="text" />
            <Input label="HSN Code*" id="hsnCode" type="text" />
            <Select label="Category*" id="category" options={["Raw Materials", "Finished Goods", "Consumables", "Spares"]} />
            <Select label="Group*" id="group" options={["Group 1", "Group 2", "Group 3"]} />
            <Select label="Item Status*" id="status" options={["Active", "Inactive"]} />

            <div>
              <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Unit Price*
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  id="unitPrice"
                  placeholder="0.00"
                  className="pl-7 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <Select label="Storage Location*" id="location" options={["Warehouse 1", "Warehouse 2", "Showroom"]} />

            {/* Buttons */}
            <div className="col-span-2 flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-5 py-2 border text-gray-700 rounded-md hover:bg-gray-100 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-md shadow hover:bg-secondary transform hover:-translate-y-0.5 transition duration-200"
              >
                Save Item
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
      
      </div>
    </div>
  );
}

// Reusable Input Component
function Input({ label, id, type, defaultValue = "", readOnly = false }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        defaultValue={defaultValue}
        readOnly={readOnly}
        className={`w-full border border-gray-300 rounded-md px-3 py-2 ${readOnly ? "bg-gray-100" : ""
          } focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
      />
    </div>
  );
}

// Reusable Select Component
function Select({ label, id, options }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        required
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      >
        <option value="">Select {label.replace("*", "")}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.toLowerCase()}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
