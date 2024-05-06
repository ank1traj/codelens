import { useState } from 'react'
import PropTypes from 'prop-types'

import ApiRequest from '@/components/api'
import ToggleSwitch from '@/components/checkbox'
import ButtonGroup from '@/components/buttons'
import InputField from '@/components/inputs'
import MultiSelectDropdown from '@/components/multiSelectDropdown'

const StringGeneratorModal = ({ isOpen, data }) => {
    const initialState = {
        countOfStrings: 1,
        stringsLength: 1,
        excludeChars: '',
        includeChars: '',
        error: {
            countOfStrings: '',
            stringsLength: '',
            excludeChars: '',
            includeChars: ''
        },
        isLengthChecked: false,
        isCountChecked: false,
        selectedCharOptions: [],
        selectedStringType: [],
        selectedCharType: []
    }

    const [countOfStrings, setCountOfStrings] = useState(
        initialState.countOfStrings
    )
    const [stringsLength, setStringsLength] = useState(
        initialState.stringsLength
    )
    const [excludeChars, setExcludeChars] = useState(initialState.excludeChars)
    const [includeChars, setIncludeChars] = useState(initialState.includeChars)
    const [error, setError] = useState(initialState.error)
    const [isLengthChecked, setIsLengthChecked] = useState(
        initialState.isLengthChecked
    )
    const [isCountChecked, setIsCountChecked] = useState(
        initialState.isCountChecked
    )

    const [selectedCharOptions, setSelectedCharOptions] = useState(
        initialState.selectedCharOptions
    )
    const [selectedStringType, setSelectedStringType] = useState(
        initialState.selectedStringType
    )
    const [selectedCharType, setSelectedCharType] = useState(
        initialState.selectedCharType
    )

    const handleIsLengthChecked = () => {
        setIsLengthChecked(!isLengthChecked)
    }

    const handleIsCountChecked = () => {
        setIsCountChecked(!isCountChecked)
    }

    const handleCharOptionsChange = selectedCharOptions => {
        setSelectedCharOptions(selectedCharOptions)
    }
    const handleStringTypeChange = selectedStringType => {
        setSelectedStringType(selectedStringType)
    }
    const handleCharTypeChange = selectedCharType => {
        setSelectedCharType(selectedCharType)
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

    const handleStringsLengthChange = e =>
        handleChange(
            e.target.value.trim(),
            setStringsLength,
            errorMessage => setError({ ...error, stringsLength: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value <= 0
                      ? 'Length must be greater than 0'
                      : value > 100000
                        ? 'Length must not exceed 100,000'
                        : null
        )

    const handleCountOfStringsChange = e =>
        handleChange(
            e.target.value.trim(),
            setCountOfStrings,
            errorMessage =>
                setError({ ...error, countOfStrings: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value <= 0
                      ? 'Count must be greater than 0'
                      : value > 100000
                        ? 'Count must not exceed 100,000'
                        : null
        )

    const handleIncludeCharsChange = e => {
        const value = e.target.value.replace(
            /[^a-zA-Z0-9 !@#$%^&*()_+-=,.<>?;:'"]/g,
            ''
        )
        setIncludeChars(value)
        errorMessage => setError({ ...error, includeChars: errorMessage })
        value =>
            value === ''
                ? ''
                : value.length > 100
                  ? 'Include characters must not exceed 100 characters'
                  : null
    }

    const handleExcludeCharsChange = e => {
        const value = e.target.value.replace(
            /[^a-zA-Z0-9 !@#$%^&*()_+-=,.<>?;:'"]/g,
            ''
        )
        setExcludeChars(value)
        errorMessage => setError({ ...error, excludeChars: errorMessage })
        value =>
            value === ''
                ? ''
                : value.length > 100
                  ? 'Exclude characters must not exceed 100 characters'
                  : null
    }

    const type = data.title
    const payloadData = {
        string_length: stringsLength,
        string_count: countOfStrings,
        show_length: isLengthChecked,
        show_count: isCountChecked,
        include_chars: includeChars,
        exclude_chars: excludeChars,
        selected_char_options: selectedCharOptions,
        selected_string_type: selectedStringType,
        selected_char_type: selectedCharType,
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
        setCountOfStrings(initialState.numberOfStrings)
        setStringsLength(initialState.stringsLength)
        setIncludeChars(initialState.includeChars)
        setExcludeChars(initialState.excludeChars)
        setError(initialState.error)
        setIsLengthChecked(initialState.isLengthChecked)
        setIsCountChecked(initialState.isCountChecked)
        setSelectedCharOptions(initialState.selectedCharOptions)
        setSelectedStringType(initialState.selectedStringType)
        setSelectedCharType(initialState.selectedCharType)
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

    const charOptions = ['a-z', 'A-Z', '0-9', 'Special Chars', 'Distinct']
    const stringsOptions = [
        'Random Size',
        'Distinct',
        'Distinct(Case Sensitive)'
    ]
    const charTypes = ['Increasing', 'Decreasing', 'Random']

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                <InputField
                    label='Count of Strings'
                    value={countOfStrings}
                    onChange={handleCountOfStringsChange}
                    placeholder='Count'
                    error={error.countOfStrings}
                    isRequired={true}
                />
                <InputField
                    label='String Length'
                    value={stringsLength}
                    onChange={handleStringsLengthChange}
                    placeholder='Length'
                    error={error.stringsLength}
                    isRequired={true}
                />
                <InputField
                    label='Include Characters'
                    value={includeChars}
                    onChange={handleIncludeCharsChange}
                    placeholder='Include Characters'
                    error={error.includeChars}
                    type='text'
                />
                <InputField
                    label='Exclude Characters'
                    value={excludeChars}
                    onChange={handleExcludeCharsChange}
                    placeholder='Exclude Characters'
                    error={error.excludeChars}
                    type='text'
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
                <ToggleSwitch
                    checked={isCountChecked}
                    onChange={handleIsCountChecked}
                    rightLabel='Show length'
                />
                <ToggleSwitch
                    checked={isLengthChecked}
                    onChange={handleIsLengthChecked}
                    rightLabel='Show count'
                />
            </div>

            <div className='grid sm:grid-cols-3 text-sm font-sm'>
                <MultiSelectDropdown
                    heading='Select Char Options'
                    options={charOptions}
                    onChange={handleCharOptionsChange}
                    value={selectedCharOptions}
                />
                <MultiSelectDropdown
                    heading='Select String type'
                    options={stringsOptions}
                    onChange={handleStringTypeChange}
                    value={selectedStringType}
                    multiSelect={false}
                />
                <MultiSelectDropdown
                    heading='Select Char type'
                    options={charTypes}
                    onChange={handleCharTypeChange}
                    value={selectedCharType}
                    multiSelect={false}
                />
            </div>

            <div>
                <ButtonGroup buttons={buttons} />
            </div>
        </div>
    )
}

StringGeneratorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    size: PropTypes.string
}

export default StringGeneratorModal
