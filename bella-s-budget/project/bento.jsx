// Variation 3: "Bento" — chunky colorful tiles, expressive, playful
// Every bucket has its own color; mixed-size tile grid

function BentoScreen({ children, padTop = 48, bg = 'var(--bg)' }) {
  return (
    <div className="phone-screen" style={{ background: bg, paddingTop: padTop }}>
      {children}
    </div>
  );
}

function BentoFAB({ dark = false }) {
  return (
    <button style={{
      position: 'absolute', right: 18, bottom: 92,
      width: 64, height: 64, borderRadius: 22, border: 'none',
      background: dark ? '#fff' : 'var(--ink)',
      color: dark ? 'var(--ink)' : '#fff',
      fontSize: 32, fontWeight: 300, lineHeight: 1,
      boxShadow: '0 10px 24px rgba(61,36,25,0.32)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', zIndex: 10,
    }}>+</button>
  );
}

function BentoTabBar() {
  const items = [
    { i: '◐', l: 'Today',  on: true  },
    { i: '▦', l: 'Buckets', on: false },
    { i: '∿', l: 'Trends',  on: false },
    { i: '◯', l: 'Bella',   on: false },
  ];
  return (
    <div style={{
      position: 'absolute', left: 14, right: 14, bottom: 18,
      height: 64, borderRadius: 22,
      background: 'var(--ink)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      boxShadow: '0 12px 28px rgba(61,36,25,0.28)',
    }}>
      {items.map(it => (
        <div key={it.l} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: it.on ? 'var(--coral)' : 'rgba(255,255,255,0.55)',
          fontSize: 10, fontWeight: 800, letterSpacing: 0.4,
        }}>
          <div style={{ fontSize: 22, lineHeight: 1 }}>{it.i}</div>
          {it.l.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

// ─── Screen 1: Dashboard (bento grid) ──────────────────────────
function BentoDashboard() {
  // Take top 4 buckets to feature, then a "more" tile
  const featured = BUCKETS.slice(0, 6);
  return (
    <BentoScreen>
      <div style={{ padding: '4px 18px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)' }}>Hi Bella ☀️</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.6, marginTop: -2 }}>This&nbsp;week</div>
        </div>
        <div style={{
          padding: '8px 12px', borderRadius: 14, background: 'var(--ink)',
          color: '#fff', fontSize: 12, fontWeight: 800,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>🌱 {STREAK_WEEKS}-wk</div>
      </div>

      <div style={{ padding: '8px 14px 110px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {/* Hero tile — full width */}
        <div style={{
          gridColumn: '1 / -1',
          background: 'linear-gradient(135deg, #ff8a73 0%, #e85d4f 100%)',
          color: '#fff', borderRadius: 24, padding: '20px 22px 18px',
          position: 'relative', overflow: 'hidden',
          minHeight: 152,
        }}>
          {/* decorative blob */}
          <div style={{
            position: 'absolute', right: -32, top: -32, width: 140, height: 140,
            borderRadius: 999, background: 'rgba(255,255,255,0.14)',
          }} />
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.85 }}>
            Left this week
          </div>
          <div className="tnum" style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2.6, lineHeight: 1, marginTop: 4 }}>
            ${WEEK_LEFT}
          </div>
          <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700, opacity: 0.95 }}>
            of ${WEEK_BUDGET} · ~$93/day to stay on track
          </div>
          {/* day dots */}
          <div style={{ marginTop: 14, display: 'flex', gap: 6, alignItems: 'center' }}>
            {['M','T','W','T','F','S','S'].map((d, i) => {
              const done = i < 3;
              return (
                <div key={i} style={{
                  flex: 1, height: 28, borderRadius: 8,
                  background: i === 2 ? '#fff' : done ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.18)',
                  color: i === 2 ? 'var(--coral-deep)' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800,
                }}>{d}</div>
              );
            })}
          </div>
        </div>

        {/* Buckets as colored tiles */}
        {featured.map((b, idx) => {
          const left = b.monthly - b.spent;
          const p = pct(b.spent, b.monthly);
          const tight = p > 85;
          // Tone the color into a soft pastel background
          return (
            <div key={b.id} style={{
              background: '#fff',
              borderRadius: 22, padding: '14px 14px 12px',
              position: 'relative', overflow: 'hidden',
              border: '1px solid var(--hair)',
              minHeight: 116,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: b.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
                boxShadow: `0 4px 10px ${b.color}55`,
              }}>{b.icon}</div>
              <div style={{ marginTop: 10, fontSize: 13, fontWeight: 800, color: 'var(--ink-3)' }}>{b.name}</div>
              <div className="tnum" style={{
                marginTop: 2, fontSize: 22, fontWeight: 800,
                color: tight ? 'var(--coral-deep)' : 'var(--ink)',
                letterSpacing: -0.6, lineHeight: 1,
              }}>${left}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-4)', marginTop: 2 }}>
                left of ${b.monthly}
              </div>
              {/* bottom progress sliver */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
                background: b.color + '22',
              }}>
                <div style={{
                  height: '100%', width: p + '%',
                  background: tight ? 'var(--coral-deep)' : b.color,
                }}/>
              </div>
            </div>
          );
        })}

        {/* Quick-add row of remaining */}
        <div style={{
          gridColumn: '1 / -1',
          background: 'var(--ink)', borderRadius: 22, padding: '14px 16px',
          color: '#fff',
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.6 }}>
            Quick add
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8, overflow: 'hidden' }}>
            {[{ l: '☕ $5', s: 'Coffee' }, { l: '🥑 $42', s: 'TJs' }, { l: '⛽ $48', s: 'Gas' }, { l: '🍝 $38', s: 'Lunch' }].map(q => (
              <div key={q.l} style={{
                flex: 1, padding: '8px 6px', borderRadius: 12,
                background: 'rgba(255,255,255,0.12)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 13, fontWeight: 800 }}>{q.l}</div>
                <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.7, marginTop: 1 }}>{q.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BentoFAB />
      <BentoTabBar />
    </BentoScreen>
  );
}

// ─── Screen 2: Add Expense ────────────────────────────────────
function BentoAddExpense() {
  const amount = '38.50';
  const keys = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['.','0','⌫'],
  ];
  return (
    <BentoScreen padTop={48} bg="#fff5ee">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 18px 8px' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 12, background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 500, color: 'var(--ink-2)',
          border: '1px solid var(--hair)',
        }}>×</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>New expense</div>
        <div style={{ width: 36 }} />
      </div>

      {/* Amount tile — big coral */}
      <div style={{ padding: '12px 14px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #ff8a73 0%, #e85d4f 100%)',
          borderRadius: 24, padding: '20px 24px 22px',
          color: '#fff', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -40, bottom: -40, width: 140, height: 140,
            borderRadius: 999, background: 'rgba(255,255,255,0.10)',
          }} />
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.85 }}>
            Amount
          </div>
          <div className="tnum" style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2.4, lineHeight: 1, marginTop: 6 }}>
            <span style={{ fontSize: 32, fontWeight: 700, opacity: 0.8, verticalAlign: 'top', marginRight: 2 }}>$</span>
            {amount}
          </div>
          <div style={{ marginTop: 4, fontSize: 12, fontWeight: 700, opacity: 0.85 }}>at Pizzeria Mozza</div>
        </div>
      </div>

      {/* Bucket chips */}
      <div style={{ padding: '14px 14px 4px' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8, paddingLeft: 4 }}>
          Bucket
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {BUCKETS.slice(0, 8).map(b => {
            const sel = b.id === 'dining';
            return (
              <div key={b.id} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 12px', borderRadius: 14,
                background: sel ? b.color : '#fff',
                color: sel ? '#fff' : 'var(--ink-2)',
                fontSize: 12, fontWeight: 800,
                border: sel ? 'none' : '1px solid var(--hair)',
                boxShadow: sel ? `0 6px 14px ${b.color}55` : 'none',
              }}>
                <span style={{ fontSize: 14 }}>{b.icon}</span>{b.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* Keypad — chunky tiles */}
      <div style={{ padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {keys.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 6 }}>
            {row.map(k => (
              <div key={k} style={{
                flex: 1, height: 50, borderRadius: 14,
                background: '#fff', border: '1px solid var(--hair)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 700, color: 'var(--ink)',
              }}>{k}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Save */}
      <div style={{ padding: '8px 14px 24px' }}>
        <div style={{
          height: 56, background: 'var(--ink)', color: '#fff',
          borderRadius: 16, fontSize: 16, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 18px rgba(61,36,25,0.28)',
          gap: 8,
        }}>
          Save · <span className="tnum">${amount}</span>
        </div>
      </div>
    </BentoScreen>
  );
}

// ─── Screen 3: Bucket Detail ──────────────────────────────────
function BentoBucketDetail() {
  const b = bucketById('dining');
  const left = b.monthly - b.spent;
  const items = [
    { id: 'd1', label: 'Pizzeria Mozza', amount: 38.50, when: 'Today' },
    { id: 'd2', label: 'Sushi Park',     amount: 54.20, when: 'Sat' },
    { id: 'd3', label: 'Sqirl',          amount: 22.10, when: 'Fri' },
    { id: 'd4', label: 'Bestia',         amount: 88.00, when: 'Mar 12' },
  ];
  return (
    <BentoScreen padTop={0} bg={b.color}>
      {/* Color hero */}
      <div style={{ padding: '52px 22px 28px', color: '#fff', position: 'relative' }}>
        <div style={{
          position: 'absolute', right: -40, top: 0, width: 200, height: 200,
          borderRadius: 999, background: 'rgba(255,255,255,0.10)',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, position: 'relative' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 12,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>←</div>
          <div style={{
            padding: '6px 12px', borderRadius: 10,
            background: 'rgba(255,255,255,0.2)',
            fontSize: 12, fontWeight: 800,
          }}>Edit</div>
        </div>
        <div style={{ fontSize: 48, position: 'relative' }}>{b.icon}</div>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.6, marginTop: 4, position: 'relative' }}>{b.name}</div>
        <div className="tnum" style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2, lineHeight: 1, marginTop: 14, position: 'relative' }}>
          ${left}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.9, marginTop: 4, position: 'relative' }}>
          left · ${b.spent} of ${b.monthly} spent
        </div>
        {/* progress */}
        <div style={{ marginTop: 14, height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.25)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: pct(b.spent, b.monthly) + '%', height: '100%', background: '#fff', borderRadius: 999 }}/>
        </div>
      </div>

      {/* Curved sheet */}
      <div style={{
        background: '#fff5ee', borderRadius: '28px 28px 0 0',
        padding: '18px 18px 24px', minHeight: 360,
        position: 'relative',
      }}>
        {/* stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { l: 'This week', v: '$62', s: 'of $70' },
            { l: 'Avg/visit', v: '$41', s: '8 visits' },
            { l: 'Days left', v: '12',  s: 'of month' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: '12px 10px',
              border: '1px solid var(--hair)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: 0.8 }}>{s.l}</div>
              <div className="tnum" style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', marginTop: 2 }}>{s.v}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-4)' }}>{s.s}</div>
            </div>
          ))}
        </div>

        {/* History */}
        <div style={{ marginTop: 18, fontSize: 14, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>Recent</div>
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid var(--hair)', overflow: 'hidden' }}>
          {items.map((it, i) => (
            <div key={it.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 16px',
              borderBottom: i < items.length - 1 ? '1px solid var(--hair)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: b.color + '22',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14,
                }}>{b.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>{it.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-4)' }}>{it.when}</div>
                </div>
              </div>
              <div className="tnum" style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)' }}>{fmtC(it.amount)}</div>
            </div>
          ))}
        </div>
      </div>
    </BentoScreen>
  );
}

