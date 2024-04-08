import { useEffect } from 'react'

import LogRocket from 'logrocket'
import { useUser } from '@clerk/clerk-react'

import TestHomePage from '@/components/codeLens/testcase/homePage'
import Hero from '@/components/codeLens/testcase/hero'

const TestMaker = () => {
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    const initializeLogRocket = () => {
      if (import.meta.env.ENVIRONMENT !== 'development') {
        LogRocket.init(import.meta.env.VITE_LOGROCKET_APP_ID)
      }
    }

    const identifyLogRocket = () => {
      const logRocketID = user?.primaryEmailAddress?.emailAddress

      LogRocket.identify(logRocketID, {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress
      })
    }

    if (isSignedIn !== undefined) {
      initializeLogRocket()
      identifyLogRocket()
    }
  }, [isSignedIn, user])

  return (
    <>
      <Hero />
      <TestHomePage />
    </>
  )
}

export default TestMaker
