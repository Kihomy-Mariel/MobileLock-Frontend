import { useEffect, useState } from "react"
import { getProfile, updateProfile } from "../services/authService"

export default function useProfile() {

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = async () => {
        try {
            setLoading(true)
            const data = await getProfile()
            setProfile(data)
        } catch (error) {
            console.error("Error loading profile", error)
        } finally {
            setLoading(false)
        }
    }

    const saveProfile = async (data) => {
        try {
            setSaving(true)
            await updateProfile(data) // guardamos cambios
            await loadProfile()       // recargamos todo el perfil desde la API
        } catch (error) {
            console.error("Error updating profile", error)
        } finally {
            setSaving(false)
        }
    }

    return {
        profile,
        loading,
        saving,
        saveProfile,
        reloadProfile: loadProfile
    }
}