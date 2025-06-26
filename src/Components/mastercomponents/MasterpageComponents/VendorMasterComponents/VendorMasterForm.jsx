import React, { useState } from "react";
import ConfirmModel from "../../../../essentials/ConfirmModel"; // Assuming ConfirmModel.jsx is in the same directory
import ConfirmResetModal from '../../../../essentials/ConfirmResetModel'; // Import the new ConfirmResetModal

export default function VendorMasterForm() {
    const [formData, setFormData] = useState({
        vendorCode: "",
        vendorName: "",
        vendorCategory: "",
        vendorStatus: "active", // Default to active
        contactPerson: "",
        email: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India", // Default to India
        gstin: "",
        pan: "",
        paymentTerms: "",
        bankName: "",
        bankAccountNo: "",
        ifscCode: "",
        notes: "",
    });

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isResetConfirmModalOpen, setIsResetConfirmModalOpen] = useState(false); // New state for reset confirmation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Vendor Data:", formData);
        alert("Vendor Details Submitted Successfully!");
        // Reset form after submission
        setFormData({
            vendorCode: "",
            vendorName: "",
            vendorCategory: "",
            vendorStatus: "active",
            contactPerson: "",
            email: "",
            phone: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "India",
            gstin: "",
            pan: "",
            paymentTerms: "",
            bankName: "",
            bankAccountNo: "",
            ifscCode: "",
            notes: "",
        });
    };

    const handleReset = () => {
        setFormData({
            vendorCode: "",
            vendorName: "",
            vendorCategory: "",
            vendorStatus: "active",
            contactPerson: "",
            email: "",
            phone: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "India",
            gstin: "",
            pan: "",
            paymentTerms: "",
            bankName: "",
            bankAccountNo: "",
            ifscCode: "",
            notes: "",
        });
        setIsResetConfirmModalOpen(false); // Close the reset confirmation modal after reset
    };

    const handleDeleteClick = () => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = () => {
        console.log("Deleting Vendor:", formData.vendorCode);
        alert(`Vendor ${formData.vendorCode} has been deleted.`);
        setIsConfirmModalOpen(false);
        // Optionally reset form or redirect after deletion
        handleReset();
    };

    const handleCancelDelete = () => {
        setIsConfirmModalOpen(false);
    };

    // New functions for reset confirmation
    const handleResetClick = () => {
        setIsResetConfirmModalOpen(true);
    };

    const handleCancelReset = () => {
        setIsResetConfirmModalOpen(false);
    };

    return (
        <div>
            <div className="flex ml-44 mt-10 items-center mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="mr-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Add New Vendor</h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 ml-48">Fill in the vendor details below</p>
            <div className="max-w-6xl mt-10 mx-auto p-6 bg-white rounded-xl shadow-md">
                <div className="max-w-6xl mx-auto">

                    <form onSubmit={handleSubmit}>
                        {/* Basic Information Section */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div>
                                <label htmlFor="vendorCode" className="block text-sm font-medium text-gray-700 mb-1 required-field">Vendor Code</label>
                                <input
                                    type="text"
                                    id="vendorCode"
                                    name="vendorCode"
                                    value={formData.vendorCode}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 vendor-code"
                                    placeholder="VND001"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700 mb-1 required-field">Vendor Name</label>
                                <input
                                    type="text"
                                    id="vendorName"
                                    name="vendorName"
                                    value={formData.vendorName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="ABC Supplies Pvt. Ltd."
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="vendorCategory" className="block text-sm font-medium text-gray-700 mb-1 required-field">Vendor Category</label>
                                <select
                                    id="vendorCategory"
                                    name="vendorCategory"
                                    value={formData.vendorCategory}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="raw_materials">Raw Materials</option>
                                    <option value="finished_goods">Finished Goods</option>
                                    <option value="services_logistics">Logistics Services</option>
                                    <option value="services_maintenance">Maintenance Services</option>
                                    <option value="it_equipment">IT Equipment</option>
                                    <option value="office_supplies">Office Supplies</option>
                                    <option value="consulting">Consulting</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="vendorStatus" className="block text-sm font-medium text-gray-700 mb-1">Vendor Status</label>
                                <select
                                    id="vendorStatus"
                                    name="vendorStatus"
                                    value={formData.vendorStatus}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="on_hold">On Hold</option>
                                    <option value="blacklisted">Blacklisted</option>
                                </select>
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div>
                                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                                <input
                                    type="text"
                                    id="contactPerson"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="info@abcsupplies.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                        </div>

                        {/* Address Information Section */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Address Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="md:col-span-2">
                                <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                                <input
                                    type="text"
                                    id="addressLine1"
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="123, Main Road"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                                <input
                                    type="text"
                                    id="addressLine2"
                                    name="addressLine2"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="Near City Center"
                                />
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="Mumbai"
                                />
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="Maharashtra"
                                />
                            </div>

                            <div>
                                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="400001"
                                />
                            </div>

                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1 required-field">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Tax & Legal Information Section */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            Tax & Legal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div>
                                <label htmlFor="gstin" className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
                                <input
                                    type="text"
                                    id="gstin"
                                    name="gstin"
                                    value={formData.gstin}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="27AAAAA1234A1Z5"
                                />
                            </div>

                            <div>
                                <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1">PAN</label>
                                <input
                                    type="text"
                                    id="pan"
                                    name="pan"
                                    value={formData.pan}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="ABCDE1234F"
                                />
                            </div>
                        </div>

                        {/* Payment Information Section */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                            Payment Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div>
                                <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                                <select
                                    id="paymentTerms"
                                    name="paymentTerms"
                                    value={formData.paymentTerms}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                >
                                    <option value="">Select Terms</option>
                                    <option value="net_30">Net 30 Days</option>
                                    <option value="net_60">Net 60 Days</option>
                                    <option value="due_on_receipt">Due on Receipt</option>
                                    <option value="advance_payment">Advance Payment</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                <input
                                    type="text"
                                    id="bankName"
                                    name="bankName"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="State Bank of India"
                                />
                            </div>

                            <div>
                                <label htmlFor="bankAccountNo" className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
                                <input
                                    type="text"
                                    id="bankAccountNo"
                                    name="bankAccountNo"
                                    value={formData.bankAccountNo}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="123456789012"
                                />
                            </div>

                            <div>
                                <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                                <input
                                    type="text"
                                    id="ifscCode"
                                    name="ifscCode"
                                    value={formData.ifscCode}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="SBIN0000001"
                                />
                            </div>
                        </div>

                        {/* Additional Information Section */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Additional Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="md:col-span-2">
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes & Remarks</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows="4"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    placeholder="Contract terms, special agreements, or other important notes..."
                                ></textarea>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleDeleteClick}
                                className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                            >
                                Delete Vendor
                            </button>
                            <button
                                type="button" // Changed to type="button" to prevent form submission directly
                                onClick={handleResetClick} // Call the new handler for reset confirmation
                                className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Reset Form
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Save Vendor Details
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModel
                isOpen={isConfirmModalOpen}
                title="Confirm Deletion"
                message={`Are you sure you want to delete vendor "${formData.vendorName}" (${formData.vendorCode})? This action cannot be undone.`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            {/* Reset Confirmation Modal */}
            <ConfirmResetModal
                isOpen={isResetConfirmModalOpen}
                onConfirm={handleReset} // Pass handleReset to onConfirm of the reset modal
                onCancel={handleCancelReset}
            />
        </div>
    );
}