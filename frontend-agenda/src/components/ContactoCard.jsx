// components/ContactoCard.jsx - Tarjeta de un contacto en el listado
/**
 * Props:
 *   contacto  - objeto con los datos del contacto
 *   onEditar  - callback para abrir el formulario de edición
 *   onEliminar- callback para pedir confirmación de borrado
 */
export default function ContactoCard({ contacto, onEditar, onEliminar }) {
  const iniciales = `${contacto.nombre[0]}${contacto.apellido[0]}`.toUpperCase()

  return (
    <article className="card">
      <div className="card__avatar">{iniciales}</div>
      <div className="card__body">
        <h3 className="card__name">{contacto.nombre} {contacto.apellido}</h3>
        <p className="card__detail"><span>✉</span> {contacto.email}</p>
        <p className="card__detail"><span>☎</span> {contacto.telefono}</p>
        <p className="card__detail"><span>⌂</span> {contacto.direccion}</p>
        {contacto.localidad && (
          <p className="card__detail card__localidad">
            <span>◎</span> {contacto.localidad.nombre}, {contacto.localidad.provincia}
          </p>
        )}
      </div>
      <div className="card__actions">
        <button className="btn btn--icon" onClick={() => onEditar(contacto)} title="Editar">✎</button>
        <button className="btn btn--icon btn--danger" onClick={() => onEliminar(contacto)} title="Eliminar">✕</button>
      </div>
    </article>
  )
}
