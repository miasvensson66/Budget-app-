import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase client ──────────────────────────────────────────────────────────
const SUPABASE_URL  = "https://mhijoihswuwvheuaprsy.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oaWpvaWhzd3V3dmhldWFwcnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjA3NzQsImV4cCI6MjA5NDQzNjc3NH0.g4hy8zuoOcpr9AdBqMN_3iBIHjpRgIrGK_OlpbC8oxk";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ─── Responsive hook ──────────────────────────────────────────────────────────
function useViewport() {
  const [vw, setVw] = useState(window.innerWidth);
  const [vh, setVh] = useState(window.innerHeight);
  useEffect(() => {
    function update() { setVw(window.innerWidth); setVh(window.innerHeight); }
    window.addEventListener("resize", update);
    // iOS Safari viewport fix
    document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    window.addEventListener("resize", () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    });
    return () => window.removeEventListener("resize", update);
  }, []);
  const isTablet  = vw >= 600;
  const isDesktop = vw >= 1024;
  const maxW      = isDesktop ? 480 : isTablet ? 540 : "100%";
  return { vw, vh, isTablet, isDesktop, maxW };
}

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  en: {
    appTitle: "Sparybudget", appSubtitle: "Your trusted budget companion",
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
    changeEmail: "Change email address",
    newEmail: "New email address",
    emailChanged: "✓ Confirmation sent to new email",
    emailChangedInfo: "Check your new inbox and click the confirmation link.",
    applyIncomeToMonths: "Copy income to months",
    applyAllIncome: "Apply all sources to all months",
    applyAllIncomeDone: "✓ Applied to all months!",
    editIncomeForMonths: "Set amount for months",
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
    importBank: "Import bank statement",
    importTab: "Bank statement",
    importDrop: "Drop Swedbank CSV here or tap to browse",
    importSupported: "Supports Swedbank CSV export",
    importHowTo: "How to export from Swedbank",
    importHowToSteps: ["1. Log in to Swedbank app or web", "2. Go to your account → Transactions", "3. Click Export / Download", "4. Choose CSV format", "5. Upload the file here"],
    importParsing: "Reading your transactions…",
    importMatching: "AI is matching transactions to buckets…",
    importReview: "Review transactions",
    importApprove: "Add to budget",
    importSkip: "Skip",
    importApproveAll: "Approve all",
    importDone: "✓ Added to budget!",
    importCount: (n) => `${n} transactions found`,
    importUnmatched: "Unmatched — choose bucket",
    importNoBuckets: "No buckets yet — add buckets first",
    importAlreadyAdded: "Already added",
    importTotal: "Total spending",
    importMonth: "Month",
    importSelectBucket: "Choose bucket",
    importClose: "Close",
    importError: "Could not read file. Make sure it is a Swedbank CSV export.",
    importNone: "No transactions to import",
    importAdded: (n) => `✓ ${n} transactions added`,
    newYear: "New year",
    newYearTitle: (y) => `Set up ${y}`,
    newYearCopy: "Copy budget from previous year",
    newYearEmpty: "Start with empty budget",
    newYearAnalysis: "AI analysis of previous year",
    newYearAnalyzing: "Analysing your budget…",
    newYearSuggestion: "Suggested adjustment",
    newYearReason: "Reason",
    newYearOverBudget: "Over budget",
    newYearUnderBudget: "Under budget",
    newYearApply: "Create year",
    newYearSkip: "Skip adjustments",
    newYearBucketNew: "New budget",
    switchYear: "Year",
    consentTerms: "I have read and accept the",
    consentAnd: "and the",
    consentTermsLink: "Terms of Service",
    consentPrivacyLink: "Privacy Policy",
    consentAge: "I confirm that I am at least 16 years old",
    consentRequired: "You must accept the terms and confirm your age to create an account",
  },
  sv: {
    appTitle: "Sparybudget", appSubtitle: "Din trygga budgetkompis",
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
    changeEmail: "Ändra e-postadress",
    newEmail: "Ny e-postadress",
    emailChanged: "✓ Bekräftelse skickad till ny e-post",
    emailChangedInfo: "Kontrollera din nya inkorg och klicka på bekräftelselänken.",
    applyIncomeToMonths: "Kopiera inkomst till månader",
    applyAllIncome: "Använd alla inkomster för alla månader",
    applyAllIncomeDone: "✓ Kopierat till alla månader!",
    editIncomeForMonths: "Sätt belopp för månader",
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
    importBank: "Importera kontoutdrag",
    importTab: "Kontoutdrag",
    importDrop: "Släpp Swedbank CSV här eller tryck för att välja fil",
    importSupported: "Stödjer Swedbank CSV-export",
    importHowTo: "Hur exporterar jag från Swedbank?",
    importHowToSteps: ["1. Logga in på Swedbank app eller webb", "2. Gå till ditt konto → Transaktioner", "3. Klicka på Exportera / Ladda ner", "4. Välj CSV-format", "5. Ladda upp filen här"],
    importParsing: "Läser dina transaktioner…",
    importMatching: "AI matchar transaktioner mot hinkar…",
    importReview: "Granska transaktioner",
    importApprove: "Lägg till i budget",
    importSkip: "Hoppa över",
    importApproveAll: "Godkänn alla",
    importDone: "✓ Tillagda i budgeten!",
    importCount: (n) => `${n} transaktioner hittade`,
    importUnmatched: "Omatchad — välj hink",
    importNoBuckets: "Inga hinkar än — lägg till hinkar först",
    importAlreadyAdded: "Redan tillagd",
    importTotal: "Total utgift",
    importMonth: "Månad",
    importSelectBucket: "Välj hink",
    importClose: "Stäng",
    importError: "Kunde inte läsa filen. Kontrollera att det är en Swedbank CSV-export.",
    importNone: "Inga transaktioner att importera",
    importAdded: (n) => `✓ ${n} transaktioner tillagda`,
    newYear: "Nytt år",
    newYearTitle: (y) => `Sätt upp ${y}`,
    newYearCopy: "Kopiera budget från föregående år",
    newYearEmpty: "Börja med tom budget",
    newYearAnalysis: "AI-analys av föregående år",
    newYearAnalyzing: "Analyserar din budget…",
    newYearSuggestion: "Föreslagen justering",
    newYearReason: "Anledning",
    newYearOverBudget: "Överskred budget",
    newYearUnderBudget: "Under budget",
    newYearApply: "Skapa år",
    newYearSkip: "Hoppa över justeringar",
    newYearBucketNew: "Ny budget",
    switchYear: "År",
    consentTerms: "Jag har läst och godkänner",
    consentAnd: "och",
    consentTermsLink: "användarvillkoren",
    consentPrivacyLink: "integritetspolicyn",
    consentAge: "Jag bekräftar att jag är minst 16 år",
    consentRequired: "Du måste godkänna villkoren och bekräfta din ålder för att skapa konto",
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
const CURRENT_YEAR = new Date().getFullYear();

function emptyYear() {
  return Array.from({length:12}, () => ({ incomeSources:[], buckets:[] }));
}

function useSupabaseUserData(userId, isDemo) {
  // allYears: { [year: number]: monthData[] }
  const defaultAllYears = { [CURRENT_YEAR]: emptyYear() };
  const defaultGoals = [];
  const defaultCats  = [
    { id:"cat_1", name:"Boende" },
    { id:"cat_2", name:"Prenumerationer & Avtal" },
    { id:"cat_3", name:"Bil & Transport" },
  ];

  // Demo uses allYears format too
  const demoData = { [CURRENT_YEAR]: makeSampleData("sv") };

  const [allYears,   setAllYearsState]   = useState(isDemo ? demoData : defaultAllYears);
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

    const timeout = setTimeout(() => {
      if (!cancelled) { console.warn("Supabase load timeout"); setLoading(false); }
    }, 8000);

    (async () => {
      try {
        setLoading(true); setError(null);
        const { data, error: sbError } = await supabase
          .from("user_data")
          .select("year_data, goals, categories")
          .eq("user_id", userId)
          .maybeSingle();

        if (cancelled) return;
        if (sbError) { setError(sbError.message); }
        else if (data) {
          if (data.year_data) {
            // Migrate: old flat array → new multi-year object
            if (Array.isArray(data.year_data)) {
              setAllYearsState({ [CURRENT_YEAR]: data.year_data });
            } else {
              setAllYearsState(data.year_data);
            }
          }
          if (data.goals)       setGoalsState(data.goals);
          if (data.categories)  setCategoriesState(data.categories);
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; clearTimeout(timeout); };
  }, [userId, isDemo]);

  // Refs to avoid stale-closure bugs when multiple fields change in quick succession
  const allYearsRef   = useRef(allYears);
  const goalsRef       = useRef(goals);
  const categoriesRef  = useRef(categories);
  useEffect(() => { allYearsRef.current = allYears; }, [allYears]);
  useEffect(() => { goalsRef.current = goals; }, [goals]);
  useEffect(() => { categoriesRef.current = categories; }, [categories]);

  // Debounced save — always saves the LATEST value of all three fields via refs
  const save = useCallback(() => {
    if (isDemo || !userId) return;
    clearTimeout(saveTimer.current);
    setSaving(true);
    saveTimer.current = setTimeout(async () => {
      const { error: saveError } = await supabase.from("user_data").upsert({
        user_id:    userId,
        year_data:  allYearsRef.current,
        goals:      goalsRef.current,
        categories: categoriesRef.current,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      if (saveError) console.error("Save failed:", saveError);
      setSaving(false);
    }, 800);
  }, [userId, isDemo]);

  function setAllYears(fn) {
    setAllYearsState(prev => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      allYearsRef.current = next;
      save();
      return next;
    });
  }
  function setGoals(fn) {
    setGoalsState(prev => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      goalsRef.current = next;
      save();
      return next;
    });
  }
  function setCategories(fn) {
    setCategoriesState(prev => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      categoriesRef.current = next;
      save();
      return next;
    });
  }

  // Flush any pending save immediately if the user closes/reloads the tab
  useEffect(() => {
    function flushOnUnload() {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
        // Fire-and-forget synchronous-ish save attempt
        supabase.from("user_data").upsert({
          user_id:    userId,
          year_data:  allYearsRef.current,
          goals:      goalsRef.current,
          categories: categoriesRef.current,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });
      }
    }
    window.addEventListener("beforeunload", flushOnUnload);
    window.addEventListener("pagehide", flushOnUnload);
    return () => {
      window.removeEventListener("beforeunload", flushOnUnload);
      window.removeEventListener("pagehide", flushOnUnload);
    };
  }, [userId]);

  return { allYears, setAllYears, goals, setGoals, categories, setCategories, loading, saving, error };
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
function IncomeSourceRow({ source, currency, t, lang, flashing, onUpdate, onDelete, onApplyToAll, onCopyToMonths, onEditForMonths, theme }) {
  const [editing, setEditing]       = useState(false);
  const [val, setVal]               = useState(source.amount);
  const [expanded, setExpanded]     = useState(false);
  const [flash, setFlash]           = useState("");
  const [modal, setModal]           = useState(null);

  function commit() { onUpdate(val); setEditing(false); }

  function handleCopyAll() {
    onApplyToAll();
    setFlash("all");
    setTimeout(() => setFlash(""), 2200);
  }

  function handleCopy(months) {
    onCopyToMonths(months);
    setModal(null);
    setFlash("copy");
    setTimeout(() => setFlash(""), 2000);
  }

  function handleEditMonths(months, amount) {
    const v = parseFloat(amount);
    if (!isNaN(v) && v >= 0) onEditForMonths(months, v);
    setModal(null);
    setFlash("edit");
    setTimeout(() => setFlash(""), 2000);
  }

  return (
    <>
      <div style={{
        background:"rgba(255,255,255,0.07)", borderRadius:12, marginBottom:8, overflow:"hidden",
      }}>
        {/* Main row */}
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px" }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background: theme?.accent || "#C4A882", flexShrink:0 }} />

          {/* Name */}
          <div style={{ flex:1, fontSize:14, fontWeight:600, color:"#F5F0EA", minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            {source.name}
          </div>

          {/* Amount — tap to edit */}
          {editing ? (
            <input type="number" value={val} autoFocus
              onChange={e=>setVal(e.target.value)}
              onBlur={commit}
              onKeyDown={e=>e.key==="Enter"&&commit()}
              style={{ width:100, padding:"5px 8px", borderRadius:8, border:"1.5px solid #C4A882", background:"rgba(255,255,255,0.15)", color:"#F5F0EA", fontSize:14, fontWeight:700, textAlign:"right" }}
            />
          ) : (
            <button onClick={()=>{ setVal(source.amount); setEditing(true); }} style={{
              background:"none", border:"none", cursor:"pointer", color:"#F5F0EA", fontSize:14, fontWeight:700, padding:"4px 6px",
            }}>{fmt(source.amount, currency)}</button>
          )}

          {/* Expand toggle — tap to see month options */}
          <button onClick={()=>setExpanded(e=>!e)} style={{
            background:"rgba(255,255,255,0.1)", border:"none", borderRadius:8,
            padding:"6px 10px", cursor:"pointer", color:"#C4A882", fontSize:12, fontWeight:600,
          }}>{expanded ? "▲" : "▼"}</button>

          {/* Delete */}
          <button onClick={onDelete} style={{
            background:"none", border:"none", cursor:"pointer", color:"#9A7060", fontSize:15, padding:"2px 4px", flexShrink:0,
          }}>{t.deleteSource}</button>
        </div>

        {/* Expanded action buttons — same style as BucketCard */}
        {expanded && (
          <div style={{ padding:"0 12px 14px" }}>
            {/* Row 1: Save to all + Copy to months */}
            <div style={{ display:"flex", gap:8, marginBottom:8 }}>
              <button onClick={handleCopyAll} style={{
                flex:1, padding:"9px 10px", borderRadius:12,
                border:`1.5px solid ${theme?.inputBorder||"#7AAAD8"}`,
                background: flash==="all" ? (theme?.accentDeep||"#1A3A7A") : "rgba(255,255,255,0.08)",
                color: flash==="all" ? "#fff" : "#C4A882",
                cursor:"pointer", fontSize:11, fontWeight:700, transition:"all 0.35s",
              }}>
                {flash==="all" ? t.applySourceToAllDone : "📅 " + t.copyIncomeToAll}
              </button>
              <button onClick={()=>setModal("copy")} style={{
                flex:1, padding:"9px 10px", borderRadius:12,
                border:`1.5px solid ${theme?.inputBorder||"#7AAAD8"}`,
                background: flash==="copy" ? "#E0F4EA" : "rgba(255,255,255,0.08)",
                color: flash==="copy" ? "#1A6A3A" : "#C4A882",
                cursor:"pointer", fontSize:11, fontWeight:600, transition:"all 0.3s",
              }}>
                {flash==="copy" ? "✓ " + t.bucketCopied : "📋 " + t.applyIncomeToMonths}
              </button>
            </div>
            {/* Row 2: Edit amount for months */}
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={()=>setModal("edit")} style={{
                flex:1, padding:"9px 10px", borderRadius:12,
                border:`1.5px solid ${theme?.cardBorder||"#B8D0EC"}`,
                background: flash==="edit" ? "#E0F4EA" : "rgba(255,255,255,0.08)",
                color: flash==="edit" ? "#1A6A3A" : "#C4A882",
                cursor:"pointer", fontSize:11, fontWeight:600, transition:"all 0.3s",
              }}>
                {flash==="edit" ? "✓ Klart" : "💰 " + t.editIncomeForMonths}
              </button>
            </div>
          </div>
        )}
      </div>

      {modal === "copy" && (
        <MonthSelectorModal title={t.applyIncomeToMonths} t={t} theme={theme}
          onConfirm={handleCopy} onClose={()=>setModal(null)} />
      )}
      {modal === "edit" && (
        <MonthSelectorModal title={t.editIncomeForMonths} t={t} theme={theme}
          onConfirm={handleEditMonths} onClose={()=>setModal(null)}
          extraField={{ label: t.incomeSourceAmount, placeholder: fmt(source.amount, currency) }} />
      )}
    </>
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

// ─── Swedbank CSV Parser ──────────────────────────────────────────────────────
// Swedbank CSV format (semicolon-separated, Swedish headers):
// "Datum";"Referens";"Beskrivning";"Kategori";"Belopp";"Saldo"
// or newer format: Date;Transaction;Category;Amount;Balance
function parseSwedbank(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  const txns = [];

  // Find header row
  let headerIdx = -1;
  let sep = ";";
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const l = lines[i];
    if (l.includes("Datum") || l.includes("datum") || l.includes("Date") || l.includes("Bokföringsdag")) {
      headerIdx = i;
      sep = l.includes(";") ? ";" : ",";
      break;
    }
  }
  if (headerIdx === -1) throw new Error("header_not_found");

  const headers = lines[headerIdx].split(sep).map(h => h.replace(/"/g,"").trim().toLowerCase());

  // Find relevant columns
  const dateCol   = headers.findIndex(h => h.includes("datum") || h.includes("date") || h.includes("bokf"));
  const descCol   = headers.findIndex(h => h.includes("beskrivning") || h.includes("text") || h.includes("transaktion") || h.includes("description") || h.includes("referens"));
  const amountCol = headers.findIndex(h => h.includes("belopp") || h.includes("amount"));

  if (dateCol === -1 || amountCol === -1) throw new Error("columns_not_found");

  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = line.split(sep).map(c => c.replace(/"/g,"").trim());
    if (cols.length < Math.max(dateCol, amountCol) + 1) continue;

    const rawAmount = cols[amountCol].replace(/\s/g,"").replace(",",".").replace("−","-");
    const amount = parseFloat(rawAmount);
    if (isNaN(amount) || amount >= 0) continue; // Only expenses (negative amounts)

    const dateStr = cols[dateCol];
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) continue;

    const desc = descCol !== -1 ? cols[descCol] : cols[1] || "";

    txns.push({
      id: `${dateStr}-${desc}-${amount}`,
      date: dateStr,
      month: date.getMonth(),
      year: date.getFullYear(),
      description: desc,
      amount: Math.abs(amount),
      bucketId: null,
      status: "pending", // pending | approved | skipped
    });
  }
  return txns;
}

// ─── AI Bucket Matcher ────────────────────────────────────────────────────────
async function matchTransactionsToBuckets(transactions, buckets, lang) {
  if (!buckets.length || !transactions.length) return transactions;

  const bucketList = buckets.map(b => `- "${b.name}" (id: ${b.id})`).join("\n");
  const txList = transactions.slice(0, 50).map((t,i) =>
    `${i}: ${t.description} | ${t.amount} SEK | ${t.date}`
  ).join("\n");

  const prompt = lang === "sv"
    ? `Du är ett budgetassistentsystem. Matcha varje transaktion nedan mot den mest lämpliga budgethinken.

Tillgängliga hinkar:
${bucketList}

Transaktioner (index: beskrivning | belopp | datum):
${txList}

Svara ENDAST med ett JSON-objekt där nyckeln är transaktionsindex (som sträng) och värdet är hinkens id. Om ingen hink passar, använd null.
Exempel: {"0": "hink-id-123", "1": null, "2": "hink-id-456"}`
    : `You are a budget assistant. Match each transaction to the most appropriate budget bucket.

Available buckets:
${bucketList}

Transactions (index: description | amount | date):
${txList}

Respond ONLY with a JSON object where the key is the transaction index (as string) and the value is the bucket id. If no bucket fits, use null.
Example: {"0": "bucket-id-123", "1": null, "2": "bucket-id-456"}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await res.json();
    const text = data.content?.[0]?.text || "{}";
    const clean = text.replace(/```json|```/g,"").trim();
    const matches = JSON.parse(clean);
    return transactions.map((t, i) => ({
      ...t,
      bucketId: matches[String(i)] || null,
    }));
  } catch (e) {
    console.error("AI matching failed:", e);
    return transactions; // Return unmatched if AI fails
  }
}

// ─── Import Tab ───────────────────────────────────────────────────────────────
function ImportTab({ lang, currency, theme, yearData, setYearData, categories, allYears, setAllYears, selectedYear }) {
  const t = T[lang];
  const currentYear = selectedYear || CURRENT_YEAR;
  const [step, setStep]               = useState("upload");
  const [transactions, setTxns]       = useState([]);
  const [error, setError]             = useState("");
  const [showHowTo, setShowHowTo]     = useState(false);
  const [doneCount, setDoneCount]     = useState(0);
  const fileRef = useRef(null);

  // Collect all buckets across all months for matching
  const allBuckets = [];
  const seen = new Set();
  yearData.forEach(m => m.buckets.forEach(b => {
    if (!seen.has(b.name)) { seen.add(b.name); allBuckets.push(b); }
  }));

  async function handleFile(file) {
    if (!file) return;
    setError("");
    setStep("parsing");
    try {
      const text = await file.text();
      const txns = parseSwedbank(text);
      if (!txns.length) { setError(t.importNone); setStep("upload"); return; }
      setStep("matching");
      const matched = await matchTransactionsToBuckets(txns, allBuckets, lang);
      setTxns(matched);
      setStep("review");
    } catch (e) {
      console.error(e);
      setError(t.importError);
      setStep("upload");
    }
  }

  function updateTxn(id, changes) {
    setTxns(prev => prev.map(t => t.id === id ? { ...t, ...changes } : t));
  }

  function approveAll() {
    setTxns(prev => prev.map(t => t.status === "pending" ? { ...t, status: "approved" } : t));
  }

  function commitApproved() {
    const approved = transactions.filter(t => t.status === "approved" && t.bucketId);
    if (!approved.length) { setStep("done"); setDoneCount(0); return; }

    const currentYear = new Date().getFullYear();

    setYearData(prev => {
      // yearData is indexed as flat 12-month array for current year.
      // For multi-year support we extend to a map: { [YYYY-MM]: monthData }
      // But to keep backward compatibility we keep the array for current year
      // and store extra years in yearDataByYear (handled separately below).
      const next = prev.map((m, mi) => {
        // Only match transactions that belong to current year AND this month index
        const monthTxns = approved.filter(t =>
          t.month === mi && t.year === currentYear
        );
        if (!monthTxns.length) return m;
        return {
          ...m,
          buckets: m.buckets.map(b => {
            const spent = monthTxns
              .filter(t => t.bucketId === b.id)
              .reduce((s, t) => s + t.amount, 0);
            return spent > 0 ? { ...b, spent: b.spent + spent } : b;
          })
        };
      });
      return next;
    });

    // Handle transactions from OTHER years
    const otherYearTxns = approved.filter(t => t.year !== currentYear);
    if (otherYearTxns.length > 0 && setAllYears) {
      setAllYears(prev => {
        const next = { ...prev };
        otherYearTxns.forEach(txn => {
          if (!next[txn.year]) next[txn.year] = emptyYear();
          next[txn.year] = next[txn.year].map((m, mi) => {
            if (mi !== txn.month) return m;
            return {
              ...m,
              buckets: m.buckets.map(b => {
                if (b.id !== txn.bucketId) return b;
                return { ...b, spent: (b.spent||0) + txn.amount };
              })
            };
          });
        });
        return next;
      });
    }

    setDoneCount(approved.length);
    setStep("done");
  }

  function reset() {
    setStep("upload"); setTxns([]); setError(""); setDoneCount(0);
  }

  // Group transactions by year+month for display
  const byMonth = {};
  transactions.forEach(t => {
    const key = `${t.year}-${String(t.month).padStart(2,"0")}`;
    if (!byMonth[key]) byMonth[key] = [];
    byMonth[key].push(t);
  });

  const totalAmount = transactions.filter(t=>t.status!=="skipped").reduce((s,t)=>s+t.amount,0);
  const pendingCount = transactions.filter(t=>t.status==="pending").length;
  const approvedCount = transactions.filter(t=>t.status==="approved").length;

  // Detect transactions from years other than current
  const otherYears = [...new Set(
    transactions
      .filter(t => t.year !== currentYear)
      .map(t => t.year)
  )].sort();

  return (
    <div>
      {/* Page heading */}
      {step === "upload" && (
        <div style={{ marginBottom:16 }}>
          <div style={{ fontWeight:800, fontSize:19, color:theme.accentDeep, marginBottom:4 }}>
            📄 {t.importBank}
          </div>
          <div style={{ fontSize:13, color:theme.accentMuted, lineHeight:1.5 }}>
            {lang==="sv"
              ? "Ladda upp ett kontoutdrag så matchar vi automatiskt dina utgifter mot rätt hink."
              : "Upload a bank statement and we'll automatically match your expenses to the right bucket."}
          </div>
        </div>
      )}

      {/* Upload step */}
      {(step === "upload") && (
        <>
          {/* How-to accordion */}
          <div style={{ background:theme.card, border:`1px solid ${theme.cardBorder}`, borderRadius:16, marginBottom:14, overflow:"hidden" }}>
            <button onClick={()=>setShowHowTo(s=>!s)} style={{
              width:"100%", padding:"14px 16px", background:"none", border:"none", cursor:"pointer",
              display:"flex", justifyContent:"space-between", alignItems:"center",
            }}>
              <span style={{ fontWeight:700, fontSize:14, color:theme.accentDeep }}>📋 {t.importHowTo}</span>
              <span style={{ color:theme.accentMuted, fontSize:14 }}>{showHowTo?"▲":"▼"}</span>
            </button>
            {showHowTo && (
              <div style={{ padding:"0 16px 14px" }}>
                {t.importHowToSteps.map((s,i) => (
                  <div key={i} style={{ fontSize:13, color:theme.accentMuted, padding:"4px 0", lineHeight:1.5 }}>{s}</div>
                ))}
              </div>
            )}
          </div>

          {/* Drop zone */}
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
            style={{
              border:`2px dashed ${theme.inputBorder}`, borderRadius:20,
              padding:"48px 24px", textAlign:"center", cursor:"pointer",
              background:`${theme.accent}08`, transition:"background 0.2s",
            }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🏦</div>
            <div style={{ fontWeight:700, fontSize:15, color:theme.accentDeep, marginBottom:6 }}>
              {t.importDrop}
            </div>
            <div style={{ fontSize:12, color:theme.accentMuted }}>{t.importSupported}</div>
            <input ref={fileRef} type="file" accept=".csv,.txt" style={{ display:"none" }}
              onChange={e => handleFile(e.target.files[0])} />
          </div>

          {error && (
            <div style={{ marginTop:12, padding:"12px 16px", background:"#FFE8E8", borderRadius:12, border:"1px solid #F0A0A0", fontSize:13, color:"#C03030" }}>
              ⚠️ {error}
            </div>
          )}

          {allBuckets.length === 0 && (
            <div style={{ marginTop:12, padding:"12px 16px", background:`${theme.accent}12`, borderRadius:12, border:`1px solid ${theme.cardBorder}`, fontSize:13, color:theme.accentMuted }}>
              💡 {t.importNoBuckets}
            </div>
          )}
        </>
      )}

      {/* Loading steps */}
      {(step === "parsing" || step === "matching") && (
        <div style={{ textAlign:"center", padding:"60px 20px" }}>
          <div style={{ fontSize:40, marginBottom:16 }}>
            {step === "parsing" ? "📄" : "🤖"}
          </div>
          <div style={{ fontWeight:700, fontSize:16, color:theme.accentDeep, marginBottom:8 }}>
            {step === "parsing" ? t.importParsing : t.importMatching}
          </div>
          <div style={{
            width:40, height:4, background:theme.accent, borderRadius:2,
            margin:"16px auto 0", animation:"pulse 1s infinite",
          }}/>
          <style>{`@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
        </div>
      )}

      {/* Review step */}
      {step === "review" && (
        <>
          {/* Summary bar */}
          <div style={{
            background:theme.header, borderRadius:16, padding:"14px 16px", marginBottom:14,
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: otherYears.length ? 10 : 0 }}>
              <div>
                <div style={{ fontSize:11, color:theme.accentMuted, letterSpacing:1 }}>{t.importReview.toUpperCase()}</div>
                <div style={{ fontSize:13, color:"#fff", marginTop:2 }}>
                  {t.importCount(transactions.length)} · {approvedCount} {lang==="sv"?"godkända":"approved"}
                </div>
              </div>
              <div style={{ fontWeight:800, fontSize:18, color:"#fff" }}>{fmt(totalAmount, currency)}</div>
            </div>

            {/* Multi-year warning */}
            {otherYears.length > 0 && (
              <div style={{ background:"rgba(255,200,100,0.15)", borderRadius:10, padding:"8px 12px", border:"1px solid rgba(255,200,100,0.3)" }}>
                <div style={{ fontSize:11, color:"#FFD080", fontWeight:600 }}>
                  ⚠️ {lang==="sv"
                    ? `Filen innehåller transaktioner från ${otherYears.join(", ")}. Dessa sparas separat och visas inte i årets budget.`
                    : `File contains transactions from ${otherYears.join(", ")}. These are saved separately and won't affect the current year's budget.`}
                </div>
              </div>
            )}
          </div>

          {/* Approve all + Confirm buttons */}
          <div style={{ display:"flex", gap:8, marginBottom:14 }}>
            <button onClick={approveAll} style={{
              flex:1, padding:"11px", borderRadius:14,
              border:`1.5px solid ${theme.inputBorder}`, background:theme.pill,
              color:theme.pillText, cursor:"pointer", fontWeight:700, fontSize:13,
            }}>✓ {t.importApproveAll}</button>
            <button onClick={commitApproved} disabled={approvedCount === 0} style={{
              flex:1, padding:"11px", borderRadius:14,
              background: approvedCount > 0 ? `linear-gradient(135deg,${theme.accent},${theme.accentDeep})` : theme.cardBorder,
              color:"#fff", border:"none", cursor: approvedCount > 0 ? "pointer" : "default",
              fontWeight:700, fontSize:13,
            }}>💾 {t.importApprove} ({approvedCount})</button>
          </div>

          {/* Transaction groups by year+month */}
          {Object.entries(byMonth).sort(([a],[b])=>a.localeCompare(b)).map(([key, txns]) => {
            const [year, monthStr] = key.split("-");
            const month = parseInt(monthStr);
            const isOtherYear = parseInt(year) !== currentYear;
            const monthName = `${t.fullMonths[month]} ${year}`;
            return (
              <div key={key} style={{ marginBottom:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:theme.accentMuted, letterSpacing:1 }}>
                    {monthName.toUpperCase()}
                  </div>
                  {isOtherYear && (
                    <span style={{ fontSize:10, padding:"2px 8px", borderRadius:10, background:"#FFF0C0", color:"#806000", fontWeight:600, border:"1px solid #F0D060" }}>
                      {lang==="sv"?"Annat år":"Other year"}
                    </span>
                  )}
                </div>
                {txns.map(txn => {
                  const bucket = allBuckets.find(b => b.id === txn.bucketId);
                  return (
                    <div key={txn.id} style={{
                      background: txn.status === "approved" ? `${theme.accent}10`
                                : txn.status === "skipped"  ? "rgba(0,0,0,0.04)"
                                : theme.card,
                      border:`1px solid ${txn.status==="approved" ? theme.accent+"40" : theme.cardBorder}`,
                      borderRadius:14, padding:"12px 14px", marginBottom:8,
                      opacity: txn.status === "skipped" ? 0.5 : 1,
                    }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                        <div style={{ flex:1, minWidth:0, marginRight:8 }}>
                          <div style={{ fontWeight:600, fontSize:13, color:theme.accentDeep, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                            {txn.description}
                          </div>
                          <div style={{ fontSize:11, color:theme.accentMuted, marginTop:2 }}>{txn.date}</div>
                        </div>
                        <div style={{ fontWeight:700, fontSize:14, color:theme.accentDeep, flexShrink:0 }}>
                          {fmt(txn.amount, currency)}
                        </div>
                      </div>

                      {/* Bucket selector */}
                      <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                        <select
                          value={txn.bucketId || ""}
                          onChange={e => updateTxn(txn.id, { bucketId: e.target.value || null })}
                          style={{
                            flex:1, padding:"7px 10px", borderRadius:10,
                            border:`1.5px solid ${txn.bucketId ? theme.accent : theme.cardBorder}`,
                            background:"white", fontSize:12, color:theme.accentDeep,
                          }}>
                          <option value="">{t.importSelectBucket}</option>
                          {allBuckets.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                          ))}
                        </select>

                        {txn.status === "skipped" ? (
                          <button onClick={() => updateTxn(txn.id, { status:"pending" })} style={{
                            padding:"7px 10px", borderRadius:10, border:`1px solid ${theme.cardBorder}`,
                            background:theme.pill, color:theme.pillText, cursor:"pointer", fontSize:11, fontWeight:600,
                          }}>↩</button>
                        ) : txn.status === "approved" ? (
                          <button onClick={() => updateTxn(txn.id, { status:"pending" })} style={{
                            padding:"7px 10px", borderRadius:10, background:`${theme.accent}20`,
                            border:`1px solid ${theme.accent}`, color:theme.accentDeep, cursor:"pointer", fontSize:11, fontWeight:700,
                          }}>✓</button>
                        ) : (
                          <>
                            <button onClick={() => { if(txn.bucketId) updateTxn(txn.id, { status:"approved" }); }} style={{
                              padding:"7px 12px", borderRadius:10,
                              background: txn.bucketId ? `linear-gradient(135deg,${theme.accent},${theme.accentDeep})` : theme.cardBorder,
                              color:"#fff", border:"none", cursor: txn.bucketId?"pointer":"default", fontSize:11, fontWeight:700,
                            }}>{t.importApprove}</button>
                            <button onClick={() => updateTxn(txn.id, { status:"skipped" })} style={{
                              padding:"7px 10px", borderRadius:10, border:`1px solid ${theme.cardBorder}`,
                              background:"transparent", color:theme.accentMuted, cursor:"pointer", fontSize:11,
                            }}>{t.importSkip}</button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          <button onClick={reset} style={{
            width:"100%", padding:13, borderRadius:16, border:`1.5px solid ${theme.cardBorder}`,
            background:"transparent", color:theme.accentMuted, cursor:"pointer", fontSize:14, marginTop:4,
          }}>{t.importClose}</button>
        </>
      )}

      {/* Done step */}
      {step === "done" && (
        <div style={{ textAlign:"center", padding:"60px 20px" }}>
          <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
          <div style={{ fontWeight:800, fontSize:22, color:theme.accentDeep, marginBottom:8 }}>
            {t.importAdded(doneCount)}
          </div>
          <div style={{ fontSize:13, color:theme.accentMuted, marginBottom:28 }}>
            {lang==="sv" ? "Utgifterna har lagts till i rätt månader och hinkar." : "Expenses have been added to the correct months and buckets."}
          </div>
          <button onClick={reset} style={{
            padding:"13px 32px", borderRadius:16,
            background:`linear-gradient(135deg,${theme.accent},${theme.accentDeep})`,
            color:"#fff", border:"none", cursor:"pointer", fontWeight:700, fontSize:15,
            boxShadow:`0 4px 16px ${theme.accent}44`,
          }}>{lang==="sv" ? "Importera fler" : "Import more"}</button>
        </div>
      )}
    </div>
  );
}

// ─── New Year Wizard ──────────────────────────────────────────────────────────
function NewYearWizard({ newYear, prevYear, prevYearData, lang, currency, theme, onClose, onCreate }) {
  const t = T[lang];
  const [step, setStep]           = useState("choose"); // choose | analyzing | review | done
  const [mode, setMode]           = useState(null);     // "copy" | "empty"
  const [suggestions, setSuggestions] = useState([]);
  const [bucketBudgets, setBucketBudgets] = useState({});

  // Collect all unique buckets from prev year with avg budget and total spent
  const prevBuckets = (() => {
    const map = {};
    prevYearData.forEach(m => {
      m.buckets.forEach(b => {
        if (!map[b.name]) map[b.name] = { ...b, totalSpent:0, months:0, avgBudget:0 };
        map[b.name].totalSpent += b.spent;
        map[b.name].months += b.budget > 0 ? 1 : 0;
        map[b.name].avgBudget = b.budget; // use last seen budget
      });
    });
    return Object.values(map);
  })();

  async function analyzeWithAI() {
    setStep("analyzing");
    const bucketSummary = prevBuckets.map(b => {
      const monthsOver = prevYearData.filter(m => {
        const mb = m.buckets.find(x => x.name === b.name);
        return mb && mb.spent > mb.budget;
      }).length;
      const totalBudget = prevYearData.reduce((s,m) => {
        const mb = m.buckets.find(x => x.name === b.name);
        return s + (mb?.budget || 0);
      }, 0);
      return `${b.name}: budget ${fmt(b.avgBudget, currency)}/mån, spenderat ${fmt(b.totalSpent/12, currency)}/mån i snitt, överskred ${monthsOver}/12 månader`;
    }).join("\n");

    const prompt = lang === "sv"
      ? `Du är en budgetrådgivare. Analysera följande budgetdata från ${prevYear} och föreslå justeringar för ${newYear}.
För varje hink som behöver justeras, ge ett konkret nytt månadsbudgetbelopp och en kort motivering (max 10 ord).
Svara ENDAST med JSON-array: [{"name":"Hinknamn","newBudget":5500,"reason":"Överskred 8 av 12 månader"}]
Föreslå bara justeringar för hinkar som verkligen behöver det.

Budgetdata ${prevYear}:
${bucketSummary}`
      : `You are a budget advisor. Analyse the following budget data from ${prevYear} and suggest adjustments for ${newYear}.
For each bucket that needs adjustment, give a concrete new monthly budget amount and a short reason (max 10 words).
Reply ONLY with JSON array: [{"name":"BucketName","newBudget":5500,"reason":"Exceeded 8 of 12 months"}]
Only suggest adjustments for buckets that genuinely need it.

Budget data ${prevYear}:
${bucketSummary}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-6", max_tokens:1000,
          messages:[{role:"user", content:prompt}]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "[]";
      const clean = text.replace(/```json|```/g,"").trim();
      const sugg = JSON.parse(clean);
      setSuggestions(sugg);
      // Init budgets: suggested or copy from prev
      const init = {};
      prevBuckets.forEach(b => {
        const s = sugg.find(x => x.name === b.name);
        init[b.name] = s ? s.newBudget : b.avgBudget;
      });
      setBucketBudgets(init);
    } catch(e) {
      // Fallback: just copy budgets
      const init = {};
      prevBuckets.forEach(b => { init[b.name] = b.avgBudget; });
      setBucketBudgets(init);
      setSuggestions([]);
    }
    setStep("review");
  }

  function handleChoose(choice) {
    setMode(choice);
    if (choice === "empty") {
      onCreate(emptyYear());
      onClose();
    } else {
      analyzeWithAI();
    }
  }

  function handleCreate() {
    // Build new year: copy structure from prev, apply new budgets, reset spent
    const newYearData = prevYearData.map(m => ({
      ...m,
      incomeSources: m.incomeSources.map(s => ({...s})), // keep income sources
      buckets: m.buckets.map(b => ({
        ...b,
        budget: bucketBudgets[b.name] ?? b.budget,
        spent: 0, // reset spending
      }))
    }));
    onCreate(newYearData);
    onClose();
  }

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.65)", zIndex:400, display:"flex", alignItems:"flex-end", justifyContent:"center" }}
      onClick={onClose}>
      <div style={{
        background:theme.card, borderRadius:"28px 28px 0 0",
        padding:"20px 20px 40px", width:"100%", maxWidth:540,
        maxHeight:"90vh", overflowY:"auto",
      }} onClick={e=>e.stopPropagation()}>

        {/* Handle */}
        <div style={{ width:40, height:4, background:theme.cardBorder, borderRadius:2, margin:"0 auto 20px" }}/>

        {/* Choose step */}
        {step === "choose" && (
          <>
            <div style={{ fontWeight:800, fontSize:22, color:theme.accentDeep, marginBottom:6 }}>
              🗓️ {t.newYearTitle(newYear)}
            </div>
            <div style={{ fontSize:13, color:theme.accentMuted, marginBottom:24, lineHeight:1.6 }}>
              {lang==="sv"
                ? `Vill du kopiera budgeten från ${prevYear} till ${newYear}? AI analyserar var du överskred budget och föreslår justeringar.`
                : `Copy your ${prevYear} budget to ${newYear}? AI will analyse where you overspent and suggest adjustments.`}
            </div>
            <button onClick={() => handleChoose("copy")} style={{
              width:"100%", padding:"16px", borderRadius:16, marginBottom:10,
              background:`linear-gradient(135deg,${theme.accent},${theme.accentDeep})`,
              color:"#fff", border:"none", cursor:"pointer", fontWeight:700, fontSize:15,
              boxShadow:`0 4px 16px ${theme.accent}44`,
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
              🤖 {t.newYearCopy}
            </button>
            <button onClick={() => handleChoose("empty")} style={{
              width:"100%", padding:"14px", borderRadius:16,
              background:"transparent", border:`1.5px solid ${theme.cardBorder}`,
              color:theme.accentMuted, cursor:"pointer", fontWeight:600, fontSize:14,
            }}>{t.newYearEmpty}</button>
          </>
        )}

        {/* Analyzing step */}
        {step === "analyzing" && (
          <div style={{ textAlign:"center", padding:"40px 20px" }}>
            <div style={{ fontSize:40, marginBottom:16 }}>🤖</div>
            <div style={{ fontWeight:700, fontSize:16, color:theme.accentDeep, marginBottom:8 }}>{t.newYearAnalyzing}</div>
            <div style={{ fontSize:13, color:theme.accentMuted }}>
              {lang==="sv" ? `Jämför ${prevYear} budget mot faktiska utgifter…` : `Comparing ${prevYear} budget against actual spending…`}
            </div>
            <div style={{ width:40, height:4, background:theme.accent, borderRadius:2, margin:"20px auto 0", animation:"pulse 1s infinite" }}/>
            <style>{`@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
          </div>
        )}

        {/* Review step */}
        {step === "review" && (
          <>
            <div style={{ fontWeight:800, fontSize:20, color:theme.accentDeep, marginBottom:4 }}>
              {t.newYearAnalysis}
            </div>
            <div style={{ fontSize:12, color:theme.accentMuted, marginBottom:18 }}>
              {lang==="sv"
                ? `Justerade belopp för ${newYear}. Tryck på ett belopp för att ändra det.`
                : `Adjusted amounts for ${newYear}. Tap an amount to edit it.`}
            </div>

            {prevBuckets.map(b => {
              const sugg = suggestions.find(s => s.name === b.name);
              const changed = sugg && sugg.newBudget !== b.avgBudget;
              const avgSpent = b.totalSpent / 12;
              const overBudget = avgSpent > b.avgBudget;

              return (
                <div key={b.name} style={{
                  background: changed ? `${theme.accent}10` : theme.pill,
                  borderRadius:14, padding:"12px 14px", marginBottom:10,
                  border: `1px solid ${changed ? theme.accent+"40" : theme.cardBorder}`,
                }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:changed?6:0 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:theme.accentDeep }}>{b.name}</div>
                      <div style={{ fontSize:11, color:theme.accentMuted, marginTop:2 }}>
                        {lang==="sv"?"Föregående år:":"Previous:"} {fmt(b.avgBudget, currency)}/mån
                        {" · "}
                        <span style={{ color: overBudget ? "#C04040" : "#2A7A2A" }}>
                          {lang==="sv"?"Snitt spenderat:":"Avg spent:"} {fmt(avgSpent, currency)}
                        </span>
                      </div>
                    </div>
                    <BudgetInput
                      value={bucketBudgets[b.name] ?? b.avgBudget}
                      onChange={v => setBucketBudgets(prev => ({...prev, [b.name]: v}))}
                      currency={currency}
                      theme={theme}
                      changed={changed}
                    />
                  </div>
                  {changed && sugg && (
                    <div style={{ fontSize:11, color:theme.accent, fontWeight:600 }}>
                      💡 {sugg.reason}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ display:"flex", gap:8, marginTop:16 }}>
              <button onClick={handleCreate} style={{
                flex:1, padding:14, borderRadius:16,
                background:`linear-gradient(135deg,${theme.accent},${theme.accentDeep})`,
                color:"#fff", border:"none", cursor:"pointer", fontWeight:700, fontSize:15,
                boxShadow:`0 4px 16px ${theme.accent}44`,
              }}>{t.newYearApply}</button>
              <button onClick={onClose} style={{
                padding:"14px 18px", borderRadius:16, background:theme.pill,
                color:theme.pillText, border:"none", cursor:"pointer", fontSize:14,
              }}>{t.cancel}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Inline editable budget input for wizard
function BudgetInput({ value, onChange, currency, theme, changed }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  useEffect(() => { setVal(value); }, [value]);
  function commit() { const v = parseFloat(val); if (!isNaN(v) && v >= 0) onChange(v); setEditing(false); }
  return editing ? (
    <input type="number" value={val} autoFocus
      onChange={e=>setVal(e.target.value)}
      onBlur={commit}
      onKeyDown={e=>e.key==="Enter"&&commit()}
      style={{ width:100, padding:"5px 8px", borderRadius:8, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, fontWeight:700, textAlign:"right", color:theme.accentDeep }}
    />
  ) : (
    <button onClick={()=>setEditing(true)} style={{
      background: changed ? `${theme.accent}20` : "transparent",
      border: changed ? `1px solid ${theme.accent}` : "none",
      borderRadius:8, padding:"4px 8px", cursor:"pointer",
      fontWeight:700, fontSize:14, color: changed ? theme.accentDeep : theme.accentMuted,
    }}>{fmt(value, currency)}</button>
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
  const [newPw, setNewPw]           = useState("");
  const [confirmPw, setConfirmPw]   = useState("");
  const [pwMsg, setPwMsg]           = useState("");
  const [newEmail, setNewEmail]     = useState("");
  const [emailMsg, setEmailMsg]     = useState("");
  const [deleteInput, setDeleteInput] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading]       = useState(false);

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

  async function changeEmail() {
    if (!newEmail || !newEmail.includes("@")) {
      setEmailMsg(lang==="sv"?"Ange en giltig e-postadress":"Enter a valid email");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser(
      { email: newEmail },
      { emailRedirectTo: window.location.origin }
    );
    setLoading(false);
    if (error) { setEmailMsg(error.message); return; }
    setEmailMsg(t.emailChanged);
    setNewEmail("");
    setTimeout(() => setEmailMsg(""), 5000);
  }

  async function deleteAccount() {
    const confirmWord = lang === "sv" ? "RADERA" : "DELETE";
    if (deleteInput !== confirmWord) return;
    setLoading(true);
    await supabase.from("user_data").delete().eq("user_id", user.id);
    await supabase.rpc("delete_user");
    setLoading(false);
    onLogout();
  }

  const cardStyle = { background:theme.pill, borderRadius:16, padding:16, marginBottom:14 };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:300, display:"flex", alignItems:"flex-end", justifyContent:"center" }}
      onClick={onClose}>
      <div style={{
        background:theme.card, borderRadius:"24px 24px 0 0", padding:"20px 20px 40px",
        width:"100%", maxWidth:540, maxHeight:"90vh", overflowY:"auto",
      }} onClick={e=>e.stopPropagation()}>

        {/* Handle bar */}
        <div style={{ width:40, height:4, background:theme.cardBorder, borderRadius:2, margin:"0 auto 16px" }} />

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div>
            <div style={{ fontWeight:800, fontSize:20, color:theme.accentDeep }}>👤 {t.myAccount}</div>
            <div style={{ fontSize:12, color:theme.accentMuted, marginTop:2 }}>{user.name}</div>
          </div>
          <button onClick={onClose} style={{ background:theme.pill, border:"none", borderRadius:12, padding:"8px 14px", cursor:"pointer", color:theme.pillText, fontWeight:600 }}>{t.close}</button>
        </div>

        {/* Current email */}
        <div style={{ background:theme.pill, borderRadius:14, padding:"12px 16px", marginBottom:14 }}>
          <div style={{ fontSize:10, color:theme.accentMuted, letterSpacing:0.8, marginBottom:4 }}>{t.accountEmail.toUpperCase()}</div>
          <div style={{ fontSize:14, fontWeight:600, color:theme.accentDeep }}>{user.email || "—"}</div>
        </div>

        {/* Change email */}
        <div style={cardStyle}>
          <div style={{ fontWeight:700, fontSize:14, color:theme.accentDeep, marginBottom:10 }}>✉️ {t.changeEmail}</div>
          <input type="email" value={newEmail} onChange={e=>{setNewEmail(e.target.value);setEmailMsg("");}}
            placeholder={t.newEmail}
            onKeyDown={e=>e.key==="Enter"&&changeEmail()}
            style={{ width:"100%", padding:"10px 14px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep, marginBottom:8 }}
          />
          {emailMsg && (
            <div style={{ fontSize:12, color:emailMsg.includes("✓")?"#2A6A2A":"#C03030", marginBottom:8, fontWeight:600, lineHeight:1.4 }}>
              {emailMsg}
              {emailMsg.includes("✓") && <div style={{ fontSize:11, fontWeight:400, marginTop:4, color:"#4A8A4A" }}>{t.emailChangedInfo}</div>}
            </div>
          )}
          <button onClick={changeEmail} disabled={loading || !newEmail} style={{
            width:"100%", padding:"11px", borderRadius:12,
            background: (!newEmail||loading) ? theme.cardBorder : `linear-gradient(135deg,${theme.accent},${theme.accentDeep})`,
            color:"#fff", border:"none", cursor:(!newEmail||loading)?"default":"pointer", fontWeight:700, fontSize:14,
          }}>{loading ? "…" : t.changeEmail}</button>
        </div>

        {/* Change password */}
        <div style={cardStyle}>
          <div style={{ fontWeight:700, fontSize:14, color:theme.accentDeep, marginBottom:10 }}>🔑 {t.changePassword}</div>
          <input type="password" value={newPw} onChange={e=>setNewPw(e.target.value)}
            placeholder={t.newPassword}
            style={{ width:"100%", padding:"10px 14px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep, marginBottom:8 }}
          />
          <input type="password" value={confirmPw} onChange={e=>setConfirmPw(e.target.value)}
            placeholder={t.confirmPassword}
            onKeyDown={e=>e.key==="Enter"&&changePassword()}
            style={{ width:"100%", padding:"10px 14px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep, marginBottom:8 }}
          />
          {pwMsg && <div style={{ fontSize:12, color:pwMsg.includes("✓")?"#2A6A2A":"#C03030", marginBottom:8, fontWeight:600 }}>{pwMsg}</div>}
          <button onClick={changePassword} disabled={loading||!newPw} style={{
            width:"100%", padding:"11px", borderRadius:12,
            background:(!newPw||loading)?theme.cardBorder:`linear-gradient(135deg,${theme.accent},${theme.accentDeep})`,
            color:"#fff", border:"none", cursor:(!newPw||loading)?"default":"pointer", fontWeight:700, fontSize:14,
          }}>{loading?"…":t.changePassword}</button>
        </div>

        {/* GDPR note */}
        <div style={{ background:`${theme.accent}10`, borderRadius:14, padding:"12px 16px", marginBottom:14, border:`1px solid ${theme.cardBorder}` }}>
          <div style={{ fontSize:11, color:theme.accentMuted, lineHeight:1.7 }}>🇪🇺 {t.gdprNote}</div>
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
                  disabled={deleteInput!==(lang==="sv"?"RADERA":"DELETE")||loading}
                  style={{
                    flex:1, padding:"11px", borderRadius:12,
                    background:deleteInput===(lang==="sv"?"RADERA":"DELETE")?"#C03030":"#E0C0C0",
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
  const { maxW } = useViewport();
  const [lang, setLang] = useLS("sparybudget_ui_lang", "sv");
  const t = T[lang];
  const theme = THEMES[0];

  const [mode, setMode]         = useState("login"); // "login" | "signup" | "reset"
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentAge, setConsentAge]     = useState(false);
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
    if (!consentTerms || !consentAge) { setError(t.consentRequired); return; }
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
          <div style={{ fontWeight:800, fontSize:36, color:"#fff", letterSpacing:"-1px" }}>{t.appTitle}</div>
          <div style={{ fontSize:14, color:theme.accentMuted, marginTop:4 }}>{t.appSubtitle}</div>
          <button onClick={()=>setLang(l=>l==="en"?"sv":"en")} style={{
            marginTop:16, padding:"6px 16px", borderRadius:20,
            border:`1.5px solid ${theme.accentMuted}`, background:"transparent",
            color:theme.accentText, cursor:"pointer", fontSize:12, fontWeight:600,
          }}>{t.switchLang}</button>
        </div>

        <div style={{ padding:"28px 20px", flex:1, maxWidth: maxW === "100%" ? 480 : maxW, width:"100%", margin:"0 auto" }}>

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

            {/* Consent checkboxes — signup only */}
            {mode==="signup" && (
              <div style={{ marginBottom:14 }}>
                {/* Terms + Privacy */}
                <label style={{ display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer", marginBottom:10, padding:"10px 12px", borderRadius:12, background: consentTerms ? `${theme.accent}10` : theme.pill, border:`1.5px solid ${consentTerms ? theme.accent : theme.cardBorder}`, transition:"all 0.2s" }}>
                  <div onClick={()=>setConsentTerms(v=>!v)} style={{
                    width:20, height:20, borderRadius:5, flexShrink:0, marginTop:1,
                    background: consentTerms ? theme.accent : "white",
                    border:`2px solid ${consentTerms ? theme.accent : theme.inputBorder}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    cursor:"pointer", transition:"all 0.2s",
                  }}>
                    {consentTerms && <span style={{ color:"#fff", fontSize:13, fontWeight:800 }}>✓</span>}
                  </div>
                  <span style={{ fontSize:13, color:theme.accentDeep, lineHeight:1.5 }}>
                    {t.consentTerms}{" "}
                    <a href="https://sparybudget.com/terms" target="_blank" rel="noopener noreferrer"
                      style={{ color:theme.accent, fontWeight:700, textDecoration:"underline" }}>
                      {t.consentTermsLink}
                    </a>{" "}
                    {t.consentAnd}{" "}
                    <a href="https://sparybudget.com/privacy" target="_blank" rel="noopener noreferrer"
                      style={{ color:theme.accent, fontWeight:700, textDecoration:"underline" }}>
                      {t.consentPrivacyLink}
                    </a>
                  </span>
                </label>

                {/* Age confirmation */}
                <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", padding:"10px 12px", borderRadius:12, background: consentAge ? `${theme.accent}10` : theme.pill, border:`1.5px solid ${consentAge ? theme.accent : theme.cardBorder}`, transition:"all 0.2s" }}>
                  <div onClick={()=>setConsentAge(v=>!v)} style={{
                    width:20, height:20, borderRadius:5, flexShrink:0,
                    background: consentAge ? theme.accent : "white",
                    border:`2px solid ${consentAge ? theme.accent : theme.inputBorder}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    cursor:"pointer", transition:"all 0.2s",
                  }}>
                    {consentAge && <span style={{ color:"#fff", fontSize:13, fontWeight:800 }}>✓</span>}
                  </div>
                  <span style={{ fontSize:13, color:theme.accentDeep }}>{t.consentAge}</span>
                </label>
              </div>
            )}

            {/* Primary button */}
            <button
              onClick={mode==="login"?handleLogin:mode==="signup"?handleSignup:handleReset}
              disabled={loading || (mode==="signup" && (!consentTerms || !consentAge))}
              style={{
                width:"100%", padding:"14px", borderRadius:16, marginTop:4,
                background: (loading || (mode==="signup" && (!consentTerms || !consentAge)))
                  ? theme.pill
                  : `linear-gradient(135deg,${theme.accent},${theme.accentDeep})`,
                color: (loading || (mode==="signup" && (!consentTerms || !consentAge)))
                  ? theme.accentMuted : "#fff",
                border:"none",
                cursor:(loading || (mode==="signup" && (!consentTerms || !consentAge)))?"default":"pointer",
                fontWeight:800, fontSize:16,
                boxShadow:(mode==="signup" && (!consentTerms || !consentAge)) ? "none" : `0 4px 16px ${theme.accent}44`,
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
                <button onClick={()=>{setMode("signup");setError("");setInfo("");setConsentTerms(false);setConsentAge(false);}} style={{
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
          <div style={{ fontWeight:800, fontSize:24, color:"#1A2F52" }}>Sparybudget</div>
          <div style={{ fontSize:13, color:"#8AAAD8", marginTop:8 }}>Laddar…</div>
        </div>
      </div>
    );
  }

  if (!currentUser) return <LoginScreen onLogin={setCurrentUser} />;
  return <AppInner user={currentUser} onLogout={handleLogout} />;
}

function AppInner({ user, onLogout }) {
  const { maxW, isTablet }              = useViewport();
  const [lang, setLang]                 = useLS("sparybudget_lang", "sv");
  const [currency, setCurrency]         = useLS("sparybudget_currency", "SEK");
  const [themeId, setThemeId]           = useLS("sparybudget_theme", "blue");
  const theme = THEMES.find(th => th.id === themeId) || THEMES[0];

  const [activeTab, setActiveTab]         = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [showSettings, setShowSettings]   = useState(false);
  const [showProfile, setShowProfile]     = useState(false);

  const t = T[lang];

  // ── Supabase data ────────────────────────────────────────────────────────────
  const {
    allYears, setAllYears,
    goals, setGoals,
    categories, setCategories,
    loading, saving, error: dataError,
  } = useSupabaseUserData(user.id, user.isDemo);

  const [selectedYear, setSelectedYear]   = useState(CURRENT_YEAR);
  const [showNewYear, setShowNewYear]     = useState(false);

  // Derive current yearData from allYears
  const yearData = allYears[selectedYear] || emptyYear();

  function setYearData(fn) {
    setAllYears(prev => ({
      ...prev,
      [selectedYear]: typeof fn === "function" ? fn(prev[selectedYear] || emptyYear()) : fn,
    }));
  }

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

  function createYear(newYear, newYearData) {
    setAllYears(prev => ({ ...prev, [newYear]: newYearData }));
    setSelectedYear(newYear);
    setShowNewYear(false);
  }

  const availableYears = Object.keys(allYears).map(Number).sort();

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
          <div style={{ fontWeight:800, fontSize:24, color:theme.accentDeep }}>Sparybudget</div>
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

  function copyIncomeSourceToMonths(source, months) {
    setYearData(prev => prev.map((m, i) => {
      if (!months.includes(i)) return m;
      const sources = m.incomeSources || [];
      const exists = sources.find(s => s.name === source.name);
      if (exists) return { ...m, incomeSources: sources.map(s => s.name === source.name ? { ...s, amount: source.amount } : s) };
      return { ...m, incomeSources: [...sources, { ...source, id: Date.now() + Math.random() }] };
    }));
  }

  function editIncomeSourceForMonths(source, months, newAmount) {
    const v = parseFloat(newAmount);
    if (isNaN(v) || v < 0) return;
    setYearData(prev => prev.map((m, i) => {
      if (!months.includes(i)) return m;
      const sources = m.incomeSources || [];
      const exists = sources.find(s => s.name === source.name);
      if (exists) return { ...m, incomeSources: sources.map(s => s.name === source.name ? { ...s, amount: v } : s) };
      return { ...m, incomeSources: [...sources, { ...source, id: Date.now() + Math.random(), amount: v }] };
    }));
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
        html{height:-webkit-fill-available;}
        body{background:${theme.bodyBg};font-family:'Plus Jakarta Sans',system-ui,sans-serif;min-height:100vh;min-height:-webkit-fill-available;}
        input:focus,select:focus{outline:none;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        input, select, textarea, button { max-width:100%; box-sizing:border-box; }
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:${theme.scrollThumb};border-radius:2px;}
        @media(min-width:600px){.tryvi-inner{max-width:540px;margin:0 auto;}}
        @media(min-width:1024px){.tryvi-inner{max-width:480px;}}
      `}</style>

      <div style={{ minHeight:"100vh", background:theme.bg, paddingBottom:80 }}>
        <div className="tryvi-inner">

        {/* Header */}
        <div style={{ padding:"48px 20px 22px", background:theme.header, borderRadius:"0 0 32px 32px", marginBottom:18, boxShadow:`0 8px 40px ${theme.accentDeep}60` }}>

          {/* Row 1: App name, full width, own line */}
          <div style={{ fontWeight:800, fontSize:28, color:"#fff", letterSpacing:"-1px", lineHeight:1.15, marginBottom:10 }}>
            {t.appTitle}
          </div>

          {/* Row 2: user + action icons */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontSize:12, color:theme.accentMuted, display:"flex", alignItems:"center", gap:6, minWidth:0 }}>
              <button onClick={()=>setShowProfile(true)} style={{
                background:"none", border:"none", cursor:"pointer",
                color:theme.accentMuted, fontSize:12, padding:0, fontWeight:600,
                textDecoration:"underline", textDecorationStyle:"dotted",
                overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
              }}>
                👤 {user.name}{user.isDemo ? " (Demo)" : ""}
              </button>
              {saving && <span style={{ fontSize:10, color:theme.accentMuted, flexShrink:0 }}>· {lang==="sv"?"sparar…":"saving…"}</span>}
              {!saving && !user.isDemo && <span style={{ fontSize:10, color:"#80D880", flexShrink:0 }}>✓</span>}
            </div>
            <div style={{ display:"flex", gap:8, flexShrink:0 }}>
              <button onClick={()=>setShowSettings(s=>!s)} style={{
                width:34, height:34, borderRadius:17, border:`1.5px solid ${theme.headerBorder}`,
                background: showSettings ? theme.accentDeep+"80" : "transparent",
                color:theme.accentText, cursor:"pointer", fontSize:16,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>⚙</button>
              <button onClick={onLogout} title="Log out" style={{
                width:34, height:34, borderRadius:17, border:`1.5px solid ${theme.headerBorder}`,
                background:"transparent", color:theme.accentText, cursor:"pointer", fontSize:14,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>⏏</button>
            </div>
          </div>

          {showSettings && (
            <div style={{ background:"rgba(0,0,0,0.25)", borderRadius:18, padding:16, marginTop:14, backdropFilter:"blur(10px)" }}>
              {/* Language */}
              <div style={{ fontSize:11, color:theme.accentMuted, marginBottom:8, letterSpacing:1 }}>{lang==="sv"?"SPRÅK":"LANGUAGE"}</div>
              <div style={{ display:"flex", gap:8, marginBottom:16 }}>
                {[["sv","Svenska"],["en","English"]].map(([code,label])=>(
                  <button key={code} onClick={()=>setLang(code)} style={{
                    padding:"6px 16px", borderRadius:14,
                    background: lang===code ? theme.accent : "transparent",
                    border: `1px solid ${lang===code ? theme.accent : theme.headerBorder}`,
                    color: lang===code ? "#fff" : theme.accentText,
                    cursor:"pointer", fontSize:13, fontWeight:lang===code?700:400,
                  }}>{label}</button>
                ))}
              </div>
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
            {["monthly","savings","overview","import"].map(tab=>(
              <button key={tab} onClick={()=>setActiveTab(tab)} style={{
                flex:1, padding:"9px 4px", borderRadius:16,
                background: activeTab===tab ? theme.accent : "transparent",
                border: `1.5px solid ${activeTab===tab ? theme.accent : theme.headerBorder}`,
                color: activeTab===tab ? "#fff" : theme.accentText,
                cursor:"pointer", fontSize:11, fontWeight:activeTab===tab?700:500,
                boxShadow: activeTab===tab ? `0 4px 16px ${theme.accent}55` : "none",
                display:"flex", alignItems:"center", justifyContent:"center", gap:4,
              }}>
                {tab==="monthly" ? t.monthly
                 : tab==="savings" ? t.savings
                 : tab==="overview" ? t.overview
                 : <>🏦 <span style={{whiteSpace:"nowrap"}}>{t.importTab}</span></>}
              </button>
            ))}
          </div>

          {/* Year switcher */}
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:12 }}>
            <div style={{ fontSize:11, color:theme.accentMuted, letterSpacing:0.5 }}>{t.switchYear}:</div>
            <div style={{ display:"flex", gap:4, flex:1 }}>
              {availableYears.map(y => (
                <button key={y} onClick={()=>setSelectedYear(y)} style={{
                  padding:"5px 12px", borderRadius:12,
                  background: selectedYear===y ? "#fff" : "rgba(255,255,255,0.12)",
                  color: selectedYear===y ? theme.accentDeep : theme.accentText,
                  border:"none", cursor:"pointer", fontWeight:selectedYear===y?700:500, fontSize:12,
                }}>{y}</button>
              ))}
            </div>
            <button onClick={()=>setShowNewYear(true)} style={{
              padding:"5px 12px", borderRadius:12,
              background:"rgba(255,255,255,0.12)", border:"none",
              color:theme.accentText, cursor:"pointer", fontSize:12, fontWeight:600,
            }}>+ {t.newYear}</button>
          </div>
        </div>

        <div style={{ padding:"0 16px" }}>
          {/* Month pills — only on monthly and overview tabs */}
          {activeTab !== "savings" && activeTab !== "import" && (
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
            ) : activeTab==="import" ? (
              <ImportTab lang={lang} currency={currency} theme={theme} yearData={yearData} setYearData={setYearData} categories={categories} allYears={allYears} setAllYears={setAllYears} selectedYear={selectedYear}/>
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
                      key={src.id} source={src} currency={currency} t={t} lang={lang} theme={theme}
                      flashing={sourceFlash === src.id}
                      onUpdate={val => updateSourceAmount(src.id, val)}
                      onDelete={() => deleteIncomeSource(src.id)}
                      onApplyToAll={() => applySourceToAllMonths(src)}
                      onCopyToMonths={months => copyIncomeSourceToMonths(src, months)}
                      onEditForMonths={(months, amt) => editIncomeSourceForMonths(src, months, amt)}
                    />
                  ))}

                  {/* Add source form */}
                  {showAddSource ? (
                    <div style={{ marginTop:10, width:"100%", boxSizing:"border-box" }}>
                      <div style={{ display:"flex", gap:8, marginBottom:8, width:"100%" }}>
                        <input type="text" value={newSourceName} onChange={e=>setNewSourceName(e.target.value)}
                          placeholder={t.incomeSourceName}
                          style={{ flex:"1 1 0%", minWidth:0, width:"100%", boxSizing:"border-box", padding:"10px 12px", borderRadius:12, border:"1.5px solid #6A5A4A", background:"rgba(255,255,255,0.1)", color:"#F5F0EA", fontSize:14 }}
                        />
                        <input type="number" inputMode="decimal" value={newSourceAmount} onChange={e=>setNewSourceAmount(e.target.value)}
                          placeholder={t.incomeSourceAmount}
                          onKeyDown={e=>e.key==="Enter"&&addIncomeSource()}
                          style={{ flex:"0 1 110px", minWidth:0, width:"110px", boxSizing:"border-box", padding:"10px 10px", borderRadius:12, border:"1.5px solid #6A5A4A", background:"rgba(255,255,255,0.1)", color:"#F5F0EA", fontSize:14 }}
                        />
                      </div>
                      <div style={{ display:"flex", gap:8, width:"100%" }}>
                        <button onClick={addIncomeSource} style={{
                          flex:1, minWidth:0, padding:"10px", borderRadius:12, background:"#C4A882",
                          color:"#3A2E22", border:"none", cursor:"pointer", fontWeight:700, fontSize:14,
                        }}>{t.add}</button>
                        <button onClick={()=>{setShowAddSource(false);setNewSourceName("");setNewSourceAmount("");}} style={{
                          flexShrink:0, padding:"10px 14px", borderRadius:12, background:"rgba(255,255,255,0.1)",
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
                    <div style={{ display:"flex", gap:8, marginBottom:10, width:"100%" }}>
                      <input type="text" value={newName} onChange={e=>setNewName(e.target.value)}
                        placeholder={t.bucketName}
                        style={{ flex:"1 1 0%", minWidth:0, width:"100%", boxSizing:"border-box", padding:"10px 14px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep }}
                      />
                      <input type="number" inputMode="decimal" value={newBudget} onChange={e=>setNewBudget(e.target.value)}
                        placeholder={t.budgetAmount}
                        onKeyDown={e=>e.key==="Enter"&&addBucket()}
                        style={{ flex:"0 1 110px", minWidth:0, width:"110px", boxSizing:"border-box", padding:"10px 10px", borderRadius:12, border:`1.5px solid ${theme.inputBorder}`, background:"white", fontSize:14, color:theme.accentDeep }}
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
        </div> {/* .tryvi-inner */}
      </div>

      {/* New Year Wizard */}
      {showNewYear && (
        <NewYearWizard
          newYear={Math.max(...availableYears) + 1}
          prevYear={Math.max(...availableYears)}
          prevYearData={allYears[Math.max(...availableYears)] || emptyYear()}
          lang={lang} currency={currency} theme={theme}
          onClose={()=>setShowNewYear(false)}
          onCreate={(newYearData) => createYear(Math.max(...availableYears)+1, newYearData)}
        />
      )}

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
