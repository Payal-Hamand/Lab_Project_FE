import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoutes'
import { Spinner } from '@/components/ui/Loader'
import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'

const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const Signup = lazy(() => import('@/pages/Signup'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Booking = lazy(() => import('@/pages/Booking'))
const PackagesPage = lazy(() => import('@/pages/PackagesPage'))
const TestsPage = lazy(() => import('@/pages/TestsPage'))
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'))
const LabAssistantDashboard = lazy(() => import('@/pages/LabAssistantDashboard'))
const LabOwnerDashboard = lazy(() => import('@/pages/LabOwnerDashboard'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
const VerifyOtp = lazy(() => import('@/pages/VerifyOtp'))
const ResetPassword = lazy(() => import('@/pages/ResetPassword'))
const AboutUs = lazy(() => import('@/pages/AboutUs'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ROUTES.LAB_OWNER}
          element={
            <ProtectedRoute roles={[ROLES.LAB_OWNER]}>
              <LabOwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.ABOUT} element={<AboutUs />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.PACKAGES} element={<PackagesPage />} />
        <Route
          path={ROUTES.LAB_ASSISTANT}
          element={
            <ProtectedRoute roles={[ROLES.LAB_ASSISTANT]}>
              <LabAssistantDashboard />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.TESTS} element={<TestsPage />} />
        <Route
          path={ROUTES.ADMIN}
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.BOOKING} element={<Booking />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute roles={[ROLES.PATIENT]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.VERIFY_OTP} element={<VerifyOtp />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      </Routes>
    </Suspense>
  )
}
export default AppRoutes
