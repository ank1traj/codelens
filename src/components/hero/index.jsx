export default function Hero() {
    return (
        <div className='bg-white'>
            <div className='relative isolate px-6 pt-14 lg:px-8'>
                <div
                    className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
                    aria-hidden='true'
                >
                    <div
                        className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                        }}
                    />
                </div>
                <span className='inline-flex items-center rounded-full bg-violet-50 px-2 py-1 text-xs font-medium text-violet-600 ring-1 ring-inset ring-gray-500/10 border border-violet-600'>
                    <span className='inline-block h-2 w-2 rounded-full bg-violet-600 mr-1'></span>
                    What&apos;s New
                </span>
                <span className='inline-block w-4'></span>
                <a href='' className='text-xs font-semibold text-gray-600'>
                    Just shipped v2.0
                </a>
                <span className='inline-block w-8 text-xs font-semibold text-gray-400'>
                    &gt;
                </span>
                <div className='mx-auto max-w-2xl py-8 sm:py-48 lg:py-8'>
                    <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
                        <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                            Exciting News: Unveiling Our Revamped UI/UX
                            Experience!{' '}
                            <a
                                href='#'
                                className='font-semibold text-indigo-600'
                            >
                                <span
                                    className='absolute inset-0'
                                    aria-hidden='true'
                                />
                                Read more <span aria-hidden='true'>&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className='text-center'>
                        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                            CodeLens: Elevate Your Coding Experience
                        </h1>
                        <p className='mt-6 text-lg leading-8 text-gray-600'>
                            Unlocking the Full Potential of Your Code
                        </p>
                        <p className='mt-3 text-lg leading-8 text-gray-500'>
                            CodeLens is a comprehensive platform designed to
                            elevate your competitive programming experience.
                            With a suite of powerful tools at your disposal,
                            including test case generation, constraint
                            validation, solution optimization, code coverage
                            analysis, and automated evaluation, CodeLens enables
                            you to delve deep into your code, uncover insights,
                            and enhance your problem-solving skills.
                        </p>
                        <div className='mt-10 flex items-center justify-center gap-x-6'>
                            <a
                                href='#'
                                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                Get started
                            </a>
                            <a
                                href='#'
                                className='text-sm font-semibold leading-6 text-gray-900'
                            >
                                View on GitHub <span aria-hidden='true'>→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
                    aria-hidden='true'
                >
                    <div
                        className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
