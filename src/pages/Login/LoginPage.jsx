import { motion } from "framer-motion"
import { Shield, Mail, LockKeyhole } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export function LoginPage() {

  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMsg("")
    setIsSubmitting(true)

    try {
      await login(email, password)
      navigate("/dashboard")
    } catch (error) {
      const apiMessage = error?.response?.data?.detail
      setErrorMsg(apiMessage || "No se pudo iniciar sesión. Verifica tus credenciales.")
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

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 glass w-full max-w-md rounded-3xl p-7 md:p-8 shadow-card"
      >
        <div className="flex items-center gap-3 mb-7">
          <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Shield size={22} />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">MobileLock</p>
            <h1 className="text-xl md:text-2xl font-bold leading-none">
              Inicia sesión en <span className="text-gradient">AI</span>
            </h1>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Accede a tu panel para gestionar tus dispositivos protegidos.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-medium">Correo electrónico</label>
          <div className="glass-light rounded-xl px-3 py-3 flex items-center gap-2">
            <Mail size={18} className="text-cyan-400" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu-correo@dominio.com"
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          <label className="text-sm font-medium">Contraseña</label>
          <div className="glass-light rounded-xl px-3 py-3 flex items-center gap-2">
            <LockKeyhole size={18} className="text-cyan-400" />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-red-400 mt-1">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 px-6 py-3 rounded-xl gradient-primary font-semibold shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Ingresando..." : "Entrar"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-xl glass-light glow-ring"
          >
            Crear cuenta
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            Volver al inicio
          </button>
        </form>
      </motion.section>
    </div>
  )
}
