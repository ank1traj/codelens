import { useEffect } from 'react'
import PropTypes from 'prop-types'
import IntegerGeneratorModal from '@/components/Modal/components/integerGenerator.jsx'
import ArrayGeneratorModal from '@/components/Modal/components/arrayGenerator.jsx'
import StringGeneratorModal from '@/components/Modal/components/stringGenerator.jsx'

const Modal = ({ isOpen, onClose, links, data }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = event => {
      if (!event.target.closest('.modal-content')) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !data) return null

  // Find the corresponding link object based on the data title
  const link = links.find(item => item.title === data.title)

  if (!link) return null // Handle the case when the corresponding link is not found
  const { title } = link

  return (
    <div className='modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50'>
      <div className='modal-overlay absolute w-full h-full bg-gray-900 opacity-50'></div>

      <div className='modal-container bg-white w-11/12 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto'>
        <div className='modal-content py-4 text-left px-6'>
          <div className='flex justify-between items-center pb-3'>
            <p className='text-lg font-semibold'>{title}</p>
            <button
              onClick={onClose}
              className='modal-close cursor-pointer z-50'
            >
              <svg
                className='fill-current text-black'
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 18 18'
              >
                <path
                  d='M6.707 6.707a1 1 0 0 1-1.414 0L1.293 2.121a1 1 0 1 1 1.414-1.414L6.707 5.293l4.586-4.586a1 1 0 1 1 1.414 1.414L8.121 6.707l4.586 4.586a1 1 0 1 1-1.414 1.414L6.707 8.121l4.586 4.586a1 1 0 1 1-1.414 1.414L8.121 6.707l4.586-4.586a1 1 0 1 1 1.414-1.414L6.707 5.293l-4.586-4.586a1 1 0 1 1-1.414-1.414L5.293 6.707l-4.586 4.586a1 1 0 1 1 1.414 1.414L6.707 8.121l4.586 4.586a1 1 0 1 1-1.414 1.414L8.121 6.707l4.586-4.586a1 1 0 1 1 1.414-1.414L6.707 5.293l-4.586-4.586a1 1 0 1 1-1.414-1.414L5.293 6.707l-4.586 4.586a1 1 0 1 1 1.414 1.414L6.707 8.121l4.586 4.586a1 1 0 1 1-1.414 1.414L8.121 6.707l4.586-4.586a1 1 0 1 1 1.414-1.414L6.707 5.293l-4.586-4.586a1 1 0 1 1-1.414-1.414L5.293 6.707l-4.586 4.586a1 1 0 1 1 1.414 1.414L6.707 8.121l4.586 4.586a1 1 0 1 1-1.414 1.414L8.121 6.707l4.586-4.586a1 1 0 1 1 1.414-1.414L6.707 5.293l-4.586-4.586a1 1 0 1 1-1.414-1.414L5.293 6.707l-4.586 4.586a1 1 0 1 1 1.414 1.414L6.707 8.121l4.586 4.586a1 1 0 1 1-1.414 1.414L8.121 6.707l4.586-4.586a1 1 0 1 1 1.414-1.414L6.707 5.293l-4.586 4.586a1 1 0 1 1 1.414 1.414L8.121 8.121l4.586 4.586a1 1 0 0 1-1.414 1.414L6.707 9.536l-4.586 4.586a1 1 0 0 1-1.414-1.414L5.293 8.121 0.707 3.535a1 1 0 1 1 1.414-1.414L6.707 6.707z'
                  fillRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
          {title === 'Integer' && (
            <IntegerGeneratorModal isOpen={isOpen} data={data} />
          )}
          {title === 'Array' && (
            <ArrayGeneratorModal isOpen={isOpen} data={data} />
          )}
          {title === 'String' && <StringGeneratorModal isOpen={isOpen} />}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  links: PropTypes.array.isRequired,
  data: PropTypes.object
}

export default Modal
