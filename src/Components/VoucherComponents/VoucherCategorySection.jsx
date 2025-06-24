import React from 'react';
import Loader from './Loader';
import SalarySection from './SalarySelection';
import AdvanceByGroupSection from './AdvanceByGroupSection';
import AdvanceByIndividualSection from './AdvancebyIndividualSection';
import PartySection from './PartySelection';
import VendorSection from './VendorSection';
import OtherCategoriesSection from './OtherCategoriesSection';
const VoucherCategorySection = () => {
    return (
        <>
            <Loader id="generalLoader" className="hidden" />

            <SalarySection />
            <AdvanceByGroupSection />
            <AdvanceByIndividualSection />
            <PartySection />
            <VendorSection />
            <OtherCategoriesSection />
        </>
    );
};

export default VoucherCategorySection;