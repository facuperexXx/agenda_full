// pages/ContactosPage.jsx - Página principal con listado, búsqueda y CRUD
import { useState, useEffect, useCallback } from "react"
import { getContactos, createContacto, updateContacto, deleteContacto, getLocalidades } from "../services/api.js"
import ContactoCard   from "../components/ContactoCard.jsx"
import ContactoForm   from "../components/ContactoForm.jsx"
import Modal          from "../components/Modal.jsx"
import Toast          from "../components/Toast.jsx"

export default function ContactosPage() {
  // ── Estado ───────────────────────────────────────────────────────────────────
  const [contactos,         setContactos]         = useState([])
  const [localidades,       setLocalidades]       = useState([])
  const [busqueda,          setBusqueda]          = useState("")
  const [mostrarForm,       setMostrarForm]       = useState(false)
  const [contactoEditando,  setContactoEditando]  = useState(null)   // null = crear
  const [contactoAEliminar, setContactoAEliminar] = useState(null)   // null = no modal
  const [cargando,          setCargando]          = useState(true)
  const [toast,             setToast]             = useState(null)   // {message, type}

  // ── Carga inicial ────────────────────────────────────────────────────────────
  const cargarDatos = useCallback(async () => {
    try {
      const [resC, resL] = await Promise.all([getContactos(), getLocalidades()])
      setContactos(resC.data)
      setLocalidades(resL.data)
    } catch (err) {
      mostrarToast(err.message, "error")
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => { cargarDatos() }, [cargarDatos])

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const mostrarToast = (message, type = "success") => setToast({ message, type })

  const abrirCrear  = () => { setContactoEditando(null); setMostrarForm(true) }
  const abrirEditar = (c) => { setContactoEditando(c);   setMostrarForm(true) }
  const cerrarForm  = () => { setMostrarForm(false); setContactoEditando(null) }

  // ── Filtro de búsqueda (nombre o apellido) ───────────────────────────────────
  const contactosFiltrados = contactos.filter((c) => {
    const query = busqueda.toLowerCase()
    return c.nombre.toLowerCase().includes(query) || c.apellido.toLowerCase().includes(query)
  })

  // ── Handlers CRUD ────────────────────────────────────────────────────────────
  const handleGuardar = async (datos) => {
    try {
      if (contactoEditando) {
        const res = await updateContacto(contactoEditando.id, datos)
        setContactos((prev) => prev.map((c) => c.id === contactoEditando.id ? res.data[0] : c))
        mostrarToast("Contacto actualizado correctamente.")
      } else {
        const res = await createContacto(datos)
        setContactos((prev) => [...prev, res.data[0]])
        mostrarToast("Contacto creado correctamente.")
      }
      cerrarForm()
    } catch (err) {
      mostrarToast(err.message, "error")
    }
  }

  const confirmarEliminar = async () => {
    try {
      await deleteContacto(contactoAEliminar.id)
      setContactos((prev) => prev.filter((c) => c.id !== contactoAEliminar.id))
      mostrarToast("Contacto eliminado.")
    } catch (err) {
      mostrarToast(err.message, "error")
    } finally {
      setContactoAEliminar(null)
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <main className="page">
      <div className="page__header">
        <h1 className="page__title">Mis Contactos <span className="badge">{contactos.length}</span></h1>
        <button className="btn btn--primary" onClick={abrirCrear}>+ Nuevo</button>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <span className="search-bar__icon">⌕</span>
        <input
          className="search-bar__input"
          type="search"
          placeholder="Buscar por nombre o apellido…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Listado */}
      {cargando ? (
        <p className="loading">Cargando contactos…</p>
      ) : contactosFiltrados.length === 0 ? (
        <p className="empty">No se encontraron contactos.</p>
      ) : (
        <div className="grid">
          {contactosFiltrados.map((c) => (
            <ContactoCard
              key={c.id}
              contacto={c}
              onEditar={abrirEditar}
              onEliminar={setContactoAEliminar}
            />
          ))}
        </div>
      )}

      {/* Formulario (overlay) */}
      {mostrarForm && (
        <ContactoForm
          contactoInicial={contactoEditando}
          localidades={localidades}
          onGuardar={handleGuardar}
          onCancelar={cerrarForm}
        />
      )}

      {/* Modal de confirmación de borrado */}
      {contactoAEliminar && (
        <Modal
          message={`¿Eliminar a ${contactoAEliminar.nombre} ${contactoAEliminar.apellido}?`}
          onConfirm={confirmarEliminar}
          onCancel={() => setContactoAEliminar(null)}
        />
      )}

      {/* Toast de notificación */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  )
}
