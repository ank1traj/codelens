import PropTypes from 'prop-types'

function ButtonGroup({ buttons }) {
    return (
        <div className='font-[sans-serif] space-x-4 space-y-4 text-center'>
            {buttons.map((button, index) => (
                <button
                    key={index}
                    type='button'
                    className={`px-6 py-2 rounded-lg text-sm tracking-wider font-medium outline-none ${button.classNames} transition-all duration-300 `}
                    onClick={button.onClick}
                    disabled={button.disabled}
                >
                    {button.label}
                </button>
            ))}
        </div>
    )
}

ButtonGroup.propTypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
            disabled: PropTypes.bool,
            classNames: PropTypes.string
        })
    ).isRequired
}

export default ButtonGroup
