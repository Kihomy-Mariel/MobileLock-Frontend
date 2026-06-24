import { Routes, Route } from "react-router-dom"

import WelcomePage from "../pages/Welcome/WelcomePage"
import { LoginPage } from "../pages/Login/LoginPage"
import DashboardPage from "../pages/Dashboard/DashboardPage"
import { ProfilePage } from "../pages/Profile/ProfilePage"
import { RegisterPage } from "../pages/Register/RegisterPage"
import DevicesPage from "../pages/Device/DevicesPage"
import VerifyPage from "../pages/Verify/VerifyPage"
import ScanHistoryPage from "../pages/Device/ScanHistoryPage"
import PublicVerifyPage from "../pages/PublicVerify/PublicVerifyPage"

import ProtectedRoute from "./ProtectedRoute"


export default function AppRouter() {

  return (

    <Routes>

      <Route path="/" element={<WelcomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/public-verify" element={<PublicVerifyPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/devices"
        element={
          <ProtectedRoute>
            <DevicesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/verify"
        element={
          <ProtectedRoute>
            <VerifyPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <ScanHistoryPage />
          </ProtectedRoute>
        }
      />

    </Routes>

  )
}