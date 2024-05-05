import { useState, useEffect, useRef } from 'react'

const CookieNotice = () => {
    const [showCookieNotice, setShowCookieNotice] = useState(false)
    const [cookiesAccepted, setCookiesAccepted] = useState(false)
    const [showPreferencesModal, setShowPreferencesModal] = useState(false)
    const [preferences, setPreferences] = useState({
        analytics: false,
        marketing: false,
        preferences: false
    })

    const modalRef = useRef(null)

    useEffect(() => {
        import('./localStorageHandler').then(module => {
            const cookiesAccepted = module.default.getItem('cookiesAccepted')
            if (cookiesAccepted === 'true') {
                setCookiesAccepted(true)
            } else {
                setShowCookieNotice(true)
            }
        })
    }, [])

    useEffect(() => {
        import('./localStorageHandler').then(module => {
            const savedPreferences = JSON.parse(
                module.default.getItem('preferences')
            )
            if (savedPreferences) {
                setPreferences(savedPreferences)
            }
        })
    }, [])

    const acceptCookies = () => {
        setCookiesAccepted(true)
        setPreferences({
            analytics: true,
            marketing: true,
            preferences: true
        })
        setShowCookieNotice(false)
        import('./localStorageHandler').then(module => {
            module.default.setItem('cookiesAccepted', 'true')
        })
    }

    const rejectCookies = () => {
        setCookiesAccepted(false)
        setShowCookieNotice(false)
        import('./localStorageHandler').then(module => {
            module.default.setItem('cookiesAccepted', 'false')
        })
    }

    const handleCloseCookieNotice = () => {
        setShowCookieNotice(false)
        import('./localStorageHandler').then(module => {
            module.default.setItem('cookiesAccepted', 'true')
            setCookiesAccepted(true)
        })
    }

    const handleClosePreferencesModal = () => {
        setShowPreferencesModal(false)
        import('./localStorageHandler').then(module => {
            module.default.setItem('preferences', JSON.stringify(preferences))
        })
    }

    const togglePreference = preference => {
        setPreferences({
            ...preferences,
            [preference]: !preferences[preference]
        })
    }

    const handleClickOutside = event => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowPreferencesModal(false)
        }
    }

    const handleKeyDown = event => {
        if (event.key === 'Escape') {
            setShowPreferencesModal(false)
        }
    }

    useEffect(() => {
        if (showPreferencesModal) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleKeyDown)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [showPreferencesModal])

    useEffect(() => {
        if (
            cookiesAccepted ||
            preferences.analytics ||
            preferences.marketing ||
            preferences.preferences
        ) {
            setShowCookieNotice(false)
        }
    }, [cookiesAccepted, preferences])

    return (
        <>
            {showCookieNotice && (
                <section className='fixed max-w-md p-4 mx-auto bg-white border border-gray-200 left-12 bottom-16 rounded-2xl z-50'>
                    <button
                        onClick={handleCloseCookieNotice}
                        className='absolute top-2 right-2 focus:outline-none'
                    >
                        Close
                    </button>
                    <h2 className='font-semibold text-gray-800 '>
                        🍪 We use cookies!
                    </h2>
                    <p className='mt-4 text-sm text-gray-600'>
                        Hi, this website uses essential cookies to ensure its
                        proper operation and tracking cookies to understand how
                        you interact with it. The latter will be set only after
                        consent.{' '}
                        <a
                            href='#'
                            className='font-medium text-gray-700 underline transition-colors duration-300 dark:hover:text-blue-400 hover:text-blue-500'
                            onClick={() => setShowPreferencesModal(true)}
                        >
                            Let me choose
                        </a>
                        .
                    </p>
                    <p className='mt-3 text-sm text-gray-600'>
                        Closing this modal default settings will be saved.
                    </p>

                    <div className='grid grid-cols-2 gap-4 mt-4 shrink-0'>
                        <div className='col-span-1'>
                            <button
                                className='text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none w-full'
                                onClick={acceptCookies}
                            >
                                Accept all
                            </button>
                        </div>
                        <div className='col-span-1'>
                            <button
                                className='text-xs border text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-300 font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none w-full'
                                onClick={rejectCookies}
                            >
                                Reject all
                            </button>
                        </div>
                        <div className='col-span-2'>
                            <button
                                className='text-xs border text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-300 font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none w-full'
                                onClick={() => setShowPreferencesModal(true)}
                            >
                                Manage Cookies
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {showPreferencesModal && (
                <div className='fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50'>
                    <div
                        className='bg-white p-6 rounded-lg max-w-xl'
                        ref={modalRef}
                    >
                        <h2 className='text-lg font-semibold mb-4'>
                            Manage Preferences
                        </h2>
                        <div className='flex flex-col'>
                            <div className='flex items-center justify-between mb-2'>
                                <span>Analytics</span>
                                <label className='switch'>
                                    <input
                                        type='checkbox'
                                        checked={preferences.analytics}
                                        onChange={() =>
                                            togglePreference('analytics')
                                        }
                                    />
                                    <span className='slider round'></span>
                                </label>
                            </div>
                            <div className='flex items-center justify-between mb-2'>
                                <span>Marketing</span>
                                <label className='switch'>
                                    <input
                                        type='checkbox'
                                        checked={preferences.marketing}
                                        onChange={() =>
                                            togglePreference('marketing')
                                        }
                                    />
                                    <span className='slider round'></span>
                                </label>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span>Preferences</span>
                                <label className='switch'>
                                    <input
                                        type='checkbox'
                                        checked={preferences.preferences}
                                        onChange={() =>
                                            togglePreference('preferences')
                                        }
                                    />
                                    <span className='slider round'></span>
                                </label>
                            </div>
                        </div>
                        <button
                            className='bg-gray-900 text-white rounded-lg px-4 py-2 mt-4'
                            onClick={handleClosePreferencesModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default CookieNotice
