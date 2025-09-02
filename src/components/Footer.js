import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} EventFlow. Todos os direitos reservados.</p>
        <ul className="footer-links">
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#funcionalidades">Funcionalidades</a></li>
          <li><a href="#cadastro">Cadastro</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
