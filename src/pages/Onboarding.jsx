import { useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  'Bem-vinda ao SafeHer',
  'Cadastre pessoas de confiança',
  'Permita acesso à localização quando necessário',
  'Conheça os canais oficiais de emergência',
]

export default function Onboarding() {
  const [step, setStep] = useState(0)

  const current = slides[step]
  const isLast = step === slides.length - 1

  return (
    <main className="auth-screen onboarding-screen">
      <div className="auth-card">
        <div className="onboarding-stepper" aria-label="Etapas do onboarding">
          {slides.map((_, index) => (
            <span key={index} className={step === index ? 'active' : ''} />
          ))}
        </div>
        <h1>{current}</h1>
        <p>
          {step === 0 && 'O SafeHer ajuda você a organizar sua rede de apoio e agir com mais rapidez.'}
          {step === 1 && 'Cadastre até 5 contatos para receber suporte em momentos de risco.'}
          {step === 2 && 'A localização será solicitada somente quando o SOS for acionado.'}
          {step === 3 && 'Você também poderá acessar os canais de emergência e conteúdos educativos.'}
        </p>
        <div className="stacked-actions">
          {isLast ? (
            <Link to="/login" className="primary-button">COMEÇAR</Link>
          ) : (
            <button type="button" className="primary-button" onClick={() => setStep((value) => value + 1)}>
              PRÓXIMO
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
