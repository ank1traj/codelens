import PropTypes from 'prop-types'
const ArrayGeneratorModal = ({ isOpen }) => {
  if (!isOpen) return null

  return (
    <div className='modal'>
      <h2>Array</h2>
      <input
        type='text'
        value='100'
        placeholder='Enter your value'
        className='px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
      />
    </div>
  )
}

ArrayGeneratorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

export default ArrayGeneratorModal
