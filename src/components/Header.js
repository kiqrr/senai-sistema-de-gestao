import React from 'react'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">EventFlow</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#funcionalidades">Funcionalidades</a></li>
            <li><a href="#cadastro">Comece Agora</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
