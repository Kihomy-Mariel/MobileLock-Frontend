import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    UserCircle2,
    Mail,
    ShieldCheck,
    LogOut,
    ArrowLeft,
    Save,
    Pencil,
    X,
    Loader2
} from "lucide-react"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import BottomNav from "../../components/navigation/BottomNav"
import useProfile from "../../hooks/useProfile"

export function ProfilePage() {

    const navigate = useNavigate()
    const { logout } = useAuth()

    const { profile, loading, saveProfile, saving } = useProfile()

    const [editing, setEditing] = useState(false)
    const [loggingOut, setLoggingOut] = useState(false)

    const [formData, setFormData] = useState({
        nombres: "",
        apellido_paterno: "",
        apellido_materno: "",
    })

    useEffect(() => {
        if (profile) {
            setFormData({
                nombres: profile.nombres || "",
                apellido_paterno: profile.apellido_paterno || "",
                apellido_materno: profile.apellido_materno || "",
            })
        }
    }, [profile])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = async () => {
        await saveProfile(formData)
        setEditing(false)
    }

    const handleLogout = async () => {
        setLoggingOut(true)

        try {
            await logout()
            navigate("/")
        } catch (error) {
            console.error(error)
        } finally {
            setLoggingOut(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
                Cargando perfil...
            </div>
        )
    }

    const fullName = [
        profile?.nombres,
        profile?.apellido_paterno,
        profile?.apellido_materno
    ].filter(Boolean).join(" ")

    return (
        <div className="min-h-screen flex flex-col hero-bg">

            <main className="flex-1 px-6 pt-8 pb-24 max-w-3xl mx-auto w-full">

                <motion.section
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="glass rounded-3xl p-8 shadow-card backdrop-blur-xl"
                >

                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-8">

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="flex items-center gap-2 text-sm glass-light px-4 py-2 rounded-xl hover:scale-105 transition"
                        >
                            <ArrowLeft size={16}/>
                            Volver
                        </button>

                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="flex items-center gap-2 text-sm gradient-primary px-5 py-2 rounded-xl hover:scale-105 transition"
                            >
                                <Pencil size={16}/>
                                Editar perfil
                            </button>
                        )}

                    </div>


                    {/* PROFILE HEADER */}
                    <div className="flex flex-col items-center text-center mb-8">

                        <div className="relative">

                            <div className="w-28 h-28 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                                <UserCircle2 size={54}/>
                            </div>

                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full glass-light">
                                {profile.plan_suscripcion}
                            </div>

                        </div>

                        <h2 className="text-2xl font-bold mt-4">
                            {fullName || "Usuario"}
                        </h2>

                        <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                            <Mail size={14}/>
                            {profile.correo_electronico}
                        </p>

                    </div>


                    {/* PLAN CARD */}
                    <div className="glass-light rounded-2xl p-4 flex items-center gap-4 mb-8">

                        <div className="p-2 rounded-xl bg-cyan-500/10">
                            <ShieldCheck className="text-cyan-400"/>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Estado del plan
                            </p>

                            <p className="font-semibold">
                                {profile.plan_suscripcion} • {profile.plan_estado}
                            </p>
                        </div>

                    </div>


                    {/* FORM */}
                    <div className="grid md:grid-cols-2 gap-5">

                        <Field
                            label="Nombres"
                            name="nombres"
                            value={formData.nombres}
                            editing={editing}
                            onChange={handleChange}
                        />

                        <Field
                            label="Apellido paterno"
                            name="apellido_paterno"
                            value={formData.apellido_paterno}
                            editing={editing}
                            onChange={handleChange}
                        />

                        <Field
                            label="Apellido materno"
                            name="apellido_materno"
                            value={formData.apellido_materno}
                            editing={editing}
                            onChange={handleChange}
                        />

                        <div>
                            <label className="text-xs text-muted-foreground">
                                Correo electrónico
                            </label>

                            <div className="mt-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-sm opacity-80">
                                <Mail size={14}/>
                                {profile.correo_electronico}
                            </div>
                        </div>

                    </div>


                    {/* ACTIONS */}
                    {editing && (

                        <div className="flex gap-4 mt-8">

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 gradient-primary px-6 py-3 rounded-xl hover:scale-105 transition disabled:opacity-60"
                            >

                                {saving ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin"/>
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18}/>
                                        Guardar cambios
                                    </>
                                )}

                            </button>

                            <button
                                onClick={() => setEditing(false)}
                                className="flex items-center gap-2 glass-light px-6 py-3 rounded-xl hover:scale-105 transition"
                            >
                                <X size={18}/>
                                Cancelar
                            </button>

                        </div>

                    )}


                    {/* LOGOUT */}
                    <div className="mt-10 border-t border-white/10 pt-6">

                        <button
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="w-full glass-light py-3 rounded-xl flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/10 transition disabled:opacity-60"
                        >

                            {loggingOut ? (
                                <>
                                    <Loader2 size={18} className="animate-spin"/>
                                    Cerrando sesión...
                                </>
                            ) : (
                                <>
                                    <LogOut size={18}/>
                                    Cerrar sesión
                                </>
                            )}

                        </button>

                    </div>

                </motion.section>

            </main>

            <BottomNav/>

        </div>
    )
}



function Field({ label, name, value, editing, onChange }) {
    return (
        <div>
            <label className="text-xs text-muted-foreground">
                {label}
            </label>

            <input
                name={name}
                value={value}
                disabled={!editing}
                onChange={onChange}
                className={`mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 outline-none transition text-sm
                ${!editing && "opacity-70 cursor-not-allowed"}`}
            />
        </div>
    )
}