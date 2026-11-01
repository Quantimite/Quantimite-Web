const INK = "#2a1340";

export function AreaChart({ data, labels, color = "#a818f5", height = 220 }: { data: number[]; labels: string[]; color?: string; height?: number }) {
  const W = 720, H = height, p = { l: 38, r: 8, t: 10, b: 24 };
  const max = Math.max(...data) * 1.1;
  const x = (i: number) => p.l + (i * (W - p.l - p.r)) / (data.length - 1);
  const y = (v: number) => p.t + (1 - v / max) * (H - p.t - p.b);
  const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(data.length - 1)} ${H - p.b} L${x(0)} ${H - p.b} Z`;
  const id = `g${color.slice(1)}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Trend chart">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".28" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}><line x1={p.l} x2={W - p.r} y1={y(max * t)} y2={y(max * t)} stroke={INK} strokeOpacity=".08" />
          <text x={p.l - 6} y={y(max * t) + 3} textAnchor="end" fontSize="10" fill={INK} fillOpacity=".45">{Math.round(max * t)}</text></g>
      ))}
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {labels.map((l, i) => i % 5 === 0 && <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill={INK} fillOpacity=".45">{l}</text>)}
    </svg>
  );
}

export function MiniBars({ data, color = "#2f8bfa", height = 90 }: { data: number[]; color?: string; height?: number }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[3px]" style={{ height }}>
      {data.map((v, i) => <div key={i} title={String(v)} className="flex-1 rounded-t-sm" style={{ height: `${(v / max) * 100}%`, background: color, opacity: 0.45 + 0.55 * (v / max) }} />)}
    </div>
  );
}

export function Spark({ data, color = "#a818f5" }: { data: number[]; color?: string }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${28 - ((v - min) / (max - min || 1)) * 26}`).join(" ");
  return <svg viewBox="0 0 100 30" className="h-8 w-24" preserveAspectRatio="none"><polyline points={pts} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg>;
}

export function HBars({ items }: { items: { label: string; value: number }[] }) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i.label}>
          <div className="mb-1 flex justify-between text-sm"><span className="font-medium text-plum/80">{i.label}</span><span className="font-semibold text-plum">{i.value}</span></div>
          <div className="h-2 rounded-full bg-plum/5"><div className="h-2 rounded-full bg-brand" style={{ width: `${(i.value / max) * 100}%` }} /></div>
        </li>
      ))}
    </ul>
  );
}

export function Donut({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((a, s) => a + s.value, 0), r = 42, c = 2 * Math.PI * r;
  let off = 0;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 120 120" className="h-36 w-36 shrink-0 -rotate-90" role="img" aria-label="Pipeline breakdown">
        <circle cx="60" cy="60" r={r} fill="none" stroke={INK} strokeOpacity=".06" strokeWidth="16" />
        {segments.map((s) => {
          const len = (s.value / total) * c;
          const el = <circle key={s.label} cx="60" cy="60" r={r} fill="none" stroke={s.color} strokeWidth="16" strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-off} />;
          off += len; return el;
        })}
      </svg>
      <ul className="space-y-1.5 text-sm">
        {segments.map((s) => (<li key={s.label} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} /><span className="text-plum/70">{s.label}</span><span className="font-semibold text-plum">{s.value}</span></li>))}
      </ul>
    </div>
  );
}
