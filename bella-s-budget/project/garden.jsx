// Variation 1: "Garden" — soft, encouraging, sage-and-coral
// Four screens: Dashboard, Add Expense, Bucket Detail, Manage Buckets

// ─── tiny helper components ────────────────────────────────────
function GardenScreen({ children, padTop = 60, bg = 'var(--bg)' }) {
  return (
    <div className="phone-screen" style={{ background: bg, paddingTop: padTop }}>
      {children}
    </div>
  );
}

function StreakChip() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px 6px 8px', borderRadius: 999,
      background: 'rgba(125, 168, 130, 0.14)',
      color: 'var(--sage-deep)', fontSize: 13, fontWeight: 700,
    }}>
      <span style={{ fontSize: 14 }}>🌱</span>
      {STREAK_WEEKS}&nbsp;week streak
    </div>
  );
}

function ProgressBar({ value, max, color = 'var(--coral)', height = 6, track = 'rgba(92,61,46,0.08)' }) {
  const w = Math.min(100, (value / max) * 100);
  const over = value > max;
  return (
    <div style={{ height, background: track, borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
      <div style={{
        width: w + '%', height: '100%',
        background: over ? 'var(--coral-deep)' : color,
        borderRadius: 999,
        transition: 'width .4s ease',
      }} />
    </div>
  );
}

function FAB({ onClick, label = '+' }) {
  return (
    <button onClick={onClick} style={{
      position: 'absolute', right: 20, bottom: 96,
      width: 60, height: 60, borderRadius: 999, border: 'none',
      background: 'var(--coral)', color: '#fff',
      fontSize: 32, fontWeight: 300, lineHeight: 1,
      boxShadow: '0 10px 24px rgba(232,93,79,0.42), 0 2px 6px rgba(232,93,79,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', zIndex: 10,
    }}>{label}</button>
  );
}

function BottomNav({ active = 'home' }) {
  const items = [
    { id: 'home',    label: 'Home',    icon: '◐' },
    { id: 'buckets', label: 'Buckets', icon: '◇' },
    { id: 'history', label: 'History', icon: '⌖' },
    { id: 'me',      label: 'Bella',   icon: '○' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height: 84, background: 'rgba(255,245,238,0.92)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--hair)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
      paddingTop: 10,
    }}>
      {items.map(it => (
        <div key={it.id} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          color: active === it.id ? 'var(--coral-deep)' : 'var(--ink-3)',
          fontSize: 11, fontWeight: 700,
        }}>
          <div style={{ fontSize: 20, lineHeight: 1 }}>{it.icon}</div>
          {it.label}
        </div>
      ))}
    </div>
  );
}

