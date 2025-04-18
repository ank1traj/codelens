import { SignInButton } from '@clerk/clerk-react'
import comingSoonAnimation from '@/assets/lottie/comingsoon.json'
import Lottie from 'react-lottie-player'

const comingSoonPage = () => {
    return (
        <section className='bg-white justify-center items-center m-60'>
            <div className='max-w-lg px-6 py-12 mx-auto text-center'>
                <div className='flex flex-col items-center'>
                    <Lottie animationData={comingSoonAnimation} loop play />

                    <div className='flex justify-center items-center mt-6 space-x-3'>
                        <button className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-5 h-5 rtl:rotate-180'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                                />
                            </svg>
                            <span>Go back</span>
                        </button>
                        <SignInButton>
                            <button className='w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600'>
                                <a href='/'>Take me home</a>
                            </button>
                        </SignInButton>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default comingSoonPage
