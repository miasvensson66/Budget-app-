import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase client ──────────────────────────────────────────────────────────
const SUPABASE_URL  = "https://mhijoihswuwvheuaprsy.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oaWpvaWhzd3V3dmhldWFwcnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjA3NzQsImV4cCI6MjA5NDQzNjc3NH0.g4hy8zuoOcpr9AdBqMN_3iBIHjpRgIrGK_OlpbC8oxk";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  en: {
    appTitle: "Tryvi", appSubtitle: "Your trusted budget companion",
    monthly: "Monthly Budget", overview: "Overview",
    income: "Monthly Income", incomePlaceholder: "e.g. 35000",
    addBucket: "+ Add Bucket", bucketName: "Name (e.g. Rent)",
    budgetAmount: "Budget", spentLabel: "Spent", add: "Add",
    remaining: "remaining", of: "of", left: "left", over: "over budget",
    totalIncome: "Yearly Income", totalBudgeted: "Budget", totalSpent: "Left to spend",
    monthlyChart: "Income vs Expenses", categoryBreakdown: "Category Breakdown",
    noData: "Add income & buckets to get started!",
    deleteBucket: "✕", unbudgeted: "Income", switchLang: "Svenska",
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    fullMonths: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    currency: "Currency", colorTheme: "Color theme",
    savings: "Savings", savingsGoals: "Savings Goals",
    addGoal: "+ New goal", goalName: "Goal name (e.g. Vacation)",
    goalTarget: "Target amount", goalDeadline: "Target month",
    goalContribution: "Monthly saving", addContribution: "Add",
    noGoals: "No savings goals yet — add one to get started!",
    deleteGoal: "✕", saved: "Saved", remaining2: "Remaining",
    monthsLeft: "months left", onTrack: "On track ✓",
    behind: "Behind schedule", completed: "Completed! 🎉",
    goalProgress: "Progress", totalSaved: "Total saved",
    monthlySaving: "Monthly saving", editGoal: "Edit",
    linkToGoal: "Link to savings goal",
    noLink: "No link",
    linkedToGoal: "→ Savings goal",
    editCategory: "Change category",
    myAccount: "My Account",
    accountEmail: "Email address",
    changePassword: "Change password",
    newPassword: "New password",
    confirmPassword: "Confirm password",
    passwordChanged: "✓ Password updated!",
    passwordMismatch: "Passwords don't match",
    deleteAccount: "Delete account",
    deleteAccountConfirm: "This permanently deletes all your data. Type DELETE to confirm:",
    deleteAccountDone: "Account deleted",
    gdprNote: "Your data is stored in the EU (Stockholm) and handled according to GDPR. You have the right to access, correct and delete your data at any time.",
    close: "Close",
    copyIncomeToAllDone: "✓ Applied to all 12 months",
    copyBucketToMonths: "Copy to specific months",
    selectMonths: "Select months",
    applyToMonths: "Apply to selected",
    cancel: "Cancel",
    category: "Category",
    noCategory: "No category",
    addCategory: "+ New category",
    newCategoryName: "Category name…",
    filterCategory: "All",
    editBudgetForMonths: "Set budget for months",
    budgetForMonth: "New budget amount",
    applyBudget: "Apply budget",
    bucketCopied: "✓ Copied!",
    selectAll: "Select all",
    saveBucketToAll: "Save to all months",
    saveBucketToAllDone: "✓ Saved to all months",
    incomeSources: "Income sources",
    addIncomeSource: "+ Add income",
    incomeSourceName: "Name (e.g. Salary)",
    incomeSourceAmount: "Amount",
    applySourceToAll: "Apply to all months",
    applySourceToAllDone: "✓ Applied!",
    deleteSource: "✕",
    defaultSources: ["Salary", "Child benefit"],
    totalIncomeLabel: "Total income",
    leftToSpend: "Left to spend",
    spentLabel2: "Spent",
    incomeMinusBudget: "Income − Budget",
    defaultCategories: ["Accommodation","Subscriptions & Contracts","Car & Transport"],
  },
  sv: {
    appTitle: "Tryvi", appSubtitle: "Din trygga budgetkompis",
    monthly: "Månadsbudget", overview: "Översikt",
    income: "Månadsinkomst", incomePlaceholder: "t.ex. 35000",
    addBucket: "+ Lägg till hink", bucketName: "Namn (t.ex. Hyra)",
    budgetAmount: "Budget", spentLabel: "Utgifter", add: "Lägg till",
    remaining: "kvar", of: "av", left: "kvar", over: "för mycket",
    totalIncome: "Årsinkomst", totalBudgeted: "Budgeterat", totalSpent: "Kvar att använda",
    monthlyChart: "Inkomst vs utgifter", categoryBreakdown: "Fördelning per kategori",
    noData: "Lägg till inkomst och hinkar för att komma igång!",
    deleteBucket: "✕", unbudgeted: "Inkomst", switchLang: "English",
    months: ["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
    fullMonths: ["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],
    currency: "Valuta", colorTheme: "Färgtema",
    savings: "Sparande", savingsGoals: "Sparmål",
    addGoal: "+ Nytt sparmål", goalName: "Namn (t.ex. Semester)",
    goalTarget: "Målbelopp", goalDeadline: "Målmånad",
    goalContribution: "Månadsbelopp", addContribution: "Lägg till",
    noGoals: "Inga sparmål än — lägg till ett för att komma igång!",
    deleteGoal: "✕", saved: "Sparat", remaining2: "Kvar",
    monthsLeft: "månader kvar", onTrack: "I tid ✓",
    behind: "Efter plan", completed: "Klart! 🎉",
    goalProgress: "Framsteg", totalSaved: "Totalt sparat",
    monthlySaving: "Månadsbelopp", editGoal: "Ändra",
    linkToGoal: "Koppla till sparmål",
    noLink: "Ingen koppling",
    linkedToGoal: "→ Sparmål",
    editCategory: "Ändra kategori",
    myAccount: "Mitt konto",
    accountEmail: "E-postadress",
    changePassword: "Ändra lösenord",
    newPassword: "Nytt lösenord",
    confirmPassword: "Bekräfta lösenord",
    passwordChanged: "✓ Lösenord uppdaterat!",
    passwordMismatch: "Lösenorden matchar inte",
    deleteAccount: "Radera konto",
    deleteAccountConfirm: "Detta raderar all din data permanent. Skriv RADERA för att bekräfta:",
    deleteAccountDone: "Konto raderat",
    gdprNote: "Din data lagras i EU (Stockholm) och hanteras enligt GDPR. Du har rätt att när som helst begära tillgång till, korrigera och radera dina uppgifter.",
    close: "Stäng",
    addSpending: "Lägg till utgift…", save: "Spara",
    copyIncomeToAll: "Använd för alla månader",
    copyIncomeToAllDone: "✓ Sparad för alla 12 månader",
    copyBucketToMonths: "Välj månader att spara till",
    selectMonths: "Välj månader",
    applyToMonths: "Spara för valda månader",
    cancel: "Avbryt",
    category: "Kategori",
    noCategory: "Ingen kategori",
    addCategory: "+ Ny kategori",
    newCategoryName: "Namn på kategori…",
    filterCategory: "Alla",
    editBudgetForMonths: "Ändra budget för månader",
    budgetForMonth: "Nytt budgetbelopp",
    applyBudget: "Uppdatera budget",
    bucketCopied: "✓ Kopierad!",
    selectAll: "Välj alla",
    saveBucketToAll: "Spara till alla månader",
    saveBucketToAllDone: "✓ Sparad till alla månader",
    incomeSources: "Inkomstkällor",
    addIncomeSource: "+ Lägg till inkomst",
    incomeSourceName: "Namn (t.ex. Lön)",
    incomeSourceAmount: "Belopp",
    applySourceToAll: "Använd för alla månader",
    applySourceToAllDone: "✓ Klar!",
    deleteSource: "✕",
    defaultSources: ["Lön", "Barnbidrag"],
    totalIncomeLabel: "Total inkomst",
    leftToSpend: "Kvar att använda",
    spentLabel2: "Utgifter",
    incomeMinusBudget: "Inkomst − Budgeterat",
    defaultCategories: ["Boende","Prenumerationer & Avtal","Bil & Transport"],
  }
};

// ─── Theme system ─────────────────────────────────────────────────────────────
const THEMES = [
  {
    id:"blue", label:"Ocean",
    bg:"linear-gradient(160deg,#EEF4FC 0%,#DDEAF8 60%,#C8DCF4 100%)",
    bodyBg:"#DDEAF8",
    header:"linear-gradient(180deg,#1A2F52,#243A68)",
    headerBorder:"#2E4A80",
    accent:"#4A80C8", accentDeep:"#1A3A7A",
    accentText:"#C8DCF4", accentMuted:"#8AAAD8",
    card:"#F2F7FD", cardBorder:"#B8D0EC",
    pill:"#D8E8F8", pillText:"#2A4A7A",
    inputBorder:"#7AAAD8", scrollThumb:"#7AAAD8",
    dot:"#fff",
  },
  {
    id:"sage", label:"Forest",
    bg:"linear-gradient(160deg,#F0F5EE 0%,#DFF0D8 60%,#CCE4C4 100%)",
    bodyBg:"#DFF0D8",
    header:"linear-gradient(180deg,#1A3828,#243E30)",
    headerBorder:"#2E5A3A",
    accent:"#4A9060", accentDeep:"#1A5A30",
    accentText:"#D4EED8", accentMuted:"#80B890",
    card:"#F2FAF0", cardBorder:"#B0D8B8",
    pill:"#D4ECDA", pillText:"#1E4A2A",
    inputBorder:"#70B080", scrollThumb:"#70B080",
    dot:"#fff",
  },
  {
    id:"rose", label:"Rose",
    bg:"linear-gradient(160deg,#FDF0F2 0%,#F8E2E6 60%,#F0D0D8 100%)",
    bodyBg:"#F8E2E6",
    header:"linear-gradient(180deg,#4A1828,#602030)",
    headerBorder:"#7A2840",
    accent:"#C84870", accentDeep:"#8A1840",
    accentText:"#FAD8E4", accentMuted:"#D890A8",
    card:"#FDF5F7", cardBorder:"#ECC0CC",
    pill:"#F8DCE4", pillText:"#6A1A30",
    inputBorder:"#D880A0", scrollThumb:"#D880A0",
    dot:"#fff",
  },
  {
    id:"amber", label:"Amber",
    bg:"linear-gradient(160deg,#FDF6EE 0%,#F8EEDC 60%,#F0E2C8 100%)",
    bodyBg:"#F8EEDC",
    header:"linear-gradient(180deg,#3A2A10,#4A3418)",
    headerBorder:"#6A4A20",
    accent:"#C48830", accentDeep:"#8A5A10",
    accentText:"#FAE8C0", accentMuted:"#D8A860",
    card:"#FDFAF2", cardBorder:"#EAD0A0",
    pill:"#F4E8CC", pillText:"#5A3A10",
    inputBorder:"#C8A050", scrollThumb:"#C8A050",
    dot:"#fff",
  },
  {
    id:"slate", label:"Slate",
    bg:"linear-gradient(160deg,#F0F2F5 0%,#E4E8EE 60%,#D4DAE4 100%)",
    bodyBg:"#E4E8EE",
    header:"linear-gradient(180deg,#1A1E28,#242A38)",
    headerBorder:"#38404E",
    accent:"#5870A0", accentDeep:"#2A3A68",
    accentText:"#D4DAF0", accentMuted:"#8A98B8",
    card:"#F5F6FA", cardBorder:"#C4CCE0",
    pill:"#DDE2EE", pillText:"#2A3050",
    inputBorder:"#8898C0", scrollThumb:"#8898C0",
    dot:"#fff",
  },
  {
    id:"lavender", label:"Lavender",
    bg:"linear-gradient(160deg,#F4F0FC 0%,#EAE0F8 60%,#DED0F4 100%)",
    bodyBg:"#EAE0F8",
    header:"linear-gradient(180deg,#2A1848,#381E5A)",
    headerBorder:"#4E2A7A",
    accent:"#8858C8", accentDeep:"#4A1E88",
    accentText:"#E4D8F8", accentMuted:"#B090D8",
    card:"#FAF7FE", cardBorder:"#D0C0F0",
    pill:"#EAD8FA", pillText:"#3A1A60",
    inputBorder:"#A080D0", scrollThumb:"#A080D0",
    dot:"#fff",
  },
];

// All 8 bucket palettes are tinted variants of the active theme's card/pill colors
// so every bucket always looks at home within the chosen theme.
function getBucketPalettes(theme) {
  // We derive 8 distinct but harmonious tints by mixing the theme accent with
  // fixed secondary hues. The light bg is always a soft tint of the theme card.
  return [
    { light: theme.pill,    mid: theme.accent,  deep: theme.accentDeep },  // 0 – primary
    { light: "#E0EEE8",     mid: "#48A878",      deep: "#186840" },          // 1 – teal-green
    { light: "#EEE0EC",     mid: "#B860A8",      deep: "#782070" },          // 2 – mauve
    { light: "#EEEAE0",     mid: "#B89840",      deep: "#785810" },          // 3 – amber
    { light: "#E0E4EE",     mid: "#6070B8",      deep: "#283080" },          // 4 – indigo
    { light: "#EEE0E0",     mid: "#C85858",      deep: "#882020" },          // 5 – red
    { light: "#E0EAE8",     mid: "#40A898",      deep: "#106858" },          // 6 – cyan
    { light: "#EDE0EE",     mid: "#9858C0",      deep: "#581888" },          // 7 – violet
  ];
}

const CURRENCIES = ["SEK","EUR","USD","GBP","NOK","DKK"];

function fmt(n, cur) {
  const v = Math.round(n);
  if (["SEK","NOK","DKK"].includes(cur)) return `${v.toLocaleString("sv-SE")} ${cur}`;
  return new Intl.NumberFormat("en-US",{style:"currency",currency:cur,maximumFractionDigits:0}).format(v);
}

// ─── localStorage fallback (UI prefs only — lang, theme, currency) ────────────
function useLS(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal];
}

