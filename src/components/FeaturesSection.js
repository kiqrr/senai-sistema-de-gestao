import React from 'react'
import './FeaturesSection.css'

function FeaturesSection() {
  return (
    <section className="features" id="funcionalidades">
      <div className="container feature-wrap">
        <h3>Funcionalidades</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Gestão de Eventos</h4>
            <p>Crie e gerencie eventos com facilidade: nome, data, local, descrição e capacidade.</p>
          </div>
          <div className="feature-card">
            <h4>Inscrições Online</h4>
            <p>Permita que participantes se inscrevam e recebam confirmações automáticas por e-mail.</p>
          </div>
          <div className="feature-card">
            <h4>Envio de Lembretes</h4>
            <p>Configure lembretes automáticos por e-mail antes dos eventos.</p>
          </div>
          <div className="feature-card">
            <h4>Emissão de Ingressos</h4>
            <p>Geração automática de ingressos digitais com QR Code.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