// ─── Screen 4: Manage Buckets ─────────────────────────────────
function BentoManageBuckets() {
  return (
    <BentoScreen padTop={48}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 18px 4px' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink-3)' }}>Done</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>Buckets</div>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--coral-deep)' }}>Reorder</div>
      </div>
      <div style={{ padding: '4px 18px 12px', fontSize: 13, fontWeight: 700, color: 'var(--ink-3)' }}>
        Tap any tile to edit. <span style={{ color: 'var(--ink)' }}>{fmt(MONTHLY_BUDGET)}/month</span> total.
      </div>

      <div style={{ padding: '4px 14px 100px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {BUCKETS.map(b => (
          <div key={b.id} style={{
            background: b.color, color: '#fff',
            borderRadius: 22, padding: '14px 14px 14px',
            position: 'relative', overflow: 'hidden',
            minHeight: 108,
          }}>
            <div style={{
              position: 'absolute', right: -20, top: -20, width: 80, height: 80,
              borderRadius: 999, background: 'rgba(255,255,255,0.16)',
            }} />
            <div style={{ fontSize: 26, position: 'relative' }}>{b.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 800, marginTop: 6, position: 'relative' }}>{b.name}</div>
            <div className="tnum" style={{ fontSize: 11, fontWeight: 700, opacity: 0.9, marginTop: 1, position: 'relative' }}>
              {fmt(b.monthly)}/mo
            </div>
            <div style={{
              position: 'absolute', right: 10, bottom: 10, width: 18, height: 18, borderRadius: 999,
              background: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
            }}>✎</div>
          </div>
        ))}

        {/* Add new tile */}
        <div style={{
          gridColumn: '1 / -1',
          border: '1.5px dashed var(--peach-2)',
          borderRadius: 22, padding: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          color: 'var(--coral-deep)', fontSize: 14, fontWeight: 800,
        }}>
          <span style={{ fontSize: 22, fontWeight: 300 }}>+</span> Add a new bucket
        </div>
      </div>
    </BentoScreen>
  );
}

Object.assign(window, { BentoDashboard, BentoAddExpense, BentoBucketDetail, BentoManageBuckets });
