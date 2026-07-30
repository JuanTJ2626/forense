import { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div style={{
      background: 'var(--bg-bento-solid)', 
      padding: '12px 16px', 
      border: '1px solid var(--border)', 
      borderRadius: '8px', 
      fontFamily: 'var(--font-mono)', 
      fontSize: '11px',
      boxShadow: 'var(--glass-shadow)'
    }}>
      <div style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>t = {label} h</div>
      {payload.map((entry, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', margin: '4px 0' }}>
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span style={{ color: entry.color, fontWeight: 'bold' }}>
            {typeof entry.value === 'number' ? entry.value.toFixed(3) : entry.value}°C
          </span>
        </div>
      ))}
    </div>
  )
}

export default function CoolingChart({ data, Tm = 29, theme }) {
  const isDark = theme === 'dark'

  // Dynamic body silhouette thermal color based on Tm
  const norm = Math.max(0, Math.min(1, (Tm - 18) / (37 - 18)))
  const coreColor = norm > 0.6 ? '#ef4444' : norm > 0.3 ? '#f59e0b' : '#06b6d4'

  return (
    <>
      <div className="bento-title" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span><i></i> CURVA DE ENFRIAMIENTO T(t) · EULER VS HEUN VS EXACTA</span>
        <div style={{ display: 'flex', gap: '16px', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: '#ff9800' }}>■ Euler O(h)</span>
          <span style={{ color: '#f44336' }}>■ Euler Mej. O(h²)</span>
          <span style={{ color: '#4caf50' }}>■ Solución Exacta</span>
        </div>
      </div>

      <div style={{ display: 'flex', width: '100%', height: '390px', maxHeight: '390px', gap: '16px', position: 'relative', overflow: 'hidden' }}>
        {/* Recharts Main Graph Area */}
        <div style={{ flex: 1, height: '100%', minWidth: 0, overflow: 'hidden' }}>
          {data && data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="t" tickFormatter={(v) => `${v}h`} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `${v}°`} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-hover)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                {Tm && (
                  <ReferenceLine 
                    y={Tm} 
                    stroke={isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)'} 
                    strokeDasharray="4 4" 
                    label={{ value: `Tm = ${Tm}°C (Cruce)`, position: 'insideTopLeft', fill: 'var(--text-muted)', fontSize: 10 }}
                  />
                )}
                <Line type="monotone" dataKey="euler" name="Euler" stroke="#ff9800" strokeWidth={2.5} dot={false} animationDuration={1000} />
                <Line type="monotone" dataKey="heun" name="Euler Mej." stroke="#f44336" strokeWidth={2.5} dot={false} animationDuration={1000} />
                <Line type="monotone" dataKey="exacta" name="Exacta" stroke="#4caf50" strokeWidth={2} dot={false} animationDuration={1000} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Presiona CALCULAR para iniciar la simulación.
            </div>
          )}
        </div>

        {/* Anatomical Human Body Thermal Watermark inside the Chart Card */}
        <div style={{ width: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid var(--border)', paddingLeft: '12px' }}>
          <div style={{ fontSize: '8px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '4px', textTransform: 'uppercase' }}>
            PERFIL TÉRMICO CADAVÉRICO
          </div>
          <svg viewBox="0 0 100 220" style={{ width: '60px', height: '140px', filter: `drop-shadow(0 0 10px ${coreColor})` }}>
            <defs>
              <radialGradient id="chartBodyGrad" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor={coreColor} stopOpacity="0.9" />
                <stop offset="70%" stopColor={coreColor} stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </radialGradient>
            </defs>
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
              fill="url(#chartBodyGrad)"
              stroke={coreColor}
              strokeWidth="1.5"
            />
            {/* Core probe dot */}
            <circle cx="50" cy="95" r="3" fill="#ffffff" />
            <circle cx="50" cy="95" r="6" fill="none" stroke={coreColor} strokeWidth="1">
              <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
          <div style={{ fontSize: '10px', fontWeight: 'bold', color: coreColor, fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            {Tm}°C
          </div>
        </div>
      </div>
    </>
  )
}
