import { SignInButton } from '@clerk/clerk-react'
import error500Animation from '@/assets/lottie/error500.json'
import Lottie from 'react-lottie-player'

const serverErrorPage = () => {
    return (
        <section className='bg-white justify-center items-center'>
            <div className='max-w-lg px-6 py-12 mx-auto text-center'>
                <div className='flex flex-col items-center'>
                    <Lottie animationData={error500Animation} loop play />

                    <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
                        Oops! Something went wrong.
                    </h1>
                    <p className='mt-4 text-gray-500 dark:text-gray-400'>
                        We&apos;re sorry, but there was an internal server
                        error.
                    </p>
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

export default serverErrorPage
