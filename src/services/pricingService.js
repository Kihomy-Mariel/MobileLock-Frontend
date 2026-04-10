import apiClient from "./apiClient"

const FALLBACK_PLANS = [
  {
    id: 1,
    nombre: "Gratuito",
    precio: 0,
    moneda: "Bs",
    descripcion: "Para empezar",
    caracteristicas: [
      "1 dispositivo",
      "Escaneo limitado",
      "Verificacion basica",
    ],
  },
  {
    id: 2,
    nombre: "Pro",
    precio: 69.0,
    moneda: "Bs",
    descripcion: "Para usuarios avanzados",
    caracteristicas: [
      "Hasta 5 dispositivos",
      "Historial detallado",
      "Alertas prioritarias",
    ],
    requiereMetodo: true,
  },
]

const parsePrice = (value) => {
  if (typeof value === "number") return value
  if (typeof value !== "string") return 0

  const match = value.match(/[\d.]+/)
  return match ? Number(match[0]) : 0
}

const normalizePlan = (plan, index) => {
  const nombre = plan.nombre ?? plan.nombre_plan ?? `Plan ${index + 1}`
  const precio =
    plan.precio ??
    parsePrice(plan.precio_mensual_formateado) ??
    0

  return {
    id: plan.id ?? index + 1,
    nombre,
    precio,
    moneda: "Bs",
    descripcion:
      plan.descripcion ??
      (precio > 0 ? "Para usuarios avanzados" : "Para empezar"),
    caracteristicas: Array.isArray(plan.caracteristicas)
      ? plan.caracteristicas
      : [],
    requiereMetodo: precio > 0,
  }
}

export const pricingService = {
  async getPlans() {
    try {
      const res = await apiClient.get("/precios-planes/")

      if (!Array.isArray(res.data) || res.data.length === 0) {
        return FALLBACK_PLANS
      }

      return res.data.map(normalizePlan)
    } catch (error) {
      console.error("Error loading plans:", error)
      return FALLBACK_PLANS
    }
  },
}
