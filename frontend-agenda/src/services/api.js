// services/api.js - Capa de comunicación con el backend Flask
// Centraliza todas las llamadas fetch para facilitar cambios de URL

const BASE_URL = import.meta.env.VITE_API_URL || "/api"

/**
 * Función auxiliar que envuelve fetch con manejo de errores.
 * Lanza un Error con el mensaje del backend si la respuesta no es ok.
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  const config = {
    headers: { "Content-Type": "application/json" },
    ...options,
  }
  const response = await fetch(url, config)
  const json = await response.json()
  if (!response.ok) {
    // Usamos el mensaje del backend si existe
    throw new Error(json.message || `Error HTTP ${response.status}`)
  }
  return json
}

// ── Contactos ──────────────────────────────────────────────────────────────────

/** Obtiene todos los contactos. */
export const getContactos = () => request("/contactos/")

/** Obtiene un contacto por ID. */
export const getContacto = (id) => request(`/contactos/${id}`)

/** Crea un nuevo contacto. */
export const createContacto = (datos) =>
  request("/contactos/", { method: "POST", body: JSON.stringify(datos) })

/** Actualiza un contacto existente. */
export const updateContacto = (id, datos) =>
  request(`/contactos/${id}`, { method: "PUT", body: JSON.stringify(datos) })

/** Elimina un contacto por ID. */
export const deleteContacto = (id) =>
  request(`/contactos/${id}`, { method: "DELETE" })

// ── Localidades ───────────────────────────────────────────────────────────────

/** Obtiene todas las localidades. */
export const getLocalidades = () => request("/localidades/")

/** Crea una nueva localidad. */
export const createLocalidad = (datos) =>
  request("/localidades/", { method: "POST", body: JSON.stringify(datos) })

/** Elimina una localidad por ID. */
export const deleteLocalidad = (id) =>
  request(`/localidades/${id}`, { method: "DELETE" })
