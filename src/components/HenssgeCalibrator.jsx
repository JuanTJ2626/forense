import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HenssgeCalibrator({ kValue, onUpdateK }) {
  const [weight, setWeight] = useState(70)
  const [clothing, setClothing] = useState(1.0) // 1.0 = Vestimenta normal, 0.75 = Desnudo, 1.4 = Ropa pesada/Cobijas, 1.8 = Sumergido

  // Calculate empirical k using Henssge tanatological formula
  // k ≈ (1.25 * factor_vestimenta) / (Masa ^ 0.625)
  useEffect(() => {
    const computedK = parseFloat(((1.25 * clothing) / Math.pow(weight, 0.625)).toFixed(3))
    if (computedK !== kValue && computedK > 0) {
      onUpdateK(computedK)
    }
  }, [weight, clothing])

  return (
    <div className="bento-item henssge-card" style={{ position: 'relative' }}>
      <div className="bento-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><i></i> CALIBRADOR DE K (NOMOGRAMA DE HENSSGE)</span>
        <span style={{ fontSize: '9px', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>EDO PARAMETER</span>
      </div>

      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: '1.5' }}>
        Ajusta la masa corporal y vestimenta de la víctima para determinar empíricamente la constante de disipación <strong style={{ color: 'var(--accent)' }}>k (h⁻¹)</strong> usada en la EDO de Euler.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-mono)' }}>
        {/* Weight Slider */}
        <div className="input-group" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
            <span>MASA CORPORAL DEL CADÁVER:</span>
            <strong style={{ color: 'var(--text-main)' }}>{weight} kg</strong>
          </div>
          <input
            type="range"
            min="40"
            max="130"
            step="1"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)' }}
          />
        </div>

        {/* Clothing Selector */}
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label style={{ fontSize: '10px', marginBottom: '4px', display: 'block' }}>COEFICIENTE DE COBERTURA / ENTORNO:</label>
          <select
            className="input-field"
            value={clothing}
            onChange={(e) => setClothing(parseFloat(e.target.value))}
            style={{ fontSize: '11px', padding: '6px 10px' }}
          >
            <option value="0.75">Desnudo en aire quieto (f_c = 0.75)</option>
            <option value="1.00">Vestimenta ligera normal (f_c = 1.00)</option>
            <option value="1.35">Ropa pesada / Abrigo (f_c = 1.35)</option>
            <option value="1.80">Cadáver cobijado / Aislado (f_c = 1.80)</option>
            <option value="2.20">Sumergido en agua quieta (f_c = 2.20)</option>
          </select>
        </div>

        {/* Live Formula Display */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px dashed var(--border)',
          borderRadius: '6px',
          padding: '8px 12px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          marginTop: '4px'
        }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Constante k Calculada:</span>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--accent)' }}>
            k = {((1.25 * clothing) / Math.pow(weight, 0.625)).toFixed(3)} h⁻¹
          </span>
        </div>
      </div>
    </div>
  )
}
