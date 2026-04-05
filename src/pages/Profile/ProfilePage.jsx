import { useAuth } from "../../context/AuthContext"
import { motion } from "framer-motion"
import { UserCircle2, Mail, ShieldCheck, LogOut, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import BottomNav from "../../components/navigation/BottomNav"

export function ProfilePage() {

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const fullName = [
        user?.nombres,
        user?.apellido_paterno,
        user?.apellido_materno
    ].filter(Boolean).join(" ")

    const profileName = fullName || "Tu cuenta"
    const profileEmail = user?.correo_electronico || "No disponible"
    const profilePlan = user?.plan_suscripcion || "FREE"

    const handleLogout = async () => {
        await logout()
        navigate("/")
    }

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden hero-bg">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[60%] bg-cyan-500/10 blur-3xl rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 blur-3xl rounded-full" />
            </div>

            <main className="relative z-10 flex-1 px-6 pt-8 pb-24 max-w-4xl mx-auto w-full">
                <motion.section
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="glass rounded-3xl p-6 md:p-8 shadow-card"
                >
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                                <UserCircle2 size={24} />
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">MobileLock AI</p>
                                <h1 className="text-2xl md:text-3xl font-bold">Mi perfil</h1>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="px-4 py-2 rounded-xl glass-light glow-ring flex items-center gap-2 text-sm"
                        >
                            <ArrowLeft size={16} />
                            Volver
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <motion.article
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.35 }}
                            className="glass-light rounded-2xl p-4"
                        >
                            <p className="text-xs text-muted-foreground mb-1">Usuario</p>
                            <p className="text-lg font-semibold">{profileName}</p>
                        </motion.article>

                        <motion.article
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18, duration: 0.35 }}
                            className="glass-light rounded-2xl p-4 flex items-start gap-3"
                        >
                            <Mail size={18} className="text-cyan-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Correo electrónico</p>
                                <p className="text-sm md:text-base font-medium break-all">{profileEmail}</p>
                            </div>
                        </motion.article>

                        <motion.article
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.26, duration: 0.35 }}
                            className="glass-light rounded-2xl p-4 flex items-start gap-3 md:col-span-2"
                        >
                            <ShieldCheck size={18} className="text-cyan-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Plan de seguridad</p>
                                <p className="text-sm md:text-base font-medium">{profilePlan}</p>
                            </div>
                        </motion.article>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="px-6 py-3 rounded-xl gradient-primary font-semibold shadow-glow"
                        >
                            Ir al panel
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="px-6 py-3 rounded-xl glass-light glow-ring flex items-center justify-center gap-2"
                        >
                            <LogOut size={18} />
                            Cerrar sesión
                        </button>
                    </div>
                </motion.section>
            </main>

            <BottomNav />
        </div>
    )
}