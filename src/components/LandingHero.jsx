import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LandingHero({ onStart }) {
  const heroRef = useRef()

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      tl.from(".hero-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(".hero-title-main", { opacity: 0, y: 40, duration: 1 }, "-=0.4")
        .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".hero-cta-group", { opacity: 0, scale: 0.95, duration: 0.6 }, "-=0.4")
        .from(".hero-stats-bar > div", { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 }, "-=0.4")
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="landing-hero-section">


      <h1 className="hero-title-main">
        Análisis Matemático de <br />
        <span className="text-gradient">Algor Mortis Forense</span>
      </h1>

      <p className="hero-subtitle">
        Cálculo cuantitativo del intervalo post-mortem (IPM) mediante la resolución de la ecuación diferencial
        <code style={{ color: 'var(--accent)', background: 'var(--border)', padding: '2px 8px', borderRadius: '4px', margin: '0 4px' }}>dT/dt = -k(T - Tamb)</code>
        evaluando el error de convergencia entre <strong>Euler</strong>, <strong>Heun O(h²)</strong> y la <strong>Solución Analítica CERRADA</strong>.
      </p>

      <div className="hero-cta-group">
        <button className="btn-hero-primary" onClick={onStart}>
          EJECUTAR PERITAJE NUMÉRICO ▸
        </button>
        <a href="#section-ciencia" className="btn-hero-secondary">
          Fundamentos EDO ↓
        </a>
      </div>

      <div className="hero-stats-bar">
        <div className="stat-card">
          <span className="stat-num">dT/dt = -k(T - T_amb)</span>
          <span className="stat-lbl">Ley de Enfriamiento de Newton</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">O(h²) Heun</span>
          <span className="stat-lbl">Orden de Truncamiento Global</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">t = (1/k) ln(...)</span>
          <span className="stat-lbl">Solución Analítica CERRADA</span>
        </div>
      </div>
    </section>
  )
}
