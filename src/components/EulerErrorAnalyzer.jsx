import { useMemo } from 'react'

export default function EulerErrorAnalyzer({ data, hStep = 0.5 }) {
  // Compute max absolute error and root-mean-square error (RMSE) for Euler vs Exact
  const metrics = useMemo(() => {
    if (!data || data.length === 0) return { maxErr: 0, rmse: 0, order: 'O(h)' }
    
    let sumSqErr = 0
    let maxErr = 0

    data.forEach(row => {
      const err = Math.abs(row.euler - row.exacta)
      if (err > maxErr) maxErr = err
      sumSqErr += err * err
    })

    const rmse = Math.sqrt(sumSqErr / data.length)
    return {
      maxErr: maxErr.toFixed(4),
      rmse: rmse.toFixed(4),
      order: 'O(h)',
    }
  }, [data])

  return (
    <div className="bento-item euler-error-card" style={{ position: 'relative' }}>
      <div className="bento-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><i></i> ANÁLISIS DE ERROR Y CONVERGENCIA EDO</span>
        <span style={{ fontSize: '9px', color: '#ff9800', fontFamily: 'var(--font-mono)' }}>TRUNCAMIENTO EULER O(h)</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontFamily: 'var(--font-mono)' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px' }}>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>PASO h SELECCIONADO</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff9800', marginTop: '2px' }}>{hStep} h</div>
          <div style={{ fontSize: '8px', color: 'var(--text-muted)', marginTop: '2px' }}>Intervalo de malla</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px' }}>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>ERROR MÁXIMO |T_e - T_x|</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#f44336', marginTop: '2px' }}>{metrics.maxErr}°C</div>
          <div style={{ fontSize: '8px', color: 'var(--text-muted)', marginTop: '2px' }}>Sesgo de truncamiento</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px' }}>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>ERROR CUADRÁTICO RMSE</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4caf50', marginTop: '2px' }}>{metrics.rmse}°C</div>
          <div style={{ fontSize: '8px', color: 'var(--text-muted)', marginTop: '2px' }}>Desviación global RMS</div>
        </div>
      </div>
    </div>
  )
}
