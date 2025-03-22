import { useState } from 'react'
import PropTypes from 'prop-types'

import ApiRequest from '@/components/api'
import ToggleSwitch from '@/components/checkbox'
import ButtonGroup from '@/components/buttons'
import InputField from '@/components/inputs'
import MultiSelectDropdown from '@/components/multiSelectDropdown'

const MatrixGeneratorModal = ({ isOpen, data }) => {
    const initialState = {
        minValue: -100,
        maxValue: 100,
        rows: 3,
        columns: 3,
        error: {
            minValue: '',
            maxValue: '',
            rows: '',
            columns: ''
        },
        isFloatChecked: false,
        selectedNumberOptions: [],
        selectedMatrixOptions: [],
        selectedNumberType: [],
        includeNegativeValues: true,
        distributionType: 'uniform'
    }

    const [minValue, setMinValue] = useState(initialState.minValue)
    const [maxValue, setMaxValue] = useState(initialState.maxValue)
    const [rows, setRows] = useState(initialState.rows)
    const [columns, setColumns] = useState(initialState.columns)
    const [error, setError] = useState(initialState.error)
    const [isFloatChecked, setIsFloatChecked] = useState(
        initialState.isFloatChecked
    )
    const [selectedNumberOptions, setSelectedNumberOptions] = useState(
        initialState.selectedNumberOptions
    )
    const [selectedMatrixOptions, setSelectedMatrixOptions] = useState(
        initialState.selectedMatrixOptions
    )
    const [selectedNumberType, setSelectedNumberType] = useState(
        initialState.selectedNumberType
    )
    const [includeNegativeValues, setIncludeNegativeValues] = useState(
        initialState.includeNegativeValues
    )
    const [distributionType, setDistributionType] = useState(
        initialState.distributionType
    )

    const handleIsFloatChecked = () => {
        setIsFloatChecked(!isFloatChecked)
    }

    const handleIncludeNegativeValuesChange = () => {
        setIncludeNegativeValues(!includeNegativeValues)
    }

    const handleDistributionTypeChange = selectedDistributionType => {
        setDistributionType(selectedDistributionType)
    }

    const handleNumberOptionsChange = selectedNumberOptions => {
        setSelectedNumberOptions(selectedNumberOptions)
    }
    const handleMatrixOptionsChange = selectedMatrixOptions => {
        setSelectedMatrixOptions(selectedMatrixOptions)
    }
    const handleNumberTypeChange = selectedNumberType => {
        setSelectedNumberType(selectedNumberType)
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

    const handleRowsChange = e => {
        handleChange(
            e.target.value.trim(),
            setRows,
            errorMessage => setError({ ...error, rows: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value <= 0
                      ? 'Rows must be greater than 0'
                      : value > 100000
                        ? 'Rows must not exceed 100,000'
                        : null
        )
    }

    const handleColumnsChange = e =>
        handleChange(
            e.target.value.trim(),
            setColumns,
            errorMessage => setError({ ...error, columns: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value <= 0
                      ? 'Columns must be greater than 0'
                      : value > 100000
                        ? 'Columns must not exceed 100,000'
                        : null
        )

    const handleGenerate = async () => {
        const type = data.title
        const payloadData = {
            min_value: minValue,
            max_value: maxValue,
            rows: rows,
            columns: columns,
            float_values: isFloatChecked,
            number_options: selectedNumberOptions,
            matrix_options: selectedMatrixOptions,
            number_type: selectedNumberType,
            include_negative_values: includeNegativeValues,
            distribution_type: distributionType,
            type: type
        }

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
        // Implement reset functionality here for matrix generator
        setMinValue(initialState.minValue)
        setMaxValue(initialState.maxValue)
        setRows(initialState.rows)
        setColumns(initialState.columns)
        setError(initialState.error)
        setIsFloatChecked(initialState.isFloatChecked)
        setSelectedNumberOptions(initialState.selectedNumberOptions)
        setSelectedMatrixOptions(initialState.selectedMatrixOptions)
        setSelectedNumberType(initialState.selectedNumberType)
        setIncludeNegativeValues(initialState.includeNegativeValues)
        setDistributionType(initialState.distributionType)
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

    const numberOptions = ['Any', 'Even', 'Odd', 'Prime']
    const numberType = ['Increasing', 'Decreasing', 'Random']
    const distributionOptions = ['Uniform', 'Normal', 'Poisson', 'Exponential']
    const matrixOptions = ['Identity', 'Symmetric', 'Diagonal', 'Random']

    return (
        <div className='modal'>
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                <InputField
                    label='Min value'
                    value={minValue}
                    onChange={handleMinValueChange}
                    placeholder='Minimum'
                    error={error.minValue}
                    isRequired={true}
                />
                <InputField
                    label='Max Value'
                    value={maxValue}
                    onChange={handleMaxValueChange}
                    placeholder='Maximum'
                    error={error.maxValue}
                    isRequired={true}
                />
                <InputField
                    label='Rows'
                    value={rows}
                    onChange={handleRowsChange}
                    placeholder='Rows'
                    error={error.rows}
                    isRequired={true}
                />
                <InputField
                    label='Columns'
                    value={columns}
                    onChange={handleColumnsChange}
                    placeholder='Columns'
                    error={error.columns}
                    isRequired={true}
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                <ToggleSwitch
                    checked={isFloatChecked}
                    onChange={handleIsFloatChecked}
                    rightLabel='Float Values'
                />
                <ToggleSwitch
                    checked={includeNegativeValues}
                    onChange={handleIncludeNegativeValuesChange}
                    rightLabel='Include Negative Values'
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <MultiSelectDropdown
                    heading='Select Number Options'
                    options={numberOptions}
                    onChange={handleNumberOptionsChange}
                    value={selectedNumberOptions}
                    multiSelect={false}
                />
                <MultiSelectDropdown
                    heading='Select Number Type'
                    options={numberType}
                    onChange={handleNumberTypeChange}
                    value={selectedNumberType}
                    multiSelect={false}
                />
                <MultiSelectDropdown
                    heading='Select Distribution Type'
                    options={distributionOptions}
                    onChange={handleDistributionTypeChange}
                    value={distributionType}
                    multiSelect={false}
                />
                <MultiSelectDropdown
                    heading='Select Matrix Options'
                    options={matrixOptions}
                    onChange={handleMatrixOptionsChange}
                    value={selectedMatrixOptions}
                    multiSelect={false}
                />
            </div>

            <div>
                <ButtonGroup buttons={buttons} />
            </div>
        </div>
    )
}

MatrixGeneratorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired
}

export default MatrixGeneratorModal
