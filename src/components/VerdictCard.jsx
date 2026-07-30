import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { fmtHours } from '../utils/forensicMath'

export default function VerdictCard({ methods, stampTime }) {
  const stampRef = useRef(null)

  useEffect(() => {
    if (stampTime && stampTime !== '--:--' && stampRef.current) {
      gsap.fromTo(stampRef.current,
        { scale: 2.8, opacity: 0, rotation: -35 },
        { scale: 1, opacity: 1, rotation: -12, duration: 0.6, ease: 'back.out(1.8)' }
      )
    }
  }, [stampTime])

  const handleExportPrint = () => {
    window.print()
  }

  if (!methods || methods.length === 0) {
    return (
      <div className="verdict-container">
        <div className="bento-title"><i></i> VEREDICTO</div>
        <div style={{ color: 'var(--text-muted)' }}>Presiona CALCULAR para ver la estimación...</div>
      </div>
    )
  }

  return (
    <>
      <div className="bento-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><i></i> DICTAMEN FORENSE · ESTIMACIÓN DEL IPM</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '9px', color: '#4caf50', fontFamily: 'var(--font-mono)' }}>● CONVERGENCIA OFICIAL</span>
          <button
            onClick={handleExportPrint}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: '600',
              padding: '4px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              transition: 'background 0.2s',
            }}
          >
            🖨 Imprimir Dictamen
          </button>
        </div>
      </div>
      <div className="verdict-container">
        <div className="verdict-list">
          <AnimatePresence>
            {methods.map((m, idx) => (
              <motion.div
                key={m.id}
                className="verdict-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, type: 'spring', stiffness: 300, damping: 24 }}
              >
                <span className="v-label">
                  {m.label} <span style={{ fontSize: '10px', opacity: 0.5 }}>(Δt {fmtHours(m.deltaT)})</span>
                </span>
                <span
                  className="v-val"
                  style={{
                    color: m.id === 'exact' ? '#4caf50' : m.id === 'euler' ? '#ff9800' : '#f44336',
                  }}
                >
                  {m.clock} {m.error && <span style={{ fontSize: '10px', opacity: 0.5 }}>dif. {fmtHours(m.error)}</span>}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="verdict-stamp-wrap">
          <motion.div
            ref={stampRef}
            className="verdict-stamp"
            whileHover={{ scale: 1.05, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="stamp-lbl">DICTAMEN FORENSE</span>
            <span className="stamp-time">{stampTime || '--:--'}</span>
            <span className="stamp-lbl">HORA DE DEFUNCIÓN</span>
          </motion.div>
        </div>
      </div>
    </>
  )
}
