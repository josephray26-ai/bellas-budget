// Variation 2: "Editorial" — confident typography, generous whitespace, hairlines
// Type-driven, minimal color use, big numerals, magazine feel

function EditScreen({ children, padTop = 48 }) {
  return (
    <div className="phone-screen" style={{ background: '#fffaf6', paddingTop: padTop }}>
      {children}
    </div>
  );
}

function EditDivider({ pad = 20 }) {
  return <div style={{ height: 1, background: 'var(--hair)', margin: `0 ${pad}px` }} />;
}

function EditBar({ value, max, color = 'var(--coral)', height = 4 }) {
  const over = value > max;
  return (
    <div style={{ height, background: 'rgba(92,61,46,0.08)', borderRadius: 0, position: 'relative' }}>
      <div style={{
        height: '100%', width: Math.min(100, (value/max)*100) + '%',
        background: over ? 'var(--coral-deep)' : color,
      }} />
    </div>
  );
}

function EditTabBar({ active = 'home' }) {
  const items = ['Today','Buckets','Insights','You'];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height: 78, paddingTop: 12,
      borderTop: '1px solid var(--hair)',
      background: 'rgba(255,250,246,0.95)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
    }}>
      {items.map((it, i) => (
        <div key={it} style={{
          fontSize: 12, fontWeight: 800,
          color: i === 0 ? 'var(--ink)' : 'var(--ink-4)',
          letterSpacing: 0.4, textTransform: 'uppercase',
          paddingTop: 6, position: 'relative',
        }}>
          {it}
          {i === 0 && <div style={{
            position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)',
            width: 14, height: 2, background: 'var(--coral)',
          }} />}
        </div>
      ))}
    </div>
  );
}

function EditFAB() {
  return (
    <button style={{
      position: 'absolute', right: 22, bottom: 96,
      width: 56, height: 56, borderRadius: 999, border: 'none',
      background: 'var(--ink)', color: '#fff',
      fontSize: 28, fontWeight: 300, lineHeight: 1,
      boxShadow: '0 10px 24px rgba(61,36,25,0.32)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', zIndex: 10,
    }}>+</button>
  );
}

