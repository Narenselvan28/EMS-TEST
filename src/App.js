import PurchaseSale from "./Components/PurchaseSale";

function App() {
    // Handle the back button click
    const handleBack = () => {
        window.history.back();
    };

    return (
        <>
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

            {/* Main content for desktop/tablet */}
            <div className="hidden md:block">
                <PurchaseSale />
            </div>
        </>
    );
}

export default App;
