import { useState } from 'react'
import PropTypes from 'prop-types'

import ApiRequest from '@/components/api'

const IntegerGeneratorModal = ({ isOpen, data }) => {
  const initialState = {
    minValue: -100,
    maxValue: 1,
    numberOfIntegers: 1,
    integersLength: 1,
    error: {
      minValue: '',
      maxValue: '',
      numberOfIntegers: '',
      integersLength: ''
    },
    isLengthChecked: false,
    isNumberChecked: false
  }

  const [minValue, setMinValue] = useState(initialState.minValue)
  const [maxValue, setMaxValue] = useState(initialState.maxValue)
  const [countOfIntegers, setCountOfIntegers] = useState(
    initialState.numberOfIntegers
  )
  const [integersLength, setIntegersLength] = useState(
    initialState.integersLength
  )
  const [error, setError] = useState(initialState.error)
  const [isLengthChecked, setIsLengthChecked] = useState(
    initialState.isLengthChecked
  )
  const [isCountChecked, setIsCountChecked] = useState(
    initialState.isNumberChecked
  )

  const handleIsLengthChecked = () => {
    setIsLengthChecked(!isLengthChecked)
  }

  const handleIsNumberChecked = () => {
    setIsCountChecked(!isCountChecked)
  }

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

  const isValidIntegerLength = (minValue, maxValue, desiredLength) => {
    const countIntegers = num => {
      return num.toString().replace('-', '').length
    }

    const minLengthValue = countIntegers(minValue)
    const maxLengthValue = countIntegers(maxValue)

    if (minValue < 0 && maxValue > 0) {
      if (desiredLength > minLengthValue && desiredLength > maxLengthValue) {
        return 'Desired length is not valid for the given range'
      }
    } else if (minValue < 0 || maxValue < 0) {
      if (desiredLength > minLengthValue || desiredLength < maxLengthValue) {
        return 'Desired length is not valid for the given range'
      }
    } else {
      if (desiredLength < minLengthValue || desiredLength > maxLengthValue) {
        return 'Desired length is not valid for the given range'
      }
    }
    return null
  }

  const handleIntegersLengthChange = e => {
    const value = e.target.value.trim()

    const setErrorForValue = errorMessage => {
      setError({ ...error, integersLength: errorMessage })
    }

    setIntegersLength(value)

    if (value === '') {
      setErrorForValue('Length is required')
    } else {
      const parsedValue = parseInt(value)
      if (parsedValue === 0) {
        setErrorForValue('Length must be greater than 0')
      } else if (parsedValue < 0 || isNaN(parsedValue)) {
        setErrorForValue('Please enter a valid positive integer')
      } else {
        const min = parseInt(minValue)
        const max = parseInt(maxValue)
        const desiredLength = parsedValue
        const validationError = isValidIntegerLength(min, max, desiredLength)
        if (validationError !== null) {
          setErrorForValue(validationError)
        } else {
          setIntegersLength(parsedValue)
          setErrorForValue('')
        }
      }
    }
  }

  const handleCountOfIntegersChange = e => {
    const value = e.target.value.trim()

    const setErrorForValue = errorMessage => {
      setError({ ...error, numberOfIntegers: errorMessage })
    }

    setCountOfIntegers(value)

    if (value === '') {
      setErrorForValue('Count is required')
    } else {
      const parsedValue = parseInt(value)
      if (parsedValue === 0) {
        setErrorForValue('Count must be greater than 0')
      } else if (parsedValue < 0 || isNaN(parsedValue)) {
        setErrorForValue('Please enter a valid positive integer')
      } else if (parsedValue > 100000) {
        setErrorForValue('Value must not exceed 100,000')
      } else {
        setErrorForValue('')
      }
    }
  }

  const type = data.title
  const payloadData = {
    min_value: minValue,
    max_value: maxValue,
    desired_length: integersLength,
    count: countOfIntegers,
    show_length: isLengthChecked,
    show_count: isCountChecked,
    type: type
  }

  const handleGenerate = async () => {
    const setGeneratedData = data => {
      // Implement the logic to set the generated data
      console.log('Setting generated data:', data)
    }

    try {
      const capitalizedValue = 'Integer'

      const responseData = await ApiRequest(
        `generate${type}`, // Use capitalizedValue in the request
        'POST',
        payloadData
      )

      // Handle the response data as needed
      console.log(`Received data for ${capitalizedValue}:`, responseData)
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
    setCountOfIntegers(initialState.numberOfIntegers)
    setIntegersLength(initialState.integersLength)
    setError(initialState.error)
    setIsLengthChecked(initialState.isLengthChecked)
    setIsCountChecked(initialState.isNumberChecked)
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
            Integer&apos;s Length
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            placeholder='Length'
            value={integersLength}
            onChange={handleIntegersLengthChange}
            className={`w-full bg-transparent rounded-md border ${
              error.integersLength !== '' ? 'border-red-500' : 'border-stroke'
            } dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary`}
          />
          {error.integersLength && (
            <p className='error text-red-500 text-xs'>{error.integersLength}</p>
          )}
        </div>
        <div>
          <label className='block text-base font-medium text-dark dark:text-black'>
            Count of Integers
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            placeholder='Count'
            value={countOfIntegers}
            onChange={handleCountOfIntegersChange}
            className={`w-full bg-transparent rounded-md border ${
              error.numberOfIntegers !== '' ? 'border-red-500' : 'border-stroke'
            } dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary`}
          />
          {error.numberOfIntegers && (
            <p className='error text-red-500 text-xs'>
              {error.numberOfIntegers}
            </p>
          )}
        </div>
      </div>
      <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center px-5 my-4'>
        <input
          type='checkbox'
          name='autoSaver'
          className='sr-only'
          checked={isLengthChecked}
          onChange={handleIsLengthChecked}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isLengthChecked ? 'bg-[#088F8F]' : 'bg-[#FF5733]'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isLengthChecked ? 'translate-x-6' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-medium text-black'>
          Show Length
        </span>
      </label>
      <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center px-5 my-4'>
        <input
          type='checkbox'
          name='autoSaver'
          className='sr-only'
          checked={isCountChecked}
          onChange={handleIsNumberChecked}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isCountChecked ? 'bg-[#088F8F]' : 'bg-[#FF5733]'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isCountChecked ? 'translate-x-6' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-medium text-black'>
          Show Count
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

IntegerGeneratorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
}

export default IntegerGeneratorModal
