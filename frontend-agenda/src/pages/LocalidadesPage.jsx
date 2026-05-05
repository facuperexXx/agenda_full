// pages/LocalidadesPage.jsx - CRUD de localidades (desafío extra)
import { useState, useEffect, useCallback } from "react"
import { getLocalidades, createLocalidad, deleteLocalidad } from "../services/api.js"
import Modal from "../components/Modal.jsx"
import Toast from "../components/Toast.jsx"

export default function LocalidadesPage() {
  const [localidades,         setLocalidades]         = useState([])
  const [form,                setForm]                = useState({ nombre: "", provincia: "" })
  const [errores,             setErrores]             = useState({})
  const [localidadAEliminar,  setLocalidadAEliminar]  = useState(null)
  const [toast,               setToast]               = useState(null)

  const cargar = useCallback(async () => {
    try {
      const res = await getLocalidades()
      setLocalidades(res.data)
    } catch (err) {
      setToast({ message: err.message, type: "error" })
    }
  }, [])

  useEffect(() => { cargar() }, [cargar])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrores((prev) => ({ ...prev, [name]: "" }))
  }

  const handleCrear = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.nombre.trim())    errs.nombre    = "Obligatorio."
    if (!form.provincia.trim()) errs.provincia = "Obligatorio."
    if (Object.keys(errs).length > 0) { setErrores(errs); return }

    try {
      const res = await createLocalidad(form)
      setLocalidades((prev) => [...prev, res.data[0]])
      setForm({ nombre: "", provincia: "" })
      setToast({ message: "Localidad creada." })
    } catch (err) {
      setToast({ message: err.message, type: "error" })
    }
  }

  const confirmarEliminar = async () => {
    try {
      await deleteLocalidad(localidadAEliminar.id)
      setLocalidades((prev) => prev.filter((l) => l.id !== localidadAEliminar.id))
      setToast({ message: "Localidad eliminada." })
    } catch (err) {
      setToast({ message: err.message, type: "error" })
    } finally {
      setLocalidadAEliminar(null)
    }
  }

  return (
    <main className="page">
      <div className="page__header">
        <h1 className="page__title">Localidades <span className="badge">{localidades.length}</span></h1>
      </div>

      {/* Formulario inline para crear */}
      <form className="inline-form" onSubmit={handleCrear} noValidate>
        <div className="form__field">
          <input className={`form__input ${errores.nombre ? "form__input--error" : ""}`}
            name="nombre" placeholder="Nombre de la localidad"
            value={form.nombre} onChange={handleChange} />
          {errores.nombre && <span className="form__error">{errores.nombre}</span>}
        </div>
        <div className="form__field">
          <input className={`form__input ${errores.provincia ? "form__input--error" : ""}`}
            name="provincia" placeholder="Provincia"
            value={form.provincia} onChange={handleChange} />
          {errores.provincia && <span className="form__error">{errores.provincia}</span>}
        </div>
        <button className="btn btn--primary" type="submit">+ Agregar</button>
      </form>

      {/* Tabla de localidades */}
      {localidades.length === 0 ? (
        <p className="empty">No hay localidades cargadas aún.</p>
      ) : (
        <table className="table">
          <thead>
            <tr><th>#</th><th>Nombre</th><th>Provincia</th><th></th></tr>
          </thead>
          <tbody>
            {localidades.map((loc) => (
              <tr key={loc.id}>
                <td>{loc.id}</td>
                <td>{loc.nombre}</td>
                <td>{loc.provincia}</td>
                <td>
                  <button className="btn btn--icon btn--danger"
                    onClick={() => setLocalidadAEliminar(loc)} title="Eliminar">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {localidadAEliminar && (
        <Modal
          message={`¿Eliminar "${localidadAEliminar.nombre}"?`}
          onConfirm={confirmarEliminar}
          onCancel={() => setLocalidadAEliminar(null)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </main>
  )
}
