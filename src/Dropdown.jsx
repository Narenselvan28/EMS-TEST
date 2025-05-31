    import React, { useState, useRef, useEffect } from 'react';

    import "./index.css"

    // Added initialValue prop to allow parent to set the initial display value
    const Dropdown = ({ options = [], onSelect, placeholder, width = 'w-[97%]', initialValue = '' }) => {
        const [inputValue, setInputValue] = useState(initialValue); // Initialize with initialValue
        const [filteredOptions, setFilteredOptions] = useState(options);
        const [showSuggestions, setShowSuggestions] = useState(false);
        const [activeIndex, setActiveIndex] = useState(-1);
        const suggestionRefs = useRef([]);

        // Effect to update inputValue when initialValue prop changes (e.g., when a new item row is added)
        useEffect(() => {
            setInputValue(initialValue);
        }, [initialValue]);

        useEffect(() => {
            const filtered = options.filter(option =>
                option.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredOptions(filtered);
        }, [inputValue, options]);

        const handleChange = (e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
            setActiveIndex(-1);
        };

        const handleFocus = () => {
            setFilteredOptions(options); // Show all options on focus initially
            setShowSuggestions(true);
        };

        const handleBlur = () => {
            // Delay hiding suggestions to allow click on suggestion
            setTimeout(() => setShowSuggestions(false), 100);
        };

        const handleSelect = (value) => {
            setInputValue(value);
            setShowSuggestions(false);
            if (onSelect) onSelect(value); // Use onSelect as per your component's API
        };

        const handleKeyDown = (e) => {
            if (!showSuggestions) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex(prev =>
                    prev < filteredOptions.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex(prev =>
                    prev > 0 ? prev - 1 : filteredOptions.length - 1
                );
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeIndex >= 0) {
                    handleSelect(filteredOptions[activeIndex]);
                } else if (filteredOptions.length > 0) {
                    // If no active index but there are filtered options, select the first one
                    handleSelect(filteredOptions[0]);
                }
            }
        };

        useEffect(() => {
            if (activeIndex >= 0 && suggestionRefs.current[activeIndex]) {
                suggestionRefs.current[activeIndex].scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth',
                });
            }
        }, [activeIndex]);

        return (
            <div className={`relative ${width}`}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full px-4 h-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                {showSuggestions && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                        {filteredOptions.length === 0 ? (
                            <div className="px-4 py-2 text-gray-400">No results found</div>
                        ) : (
                            filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    ref={el => suggestionRefs.current[index] = el}
                                    onMouseDown={() => handleSelect(option)} // Use onMouseDown to trigger before onBlur
                                    className={`px-4 py-2 cursor-pointer ${index === activeIndex ? 'bg-violet-100' : ''
                                        } hover:bg-violet-50`}
                                >
                                    {option}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        );
    };

    export default Dropdown;
