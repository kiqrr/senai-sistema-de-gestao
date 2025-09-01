import React from 'react'
import './CTASection.css'

function CTASection() {
  return (
    <section className="cta" id="cadastro">
      <div className="container cta-wrap">
        <h3>Pronto para começar?</h3>
        <p>Cadastre-se agora como organizador ou participante e comece a criar ou participar de eventos.</p>
        <a href="/signup" className="btn">Criar Conta</a>
      </div>
    </section>
  )
}

export default CTASection
