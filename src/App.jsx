import './App.css'
import { useEffect } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Protect } from '@clerk/clerk-react'

import Header from '@/components/headers/index'
import Footer from '@/components/footer'
import Hero from '@/components/hero/index'
import Feature from '@/components/feature'
import Pricing from '@/components/pricing'
import Team from '@/components/team'
import CallToAction from '@/components/cta'
import CookieNotice from '@/components/cookies'

import NotFoundPage from '@/components/error/404'
import ForbiddenPage from '@/components/error/403'
import ComingSoonPage from '@/components/comingSoon'

import TestMaker from '@/pages/testmaker'

import * as Sentry from '@sentry/browser'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/clerk-react'

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN
if (!SENTRY_DSN) {
  throw new Error('Missing Sentry DSN Key')
}
Sentry.init({
  dsn: SENTRY_DSN,
  environment: import.meta.env.SENTRY_ENVIRONMENT || 'development',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false
    }),
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      showBranding: false,
      colorScheme: 'system'
    })
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

function App() {
  const { isSignedIn, user } = useUser()
  useEffect(() => {
    const initializeSentry = () => {
      const userFeedback = {
        event_id: uuidv4(),
        name: isSignedIn ? user?.fullName || '' : '',
        email: isSignedIn ? user?.primaryEmailAddress?.emailAddress || '' : ''
      }

      Sentry.setUser({
        id: userFeedback.event_id,
        username: userFeedback.name,
        email: userFeedback.email
      })

      Sentry.captureMessage('User Feedback', {
        user: userFeedback
      })
    }

    if (isSignedIn !== undefined) {
      initializeSentry()
    }
  }, [isSignedIn, user])

  return (
    <BrowserRouter>
      <Header /> {/* Render Header component everywhere */}
      <CookieNotice />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Hero />
              <Feature />
              <Pricing />
              <Team />
              <CallToAction />
              <Footer />
            </>
          }
        />
        <Route
          path='/testmaker'
          element={
            <Protect fallback=<ForbiddenPage />>
              <TestMaker />
            </Protect>
          }
        />
        {/* Route for handling unmatched paths */}
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/comingSoon' element={<ComingSoonPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
