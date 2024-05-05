import PropTypes from 'prop-types'

function ToggleSwitch({ checked, onChange, leftLabel, rightLabel }) {
    // Set default values for labels if they are not provided
    leftLabel = leftLabel || ''
    rightLabel = rightLabel || ''

    return (
        <div className='flex my-4'>
            {leftLabel && (
                <span className='label flex text-sm font-medium text-black mr-3'>
                    {leftLabel}
                </span>
            )}
            <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none '>
                <input
                    type='checkbox'
                    name='autoSaver'
                    className='sr-only'
                    checked={checked}
                    onChange={onChange}
                />
                <span
                    className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                        checked ? 'bg-[#088F8F]' : 'bg-[#FF5733]'
                    }`}
                >
                    <span
                        className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                            checked ? 'translate-x-6' : ''
                        }`}
                    ></span>
                </span>
            </label>
            {rightLabel && (
                <span className='label flex text-sm font-medium text-black'>
                    {rightLabel}
                </span>
            )}
        </div>
    )
}

ToggleSwitch.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    leftLabel: PropTypes.string,
    rightLabel: PropTypes.string
}

export default ToggleSwitch
