import React, { useState } from 'react';
import ConfirmModel from '../../../../../essentials/ConfirmModel';

const AddPartyForm = () => {
    const [sameAsBilling, setSameAsBilling] = useState(false);
    const [billingAddress, setBillingAddress] = useState({
        building: '',
        street: '',
        village: '',
        taluk: '',
        district: '',
        state: '',
        pin: ''
    });
    const [shippingAddress, setShippingAddress] = useState({
        building: '',
        street: '',
        village: '',
        taluk: '',
        district: '',
        state: '',
        pin: ''
    });

    // State for the confirmation modal
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

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

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingAddress({ ...billingAddress, [name]: value });
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value });
    };

    const toggleSameAsBilling = () => {
        const newValue = !sameAsBilling;
        setSameAsBilling(newValue);
        if (newValue) setShippingAddress(billingAddress);
    };

    // --- Modal Handler Functions ---
    const handleConfirmCancel = () => {
        console.log("Party creation cancelled!");
        window.history.back();
        setShowCancelConfirm(false);
    };

    const handleCloseCancelModal = () => {
        setShowCancelConfirm(false);
    };

    const openCancelConfirmModal = () => {
        setShowCancelConfirm(true);
    };

    // Format label text (convert camelCase to Title Case)
    const formatLabel = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace('Pin', 'PIN');
    };

    // Get placeholder text for address fields
    const getPlaceholder = (fieldName) => {
        const placeholders = {
            building: 'Enter building name/number',
            street: 'Enter street name',
            village: 'Enter village/town name',
            taluk: 'Enter taluk name',
            district: 'Enter district name',
            state: 'Enter state name',
            pin: 'Enter PIN code'
        };
        return placeholders[fieldName] || '';
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 font-sans">
            {/* Header with Back Button */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="mr-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none transition-colors"
                    style={{ color: colors.primary }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <div>
                    <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Add New Party</h2>
                    <p className="text-sm" style={{ color: colors.textLight }}>Fill in the party details below</p>
                </div>
            </div>

            {/* Form */}
            <form className="bg-white p-6 rounded-xl shadow-sm space-y-8" style={{ borderColor: colors.border, borderWidth: '1px' }}>
                {/* Basic Information */}
                <section>
                    <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg text-white mr-3" style={{ backgroundColor: colors.primary }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold" style={{ color: colors.primaryDark }}>Basic Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Party Name*</label>
                            <input 
                                type="text" 
                                required 
                                placeholder="Enter party name"
                                className="w-full rounded-lg px-4 py-3 focus:outline-none transition border placeholder-gray-400"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: colors.background,
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Party Code*</label>
                            <input 
                                type="text" 
                                readOnly 
                                value="PTY-1001" 
                                className="w-full rounded-lg px-4 py-3 border cursor-not-allowed"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: '#EDF2F7',
                                    color: colors.textLight
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>GST No*</label>
                            <input 
                                type="text" 
                                required 
                                placeholder="Enter GST number"
                                className="w-full rounded-lg px-4 py-3 focus:outline-none transition border placeholder-gray-400"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: colors.background,
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Broker Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter broker name (if applicable)"
                                className="w-full rounded-lg px-4 py-3 focus:outline-none transition border placeholder-gray-400"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: colors.background,
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Information */}
                <section>
                    <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg text-white mr-3" style={{ backgroundColor: colors.primary }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold" style={{ color: colors.primaryDark }}>Contact Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Phone/Mobile*</label>
                            <input 
                                type="tel" 
                                required 
                                placeholder="Enter phone number"
                                className="w-full rounded-lg px-4 py-3 focus:outline-none transition border placeholder-gray-400"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: colors.background,
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Contact Person*</label>
                            <input 
                                type="text" 
                                required 
                                placeholder="Enter contact person name"
                                className="w-full rounded-lg px-4 py-3 focus:outline-none transition border placeholder-gray-400"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: colors.background,
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Contact Person Mobile*</label>
                            <input 
                                type="tel" 
                                required 
                                placeholder="Enter contact person mobile number"
                                className="w-full rounded-lg px-4 py-3 focus:outline-none transition border placeholder-gray-400"
                                style={{
                                    borderColor: colors.border,
                                    backgroundColor: colors.background,
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Billing Address */}
                <section>
                    <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg text-white mr-3" style={{ backgroundColor: colors.primary }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold" style={{ color: colors.primaryDark }}>Billing Address</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {Object.keys(billingAddress).map((key) => (
                            <div key={key}>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>{formatLabel(key)}*</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={billingAddress[key]}
                                    onChange={handleBillingChange}
                                    placeholder={getPlaceholder(key)}
                                    className="w-full rounded-lg px-4 py-3 focus:outline-none transition border placeholder-gray-400"
                                    style={{
                                        borderColor: colors.border,
                                        backgroundColor: colors.background,
                                    }}
                                    required
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Shipping Address */}
                <section>
                    <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg text-white mr-3" style={{ backgroundColor: colors.primary }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryDark }}>Shipping Address</h3>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="sameAsBilling"
                                    checked={sameAsBilling}
                                    onChange={toggleSameAsBilling}
                                    className="h-4 w-4 rounded focus:ring-0"
                                    style={{ 
                                        color: colors.primary,
                                        borderColor: colors.border
                                    }}
                                />
                                <label htmlFor="sameAsBilling" className="ml-2 text-sm cursor-pointer" style={{ color: colors.text }}>
                                    Same as billing address
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {Object.keys(shippingAddress).map((key) => (
                            <div key={key}>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>{formatLabel(key)}*</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={shippingAddress[key]}
                                    onChange={handleShippingChange}
                                    placeholder={sameAsBilling ? "Same as billing address" : getPlaceholder(key)}
                                    className="w-full rounded-lg px-4 py-3 focus:outline-none transition border placeholder-gray-400"
                                    style={{
                                        borderColor: colors.border,
                                        backgroundColor: sameAsBilling ? '#EDF2F7' : colors.background,
                                    }}
                                    required
                                    disabled={sameAsBilling}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t" style={{ borderColor: colors.border }}>
                    <button
                        type="button"
                        onClick={openCancelConfirmModal}
                        className="px-5 py-2.5 rounded-lg transition font-medium border"
                        style={{ 
                            borderColor: colors.border,
                            color: colors.text,
                        }}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="px-5 py-2.5 text-white rounded-lg transition font-medium shadow-sm"
                        style={{ 
                            backgroundColor: colors.primary,
                        }}
                    >
                        Save Party
                    </button>
                </div>
            </form>

            {/* Confirmation Modal for Cancel */}
            <ConfirmModel
                isOpen={showCancelConfirm}
                title="Confirm Cancellation"
                message="Are you sure you want to cancel? Any unsaved changes will be lost."
                onConfirm={handleConfirmCancel}
                onCancel={handleCloseCancelModal}
            />
        </div>
    );
};

export default AddPartyForm;