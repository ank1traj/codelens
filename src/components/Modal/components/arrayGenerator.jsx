import { useState } from 'react'
import PropTypes from 'prop-types'

import ApiRequest from '@/components/api'

const ArrayGeneratorModal = ({ isOpen, data }) => {
  const initialState = {
    minValue: -100,
    maxValue: 1,
    arraySize: 1,
    numberOfArray: 1,
    error: {
      minValue: '',
      maxValue: '',
      arraySize: '',
      numberOfArray: ''
    },
    isFloatChecked: false,
    isRandomSizeChecked: false
  }

  const [minValue, setMinValue] = useState(initialState.minValue)
  const [maxValue, setMaxValue] = useState(initialState.maxValue)
  const [arraySize, setArraySize] = useState(initialState.arraySize)
  const [numberOfArray, setNumberOfArray] = useState(initialState.numberOfArray)
  const [error, setError] = useState(initialState.error)
  const [isFloatChecked, setIsFloatChecked] = useState(
    initialState.isFloatChecked
  )
  const [isRandomSizeChecked, setIsRandomSizeChecked] = useState(
    initialState.isRandomSizeChecked
  )

  const handleMinValueChange = e => {
    const value = e.target.value.trim()

    const setErrorForValue = errorMessage => {
      setError({ ...error, minValue: errorMessage })
    }

    setMinValue(value)

    if (value === '') {
      setErrorForValue('Min Value is required')
    } else {
      const parsedValue = parseInt(value)
      if (!isNaN(parsedValue)) {
        if (Math.abs(parsedValue) > 100000) {
          setErrorForValue('Value cannot exceed 100,000')
        } else if (parsedValue > maxValue) {
          setErrorForValue('Min value must be less than or equal to max value')
        } else {
          setErrorForValue('')
        }
      } else {
        setErrorForValue('Please enter a valid integer')
      }
    }
  }

  const handleMaxValueChange = e => {
    const value = e.target.value.trim()

    const setErrorForValue = errorMessage => {
      setError({ ...error, maxValue: errorMessage })
    }

    setMaxValue(value)

    if (value === '') {
      setErrorForValue('Max Value is required')
    } else {
      const parsedValue = parseInt(value)
      if (!isNaN(parsedValue)) {
        if (Math.abs(parsedValue) > 100000) {
          setErrorForValue('Value cannot exceed 100,000')
        } else if (parsedValue < minValue) {
          setErrorForValue(
            'Max value must be greater than or equal to min value'
          )
        } else {
          setErrorForValue('')
        }
      } else {
        setErrorForValue('Please enter a valid integer')
      }
    }
  }

  const handleIsFloatValue = () => {
    setIsFloatChecked(!isFloatChecked)
  }

  const handleIsRandomSize = () => {
    setIsRandomSizeChecked(!isRandomSizeChecked)
  }

  const handleArraySize = e => {
    const value = e.target.value.trim()

    const setErrorForValue = errorMessage => {
      setError({ ...error, arraySize: errorMessage })
    }

    setArraySize(value)

    if (value === '') {
      setErrorForValue('Size is required')
    } else {
      const parsedValue = parseInt(value)
      if (parsedValue === 0) {
        setErrorForValue('Size must be greater than 0')
      } else if (parsedValue < 1 || isNaN(parsedValue)) {
        setErrorForValue('Please enter a valid positive integer')
      } else if (parsedValue > 100000) {
        setErrorForValue('Size must not exceed 100,000')
      } else {
        setErrorForValue('')
      }
    }
  }

  const handleNumberOfArray = e => {
    const value = e.target.value.trim()

    const setErrorForValue = errorMessage => {
      setError({ ...error, numberOfArray: errorMessage })
    }

    setNumberOfArray(value)

    if (value === '') {
      setErrorForValue('Number is required')
    } else {
      const parsedValue = parseInt(value)
      if (parsedValue === 0) {
        setErrorForValue('Number must be greater than 0')
      } else if (parsedValue < 1 || isNaN(parsedValue)) {
        setErrorForValue('Please enter a valid positive integer')
      } else if (parsedValue > 100000) {
        setErrorForValue('Number must not exceed 100,000')
      } else {
        setErrorForValue('')
      }
    }
  }

  const type = data.title
  const payloadData = {
    min_value: minValue,
    max_value: maxValue,
    desired_length: arraySize,
    count: numberOfArray,
    is_float: isFloatChecked,
    random_size: isRandomSizeChecked,
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
    setArraySize(initialState.arraySize)
    setNumberOfArray(initialState.numberOfArray)
    setError(initialState.error)
    setIsFloatChecked(initialState.isFloatChecked)
    setIsRandomSizeChecked(initialState.isRandomSizeChecked)
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

  return (
    <div className='modal'>
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
        <div>
          <label className='block text-base font-medium text-dark dark:text-black'>
            Min Value<span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            placeholder='Minimum'
            value={minValue}
            onChange={handleMinValueChange}
            className={`w-full bg-transparent rounded-md border ${
              error.minValue !== '' ? 'border-red-500' : 'border-stroke'
            } dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary`}
          />
          {error.minValue && (
            <p className='error text-red-500 text-xs'>{error.minValue}</p>
          )}
        </div>
        <div>
          <label className='block text-base font-medium text-dark dark:text-black'>
            Max Value<span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            placeholder='Maximum'
            value={maxValue}
            onChange={handleMaxValueChange}
            className={`w-full bg-transparent rounded-md border ${
              error.maxValue !== '' ? 'border-red-500' : 'border-stroke'
            } dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary`}
          />
          {error.maxValue && (
            <p className='error text-red-500 text-xs'>{error.maxValue}</p>
          )}
        </div>
        <div>
          <label className='block text-base font-medium text-dark dark:text-black'>
            Array&apos;s Size
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            placeholder='Size'
            value={arraySize}
            onChange={handleArraySize}
            className={`w-full bg-transparent rounded-md border ${
              error.arraySize !== '' ? 'border-red-500' : 'border-stroke'
            } dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary`}
          />
          {error.arraySize && (
            <p className='error text-red-500 text-xs'>{error.arraySize}</p>
          )}
        </div>
        <div>
          <label className='block text-base font-medium text-dark dark:text-black'>
            Number of Arrays
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            placeholder='Number'
            value={numberOfArray}
            onChange={handleNumberOfArray}
            className={`w-full bg-transparent rounded-md border ${
              error.numberOfArray !== '' ? 'border-red-500' : 'border-stroke'
            } dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary`}
          />
          {error.numberOfArray && (
            <p className='error text-red-500 text-xs'>{error.numberOfArray}</p>
          )}
        </div>
      </div>
      <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center px-5 my-4'>
        <input
          type='checkbox'
          name='autoSaver'
          className='sr-only'
          checked={isFloatChecked}
          onChange={handleIsFloatValue}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isFloatChecked ? 'bg-[#088F8F]' : 'bg-[#FF5733]'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isFloatChecked ? 'translate-x-6' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-medium text-black'>
          Float Value
        </span>
      </label>
      <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center px-5 my-4'>
        <input
          type='checkbox'
          name='autoSaver'
          className='sr-only'
          checked={isRandomSizeChecked}
          onChange={handleIsRandomSize}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isRandomSizeChecked ? 'bg-[#088F8F]' : 'bg-[#FF5733]'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isRandomSizeChecked ? 'translate-x-6' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-medium text-black'>
          Random Size
        </span>
      </label>
      <div className='font-[sans-serif] space-x-4 space-y-4 text-center'>
        <button
          type='button'
          className={`px-6 py-2 rounded-lg text-black text-sm tracking-wider font-medium outline-none border-2 border-blue-600 transition-all duration-300 ${
            hasErrors
              ? 'bg-gray-300 border-gray-400 text-gray-600 cursor-not-allowed'
              : 'hover:bg-blue-600 hover:text-white'
          }`}
          onClick={handleGenerate}
          disabled={hasErrors}
        >
          Generate
        </button>
        <button
          type='button'
          className='px-6 py-2 rounded-lg text-black text-sm tracking-wider font-medium outline-none border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300'
          onClick={handleCopy}
        >
          Copy
        </button>
        <button
          type='button'
          className='px-6 py-2 rounded-lg text-black text-sm tracking-wider font-medium outline-none border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300'
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type='button'
          className='px-6 py-2 rounded-lg text-black text-sm tracking-wider font-medium outline-none border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300'
          onClick={handleDownload}
        >
          Download
        </button>
        <button
          type='button'
          className='px-6 py-2 rounded-lg text-black text-sm tracking-wider font-medium outline-none border-2 border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300'
          onClick={handleSendToEmail}
        >
          Send to Email
        </button>
      </div>
    </div>
  )
}

ArrayGeneratorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
}

ArrayGeneratorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

export default ArrayGeneratorModal
