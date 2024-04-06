import { useEffect } from 'react'

import LogRocket from 'logrocket'
import { useUser } from '@clerk/nextjs'
import { v4 as uuidv4 } from 'uuid'

import TestHomePage from '@/components/codeLens/testcase/homePage'
import Hero from '@/components/codeLens/testcase/hero'

const TestMaker = () => {
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    const initializeLogRocket = () => {
      LogRocket.init(import.meta.env.VITE_LOGROCKET_APP_ID)
    }

    const identifyLogRocket = () => {
      const logRocketID = isSignedIn
        ? user?.primaryEmailAddress?.emailAddress || `guest-${uuidv4()}`
        : uuidv4()

      LogRocket.identify(logRocketID, {
        name: isSignedIn ? user?.fullName || 'Guest' : 'Anonymous User',
        email: isSignedIn
          ? user?.primaryEmailAddress?.emailAddress || 'Anonymous User'
          : uuidv4()
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
