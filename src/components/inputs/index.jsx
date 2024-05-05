import PropTypes from 'prop-types'

function InputField({
    label,
    value,
    onChange,
    placeholder,
    error,
    isRequired,
    type
}) {
    return (
        <div>
            <label className='block text-base font-medium text-dark dark:text-black'>
                {label}
                {isRequired && <span className='text-red-500'>*</span>}
            </label>
            <input
                type={type || 'number'}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full bg-transparent rounded-md border ${
                    error ? 'border-red-500' : 'border-stroke'
                } dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary`}
            />
            {error && <p className='error text-red-500 text-xs'>{error}</p>}
        </div>
    )
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    isRequired: PropTypes.bool,
    type: PropTypes.string
}

InputField.defaultProps = {
    isRequired: false
}

export default InputField
