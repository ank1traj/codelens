import { useState } from 'react'
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ForwardIcon,
    ArrowUpOnSquareIcon
} from '@heroicons/react/24/outline'

import Modal from '@/components/Modal'
const TestHomePage = () => {
    const [modalData, setModalData] = useState(null)

    const links = [
        {
            title: 'Integer',
            description: 'Generate random integers',
            iconType: CheckCircleIcon,
            iconColor: 'text-green-500'
        },
        {
            title: 'String',
            description: 'Generate random string of characters',
            iconType: CheckCircleIcon,
            iconColor: 'text-green-500',
            size: '3xl'
        },
        {
            title: 'Array',
            description: 'Generate random array of integer & float values',
            iconType: CheckCircleIcon,
            iconColor: 'text-green-500'
        },
        {
            title: 'Palindrome',
            description: 'Generate random Palindrome of integer/char values',
            iconType: CheckCircleIcon,
            iconColor: 'text-green-500'
        },
        {
            title: 'Linked List',
            description: 'Generate random linked list of integer values',
            iconType: ArrowUpOnSquareIcon,
            iconColor: 'text-green-500'
        },
        {
            title: 'Binary Tree',
            description: 'Generate random binary tree of integer values',
            iconType: ExclamationCircleIcon,
            iconColor: 'text-red-500'
        },
        {
            title: 'Graph',
            description: 'Generate random graph of integer/char values',
            iconType: ForwardIcon,
            iconColor: 'text-blue-500'
        },
        {
            title: 'Matrix',
            description: 'Generate random Matrix of integer/char values',
            iconType: ForwardIcon,
            iconColor: 'text-blue-500'
        }
    ]

    const openModal = data => {
        setModalData(data)
    }

    const closeModal = () => {
        setModalData(null)
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {links.map((link, index) => (
                    <div
                        key={index}
                        className='flex flex-col items-center transform rounded-xl bg-white shadow-xl transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-violet-100'
                        style={{ width: '12rem' }}
                    >
                        <button
                            onClick={() => openModal(link)}
                            className='p-4 outline-none'
                        >
                            <div className='flex items-center justify-center'>
                                <link.iconType
                                    className={`w-8 h-8 ${link.iconColor}`}
                                />
                            </div>
                            <div className='text-center'>
                                <h3 className='text-lg font-semibold mb-1'>
                                    {link.title}
                                </h3>
                                <p className='text-sm text-gray-600'>
                                    {link.description}
                                </p>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={modalData !== null}
                onClose={closeModal}
                data={modalData}
                links={links}
                size={modalData?.size || '3xl'}
            />

            <div className='iconInfo flex items-center justify-center mt-8'>
                <ul className='flex items-center justify-between w-full'>
                    <li className='flex items-center'>
                        <CheckCircleIcon
                            style={{ color: 'green' }}
                            className='w-8 h-8'
                        />
                        <span className='iconLabel text-xs ml-2'>
                            Completed
                        </span>
                    </li>
                    <li className='flex items-center px-8'>
                        <ExclamationCircleIcon
                            style={{ color: 'red' }}
                            className='w-8 h-8'
                        />
                        <span className='iconLabel text-xs ml-2'>
                            Not Started yet
                        </span>
                    </li>
                    <li className='flex items-center px-8'>
                        <ArrowUpOnSquareIcon
                            style={{ color: 'green' }}
                            className='w-8 h-8'
                        />
                        <span className='iconLabel text-xs ml-2'>
                            In Progress
                        </span>
                    </li>
                    <li className='flex items-center px-8'>
                        <ForwardIcon
                            style={{ color: 'blue' }}
                            className='w-8 h-8'
                        />
                        <span className='iconLabel text-xs ml-2'>Next</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TestHomePage