// ─── Screen 1: Dashboard ──────────────────────────────────────
function EditDashboard() {
  // sparkline path — daily spend Mon..Sun
  const days = [62, 48, 71, 0, 0, 0, 0];
  const cum = days.reduce((arr, v, i) => { arr.push((arr[i-1] || 0) + v); return arr; }, []);
  // Today is index 2; we draw cumulative thru today
  const pts = cum.slice(0, 3);
  const W = 280, H = 56, maxY = WEEK_BUDGET;
  const path = pts.map((y, i) => `${(i/(pts.length-1))*W},${H - (y/maxY)*H}`).join(' L ');

  return (
    <EditScreen>
      {/* Top label */}
      <div style={{ padding: '4px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1.4 }}>
          Wk 11 · Mar 17–23
        </div>
        <div style={{ fontSize: 18, color: 'var(--ink)' }}>⊙</div>
      </div>

      {/* Hero numeral */}
      <div style={{ padding: '28px 24px 0' }}>
        <div className="tnum" style={{
          fontSize: 96, fontWeight: 800, color: 'var(--ink)',
          letterSpacing: -4, lineHeight: 0.9,
        }}>
          <span style={{ fontSize: 42, fontWeight: 700, color: 'var(--ink-3)', verticalAlign: 'top', marginRight: 2 }}>$</span>
          {WEEK_LEFT}
        </div>
        <div style={{ marginTop: 14, fontSize: 16, fontWeight: 700, color: 'var(--ink-2)', lineHeight: 1.3 }}>
          left to spend through Sunday.
        </div>
        <div style={{ marginTop: 4, fontSize: 13, fontWeight: 700, color: 'var(--sage-deep)' }}>
          🌱 You're $46 ahead of pace. Six weeks running.
        </div>
      </div>

      {/* Sparkline */}
      <div style={{ padding: '24px 24px 6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1.4 }}>Pace</div>
          <div className="tnum" style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)' }}>{fmt(WEEK_SPENT)} / {fmt(WEEK_BUDGET)}</div>
        </div>
        <svg width="100%" height="64" viewBox={`0 0 ${W} ${H+8}`} preserveAspectRatio="none">
          {/* target pace line */}
          <line x1="0" y1={H - (WEEK_BUDGET*0.43/maxY)*H} x2={W} y2="0"
            stroke="var(--ink-4)" strokeWidth="1" strokeDasharray="3 3"/>
          {/* actual */}
          <path d={`M ${path}`} stroke="var(--coral)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <circle cx={W * 2/6} cy={H - (cum[2]/maxY)*H} r="4" fill="var(--coral)"/>
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 800, color: 'var(--ink-4)', marginTop: 2, letterSpacing: 0.4 }}>
          <span>MON</span><span>TUE</span><span style={{ color: 'var(--coral-deep)' }}>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
        </div>
      </div>

      <EditDivider pad={24} />

      {/* Buckets list — editorial hairline rows */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1.4 }}>Buckets</div>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--coral-deep)', letterSpacing: 0.8 }}>SEE ALL →</div>
        </div>
        {BUCKETS.slice(0, 5).map((b, i) => {
          const left = b.monthly - b.spent;
          const p = pct(b.spent, b.monthly);
          const tight = p > 85;
          return (
            <div key={b.id} style={{ padding: i === 0 ? '0 0 14px' : '14px 0', borderTop: i > 0 ? '1px solid var(--hair)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{b.icon}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.2 }}>{b.name}</span>
                </div>
                <div className="tnum" style={{ fontSize: 14, fontWeight: 800, color: tight ? 'var(--coral-deep)' : 'var(--ink)' }}>
                  {fmt(left)}
                  <span style={{ fontWeight: 600, color: 'var(--ink-4)' }}> / {fmt(b.monthly)}</span>
                </div>
              </div>
              <EditBar value={b.spent} max={b.monthly} color={b.color}/>
            </div>
          );
        })}
      </div>
      <div style={{ height: 100 }} />

      <EditFAB />
      <EditTabBar />
    </EditScreen>
  );
}

// ─── Screen 2: Add Expense ────────────────────────────────────
function EditAddExpense() {
  const [amount] = React.useState('38.50');
  const keys = ['1','2','3','4','5','6','7','8','9','.','0','⌫'];
  return (
    <EditScreen padTop={48}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 24px 4px' }}>
        <div style={{ fontSize: 22, fontWeight: 300, color: 'var(--ink-2)' }}>×</div>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1.4 }}>New Expense</div>
        <div style={{ width: 22 }} />
      </div>

      {/* Amount */}
      <div style={{ padding: '32px 24px 8px', textAlign: 'left' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1.2 }}>How much?</div>
        <div className="tnum" style={{
          marginTop: 8, fontSize: 80, fontWeight: 800, color: 'var(--ink)',
          letterSpacing: -3.6, lineHeight: 0.95,
        }}>
          <span style={{ fontSize: 36, color: 'var(--ink-3)', verticalAlign: 'top', marginRight: 4, fontWeight: 700 }}>$</span>
          {amount}
          <span style={{ display: 'inline-block', width: 3, height: 56, background: 'var(--coral)', verticalAlign: 'baseline', marginLeft: 4, animation: 'blink 1s infinite' }} />
        </div>
      </div>

      <EditDivider pad={24} />

      {/* Bucket — editorial list-style with radios */}
      <div style={{ padding: '14px 24px 4px', fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1.2 }}>
        Bucket
      </div>
      <div style={{ padding: '0 24px 8px' }}>
        {BUCKETS.slice(0, 4).map((b, i) => {
          const sel = b.id === 'dining';
          return (
            <div key={b.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 0', borderTop: i > 0 ? '1px solid var(--hair)' : 'none',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 999,
                border: sel ? '6px solid var(--coral)' : '1.5px solid var(--hair-2)',
                background: '#fff',
              }} />
              <div style={{ fontSize: 15 }}>{b.icon}</div>
              <div style={{ flex: 1, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{b.name}</div>
              {sel && <div className="tnum" style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)' }}>{fmt(b.monthly - b.spent)} left</div>}
            </div>
          );
        })}
      </div>

      {/* Keypad — hairlines only */}
      <div style={{ padding: '6px 0 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--hair)' }}>
        {keys.map((k, i) => (
          <div key={k} style={{
            height: 56,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 600, color: 'var(--ink)',
            borderRight: (i+1)%3 !== 0 ? '1px solid var(--hair)' : 'none',
            borderBottom: i < 9 ? '1px solid var(--hair)' : 'none',
          }}>{k}</div>
        ))}
      </div>

      {/* Save */}
      <div style={{ padding: '14px 24px 24px' }}>
        <div style={{
          height: 52, background: 'var(--ink)', color: '#fff',
          fontSize: 14, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 4,
        }}>
          Save expense — $38.50
        </div>
      </div>
    </EditScreen>
  );
}

