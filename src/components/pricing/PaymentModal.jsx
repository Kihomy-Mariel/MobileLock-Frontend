import { motion } from "framer-motion"
import { X, Lock, CreditCard } from "lucide-react"
import { useState } from "react"

export default function PaymentModal({ isOpen, onClose, plan, onConfirm }) {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCardData({ ...cardData, [name]: value })
  }

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()
  }

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    }
    return cleaned
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    setCardData({ ...cardData, cardNumber: formatted })
  }

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value)
    setCardData({ ...cardData, expiryDate: formatted })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validación básica
      if (
        !cardData.cardNumber ||
        !cardData.cardHolder ||
        !cardData.expiryDate ||
        !cardData.cvv
      ) {
        alert("Por favor completa todos los campos")
        setLoading(false)
        return
      }

      // Aquí se llamaría a la API de pago
      // await paymentService.processPayment(cardData, plan)

      // Por ahora simulamos éxito
      onConfirm(plan)
      setCardData({ cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" })
      onClose()
    } catch (error) {
      console.error("Error en pago:", error)
      alert("Error al procesar el pago")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass rounded-3xl p-8 w-full max-w-md shadow-2xl border border-border"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Confirmar pago</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-light flex items-center justify-center hover:bg-muted transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* PLAN SUMMARY */}
        <div className="glass-light rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-1">Plan seleccionado</p>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{plan?.nombre}</h3>
            <span className="text-cyan-400 font-bold">
              {plan?.precio.toFixed(2)} {plan?.moneda}
            </span>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CARD NUMBER */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Número de tarjeta
            </label>
            <div className="glass-light rounded-xl px-4 py-3 flex items-center gap-2">
              <CreditCard size={18} className="text-cyan-400" />
              <input
                type="text"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className="w-full bg-transparent outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* CARDHOLDER */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Titular de tarjeta
            </label>
            <input
              type="text"
              name="cardHolder"
              value={cardData.cardHolder}
              onChange={handleInputChange}
              placeholder="Juan Pérez"
              className="w-full glass-light rounded-xl px-4 py-3 outline-none text-sm bg-transparent focus:ring-2 focus:ring-cyan-400 transition"
              required
            />
          </div>

          {/* EXPIRY & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Vencimiento</label>
              <input
                type="text"
                name="expiryDate"
                value={cardData.expiryDate}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength="5"
                className="w-full glass-light rounded-xl px-4 py-3 outline-none text-sm bg-transparent focus:ring-2 focus:ring-cyan-400 transition"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">CVV</label>
              <input
                type="password"
                name="cvv"
                value={cardData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="4"
                className="w-full glass-light rounded-xl px-4 py-3 outline-none text-sm bg-transparent focus:ring-2 focus:ring-cyan-400 transition"
                required
              />
            </div>
          </div>

          {/* SECURITY NOTE */}
          <div className="flex gap-2 items-center text-xs text-muted-foreground">
            <Lock size={14} />
            <span>Tu información de pago está protegida y encriptada</span>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 glass-light py-3 rounded-xl font-semibold hover:bg-muted transition border border-border/50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 gradient-primary py-3 rounded-xl font-semibold shadow-glow disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "Procesando..." : "Confirmar pago"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
