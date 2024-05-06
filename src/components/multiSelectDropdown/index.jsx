import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const MultiSelectDropdown = ({
    options,
    heading,
    disabled,
    onChange,
    value,
    multiSelect = true
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState(value || []) // Initialize with value prop
    const dropdownRef = useRef(null)

    // Update selected options when value prop changes
    useEffect(() => {
        setSelectedOptions(value || [])
    }, [value])

    useEffect(() => {
        const handleOutsideClick = event => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen)
        }
    }

    const handleOptionToggle = optionValue => {
        let updatedOptions = []
        if (multiSelect) {
            updatedOptions = selectedOptions.includes(optionValue)
                ? selectedOptions.filter(option => option !== optionValue)
                : [...selectedOptions, optionValue]
        } else {
            updatedOptions = selectedOptions.includes(optionValue)
                ? []
                : [optionValue]
        }

        setSelectedOptions(updatedOptions)
        onChange(updatedOptions)
    }

    return (
        <div ref={dropdownRef} className='relative inline-block text-left'>
            <button
                onClick={toggleDropdown}
                disabled={disabled}
                className={`hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ${
                    disabled ? 'cursor-not-allowed opacity-50' : ''
                }`}
                type='button'
            >
                {heading}
                <svg
                    className={`w-2.5 h-2.5 ms-3 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m1 1 4 4 4-4'
                    />
                </svg>
            </button>
            {/* Dropdown menu */}
            {isOpen && (
                <div className='absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow'>
                    <ul className='p-3 space-y-3 text-sm text-gray-700'>
                        {options.map((option, index) => (
                            <li key={index}>
                                <div className='flex items-center'>
                                    <input
                                        id={`checkbox-item-${index}`}
                                        type='checkbox'
                                        value={option}
                                        checked={selectedOptions.includes(
                                            option
                                        )}
                                        onChange={() =>
                                            handleOptionToggle(option)
                                        }
                                        className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                                    />
                                    <label
                                        htmlFor={`checkbox-item-${index}`}
                                        className='ms-2 text-sm'
                                    >
                                        {option}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

MultiSelectDropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    heading: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array,
    multiSelect: PropTypes.bool
}

export default MultiSelectDropdown
