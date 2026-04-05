const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000/api"

const normalizeBaseUrl = (value, fallback) => {
  const source = (value ?? fallback).trim()
  return source.replace(/\/+$/, "")
}

// Log temporal para depuración (eliminar después)
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL)
console.log('API_BASE_URL final:', normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL,
  DEFAULT_API_BASE_URL,
))

export const API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL,
  DEFAULT_API_BASE_URL,
)