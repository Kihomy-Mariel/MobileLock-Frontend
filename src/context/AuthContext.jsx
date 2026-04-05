import { createContext, useContext, useState, useEffect } from "react"
import * as authService from "../services/authService"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("accessToken"))
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const initAuth = async () => {

            try {

                if (token) {
                    const profile = await authService.getProfile()
                    setUser(profile)
                }

            } catch (error) {

                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                setToken(null)
                setUser(null)

            } finally {
                setLoading(false)
            }

        }

        initAuth()

    }, [])

    const login = async (email, password) => {

        const data = await authService.login(email, password)

        localStorage.setItem("accessToken", data.access)
        localStorage.setItem("refreshToken", data.refresh)

        const profile = await authService.getProfile()

        setToken(data.access)
        setUser(profile)
    }

    const logout = async () => {

        try {
            await authService.logout()
        } catch { }

        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")

        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)