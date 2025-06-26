import React, { useEffect, useRef, useState } from "react";
import Menu from "./Components/homepage/Menu"; // Assuming this is the path to your Menu component
import ERPDashboard from "./Components/homepage/Dashboard"; // Assuming this is the path to your Dashboard component
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import icons for navigation arrows

const Homepage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const scrolling = useRef(false);
    const TOTAL_PAGES = 2; // Dashboard (0) and Menu (1)

    const updatePage = (index) => {
        if (scrolling.current || index === currentPage || index < 0 || index >= TOTAL_PAGES) return;
        setCurrentPage(index);
        scrolling.current = true;
        setTimeout(() => {
            scrolling.current = false;
        }, 800); // Should be slightly longer than CSS transition-duration (700ms)
    };

    useEffect(() => {
        // Removed handleWheel event listener as requested
        // const handleWheel = (e) => {
        //     if (e.deltaY > 0) updatePage(currentPage + 1);
        //     else updatePage(currentPage - 1);
        // };

        const handleKey = (e) => {
            if (e.key === "ArrowRight") updatePage(currentPage + 1); // Right arrow -> next page
            if (e.key === "ArrowLeft") updatePage(currentPage - 1);  // Left arrow -> previous page
        };

        // Removed window.addEventListener("wheel", handleWheel);
        window.addEventListener("keydown", handleKey);

        return () => {
            // Removed window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKey);
        };
    }, [currentPage]);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Slide Container - This flex container handles the horizontal scrolling between pages */}
            <div
                className="transition-transform duration-700 ease-in-out h-full flex flex-nowrap" // Use flex and flex-nowrap for horizontal alignment
                style={{ transform: `translateX(-${currentPage * 100}%)` }} // Translate horizontally
            >
                <Section>
                    <ERPDashboard />
                </Section>
                <Section>
                    <Menu />
                </Section>
            </div>

            {/* Navigation Arrows */}
            {currentPage > 0 && (
                <button
                    onClick={() => updatePage(currentPage - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Previous Page"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
            )}
            {currentPage < TOTAL_PAGES - 1 && (
                <button
                    onClick={() => updatePage(currentPage + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Next Page"
                >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
            )}

            {/* Single Dot Indicator for navigation */}
            <SingleDotIndicator currentPage={currentPage} TOTAL_PAGES={TOTAL_PAGES} onDotClick={updatePage} />
        </div>
    );
};

// Section wrapper - Each section takes full viewport height and width
const Section = ({ children }) => (
    // Ensured each section takes full width of the viewport
    <section className="h-screen w-screen overflow-y-auto flex-shrink-0 flex-grow-0">
        {children}
    </section>
);

// Single Dynamic Dot in Bottom-Right Corner for navigation
const SingleDotIndicator = ({ currentPage, TOTAL_PAGES, onDotClick }) => {
    return (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex space-x-2"> {/* Centered horizontally */}
            {[...Array(TOTAL_PAGES)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onDotClick(index)}
                    className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                        ${currentPage === index
                            ? "bg-indigo-700 w-4 h-4 shadow-lg" // Active dot is larger and darker
                            : "bg-indigo-300 w-3 h-3 hover:bg-indigo-400" // Inactive dot is smaller
                        }`}
                    aria-label={`Go to page ${index + 1}`}
                >
                </button>
            ))}
        </div>
    );
};

export default Homepage;
