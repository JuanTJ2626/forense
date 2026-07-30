// ─── Forensic Math Engine ─────────────────────────────────────
// Newton's Law of Cooling: dT/dt = -k·(T - T_amb)

export function f(T, Tamb, k) {
  return -k * (T - Tamb);
}

export function simulateEuler(T0, Tamb, k, h, tEnd) {
  let t = 0, T = T0;
  const rows = [{ t, T }];
  while (t < tEnd - 1e-9) {
    T = T + h * f(T, Tamb, k);
    t += h;
    rows.push({ t: parseFloat(t.toFixed(10)), T });
  }
  return rows;
}

export function simulateHeun(T0, Tamb, k, h, tEnd) {
  let t = 0, T = T0;
  const rows = [{ t, T }];
  while (t < tEnd - 1e-9) {
    const f0 = f(T, Tamb, k);
    const Tpred = T + h * f0;
    const f1 = f(Tpred, Tamb, k);
    T = T + (h / 2) * (f0 + f1);
    t += h;
    rows.push({ t: parseFloat(t.toFixed(10)), T });
  }
  return rows;
}

export function exactT(t, T0, Tamb, k) {
  return Tamb + (T0 - Tamb) * Math.exp(-k * t);
}

export function findCrossing(rows, Tm) {
  for (let i = 1; i < rows.length; i++) {
    const a = rows[i - 1], b = rows[i];
    if (a.T >= Tm && b.T <= Tm) {
      if (b.T === a.T) return a.t;
      const frac = (a.T - Tm) / (a.T - b.T);
      return a.t + frac * (b.t - a.t);
    }
  }
  return null;
}

export function fmtHours(hrs) {
  if (hrs === null || hrs === undefined) return "—";
  const h = Math.floor(hrs);
  const m = Math.round((hrs - h) * 60);
  return `${h} h ${String(m).padStart(2, '0')} min`;
}

export function minutesToClock(baseMinutes) {
  let mm = ((Math.round(baseMinutes) % 1440) + 1440) % 1440;
  const h = Math.floor(mm / 60);
  const m = mm % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function runSimulation({ Tamb, Tm, T0, k, h, horaStr }) {
  if ([Tamb, Tm, T0, k, h].some(isNaN) || k <= 0 || h <= 0 || Tm <= Tamb || Tm >= T0) {
    return { error: "Revisa los datos: k y h deben ser positivos, y la temperatura medida debe estar entre la ambiente y la corporal normal." };
  }

  let tEnd = (1 / k) * Math.log((T0 - Tamb) / (Tm - Tamb)) * 1.6 + h * 2;
  tEnd = Math.max(tEnd, h * 10);

  const euler = simulateEuler(T0, Tamb, k, h, tEnd);
  const heun = simulateHeun(T0, Tamb, k, h, tEnd);
  const exact = euler.map(row => ({ t: row.t, T: exactT(row.t, T0, Tamb, k) }));

  const tEulerCross = findCrossing(euler, Tm);
  const tHeunCross = findCrossing(heun, Tm);
  const tExactCross = (1 / k) * Math.log((T0 - Tamb) / (Tm - Tamb));

  const [hh, mm] = (horaStr || "22:30").split(':').map(Number);
  const baseMinutes = hh * 60 + mm;

  // Build chart data
  const chartData = euler.map((row, i) => ({
    t: parseFloat(row.t.toFixed(2)),
    euler: parseFloat(row.T.toFixed(3)),
    heun: parseFloat(heun[i].T.toFixed(3)),
    exacta: parseFloat(exact[i].T.toFixed(3)),
    Tm,
  }));

  // Build table data
  const tableData = euler.map((row, i) => ({
    t: parseFloat(row.t.toFixed(2)),
    euler: parseFloat(row.T.toFixed(3)),
    heun: parseFloat(heun[i].T.toFixed(3)),
    exacta: parseFloat(exact[i].T.toFixed(3)),
    errorEuler: parseFloat(Math.abs(row.T - exact[i].T).toFixed(4)),
    errorHeun: parseFloat(Math.abs(heun[i].T - exact[i].T).toFixed(4)),
  }));

  // Build verdict
  const methods = [
    {
      id: 'exact',
      label: 'Solución exacta',
      deltaT: tExactCross,
      clock: tExactCross !== null ? minutesToClock(baseMinutes - tExactCross * 60) : '--:--',
      error: null,
    },
    {
      id: 'euler',
      label: 'Método de Euler',
      deltaT: tEulerCross,
      clock: tEulerCross !== null ? minutesToClock(baseMinutes - tEulerCross * 60) : '--:--',
      error: tEulerCross !== null ? Math.abs(tEulerCross - tExactCross) : null,
    },
    {
      id: 'heun',
      label: 'Euler mejorado (Heun)',
      deltaT: tHeunCross,
      clock: tHeunCross !== null ? minutesToClock(baseMinutes - tHeunCross * 60) : '--:--',
      error: tHeunCross !== null ? Math.abs(tHeunCross - tExactCross) : null,
    },
  ];

  return {
    chartData,
    tableData,
    methods,
    stampTime: tExactCross !== null ? minutesToClock(baseMinutes - tExactCross * 60) : '--:--',
    Tm,
    tEnd,
  };
}
