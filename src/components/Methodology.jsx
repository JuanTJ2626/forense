import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sections = [
  {
    title: null,
    text: 'El enfriamiento de un cuerpo se modela con la Ley de Enfriamiento de Newton, una ecuación diferencial de primer orden que relaciona la temperatura T con el tiempo t:',
    formula: 'dT/dt = −k · (T − T_amb)',
  },
  {
    title: 'Solución exacta',
    text: 'Esta ecuación tiene solución analítica cerrada, usada aquí como referencia para medir el error de los métodos numéricos:',
    formula: 'T(t) = T_amb + (T₀ − T_amb) · e^(−k·t)',
  },
  {
    title: 'Método de Euler',
    text: 'Aproxima la curva avanzando en pasos de tamaño h, usando la pendiente evaluada solo al inicio del intervalo:',
    formula: 'T_(n+1) = T_n + h · f(t_n, T_n)',
  },
  {
    title: 'Método de Euler mejorado (Heun)',
    text: 'Corrige el resultado promediando la pendiente inicial con una pendiente estimada al final del intervalo (predictor–corrector), reduciendo el error de truncamiento:',
    formula: 'T*_(n+1) = T_n + h · f(t_n, T_n)   (predictor)\nT_(n+1) = T_n + h/2 · [ f(t_n, T_n) + f(t_(n+1), T*_(n+1)) ]   (corrector)',
  },
  {
    title: 'Estimación de la hora de muerte',
    text: 'Se simula la curva hacia adelante desde T₀ (temperatura corporal normal) y se ubica el instante en que cada método cruza la temperatura medida T_m. Ese tiempo transcurrido se resta de la hora del hallazgo. La solución exacta permite calcular el mismo cruce de forma analítica: t = (1/k) · ln[(T₀ − T_amb) / (T_m − T_amb)], y sirve como valor de referencia para comparar el error de cada método numérico.',
    formula: null,
  },
]

export default function Methodology() {
  const containerRef = useRef(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="section-card method-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <div className="section-title">
        <span className="icon">🔬</span> Metodología
      </div>

      {sections.map((section, i) => (
        <div
          key={i}
          ref={(el) => (sectionRefs.current[i] = el)}
          style={{ opacity: 0 }}
        >
          {section.title && (
            <h3 className="method-subtitle">{section.title}</h3>
          )}
          <p>{section.text}</p>
          {section.formula && (
            <div className="formula-block">
              {section.formula.split('\n').map((line, j) => (
                <span key={j}>
                  {line}
                  {j < section.formula.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="method-note">
        <strong>Nota:</strong> este es un modelo educativo simplificado (k constante) para comparar
        métodos numéricos de resolución de EDOs. La estimación forense real utiliza modelos más
        completos (p. ej. nomograma de Henssge) y no debe emplearse como evidencia pericial.
      </div>
    </motion.div>
  )
}
