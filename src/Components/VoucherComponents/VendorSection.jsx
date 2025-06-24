import React from 'react';
import TripsheetEntrySection from './TripSheetEntrySection';
const VendorSection = () => {
    return (
        <div id="vendorSection" className="glass-card p-6 rounded-xl mb-6 section-hidden">
            <h2 className="text-2xl font-semibold mb-4 gradient-text flex items-center">
                <i className="fas fa-store-alt mr-3"></i> Vendor Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Vendor form fields */}
            </div>

            <TripsheetEntrySection />

            <div className="flex justify-end mt-6">
                <button className="btn-primary px-6 py-3 rounded-lg text-base">
                    <i className="fas fa-save mr-2"></i> Save Vendor Voucher
                </button>
            </div>
        </div>
    );
};

export default VendorSection;