// ─── Screen 1: Dashboard ──────────────────────────────────────
function GardenDashboard() {
  const dayLabels = ['M','T','W','T','F','S','S'];
  const maxDay = Math.max(...WEEK_DAILY, 100);
  return (
    <GardenScreen>
      {/* Header */}
      <div style={{ padding: '0 20px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600 }}>Good morning,</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.3 }}>Bella ☀️</div>
          </div>
          <StreakChip />
        </div>
      </div>

      {/* Hero card */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: 'linear-gradient(180deg, #fffaf6 0%, #ffffff 100%)',
          border: '1px solid rgba(125,168,130,0.18)',
          borderRadius: 22, padding: '18px 20px 20px',
          boxShadow: '0 1px 0 rgba(125,168,130,0.06), 0 8px 24px rgba(92,61,46,0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sage-deep)', textTransform: 'uppercase', letterSpacing: 0.6 }}>This&nbsp;week</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>Wed · Day 3 of 7</div>
          </div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span className="tnum" style={{ fontSize: 44, fontWeight: 800, color: 'var(--ink)', letterSpacing: -1.2 }}>{fmt(WEEK_LEFT)}</span>
            <span style={{ fontSize: 14, color: 'var(--ink-3)', fontWeight: 600 }}>left of {fmt(WEEK_BUDGET)}</span>
          </div>
          <div style={{ marginTop: 4, fontSize: 13, color: 'var(--sage-deep)', fontWeight: 700 }}>
            🌱 You're $46 ahead of pace — nice.
          </div>

          {/* Week bars */}
          <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'flex-end', height: 56 }}>
            {WEEK_DAILY.map((v, i) => {
              const isToday = i === 2;
              const future = v === 0 && i > 2;
              const h = future ? 8 : Math.max(8, (v / maxDay) * 48);
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: '100%', height: h, borderRadius: 6,
                    background: future ? 'rgba(92,61,46,0.06)' : isToday ? 'var(--coral)' : 'var(--peach-2)',
                  }} />
                  <div style={{ fontSize: 10, fontWeight: 700, color: isToday ? 'var(--coral-deep)' : 'var(--ink-4)' }}>
                    {dayLabels[i]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Buckets list */}
      <div style={{ padding: '22px 20px 110px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>Your buckets</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--coral-deep)' }}>This&nbsp;month</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {BUCKETS.slice(0, 5).map(b => {
            const left = b.monthly - b.spent;
            const p = pct(b.spent, b.monthly);
            const tight = p > 85;
            return (
              <div key={b.id} style={{
                background: '#fff', borderRadius: 16,
                padding: '12px 14px',
                border: '1px solid var(--hair)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 12,
                  background: b.color + '24',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}>{b.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>{b.name}</div>
                    <div className="tnum" style={{ fontSize: 13, fontWeight: 800, color: tight ? 'var(--coral-deep)' : 'var(--ink-2)' }}>
                      {fmt(left)} <span style={{ fontWeight: 600, color: 'var(--ink-4)' }}>left</span>
                    </div>
                  </div>
                  <ProgressBar value={b.spent} max={b.monthly} color={b.color} />
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', padding: '4px 0' }}>
            + 5&nbsp;more buckets
          </div>
        </div>
      </div>

      <FAB />
      <BottomNav active="home" />
    </GardenScreen>
  );
}

// ─── Screen 2: Add Expense ────────────────────────────────────
function GardenAddExpense() {
  const [amount, setAmount] = React.useState('38.50');
  const [bucket, setBucket] = React.useState('dining');
  const keys = ['1','2','3','4','5','6','7','8','9','.','0','⌫'];
  return (
    <GardenScreen padTop={48}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 20px 8px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink-3)' }}>Cancel</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)' }}>New expense</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink-4)' }}>&nbsp;</div>
      </div>

      {/* Amount */}
      <div style={{ padding: '24px 20px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>Amount</div>
        <div className="tnum" style={{
          marginTop: 8, fontSize: 64, fontWeight: 800, color: 'var(--ink)', letterSpacing: -2,
          lineHeight: 1,
        }}>
          <span style={{ fontSize: 36, color: 'var(--ink-3)', verticalAlign: 'top', marginRight: 2 }}>$</span>
          {amount}
        </div>
        <div style={{ marginTop: 4, height: 2, width: 110, background: 'var(--coral)', margin: '6px auto 0', borderRadius: 2 }} />
      </div>

      {/* Bucket pills */}
      <div style={{ padding: '22px 0 14px' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, padding: '0 20px 10px' }}>Bucket</div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px', flexWrap: 'wrap' }}>
          {BUCKETS.slice(0, 6).map(b => {
            const sel = b.id === bucket;
            return (
              <div key={b.id} onClick={() => setBucket(b.id)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 12px', borderRadius: 999,
                background: sel ? b.color : '#fff',
                border: sel ? `1px solid ${b.color}` : '1px solid var(--hair-2)',
                color: sel ? '#fff' : 'var(--ink-2)',
                fontSize: 13, fontWeight: 800,
                boxShadow: sel ? `0 4px 12px ${b.color}55` : 'none',
                cursor: 'pointer',
              }}>
                <span>{b.icon}</span>{b.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* Note row */}
      <div style={{ padding: '4px 20px 12px' }}>
        <div style={{
          background: '#fff', border: '1px solid var(--hair)',
          borderRadius: 14, padding: '12px 14px',
          fontSize: 14, color: 'var(--ink-3)', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 16 }}>✏️</span>
          Pizzeria Mozza
        </div>
      </div>

      {/* Keypad */}
      <div style={{ padding: '8px 14px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {keys.map(k => (
          <div key={k} style={{
            height: 52, borderRadius: 14,
            background: '#fff', border: '1px solid var(--hair)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 700, color: 'var(--ink)',
          }}>{k}</div>
        ))}
      </div>

      {/* Save */}
      <div style={{ padding: '12px 16px 28px' }}>
        <div style={{
          height: 54, borderRadius: 999, background: 'var(--coral)',
          color: '#fff', fontSize: 16, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 16px rgba(232,93,79,0.35)',
        }}>
          Save ${amount}
        </div>
      </div>
    </GardenScreen>
  );
}

// ─── Screen 3: Bucket Detail ──────────────────────────────────
function GardenBucketDetail() {
  const b = bucketById('dining');
  const left = b.monthly - b.spent;
  const items = RECENT.filter(r => r.bucket === 'dining').concat([
    { id: 'd2', label: 'Sushi Park',  amount: 54.20, when: 'Sat · 8:00p' },
    { id: 'd3', label: 'Sqirl',       amount: 22.10, when: 'Fri · 10:15a' },
    { id: 'd4', label: 'Bestia',      amount: 88.00, when: 'Mar 12' },
  ]);
  const ringP = pct(b.spent, b.monthly);
  const r = 38, C = 2 * Math.PI * r;
  return (
    <GardenScreen padTop={48} bg="#fff">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 20px 8px', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink-3)' }}>←</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>{b.name}</div>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--coral-deep)' }}>Edit</div>
      </div>

      {/* Hero */}
      <div style={{
        margin: '14px 20px 0', borderRadius: 22, padding: 20,
        background: `linear-gradient(180deg, ${b.color}1f 0%, ${b.color}0a 100%)`,
        display: 'flex', alignItems: 'center', gap: 18,
      }}>
        {/* ring */}
        <div style={{ position: 'relative', width: 96, height: 96 }}>
          <svg width="96" height="96" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r={r} stroke={b.color + '33'} strokeWidth="8" fill="none"/>
            <circle cx="48" cy="48" r={r} stroke={b.color} strokeWidth="8" fill="none"
              strokeDasharray={`${(ringP/100)*C} ${C}`}
              strokeLinecap="round" transform="rotate(-90 48 48)"/>
          </svg>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 32,
          }}>{b.icon}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="tnum" style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.6, lineHeight: 1.05 }}>
            {fmt(left)}<span style={{ fontSize: 14, color: 'var(--ink-3)', fontWeight: 700 }}> left</span>
          </div>
          <div className="tnum" style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 700, marginTop: 2 }}>
            {fmt(b.spent)} of {fmt(b.monthly)} · March
          </div>
          <div style={{
            display: 'inline-flex', marginTop: 8,
            padding: '4px 10px', borderRadius: 999,
            background: 'rgba(232,93,79,0.12)', color: 'var(--coral-deep)',
            fontSize: 11, fontWeight: 800,
          }}>⚠ 88% used · 6 days left</div>
        </div>
      </div>

      {/* This week mini */}
      <div style={{ padding: '20px 20px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>This week</div>
        <div className="tnum" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-3)' }}>{fmt(62)} of $70 weekly</div>
      </div>
      <div style={{ padding: '0 20px' }}>
        <ProgressBar value={62} max={70} color={b.color} height={8} />
      </div>

      {/* Recent */}
      <div style={{ padding: '22px 20px 0' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>Recent</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.slice(0, 5).map((it, i) => (
            <div key={it.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--hair)' : 'none',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{it.label}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', marginTop: 1 }}>{it.when}</div>
              </div>
              <div className="tnum" style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)' }}>{fmtC(it.amount)}</div>
            </div>
          ))}
        </div>
      </div>
    </GardenScreen>
  );
}

