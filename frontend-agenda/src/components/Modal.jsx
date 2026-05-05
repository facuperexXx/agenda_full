// components/Modal.jsx - Diálogo de confirmación reutilizable
/**
 * Props:
 *   message   - texto de la pregunta
 *   onConfirm - callback al aceptar
 *   onCancel  - callback al cancelar
 */
export default function Modal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <p className="modal__message">{message}</p>
        <div className="modal__actions">
          <button className="btn btn--danger" onClick={onConfirm}>Eliminar</button>
          <button className="btn btn--ghost" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
