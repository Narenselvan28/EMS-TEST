import PurchaseSale from "./Components/PurchaseSale";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./homepage";
import PartyDues from "./Components/PartyDues";
function App() {
    // Handle the back button click
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="hidden md:block">
            <div> <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-dark">ERP System</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Welcome, Admin</span>
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">A</div>
                    </div>
                </div>
            </header></div>
            {/* Mobile warning screen */}
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

            <BrowserRouter> <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/PartyDues" element={<PartyDues/>}></Route>



                <Route path="/Purchase&Sales" element={<PurchaseSale />} /></Routes>
            </BrowserRouter>

        </div >
    );
}

export default App;
