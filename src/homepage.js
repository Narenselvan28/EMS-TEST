import React, { useEffect, useRef, useState } from "react";
import Menu from "./Components/homepage/Menu";
import ERPDashboard from "./Components/homepage/Dashboard";

const Homepage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const scrolling = useRef(false);

    const updatePage = (index) => {
        if (scrolling.current || index === currentPage) return;
        setCurrentPage(index);
        scrolling.current = true;
        setTimeout(() => {
            scrolling.current = false;
        }, 800); // Match transition duration
    };

    useEffect(() => {
        const handleWheel = (e) => {
            if (e.deltaY > 0) updatePage(1);
            else updatePage(0);
        };

        const handleKey = (e) => {
            if (e.key === "ArrowDown") updatePage(1);
            if (e.key === "ArrowUp") updatePage(0);
        };

        window.addEventListener("wheel", handleWheel);
        window.addEventListener("keydown", handleKey);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKey);
        };
    }, [currentPage]);

    return (
        <div className="relative overflow-hidden h-screen w-full">
            {/* Page Container */}
            <div
                className="transition-transform duration-700 ease-in-out h-full w-full"
                style={{
                    transform: `translateY(${currentPage === 0 ? "0%" : "-100%"})`,
                }}
            >
                {/* Page 1 - ERP Dashboard */}
                <section className="h-screen w-full overflow-y-auto">
                    <ERPDashboard />
                </section>

                {/* Page 2 - Menu */}
                <section className="h-screen w-full overflow-y-auto">
                    <Menu />
                </section>
            </div>

            {/* Page Indicators */}
            <div className="fixed top-1/2 right-4 -translate-y-1/2 space-y-2 z-20">
                {[0, 1].map((i) => (
                    <button
                        key={i}
                        onClick={() => updatePage(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentPage === i ? "bg-indigo-700 w-5" : "bg-indigo-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Homepage;
