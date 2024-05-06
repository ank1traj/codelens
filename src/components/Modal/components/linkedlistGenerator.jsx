import { useState } from 'react'
import PropTypes from 'prop-types'

import ApiRequest from '@/components/api'
import ToggleSwitch from '@/components/checkbox'
import ButtonGroup from '@/components/buttons'
import InputField from '@/components/inputs'
import MultiSelectDropdown from '@/components/multiSelectDropdown'

const LinkedlistGeneratorModal = ({ isOpen, data }) => {
    const initialState = {
        minValue: -100,
        maxValue: 1,
        listSize: 1,
        headValue: 1,
        countOfList: 1,
        error: {
            minValue: '',
            maxValue: '',
            listSize: '',
            headValue: '',
            countOfList: ''
        },
        isEdgeAndVertexChecked: false,
        isSizeChecked: false,
        isCountChecked: false,
        isFloatChecked: false,
        selectedLinkedListOptions: [],
        selectedLinkedistType: [],
        selectedLinkedListNodeOptions: []
    }

    const [minValue, setMinValue] = useState(initialState.minValue)
    const [maxValue, setMaxValue] = useState(initialState.maxValue)
    const [listSize, setListSize] = useState(initialState.listSize)
    const [headValue, setHeadValue] = useState(initialState.headValue)
    const [countOfList, setCountOfList] = useState(initialState.countOfList)
    const [error, setError] = useState(initialState.error)
    const [isSizeChecked, setIsSizeChecked] = useState(
        initialState.isSizeChecked
    )
    const [isCountChecked, setIsCountChecked] = useState(
        initialState.isCountChecked
    )
    const [selectedLinkedListOptions, setSelectedLinkedListOptions] = useState(
        initialState.selectedLinkedListOptions
    )
    const [selectedLinkedistType, setSelectedLinkedistType] = useState(
        initialState.selectedLinkedistType
    )
    const [selectedLinkedListNodeOptions, setSelectedLinkedListNodeOptions] =
        useState(initialState.selectedLinkedListNodeOptions)

    const handleIsSizeChecked = () => {
        setIsSizeChecked(!isSizeChecked)
    }

    const handleIsCountChecked = () => {
        setIsCountChecked(!isCountChecked)
    }

    const handleLinkedListOptionsChange = selectedLinkedListOptions => {
        setSelectedLinkedListOptions(selectedLinkedListOptions)
    }
    const handleLinkedListTypeChange = selectedLinkedistType => {
        setSelectedLinkedistType(selectedLinkedistType)
    }
    const handleNodeOptionsChange = selectedLinkedListNodeOptions => {
        setSelectedLinkedListNodeOptions(selectedLinkedListNodeOptions)
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

    const handleListSizeValueChange = e =>
        handleChange(
            e.target.value.trim(),
            setListSize,
            errorMessage => setError({ ...error, listSize: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value <= 0
                      ? 'Edges must be greater than 0'
                      : value > 100000
                        ? 'Edges must not exceed 100,000'
                        : null
        )

    const handleHeadValueChange = e =>
        handleChange(
            e.target.value.trim(),
            setHeadValue,
            errorMessage => setError({ ...error, headValue: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value <= 0
                      ? 'Vertices must be greater than 0'
                      : value > 100000
                        ? 'Vertices must not exceed 100,000'
                        : null
        )

    const handleCountOfListChange = e =>
        handleChange(
            e.target.value.trim(),
            setCountOfList,
            errorMessage => setError({ ...error, countOfList: errorMessage }),
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
        list_size: listSize,
        head_value: headValue,
        list_count: countOfList,
        show_size: isSizeChecked,
        show_count: isCountChecked,
        linkedlist_options: selectedLinkedListOptions,
        linkedlist_type: selectedLinkedistType,
        node_options: selectedLinkedListNodeOptions,
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
        setListSize(initialState.listSize)
        setCountOfList(initialState.countOfList)
        setError(initialState.error)
        setIsSizeChecked(initialState.isSizeChecked)
        setIsCountChecked(initialState.isCountChecked)
        setSelectedLinkedListOptions(initialState.selectedLinkedListOptions)
        setSelectedLinkedistType(initialState.selectedLinkedistType)
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

    const linkedListOptions = ['Add Node', 'Delete Node', 'Update Node']
    const linledListType = ['Doubly', 'Circular']
    const linkedListNodeOptions = [
        'At Start',
        'At End',
        'At Midle',
        'At Position',
        'Random'
    ]

    let linkedListModify = !selectedLinkedListOptions.length > 0

    return (
        <div className='modal'>
            <div className={`grid grid-cols-1 sm:grid-cols-5 gap-4`}>
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
                    label="List's Size"
                    value={listSize}
                    onChange={handleListSizeValueChange}
                    placeholder='Size'
                    error={error.listSize}
                    isRequired={true}
                />
                <InputField
                    label='Head Value'
                    value={headValue}
                    onChange={handleHeadValueChange}
                    placeholder='Head'
                    error={error.headValue}
                    isRequired={true}
                />
                <InputField
                    label='Count of Lists'
                    value={countOfList}
                    onChange={handleCountOfListChange}
                    placeholder='Count'
                    error={error.countOfList}
                    isRequired={true}
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
                <ToggleSwitch
                    checked={isSizeChecked}
                    onChange={handleIsSizeChecked}
                    rightLabel='Show Size'
                />
                <ToggleSwitch
                    checked={isCountChecked}
                    onChange={handleIsCountChecked}
                    rightLabel='Show count'
                />
            </div>
            <div className='grid sm:grid-cols-3 text-sm font-sm'>
                <MultiSelectDropdown
                    heading='Select LinkedList Options'
                    options={linkedListOptions}
                    onChange={handleLinkedListOptionsChange}
                    value={selectedLinkedListOptions}
                    multiSelect={false}
                />
                <MultiSelectDropdown
                    heading='Select LinkedList type'
                    options={linledListType}
                    onChange={handleLinkedListTypeChange}
                    value={selectedLinkedistType}
                />
                <MultiSelectDropdown
                    heading='Select Node Position'
                    options={linkedListNodeOptions}
                    onChange={handleNodeOptionsChange}
                    value={selectedLinkedListNodeOptions}
                    disabled={linkedListModify}
                    multiSelect={false}
                />
            </div>
            <div>
                <ButtonGroup buttons={buttons} />
            </div>
        </div>
    )
}

LinkedlistGeneratorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired
}

export default LinkedlistGeneratorModal
