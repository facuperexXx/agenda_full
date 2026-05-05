import React from 'react';
import { NavLink } from "react-router-dom"

// 1. Definimos las vistas (páginas)
const LocalidadSeccion = () => <div><h2>Estás en el Inicio</h2></div>;
const ContactoSeccion = () => <div><h2>Estás en Contacto</h2></div>;

function BarraNav() {
  return (
    <nav>
      <div>
        <NavLink to="/contactos" className="btn"> 
          <button type='button'> Contactos </button>
        </NavLink>
        <NavLink to="/localidades" > 
          <button type='button'> Localidades </button>
        </NavLink>
      </div>
    </nav>
  )
}

export default BarraNav;