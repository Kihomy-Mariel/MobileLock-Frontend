import { deviceService } from "../services/deviceService"

export const deviceRepository = {

    async getDevices() {
        return await deviceService.list()
    },

    async createDevice(device) {
        return await deviceService.create(device)
    },

    async updateDevice(id, device) {
        return await deviceService.update(id, device)
    },

    async reportDeviceState(id, estado) {
        return await deviceService.reportState(id, estado)
    },

    async deleteDevice(id) {
        return await deviceService.remove(id)
    },

    async verifyDevice(params) {
        return await deviceService.verifyDevice(params)
    },

    async verifyDevicePhysical(data) {
        return await deviceService.verifyDevicePhysical(data)
    },

    async getScanHistory() {
        return await deviceService.getScanHistory()
    },

    async getTraceability(id) {
        return await deviceService.getTraceability(id)
    },

    async verifyPublicDevice(imei) {
        return await deviceService.verifyPublicDevice(imei)
    }
}