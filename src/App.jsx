import { useState, useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import ThreeCanvas3D from './components/ThreeCanvas3D'
import LandingHero from './components/LandingHero'
import ScienceSection from './components/ScienceSection'
import InputCard from './components/InputCard'
import CoolingChart from './components/CoolingChart'
import VerdictCard from './components/VerdictCard'
import DataTable from './components/DataTable'
import HowToUse from './components/HowToUse'
import CustomCursor from './components/CustomCursor'
import BodyThermalScanner from './components/BodyThermalScanner'
import HenssgeCalibrator from './components/HenssgeCalibrator'
import EulerErrorAnalyzer from './components/EulerErrorAnalyzer'
import { runSimulation } from './utils/forensicMath'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [activeTab, setActiveTab] = useState('inicio')
  const appRef = useRef()

  const [values, setValues] = useState({
    tamb: 18,
    tm: 29,
    hora: '22:30',
    t0: 37,
    k: 0.15,
    h: 0.5,
  })

  const [results, setResults] = useState(null)

  const clothingLabel = (() => {
    const factor = Number(values.ropa ?? 1.0)
    if (factor >= 2.0) return 'Cobertura intensa / inmersión'
    if (factor >= 1.3) return 'Ropa pesada / abrigo'
    if (factor >= 0.9) return 'Vestimenta ligera / normal'
    return 'Desnudo / aire quieto'
  })()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    handleCalculate()
  }, [])

  const handleCalculate = useCallback(() => {
    const result = runSimulation({
      Tamb: values.tamb,
      Tm: values.tm,
      T0: values.t0,
      k: values.k,
      h: values.h,
      horaStr: values.hora,
    })
    if (result.error) {
      alert(result.error)
      return
    }
    setResults(result)
  }, [values])

  const scrollTo = (id) => {
    setActiveTab(id)
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(`section-${id}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <div ref={appRef}>
      {/* Cabecera Pericial Oficial */}
      <div className="crime-scene-banner">
        <span>EXPEDIENTE PERICIAL Nº 2026-CL-0417 · UNIDAD DE MEDICINA LEGAL Y TANATOLOGÍA FORENSE · CLASIFICADO</span>
      </div>

      <div className="forensic-grid-overlay" />
      <div className="noise-overlay" />

      {/* Canvas Térmico 3D reactivo */}
      <ThreeCanvas3D theme={theme} temperature={values.tm} />

      <div className="app-wrapper">
        {/* Navegación Superior */}
        <nav className="top-nav bento-item">
          <div className="nav-logo" onClick={() => scrollTo('inicio')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div>PERITAJE<span>.FORENSE</span></div>
            <span style={{
              fontSize: '9px',
              fontFamily: 'var(--font-mono)',
              background: 'rgba(34, 197, 94, 0.15)',
              color: '#22c55e',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              padding: '2px 8px',
              borderRadius: '100px',
              letterSpacing: '0.08em'
            }}>● EN LÍNEA</span>
          </div>
          <div className="nav-links">
            <button className={`nav-link ${activeTab === 'inicio' ? 'active' : ''}`} onClick={() => scrollTo('inicio')}>
              Inicio
            </button>
            <button className={`nav-link ${activeTab === 'ciencia' ? 'active' : ''}`} onClick={() => scrollTo('ciencia')}>
              La Ciencia
            </button>
            <button className={`nav-link ${activeTab === 'simulador' ? 'active' : ''}`} onClick={() => scrollTo('simulador')}>
              Simulador
            </button>
            <button className={`nav-link ${activeTab === 'guia' ? 'active' : ''}`} onClick={() => scrollTo('guia')}>
              Guía
            </button>
          </div>
          <button className="theme-btn" onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>

        {/* Hero Landing Section */}
        <LandingHero onStart={() => scrollTo('simulador')} />

        {/* Science & Explanation Section */}
        <ScienceSection onGoToApp={() => scrollTo('simulador')} />

        {/* Interactive App / Simulator (Bento Grid) */}
        <div id="section-simulador" style={{ paddingTop: '40px' }}>
          <div className="bento-grid">
            {/* Simulator Header */}
            <header className="bento-item item-header">
              <div className="bento-title"><i></i> EXP. 2026-CL-0417 · SIMULADOR INTERACTIVO DE EULER</div>
              <h2 className="case-title-huge" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
                Simulación de Enfriamiento Cadavérico
              </h2>
              <p className="case-desc">
                Modifica los parámetros ambientales y corporales para calcular y comparar la hora estimada de fallecimiento usando Euler, Euler Mejorado (Heun) y la Solución Exacta.
              </p>
            </header>

            {/* Inputs Form */}
            <div className="bento-item item-inputs">
              <InputCard values={values} onChange={setValues} onCalculate={handleCalculate} />
            </div>

            {/* Chart with embedded anatomical thermal silhouette */}
            <div className="bento-item item-chart">
              <CoolingChart data={results?.chartData} Tm={results?.Tm} theme={theme} />
            </div>

            {/* Verdict */}
            <div className="bento-item item-verdict">
              <VerdictCard methods={results?.methods} stampTime={results?.stampTime} />
            </div>

            {/* Table */}
            <div className="bento-item item-table">
              <DataTable data={results?.tableData} />
            </div>

            <div className="print-report" style={{ display: 'none' }}>
              <div className="print-report-header">
                <div>
                  <div className="print-report-kicker">EXPEDIENTE PERICIAL · FORENSE</div>
                  <h2>Dictamen forense · Simulación de enfriamiento cadavérico</h2>
                  <p>Comparación numérica de Euler, Euler mejorado y solución exacta.</p>
                </div>
                <div className="print-report-badge">FORENSE</div>
              </div>

              <div className="print-report-grid">
                <div className="print-report-card">
                  <div className="print-card-title">Parámetros del caso</div>
                  <div className="print-param-grid">
                    <div className="print-param-item"><span>Temperatura ambiente</span><strong>{values.tamb} °C</strong></div>
                    <div className="print-param-item"><span>Temperatura medida</span><strong>{values.tm} °C</strong></div>
                    <div className="print-param-item"><span>Hora del hallazgo</span><strong>{values.hora}</strong></div>
                    <div className="print-param-item"><span>Vestimenta / cobertura</span><strong>{clothingLabel}</strong></div>
                    <div className="print-param-item"><span>Constante k</span><strong>{values.k}</strong></div>
                    <div className="print-param-item"><span>Paso de Euler</span><strong>{values.h}</strong></div>
                  </div>
                </div>

                <div className="print-report-card">
                  <div className="print-card-title">Resumen del dictamen</div>
                  <div className="print-method-list">
                    {results?.methods?.map((m) => (
                      <div key={m.id} className="print-method-item">
                        <div className="print-method-title">{m.label}</div>
                        <div className="print-method-value">{m.clock} {m.error ? `· diferencia ${m.error} h` : ''}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


              <div className="print-report-card">
                <div className="print-card-title">Tabla comparativa</div>
                <table className="print-table">
                  <thead>
                    <tr>
                      <th>t (h)</th>
                      <th>Euler</th>
                      <th>Euler Mej.</th>
                      <th>Exacta</th>
                      <th>Error Euler</th>
                      <th>Error E. Mej.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results?.tableData?.slice(0, 12).map((row, index) => (
                      <tr key={index}>
                        <td>{row.t}</td>
                        <td>{row.euler}</td>
                        <td>{row.heun}</td>
                        <td>{row.exacta}</td>
                        <td>{row.errorEuler}</td>
                        <td>{row.errorHeun}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="print-report-footer">
                <div>
                  <div className="print-footer-label">Perito responsable</div>
                  <div className="print-footer-line">________________________________</div>
                </div>
                <div>
                  <div className="print-footer-label">Fecha</div>
                  <div className="print-footer-line">______________</div>
                </div>
              </div>
            </div>

            {/* How To Use */}
            <HowToUse />
          </div>
        </div>
      </div>
    </div>
  )
}
