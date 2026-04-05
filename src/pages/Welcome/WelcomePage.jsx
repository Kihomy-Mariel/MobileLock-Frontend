import { motion } from "framer-motion"
import { Shield, Fingerprint, Link2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import phone from "../../assets/phone-mobilelockai.png"

const features = [
  { icon: Fingerprint, label: "IA de identificación", desc: "Huella digital única de hardware" },
  { icon: Link2, label: "Blockchain", desc: "Propiedad verificada en cadena" },
  { icon: Shield, label: "Protección total", desc: "Teléfonos robados inservibles" },
]

export default function WelcomePage() {

  const navigate = useNavigate()

  return (

    <div className="min-h-screen flex flex-col items-center px-6 py-10 relative overflow-hidden hero-bg">

      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[60%] bg-cyan-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 blur-3xl rounded-full" />

      </div>

      {/* CONTENT */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl"
      >

        {/* LOGO */}

        <div className="flex items-center gap-3 mb-10">

          <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Shield size={22} />
          </div>

          <h1 className="text-xl md:text-2xl font-bold">
            MobileLock <span className="text-gradient">AI</span>
          </h1>

        </div>


        {/* PHONE HERO */}

        <motion.img
          src={phone}
          alt="Seguridad smartphone"
          className="w-64 md:w-80 mb-12 drop-shadow-2xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />


        {/* HEADLINE */}

        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">

          Haz que los teléfonos robados sean{" "}

          <span className="text-gradient">
            inservibles
          </span>

        </h2>


        <p className="text-muted-foreground max-w-xl text-sm md:text-lg mb-12">

          Protege tu smartphone con identificación de hardware mediante IA
          y verificación de propiedad con blockchain

        </p>


        {/* FEATURES */}

        <div className="grid md:grid-cols-3 gap-6 w-full max-w-3xl mb-12">

          {features.map((f, i) => (

            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="glass feature-card rounded-2xl p-6 flex flex-col items-center gap-3"
            >

              <div className="w-12 h-12 rounded-xl gradient-glow flex items-center justify-center">

                <f.icon size={22} className="text-cyan-400" />

              </div>

              <h3 className="font-semibold text-sm md:text-base">
                {f.label}
              </h3>

              <p className="text-xs md:text-sm text-muted-foreground">
                {f.desc}
              </p>

            </motion.div>

          ))}

        </div>


        {/* CTA */}

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded-xl gradient-primary font-semibold shadow-glow"
          >
            Registrar dispositivo
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-xl glass-light glow-ring"
          >
            Iniciar sesión
          </button>

        </div>

      </motion.div>

    </div>

  )

}