// Print-only entry — bypasses DesignCanvas (interactive), lays each variation
// out on its own landscape page with all four phones in a row.

function PrintPhone({ children, label }) {
  return (
    <div className="print-phone">
      <div className="print-phone-label">{label}</div>
      <div className="print-phone-frame">
        <IOSDevice>
          <div style={{ height: '100%' }}>{children}</div>
        </IOSDevice>
      </div>
    </div>
  );
}

function PrintPage({ pageNumber, total, title, eyebrow, blurb, accent, children }) {
  return (
    <section className="print-page">
      <header className="print-page-header">
        <div className="print-page-eyebrow" style={{ color: accent }}>{eyebrow}</div>
        <div className="print-page-title-row">
          <h1 className="print-page-title">{title}</h1>
          <div className="print-page-num">
            {pageNumber}<span className="print-page-num-of"> / {total}</span>
          </div>
        </div>
        <p className="print-page-blurb">{blurb}</p>
      </header>
      <div className="print-phone-row">{children}</div>
    </section>
  );
}

function CoverPage() {
  return (
    <section className="print-page print-cover">
      <div className="print-cover-inner">
        <div className="print-cover-mark">
          <div className="print-cover-glyph">🌱</div>
          <div>
            <div className="print-cover-eyebrow">Hi-fi design exploration · May 28 2026</div>
            <h1 className="print-cover-title">Bella's Budget</h1>
          </div>
        </div>
        <p className="print-cover-blurb">
          A mobile budget tracker for weekly + monthly spending. Three design
          directions, four key screens each. Coral palette, Nunito throughout,
          encouraging tone, 10 starter buckets — all editable.
        </p>
        <div className="print-cover-grid">
          <div className="print-cover-card">
            <div className="print-cover-card-num" style={{ color: '#e85d4f' }}>01</div>
            <div className="print-cover-card-name">Garden</div>
            <div className="print-cover-card-blurb">Soft, encouraging, sage-and-coral. White cards on cream. Best for daily glance-and-go.</div>
          </div>
          <div className="print-cover-card">
            <div className="print-cover-card-num" style={{ color: '#3d2419' }}>02</div>
            <div className="print-cover-card-name">Editorial</div>
            <div className="print-cover-card-blurb">Confident typography, generous whitespace, hairline dividers. Numbers do the talking.</div>
          </div>
          <div className="print-cover-card">
            <div className="print-cover-card-num" style={{ color: '#9c6b8f' }}>03</div>
            <div className="print-cover-card-name">Bento</div>
            <div className="print-cover-card-blurb">Chunky colorful tiles. Every bucket has its own color. Most expressive — most fun.</div>
          </div>
        </div>
        <div className="print-cover-foot">
          <div>
            <div className="print-cover-foot-label">Shared assumptions</div>
            <div className="print-cover-foot-text">
              Monthly limits per bucket with weekly pacing · Bucket rollover ·
              Streak when she stays under · Editable name/icon/color/limit · Warm copy
            </div>
          </div>
          <div className="print-cover-foot-page">Page 1 of 4</div>
        </div>
      </div>
    </section>
  );
}

function PrintApp() {
  return (
    <div className="print-doc">
      <CoverPage />

      <PrintPage
        pageNumber={2} total={4}
        eyebrow="01 · Direction"
        title="Garden"
        accent="#e85d4f"
        blurb="Soft white cards on cream, sage accents for encouragement, coral for action. Comfortable density, daily-glance friendly."
      >
        <PrintPhone label="Dashboard"><GardenDashboard /></PrintPhone>
        <PrintPhone label="Add expense"><GardenAddExpense /></PrintPhone>
        <PrintPhone label="Bucket detail"><GardenBucketDetail /></PrintPhone>
        <PrintPhone label="Manage buckets"><GardenManageBuckets /></PrintPhone>
      </PrintPage>

      <PrintPage
        pageNumber={3} total={4}
        eyebrow="02 · Direction"
        title="Editorial"
        accent="#3d2419"
        blurb="Confident typography, generous whitespace, hairline dividers. Numbers carry the design; color is restrained."
      >
        <PrintPhone label="Dashboard"><EditDashboard /></PrintPhone>
        <PrintPhone label="Add expense"><EditAddExpense /></PrintPhone>
        <PrintPhone label="Bucket detail"><EditBucketDetail /></PrintPhone>
        <PrintPhone label="Manage buckets"><EditManageBuckets /></PrintPhone>
      </PrintPage>

      <PrintPage
        pageNumber={4} total={4}
        eyebrow="03 · Direction"
        title="Bento"
        accent="#9c6b8f"
        blurb="Chunky colorful tiles. Every bucket carries its own color. Expressive, playful, and the most fun to use."
      >
        <PrintPhone label="Dashboard"><BentoDashboard /></PrintPhone>
        <PrintPhone label="Add expense"><BentoAddExpense /></PrintPhone>
        <PrintPhone label="Bucket detail"><BentoBucketDetail /></PrintPhone>
        <PrintPhone label="Manage buckets"><BentoManageBuckets /></PrintPhone>
      </PrintPage>
    </div>
  );
}

const printRoot = ReactDOM.createRoot(document.getElementById('root'));
printRoot.render(<PrintApp />);

// Auto-print: wait for fonts + a beat for layout to settle
(async () => {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}
  setTimeout(() => { window.print(); }, 700);
})();