// ─── Screen 3: Bucket Detail ──────────────────────────────────
function EditBucketDetail() {
  const b = bucketById('dining');
  const left = b.monthly - b.spent;
  const items = [
    { id: 'd1', label: 'Pizzeria Mozza', amount: 38.50, when: 'Today, 12:30 PM' },
    { id: 'd2', label: 'Sushi Park',     amount: 54.20, when: 'Sat, Mar 15' },
    { id: 'd3', label: 'Sqirl',          amount: 22.10, when: 'Fri, Mar 14' },
    { id: 'd4', label: 'Bestia',         amount: 88.00, when: 'Wed, Mar 12' },
    { id: 'd5', label: "Trois Mec",      amount: 43.20, when: 'Mon, Mar 10' },
  ];
  return (
    <EditScreen padTop={48}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 24px 12px' }}>
        <div style={{ fontSize: 22, fontWeight: 300, color: 'var(--ink-2)' }}>←</div>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1.4 }}>Bucket</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--coral-deep)' }}>Edit</div>
      </div>

      {/* Editorial bucket title */}
      <div style={{ padding: '8px 24px 0' }}>
        <div style={{ fontSize: 56 }}>{b.icon}</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--ink)', letterSpacing: -1, lineHeight: 1, marginTop: 4 }}>{b.name}.</div>
        <div style={{ marginTop: 10, fontSize: 15, color: 'var(--ink-3)', fontWeight: 700, lineHeight: 1.4 }}>
          You've spent <span style={{ color: 'var(--ink)' }}>{fmt(b.spent)}</span> of <span style={{ color: 'var(--ink)' }}>{fmt(b.monthly)}</span> this month.
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '24px 24px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 10, rowGap: 16 }}>
        {[
          { l: 'Left this month',  v: fmt(left),  s: '12 days remaining', c: 'var(--coral-deep)' },
          { l: 'This week',        v: fmt(62),    s: 'of $70 weekly',     c: 'var(--ink)' },
          { l: 'Avg / expense',    v: '$41',      s: 'last 30 days',      c: 'var(--ink)' },
          { l: 'Visits',           v: '8',        s: 'this month',        c: 'var(--ink)' },
        ].map((s, i) => (
          <div key={i} style={{ borderTop: '1px solid var(--ink)', paddingTop: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1.2 }}>{s.l}</div>
            <div className="tnum" style={{ fontSize: 24, fontWeight: 800, color: s.c, letterSpacing: -0.6, marginTop: 2 }}>{s.v}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-4)', fontWeight: 700, marginTop: 1 }}>{s.s}</div>
          </div>
        ))}
      </div>

      {/* Month bar */}
      <div style={{ padding: '20px 24px 0' }}>
        <EditBar value={b.spent} max={b.monthly} color={b.color} height={6}/>
        <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 800, color: 'var(--ink-4)', letterSpacing: 0.6 }}>
          <span>MAR 1</span><span style={{ color: 'var(--coral-deep)' }}>TODAY · 88%</span><span>MAR 31</span>
        </div>
      </div>

      {/* History */}
      <div style={{ padding: '28px 24px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 8 }}>History</div>
        {items.map((it, i) => (
          <div key={it.id} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            padding: '12px 0', borderTop: '1px solid var(--hair)',
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)' }}>{it.label}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-4)', marginTop: 2, letterSpacing: 0.2 }}>{it.when}</div>
            </div>
            <div className="tnum" style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>{fmtC(it.amount)}</div>
          </div>
        ))}
      </div>
    </EditScreen>
  );
}

// ─── Screen 4: Manage ──────────────────────────────────────────
function EditManageBuckets() {
  return (
    <EditScreen padTop={48}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 24px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)' }}>Done</div>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1.4 }}>Buckets</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--coral-deep)' }}>+ Add</div>
      </div>

      <div style={{ padding: '8px 24px 0' }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--ink)', letterSpacing: -1, lineHeight: 1 }}>Ten buckets,</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: -1, lineHeight: 1 }}>{fmt(MONTHLY_BUDGET)}/month.</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-3)', marginTop: 10 }}>
          Drag to reorder. Tap to edit a bucket's name, color, or limit.
        </div>
      </div>

      <div style={{ padding: '24px 24px 0' }}>
        {BUCKETS.map((b, i) => (
          <div key={b.id} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 0', borderTop: '1px solid var(--hair)',
            borderBottom: i === BUCKETS.length - 1 ? '1px solid var(--hair)' : 'none',
          }}>
            <div style={{ fontSize: 14, color: 'var(--ink-4)', fontWeight: 800, letterSpacing: 1.4 }}>0{i+1}</div>
            <div style={{
              width: 12, height: 12, borderRadius: 999, background: b.color,
            }} />
            <div style={{ fontSize: 17 }}>{b.icon}</div>
            <div style={{ flex: 1, fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>{b.name}</div>
            <div className="tnum" style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink-2)' }}>{fmt(b.monthly)}</div>
            <div style={{ fontSize: 16, color: 'var(--ink-4)' }}>›</div>
          </div>
        ))}
      </div>
      <div style={{ height: 40 }} />
    </EditScreen>
  );
}

Object.assign(window, { EditDashboard, EditAddExpense, EditBucketDetail, EditManageBuckets });
