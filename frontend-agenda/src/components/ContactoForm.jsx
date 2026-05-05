// components/ContactoForm.jsx - Formulario controlado para crear/editar contactos
import { useState, useEffect } from "react"

const CAMPOS_VACIOS = {
  nombre: "", apellido: "", direccion: "", email: "", telefono: "", localidad_id: ""
}

/**
 * Props:
 *   contactoInicial - objeto con datos a editar (null para crear)
 *   localidades     - lista de localidades para el selector
 *   onGuardar       - callback(datos) al enviar el formulario
 *   onCancelar      - callback para cerrar el formulario
 */
export default function ContactoForm({ contactoInicial, localidades, onGuardar, onCancelar }) {
  // Estado del formulario; si venimos a editar, lo precargamos
  const [form, setForm] = useState(CAMPOS_VACIOS)
  const [errores, setErrores] = useState({})

  useEffect(() => {
    if (contactoInicial) {
      setForm({
        nombre:       contactoInicial.nombre      || "",
        apellido:     contactoInicial.apellido    || "",
        direccion:    contactoInicial.direccion   || "",
        email:        contactoInicial.email       || "",
        telefono:     contactoInicial.telefono    || "",
        localidad_id: contactoInicial.localidad_id ?? "",
      })
    } else {
      setForm(CAMPOS_VACIOS)
    }
    setErrores({})
  }, [contactoInicial])

  /** Actualiza el campo correspondiente en el estado del form. */
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Limpiamos el error del campo que se está editando
    setErrores((prev) => ({ ...prev, [name]: "" }))
  }

  /** Validaciones antes de enviar. */
  const validar = () => {
    const nuevosErrores = {}
    if (!form.nombre.trim())    nuevosErrores.nombre    = "El nombre es obligatorio."
    if (!form.apellido.trim())  nuevosErrores.apellido  = "El apellido es obligatorio."
    if (!form.direccion.trim()) nuevosErrores.direccion = "La dirección es obligatoria."
    if (!form.email.trim())     nuevosErrores.email     = "El email es obligatorio."
    else if (!/\S+@\S+\.\S+/.test(form.email)) nuevosErrores.email = "Email inválido."
    if (!form.telefono.trim())  nuevosErrores.telefono  = "El teléfono es obligatorio."
    return nuevosErrores
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validar()
    if (Object.keys(errs).length > 0) {
      setErrores(errs)
      return
    }
    // Preparamos el payload; localidad_id como número o null
    const payload = {
      ...form,
      localidad_id: form.localidad_id ? Number(form.localidad_id) : null,
    }
    onGuardar(payload)
  }

  return (
    <div className="form-overlay">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h2 className="form__title">{contactoInicial ? "Editar Contacto" : "Nuevo Contacto"}</h2>

        {[
          { label: "Nombre",    name: "nombre" },
          { label: "Apellido",  name: "apellido" },
          { label: "Dirección", name: "direccion" },
          { label: "Email",     name: "email", type: "email" },
          { label: "Teléfono",  name: "telefono" },
        ].map(({ label, name, type = "text" }) => (
          <div className="form__field" key={name}>
            <label className="form__label" htmlFor={name}>{label}</label>
            <input
              className={`form__input ${errores[name] ? "form__input--error" : ""}`}
              id={name} name={name} type={type}
              value={form[name]} onChange={handleChange}
              placeholder={label}
            />
            {errores[name] && <span className="form__error">{errores[name]}</span>}
          </div>
        ))}

        {/* Selector de localidad (desafío extra) */}
        <div className="form__field">
          <label className="form__label" htmlFor="localidad_id">Localidad (opcional)</label>
          <select
            className="form__input"
            id="localidad_id" name="localidad_id"
            value={form.localidad_id} onChange={handleChange}
          >
            <option value="">— Sin localidad —</option>
            {localidades.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.nombre}, {loc.provincia}
              </option>
            ))}
          </select>
        </div>

        <div className="form__actions">
          <button className="btn btn--primary" type="submit">
            {contactoInicial ? "Guardar cambios" : "Crear contacto"}
          </button>
          <button className="btn btn--ghost" type="button" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
