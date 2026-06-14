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

    async deleteDevice(id) {
        return await deviceService.remove(id)
    },

    async verifyDevice(params) {
        return await deviceService.verifyDevice(params)
    },

    async getScanHistory() {
        return await deviceService.getScanHistory()
    }
}