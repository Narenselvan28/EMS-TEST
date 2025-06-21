import React, { useState } from 'react';

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

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Header with Back Button */}
            <div className="flex items-center mb-2">
                <button
                    onClick={() => window.history.back()}
                    className="mr-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold text-dark">Add New Party</h2>
            </div>
            <p className="text-gray-600 mb-6">Fill in the party details below</p>

            {/* Form */}
            <form className="bg-white p-6 rounded-lg shadow space-y-8">
                {/* Basic Information */}
                <section>
                    <h3 className="text-xl font-semibold text-primary mb-4 border-b pb-2">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Party Name*</label>
                            <input type="text" required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Party Code*</label>
                            <input type="text" readOnly value="PTY-1001" className="w-full border rounded px-3 py-2 bg-gray-100" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">GST No*</label>
                            <input type="text" required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Broker Name</label>
                            <input type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                    </div>
                </section>

                {/* Contact Information */}
                <section>
                    <h3 className="text-xl font-semibold text-primary mb-4 border-b pb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone/Mobile*</label>
                            <input type="tel" required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Person*</label>
                            <input type="text" required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Person Mobile*</label>
                            <input type="tel" required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                    </div>
                </section>

                {/* Billing Address */}
                <section>
                    <h3 className="text-xl font-semibold text-primary mb-4 border-b pb-2">Billing Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(billingAddress).map(([key, value]) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1')}*</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={value}
                                    onChange={handleBillingChange}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Shipping Address */}
                <section>
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            checked={sameAsBilling}
                            onChange={toggleSameAsBilling}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">Billing address is same for shipping address</label>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-4 border-b pb-2">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(shippingAddress).map(([key, value]) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1')}*</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={value}
                                    onChange={handleShippingChange}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                    disabled={sameAsBilling}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3">
                    <button type="button" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary">
                        Save Party
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPartyForm;
