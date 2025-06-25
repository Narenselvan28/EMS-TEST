import React from "react";
import { Routes, Route } from "react-router-dom";

// Page components
import Homepage from "./homepage";
import MastersPage from "./Components/pages/masters";
import DuesPage from "./Components/pages/DuesManagement";
import PurchaseSale from "./Components/pages/PurchaseSale";
import SettingsPage from "./settings/SettingsMainPage";
import VoucherEntryLayout from "./Components/pages/Vouchers";

// Master pages
import PartyMasterPage from "./Components/mastercomponents/PartyMasters";
import ItemMaster from "./Components/mastercomponents/ItemMaster";
import EmployeeMaster from "./Components/mastercomponents/EmployeeMaster";
import VendorMaster from "./Components/mastercomponents/VendorMaster";
import VehicleMaster from "./Components/mastercomponents/VehicleMaster";

// Form components
import AddPartyForm from "./Components/mastercomponents/MasterpageComponents/PartyMasterComponents/PartyMasterComponents/AddPartyForm";
import AddItemForm from "./Components/mastercomponents/MasterpageComponents/ItemMasterComponents/AddItemForm";
import AddEmployeeForm from "./Components/mastercomponents/MasterpageComponents/employeeMasterComps/AddEmployeeForm";
import VehicleMasterForm from "./Components/mastercomponents/MasterpageComponents/VehicleMasterComponents/VehicleMasterForm";
import VendorMasterForm from "./Components/mastercomponents/MasterpageComponents/VendorMasterComponents/VendorMasterForm";

// Due Details
import PartyDueDetails from "./Components/PartyDue Components/PartyDueDetails";
import VendorDueDetails from "./Components/VendorDue Components/VendorDueDetails";
import EmployeeDueDetails from "./Components/Employeeduesmanagement/EmployeeDueDetails";

// Due management pages
import PartyDues from "./Components/pages/PartyDues";
import Employeeduesmanagements from "./Components/pages/Employeeduesmanagement";
import VendorDuesManagement from "./Components/pages/VendorDuesManagement";
import InventoryDashboard from "./Components/pages/Inventory";

function App() {
    const handleBack = () => {
        window.history.back();
    };

    const routes = [
        { path: "/", element: <Homepage /> },
        { path: "/masters", element: <MastersPage /> },
        { path: "/duesmanagement", element: <DuesPage /> },
        { path: "/Purchase&Sales", element: <PurchaseSale /> },
        { path: "/settings", element: <SettingsPage /> },
        { path: "/vouchers", element: <VoucherEntryLayout /> },
        { path: "/inventory", element: <InventoryDashboard /> },


        // Master Sections
        { path: "/masters/party", element: <PartyMasterPage /> },
        { path: "/masters/item", element: <ItemMaster /> },
        { path: "/masters/employee", element: <EmployeeMaster /> },
        { path: "/masters/vendor", element: <VendorMaster /> },
        { path: "/masters/vehicle", element: <VehicleMaster /> },

        // Add Forms
        { path: "/masters/party/addparty", element: <AddPartyForm /> },
        { path: "/masters/item/additem", element: <AddItemForm /> },
        { path: "/masters/employee/addemployee", element: <AddEmployeeForm /> },
        { path: "/masters/vendor/addvendor", element: <VendorMasterForm /> },
        { path: "/masters/vehicle/addvehicle", element: <VehicleMasterForm /> },

        // Due Details
        { path: "/party-details", element: <PartyDueDetails /> },
        { path: "/vendor-details", element: <VendorDueDetails /> },
        { path: "/employee-details", element: <EmployeeDueDetails /> },

        // Due Management
        { path: "/duesmanagement/partyduesmanagement", element: <PartyDues /> },
        { path: "/duesmanagement/employeeduesmanagement", element: <Employeeduesmanagements /> },
        { path: "/duesmanagement/vendorduesmanagement", element: <VendorDuesManagement /> },
    ];

    return (
        <div>
            {/* Sticky Navbar */}
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

            {/* Mobile Blocker */}
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
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </div>
        </div>
    );
}

export default App;