// ─── Supabase data hook ───────────────────────────────────────────────────────
// Loads a user's row from `user_data` table and keeps it synced.
// Each user has one row: { user_id, year_data, goals, categories }
function useSupabaseUserData(userId, isDemo) {
  const defaultYearData = Array.from({length:12}, () => ({ incomeSources:[], buckets:[] }));
  const defaultGoals = [];
  const defaultCats  = [
    { id:"cat_1", name:"Boende" },
    { id:"cat_2", name:"Prenumerationer & Avtal" },
    { id:"cat_3", name:"Bil & Transport" },
  ];

  const [yearData,   setYearDataState]   = useState(isDemo ? makeSampleData("sv") : defaultYearData);
  const [goals,      setGoalsState]      = useState(defaultGoals);
  const [categories, setCategoriesState] = useState(defaultCats);
  const [loading,    setLoading]         = useState(!isDemo);
  const [error,      setError]           = useState(null);
  const [saving,     setSaving]          = useState(false);
  const saveTimer = useRef(null);

  // Load on mount
  useEffect(() => {
    if (isDemo || !userId) { setLoading(false); return; }
    let cancelled = false;

    // Safety timeout — never get stuck on blue screen
    const timeout = setTimeout(() => {
      if (!cancelled) {
        console.warn("Supabase load timeout — showing empty app");
        setLoading(false);
      }
    }, 8000);

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: sbError } = await supabase
          .from("user_data")
          .select("year_data, goals, categories")
          .eq("user_id", userId)
          .maybeSingle();

        if (cancelled) return;

        if (sbError) {
          console.error("Supabase load error:", sbError);
          setError(sbError.message);
        } else if (data) {
          if (data.year_data)   setYearDataState(data.year_data);
          if (data.goals)       setGoalsState(data.goals);
          if (data.categories)  setCategoriesState(data.categories);
        }
        // No data = new user, defaults are already set — that's fine
      } catch (e) {
        console.error("Unexpected error loading data:", e);
        if (!cancelled) setError(e.message);
      } finally {
        clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; clearTimeout(timeout); };
  }, [userId, isDemo]);

  // Debounced save to Supabase
  const save = useCallback((newYearData, newGoals, newCats) => {
    if (isDemo || !userId) return;
    clearTimeout(saveTimer.current);
    setSaving(true);
    saveTimer.current = setTimeout(async () => {
      await supabase.from("user_data").upsert({
        user_id:    userId,
        year_data:  newYearData,
        goals:      newGoals,
        categories: newCats,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      setSaving(false);
    }, 800);
  }, [userId, isDemo]);

  function setYearData(fn) {
    setYearDataState(prev => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      save(next, goals, categories);
      return next;
    });
  }
  function setGoals(fn) {
    setGoalsState(prev => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      save(yearData, next, categories);
      return next;
    });
  }
  function setCategories(fn) {
    setCategoriesState(prev => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      save(yearData, goals, next);
      return next;
    });
  }

  return { yearData, setYearData, goals, setGoals, categories, setCategories, loading, saving, error };
}

// ── Sample data for demo/test users ──────────────────────────────────────────
function makeSampleData(lang) {
  const names = lang === "sv"
    ? ["Hyra","Mat","Transport","Nöje","Kläder","Hälsa"]
    : ["Rent","Groceries","Transport","Entertainment","Clothing","Health"];
  const budgets = [8500, 4000, 1500, 2000, 1000, 800];
  const spent   = [8500, 2340, 980, 650, 0, 200];
  const cats    = ["cat_1","cat_3","cat_3",null,null,"cat_1"];
  return Array.from({length:12}, (_, mi) => ({
    incomeSources: [
      { id: 1000+mi, name: lang==="sv"?"Lön":"Salary", amount: 32000 },
      { id: 2000+mi, name: lang==="sv"?"Barnbidrag":"Child benefit", amount: 1250 },
    ],
    buckets: names.map((name, i) => ({
      id: (mi+1)*100+i, name, budget: budgets[i],
      spent: mi === new Date().getMonth() ? spent[i] : (mi < new Date().getMonth() ? budgets[i] * (0.7 + Math.random()*0.4) : 0),
      colorIdx: i, categoryId: cats[i],
    }))
  }));
}

// ─── Components ───────────────────────────────────────────────────────────────

function FillBar({ pct, color, overColor }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(Math.min(pct, 100)), 80); return () => clearTimeout(t); }, [pct]);
  return (
    <div style={{ background: "rgba(0,0,0,0.08)", borderRadius: 20, height: 10, overflow: "hidden" }}>
      <div style={{
        width: `${w}%`, height: "100%", borderRadius: 20,
        background: pct > 100
          ? (overColor || "linear-gradient(90deg,#E08080,#C05050)")
          : `linear-gradient(90deg,${color.mid},${color.deep})`,
        transition: "width 0.8s cubic-bezier(0.34,1.56,0.64,1)",
      }} />
    </div>
  );
}

function MonthPill({ label, isSelected, fillPct, onClick, theme }) {
  return (
    <button onClick={onClick} style={{
      position: "relative", padding: "8px 14px", borderRadius: 20, border: "none",
      cursor: "pointer", overflow: "hidden", minWidth: 54,
      background: isSelected ? theme.accentDeep : theme.pill,
      color: isSelected ? "#fff" : theme.pillText,
      fontFamily: "'Plus Jakarta Sans','Newsreader',Georgia,serif",
      fontWeight: isSelected ? 700 : 500,
      fontSize: 13, transition: "all 0.2s ease",
      boxShadow: isSelected ? `0 4px 16px ${theme.accent}55` : "none",
    }}>
      {!isSelected && fillPct > 0 && (
        <div style={{
          position: "absolute", bottom: 0, left: 0,
          width: `${Math.min(fillPct,100)}%`, height: "100%",
          background: `${theme.accent}30`,
        }} />
      )}
      <span style={{ position: "relative" }}>{label}</span>
    </button>
  );
}

function CategoryBadge({ name, theme }) {
  if (!name) return null;
  return (
    <span style={{
      fontSize: 10, padding: "2px 8px", borderRadius: 10,
      background: theme ? `${theme.accent}18` : "#EDE6DC",
      color: theme ? theme.accentDeep : "#8B6340",
      fontWeight: 600, letterSpacing: 0.3, whiteSpace: "nowrap",
      border: `1px solid ${theme ? theme.accent + "30" : "#D4C8B8"}`,
    }}>{name}</span>
  );
}

