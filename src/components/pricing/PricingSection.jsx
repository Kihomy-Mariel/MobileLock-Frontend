import { motion } from "framer-motion"
import { Check, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { pricingService } from "../../services/pricingService"
import PaymentModal from "./PaymentModal"

export default function PricingSection() {
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await pricingService.getPlans()
        setPlans(data)
      } catch (error) {
        console.error("Error loading plans:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPlans()
  }, [])

  const handleSelectPlan = (plan) => {
    if (plan.precio === 0) {
      // Plan gratuito: ir a registro
      navigate("/register", { state: { selectedPlanId: plan.id } })
    } else {
      // Plan Pro: abrir modal de pago
      setSelectedPlan(plan)
      setPaymentModalOpen(true)
    }
  }

  const handlePaymentConfirm = (plan) => {
    // Después del pago exitoso, ir a registro con plan seleccionado
    navigate("/register", { state: { selectedPlanId: plan.id, planName: plan.nombre } })
  }

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">Cargando planes...</p>
      </div>
    )
  }

  return (
    <section className="w-full py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Elige tu <span className="text-gradient">plan</span>
          </h2>

          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Acceso inmediato a MobileLock con protección blockchain para tus dispositivos
          </p>
        </motion.div>

        {/* PLANS GRID */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative rounded-3xl p-8 border transition-all ${
                plan.precio === 0
                  ? "glass border-white/10"
                  : "glass-light border-cyan-500/30 ring-2 ring-cyan-500/20"
              }`}
            >
              {/* BADGE PRO */}
              {plan.precio > 0 && (
                <div className="absolute -top-4 right-8 px-4 py-1 rounded-full bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1">
                  <Zap size={12} />
                  RECOMENDADO
                </div>
              )}

              {/* PLAN NAME */}
              <h3 className="text-2xl font-bold mb-2">{plan.nombre}</h3>
              <p className="text-muted-foreground text-sm mb-6">
                {plan.descripcion}
              </p>

              {/* PRICE */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">
                    {plan.moneda === "Bs" ? "Bs" : "$"}{" "}
                    {plan.precio.toFixed(2)}
                  </span>
                  {plan.precio > 0 && (
                    <span className="text-muted-foreground">/mes</span>
                  )}
                </div>
              </div>

              {/* FEATURES */}
              <div className="space-y-4 mb-8">
                {plan.caracteristicas &&
                  plan.caracteristicas.map((feature, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <Check
                        size={18}
                        className={`mt-1 flex-shrink-0 ${
                          plan.precio === 0
                            ? "text-cyan-400"
                            : "text-cyan-300"
                        }`}
                      />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
              </div>

              {/* CTA BUTTON */}
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  plan.precio === 0
                    ? "glass-light hover:bg-white/10"
                    : "gradient-primary shadow-glow hover:scale-105"
                }`}
              >
                {plan.precio === 0 ? "Comenzar gratis" : "Contratar plan"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-12"
        >
          Sin tarjeta de crédito requerida. Cancela en cualquier momento.
        </motion.p>
      </div>

      {/* PAYMENT MODAL */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        plan={selectedPlan}
        onConfirm={handlePaymentConfirm}
      />
    </section>
  )
}

