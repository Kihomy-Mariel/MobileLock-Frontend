import apiClient from "./apiClient"

export const pricingService = {
  async getPlans() {
    try {
      const res = await apiClient.get("/precios-planes/")
      return res.data
    } catch (error) {
      console.error("Error loading plans:", error)
      // Fallback planes si la API falla
      return [
        {
          id: 1,
          nombre: "Gratuito",
          precio: 0,
          descripcion: "Para empezar",
          caracteristicas: [
            "1 dispositivo",
            "Escaneo limitado",
            "Verificación básica",
          ],
        },
        {
          id: 2,
          nombre: "Pro",
          precio: 9.99,
          descripcion: "Para usuarios avanzados",
          caracteristicas: [
            "Hasta 5 dispositivos",
            "Historial detallado",
            "Alertas prioritarias",
          ],
        },
      ]
    }
  },
}
