import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import BarraNav from './components/BarraNav'
import LocalidadPage from './components/LocalidadPage'
import ContactosPage from './components/ContactosPage'

function App() {
  return (
    <BrowserRouter>
      <BarraNav />
      <Routes>
        <Route path="/localidades" element={<LocalidadPage />} />
        <Route path="/contactos" element={<ContactosPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
