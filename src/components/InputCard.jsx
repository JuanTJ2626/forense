import { motion } from 'framer-motion'

export default function InputCard({ values, onChange, onCalculate }) {
  const handleChange = (id, val) => {
    onChange({ ...values, [id]: val })
  }

  // Handle clothing factor change -> auto compute empirical k
  const handleClothingChange = (factorStr) => {
    const factor = parseFloat(factorStr)
    const weight = values.peso || 70
    const computedK = parseFloat(((1.25 * factor) / Math.pow(weight, 0.625)).toFixed(3))
    onChange({ ...values, ropa: factor, k: computedK })
  }

  const handleWeightChange = (weightVal) => {
    const weight = parseFloat(weightVal) || 70
    const factor = values.ropa || 1.0
    const computedK = parseFloat(((1.25 * factor) / Math.pow(weight, 0.625)).toFixed(3))
    onChange({ ...values, peso: weight, k: computedK })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="bento-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><i></i> PARÁMETROS DEL CASO & EDO</span>
        <span style={{ fontSize: '9px', opacity: 0.5 }}>[ EULER · EDO ]</span>
      </div>

      <div className="input-group">
        <label htmlFor="tamb">Temperatura ambiente (°C)</label>
        <input
          className="input-field"
          type="number"
          step="0.1"
          id="tamb"
          value={values.tamb}
          onChange={(e) => handleChange('tamb', parseFloat(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label htmlFor="tm">Temperatura medida del cadáver (°C)</label>
        <input
          className="input-field"
          type="number"
          step="0.1"
          id="tm"
          value={values.tm}
          onChange={(e) => handleChange('tm', parseFloat(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label htmlFor="hora">Hora del hallazgo</label>
        <input
          className="input-field"
          type="time"
          id="hora"
          value={values.hora}
          onChange={(e) => handleChange('hora', e.target.value)}
        />
      </div>

      {/* Vestimenta y Entorno */}
      <div className="input-group">
        <label htmlFor="ropa">Vestimenta / Cobertura del cadáver</label>
        <select
          className="input-field"
          id="ropa"
          value={values.ropa || 1.0}
          onChange={(e) => handleClothingChange(e.target.value)}
        >
          <option value="0.75">Desnudo en aire quieto (fc = 0.75)</option>
          <option value="1.00">Vestimenta ligera normal (fc = 1.00)</option>
          <option value="1.35">Ropa pesada / Abrigo (fc = 1.35)</option>
          <option value="1.80">Cadáver cobijado (fc = 1.80)</option>
          <option value="2.20">Sumergido en agua (fc = 2.20)</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div className="input-group">
          <label htmlFor="k">Constante k (h⁻¹)</label>
          <input
            className="input-field"
            type="number"
            step="0.01"
            id="k"
            value={values.k}
            onChange={(e) => handleChange('k', parseFloat(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label htmlFor="h">Paso de Euler (h)</label>
          <input
            className="input-field"
            type="number"
            step="0.05"
            id="h"
            value={values.h}
            onChange={(e) => handleChange('h', parseFloat(e.target.value))}
          />
        </div>
      </div>

      <motion.button
        className="btn-primary"
        onClick={onCalculate}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        CALCULAR PERITAJE NUMÉRICO (EULER + HEUN) ▸
      </motion.button>
    </motion.div>
  )
}
