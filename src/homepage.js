import React, { useEffect, useRef, useState } from "react";
import Menu from "./Components/homepage/Menu";
import ERPDashboard from "./Components/homepage/Dashboard";

const Homepage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const scrolling = useRef(false);
    const TOTAL_PAGES = 2;

    const updatePage = (index) => {
        if (scrolling.current || index === currentPage || index < 0 || index >= TOTAL_PAGES) return;
        setCurrentPage(index);
        scrolling.current = true;
        setTimeout(() => {
            scrolling.current = false;
        }, 800);
    };

    useEffect(() => {
        const handleWheel = (e) => {
            if (e.deltaY > 0) updatePage(currentPage + 1);
            else updatePage(currentPage - 1);
        };

        const handleKey = (e) => {
            if (e.key === "ArrowDown") updatePage(currentPage + 1);
            if (e.key === "ArrowUp") updatePage(currentPage - 1);
        };

        window.addEventListener("wheel", handleWheel);
        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKey);
        };
    }, [currentPage]);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Slide Container */}
            <div
                className="transition-transform duration-700 ease-in-out h-full w-full"
                style={{ transform: `translateY(-${currentPage * 100}%)` }}
            >
                <Section>
                    <ERPDashboard />
                </Section>
                <Section>
                    <Menu />
                </Section>
            </div>

            {/* Single Dot Bottom Right */}
            <SingleDotIndicator currentPage={currentPage} />
        </div>
    );
};

// Section wrapper
const Section = ({ children }) => (
    <section className="h-screen w-full overflow-y-auto">{children}</section>
);

// Single Dynamic Dot in Bottom-Right Corner
const SingleDotIndicator = ({ currentPage }) => {
    return (
        <div className="fixed bottom-5 right-5 z-30">
            <div
                className={`rounded-full transition-all duration-300 ${
                    currentPage === 0
                        ? "bg-indigo-700 w-6 h-6"
                        : "bg-indigo-300 w-3 h-3"
                }`}
            />
        </div>
    );
};

export default Homepage;
