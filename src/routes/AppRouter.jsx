import { Routes, Route } from "react-router-dom"

import WelcomePage from "../pages/Welcome/WelcomePage"
import { LoginPage } from "../pages/Login/LoginPage"
import DashboardPage from "../pages/Dashboard/DashboardPage"
import { ProfilePage } from "../pages/Profile/ProfilePage"
import { RegisterPage } from "../pages/Register/RegisterPage"

import ProtectedRoute from "./ProtectedRoute"


export default function AppRouter() {

  return (

    <Routes>

      <Route path="/" element={<WelcomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

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

    </Routes>

  )
}