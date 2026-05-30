// Shared mock data for Bella's Budget

const BUCKETS = [
  { id: 'groceries', name: 'Groceries',     icon: '🥑', color: '#7da882', monthly: 600, spent: 412, weekSpent: 87 },
  { id: 'dining',    name: 'Dining out',    icon: '🍝', color: '#ff8a73', monthly: 280, spent: 246, weekSpent: 62 },
  { id: 'gas',       name: 'Gas',           icon: '⛽', color: '#e8a060', monthly: 180, spent: 96,  weekSpent: 24 },
  { id: 'shopping',  name: 'Shopping',      icon: '🛍️', color: '#ffb59f', monthly: 250, spent: 178, weekSpent: 35 },
  { id: 'beauty',    name: 'Beauty',        icon: '💄', color: '#d97a85', monthly: 150, spent: 64,  weekSpent: 12 },
  { id: 'enter',     name: 'Entertainment', icon: '🎬', color: '#9c6b8f', monthly: 120, spent: 88,  weekSpent: 18 },
  { id: 'kids',      name: 'Kids',          icon: '🧸', color: '#e8b860', monthly: 200, spent: 124, weekSpent: 28 },
  { id: 'home',      name: 'Home',          icon: '🏠', color: '#a8a566', monthly: 240, spent: 156, weekSpent: 0  },
  { id: 'gifts',     name: 'Gifts',         icon: '🎁', color: '#e85d4f', monthly: 80,  spent: 25,  weekSpent: 0  },
  { id: 'other',     name: 'Other',         icon: '💫', color: '#b8a193', monthly: 100, spent: 42,  weekSpent: 5  },
];

const RECENT = [
  { id: 'r1', bucket: 'groceries', label: "Trader Joe's",   amount: 42.18, when: 'Today · 2:14p' },
  { id: 'r2', bucket: 'dining',    label: 'Pizzeria Mozza', amount: 38.50, when: 'Today · 12:30p' },
  { id: 'r3', bucket: 'gas',       label: 'Shell',          amount: 24.00, when: 'Yesterday' },
  { id: 'r4', bucket: 'beauty',    label: 'Sephora',        amount: 32.00, when: 'Yesterday' },
  { id: 'r5', bucket: 'groceries', label: 'Erewhon',        amount: 28.45, when: 'Mon · 6:10p' },
  { id: 'r6', bucket: 'shopping',  label: 'Zara',           amount: 64.00, when: 'Sun · 3:22p' },
];

// Totals for "this month"
const MONTHLY_BUDGET = BUCKETS.reduce((s, b) => s + b.monthly, 0);   // 2200
const MONTHLY_SPENT  = BUCKETS.reduce((s, b) => s + b.spent, 0);     // ~1431
const WEEK_BUDGET    = Math.round(MONTHLY_BUDGET / 4);                // 550
const WEEK_SPENT     = BUCKETS.reduce((s, b) => s + b.weekSpent, 0);  // 271
const WEEK_LEFT      = WEEK_BUDGET - WEEK_SPENT;                      // 279
const STREAK_WEEKS   = 6;

// 7-day spend (Mon..Sun, today=Wed)
const WEEK_DAILY = [62, 48, 71, 0, 0, 0, 0]; // future days = 0

function fmt(n)  { return '$' + Math.round(n).toLocaleString(); }
function fmtC(n) { return '$' + n.toFixed(2); }
function pct(spent, budget) { return Math.min(100, Math.round((spent / budget) * 100)); }
function bucketById(id) { return BUCKETS.find(b => b.id === id); }

Object.assign(window, {
  BUCKETS, RECENT, MONTHLY_BUDGET, MONTHLY_SPENT, WEEK_BUDGET, WEEK_SPENT, WEEK_LEFT,
  STREAK_WEEKS, WEEK_DAILY, fmt, fmtC, pct, bucketById,
});