// ─── Month Selector Modal ─────────────────────────────────────────────────────
function MonthSelectorModal({ title, t, onConfirm, onClose, extraField, theme }) {
  const [selected, setSelected] = useState([]);
  const [extraVal, setExtraVal] = useState("");
  const toggle = i => setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  const allSel = selected.length === 12;

  const th = theme || THEMES[0];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={onClose}>
      <div style={{ background: th.card, borderRadius: "24px 24px 0 0", padding: 24, width: "100%", maxWidth: 480, maxHeight: "85vh", overflowY: "auto" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ fontWeight: 700, fontSize: 18, color: th.accentDeep, marginBottom: 16 }}>{title}</div>

        {extraField && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: th.accentMuted, marginBottom: 6 }}>{extraField.label}</div>
            <input type="number" value={extraVal} onChange={e => setExtraVal(e.target.value)}
              placeholder={extraField.placeholder}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: `1.5px solid ${th.inputBorder}`, background: "white", fontSize: 15, color: th.accentDeep }}
            />
          </div>
        )}

        <div style={{ fontSize: 12, color: th.accentMuted, marginBottom: 8 }}>{t.selectMonths}</div>
        <button onClick={() => setSelected(allSel ? [] : Array.from({length:12},(_,i)=>i))} style={{
          marginBottom: 12, padding: "6px 16px", borderRadius: 14,
          border: `1.5px solid ${th.inputBorder}`, background: allSel ? th.accent : "transparent",
          color: allSel ? "#fff" : th.accentDeep, cursor: "pointer", fontSize: 13, fontWeight: 600,
        }}>{t.selectAll}</button>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {t.months.map((m, i) => (
            <button key={i} onClick={() => toggle(i)} style={{
              padding: "8px 16px", borderRadius: 16,
              background: selected.includes(i) ? th.accentDeep : th.pill,
              color: selected.includes(i) ? "#fff" : th.pillText,
              border: "none", cursor: "pointer", fontWeight: selected.includes(i) ? 700 : 400, fontSize: 14,
            }}>{m}</button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => {
              if (!selected.length) return;
              if (extraField) { const v = parseFloat(extraVal); if (isNaN(v) || v <= 0) return; }
              onConfirm(selected, extraVal);
            }}
            style={{
              flex: 1, padding: 13, borderRadius: 16,
              background: selected.length ? `linear-gradient(135deg,${th.accent},${th.accentDeep})` : "#D0D0D8",
              color: "#fff", border: "none",
              cursor: selected.length ? "pointer" : "default", fontWeight: 700, fontSize: 15,
            }}>{t.applyToMonths}</button>
          <button onClick={onClose} style={{
            padding: "13px 20px", borderRadius: 16, background: th.pill,
            color: th.pillText, border: "none", cursor: "pointer", fontSize: 15,
          }}>{t.cancel}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Income Source Row ────────────────────────────────────────────────────────
function IncomeSourceRow({ source, currency, t, flashing, onUpdate, onDelete, onApplyToAll, theme }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(source.amount);

  function commit() {
    onUpdate(val);
    setEditing(false);
  }

  return (
    <div style={{
      display:"flex", alignItems:"center", gap:8, marginBottom:8,
      background:"rgba(255,255,255,0.07)", borderRadius:12, padding:"10px 12px",
    }}>
      {/* Colour dot */}
      <div style={{ width:8, height:8, borderRadius:"50%", background:"#C4A882", flexShrink:0 }} />

      {/* Name */}
      <div style={{ flex:1, fontSize:14, fontWeight:600, color:"#F5F0EA", minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
        {source.name}
      </div>

      {/* Amount — tap to edit */}
      {editing ? (
        <input
          type="number" value={val} autoFocus
          onChange={e=>setVal(e.target.value)}
          onBlur={commit}
          onKeyDown={e=>e.key==="Enter"&&commit()}
          style={{
            width:90, padding:"5px 8px", borderRadius:8,
            border:"1.5px solid #C4A882", background:"rgba(255,255,255,0.15)",
            color:"#F5F0EA", fontSize:14, fontWeight:700, textAlign:"right",
          }}
        />
      ) : (
        <button onClick={()=>{ setVal(source.amount); setEditing(true); }} style={{
          background:"none", border:"none", cursor:"pointer",
          color:"#F5F0EA", fontSize:14, fontWeight:700, padding:"4px 6px",
        }}>{fmt(source.amount, currency)}</button>
      )}

      {/* Apply to all months */}
      <button onClick={onApplyToAll} title={t.applySourceToAll} style={{
        background: flashing ? "rgba(74,170,74,0.3)" : "rgba(255,255,255,0.1)",
        border: `1px solid ${flashing?"#6AAA6A":"rgba(255,255,255,0.15)"}`,
        color: flashing ? "#A0E0A0" : "#C4A882",
        borderRadius:8, padding:"5px 8px", cursor:"pointer", fontSize:11, fontWeight:600,
        transition:"all 0.3s", whiteSpace:"nowrap", flexShrink:0,
      }}>{flashing ? "✓" : "📅"}</button>

      {/* Delete */}
      <button onClick={onDelete} style={{
        background:"none", border:"none", cursor:"pointer",
        color:"#9A7060", fontSize:15, padding:"2px 4px", flexShrink:0,
      }}>{t.deleteSource}</button>
    </div>
  );
}

// ─── Bucket Card ─────────────────────────────────────────────────────────────
function BucketCard({ bucket, lang, currency, categories, goals, onDelete, onAddSpend, onCopyToMonths, onEditBudgetMonths, onSaveToAllMonths, onUpdateCategory, theme }) {
  const [spendInput, setSpendInput] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState(null);
  const [flash, setFlash] = useState("");
  const [showCatEdit, setShowCatEdit] = useState(false);
  const t = T[lang];
  const pal = getBucketPalettes(theme || THEMES[0])[bucket.colorIdx % 8];
  const pct = bucket.budget > 0 ? (bucket.spent / bucket.budget) * 100 : 0;
  const remaining = bucket.budget - bucket.spent;
  const catName = categories.find(c => c.id === bucket.categoryId)?.name || "";
  const linkedGoal = goals?.find(g => g.id === bucket.savingsGoalId);

  function handleAdd() {
    const v = parseFloat(spendInput);
    if (!isNaN(v) && v > 0) { onAddSpend(v); setSpendInput(""); }
  }

  function handleCopy(months) {
    onCopyToMonths(months);
    setModal(null);
    setFlash("copy");
    setTimeout(() => setFlash(""), 2000);
  }

  function handleBudget(months, amount) {
    const v = parseFloat(amount);
    if (!isNaN(v) && v > 0) onEditBudgetMonths(months, v);
    setModal(null);
    setFlash("budget");
    setTimeout(() => setFlash(""), 2000);
  }

  function handleSaveToAll() {
    onSaveToAllMonths();
    setFlash("all");
    setTimeout(() => setFlash(""), 2500);
  }

  return (
    <>
      <div style={{
        background: theme ? `linear-gradient(135deg,${theme.card} 0%,white 100%)` : "white",
        borderRadius: 20, padding: "16px 18px", marginBottom: 10,
        boxShadow: expanded ? "0 8px 32px rgba(0,0,0,0.10)" : "0 2px 8px rgba(0,0,0,0.05)",
        border: `1px solid ${theme ? theme.cardBorder : "#E0E8F0"}`, transition: "box-shadow 0.3s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, cursor: "pointer" }}
               onClick={() => setExpanded(e => !e)}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg,${pal.mid},${pal.deep})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 17, fontWeight: 700,
            }}>{bucket.name[0]?.toUpperCase()}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 600, fontSize: 16, color: theme?.accentDeep || "#2A3A5A" }}>{bucket.name}</span>
                <CategoryBadge name={catName} theme={theme} />
                {linkedGoal && (
                  <span style={{
                    fontSize:10, padding:"2px 8px", borderRadius:10,
                    background:"#FFF0D8", color:"#A06010",
                    fontWeight:600, letterSpacing:0.3, whiteSpace:"nowrap",
                    border:"1px solid #F0C060",
                  }}>🎯 {linkedGoal.name}</span>
                )}
              </div>
              <div style={{ fontSize: 11, color: theme?.accentMuted || "#8A9AB8", marginTop: 2 }}>
                {fmt(bucket.spent, currency)} {t.of} {fmt(bucket.budget, currency)}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, marginLeft: 8 }}>
            <div style={{
              fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20,
              background: remaining < 0 ? "#FFE0E0" : theme ? `${theme.accent}18` : "#E0EEF8",
              color: remaining < 0 ? "#C04040" : theme ? theme.accentDeep : "#1A3A7A",
            }}>
              {remaining >= 0 ? fmt(remaining, currency) : `${fmt(Math.abs(remaining), currency)} ${t.over}`}
            </div>
            <button onClick={e => { e.stopPropagation(); onDelete(); }} style={{
              background: "none", border: "none", cursor: "pointer", color: "#B0B8C8", fontSize: 16, padding: "2px 5px",
            }}>{t.deleteBucket}</button>
          </div>
        </div>

        <FillBar pct={pct} color={pal} />

        {expanded && (
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <input
                type="number" value={spendInput} onChange={e => setSpendInput(e.target.value)}
                placeholder={t.addSpending}
                onKeyDown={e => e.key === "Enter" && handleAdd()}
                style={{
                  flex: 1, padding: "10px 14px", borderRadius: 12,
                  border: `1.5px solid ${pal.mid}`, background: "rgba(255,255,255,0.7)",
                  fontSize: 15, color: "#3A2E22",
                }}
              />
              <button onClick={handleAdd} style={{
                padding: "10px 18px", borderRadius: 12,
                background: `linear-gradient(135deg,${pal.mid},${pal.deep})`,
                color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 15,
              }}>{t.add}</button>
            </div>

            {/* Row 1: Save to all + Copy to months */}
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <button onClick={handleSaveToAll} style={{
                flex: 1, padding: "9px 10px", borderRadius: 12,
                border: `1.5px solid ${theme?.inputBorder||"#7AAAD8"}`,
                background: flash === "all" ? (theme?.accentDeep||"#1A3A7A") : "rgba(255,255,255,0.6)",
                color: flash === "all" ? "#fff" : (theme?.accentDeep||"#2A5A9A"),
                cursor: "pointer", fontSize: 11, fontWeight: 700, transition: "all 0.35s",
              }}>
                {flash === "all" ? t.saveBucketToAllDone : "📅 " + t.saveBucketToAll}
              </button>
              <button onClick={() => setModal("copy")} style={{
                flex: 1, padding: "9px 10px", borderRadius: 12,
                border: `1.5px solid ${theme?.inputBorder||"#7AAAD8"}`,
                background: flash === "copy" ? "#E0F4EA" : "rgba(255,255,255,0.6)",
                color: flash === "copy" ? "#1A6A3A" : (theme?.accentDeep||"#2A5A9A"),
                cursor: "pointer", fontSize: 11, fontWeight: 600, transition: "all 0.3s",
              }}>
                {flash === "copy" ? "✓ " + t.bucketCopied : "📋 " + t.copyBucketToMonths}
              </button>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setModal("budget")} style={{
                flex: 1, padding: "9px 10px", borderRadius: 12,
                border: `1.5px solid ${theme?.cardBorder||"#B8D0EC"}`,
                background: flash === "budget" ? "#E0F4EA" : "rgba(255,255,255,0.6)",
                color: flash === "budget" ? "#1A6A3A" : (theme?.accentMuted||"#5A8AB0"),
                cursor: "pointer", fontSize: 11, fontWeight: 600, transition: "all 0.3s",
              }}>
                {flash === "budget" ? "✓ Done" : "💰 " + t.editBudgetForMonths}
              </button>
            </div>

            {/* Category edit */}
            <div style={{ marginTop: 10 }}>
              <button onClick={() => setShowCatEdit(e => !e)} style={{
                width:"100%", padding:"8px 12px", borderRadius:12,
                border:`1.5px solid ${theme?.cardBorder||"#B8D0EC"}`,
                background:"rgba(255,255,255,0.6)", color:theme?.accentMuted||"#5A8AB0",
                cursor:"pointer", fontSize:11, fontWeight:600, textAlign:"left",
              }}>
                🏷️ {t.editCategory} {catName ? `· ${catName}` : ""}
              </button>
              {showCatEdit && (
                <div style={{ marginTop:8, display:"flex", flexWrap:"wrap", gap:6 }}>
                  <button onClick={()=>{onUpdateCategory(null);setShowCatEdit(false);}} style={{
                    padding:"5px 12px", borderRadius:12,
                    border:`1.5px solid ${theme?.inputBorder||"#7AAAD8"}`,
                    background:!bucket.categoryId?(theme?.accent||"#4A80C8"):"transparent",
                    color:!bucket.categoryId?"#fff":(theme?.accentDeep||"#2A5A9A"),
                    cursor:"pointer", fontSize:11, fontWeight:600,
                  }}>{t.noCategory}</button>
                  {categories.map(cat => (
                    <button key={cat.id} onClick={()=>{onUpdateCategory(cat.id);setShowCatEdit(false);}} style={{
                      padding:"5px 12px", borderRadius:12,
                      border:`1.5px solid ${theme?.inputBorder||"#7AAAD8"}`,
                      background:bucket.categoryId===cat.id?(theme?.accent||"#4A80C8"):"transparent",
                      color:bucket.categoryId===cat.id?"#fff":(theme?.accentDeep||"#2A5A9A"),
                      cursor:"pointer", fontSize:11, fontWeight:600,
                    }}>{cat.name}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {modal === "copy" && (
        <MonthSelectorModal title={t.copyBucketToMonths} t={t} theme={theme}
          onConfirm={handleCopy} onClose={() => setModal(null)} />
      )}
      {modal === "budget" && (
        <MonthSelectorModal title={t.editBudgetForMonths} t={t} theme={theme}
          onConfirm={handleBudget} onClose={() => setModal(null)}
          extraField={{ label: t.budgetForMonth, placeholder: t.budgetAmount }} />
      )}
    </>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function OverviewTab({ yearData, lang, currency, categories, theme }) {
  const t = T[lang];
  const th = theme || THEMES[0];
  const allSpent = yearData.map(m => m.buckets.reduce((s,b)=>s+b.spent,0));
  const allIncome = yearData.map(m => (m.incomeSources||[]).reduce((s,src)=>s+src.amount,0));
  const maxVal = Math.max(...yearData.map((m,i) => Math.max(allIncome[i], allSpent[i], 1)));

  const totIncome = allIncome.reduce((s,v)=>s+v,0);
  const totBudgeted = yearData.reduce((s,m)=>s+m.buckets.reduce((b,bk)=>b+bk.budget,0),0);
  const totSpent = yearData.reduce((s,m)=>s+m.buckets.reduce((b,bk)=>b+bk.spent,0),0);

  const catMap = {};
  yearData.forEach(m => m.buckets.forEach(b => {
    const key = b.name + "|" + (b.categoryId||"");
    if (!catMap[key]) catMap[key] = { name:b.name, budget:0, spent:0, colorIdx:b.colorIdx, categoryId:b.categoryId };
    catMap[key].budget += b.budget; catMap[key].spent += b.spent;
  }));
  const cats = Object.values(catMap).sort((a,b)=>b.spent-a.spent);

  const totLeftToSpend = totIncome - totBudgeted;

  return (
    <div>
      {/* Hero: Left to spend */}
      <div style={{
        background: totLeftToSpend < 0
          ? "linear-gradient(135deg,#5A1A2A,#8A2A3A)"
          : `linear-gradient(135deg,${th.accentDeep},${th.accent})`,
        borderRadius:20, padding:"22px 18px", marginBottom:12, textAlign:"center",
        boxShadow:`0 8px 32px ${th.accent}44`,
      }}>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)", letterSpacing:1.5, marginBottom:6 }}>
          {t.incomeMinusBudget.toUpperCase()}
        </div>
        <div style={{ fontSize:36, fontWeight:800, color:"#fff", letterSpacing:"-1.5px" }}>
          {fmt(totLeftToSpend, currency)}
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)", marginTop:4 }}>{t.leftToSpend}</div>
      </div>

      {/* Income + Budget */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
        <div style={{ background:th.card, border:`1px solid ${th.cardBorder}`, borderRadius:16, padding:"14px 16px" }}>
          <div style={{ fontSize:10, color:th.accentMuted, letterSpacing:0.8, marginBottom:5 }}>{t.totalIncome.toUpperCase()}</div>
          <div style={{ fontWeight:700, fontSize:18, color:th.accentDeep }}>{fmt(totIncome, currency)}</div>
          <div style={{ fontSize:14, marginTop:2 }}>💰</div>
        </div>
        <div style={{ background:th.card, border:`1px solid ${th.cardBorder}`, borderRadius:16, padding:"14px 16px" }}>
          <div style={{ fontSize:10, color:th.accentMuted, letterSpacing:0.8, marginBottom:5 }}>{t.totalBudgeted.toUpperCase()}</div>
          <div style={{ fontWeight:700, fontSize:18, color:th.accentDeep }}>{fmt(totBudgeted, currency)}</div>
          <div style={{ fontSize:14, marginTop:2 }}>📋</div>
        </div>
      </div>

      {/* Spent row */}
      <div style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        background:th.pill, border:`1px solid ${th.cardBorder}`,
        borderRadius:14, padding:"12px 16px", marginBottom:20,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:16 }}>🛒</span>
          <span style={{ fontSize:13, color:th.pillText, fontWeight:600 }}>{t.spentLabel2}</span>
        </div>
        <span style={{ fontSize:16, fontWeight:700, color:th.accentDeep }}>{fmt(totSpent, currency)}</span>
      </div>

      {/* Bar chart */}
      <div style={{ background:th.card, border:`1px solid ${th.cardBorder}`, borderRadius:20, padding:18, marginBottom:16 }}>
        <div style={{ fontWeight:700, fontSize:16, color:th.accentDeep, marginBottom:14 }}>{t.monthlyChart}</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:100 }}>
          {yearData.map((m,i) => {
            const budgeted = m.buckets.reduce((s,b)=>s+b.budget,0);
            const incH = maxVal>0?(allIncome[i]/maxVal)*90:0;
            const budH = maxVal>0?(budgeted/maxVal)*90:0;
            const spH  = maxVal>0?(allSpent[i]/maxVal)*90:0;
            return (
              <div key={i} style={{ flex:1, display:"flex", alignItems:"flex-end", gap:1, justifyContent:"center" }}>
                <div style={{ width:"30%", height:incH, minHeight:allIncome[i]>0?4:0, background:`linear-gradient(180deg,${th.accent}CC,${th.accentDeep})`, borderRadius:"3px 3px 0 0", transition:"height 0.6s ease" }} />
                <div style={{ width:"30%", height:budH, minHeight:budgeted>0?4:0, background:`linear-gradient(180deg,#A0C0F0,#6090D0)`, borderRadius:"3px 3px 0 0", transition:"height 0.6s ease" }} />
                <div style={{ width:"30%", height:spH, minHeight:allSpent[i]>0?4:0, background:"linear-gradient(180deg,#F09898,#C05050)", borderRadius:"3px 3px 0 0", transition:"height 0.6s ease" }} />
              </div>
            );
          })}
        </div>
        <div style={{ display:"flex", gap:3, marginTop:6 }}>
          {yearData.map((_,i)=><div key={i} style={{flex:1,textAlign:"center",fontSize:9,color:th.accentMuted}}>{t.months[i]}</div>)}
        </div>
        <div style={{ display:"flex", gap:12, marginTop:10, justifyContent:"center", flexWrap:"wrap" }}>
          {[[th.accent, t.totalIncome],["#6090D0", t.totalBudgeted],["#C05050", t.spentLabel2]].map(([col,lbl])=>(
            <div key={lbl} style={{display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:10,height:10,borderRadius:3,background:col}}/>
              <span style={{fontSize:10,color:th.accentMuted}}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      <div style={{ background:th.card, border:`1px solid ${th.cardBorder}`, borderRadius:20, padding:18 }}>
        <div style={{ fontWeight:700, fontSize:16, color:th.accentDeep, marginBottom:14 }}>{t.categoryBreakdown}</div>
        {cats.length === 0
          ? <div style={{color:th.accentMuted,fontSize:13,textAlign:"center",padding:20}}>{t.noData}</div>
          : cats.map(c => {
            const pal = getBucketPalettes(th)[c.colorIdx % 8];
            const pct = c.budget>0 ? Math.min((c.spent/c.budget)*100,100) : 0;
            const catName = categories.find(cat=>cat.id===c.categoryId)?.name;
            return (
              <div key={c.name+c.categoryId} style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:pal.mid}}/>
                    <span style={{fontSize:13,fontWeight:600,color:th.accentDeep}}>{c.name}</span>
                    {catName && <CategoryBadge name={catName} theme={th}/>}
                  </div>
                  <span style={{fontSize:12,color:th.accentMuted}}>{fmt(c.spent,currency)}</span>
                </div>
                <FillBar pct={pct} color={pal}/>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

// ─── Savings Tab ──────────────────────────────────────────────────────────────
function SavingsTab({ goals, setGoals, lang, currency, theme, yearData }) {
  const t = T[lang];
  const now = new Date();
  const currentMonthIdx = now.getMonth();
  const currentYear = now.getFullYear();

  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newMonthly, setNewMonthly] = useState("");
  const [newDeadlineMonth, setNewDeadlineMonth] = useState(currentMonthIdx);
  const [newDeadlineYear, setNewDeadlineYear] = useState(currentYear + 1);
  const [expandedId, setExpandedId] = useState(null);
  const [addAmount, setAddAmount] = useState({});

  // Total saved across all months from yearData for reference
  const totalYearlySaved = yearData.reduce((s, m) => {
    const inc = (m.incomeSources||[]).reduce((a,src)=>a+src.amount,0);
    const spent = m.buckets.reduce((a,b)=>a+b.spent,0);
    return s + Math.max(0, inc - spent);
  }, 0);

  function addGoal() {
    const name = newName.trim();
    const target = parseFloat(newTarget);
    const monthly = parseFloat(newMonthly);
    if (!name || isNaN(target) || target <= 0) return;
    setGoals(prev => [...prev, {
      id: Date.now(), name, target,
      monthly: isNaN(monthly) ? 0 : monthly,
      deadlineMonth: newDeadlineMonth,
      deadlineYear: newDeadlineYear,
      contributions: [], // [{date, amount}]
      colorIdx: prev.length % 8,
    }]);
    setNewName(""); setNewTarget(""); setNewMonthly("");
    setNewDeadlineMonth(currentMonthIdx); setNewDeadlineYear(currentYear + 1);
    setShowAdd(false);
  }

  function addContribution(goalId) {
    const v = parseFloat(addAmount[goalId]);
    if (isNaN(v) || v <= 0) return;
    setGoals(prev => prev.map(g => g.id === goalId ? {
      ...g,
      contributions: [...g.contributions, { date: new Date().toISOString(), amount: v }]
    } : g));
    setAddAmount(a => ({...a, [goalId]: ""}));
  }

  function deleteGoal(id) {
    setGoals(prev => prev.filter(g => g.id !== id));
  }

  function goalStats(goal) {
    const saved = goal.contributions.reduce((s, c) => s + c.amount, 0);
    const remaining = Math.max(0, goal.target - saved);
    const pct = goal.target > 0 ? Math.min((saved / goal.target) * 100, 100) : 0;
    const deadline = new Date(goal.deadlineYear, goal.deadlineMonth, 1);
    const monthsLeft = Math.max(0,
      (deadline.getFullYear() - now.getFullYear()) * 12 +
      (deadline.getMonth() - now.getMonth())
    );
    const needed = monthsLeft > 0 ? remaining / monthsLeft : remaining;
    const onTrack = goal.monthly > 0 && goal.monthly >= needed;
    const done = saved >= goal.target;
    return { saved, remaining, pct, monthsLeft, needed, onTrack, done };
  }

  const years = Array.from({length:6}, (_, i) => currentYear + i);

  return (
    <div>
      {/* Summary card */}
      <div style={{
        background: theme.header, borderRadius:20, padding:18, marginBottom:16,
        boxShadow:`0 4px 24px ${theme.accentDeep}40`,
      }}>
        <div style={{ fontSize:11, color:theme.accentMuted, letterSpacing:1, marginBottom:10 }}>
          {t.savingsGoals.toUpperCase()}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <div style={{ background:"rgba(255,255,255,0.10)", borderRadius:12, padding:"12px 14px" }}>
            <div style={{ fontSize:10, color:theme.accentMuted, letterSpacing:0.8, marginBottom:4 }}>
              {t.totalSaved.toUpperCase()}
            </div>
            <div style={{ fontSize:20, fontWeight:800, color:"#fff" }}>
              {fmt(goals.reduce((s,g)=>s+g.contributions.reduce((a,c)=>a+c.amount,0),0), currency)}
            </div>
          </div>
          <div style={{ background:"rgba(255,255,255,0.10)", borderRadius:12, padding:"12px 14px" }}>
            <div style={{ fontSize:10, color:theme.accentMuted, letterSpacing:0.8, marginBottom:4 }}>
              {(lang==="sv"?"AKTIVA MÅL":"ACTIVE GOALS").toUpperCase()}
            </div>
            <div style={{ fontSize:20, fontWeight:800, color:"#fff" }}>
              {goals.filter(g=>!goalStats(g).done).length}
            </div>
          </div>
        </div>
      </div>

      {/* Goal cards */}
      {goals.length === 0 ? (
        <div style={{ textAlign:"center", padding:"32px 20px", color:theme.accentMuted, fontSize:14, fontStyle:"italic" }}>
          {t.noGoals}
        </div>
      ) : goals.map(goal => {
        const { saved, remaining, pct, monthsLeft, needed, onTrack, done } = goalStats(goal);
        const pal = getBucketPalettes(theme)[goal.colorIdx % 8];
        const expanded = expandedId === goal.id;

        return (
          <div key={goal.id} style={{
            background: done
              ? `linear-gradient(135deg,${pal.light},#E8F8E8)`
              : `linear-gradient(135deg,${theme.card},white)`,
            borderRadius:20, padding:"16px 18px", marginBottom:12,
            border:`1px solid ${done ? "#A8D8A8" : theme.cardBorder}`,
            boxShadow: expanded ? "0 8px 32px rgba(0,0,0,0.10)" : "0 2px 8px rgba(0,0,0,0.05)",
          }}>
            {/* Header row */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}
              onClick={() => setExpandedId(expanded ? null : goal.id)}>
              <div style={{ display:"flex", alignItems:"center", gap:10, flex:1, cursor:"pointer" }}>
                <div style={{
                  width:42, height:42, borderRadius:"50%", flexShrink:0,
                  background: done
                    ? "linear-gradient(135deg,#4A9A4A,#2A6A2A)"
                    : `linear-gradient(135deg,${pal.mid},${pal.deep})`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:18,
                }}>{done ? "✓" : "🎯"}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:16, color:theme.accentDeep }}>{goal.name}</div>
                  <div style={{ fontSize:11, color:theme.accentMuted, marginTop:1 }}>
                    {fmt(saved, currency)} {t.of} {fmt(goal.target, currency)}
                    {!done && ` · ${monthsLeft} ${t.monthsLeft}`}
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                <div style={{
                  fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20,
                  background: done ? "#D8F8D8" : onTrack ? `${theme.accent}20` : "#FFE8D8",
                  color: done ? "#2A6A2A" : onTrack ? theme.accentDeep : "#A04020",
                }}>
                  {done ? t.completed : onTrack ? t.onTrack : t.behind}
                </div>
                <button onClick={e=>{e.stopPropagation();deleteGoal(goal.id);}} style={{
                  background:"none", border:"none", cursor:"pointer", color:theme.accentMuted, fontSize:16,
                }}>{t.deleteGoal}</button>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: expanded ? 14 : 0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <span style={{ fontSize:11, color:theme.accentMuted }}>{Math.round(pct)}%</span>
                <span style={{ fontSize:11, color:theme.accentMuted }}>{fmt(remaining, currency)} {t.remaining2}</span>
              </div>
              <div style={{ background:"rgba(0,0,0,0.08)", borderRadius:20, height:12, overflow:"hidden" }}>
                <div style={{
                  width:`${pct}%`, height:"100%", borderRadius:20,
                  background: done
                    ? "linear-gradient(90deg,#4A9A4A,#2A6A2A)"
                    : `linear-gradient(90deg,${pal.mid},${pal.deep})`,
                  transition:"width 0.8s cubic-bezier(0.34,1.56,0.64,1)",
                }}/>
              </div>
            </div>

            {/* Expanded: add contribution + stats */}
            {expanded && !done && (
              <div style={{ marginTop:14 }}>
                {/* Monthly needed vs planned */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
                  <div style={{ background:`${theme.accent}12`, borderRadius:12, padding:"10px 12px" }}>
                    <div style={{ fontSize:10, color:theme.accentMuted, marginBottom:3 }}>
                      {t.monthlySaving.toUpperCase()}
                    </div>
                    <div style={{ fontSize:15, fontWeight:700, color:theme.accentDeep }}>
                      {fmt(goal.monthly, currency)}
                    </div>
                  </div>
                  <div style={{ background: onTrack ? `${theme.accent}12` : "#FFE8D820", borderRadius:12, padding:"10px 12px" }}>
                    <div style={{ fontSize:10, color:theme.accentMuted, marginBottom:3 }}>
                      {(lang==="sv"?"BEHÖVER/MÅN":"NEEDED/MO").toUpperCase()}
                    </div>
                    <div style={{ fontSize:15, fontWeight:700, color: onTrack ? theme.accentDeep : "#A04020" }}>
                      {fmt(needed, currency)}
                    </div>
                  </div>
                </div>

                {/* Add contribution */}
                <div style={{ display:"flex", gap:8 }}>
                  <input
                    type="number"
                    value={addAmount[goal.id]||""}
                    onChange={e=>setAddAmount(a=>({...a,[goal.id]:e.target.value}))}
                    placeholder={t.goalContribution}
                    onKeyDown={e=>e.key==="Enter"&&addContribution(goal.id)}
                    style={{
                      flex:1, padding:"10px 14px", borderRadius:12,
                      border:`1.5px solid ${theme.inputBorder}`, background:"white",
                      fontSize:15, color:theme.accentDeep,
                    }}
                  />
                  <button onClick={()=>addContribution(goal.id)} style={{
                    padding:"10px 18px", borderRadius:12,
                    background:`linear-gradient(135deg,${pal.mid},${pal.deep})`,
                    color:"#fff", border:"none", cursor:"pointer", fontWeight:700, fontSize:15,
                  }}>{t.addContribution}</button>
                </div>

                {/* Recent contributions */}
                {goal.contributions.length > 0 && (
                  <div style={{ marginTop:10 }}>
                    <div style={{ fontSize:10, color:theme.accentMuted, letterSpacing:0.8, marginBottom:6 }}>
                      {(lang==="sv"?"SENASTE INSÄTTNINGAR":"RECENT CONTRIBUTIONS").toUpperCase()}
                    </div>
                    {[...goal.contributions].reverse().slice(0,3).map((c,i) => (
                      <div key={i} style={{
                        display:"flex", justifyContent:"space-between", alignItems:"center",
                        padding:"6px 0", borderBottom:`1px solid ${theme.cardBorder}`,
                        fontSize:13, color:theme.accentDeep,
                      }}>
                        <div>
                          <span>{new Date(c.date).toLocaleDateString(lang==="sv"?"sv-SE":"en-GB")}</span>
                          {c.fromBucket && (
                            <span style={{ fontSize:10, color:theme.accentMuted, marginLeft:6 }}>
                              📦 {c.fromBucket}
                            </span>
                          )}
                        </div>
                        <span style={{ fontWeight:600 }}>+{fmt(c.amount, currency)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Add goal form */}
      {showAdd ? (
        <div style={{ background:theme.card, borderRadius:20, padding:18, border:`1.5px dashed ${theme.inputBorder}` }}>
          <div style={{ fontWeight:700, fontSize:16, color:theme.accentDeep, marginBottom:14 }}>
            {t.addGoal.replace("+ ","").replace("Nytt ","").replace("New ","")}
          </div>

          <div style={{ display:"flex", gap:8, marginBottom:10 }}>
            <input type="text" value={newName} onChange={e=>setNewName(e.target.value)}
              placeholder={t.goalName}
              style={{ flex:2, padding:"10px 14px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep }}
            />
            <input type="number" value={newTarget} onChange={e=>setNewTarget(e.target.value)}
              placeholder={t.goalTarget}
              style={{ flex:1, padding:"10px 14px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep }}
            />
          </div>

          <div style={{ display:"flex", gap:8, marginBottom:10 }}>
            <input type="number" value={newMonthly} onChange={e=>setNewMonthly(e.target.value)}
              placeholder={t.goalContribution}
              style={{ flex:1, padding:"10px 14px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep }}
            />
          </div>

          {/* Deadline picker */}
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, color:theme.accentMuted, marginBottom:7, letterSpacing:0.5 }}>
              {t.goalDeadline.toUpperCase()}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <select value={newDeadlineMonth} onChange={e=>setNewDeadlineMonth(Number(e.target.value))}
                style={{ flex:1, padding:"10px 12px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep }}>
                {t.fullMonths.map((m,i)=><option key={i} value={i}>{m}</option>)}
              </select>
              <select value={newDeadlineYear} onChange={e=>setNewDeadlineYear(Number(e.target.value))}
                style={{ flex:1, padding:"10px 12px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep }}>
                {years.map(y=><option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display:"flex", gap:8 }}>
            <button onClick={addGoal} style={{
              flex:1, padding:13, borderRadius:16,
              background:`linear-gradient(135deg,${theme.accent},${theme.accentDeep})`,
              color:"#fff", border:"none", cursor:"pointer", fontWeight:700, fontSize:15,
              boxShadow:`0 4px 16px ${theme.accent}44`,
            }}>{t.add}</button>
            <button onClick={()=>{setShowAdd(false);setNewName("");setNewTarget("");setNewMonthly("");}} style={{
              padding:"13px 20px", borderRadius:16, background:theme.pill,
              color:theme.pillText, border:"none", cursor:"pointer", fontSize:15,
            }}>✕</button>
          </div>
        </div>
      ) : (
        <button onClick={()=>setShowAdd(true)} style={{
          width:"100%", padding:14, borderRadius:20,
          border:`2px dashed ${theme.inputBorder}`, background:"transparent",
          color:theme.accent, cursor:"pointer", fontWeight:700, fontSize:15, marginTop:4,
        }}>{t.addGoal}</button>
      )}
    </div>
  );
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
function ProfileScreen({ user, lang, theme, onClose, onLogout }) {
  const t = T[lang];
  const [newPw, setNewPw]       = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg]       = useState("");
  const [deleteInput, setDeleteInput] = useState("");
  const [showDelete, setShowDelete]   = useState(false);
  const [loading, setLoading]   = useState(false);

  async function changePassword() {
    if (newPw !== confirmPw) { setPwMsg(t.passwordMismatch); return; }
    if (newPw.length < 6) { setPwMsg(lang==="sv"?"Minst 6 tecken":"Minimum 6 characters"); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setLoading(false);
    if (error) { setPwMsg(error.message); return; }
    setPwMsg(t.passwordChanged);
    setNewPw(""); setConfirmPw("");
    setTimeout(() => setPwMsg(""), 3000);
  }

  async function deleteAccount() {
    const confirmWord = lang === "sv" ? "RADERA" : "DELETE";
    if (deleteInput !== confirmWord) return;
    setLoading(true);
    // Delete user data first
    await supabase.from("user_data").delete().eq("user_id", user.id);
    // Delete auth user via RPC
    await supabase.rpc("delete_user");
    setLoading(false);
    onLogout();
  }

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:300, display:"flex", alignItems:"flex-end" }}
      onClick={onClose}>
      <div style={{
        background:theme.card, borderRadius:"24px 24px 0 0", padding:24,
        width:"100%", maxWidth:480, margin:"0 auto", maxHeight:"85vh", overflowY:"auto",
      }} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div>
            <div style={{ fontWeight:800, fontSize:20, color:theme.accentDeep }}>👤 {t.myAccount}</div>
            <div style={{ fontSize:12, color:theme.accentMuted, marginTop:2 }}>{user.name}</div>
          </div>
          <button onClick={onClose} style={{ background:theme.pill, border:"none", borderRadius:12, padding:"8px 14px", cursor:"pointer", color:theme.pillText, fontWeight:600 }}>{t.close}</button>
        </div>

        {/* Email */}
        <div style={{ background:theme.pill, borderRadius:14, padding:"12px 16px", marginBottom:16 }}>
          <div style={{ fontSize:10, color:theme.accentMuted, letterSpacing:0.8, marginBottom:4 }}>{t.accountEmail.toUpperCase()}</div>
          <div style={{ fontSize:14, fontWeight:600, color:theme.accentDeep }}>{user.email || "—"}</div>
        </div>

        {/* Change password */}
        <div style={{ background:theme.pill, borderRadius:16, padding:16, marginBottom:16 }}>
          <div style={{ fontWeight:700, fontSize:14, color:theme.accentDeep, marginBottom:12 }}>🔑 {t.changePassword}</div>
          <input type="password" value={newPw} onChange={e=>setNewPw(e.target.value)}
            placeholder={t.newPassword}
            style={{ width:"100%", padding:"10px 14px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep, marginBottom:8 }}
          />
          <input type="password" value={confirmPw} onChange={e=>setConfirmPw(e.target.value)}
            placeholder={t.confirmPassword}
            onKeyDown={e=>e.key==="Enter"&&changePassword()}
            style={{ width:"100%", padding:"10px 14px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep, marginBottom:10 }}
          />
          {pwMsg && <div style={{ fontSize:12, color: pwMsg.includes("✓") ? "#2A6A2A" : "#C03030", marginBottom:8, fontWeight:600 }}>{pwMsg}</div>}
          <button onClick={changePassword} disabled={loading || !newPw} style={{
            width:"100%", padding:"11px", borderRadius:12,
            background: (!newPw||loading) ? theme.cardBorder : `linear-gradient(135deg,${theme.accent},${theme.accentDeep})`,
            color:"#fff", border:"none", cursor:(!newPw||loading)?"default":"pointer", fontWeight:700, fontSize:14,
          }}>{loading ? "…" : t.changePassword}</button>
        </div>

        {/* GDPR note */}
        <div style={{ background:`${theme.accent}10`, borderRadius:14, padding:"12px 16px", marginBottom:16, border:`1px solid ${theme.cardBorder}` }}>
          <div style={{ fontSize:11, color:theme.accentMuted, lineHeight:1.6 }}>🇪🇺 {t.gdprNote}</div>
        </div>

        {/* Delete account */}
        <div style={{ borderRadius:16, padding:16, border:"1.5px solid #F0A0A0", background:"#FFF8F8" }}>
          <div style={{ fontWeight:700, fontSize:14, color:"#C03030", marginBottom:8 }}>🗑️ {t.deleteAccount}</div>
          {!showDelete ? (
            <button onClick={()=>setShowDelete(true)} style={{
              width:"100%", padding:"10px", borderRadius:12,
              border:"1.5px solid #F0A0A0", background:"transparent",
              color:"#C03030", cursor:"pointer", fontWeight:600, fontSize:13,
            }}>{t.deleteAccount}</button>
          ) : (
            <>
              <div style={{ fontSize:12, color:"#C03030", marginBottom:8 }}>{t.deleteAccountConfirm}</div>
              <input type="text" value={deleteInput} onChange={e=>setDeleteInput(e.target.value)}
                placeholder={lang==="sv"?"RADERA":"DELETE"}
                style={{ width:"100%", padding:"10px 14px", borderRadius:12, border:"1.5px solid #F0A0A0", background:"white", fontSize:14, color:"#C03030", marginBottom:8, fontWeight:700 }}
              />
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={deleteAccount}
                  disabled={deleteInput !== (lang==="sv"?"RADERA":"DELETE") || loading}
                  style={{
                    flex:1, padding:"11px", borderRadius:12,
                    background: deleteInput===(lang==="sv"?"RADERA":"DELETE") ? "#C03030" : "#E0C0C0",
                    color:"#fff", border:"none", cursor:"pointer", fontWeight:700, fontSize:14,
                  }}>{loading?"…":t.deleteAccount}</button>
                <button onClick={()=>{setShowDelete(false);setDeleteInput("");}} style={{
                  padding:"11px 16px", borderRadius:12, background:theme.pill,
                  color:theme.pillText, border:"none", cursor:"pointer",
                }}>{t.cancel}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [lang, setLang] = useLS("saldo_ui_lang", "sv");
  const t = T[lang];
  const theme = THEMES[0];

  const [mode, setMode]         = useState("login"); // "login" | "signup" | "reset"
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [info, setInfo]         = useState("");

  async function handleLogin(e) {
    e?.preventDefault();
    setError(""); setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(lang==="sv" ? "Fel e-post eller lösenord." : "Incorrect email or password."); return; }
    onLogin({ id: data.user.id, name: data.user.user_metadata?.name || email.split("@")[0] });
  }

  async function handleSignup(e) {
    e?.preventDefault();
    if (!name.trim()) { setError(lang==="sv" ? "Ange ditt namn." : "Please enter your name."); return; }
    setError(""); setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { name: name.trim() } }
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    if (data?.user?.identities?.length === 0) {
      setError(lang==="sv" ? "E-postadressen är redan registrerad." : "Email already registered.");
      return;
    }
    setInfo(lang==="sv"
      ? "Konto skapat! Kontrollera din e-post för att bekräfta kontot."
      : "Account created! Check your email to confirm.");
    setMode("login");
  }

  async function handleReset(e) {
    e?.preventDefault();
    setError(""); setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setInfo(lang==="sv"
      ? "Återställningslänk skickad till din e-post."
      : "Reset link sent to your email.");
    setMode("login");
  }

  const sv = lang === "sv";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:${theme.bodyBg};font-family:'Plus Jakarta Sans',system-ui,sans-serif;}
        input:focus{outline:none;border-color:${theme.accent}!important;}
      `}</style>
      <div style={{ minHeight:"100vh", background:theme.bg, display:"flex", flexDirection:"column" }}>

        {/* Header */}
        <div style={{ padding:"64px 24px 36px", background:theme.header, borderRadius:"0 0 36px 36px", textAlign:"center", boxShadow:`0 8px 40px ${theme.accentDeep}60` }}>
          <div style={{ fontSize:48, marginBottom:10 }}>💰</div>
          <div style={{ fontWeight:800, fontSize:36, color:"#fff", letterSpacing:"-1px" }}>Saldo</div>
          <div style={{ fontSize:14, color:theme.accentMuted, marginTop:4 }}>{t.appSubtitle}</div>
          <button onClick={()=>setLang(l=>l==="en"?"sv":"en")} style={{
            marginTop:16, padding:"6px 16px", borderRadius:20,
            border:`1.5px solid ${theme.accentMuted}`, background:"transparent",
            color:theme.accentText, cursor:"pointer", fontSize:12, fontWeight:600,
          }}>{t.switchLang}</button>
        </div>

        <div style={{ padding:"28px 20px", flex:1, maxWidth:480, width:"100%", margin:"0 auto" }}>

          {/* Info/error banners */}
          {info && (
            <div style={{ background:"#E8F8E8", border:"1px solid #A8D8A8", borderRadius:14, padding:"12px 16px", marginBottom:16, fontSize:13, color:"#2A6A2A", fontWeight:500 }}>
              ✓ {info}
            </div>
          )}
          {error && (
            <div style={{ background:"#FFE8E8", border:"1px solid #F0A0A0", borderRadius:14, padding:"12px 16px", marginBottom:16, fontSize:13, color:"#C03030", fontWeight:500 }}>
              {error}
            </div>
          )}

          {/* Form card */}
          <div style={{ background:theme.card, borderRadius:24, padding:24, border:`1px solid ${theme.cardBorder}`, boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight:800, fontSize:20, color:theme.accentDeep, marginBottom:20 }}>
              {mode==="login"  ? (sv?"Logga in":"Sign in") :
               mode==="signup" ? (sv?"Skapa konto":"Create account") :
                                 (sv?"Återställ lösenord":"Reset password")}
            </div>

            {/* Name field (signup only) */}
            {mode==="signup" && (
              <input type="text" value={name} onChange={e=>{setName(e.target.value);setError("");}}
                placeholder={sv?"Ditt namn":"Your name"}
                style={{ width:"100%", padding:"13px 16px", borderRadius:14, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:15, color:theme.accentDeep, marginBottom:12 }}
              />
            )}

            {/* Email */}
            <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setError("");}}
              placeholder={sv?"E-postadress":"Email address"}
              onKeyDown={e=>e.key==="Enter"&&(mode==="login"?handleLogin():mode==="signup"?handleSignup():handleReset())}
              style={{ width:"100%", padding:"13px 16px", borderRadius:14, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:15, color:theme.accentDeep, marginBottom:12 }}
            />

            {/* Password (not on reset) */}
            {mode !== "reset" && (
              <input type="password" value={password} onChange={e=>{setPassword(e.target.value);setError("");}}
                placeholder={sv?"Lösenord":"Password"}
                onKeyDown={e=>e.key==="Enter"&&(mode==="login"?handleLogin():handleSignup())}
                style={{ width:"100%", padding:"13px 16px", borderRadius:14, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:15, color:theme.accentDeep, marginBottom:8 }}
              />
            )}

            {/* Forgot password link */}
            {mode==="login" && (
              <div style={{ textAlign:"right", marginBottom:16 }}>
                <button onClick={()=>{setMode("reset");setError("");setInfo("");}} style={{
                  background:"none", border:"none", cursor:"pointer",
                  color:theme.accentMuted, fontSize:12,
                }}>{sv?"Glömt lösenord?":"Forgot password?"}</button>
              </div>
            )}

            {/* Primary button */}
            <button
              onClick={mode==="login"?handleLogin:mode==="signup"?handleSignup:handleReset}
              disabled={loading}
              style={{
                width:"100%", padding:"14px", borderRadius:16, marginTop:4,
                background: loading ? theme.pill : `linear-gradient(135deg,${theme.accent},${theme.accentDeep})`,
                color: loading ? theme.pillText : "#fff",
                border:"none", cursor:loading?"default":"pointer",
                fontWeight:800, fontSize:16, boxShadow:`0 4px 16px ${theme.accent}44`,
                transition:"all 0.2s",
              }}>
              {loading ? (sv?"Laddar…":"Loading…") :
               mode==="login"  ? (sv?"Logga in":"Sign in") :
               mode==="signup" ? (sv?"Skapa konto":"Create account") :
                                 (sv?"Skicka återställningslänk":"Send reset link")}
            </button>
          </div>

          {/* Mode switcher */}
          <div style={{ textAlign:"center", marginTop:20, fontSize:14, color:theme.accentMuted }}>
            {mode==="login" ? (
              <>
                {sv?"Inget konto? ":"No account? "}
                <button onClick={()=>{setMode("signup");setError("");setInfo("");}} style={{
                  background:"none", border:"none", cursor:"pointer",
                  color:theme.accentDeep, fontWeight:700, fontSize:14,
                }}>{sv?"Skapa ett":"Create one"}</button>
              </>
            ) : (
              <button onClick={()=>{setMode("login");setError("");setInfo("");}} style={{
                background:"none", border:"none", cursor:"pointer",
                color:theme.accentDeep, fontWeight:700, fontSize:14,
              }}>← {sv?"Tillbaka till inloggning":"Back to sign in"}</button>
            )}
          </div>

          {/* Demo mode */}
          <div style={{ marginTop:24, padding:18, background:`${theme.accent}10`, borderRadius:16, border:`1px solid ${theme.cardBorder}` }}>
            <div style={{ fontSize:12, fontWeight:700, color:theme.accentDeep, marginBottom:6 }}>
              🧪 {sv?"Testläge":"Test mode"}
            </div>
            <div style={{ fontSize:12, color:theme.accentMuted, marginBottom:12 }}>
              {sv?"Prova appen med exempeldata utan att skapa konto.":"Try the app with sample data, no account needed."}
            </div>
            <button onClick={()=>onLogin({ id:"demo", name:"Demo", isDemo:true })} style={{
              width:"100%", padding:"11px", borderRadius:12,
              background:`linear-gradient(135deg,${theme.accent},${theme.accentDeep})`,
              color:"#fff", border:"none", cursor:"pointer", fontWeight:700, fontSize:14,
            }}>{sv?"Prova som demo":"Try as demo"}</button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Check existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User",
          email: session.user.email,
        });
      }
      setAuthLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User",
          email: session.user.email,
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setCurrentUser(null);
  }

  if (authLoading) {
    return (
      <div style={{ minHeight:"100vh", background:"#DDEAF8", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:40, marginBottom:12 }}>💰</div>
          <div style={{ fontWeight:800, fontSize:24, color:"#1A2F52" }}>Tryvi</div>
          <div style={{ fontSize:13, color:"#8AAAD8", marginTop:8 }}>Laddar…</div>
        </div>
      </div>
    );
  }

  if (!currentUser) return <LoginScreen onLogin={setCurrentUser} />;
  return <AppInner user={currentUser} onLogout={handleLogout} />;
}

function AppInner({ user, onLogout }) {
  const [lang, setLang]         = useLS("saldo_lang", "sv");
  const [currency, setCurrency] = useLS("saldo_currency", "SEK");
  const [themeId, setThemeId]   = useLS("saldo_theme", "blue");
  const theme = THEMES.find(th => th.id === themeId) || THEMES[0];

  const [activeTab, setActiveTab]         = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [showSettings, setShowSettings]   = useState(false);
  const [showProfile, setShowProfile]     = useState(false);

  const t = T[lang];

  // ── Supabase data ────────────────────────────────────────────────────────────
  const {
    yearData, setYearData,
    goals, setGoals,
    categories, setCategories,
    loading, saving, error: dataError,
  } = useSupabaseUserData(user.id, user.isDemo);

  const [newCatName, setNewCatName] = useState("");
  const [showAddCat, setShowAddCat] = useState(false);
  const [filterCat, setFilterCat] = useState("all");
  const [showAddSource, setShowAddSource] = useState(false);
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceAmount, setNewSourceAmount] = useState("");
  const [sourceFlash, setSourceFlash] = useState("");
  const [newName, setNewName] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newSavingsGoalId, setNewSavingsGoalId] = useState("");
  const [showAddBucket, setShowAddBucket] = useState(false);
  const [incomeCopied, setIncomeCopied] = useState(false);

  // Sync default category names when language changes
  useEffect(() => {
    setCategories(prev => prev.map((c,i) => i < 3 ? {...c, name: t.defaultCategories[i]} : c));
  }, [lang]);

  // Show loading screen while fetching data from Supabase
  if (loading || dataError) {
    return (
      <div style={{ minHeight:"100vh", background:theme.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
        <div style={{ textAlign:"center", maxWidth:320 }}>
          <div style={{ fontSize:40, marginBottom:12 }}>💰</div>
          <div style={{ fontWeight:800, fontSize:24, color:theme.accentDeep }}>Tryvi</div>
          {dataError ? (
            <>
              <div style={{ fontSize:13, color:"#C03030", marginTop:12, padding:"12px 16px", background:"#FFE8E8", borderRadius:12, border:"1px solid #F0A0A0" }}>
                ⚠️ {dataError}
              </div>
              <div style={{ fontSize:12, color:theme.accentMuted, marginTop:8 }}>
                {lang==="sv"
                  ? "Kontrollera att SQL-scriptet kördes i Supabase och att RLS är aktiverat."
                  : "Check that the SQL script ran in Supabase and RLS is enabled."}
              </div>
              <button onClick={onLogout} style={{
                marginTop:16, padding:"10px 24px", borderRadius:14,
                background:`linear-gradient(135deg,${theme.accent},${theme.accentDeep})`,
                color:"#fff", border:"none", cursor:"pointer", fontWeight:700,
              }}>{lang==="sv" ? "Logga ut och försök igen" : "Log out and try again"}</button>
            </>
          ) : (
            <div style={{ fontSize:13, color:theme.accentMuted, marginTop:8 }}>
              {lang==="sv" ? "Hämtar din data…" : "Loading your data…"}
            </div>
          )}
        </div>
      </div>
    );
  }

  const month = yearData[selectedMonth];

  function updateMonth(idx, fn) {
    setYearData(prev => prev.map((m,i) => i===idx ? fn(m) : m));
  }

  // ── Income sources ──────────────────────────────────────────────────────────

  function totalMonthIncome(m) {
    return (m.incomeSources || []).reduce((s, src) => s + (src.amount || 0), 0);
  }

  function addIncomeSource() {
    const name = newSourceName.trim();
    const amount = parseFloat(newSourceAmount);
    if (!name || isNaN(amount) || amount < 0) return;
    updateMonth(selectedMonth, m => ({
      ...m,
      incomeSources: [...(m.incomeSources || []), { id: Date.now(), name, amount }]
    }));
    setNewSourceName(""); setNewSourceAmount(""); setShowAddSource(false);
  }

  function updateSourceAmount(sourceId, value) {
    const v = parseFloat(value);
    if (isNaN(v) || v < 0) return;
    updateMonth(selectedMonth, m => ({
      ...m,
      incomeSources: (m.incomeSources || []).map(s => s.id === sourceId ? { ...s, amount: v } : s)
    }));
  }

  function deleteIncomeSource(sourceId) {
    updateMonth(selectedMonth, m => ({
      ...m, incomeSources: (m.incomeSources || []).filter(s => s.id !== sourceId)
    }));
  }

  function applySourceToAllMonths(source) {
    setYearData(prev => prev.map((m, i) => {
      if (i === selectedMonth) return m;
      const sources = m.incomeSources || [];
      const exists = sources.find(s => s.name === source.name);
      if (exists) return { ...m, incomeSources: sources.map(s => s.name === source.name ? { ...s, amount: source.amount } : s) };
      return { ...m, incomeSources: [...sources, { ...source, id: Date.now() + Math.random() }] };
    }));
    setSourceFlash(source.id);
    setTimeout(() => setSourceFlash(""), 2000);
  }

  function addBucket() {
    const name = newName.trim();
    const budget = parseFloat(newBudget);
    if (!name||isNaN(budget)||budget<=0) return;
    const colorIdx = month.buckets.length % 8;
    updateMonth(selectedMonth, m=>({
      ...m, buckets:[...m.buckets,{
        id:Date.now(), name, budget, spent:0, colorIdx,
        categoryId:newCategoryId||null,
        savingsGoalId:newSavingsGoalId||null,
      }]
    }));
    setNewName(""); setNewBudget(""); setNewCategoryId(""); setNewSavingsGoalId(""); setShowAddBucket(false);
  }

  function deleteBucket(id) {
    updateMonth(selectedMonth, m=>({...m,buckets:m.buckets.filter(b=>b.id!==id)}));
  }

  function addSpend(bucketId, amount) {
    // Find bucket to check if it's linked to a savings goal
    const bucket = month.buckets.find(b => b.id === bucketId);
    updateMonth(selectedMonth, m=>({...m,buckets:m.buckets.map(b=>b.id===bucketId?{...b,spent:b.spent+amount}:b)}));
    // Auto-add contribution to linked savings goal
    if (bucket?.savingsGoalId) {
      setGoals(prev => prev.map(g => g.id === bucket.savingsGoalId ? {
        ...g,
        contributions: [...g.contributions, {
          date: new Date().toISOString(),
          amount,
          fromBucket: bucket.name,
        }]
      } : g));
    }
  }

  function copyBucketToMonths(bucket, months) {
    setYearData(prev => prev.map((m,i) => {
      if (!months.includes(i)||i===selectedMonth) return m;
      const exists = m.buckets.find(b=>b.name===bucket.name);
      if (exists) return {...m,buckets:m.buckets.map(b=>b.name===bucket.name?{...b,budget:bucket.budget,colorIdx:bucket.colorIdx,categoryId:bucket.categoryId}:b)};
      return {...m,buckets:[...m.buckets,{...bucket,id:Date.now()+Math.random(),spent:0}]};
    }));
  }

  function editBudgetForMonths(bucket, months, newBudget) {
    const v = parseFloat(newBudget);
    if (isNaN(v)||v<=0) return;
    setYearData(prev => prev.map((m,i) => {
      if (!months.includes(i)) return m;
      const exists = m.buckets.find(b=>b.name===bucket.name);
      if (exists) return {...m,buckets:m.buckets.map(b=>b.name===bucket.name?{...b,budget:v}:b)};
      return {...m,buckets:[...m.buckets,{...bucket,id:Date.now()+Math.random(),budget:v,spent:0}]};
    }));
  }

  function saveBucketToAllMonths(bucket) {
    setYearData(prev => prev.map((m, i) => {
      if (i === selectedMonth) return m;
      const exists = m.buckets.find(b => b.name === bucket.name);
      if (exists) {
        return { ...m, buckets: m.buckets.map(b => b.name === bucket.name
          ? { ...b, budget: bucket.budget, colorIdx: bucket.colorIdx, categoryId: bucket.categoryId }
          : b) };
      }
      return { ...m, buckets: [...m.buckets, { ...bucket, id: Date.now() + Math.random(), spent: 0 }] };
    }));
  }

  function updateBucketCategory(bucketId, categoryId) {
    updateMonth(selectedMonth, m => ({
      ...m, buckets: m.buckets.map(b => b.id === bucketId ? { ...b, categoryId } : b)
    }));
  }

  function addCategory() {
    const name = newCatName.trim();
    if (!name) return;
    setCategories(prev=>[...prev,{id:"cat_"+Date.now(),name}]);
    setNewCatName(""); setShowAddCat(false);
  }

  function monthFillPct(m) {
    const inc = totalMonthIncome(m);
    if (!inc) return 0;
    return (m.buckets.reduce((s,b)=>s+b.spent,0)/inc)*100;
  }

  const totalBudgeted = month.buckets.reduce((s,b)=>s+b.budget,0);
  const totalSpent = month.buckets.reduce((s,b)=>s+b.spent,0);
  const monthIncome = totalMonthIncome(month);
  const unbudgeted = monthIncome - totalBudgeted;

  const filteredBuckets = filterCat==="all" ? month.buckets
    : filterCat==="none" ? month.buckets.filter(b=>!b.categoryId)
    : month.buckets.filter(b=>b.categoryId===filterCat);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:${theme.bodyBg};font-family:'Plus Jakarta Sans',system-ui,sans-serif;}
        input:focus,select:focus{outline:none;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:${theme.scrollThumb};border-radius:2px;}
      `}</style>

      <div style={{ minHeight:"100vh", background:theme.bg, paddingBottom:80 }}>

        {/* Header */}
        <div style={{ padding:"52px 20px 22px", background:theme.header, borderRadius:"0 0 32px 32px", marginBottom:18, boxShadow:`0 8px 40px ${theme.accentDeep}60` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <div style={{ fontWeight:800, fontSize:30, color:"#fff", letterSpacing:"-1px" }}>{t.appTitle}</div>
              <div style={{ fontSize:12, color:theme.accentMuted, marginTop:2, display:"flex", alignItems:"center", gap:6 }}>
                <button onClick={()=>setShowProfile(true)} style={{
                  background:"none", border:"none", cursor:"pointer",
                  color:theme.accentMuted, fontSize:12, padding:0, fontWeight:600,
                  textDecoration:"underline", textDecorationStyle:"dotted",
                }}>
                  👤 {user.name}{user.isDemo ? " (Demo)" : ""}
                </button>
                {saving && <span style={{ fontSize:10, color:theme.accentMuted }}>· {lang==="sv"?"sparar…":"saving…"}</span>}
                {!saving && !user.isDemo && <span style={{ fontSize:10, color:"#80D880" }}>✓</span>}
              </div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={()=>setLang(l=>l==="en"?"sv":"en")} style={{
                padding:"7px 14px", borderRadius:20, border:`1.5px solid ${theme.accentMuted}`,
                background:"transparent", color:theme.accentText, cursor:"pointer", fontSize:12, fontWeight:600,
              }}>{t.switchLang}</button>
              <button onClick={()=>setShowSettings(s=>!s)} style={{
                padding:"7px 12px", borderRadius:20, border:`1.5px solid ${theme.headerBorder}`,
                background: showSettings ? theme.accentDeep+"80" : "transparent",
                color:theme.accentText, cursor:"pointer", fontSize:16,
              }}>⚙</button>
              <button onClick={onLogout} title="Log out" style={{
                padding:"7px 12px", borderRadius:20, border:`1.5px solid ${theme.headerBorder}`,
                background:"transparent", color:theme.accentText, cursor:"pointer", fontSize:14,
              }}>⏏</button>
            </div>
          </div>

          {showSettings && (
            <div style={{ background:"rgba(0,0,0,0.25)", borderRadius:18, padding:16, marginTop:14, backdropFilter:"blur(10px)" }}>
              {/* Currency */}
              <div style={{ fontSize:11, color:theme.accentMuted, marginBottom:8, letterSpacing:1 }}>{t.currency.toUpperCase()}</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
                {CURRENCIES.map(c=>(
                  <button key={c} onClick={()=>setCurrency(c)} style={{
                    padding:"5px 14px", borderRadius:14,
                    background: currency===c ? theme.accent : "transparent",
                    border: `1px solid ${currency===c ? theme.accent : theme.headerBorder}`,
                    color: currency===c ? "#fff" : theme.accentText,
                    cursor:"pointer", fontSize:13, fontWeight:currency===c?700:400,
                  }}>{c}</button>
                ))}
              </div>
              {/* Theme picker */}
              <div style={{ fontSize:11, color:theme.accentMuted, marginBottom:8, letterSpacing:1 }}>{t.colorTheme.toUpperCase()}</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {THEMES.map(th=>(
                  <button key={th.id} onClick={()=>setThemeId(th.id)} style={{
                    display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                    padding:"8px 10px", borderRadius:14,
                    background: themeId===th.id ? "rgba(255,255,255,0.2)" : "transparent",
                    border: `2px solid ${themeId===th.id ? "#fff" : "rgba(255,255,255,0.15)"}`,
                    cursor:"pointer",
                  }}>
                    <div style={{ display:"flex", gap:3 }}>
                      <div style={{ width:14, height:14, borderRadius:"50%", background:th.accentDeep }} />
                      <div style={{ width:14, height:14, borderRadius:"50%", background:th.accent }} />
                      <div style={{ width:14, height:14, borderRadius:"50%", background:th.pill }} />
                    </div>
                    <span style={{ fontSize:10, color:themeId===th.id?"#fff":theme.accentMuted, fontWeight:600 }}>{th.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div style={{ display:"flex", gap:6, marginTop:18 }}>
            {["monthly","savings","overview"].map(tab=>(
              <button key={tab} onClick={()=>setActiveTab(tab)} style={{
                flex:1, padding:"11px", borderRadius:16,
                background: activeTab===tab ? theme.accent : "transparent",
                border: `1.5px solid ${activeTab===tab ? theme.accent : theme.headerBorder}`,
                color: activeTab===tab ? "#fff" : theme.accentText,
                cursor:"pointer", fontSize:13, fontWeight:activeTab===tab?700:500,
                boxShadow: activeTab===tab ? `0 4px 16px ${theme.accent}55` : "none",
              }}>{tab==="monthly" ? t.monthly : tab==="savings" ? t.savings : t.overview}</button>
            ))}
          </div>
        </div>

        <div style={{ padding:"0 16px" }}>
          {/* Month pills — only on monthly tab */}
          {activeTab !== "savings" && (
          <div style={{ overflowX:"auto", paddingBottom:8 }}>
            <div style={{ display:"flex", gap:6, width:"max-content" }}>
              {yearData.map((m,i)=>(
                <MonthPill key={i} label={t.months[i]} isSelected={selectedMonth===i}
                  fillPct={monthFillPct(m)} onClick={()=>setSelectedMonth(i)} theme={theme}/>
              ))}
            </div>
          </div>
          )}

          <div style={{ marginTop:16 }}>
            {activeTab==="overview" ? (
              <OverviewTab yearData={yearData} lang={lang} currency={currency} categories={categories} theme={theme}/>
            ) : activeTab==="savings" ? (
              <SavingsTab goals={goals} setGoals={setGoals} lang={lang} currency={currency} theme={theme} yearData={yearData}/>
            ) : (
              <>
                <div style={{ fontStyle:"italic", fontSize:22, color:theme.accentDeep, marginBottom:14, fontWeight:300 }}>
                  {t.fullMonths[selectedMonth]}
                </div>

                {/* Income card — multi-source */}
                <div style={{ background:theme.header, borderRadius:20, padding:18, marginBottom:14, boxShadow:`0 4px 24px ${theme.accentDeep}40` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                    <div style={{ fontSize:11, color:theme.accentMuted, letterSpacing:1 }}>{t.incomeSources.toUpperCase()}</div>
                    <div style={{ fontSize:18, fontWeight:800, color:"#fff" }}>{fmt(monthIncome, currency)}</div>
                  </div>

                  {/* Source rows */}
                  {(month.incomeSources||[]).map(src => (
                    <IncomeSourceRow
                      key={src.id} source={src} currency={currency} t={t} theme={theme}
                      flashing={sourceFlash === src.id}
                      onUpdate={val => updateSourceAmount(src.id, val)}
                      onDelete={() => deleteIncomeSource(src.id)}
                      onApplyToAll={() => applySourceToAllMonths(src)}
                    />
                  ))}

                  {/* Add source form */}
                  {showAddSource ? (
                    <div style={{ marginTop:10 }}>
                      <div style={{ display:"flex", gap:8, marginBottom:8 }}>
                        <input type="text" value={newSourceName} onChange={e=>setNewSourceName(e.target.value)}
                          placeholder={t.incomeSourceName}
                          style={{ flex:2, padding:"10px 12px", borderRadius:12, border:"1.5px solid #6A5A4A", background:"rgba(255,255,255,0.1)", color:"#F5F0EA", fontSize:14 }}
                        />
                        <input type="number" value={newSourceAmount} onChange={e=>setNewSourceAmount(e.target.value)}
                          placeholder={t.incomeSourceAmount}
                          onKeyDown={e=>e.key==="Enter"&&addIncomeSource()}
                          style={{ flex:1, padding:"10px 12px", borderRadius:12, border:"1.5px solid #6A5A4A", background:"rgba(255,255,255,0.1)", color:"#F5F0EA", fontSize:14 }}
                        />
                      </div>
                      <div style={{ display:"flex", gap:8 }}>
                        <button onClick={addIncomeSource} style={{
                          flex:1, padding:"10px", borderRadius:12, background:"#C4A882",
                          color:"#3A2E22", border:"none", cursor:"pointer", fontWeight:700, fontSize:14,
                        }}>{t.add}</button>
                        <button onClick={()=>{setShowAddSource(false);setNewSourceName("");setNewSourceAmount("");}} style={{
                          padding:"10px 14px", borderRadius:12, background:"rgba(255,255,255,0.1)",
                          color:"#C4A882", border:"none", cursor:"pointer", fontSize:14,
                        }}>✕</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={()=>setShowAddSource(true)} style={{
                      width:"100%", marginTop:10, padding:"9px", borderRadius:12,
                      border:"1.5px dashed #6A5A4A", background:"transparent",
                      color:"#C4A882", cursor:"pointer", fontSize:13, fontWeight:600,
                    }}>{t.addIncomeSource}</button>
                  )}

                  {/* Summary block */}
                  {monthIncome > 0 && (
                    <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid rgba(255,255,255,0.10)" }}>
                      {/* Big hero: Left to spend */}
                      <div style={{
                        background: (monthIncome - totalBudgeted) < 0 ? "rgba(220,60,60,0.2)" : "rgba(255,255,255,0.12)",
                        borderRadius:14, padding:"14px 16px", marginBottom:10, textAlign:"center",
                      }}>
                        <div style={{ fontSize:11, color:theme.accentMuted, letterSpacing:1, marginBottom:4 }}>
                          {t.incomeMinusBudget.toUpperCase()}
                        </div>
                        <div style={{
                          fontSize:30, fontWeight:800, letterSpacing:"-0.5px",
                          color: (monthIncome - totalBudgeted) < 0 ? "#FF9090" : "#fff",
                        }}>
                          {fmt(monthIncome - totalBudgeted, currency)}
                        </div>
                        <div style={{ fontSize:11, color:theme.accentMuted, marginTop:3 }}>{t.leftToSpend}</div>
                      </div>

                      {/* Two supporting blocks */}
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                        <div style={{ background:"rgba(255,255,255,0.10)", borderRadius:12, padding:"11px 14px" }}>
                          <div style={{ fontSize:10, color:theme.accentMuted, letterSpacing:0.8, marginBottom:5 }}>
                            {t.unbudgeted.toUpperCase()}
                          </div>
                          <div style={{ fontSize:17, fontWeight:700, color:"#fff" }}>
                            {fmt(monthIncome, currency)}
                          </div>
                        </div>
                        <div style={{ background:"rgba(255,255,255,0.10)", borderRadius:12, padding:"11px 14px" }}>
                          <div style={{ fontSize:10, color:theme.accentMuted, letterSpacing:0.8, marginBottom:5 }}>
                            {t.totalBudgeted.toUpperCase()}
                          </div>
                          <div style={{ fontSize:17, fontWeight:700, color:"#fff" }}>
                            {fmt(totalBudgeted, currency)}
                          </div>
                        </div>
                      </div>

                      {/* Spent row */}
                      <div style={{
                        display:"flex", justifyContent:"space-between", alignItems:"center",
                        marginTop:8, background:"rgba(255,255,255,0.08)", borderRadius:12, padding:"10px 14px",
                      }}>
                        <div style={{ fontSize:12, color:theme.accentMuted }}>{t.spentLabel2}</div>
                        <div style={{ fontSize:15, fontWeight:700, color:"#FFB0B0" }}>{fmt(totalSpent, currency)}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Category filter tabs */}
                {month.buckets.length>0 && (
                  <div style={{ overflowX:"auto", paddingBottom:6, marginBottom:12 }}>
                    <div style={{ display:"flex", gap:6, width:"max-content" }}>
                      {[{id:"all",name:t.filterCategory}, ...categories, {id:"none",name:t.noCategory}].map(cat=>(
                        <button key={cat.id} onClick={()=>setFilterCat(cat.id)} style={{
                          padding:"6px 14px", borderRadius:16, border:"none",
                          background:filterCat===cat.id ? theme.accentDeep : theme.pill,
                          color:filterCat===cat.id ? "#fff" : theme.pillText,
                          cursor:"pointer", fontSize:12, fontWeight:filterCat===cat.id?700:500,
                          whiteSpace:"nowrap",
                        }}>{cat.name}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Buckets */}
                {filteredBuckets.length===0 && month.buckets.length===0 ? (
                  <div style={{textAlign:"center",padding:"28px 20px",color:theme.accentMuted,fontSize:14,fontStyle:"italic"}}>{t.noData}</div>
                ) : filteredBuckets.length===0 ? (
                  <div style={{textAlign:"center",padding:18,color:theme.accentMuted,fontSize:13}}>—</div>
                ) : filteredBuckets.map(b=>(
                  <BucketCard key={b.id} bucket={b} lang={lang} currency={currency} categories={categories} goals={goals} theme={theme}
                    onDelete={()=>deleteBucket(b.id)}
                    onAddSpend={amt=>addSpend(b.id,amt)}
                    onCopyToMonths={months=>copyBucketToMonths(b,months)}
                    onEditBudgetMonths={(months,amt)=>editBudgetForMonths(b,months,amt)}
                    onSaveToAllMonths={()=>saveBucketToAllMonths(b)}
                    onUpdateCategory={catId=>updateBucketCategory(b.id,catId)}
                  />
                ))}

                {/* Add Bucket form */}
                {showAddBucket ? (
                  <div style={{ background:theme.card, borderRadius:20, padding:18, border:`1.5px dashed ${theme.inputBorder}`, marginBottom:12 }}>
                    <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                      <input type="text" value={newName} onChange={e=>setNewName(e.target.value)}
                        placeholder={t.bucketName}
                        style={{ flex:2, padding:"10px 14px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep }}
                      />
                      <input type="number" value={newBudget} onChange={e=>setNewBudget(e.target.value)}
                        placeholder={t.budgetAmount}
                        onKeyDown={e=>e.key==="Enter"&&addBucket()}
                        style={{ flex:1, padding:"10px 14px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep }}
                      />
                    </div>

                    {/* Category picker */}
                    <div style={{ marginBottom:12 }}>
                      <div style={{ fontSize:11, color:theme.accentMuted, marginBottom:7, letterSpacing:0.5 }}>{t.category.toUpperCase()}</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                        <button onClick={()=>setNewCategoryId("")} style={{
                          padding:"6px 14px", borderRadius:14, border:`1.5px solid ${theme.inputBorder}`,
                          background:newCategoryId===""?theme.accent:"transparent",
                          color:newCategoryId===""?"#fff":theme.accentDeep,
                          cursor:"pointer", fontSize:12, fontWeight:newCategoryId===""?700:400,
                        }}>{t.noCategory}</button>
                        {categories.map(cat=>(
                          <button key={cat.id} onClick={()=>setNewCategoryId(cat.id)} style={{
                            padding:"6px 14px", borderRadius:14, border:`1.5px solid ${theme.inputBorder}`,
                            background:newCategoryId===cat.id?theme.accent:"transparent",
                            color:newCategoryId===cat.id?"#fff":theme.accentDeep,
                            cursor:"pointer", fontSize:12, fontWeight:newCategoryId===cat.id?700:400,
                          }}>{cat.name}</button>
                        ))}
                      </div>
                    </div>

                    {/* Add new category inline */}
                    {showAddCat ? (
                      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
                        <input type="text" value={newCatName} onChange={e=>setNewCatName(e.target.value)}
                          placeholder={t.newCategoryName}
                          onKeyDown={e=>e.key==="Enter"&&addCategory()}
                          style={{ flex:1, padding:"9px 12px", borderRadius:12, border:`1.5px solid ${theme.cardBorder}`, background:"white", fontSize:13, color:theme.accentDeep }}
                        />
                        <button onClick={addCategory} style={{ padding:"9px 14px", borderRadius:12, background:theme.accent, color:"#fff", border:"none", cursor:"pointer", fontSize:13, fontWeight:600 }}>{t.add}</button>
                        <button onClick={()=>{setShowAddCat(false);setNewCatName("");}} style={{ padding:"9px 12px", borderRadius:12, background:theme.pill, color:theme.pillText, border:"none", cursor:"pointer" }}>✕</button>
                      </div>
                    ) : (
                      <button onClick={()=>setShowAddCat(true)} style={{
                        padding:"7px 14px", borderRadius:14, border:`1.5px dashed ${theme.cardBorder}`,
                        background:"transparent", color:theme.accentMuted, cursor:"pointer", fontSize:12, marginBottom:12,
                      }}>{t.addCategory}</button>
                    )}

                    {/* Savings goal picker */}
                    {goals.length > 0 && (
                      <div style={{ marginBottom:12 }}>
                        <div style={{ fontSize:11, color:theme.accentMuted, marginBottom:7, letterSpacing:0.5 }}>
                          {t.linkToGoal.toUpperCase()}
                        </div>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                          <button onClick={()=>setNewSavingsGoalId("")} style={{
                            padding:"6px 14px", borderRadius:14, border:`1.5px solid ${theme.inputBorder}`,
                            background:newSavingsGoalId===""?theme.accent:"transparent",
                            color:newSavingsGoalId===""?"#fff":theme.accentDeep,
                            cursor:"pointer", fontSize:12, fontWeight:newSavingsGoalId===""?700:400,
                          }}>{t.noLink}</button>
                          {goals.map(goal=>(
                            <button key={goal.id} onClick={()=>setNewSavingsGoalId(goal.id)} style={{
                              padding:"6px 14px", borderRadius:14,
                              border:`1.5px solid #F0C060`,
                              background:newSavingsGoalId===goal.id?"#F0C060":"transparent",
                              color:newSavingsGoalId===goal.id?"#5A3A00":"#A06010",
                              cursor:"pointer", fontSize:12, fontWeight:newSavingsGoalId===goal.id?700:400,
                            }}>🎯 {goal.name}</button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={addBucket} style={{
                        flex:1, padding:13, borderRadius:16,
                        background:`linear-gradient(135deg,${theme.accent},${theme.accentDeep})`,
                        color:"#fff", border:"none", cursor:"pointer", fontWeight:700, fontSize:15,
                        boxShadow:`0 4px 16px ${theme.accent}44`,
                      }}>{t.add}</button>
                      <button onClick={()=>{setShowAddBucket(false);setNewName("");setNewBudget("");setNewCategoryId("");}} style={{
                        padding:"13px 20px", borderRadius:16, background:theme.pill, color:theme.pillText, border:"none", cursor:"pointer", fontSize:15,
                      }}>✕</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={()=>setShowAddBucket(true)} style={{
                    width:"100%", padding:14, borderRadius:20,
                    border:`2px dashed ${theme.inputBorder}`, background:"transparent",
                    color:theme.accent, cursor:"pointer", fontWeight:700, fontSize:15, marginTop:4,
                  }}>{t.addBucket}</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile modal */}
      {showProfile && (
        <ProfileScreen
          user={{...user, email: user.email}}
          lang={lang} theme={theme}
          onClose={()=>setShowProfile(false)}
          onLogout={onLogout}
        />
      )}
    </>
  );
}
