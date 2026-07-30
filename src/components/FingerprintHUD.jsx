import { motion } from 'framer-motion'

export default function FingerprintHUD() {
  return (
    <div className="bento-item fingerprint-hud-card" style={{ position: 'relative' }}>
      <div className="bento-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><i></i> REGISTRO BIOMÉTRICO FORENSE</span>
        <span style={{ fontSize: '9px', color: '#eab308', fontFamily: 'var(--font-mono)' }}>EVIDENCIA #02</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Animated SVG Fingerprint HUD Scanner */}
        <div style={{ position: 'relative', width: '90px', height: '110px' }}>
          <svg viewBox="0 0 100 120" style={{ width: '100%', height: '100%' }}>
            {/* Fingerprint Arcs */}
            <g fill="none" stroke="var(--accent)" strokeWidth="2" opacity="0.85">
              <path d="M 50 15 C 30 15, 20 35, 20 60 C 20 85, 30 105, 50 105 C 70 105, 80 85, 80 60 C 80 35, 70 15, 50 15 Z" strokeDasharray="6 3" />
              <path d="M 50 25 C 35 25, 28 40, 28 60 C 28 80, 35 95, 50 95 C 65 95, 72 80, 72 60 C 72 40, 65 25, 50 25 Z" />
              <path d="M 50 35 C 40 35, 35 45, 35 60 C 35 75, 40 85, 50 85 C 60 85, 65 75, 65 60 C 65 45, 60 35, 50 35 Z" strokeDasharray="4 2" />
              <path d="M 50 45 C 44 45, 42 50, 42 60 C 42 70, 44 75, 50 75 C 56 75, 58 70, 58 60 C 58 50, 56 45, 50 45 Z" />
              <circle cx="50" cy="60" r="3" fill="var(--accent)" />
            </g>

            {/* Scanning Beam */}
            <motion.line
              x1="0" y1="10" x2="100" y2="10"
              stroke="#eab308"
              strokeWidth="2.5"
              filter="drop-shadow(0 0 6px #eab308)"
              animate={{ y1: [10, 110, 10], y2: [10, 110, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Corner HUD Brackets */}
            <path d="M 5 20 L 5 5 L 20 5" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" />
            <path d="M 80 5 L 95 5 L 95 20" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" />
            <path d="M 5 100 L 5 115 L 20 115" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" />
            <path d="M 80 115 L 95 115 L 95 100" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Biometric Case Data */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '6px', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>CÓDIGO DE ESCENA:</span>
            <span style={{ fontWeight: 'bold' }}>#CRIME-4017</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '6px', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>AFIS MATCH:</span>
            <span style={{ color: '#4caf50', fontWeight: 'bold' }}>99.8% VERIFICADO</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>ESTADO TANATOLÓGICO:</span>
            <span style={{ color: '#ef4444', fontWeight: 'bold' }}>ALGOR MORTIS EN CURSO</span>
          </div>
        </div>
      </div>
    </div>
  )
}
