// App.jsx - Componente raíz; configura las rutas con React Router
import { Routes, Route } from "react-router-dom"
import Navbar           from "./components/Navbar.jsx"
import ContactosPage    from "./pages/ContactosPage.jsx"
import LocalidadesPage  from "./pages/LocalidadesPage.jsx"

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"            element={<ContactosPage />} />
        <Route path="/localidades" element={<LocalidadesPage />} />
        {/* Ruta catch-all: redirige al inicio */}
        <Route path="*"            element={<ContactosPage />} />
      </Routes>
    </>
  )
}
