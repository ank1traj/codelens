import { useState } from 'react'
import PropTypes from 'prop-types'

import ApiRequest from '@/components/api'
import ToggleSwitch from '@/components/checkbox'
import ButtonGroup from '@/components/buttons'
import InputField from '@/components/inputs'
import MultiSelectDropdown from '@/components/multiSelectDropdown'

const PalindromeGeneratorModal = ({ isOpen, data }) => {
    const initialState = {
        minValue: -100,
        maxValue: 1,
        palindromeSize: 1,
        countOfPalindrome: 1,
        error: {
            minValue: '',
            maxValue: '',
            palindromeSize: '',
            countOfPalindrome: ''
        },
        isFloatChecked: false,
        isRandomSizeChecked: false,
        isStringChecked: false,
        isSizeChecked: false,
        isCountChecked: false,
        selectedCharOptions: []
    }

    const [minValue, setMinValue] = useState(initialState.minValue)
    const [maxValue, setMaxValue] = useState(initialState.maxValue)
    const [palindromeSize, setPalindromeSize] = useState(
        initialState.palindromeSize
    )
    const [countOfPalindrome, setCountOfPalindrome] = useState(
        initialState.countOfPalindrome
    )
    const [error, setError] = useState(initialState.error)
    const [isSizeChecked, setIsSizeChecked] = useState(
        initialState.isSizeChecked
    )
    const [isCountChecked, setIsCountChecked] = useState(
        initialState.isCountChecked
    )
    const [isStringChecked, setIsStringChecked] = useState(
        initialState.isStringChecked
    )

    const handleIsSizeChecked = () => {
        setIsSizeChecked(!isSizeChecked)
    }

    const handleIsCountChecked = () => {
        setIsCountChecked(!isCountChecked)
    }

    const handleIsStringChecked = () => {
        setIsStringChecked(!isStringChecked)
    }

    const [selectedCharOptions, setSelectedCharOptions] = useState([])

    const handlePalindromeTypeChange = selectedOptions => {
        setSelectedCharOptions(selectedOptions)
    }

    const handleChange = (value, setter, setErrorForValue, errorMessageFn) => {
        const numericValue = parseInt(value, 10)
        setter(numericValue)
        if (value === '') {
            setErrorForValue('Value is required')
        } else {
            const parsedValue = parseInt(value)
            if (!isNaN(parsedValue)) {
                if (Math.abs(parsedValue) > 100000) {
                    setErrorForValue('Value cannot exceed 100,000')
                } else {
                    const errorMessage = errorMessageFn(parsedValue)
                    setErrorForValue(errorMessage || '')
                }
            } else {
                setErrorForValue('Please enter a valid integer')
            }
        }
    }

    const handleMinValueChange = e =>
        handleChange(
            e.target.value.trim(),
            setMinValue,
            errorMessage => setError({ ...error, minValue: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value > maxValue
                      ? 'Min value must be less than or equal to max value'
                      : ''
        )

    const handleMaxValueChange = e =>
        handleChange(
            e.target.value.trim(),
            setMaxValue,
            errorMessage => setError({ ...error, maxValue: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value < minValue
                      ? 'Max value must be greater than or equal to min value'
                      : ''
        )

    const handlePalidnromeSizeChange = e => {
        handleChange(
            e.target.value.trim(),
            setPalindromeSize,
            errorMessage =>
                setError({ ...error, integersLength: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value <= 0
                      ? 'Length must be greater than 0'
                      : value > 100000
                        ? 'Length must not exceed 100,000'
                        : null
        )
    }

    const handleCountOfPalindromeChange = e =>
        handleChange(
            e.target.value.trim(),
            setCountOfPalindrome,
            errorMessage =>
                setError({ ...error, countOfPalindrome: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value <= 0
                      ? 'Count must be greater than 0'
                      : value > 100000
                        ? 'Count must not exceed 100,000'
                        : null
        )

    const type = data.title
    const payloadData = {
        min_value: minValue,
        max_value: maxValue,
        palindrome_size: palindromeSize,
        palindrome_count: countOfPalindrome,
        show_size: isSizeChecked,
        show_count: isCountChecked,
        string_or_number: isStringChecked,
        charOptions: selectedCharOptions,
        type: type
    }

    const handleGenerate = async () => {
        const setGeneratedData = data => {
            // Implement the logic to set the generated data
            console.log('Setting generated data:', data)
        }

        try {
            const responseData = await ApiRequest(
                `generate${type}`, // Use capitalizedValue in the request
                'POST',
                payloadData
            )

            // Handle the response data as needed
            console.log(`Received data for ${type}:`, responseData)
            setGeneratedData(responseData)
        } catch (error) {
            // Error handling
            console.error(`Error fetching data:`, error)
        }
    }

    const handleCopy = () => {
        // your handleCopy function logic
    }

    const handleReset = () => {
        // Implement reset functionality here for array generator
        setMinValue(initialState.minValue)
        setMaxValue(initialState.maxValue)
        setPalindromeSize(initialState.palindromeSize)
        setCountOfPalindrome(initialState.countOfPalindrome)
        setError(initialState.error)
        setIsSizeChecked(initialState.isSizeChecked)
        setIsCountChecked(initialState.isCountChecked)
        setIsStringChecked(initialState.isStringChecked)
        setSelectedCharOptions(initialState.selectedCharOptions)
    }

    const handleDownload = () => {
        // your handleDownload function logic
    }

    const handleSendToEmail = () => {
        // your handleSendToEmail function logic
    }

    const hasErrors = Object.values(error).some(
        errorMessage => errorMessage !== ''
    )

    if (!isOpen) return null

    const buttons = [
        {
            label: 'Generate',
            onClick: handleGenerate,
            disabled: hasErrors,
            classNames: `hover:bg-blue-700 hover:text-white border-blue-600 border-2 ${hasErrors ? 'cursor-not-allowed bg-gray-300 border-gray-400 text-gray-600' : 'hover:bg-blue-700'}`
        },
        {
            label: 'Copy',
            onClick: handleCopy,
            classNames: `hover:bg-purple-700 hover:text-white border-purple-600 border-2`
        },
        {
            label: 'Reset',
            onClick: handleReset,
            classNames: `hover:bg-red-700 hover:text-white border-red-600 border-2`
        },
        {
            label: 'Download',
            onClick: handleDownload,
            classNames: `hover:bg-orange-700 hover:text-white border-orange-600 border-2`
        },
        {
            label: 'Send to Email',
            onClick: handleSendToEmail,
            classNames: `hover:bg-green-700 hover:text-white border-green-600 border-2`
        }
    ]

    const charOptions = ['a-z', 'A-Z', '0-9', 'Special Chars']

    return (
        <div className='modal'>
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                {!isStringChecked ? (
                    <InputField
                        label='Min value'
                        value={minValue}
                        onChange={handleMinValueChange}
                        placeholder='Minimum'
                        error={error.minValue}
                        isRequired={true}
                    />
                ) : null}
                {!isStringChecked ? (
                    <InputField
                        label='Max Value'
                        value={maxValue}
                        onChange={handleMaxValueChange}
                        placeholder='Maximum'
                        error={error.maxValue}
                        isRequired={true}
                    />
                ) : null}
                <InputField
                    label="Palindrome's Size"
                    value={palindromeSize}
                    onChange={handlePalidnromeSizeChange}
                    placeholder='Size'
                    error={error.integersLength}
                    isRequired={true}
                />
                <InputField
                    label='Count of Palindrome'
                    value={countOfPalindrome}
                    onChange={handleCountOfPalindromeChange}
                    placeholder='Count'
                    error={error.countOfPalindrome}
                    isRequired={true}
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
                <ToggleSwitch
                    checked={isCountChecked}
                    onChange={handleIsCountChecked}
                    rightLabel='Show length'
                />
                <ToggleSwitch
                    checked={isSizeChecked}
                    onChange={handleIsSizeChecked}
                    rightLabel='Show count'
                />
                <ToggleSwitch
                    checked={isStringChecked}
                    onChange={handleIsStringChecked}
                    rightLabel='String'
                    leftLabel='Number'
                />
            </div>
            {isStringChecked ? (
                <div className='grid sm:grid-cols-3 text-sm font-sm'>
                    <MultiSelectDropdown
                        heading='Select Char Options'
                        options={charOptions}
                        onChange={handlePalindromeTypeChange}
                        value={selectedCharOptions}
                    />
                </div>
            ) : null}
            <div>
                <ButtonGroup buttons={buttons} />
            </div>
        </div>
    )
}

PalindromeGeneratorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired
}

export default PalindromeGeneratorModal
