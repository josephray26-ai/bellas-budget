// Main app — composes the three variations onto the design canvas
const { useState } = React;

// Wrap an IOSDevice in a div the artboard can size to.
function Phone({ children }) {
  return (
    <div style={{ width: 402, height: 874, position: 'relative' }}>
      <IOSDevice>
        <div style={{ height: '100%' }}>{children}</div>
      </IOSDevice>
    </div>
  );
}

function ContextNote() {
  return (
    <div style={{
      maxWidth: 760, margin: '0 auto', padding: '40px 32px 4px',
      fontFamily: 'Nunito, system-ui, sans-serif', color: '#3d2419',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: 'linear-gradient(135deg, #ff8a73, #e85d4f)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, boxShadow: '0 8px 18px rgba(232,93,79,0.28)',
        }}>🌱</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#b94436', textTransform: 'uppercase', letterSpacing: 1.4 }}>
            Hi-fi exploration
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.6, lineHeight: 1 }}>
            Bella's Budget
          </div>
        </div>
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.55, color: '#5c3d2e', maxWidth: 620 }}>
        Mobile budget tracker — weekly + monthly buckets, fast expense entry,
        encouraging tone, coral palette. Three directions below; each shows the
        four screens that matter most: dashboard, quick add, bucket detail, and
        bucket management. Pick the direction you like (or mix-and-match), and I'll
        package it as a Claude-Code-ready spec.
      </div>
      <div style={{
        marginTop: 18, padding: '14px 16px', borderRadius: 14,
        background: 'rgba(125,168,130,0.14)', color: '#4f7a56',
        fontSize: 13, fontWeight: 700, lineHeight: 1.5,
        border: '1px solid rgba(125,168,130,0.25)',
      }}>
        <b>Shared assumptions</b> · Monthly limits per bucket with weekly pacing ·
        Bucket rollover (unused weekly $ rolls forward) · Streak when she stays
        under · Editable name / icon / color / limit · 10 starter buckets · Warm,
        encouraging copy ("$46 ahead of pace 🌱") · Nunito throughout.
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <ContextNote />
      <DesignCanvas>
        <DCSection
          id="garden"
          title="01 · Garden"
          subtitle="Soft, encouraging, sage-and-coral. White cards on cream. Best for daily glance-and-go."
        >
          <DCArtboard id="g-dash"   label="Dashboard"      width={402} height={874}><Phone><GardenDashboard /></Phone></DCArtboard>
          <DCArtboard id="g-add"    label="Add expense"    width={402} height={874}><Phone><GardenAddExpense /></Phone></DCArtboard>
          <DCArtboard id="g-detail" label="Bucket detail"  width={402} height={874}><Phone><GardenBucketDetail /></Phone></DCArtboard>
          <DCArtboard id="g-manage" label="Manage buckets" width={402} height={874}><Phone><GardenManageBuckets /></Phone></DCArtboard>
        </DCSection>

        <DCSection
          id="editorial"
          title="02 · Editorial"
          subtitle="Confident typography, generous whitespace, hairline dividers. Numbers do the talking."
        >
          <DCArtboard id="e-dash"   label="Dashboard"      width={402} height={874}><Phone><EditDashboard /></Phone></DCArtboard>
          <DCArtboard id="e-add"    label="Add expense"    width={402} height={874}><Phone><EditAddExpense /></Phone></DCArtboard>
          <DCArtboard id="e-detail" label="Bucket detail"  width={402} height={874}><Phone><EditBucketDetail /></Phone></DCArtboard>
          <DCArtboard id="e-manage" label="Manage buckets" width={402} height={874}><Phone><EditManageBuckets /></Phone></DCArtboard>
        </DCSection>

        <DCSection
          id="bento"
          title="03 · Bento"
          subtitle="Chunky colorful tiles. Every bucket has its own color. Most expressive — most fun."
        >
          <DCArtboard id="b-dash"   label="Dashboard"      width={402} height={874}><Phone><BentoDashboard /></Phone></DCArtboard>
          <DCArtboard id="b-add"    label="Add expense"    width={402} height={874}><Phone><BentoAddExpense /></Phone></DCArtboard>
          <DCArtboard id="b-detail" label="Bucket detail"  width={402} height={874}><Phone><BentoBucketDetail /></Phone></DCArtboard>
          <DCArtboard id="b-manage" label="Manage buckets" width={402} height={874}><Phone><BentoManageBuckets /></Phone></DCArtboard>
        </DCSection>
      </DesignCanvas>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
