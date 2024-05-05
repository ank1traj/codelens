import React from 'react'

const NotFoundPage = () => {
    // Define a state to hold the dynamically imported image component
    const [Illustration404Component, setIllustration404Component] =
        React.useState(null)

    // Load the image dynamically
    React.useEffect(() => {
        const loadIllustration404 = async () => {
            const { default: Illustration404 } = await import(
                '@/assets/404.svg'
            )
            setIllustration404Component(() => Illustration404)
        }

        loadIllustration404()
    }, [])

    return (
        <section className='bg-white overflow-hidden overscroll-none m-20'>
            <div className='container px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12 m-40'>
                <div className='w-full lg:w-1/2'>
                    <p className='text-sm font-medium text-blue-500 dark:text-blue-400'>
                        404 error
                    </p>
                    <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
                        Page not found
                    </h1>
                    <p className='mt-4 text-gray-500 dark:text-gray-400'>
                        Sorry, the page you are looking for doesn&apos;t exist.
                        Here are some helpful links:
                    </p>
                    <div className='flex items-center mt-6 gap-x-3'>
                        <button className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700'>
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
                        <button className='w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600'>
                            <a href='/'>Take me home</a>
                        </button>
                    </div>
                </div>
                <div className='relative w-full mt-12 lg:w-1/2 lg:mt-0'>
                    {/* Render the image component if it's loaded */}
                    {Illustration404Component && (
                        <img
                            className='w-full max-w-lg lg:mx-auto'
                            src={Illustration404Component}
                            alt=''
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export default NotFoundPage
