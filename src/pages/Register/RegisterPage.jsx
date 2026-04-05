import { motion } from "framer-motion"
import { Mail, Shield, UserRound, LockKeyhole } from "lucide-react"
import { useState } from "react"
import { register } from "../../services/authService"
import { useNavigate } from "react-router-dom"

export function RegisterPage() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    correo_electronico: "",
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    password: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    setErrorMsg("")
    setIsSubmitting(true)

    try {

      await register(form)
      navigate("/login")

    } catch (error) {

      const apiMessage = error?.response?.data?.detail
      setErrorMsg(apiMessage || "No se pudo completar el registro. Revisa tus datos.")
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden hero-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[60%] bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 glass w-full max-w-2xl rounded-3xl p-7 md:p-9 shadow-card"
      >
        <div className="flex items-center gap-3 mb-7">
          <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Shield size={22} />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">MobileLock</p>
            <h1 className="text-2xl md:text-3xl font-bold leading-none">
              Crea tu cuenta <span className="text-gradient">AI</span>
            </h1>
          </div>
        </div>

        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Registra tus datos para proteger y verificar tus dispositivos con seguridad avanzada.
        </p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <label className="md:col-span-2 text-sm font-medium">Nombre completo</label>

          <div className="glass-light rounded-xl px-3 py-3 flex items-center gap-2">
            <UserRound size={18} className="text-cyan-400" />
            <input
              className="w-full bg-transparent outline-none"
              type="text"
              name="nombres"
              placeholder="Nombres"
              value={form.nombres}
              onChange={handleChange}
              required
            />
          </div>

          <div className="glass-light rounded-xl px-3 py-3 flex items-center gap-2">
            <UserRound size={18} className="text-cyan-400" />
            <input
              className="w-full bg-transparent outline-none"
              type="text"
              name="apellido_paterno"
              placeholder="Apellido paterno"
              value={form.apellido_paterno}
              onChange={handleChange}
              required
            />
          </div>

          <div className="glass-light rounded-xl px-3 py-3 flex items-center gap-2 md:col-span-2">
            <UserRound size={18} className="text-cyan-400" />
            <input
              className="w-full bg-transparent outline-none"
              type="text"
              name="apellido_materno"
              placeholder="Apellido materno"
              value={form.apellido_materno}
              onChange={handleChange}
            />
          </div>

          <label className="md:col-span-2 text-sm font-medium mt-1">Credenciales</label>

          <div className="glass-light rounded-xl px-3 py-3 flex items-center gap-2 md:col-span-2">
            <Mail size={18} className="text-cyan-400" />
            <input
              className="w-full bg-transparent outline-none"
              type="email"
              name="correo_electronico"
              placeholder="tu-correo@dominio.com"
              value={form.correo_electronico}
              onChange={handleChange}
              required
            />
          </div>

          <div className="glass-light rounded-xl px-3 py-3 flex items-center gap-2 md:col-span-2">
            <LockKeyhole size={18} className="text-cyan-400" />
            <input
              className="w-full bg-transparent outline-none"
              type="password"
              name="password"
              placeholder="Contraseña segura"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {errorMsg && (
            <p className="md:col-span-2 text-sm text-red-400">{errorMsg}</p>
          )}

          <button
            className="md:col-span-2 mt-1 px-8 py-3 rounded-xl gradient-primary font-semibold shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrarme"}
          </button>

          <button
            className="md:col-span-2 px-8 py-3 rounded-xl glass-light glow-ring"
            type="button"
            onClick={() => navigate("/login")}
          >
            Ya tengo cuenta
          </button>
        </form>
      </motion.main>
    </div>
  )
}