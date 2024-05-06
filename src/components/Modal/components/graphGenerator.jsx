import { useState } from 'react'
import PropTypes from 'prop-types'

import ApiRequest from '@/components/api'
import ToggleSwitch from '@/components/checkbox'
import ButtonGroup from '@/components/buttons'
import InputField from '@/components/inputs'
import MultiSelectDropdown from '@/components/multiSelectDropdown'

const GraphGeneratorModal = ({ isOpen, data }) => {
    const initialState = {
        minValue: -100,
        maxValue: 1,
        edgesNumber: 1,
        verticesNumber: 1,
        countOfGraph: 1,
        error: {
            minValue: '',
            maxValue: '',
            edgesNumber: '',
            verticesNumber: '',
            countOfGraph: ''
        },
        isEdgeAndVertexChecked: false,
        isCountChecked: false,
        isFloatChecked: false,
        selectedGraphOptions: [],
        selectedGraphType: [],
        selectedCharOptions: []
    }

    const [minValue, setMinValue] = useState(initialState.minValue)
    const [maxValue, setMaxValue] = useState(initialState.maxValue)
    const [edgesNumber, setEdgesNumber] = useState(initialState.edgesNumber)
    const [verticesNumber, setVerticesNumber] = useState(
        initialState.verticesNumber
    )
    const [countOfGraph, setCountOfGraph] = useState(initialState.countOfGraph)
    const [error, setError] = useState(initialState.error)
    const [isEdgeAndVertexChecked, setIsEdgeAndVertexChecked] = useState(
        initialState.isEdgeAndVertexChecked
    )
    const [isCountChecked, setIsCountChecked] = useState(
        initialState.isCountChecked
    )
    const [selectedGraphOptions, setSelectedGraphOptions] = useState(
        initialState.selectedGraphOptions
    )
    const [selectedGraphType, setSelectedGraphType] = useState(
        initialState.selectedGraphType
    )
    const [selectedCharOptions, setSelectedCharOptions] = useState(
        initialState.selectedCharOptions
    )

    const handleIsEdgeAndVertexChecked = () => {
        setIsEdgeAndVertexChecked(!isEdgeAndVertexChecked)
    }

    const handleIsCountChecked = () => {
        setIsCountChecked(!isCountChecked)
    }

    const handleGraphOptionsChange = selectedGraphOptions => {
        setSelectedGraphOptions(selectedGraphOptions)
    }
    const handleGraphTypeChange = selectedGraphType => {
        setSelectedGraphType(selectedGraphType)
    }
    const handleCharOptionsChange = selectedCharOptions => {
        setSelectedCharOptions(selectedCharOptions)
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

    const handleEdgesValueChange = e =>
        handleChange(
            e.target.value.trim(),
            setEdgesNumber,
            errorMessage => setError({ ...error, edgesNumber: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value <= 0
                      ? 'Edges must be greater than 0'
                      : value > 100000
                        ? 'Edges must not exceed 100,000'
                        : null
        )

    const handleVerticesValueChange = e =>
        handleChange(
            e.target.value.trim(),
            setVerticesNumber,
            errorMessage =>
                setError({ ...error, verticesNumber: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value <= 0
                      ? 'Vertices must be greater than 0'
                      : value > 100000
                        ? 'Vertices must not exceed 100,000'
                        : null
        )

    const handleCountOfGraphChange = e =>
        handleChange(
            e.target.value.trim(),
            setCountOfGraph,
            errorMessage => setError({ ...error, countOfGraph: errorMessage }),
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
        edges_number: edgesNumber,
        vertices_number: verticesNumber,
        graph_count: countOfGraph,
        show_edge_and_vertex: isEdgeAndVertexChecked,
        show_count: isCountChecked,
        graph_options: selectedGraphOptions,
        graph_type: selectedGraphType,
        character_options: selectedCharOptions,
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
        setEdgesNumber(initialState.edgesNumber)
        setCountOfGraph(initialState.countOfGraph)
        setError(initialState.error)
        setIsEdgeAndVertexChecked(initialState.isEdgeAndVertexChecked)
        setIsCountChecked(initialState.isCountChecked)
        setSelectedGraphOptions(initialState.selectedGraphOptions)
        setSelectedGraphType(initialState.selectedGraphType)
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

    const graphOptions = [
        'Include Arrow',
        'Include Weight',
        'Include Colon',
        'Include Character'
    ]
    const graphType = [
        'Weighted',
        'Directed',
        'Cycles',
        'Self Loops',
        'Multiple Edges'
    ]
    const charOptions = ['A-Z', 'a-z', '0-9', 'Special Characters']

    let characterType = !selectedGraphOptions.includes('Include Character')
    let size = characterType ? 5 : 4

    return (
        <div className='modal'>
            <div className={`grid grid-cols-1 sm:grid-cols-${size} gap-4`}>
                {!selectedGraphOptions.includes('Include Character') && (
                    <InputField
                        label='Min value'
                        value={minValue}
                        onChange={handleMinValueChange}
                        placeholder='Minimum'
                        error={error.minValue}
                        isRequired={true}
                    />
                )}
                {!selectedGraphOptions.includes('Include Character') && (
                    <InputField
                        label='Max Value'
                        value={maxValue}
                        onChange={handleMaxValueChange}
                        placeholder='Maximum'
                        error={error.maxValue}
                        isRequired={true}
                    />
                )}
                <InputField
                    label='Number of Edges'
                    value={edgesNumber}
                    onChange={handleEdgesValueChange}
                    placeholder='Edges'
                    error={error.edgesNumber}
                    isRequired={true}
                />
                <InputField
                    label='Number of Vertices'
                    value={verticesNumber}
                    onChange={handleVerticesValueChange}
                    placeholder='Vertices'
                    error={error.verticesNumber}
                    isRequired={true}
                />
                <InputField
                    label='Count of Graphs'
                    value={countOfGraph}
                    onChange={handleCountOfGraphChange}
                    placeholder='Count'
                    error={error.countOfGraph}
                    isRequired={true}
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
                <ToggleSwitch
                    checked={isCountChecked}
                    onChange={handleIsCountChecked}
                    rightLabel='Show Edge & Vertex'
                />
                <ToggleSwitch
                    checked={isEdgeAndVertexChecked}
                    onChange={handleIsEdgeAndVertexChecked}
                    rightLabel='Show count'
                />
            </div>
            <div className='grid sm:grid-cols-3 text-sm font-sm'>
                <MultiSelectDropdown
                    heading='Select Graph Options'
                    options={graphOptions}
                    onChange={handleGraphOptionsChange}
                    value={selectedGraphOptions}
                />
                <MultiSelectDropdown
                    heading='Select Graph type'
                    options={graphType}
                    onChange={handleGraphTypeChange}
                    value={selectedGraphType}
                />
                <MultiSelectDropdown
                    heading='Select Character type'
                    options={charOptions}
                    onChange={handleCharOptionsChange}
                    value={selectedGraphOptions}
                    disabled={characterType}
                />
            </div>

            <div>
                <ButtonGroup buttons={buttons} />
            </div>
        </div>
    )
}

GraphGeneratorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired
}

export default GraphGeneratorModal
