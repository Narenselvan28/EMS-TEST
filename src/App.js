import PurchaseSale from "./Components/PurchaseSale";

function App() {
  return (
    // The 'hidden' class hides the element by default (on mobile).
    // The 'md:block' class makes it visible on medium screens and larger.
    // This effectively blocks the content from being displayed on mobile view.
    <div className="hidden md:block">
      <PurchaseSale />
    </div>
  );
}

export default App;
