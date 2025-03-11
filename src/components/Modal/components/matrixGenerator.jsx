import { useState } from 'react'
import PropTypes from 'prop-types'
import ApiRequest from '@/components/api'
import ToggleSwitch from '@/components/checkbox'
import ButtonGroup from '@/components/buttons'
import InputField from '@/components/inputs'

const MatrixGeneratorModal = ({ isOpen, data }) => {
    const initialState = {
        rows: 2,
        columns: 2,
        minValue: -100,
        maxValue: 100,
        isSparse: false,
        error: {
            rows: '',
            columns: '',
            minValue: '',
            maxValue: ''
        }
    }

    const [rows, setRows] = useState(initialState.rows)
    const [columns, setColumns] = useState(initialState.columns)
    const [minValue, setMinValue] = useState(initialState.minValue)
    const [maxValue, setMaxValue] = useState(initialState.maxValue)
    const [isSparse, setIsSparse] = useState(initialState.isSparse)
    const [error, setError] = useState(initialState.error)

    const handleChange = (value, setter, setErrorForValue, validationFn) => {
        const numericValue = parseInt(value, 10)
        setter(numericValue)
        if (isNaN(numericValue)) {
            setErrorForValue('Please enter a valid integer')
        } else {
            setErrorForValue(validationFn(numericValue))
        }
    }

    const handleGenerate = async () => {
        const payload = {
            rows,
            columns,
            min_value: minValue,
            max_value: maxValue,
            sparse: isSparse,
            type: data.title
        }
        try {
            const responseData = await ApiRequest(
                `generate${data.title}`,
                'POST',
                payload
            )
            console.log('Generated matrix:', responseData)
        } catch (error) {
            console.error('Error generating matrix:', error)
        }
    }

    const handleReset = () => {
        setRows(initialState.rows)
        setColumns(initialState.columns)
        setMinValue(initialState.minValue)
        setMaxValue(initialState.maxValue)
        setIsSparse(initialState.isSparse)
        setError(initialState.error)
    }

    if (!isOpen) return null

    return (
        <div className='modal'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <InputField
                    label='Rows'
                    value={rows}
                    onChange={e =>
                        handleChange(
                            e.target.value,
                            setRows,
                            msg => setError({ ...error, rows: msg }),
                            val => (val > 0 ? '' : 'Must be greater than 0')
                        )
                    }
                />
                <InputField
                    label='Columns'
                    value={columns}
                    onChange={e =>
                        handleChange(
                            e.target.value,
                            setColumns,
                            msg => setError({ ...error, columns: msg }),
                            val => (val > 0 ? '' : 'Must be greater than 0')
                        )
                    }
                />
                <InputField
                    label='Min Value'
                    value={minValue}
                    onChange={e =>
                        handleChange(
                            e.target.value,
                            setMinValue,
                            msg => setError({ ...error, minValue: msg }),
                            () => ''
                        )
                    }
                />
                <InputField
                    label='Max Value'
                    value={maxValue}
                    onChange={e =>
                        handleChange(
                            e.target.value,
                            setMaxValue,
                            msg => setError({ ...error, maxValue: msg }),
                            () => ''
                        )
                    }
                />
            </div>
            <ToggleSwitch
                checked={isSparse}
                onChange={() => setIsSparse(!isSparse)}
                rightLabel='Sparse Matrix'
            />
            <ButtonGroup
                buttons={[
                    { label: 'Generate', onClick: handleGenerate },
                    { label: 'Reset', onClick: handleReset }
                ]}
            />
        </div>
    )
}

MatrixGeneratorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired
}

export default MatrixGeneratorModal
