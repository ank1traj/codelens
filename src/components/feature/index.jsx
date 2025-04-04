import {
    RectangleStackIcon,
    AdjustmentsHorizontalIcon,
    ClockIcon
} from '@heroicons/react/20/solid'

const features = [
    {
        name: 'Effortless Testing:',
        description:
            'Seamlessly generate test cases, validate constraints, and analyze code coverage—all in one place.',
        icon: RectangleStackIcon
    },
    {
        name: 'Insightful Optimization:',
        description:
            "Gain deep insights into your code's performance and complexity, allowing you to refine your solutions effectively.",
        icon: AdjustmentsHorizontalIcon
    },
    {
        name: 'Personalized Toolset:',
        description:
            'Customize your toolkit to match your unique needs and preferences, ensuring a tailored coding experience for every programmer.',
        icon: ClockIcon
    }
]

export default function Feature() {
    return (
        <div className='overflow-hidden bg-white py-24 sm:py-32' id='features'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
                    <div className='lg:pr-8 lg:pt-4'>
                        <div className='lg:max-w-lg'>
                            <h2 className='text-base font-semibold leading-7 text-indigo-600'>
                                Elevate Your Coding Experience
                            </h2>
                            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                                Streamline Your Programming Journey
                            </p>
                            <p className='mt-6 text-lg leading-8 text-gray-600'>
                                Discover how our integrated platform enhances
                                your competitive programming experience:
                            </p>
                            <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                                {features.map(feature => (
                                    <div
                                        key={feature.name}
                                        className='relative pl-9'
                                    >
                                        <dt className='inline font-semibold text-gray-900'>
                                            <feature.icon
                                                className='absolute left-1 top-1 h-5 w-5 text-indigo-600'
                                                aria-hidden='true'
                                            />
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className='inline'>
                                            {feature.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <img
                        src='https://tailwindui.com/img/component-images/dark-project-app-screenshot.png'
                        alt='Product screenshot'
                        className='w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0'
                        width={2432}
                        height={1442}
                    />
                </div>
            </div>
        </div>
    )
}
