import React from 'react';

const FooterActions = () => {
    return (
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button className="btn-primary px-8 py-4 rounded-xl text-base font-medium">
                <i className="fas fa-save mr-2"></i> Save Voucher
            </button>
            <button className="btn-danger px-8 py-4 rounded-xl text-base font-medium">
                <i className="fas fa-redo mr-2"></i> Reset Form
            </button>
        </div>
    );
};

export default FooterActions;