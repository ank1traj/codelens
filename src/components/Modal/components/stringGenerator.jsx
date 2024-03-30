import PropTypes from 'prop-types'
const StringGeneratorModal = ({ isOpen }) => {
  if (!isOpen) return null

  return <div className='modal'>{/* <h2>String</h2> */}</div>
}

StringGeneratorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

export default StringGeneratorModal
