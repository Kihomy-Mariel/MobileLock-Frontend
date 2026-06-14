import apiClient from "./apiClient"

export const deviceService = {

    async list() {
        const res = await apiClient.get("/devices/list/")
        return res.data
    },

    async create(data) {
        const res = await apiClient.post("/devices/create/", data)
        return res.data
    },

    async detail(id) {
        const res = await apiClient.get(`/devices/detail/${id}/`)
        return res.data
    },

    async update(id, data) {
        const res = await apiClient.put(`/devices/update/${id}/`, data)
        return res.data
    },

    async remove(id) {
        const res = await apiClient.delete(`/devices/delete/${id}/`)
        return res.data
    },

    async verifyDevice(params) {
        const res = await apiClient.get("/devices/verify/", { params })
        return res.data
    },

    async getScanHistory() {
        const res = await apiClient.get("/devices/scan-history/")
        return res.data
    }
}