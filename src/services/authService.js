import apiClient from "./apiClient"
const AUTH_BASE_PATH = "/users/auth"
const PROFILE_ENDPOINTS = ["/users/me/", "/users/users/me/"]

export const register = async (userData) => {

  const response = await apiClient.post(`${AUTH_BASE_PATH}/register/`, userData)

  return response.data
}

export const login = async (email, password) => {
  const response = await apiClient.post(`${AUTH_BASE_PATH}/login/`, {
    correo_electronico: email,
    password: password
  })

  return response.data
}

export const logout = async () => {
  const refresh = localStorage.getItem("refreshToken")

  if (!refresh) {
    return { message: "Logout local" }
  }

  const response = await apiClient.post(`${AUTH_BASE_PATH}/logout/`, { refresh })
  return response.data
}

export const getProfile = async () => {
  let lastError = null

  for (const endpoint of PROFILE_ENDPOINTS) {
    try {
      const response = await apiClient.get(endpoint)
      return response.data
    } catch (error) {
      if (error.response?.status !== 404) {
        throw error
      }

      lastError = error
    }
  }

  throw lastError
}