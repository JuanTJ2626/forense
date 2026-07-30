import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HowToUse() {
  const container = useRef()

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".htu-step", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      })
    }, container)
    return () => ctx.revert()
  }, [])

  return (
    <div className="bento-item how-to-use" id="section-guia" ref={container}>
      <div className="bento-title"><i></i> PROTOCOLO DE PERITAJE · GUÍA DE USO</div>
      
      <div className="htu-step">
        <div className="htu-num">01</div>
        <div className="htu-content">
          <h3>Registrar Variables Termométricas de la Escena</h3>
          <p>Introduzca la <strong>T<sub>amb</sub></strong> (temperatura ambiente del lugar del hallazgo) y la <strong>T<sub>m</sub></strong> (temperatura rectal/hepática del cadáver registrada con termómetro forense). Confirme la <strong>hora exacta del hallazgo</strong> según el informe del primer respondiente.</p>
        </div>
      </div>

      <div className="htu-step">
        <div className="htu-num">02</div>
        <div className="htu-content">
          <h3>Calibrar los Parámetros de la EDO</h3>
          <p>Defina la <strong>constante de enfriamiento k</strong> (h<sup>-1</sup>). El valor estándar educativo oscila entre 0.10 y 0.20 h<sup>-1</sup> según el nomograma de Henssge. Ajuste el <strong>paso de integración h</strong>: un valor menor (e.g., 0.1 h) reduce el error de truncamiento O(h) del método de Euler. Presione <strong>CALCULAR</strong> para resolver la EDO numéricamente.</p>
        </div>
      </div>

      <div className="htu-step">
        <div className="htu-num">03</div>
        <div className="htu-content">
          <h3>Interpretar el Peritaje: Gráfica, Tabla y Veredicto</h3>
          <p>La <strong>gráfica T(t)</strong> muestra las tres trayectorias de enfriamiento superpuestas. El <strong>punto de cruce</strong> con la línea punteada T<sub>m</sub> indica el Δt estimado. El <strong>sello de veredicto</strong> traduce ese Δt a una hora de reloj, restándolo de la hora del hallazgo. Compare los errores absolutos |T<sub>euler</sub> − T<sub>exacta</sub>| en la tabla para validar la convergencia numérica.</p>
        </div>
      </div>
    </div>
  )
}