// ─── Screen 4: Manage Buckets ─────────────────────────────────
function GardenManageBuckets() {
  return (
    <GardenScreen padTop={48}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 20px 8px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink-3)' }}>Done</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)' }}>Buckets</div>
        <div style={{ fontSize: 22, fontWeight: 300, color: 'var(--coral-deep)' }}>+</div>
      </div>

      <div style={{ padding: '8px 20px 4px', fontSize: 12, color: 'var(--ink-3)', fontWeight: 700 }}>
        Monthly total: <span className="tnum" style={{ color: 'var(--ink)' }}>{fmt(MONTHLY_BUDGET)}</span>
      </div>

      <div style={{ padding: '8px 14px' }}>
        {BUCKETS.map((b, i) => (
          <div key={b.id} style={{
            background: '#fff', borderRadius: 14,
            border: '1px solid var(--hair)',
            margin: '0 0 8px',
            padding: '10px 12px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ fontSize: 16, color: 'var(--ink-4)', cursor: 'grab' }}>⋮⋮</div>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: b.color + '22', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>{b.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>{b.name}</div>
              <div className="tnum" style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', marginTop: 1 }}>
                {fmt(b.monthly)}/mo · ~{fmt(b.monthly/4)}/wk
              </div>
            </div>
            <div style={{
              width: 14, height: 14, borderRadius: 4,
              background: b.color, border: `2px solid #fff`,
              boxShadow: '0 0 0 1px var(--hair-2)',
            }} />
            <div style={{ fontSize: 18, color: 'var(--ink-4)' }}>›</div>
          </div>
        ))}

        <div style={{
          marginTop: 4, padding: 14, borderRadius: 14,
          border: '1.5px dashed var(--peach-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--coral-deep)', fontSize: 14, fontWeight: 800, gap: 6,
        }}>
          <span style={{ fontSize: 18, fontWeight: 300 }}>+</span> Add a new bucket
        </div>
      </div>
    </GardenScreen>
  );
}

Object.assign(window, { GardenDashboard, GardenAddExpense, GardenBucketDetail, GardenManageBuckets });
