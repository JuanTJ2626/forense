import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScienceSection({ onGoToApp }) {
  const sectionRef = useRef()

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".science-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="section-ciencia" ref={sectionRef} className="science-section">
      <div className="science-header">
        <div className="bento-title">
          <i></i> EXPEDIENTE METODOLÓGICO · EDO & ALGOR MORTIS
        </div>
        <h2 className="science-title">Fundamentos Matemáticos y Forenses</h2>
        <p className="science-desc">
          Análisis cuantitativo del comportamiento térmico cadavérico mediante la resolución numérica de Ecuaciones Diferenciales Ordinarias (EDO).
        </p>
      </div>

      <div className="science-grid">
        <div className="science-card bento-item">
          <div className="card-tag">MODELO DE DIFERENCIAL · LEY DE NEWTON</div>
          <h3>1. Ecuación Diferencial Ordinaria (EDO)</h3>
          <p>
            El enfriamiento cadavérico (<i>Algor Mortis</i>) se gobierna por la ecuación de transferencia de calor de primer orden:
          </p>

          <div className="math-box">
            <div className="math-eq">
              <span className="fraction"><span className="numerator">dT</span><span className="symbol">/</span><span className="denominator">dt</span></span> = −k · (T(t) − T<sub>amb</sub>)
            </div>
            <div className="math-caption">Condición inicial: T(0) = T<sub>0</sub> = 37.0°C</div>
          </div>

          <p className="subtext">
            Donde <strong>k</strong> (h<sup>-1</sup>) representa la constante de disipación térmica determinada por la masa, grasa corporal y vestimenta de la víctima.
          </p>
        </div>

        <div className="science-card bento-item">
          <div className="card-tag">ANÁLISIS NUMÉRICO · MÉTODOS DE INTEGRACIÓN</div>
          <h3>2. Discretización: Euler vs. Heun</h3>
          <p>
            Al aproximar la solución sobre un espacio discreto t<sub>n+1</sub> = t<sub>n</sub> + h:
          </p>

          <div className="math-box">
            <div className="math-title">Aproximación de Euler — O(h):</div>
            <div className="math-eq">T<sub>n+1</sub> = T<sub>n</sub> + h · f(t<sub>n</sub>, T<sub>n</sub>)</div>

            <div className="math-title" style={{ marginTop: '12px' }}>Aproximación de Heun (Euler Mejorado) — O(h²):</div>
            <div className="math-eq">
              T*<sub>n+1</sub> = T<sub>n</sub> + h · f(t<sub>n</sub>, T<sub>n</sub>) &nbsp; <span style={{ fontSize: '11px', opacity: 0.6 }}>(Predictor)</span><br />
              T<sub>n+1</sub> = T<sub>n</sub> + <span className="fraction"><span className="numerator">h</span><span className="symbol">/</span><span className="denominator">2</span></span> [ f(t<sub>n</sub>, T<sub>n</sub>) + f(t<sub>n+1</sub>, T*<sub>n+1</sub>) ] &nbsp; <span style={{ fontSize: '11px', opacity: 0.6 }}>(Corrector)</span>
            </div>
          </div>
        </div>

        <div className="science-card bento-item">
          <div className="card-tag">SOLUCIÓN ANALÍTICA · REFERENCIA PERICIAL</div>
          <h3>3. Solución Analítica Exacta</h3>
          <p>
            Integrando por separación de variables se obtiene la trayectoria continua exacta para verificar el error cuadrático global:
          </p>

          <div className="math-box">
            <div className="math-eq">
              T(t) = T<sub>amb</sub> + (T<sub>0</sub> − T<sub>amb</sub>) · e<sup>−k·t</sup>
            </div>
            <div className="math-title" style={{ marginTop: '10px' }}>Tiempo de Cruce Exacto (t<sub>cruce</sub>):</div>
            <div className="math-eq" style={{ color: '#4caf50' }}>
              t = <span className="fraction"><span className="numerator">1</span><span className="symbol">/</span><span className="denominator">k</span></span> · ln
              <span style={{ fontSize: '18px' }}>[</span>
              <span className="fraction"><span className="numerator">T<sub>0</sub> − T<sub>amb</sub></span><span className="symbol">/</span><span className="denominator">T<sub>m</sub> − T<sub>amb</sub></span></span>
              <span style={{ fontSize: '18px' }}>]</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
