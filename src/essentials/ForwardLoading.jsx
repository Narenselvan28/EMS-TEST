import React from 'react';
import '../index.css';
const ForwardLoading = () => {
    return (
        <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col items-center justify-center min-h-screen font-[Poppins]">
            <div className="relative w-[200px] h-[200px] animate-fadeInScale">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#F3F4F6" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect x="0" y="0" width="200" height="200" fill="url(#grad1)" />
                    <circle className="animate-pulseOrb filter-glow" cx="100" cy="100" r="25" fill="#9FA8DA" />
                    <path className="sweeping-arc glow-filter" d="M100 70 A30 30 0 1 1 100 130" stroke="#5C6BC0" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    <path className="sweeping-arc sweeping-arc-2 glow-filter" d="M100 70 A30 30 0 1 1 100 130" stroke="#7986CB" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    <path className="sweeping-arc sweeping-arc-3 glow-filter" d="M100 70 A30 30 0 1 1 100 130" stroke="#42A5F5" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    <g className="data-dot-group">
                        <circle className="data-dot data-dot-1" cx="100" cy="55" r="2" fill="#64B5F6" />
                        <circle className="data-dot data-dot-2" cx="120" cy="80" r="2" fill="#64B5F6" />
                        <circle className="data-dot data-dot-3" cx="80" cy="120" r="2" fill="#64B5F6" />
                    </g>
                </svg>
                <div className="absolute bottom-[-2.5rem] w-full text-center text-gray-700 text-sm md:text-base">
                    Please wait for a while...!
                </div>
            </div>
        </div>
    );
};

export default ForwardLoading;
