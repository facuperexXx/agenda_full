// components/Toast.jsx - Mensaje flotante de éxito o error
import { useEffect } from "react"

/**
 * Muestra un toast durante `duration` ms y luego llama a onClose.
 * Props:
 *   message  - texto a mostrar
 *   type     - "success" | "error"
 *   onClose  - callback para ocultarlo
 */
export default function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)   // limpia el timer si el componente desmonta
  }, [onClose, duration])

  return (
    <div className={`toast toast--${type}`} role="alert">
      <span>{type === "success" ? "✓" : "✗"}</span>
      {message}
    </div>
  )
}
