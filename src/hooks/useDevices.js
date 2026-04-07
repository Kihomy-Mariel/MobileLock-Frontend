import { useEffect, useState } from "react"
import { deviceRepository } from "../repositories/deviceRepository"

export default function useDevices() {

    const [devices, setDevices] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchDevices = async () => {
        try {
            const data = await deviceRepository.getDevices()
            setDevices(data)
        } catch (error) {
            console.error("Error cargando dispositivos", error)
        } finally {
            setLoading(false)
        }
    }

    const createDevice = async (device) => {
        const newDevice = await deviceRepository.createDevice(device)
        setDevices(prev => [...prev, newDevice])
    }

    const updateDevice = async (id_dispositivo, device) => {
        const updated = await deviceRepository.updateDevice(id_dispositivo, device)
        setDevices(prev =>
            prev.map(d => d.id_dispositivo === id_dispositivo ? updated : d)
        )
    }

    const deleteDevice = async (id_dispositivo) => {
        await deviceRepository.deleteDevice(id_dispositivo)
        setDevices(prev => prev.filter(d => d.id_dispositivo !== id_dispositivo))
    }

    useEffect(() => {
        fetchDevices()
    }, [])

    return {
        devices,
        loading,
        createDevice,
        updateDevice,
        deleteDevice
    }
}