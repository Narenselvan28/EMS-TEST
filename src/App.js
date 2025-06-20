import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./homepage";
import PartyDues from "./Components/PartyDues";
import Employeeduesmanagements from "./Components/Employeeduesmanagement";
import VendorDuesManagement from "./Components/VendorDuesManagement";
import PartyDueDetails from "./Components/PartyDue Components/PartyDueDetails";
import VendorDueDetails from "./Components/VendorDue Components/VendorDueDetails";
import EmployeeDueDetails from "./Components/Employeeduesmanagement/EmployeeDueDetails";
import PurchaseSale from "./Components/PurchaseSale";

function App() {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div>
            {/* Sticky Navbar - White background, Indigo text */}
            <header className="bg-white sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-indigo-900">ERP System</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-indigo-700 hidden sm:inline">Welcome, Admin</span>
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center font-semibold">
                            A
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile View Blocker */}
            <div className="block md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center px-4">
                <div className="text-center px-6 py-4 bg-red-100 text-red-800 rounded-xl shadow-xl text-lg font-semibold mb-4">
                    Your mobile view is blocked
                </div>
                <button
                    onClick={handleBack}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                >
                    Go Back
                </button>
            </div>

            {/* Routes */}
            <div className="hidden md:block">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/PartyDues" element={<PartyDues />} />
                        <Route path="/employeeduesmanagements" element={<Employeeduesmanagements />} />
                        <Route path="/vendorduesmanagements" element={<VendorDuesManagement />} />
                        <Route path="/party-details" element={<PartyDueDetails />} />
                        <Route path="/vendor-details" element={<VendorDueDetails />} />
                        <Route path="/employee-details" element={<EmployeeDueDetails />} />
                        <Route path="/Purchase&Sales" element={<PurchaseSale />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
