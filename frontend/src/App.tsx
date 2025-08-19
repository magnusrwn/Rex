// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet, NavLink } from "react-router-dom"

function App() {
  return (
    <div className="min-h-screen">
      {/* HEADER HERE */}
      <header className="bg-gray-900 text-white p-4">
        <nav className="container mx-auto flex gap-4">
          <NavLink to="/" end className={({ isActive }) => isActive ? "font-bold" : ""}>
            Home
          </NavLink>
        </nav>
      </header>

      <main className="container mx-auto p-6">
        <Outlet /> {/* route children render here */}
      </main>
    </div>
  )
}

export default App
