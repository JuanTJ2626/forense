import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function CaseHeader() {
  const titleRef = useRef(null)
  const badgeRef = useRef(null)
  const caseIdRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(caseIdRef.current,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 20, clipPath: 'inset(0 100% 0 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)', duration: 1 },
      '-=0.3'
    )
    .fromTo(badgeRef.current,
      { opacity: 0, scale: 2.5, rotation: 15 },
      { opacity: 1, scale: 1, rotation: 4, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.5'
    )
  }, [])

  return (
    <div className="case-header">
      <div>
        <motion.div
          ref={caseIdRef}
          className="case-id"
          initial={{ opacity: 0 }}
        >
          Expediente N.º 2026-CL-0417 &nbsp;·&nbsp; Medicina Legal
        </motion.div>

        <h1 ref={titleRef} className="case-title" style={{ opacity: 0 }}>
          Estimación de la hora de muerte
          <br />
          por enfriamiento corporal
        </h1>

        <motion.p
          className="case-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Comparación numérica: método de Euler vs. Euler mejorado (Heun)
          frente a la solución exacta de la Ley de Enfriamiento de Newton.
        </motion.p>
      </div>

      <div ref={badgeRef} className="confidential-badge" style={{ opacity: 0 }}>
        CONFIDENCIAL
      </div>
    </div>
  )
}
