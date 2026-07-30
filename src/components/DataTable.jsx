export default function DataTable({ data }) {
  return (
    <>
      <div className="bento-title"><i></i> TABLA COMPARATIVA</div>
      <div className="data-table-wrap">
        <table>
          <thead>
            <tr>
              <th>t (h)</th>
              <th>Euler (°C)</th>
              <th>Euler Mej. (°C)</th>
              <th>Exacta (°C)</th>
              <th>Error Euler</th>
              <th>Error E. Mej.</th>
            </tr>
          </thead>
          <tbody>
            {(!data || data.length === 0) ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  Presiona CALCULAR para ver los datos de la simulación.
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i}>
                  <td>{row.t.toFixed(2)}</td>
                  <td style={{color: '#ff9800'}}>{row.euler.toFixed(3)}</td>
                  <td style={{color: '#f44336'}}>{row.heun.toFixed(3)}</td>
                  <td style={{color: '#4caf50'}}>{row.exacta.toFixed(3)}</td>
                  <td>{row.errorEuler.toFixed(4)}</td>
                  <td>{row.errorHeun.toFixed(4)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
