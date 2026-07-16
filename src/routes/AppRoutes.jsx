import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Dashboard from '@/pages/Dashboard'
import Booking from '@/pages/Booking'
import PackagesPage from '@/pages/PackagesPage'
import ProtectedRoute from './ProtectedRoutes'
import TestsPage from '@/pages/TestsPage'
import AdminDashboard from '@/pages/AdminDashboard'
import LabAssistantDashboard from '@/pages/LabAssistantDashboard'
import LabOwnerDashboard from '@/pages/LabOwnerDashboard'
import ForgotPassword from '@/pages/ForgotPassword'
import VerifyOtp from '@/pages/VerifyOtp'
import ResetPassword from '@/pages/ResetPassword'
import AboutUs from '@/pages/AboutUs'
import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'
const AppRoutes = () => {
  return (
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
  )
}
export default AppRoutes
