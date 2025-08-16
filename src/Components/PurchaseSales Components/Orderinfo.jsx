import React, { useState, useEffect, useRef } from 'react';

const SearchableDropdown = ({
  containerClass = '',
  labelText = '',
  options = [],
  initialValue = '',
  onChange,
  disabled = false,
  placeholder = '',
  renderLabel = true,
  showIcon = true
}) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setCurrentValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setFilteredOptions(options.filter(opt =>
      opt.toLowerCase().includes(currentValue.toLowerCase())
    ));
  }, [currentValue, options]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCurrentValue(value);
    onChange(value);
    setIsDropdownOpen(true);
    setHighlightedIndex(-1);
  };

  const selectOption = (value) => {
    setCurrentValue(value);
    onChange(value);
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!isDropdownOpen || disabled) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (currentValue && filteredOptions.length > 0) {
          selectOption(filteredOptions[0]);
        }
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(prev => 
        (prev < filteredOptions.length - 1) ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(prev => 
        (prev > 0) ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex !== -1 && filteredOptions[highlightedIndex]) {
        selectOption(filteredOptions[highlightedIndex]);
      } else if (filteredOptions.length > 0) {
        selectOption(filteredOptions[0]);
      }
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={containerClass}>
      {renderLabel && (
        <label className={`block text-sm font-semibold text-gray-700 mb-1 ${disabled ? "opacity-50" : ""}`}>
          {labelText}
        </label>
      )}
      <div className="relative w-full" ref={wrapperRef}>
        <input
          type="text"
          ref={inputRef}
          className={`input-field w-full searchable-dropdown-input ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          value={currentValue}
          onChange={handleInputChange}
          onFocus={() => !disabled && setIsDropdownOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {showIcon && (
          <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 searchable-dropdown-icon">
            <i className={`fas ${isDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </span>
        )}
        <ul className={`absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg ${isDropdownOpen ? '' : 'hidden'} searchable-dropdown-list`}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, idx) => (
              <li
                key={opt}
                className={`px-4 py-2 cursor-pointer text-gray-800 transition-colors duration-150 ${highlightedIndex === idx ? 'bg-primary-blue text-white' : 'hover:bg-gray-100'}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectOption(opt);
                }}
              >
                {opt}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 select-none">No options found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchableDropdown;