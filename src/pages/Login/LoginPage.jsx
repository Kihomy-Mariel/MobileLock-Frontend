import { motion } from "framer-motion"
import { Shield, Mail, LockKeyhole } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
        <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[60%] bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-3xl rounded-full" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 glass w-full max-w-md rounded-3xl p-7 md:p-8 shadow-card border border-border"
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
          <div className="relative">
            <Mail size={18} className="text-primary absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu-correo@dominio.com"
              className="w-full bg-input border-border pl-10 text-foreground placeholder:text-muted-foreground h-12 rounded-xl focus-visible:ring-ring"
              required
            />
          </div>

          <label className="text-sm font-medium">Contraseña</label>
          <div className="relative">
            <LockKeyhole size={18} className="text-primary absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              className="w-full bg-input border-border pl-10 text-foreground placeholder:text-muted-foreground h-12 rounded-xl focus-visible:ring-ring"
              required
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-destructive mt-1">{errorMsg}</p>
          )}

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 h-12 rounded-xl gradient-primary font-semibold shadow-glow border-0 hover:opacity-90 hover:shadow-[0_0_25px_rgba(40,176,255,0.6)] transition-all"
            >
              {isSubmitting ? "Ingresando..." : "Entrar"}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/register")}
              className="w-full h-12 rounded-xl glass-light border-border hover:bg-accent hover:border-accent hover:text-accent-foreground text-foreground transition-all glow-ring cursor-pointer"
            >
              Crear cuenta
            </Button>
          </motion.div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm text-primary hover:opacity-80 transition-colors mx-auto mt-2"
          >
            Volver al inicio
          </button>
        </form>
      </motion.section>
    </div>
  )
}
