// import React from 'react'
// import { Routes, Route } from 'react-router-dom'

// import Home from '../pages/Home'
// import Login from '../pages/Login'
// import Signup from '../pages/Signup'
// import Booking from '../pages/Booking'
// import Dashboard from '../pages/Dashboard'
// import Admin from '../pages/Admin'

// import ProtectedRoute from './ProtectedRoutes'

// const AppRoutes = () => {
//   return (
//     <Routes>

//       <Route path="/" element={<Home />} />

//       <Route path="/login" element={<Login />} />

//       <Route path="/signup" element={<Signup />} />

//       <Route path="/booking" element={<Booking />} />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute>
//             <Admin />
//           </ProtectedRoute>
//         }
//       />

//     </Routes>
//   )
// }

// export default AppRoutes



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
import VerifyReport from '../pages/VerifyReport'
import AdminDashboard from '../pages/AdminDashboard'
import LabAssistantDashboard from '../pages/LabAssistantDashboard'

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
  path="/verify-report"
  element={<VerifyReport />}
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