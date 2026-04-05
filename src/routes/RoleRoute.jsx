import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function RoleRoute({ children, role }) {

  const { user } = useAuth()

  if (!user || user.role !== role) {
    return <Navigate to="/dashboard" />
  }

  return children
}