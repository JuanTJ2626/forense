import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function BodyThermalScanner({ temperature = 29, ambient = 18, initial = 37 }) {
  // Normalize thermal ratio (0 = cold/ambient, 1 = initial body temp 37°C)
  const norm = useMemo(() => {
    return Math.max(0, Math.min(1, (temperature - ambient) / (initial - ambient)))
  }, [temperature, ambient, initial])

  // Color mapping: Cold cyan (#06b6d4) -> Normal warm yellow (#f59e0b) -> Hot crimson (#ef4444)
  const coreColor = norm > 0.6 ? '#ef4444' : norm > 0.3 ? '#f59e0b' : '#06b6d4'
  const glowColor = norm > 0.6 ? 'rgba(239, 68, 68, 0.4)' : norm > 0.3 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(6, 182, 212, 0.4)'

  return (
    <div className="bento-item body-scanner-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="bento-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><i></i> ESCÁNER TERMOGRÁFICO ANATÓMICO</span>
        <span style={{ fontSize: '9px', color: coreColor, fontFamily: 'var(--font-mono)' }}>
          ● LECTURA EN TIEMPO REAL
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '20px', alignItems: 'center' }}>
        {/* SVG Anatomical Human Body Thermal Silhouette */}
        <div style={{ position: 'relative', height: '240px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <svg viewBox="0 0 100 220" style={{ height: '100%', filter: `drop-shadow(0 0 15px ${glowColor})` }}>
            <defs>
              <radialGradient id="bodyThermalGrad" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor={coreColor} stopOpacity="0.9" />
                <stop offset="60%" stopColor={coreColor} stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </radialGradient>
              <linearGradient id="scanBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor={coreColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Human Silhouette Path */}
            <path
              d="M 50,15 
                 C 43,15 41,22 41,27 
                 C 41,32 44,36 46,38
                 C 38,40 32,46 30,55
                 L 22,95 C 20,105 24,110 26,110 L 32,108 L 34,75 L 38,75
                 L 38,135 L 33,200 C 32,210 42,212 45,205 L 49,145 L 51,145
                 L 55,205 C 58,212 68,210 67,200 L 62,135 L 62,75 L 66,75
                 L 68,108 L 74,110 C 76,110 80,105 78,95
                 L 70,55 C 68,46 62,40 54,38
                 C 56,36 59,32 59,27
                 C 59,22 57,15 50,15 Z"
              fill="url(#bodyThermalGrad)"
              stroke={coreColor}
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />

            {/* Rectal / Hepatic Core Probe Point */}
            <circle cx="50" cy="95" r="4" fill="#ffffff" />
            <circle cx="50" cy="95" r="8" fill="none" stroke={coreColor} strokeWidth="1">
              <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <line x1="50" y1="95" x2="80" y2="95" stroke={coreColor} strokeWidth="1" strokeDasharray="2 2" />
            <text x="82" y="98" fill="var(--text-main)" fontSize="7" fontFamily="var(--font-mono)">SONDA</text>

            {/* Target Crosshair Reticle */}
            <circle cx="50" cy="40" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <line x1="30" y1="40" x2="70" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <line x1="50" y1="20" x2="50" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Live Forensic Metrics Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-mono)' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sonda Rectal (Tm)</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: coreColor, marginTop: '2px' }}>
              {temperature.toFixed(1)}°C
            </div>
            <div style={{ fontSize: '9px', opacity: 0.6, marginTop: '2px' }}>
              Pérdida Térmica: -{(initial - temperature).toFixed(1)}°C
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sensor Ambiente (Tamb)</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#06b6d4', marginTop: '2px' }}>
              {ambient.toFixed(1)}°C
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gradiente Térmico</div>
            <div style={{ fontSize: '11px', color: 'var(--text-main)', marginTop: '2px' }}>
              ΔT = {(temperature - ambient).toFixed(1)} °C
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
