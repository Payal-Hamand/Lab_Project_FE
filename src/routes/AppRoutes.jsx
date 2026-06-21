import React from 'react'

import {
  Routes,
  Route
} from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import Admin from '../pages/Admin'
import Booking from '../pages/Booking'

import PackagesPage from '../pages/PackagesPage'

import ProtectedRoute from './ProtectedRoutes'
import TestsPage from '../pages/TestsPage'
import AdminDashboard from '../pages/AdminDashboard'
import LabAssistantDashboard from '../pages/LabAssistantDashboard'
import LabOwnerDashboard from '../pages/LabOwnerDashboard'
import ForgotPassword from '../pages/ForgotPassword'
import VerifyOtp from '../pages/VerifyOtp'
import ResetPassword from '../pages/ResetPassword'



const AppRoutes = () => {

  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />
      <Route
  path='/lab-owner'
  element={<LabOwnerDashboard />}
/>

      <Route
        path="/signup"
        element={<Signup />}
      />
      <Route
  path="/packages"
  element={<PackagesPage />}
/>
<Route
  path="/lab-assistant"
  element={
    <ProtectedRoute
      roles={['lab_assistant']}
    >
      <LabAssistantDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/tests"
  element={<TestsPage />}
/>
<Route
  path="/admin"
  element={
    <ProtectedRoute
      roles={['admin']}
    >
      <AdminDashboard />
    </ProtectedRoute>
  }
/>


      <Route
        path="/booking"
        element={
          
            <Booking />
          
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            roles={[
              'patient'
            ]}
          >
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/verify-otp"
  element={<VerifyOtp />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

      <Route
        path="/admin"
        element={
          <ProtectedRoute
            roles={[
              'admin'
            ]}
          >
            <Admin />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default AppRoutes