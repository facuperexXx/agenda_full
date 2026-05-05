// components/Navbar.jsx - Barra de navegación superior
import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar__brand">☎ Libreta de Contactos</span>
      <div className="navbar__links">
        <NavLink to="/"            className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"}>Contactos</NavLink>
        <NavLink to="/localidades" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"}>Localidades</NavLink>
      </div>
    </nav>
  )
}
