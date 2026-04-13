import apiClient from "./apiClient"
const AUTH_BASE_PATH = "/users/auth"

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
    const res = await apiClient.get("/users/profile/get/")
    return res.data
}

export const updateProfile = async (data) => {
    const res = await apiClient.put("/users/profile/update/", data)
    return res.data
}

export const upgradePlan = async (planId) => {
  const res = await apiClient.post("/users/plan/upgrade/", { plan_id: planId })
  return res.data
}