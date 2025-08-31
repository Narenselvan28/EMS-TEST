import React from "react";
import { Routes, Route } from "react-router-dom";

// Page components
import Homepage from "./homepage";
import MastersPage from "./Components/pages/masters";
import DuesPage from "./Components/pages/DuesManagement";
import SettingsPage from "./settings/SettingsMainPage";
import VoucherEntryLayout from "./Components/pages/Vouchers";

import PurchaseTransactionForm from "./Components/PurchaseSales Components/Purchaseandsalesmod";
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

import FuelExpensesManagement from "./Components/Fuel/FuelMainPage";
import SalaryManagement from "./Components/pages/SalaryPage";
import PurchaseMain from "./Components/pages/PurchaseSalesMain";
import FuelExpensesForm from "./Components/Fuel/NewFuelTransactiion";

import WebSyraNavbar from "./WebsyraNavbar";
function App() {
    const handleBack = () => {
        window.history.back();
    };

    const routes = [
        { path: "/", element: <Homepage /> },
        { path: "/masters", element: <MastersPage /> },
        { path: "/duesmanagement", element: <DuesPage /> },
        { path: "/purchase&Sales", element: <PurchaseMain /> },
        { path: "/purchase&sale/addtransaction", element: <PurchaseTransactionForm /> },
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
        { path: "/salary", element: <SalaryManagement /> },
        { path: "/fuelmanagement/addtransaction", element: <FuelExpensesForm /> },
        { path: "/fuelmanagement", element: <FuelExpensesManagement/> },




        // Due Management
        { path: "/duesmanagement/partyduesmanagement", element: <PartyDues /> },
        { path: "/duesmanagement/employeeduesmanagement", element: <Employeeduesmanagements /> },
        { path: "/duesmanagement/vendorduesmanagement", element: <VendorDuesManagement /> },
    ];
    return (
        <div>
            <WebSyraNavbar/>

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
