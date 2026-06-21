import { useState, useEffect, useRef } from "react";
import { ROADMAP_DATA, BREAK_INFO } from "./data.js";

// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const COLOR_MAP = {
  gym:     { bg: "#1a1a2e", accent: "#e94560", text: "#ff6b6b", border: "#e94560" },
  dsa:     { bg: "#0a192f", accent: "#64ffda", text: "#64ffda", border: "#64ffda" },
  cs:      { bg: "#0d2137", accent: "#a78bfa", text: "#c4b5fd", border: "#7c3aed" },
  project: { bg: "#1a0a2e", accent: "#f97316", text: "#fb923c", border: "#ea580c" },
  sd:      { bg: "#0f1f1a", accent: "#34d399", text: "#6ee7b7", border: "#059669" },
  jobs:    { bg: "#1a1500", accent: "#fbbf24", text: "#fcd34d", border: "#d97706" },
  break:   { bg: "#0f0f0f", accent: "#6b7280", text: "#9ca3af", border: "#374151" },
  namaaz:  { bg: "#0d0a1f", accent: "#818cf8", text: "#a5b4fc", border: "#4f46e5" },
};

const DIFF_COLORS = { Easy: "#34d399", Medium: "#fbbf24", Hard: "#f87171" };
const WEEK_COLORS = ["#64ffda","#a78bfa","#f97316","#fbbf24","#f87171"];

const NAMAAZ_TIMES = [
  { id: "tahajjud", time: "4:00 AM",  label: "Tahajjud",  emoji: "🌙", color: "#818cf8" },
  { id: "fajr",    time: "5:00 AM",  label: "Fajr",      emoji: "🌅", color: "#60a5fa" },
  { id: "zohr",    time: "1:30 PM",  label: "Zohr",      emoji: "☀️",  color: "#fbbf24" },
  { id: "asr",     time: "5:15 PM",  label: "Asr",       emoji: "🌤️",  color: "#fb923c" },
  { id: "maghrib", time: "6:45 PM",  label: "Maghrib",   emoji: "🌆", color: "#f87171" },
  { id: "isha",    time: "8:30 PM",  label: "Isha",      emoji: "🌙", color: "#a78bfa" },
];

const SURAHS = [
  { id: "yaseen",  label: "Surah Yaseen",  arabic: "يس",        emoji: "📖" },
  { id: "rahman",  label: "Surah Rahman",  arabic: "الرحمن",     emoji: "📿" },
  { id: "mulk",    label: "Surah Al-Mulk", arabic: "تبارك",      emoji: "✨" },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────
function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}
function getDateKey(daysAgo = 0) {
  const d = new Date(); d.setDate(d.getDate() - daysAgo);
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

// ─── STORAGE HOOK ──────────────────────────────────────────────────────────
function useLocalStorage(key, def) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : def; } catch { return def; }
  });
  const set = (v) => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
  return [val, set];
}

// ─── STREAK CALCULATOR ─────────────────────────────────────────────────────
function calcStreak(dailyChecks) {
  let streak = 0;
  for (let i = 0; i < 366; i++) {
    const key = getDateKey(i);
    const d = dailyChecks[key];
    if (!d) break;
    const allNamaaz = NAMAAZ_TIMES.every(n => d.namaaz?.[n.id]);
    const anySurah = SURAHS.some(s => d.surah?.[s.id]);
    if (allNamaaz || anySurah) streak++; else break;
  }
  return streak;
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────
function Badge({ text, color }) {
  return (
    <span style={{ background: color+"22", color, border:`1px solid ${color}44`, borderRadius:4,
      padding:"2px 8px", fontSize:11, fontFamily:"'Space Mono',monospace", fontWeight:700, letterSpacing:1 }}>
      {text}
    </span>
  );
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ position:"relative", marginTop:8 }}>
      <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(()=>setCopied(false),2000); }}
        style={{ position:"absolute", top:8, right:8, background:copied?"#34d39944":"#ffffff11",
          border:"1px solid #ffffff22", color:copied?"#34d399":"#9ca3af", borderRadius:4,
          padding:"3px 10px", fontSize:11, cursor:"pointer", fontFamily:"'Space Mono',monospace" }}>
        {copied?"✓ Copied":"Copy"}
      </button>
      <pre style={{ background:"#060d14", border:"1px solid #1e3a5f", borderRadius:8, padding:"16px 14px",
        overflowX:"auto", fontSize:12, lineHeight:1.7, color:"#a8d8ea",
        fontFamily:"'Space Mono',monospace", margin:0, whiteSpace:"pre-wrap", wordBreak:"break-word" }}>
        {code}
      </pre>
    </div>
  );
}

// ─── NAMAAZ CHECKLIST PANEL ────────────────────────────────────────────────
function NamaazPanel({ dailyChecks, setDailyChecks }) {
  const today = getTodayKey();
  const d = dailyChecks[today] || {};
  const namaazChecks = d.namaaz || {};
  const surahChecks = d.surah || {};

  const toggleNamaaz = (id) => {
    const updated = { ...dailyChecks, [today]: { ...d, namaaz: { ...namaazChecks, [id]: !namaazChecks[id] } } };
    setDailyChecks(updated);
  };
  const toggleSurah = (id) => {
    const updated = { ...dailyChecks, [today]: { ...d, surah: { ...surahChecks, [id]: !surahChecks[id] } } };
    setDailyChecks(updated);
  };

  const namaazDone = NAMAAZ_TIMES.filter(n => namaazChecks[n.id]).length;
  const surahDone = SURAHS.filter(s => surahChecks[s.id]).length;
  const streak = calcStreak(dailyChecks);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

      {/* Streak */}
      <div style={{ background:"linear-gradient(135deg,#1a0d2e,#0d0a1f)", border:"1px solid #818cf844",
        borderRadius:14, padding:"14px 16px", textAlign:"center" }}>
        <div style={{ fontSize:28, marginBottom:4 }}>🔥</div>
        <div style={{ fontSize:28, fontWeight:800, color:"#f97316", fontFamily:"'Space Mono',monospace" }}>{streak}</div>
        <div style={{ fontSize:11, color:"#818cf8", letterSpacing:2, fontFamily:"'Space Mono',monospace" }}>
          DAY STREAK
        </div>
        <div style={{ fontSize:10, color:"#4b5563", marginTop:4 }}>
          Complete any namaaz or surah daily to keep streak
        </div>
      </div>

      {/* Namaaz */}
      <div style={{ background:"#0d0a1f", border:"1px solid #4f46e544", borderRadius:14, overflow:"hidden" }}>
        <div style={{ padding:"12px 14px", borderBottom:"1px solid #4f46e522",
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11, color:"#818cf8", fontFamily:"'Space Mono',monospace", letterSpacing:2 }}>
            🕌 NAMAAZ TODAY
          </span>
          <span style={{ fontSize:11, color:"#818cf8", fontFamily:"'Space Mono',monospace" }}>
            {namaazDone}/{NAMAAZ_TIMES.length}
          </span>
        </div>
        <div style={{ padding:"8px 0" }}>
          {NAMAAZ_TIMES.map(n => {
            const done = !!namaazChecks[n.id];
            return (
              <div key={n.id} onClick={() => toggleNamaaz(n.id)}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 14px",
                  cursor:"pointer", transition:"background 0.15s",
                  background: done?"#818cf811":"transparent" }}
                onMouseEnter={e=>e.currentTarget.style.background="#818cf809"}
                onMouseLeave={e=>e.currentTarget.style.background=done?"#818cf811":"transparent"}>
                <div style={{ width:20, height:20, borderRadius:5, border:`2px solid ${done?"#818cf8":"#374151"}`,
                  background:done?"#818cf833":"transparent", display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:11, color:"#818cf8", flexShrink:0,
                  transition:"all 0.15s" }}>
                  {done?"✓":""}
                </div>
                <span style={{ fontSize:13 }}>{n.emoji}</span>
                <div style={{ flex:1 }}>
                  <span style={{ fontSize:13, fontWeight:600, color:done?"#818cf8":"#e2e8f0",
                    textDecoration:done?"line-through":"none" }}>
                    {n.label}
                  </span>
                </div>
                <span style={{ fontSize:11, color:"#4b5563", fontFamily:"'Space Mono',monospace" }}>
                  {n.time}
                </span>
              </div>
            );
          })}
        </div>
        {/* Progress bar */}
        <div style={{ padding:"8px 14px 12px" }}>
          <div style={{ height:4, background:"#1e293b", borderRadius:2, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${(namaazDone/NAMAAZ_TIMES.length)*100}%`,
              background:"linear-gradient(90deg,#4f46e5,#818cf8)", transition:"width 0.4s" }}/>
          </div>
        </div>
      </div>

      {/* Surahs */}
      <div style={{ background:"#0a0d1a", border:"1px solid #a78bfa44", borderRadius:14, overflow:"hidden" }}>
        <div style={{ padding:"12px 14px", borderBottom:"1px solid #a78bfa22",
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11, color:"#a78bfa", fontFamily:"'Space Mono',monospace", letterSpacing:2 }}>
            📿 DAILY SURAH
          </span>
          <span style={{ fontSize:11, color:"#a78bfa", fontFamily:"'Space Mono',monospace" }}>
            {surahDone}/{SURAHS.length}
          </span>
        </div>
        <div style={{ padding:"8px 0" }}>
          {SURAHS.map(s => {
            const done = !!surahChecks[s.id];
            return (
              <div key={s.id} onClick={() => toggleSurah(s.id)}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
                  cursor:"pointer", transition:"background 0.15s",
                  background:done?"#a78bfa11":"transparent" }}
                onMouseEnter={e=>e.currentTarget.style.background="#a78bfa09"}
                onMouseLeave={e=>e.currentTarget.style.background=done?"#a78bfa11":"transparent"}>
                <div style={{ width:20, height:20, borderRadius:5, border:`2px solid ${done?"#a78bfa":"#374151"}`,
                  background:done?"#a78bfa33":"transparent", display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:11, color:"#a78bfa", flexShrink:0, transition:"all 0.15s" }}>
                  {done?"✓":""}
                </div>
                <span style={{ fontSize:14 }}>{s.emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:done?"#a78bfa":"#e2e8f0",
                    textDecoration:done?"line-through":"none" }}>{s.label}</div>
                  <div style={{ fontSize:10, color:"#4b5563", fontFamily:"'Space Mono',monospace",
                    direction:"rtl", marginTop:1 }}>{s.arabic}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ padding:"8px 14px 12px" }}>
          <div style={{ height:4, background:"#1e293b", borderRadius:2, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${(surahDone/SURAHS.length)*100}%`,
              background:"linear-gradient(90deg,#7c3aed,#a78bfa)", transition:"width 0.4s" }}/>
          </div>
        </div>
      </div>

      {/* Weekly ibadah tracker */}
      <WeeklyIbadahTracker dailyChecks={dailyChecks} />
    </div>
  );
}

// ─── WEEKLY TRACKER ────────────────────────────────────────────────────────
function WeeklyIbadahTracker({ dailyChecks }) {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const today = new Date();
  // Show last 7 days
  const entries = Array.from({ length:7 }, (_,i) => {
    const d = new Date(today); d.setDate(d.getDate() - (6-i));
    const key = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    const checks = dailyChecks[key] || {};
    const namaazDone = NAMAAZ_TIMES.filter(n => checks.namaaz?.[n.id]).length;
    const surahDone = SURAHS.filter(s => checks.surah?.[s.id]).length;
    const isToday = i === 6;
    return { label: days[d.getDay()], key, namaazDone, surahDone, isToday };
  });

  return (
    <div style={{ background:"#0a0d1a", border:"1px solid #1e293b", borderRadius:14, padding:"14px" }}>
      <div style={{ fontSize:11, color:"#4b5563", fontFamily:"'Space Mono',monospace",
        letterSpacing:2, marginBottom:12 }}>LAST 7 DAYS</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
        {entries.map((e,i) => (
          <div key={i} style={{ textAlign:"center" }}>
            <div style={{ fontSize:9, color: e.isToday?"#818cf8":"#374151",
              fontFamily:"'Space Mono',monospace", marginBottom:5 }}>{e.label}</div>
            {/* Namaaz dots */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:2, justifyContent:"center", marginBottom:4 }}>
              {NAMAAZ_TIMES.map(n => (
                <div key={n.id} style={{ width:5, height:5, borderRadius:"50%",
                  background: (dailyChecks[e.key]?.namaaz?.[n.id]) ? "#818cf8" : "#1e293b" }}/>
              ))}
            </div>
            {/* Surah dots */}
            <div style={{ display:"flex", gap:2, justifyContent:"center" }}>
              {SURAHS.map(s => (
                <div key={s.id} style={{ width:5, height:5, borderRadius:2,
                  background: (dailyChecks[e.key]?.surah?.[s.id]) ? "#a78bfa" : "#1e293b" }}/>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:12, marginTop:12, flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, color:"#4b5563" }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:"#818cf8" }}/> Namaaz
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, color:"#4b5563" }}>
          <div style={{ width:8, height:8, borderRadius:2, background:"#a78bfa" }}/> Surah
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL PANEL ──────────────────────────────────────────────────────────
function DetailPanel({ detail, onClose }) {
  if (!detail) return null;
  const c = COLOR_MAP[detail.color] || COLOR_MAP.dsa;
  return (
    <div style={{ position:"fixed", inset:0, background:"#000000cc", zIndex:1000,
      display:"flex", alignItems:"center", justifyContent:"center", padding:"20px",
      backdropFilter:"blur(4px)" }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#0a0f1a", border:`1px solid ${c.accent}44`,
        borderRadius:16, width:"100%", maxWidth:760, maxHeight:"88vh", overflowY:"auto",
        boxShadow:`0 0 60px ${c.accent}22`, animation:"slideUp 0.2s ease" }}>
        <div style={{ padding:"20px 24px 16px", borderBottom:`1px solid ${c.accent}22`,
          display:"flex", justifyContent:"space-between", alignItems:"flex-start",
          position:"sticky", top:0, background:"#0a0f1a", zIndex:2 }}>
          <div>
            <div style={{ fontSize:11, color:c.accent, fontFamily:"'Space Mono',monospace", letterSpacing:2, marginBottom:4 }}>
              {detail.type==="dsa"?"DSA SOLUTIONS (JAVA)":detail.type==="cs"?"CORE CS NOTES":
               detail.type==="project"?"PROJECT STEPS":detail.type==="sd"?"SYSTEM DESIGN NOTES":"NOTES"}
            </div>
            <div style={{ fontSize:20, fontWeight:700, color:"#fff", fontFamily:"'DM Sans',sans-serif" }}>
              {detail.type==="dsa"?"Problems & Solutions":detail.type==="cs"?detail.topic:
               detail.type==="project"?detail.project:detail.type==="sd"?detail.topic:"Details"}
            </div>
          </div>
          <button onClick={onClose} style={{ background:"#ffffff11", border:"1px solid #ffffff22",
            color:"#9ca3af", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontSize:18, lineHeight:1 }}>✕</button>
        </div>
        <div style={{ padding:"20px 24px" }}>
          {detail.type==="dsa" && detail.items && (
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              {detail.items.map((item,i) => (
                <div key={i} style={{ background:"#060d14", border:"1px solid #1e3a5f44", borderRadius:12, padding:20 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12, flexWrap:"wrap" }}>
                    <span style={{ fontSize:17, fontWeight:700, color:"#e2e8f0" }}>{i+1}. {item.name}</span>
                    <Badge text={item.difficulty} color={DIFF_COLORS[item.difficulty]}/>
                    <a href={item.link} target="_blank" rel="noreferrer"
                      style={{ color:"#64ffda", fontSize:12, fontFamily:"'Space Mono',monospace", textDecoration:"none" }}>
                      LeetCode →
                    </a>
                  </div>
                  <CodeBlock code={item.solution}/>
                </div>
              ))}
            </div>
          )}
          {(detail.type==="cs"||detail.type==="sd") && detail.notes && (
            <div style={{ background:"#060d14", border:"1px solid #1e3a5f44", borderRadius:12, padding:20,
              whiteSpace:"pre-wrap", fontSize:13, lineHeight:1.9, color:"#cbd5e1",
              fontFamily:"'Space Mono',monospace" }}>{detail.notes}</div>
          )}
          {detail.type==="project" && detail.steps && <CodeBlock code={detail.steps}/>}
        </div>
      </div>
    </div>
  );
}

// ─── SCHEDULE ROW ──────────────────────────────────────────────────────────
function ScheduleRow({ block, onDetailClick }) {
  const c = COLOR_MAP[block.color] || COLOR_MAP.break;
  const hasDetail = block.detail !== null;
  return (
    <div onClick={() => hasDetail && onDetailClick({...block.detail, color:block.color})}
      style={{ display:"grid", gridTemplateColumns:"110px 1fr", gap:0,
        borderLeft:`3px solid ${c.accent}55`, marginBottom:2,
        cursor:hasDetail?"pointer":"default", transition:"all 0.15s", borderRadius:"0 8px 8px 0" }}
      onMouseEnter={e=>{ if(hasDetail) e.currentTarget.style.borderLeftColor=c.accent; e.currentTarget.style.background=c.bg+"aa"; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderLeftColor=c.accent+"55"; e.currentTarget.style.background="transparent"; }}>
      <div style={{ padding:"10px 10px 10px 12px", fontFamily:"'Space Mono',monospace", fontSize:10,
        color:c.text, lineHeight:1.5, display:"flex", flexDirection:"column", justifyContent:"center", minWidth:100 }}>
        <span>{block.time.split("–")[0]}</span>
        <span style={{ color:c.text+"88" }}>–{block.time.split("–")[1]}</span>
      </div>
      <div style={{ padding:"10px 14px 10px 8px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
          <span style={{ fontSize:14 }}>{block.emoji}</span>
          <span style={{ fontSize:13, fontWeight:600, color:c.text }}>{block.label}</span>
          {hasDetail && <span style={{ fontSize:9, color:c.accent, border:`1px solid ${c.accent}44`,
            borderRadius:3, padding:"1px 5px", fontFamily:"'Space Mono',monospace", letterSpacing:1 }}>
            TAP TO EXPAND
          </span>}
        </div>
        {block.tasks && block.tasks.length>0 && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
            {block.tasks.map((task,i) => (
              <span key={i} style={{ fontSize:11, color:"#94a3b8", background:"#ffffff08", borderRadius:4, padding:"2px 7px" }}>
                {task}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DAY CARD ──────────────────────────────────────────────────────────────
function DayCard({ day, isActive, onClick }) {
  const weekColor = WEEK_COLORS[(day.week-1) % WEEK_COLORS.length];
  return (
    <div onClick={onClick} style={{ background:isActive?"#0a192f":"#0d0d14",
      border:`1px solid ${isActive?weekColor+"88":"#1e293b"}`, borderRadius:12, padding:"16px",
      cursor:"pointer", transition:"all 0.2s", boxShadow:isActive?`0 0 20px ${weekColor}22`:"none",
      position:"relative", overflow:"hidden" }}
      onMouseEnter={e=>{ if(!isActive){ e.currentTarget.style.borderColor=weekColor+"44"; e.currentTarget.style.background="#0a0f1a"; }}}
      onMouseLeave={e=>{ if(!isActive){ e.currentTarget.style.borderColor="#1e293b"; e.currentTarget.style.background="#0d0d14"; }}}>
      {isActive && <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg,${weekColor},${weekColor}00)` }}/>}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
        <div>
          <div style={{ fontSize:10, color:weekColor, fontFamily:"'Space Mono',monospace", letterSpacing:2, marginBottom:2 }}>
            DAY {day.day} · W{day.week}
          </div>
          <div style={{ fontSize:15, fontWeight:700, color:"#e2e8f0" }}>{day.date}</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:3, alignItems:"flex-end" }}>
          {day.isRevision && <Badge text="REVISION" color="#f97316"/>}
          {day.isBreakEnd && <Badge text="POST-BREAK" color="#34d399"/>}
        </div>
      </div>
      <div style={{ fontSize:11, color:"#64748b", lineHeight:1.4 }}>{day.weekTheme}</div>
      <div style={{ display:"flex", gap:3, marginTop:10, flexWrap:"wrap" }}>
        {day.schedule.map((block,i) => (
          <div key={i} style={{ width:6, height:6, borderRadius:"50%",
            background:COLOR_MAP[block.color]?.accent||"#374151", opacity:0.7 }} title={block.label}/>
        ))}
      </div>
    </div>
  );
}

// ─── BREAK CARD ────────────────────────────────────────────────────────────
function BreakCard() {
  return (
    <div style={{ background:"linear-gradient(135deg,#0f2010,#101a10)", border:"1px solid #34d39944",
      borderRadius:12, padding:"20px", gridColumn:"1 / -1", textAlign:"center" }}>
      <div style={{ fontSize:28, marginBottom:8 }}>🏖️</div>
      <div style={{ fontSize:16, fontWeight:700, color:"#34d399", marginBottom:4 }}>REST & RECOVERY WEEK</div>
      <div style={{ fontSize:13, color:"#6ee7b7", marginBottom:2 }}>
        {BREAK_INFO.startDate} → {BREAK_INFO.endDate}
      </div>
      <div style={{ fontSize:12, color:"#4ade80aa", fontFamily:"'Space Mono',monospace" }}>
        7 DAYS · Recharge, reflect, review Project A
      </div>
    </div>
  );
}

function ProgressBar({ value, max, color, label }) {
  const pct = Math.round((value/max)*100);
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <span style={{ fontSize:12, color:"#94a3b8" }}>{label}</span>
        <span style={{ fontSize:12, color, fontFamily:"'Space Mono',monospace" }}>{value}/{max}</span>
      </div>
      <div style={{ height:6, background:"#1e293b", borderRadius:3 }}>
        <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:3, transition:"width 0.5s ease" }}/>
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [detail, setDetail] = useState(null);
  const [completedDays, setCompletedDays] = useLocalStorage("completed", []);
  const [dailyChecks, setDailyChecks] = useLocalStorage("ibadah_v1", {});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("schedule"); // "schedule" | "ibadah"
  const mainRef = useRef();

  const day = ROADMAP_DATA[selectedDay];
  const weekColor = WEEK_COLORS[(day.week-1) % WEEK_COLORS.length];
  const streak = calcStreak(dailyChecks);

  const toggleComplete = (dayIdx) => {
    const next = completedDays.includes(dayIdx)
      ? completedDays.filter(d=>d!==dayIdx)
      : [...completedDays, dayIdx];
    setCompletedDays(next);
  };

  const totalDSA = 155;
  const doneCount = completedDays.length;
  const totalDays = ROADMAP_DATA.length;

  const filteredSchedule = filter==="all" ? day.schedule
    : day.schedule.filter(b => b.color===filter || b.color==="break");

  // Today's namaaz progress for header indicator
  const today = getTodayKey();
  const todayNamaazDone = NAMAAZ_TIMES.filter(n => dailyChecks[today]?.namaaz?.[n.id]).length;
  const todaySurahDone = SURAHS.filter(s => dailyChecks[today]?.surah?.[s.id]).length;

  return (
    <div style={{ minHeight:"100vh", background:"#060d14", color:"#e2e8f0",
      fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column" }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:#0a0f1a; }
        ::-webkit-scrollbar-thumb { background:#1e3a5f; border-radius:3px; }
        @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .nav-btn:hover { background:#1e293b !important; }
      `}</style>

      {/* ── TOP NAV ── */}
      <header style={{ background:"#060d14ee", borderBottom:"1px solid #1e293b", padding:"0 24px", height:56,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        position:"sticky", top:0, zIndex:100, backdropFilter:"blur(12px)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <button onClick={() => setSidebarOpen(v=>!v)} className="nav-btn"
            style={{ background:"transparent", border:"1px solid #1e293b", color:"#94a3b8",
              borderRadius:6, padding:"6px 10px", cursor:"pointer", fontSize:14 }}>☰</button>
          <div>
            <span style={{ fontSize:15, fontWeight:800, color:"#fff", letterSpacing:-0.5 }}>
              30-DAY
            </span>
            <span style={{ fontSize:15, fontWeight:400, color:"#64ffda", marginLeft:6 }}>
              Roadmap
            </span>
          </div>
          <div style={{ background:"#64ffda11", border:"1px solid #64ffda33", borderRadius:6,
            padding:"3px 10px", fontSize:10, color:"#64ffda",
            fontFamily:"'Space Mono',monospace", letterSpacing:1 }}>
            MAY 31 → JUL 3
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          {/* Namaaz mini indicator */}
          <div style={{ display:"flex", alignItems:"center", gap:6, background:"#0d0a1f",
            border:"1px solid #4f46e533", borderRadius:8, padding:"4px 10px" }}>
            <span style={{ fontSize:12 }}>🕌</span>
            <span style={{ fontSize:11, color:"#818cf8", fontFamily:"'Space Mono',monospace" }}>
              {todayNamaazDone}/{NAMAAZ_TIMES.length}
            </span>
            <span style={{ fontSize:12 }}>📿</span>
            <span style={{ fontSize:11, color:"#a78bfa", fontFamily:"'Space Mono',monospace" }}>
              {todaySurahDone}/{SURAHS.length}
            </span>
            <span style={{ fontSize:12 }}>🔥</span>
            <span style={{ fontSize:11, color:"#f97316", fontFamily:"'Space Mono',monospace", fontWeight:700 }}>
              {streak}
            </span>
          </div>

          <div style={{ fontSize:12, color:"#64748b" }}>
            <span style={{ color:"#34d399", fontWeight:700 }}>{doneCount}</span>/{totalDays} days
          </div>
          <div style={{ width:80, height:4, background:"#1e293b", borderRadius:2 }}>
            <div style={{ width:`${(doneCount/totalDays)*100}%`, height:"100%",
              background:"#34d399", borderRadius:2, transition:"width 0.5s" }}/>
          </div>
          <button onClick={() => setRightPanelOpen(v=>!v)} className="nav-btn"
            style={{ background:"transparent", border:"1px solid #4f46e533", color:"#818cf8",
              borderRadius:6, padding:"6px 10px", cursor:"pointer", fontSize:12,
              fontFamily:"'Space Mono',monospace" }}>
            {rightPanelOpen?"🕌 Hide":"🕌 Ibadah"}
          </button>
        </div>
      </header>

      <div style={{ display:"flex", flex:1, overflow:"hidden", height:"calc(100vh - 56px)" }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={{ width:sidebarOpen?320:0, minWidth:sidebarOpen?320:0, transition:"all 0.3s ease",
          overflow:"hidden", borderRight:"1px solid #1e293b", background:"#08101a",
          display:"flex", flexDirection:"column" }}>
          <div style={{ flex:1, overflowY:"auto", padding:"16px 14px" }}>
            {/* Stats */}
            <div style={{ background:"#0a192f", borderRadius:12, padding:16, marginBottom:16,
              border:"1px solid #1e3a5f33" }}>
              <div style={{ fontSize:10, color:"#64ffda", fontFamily:"'Space Mono',monospace",
                letterSpacing:2, marginBottom:12 }}>PROGRESS</div>
              <ProgressBar value={doneCount} max={totalDays} color="#64ffda" label="Days Completed"/>
              <ProgressBar value={completedDays.filter(i=>ROADMAP_DATA[i]?.schedule.some(s=>s.color==="dsa")).length*3}
                max={totalDSA} color="#a78bfa" label="Est. DSA Problems"/>
              <ProgressBar value={Math.round(doneCount*0.45)} max={14} color="#f97316" label="Project Milestones"/>
              {/* Ibadah summary */}
              <div style={{ marginTop:8, paddingTop:8, borderTop:"1px solid #1e293b" }}>
                <ProgressBar value={todayNamaazDone} max={NAMAAZ_TIMES.length} color="#818cf8" label="Namaaz Today"/>
                <ProgressBar value={todaySurahDone} max={SURAHS.length} color="#a78bfa" label="Surah Today"/>
              </div>
            </div>

            {/* Week groups */}
            {[1,2,3,4,5].map(week => {
              const wDays = ROADMAP_DATA.filter(d => d.week===week);
              if (!wDays.length) return null;
              const wColor = WEEK_COLORS[week-1];
              return (
                <div key={week} style={{ marginBottom:16 }}>
                  <div style={{ fontSize:10, color:wColor, fontFamily:"'Space Mono',monospace",
                    letterSpacing:2, marginBottom:8, padding:"0 4px" }}>
                    ── WEEK {week} ──────────────────
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {wDays.map(d => (
                      <div key={d.day} style={{ position:"relative" }}>
                        <DayCard
                          day={d}
                          isActive={selectedDay===ROADMAP_DATA.indexOf(d)}
                          onClick={()=>{ setSelectedDay(ROADMAP_DATA.indexOf(d)); if(mainRef.current) mainRef.current.scrollTop=0; }}
                        />
                        <button onClick={e=>{ e.stopPropagation(); toggleComplete(ROADMAP_DATA.indexOf(d)); }}
                          style={{ position:"absolute", top:8, right:8,
                            background:completedDays.includes(ROADMAP_DATA.indexOf(d))?"#34d39922":"#ffffff08",
                            border:`1px solid ${completedDays.includes(ROADMAP_DATA.indexOf(d))?"#34d399":"#374151"}`,
                            color:completedDays.includes(ROADMAP_DATA.indexOf(d))?"#34d399":"#4b5563",
                            borderRadius:6, padding:"3px 8px", cursor:"pointer", fontSize:12 }}>
                          {completedDays.includes(ROADMAP_DATA.indexOf(d))?"✓":"○"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main ref={mainRef} style={{ flex:1, overflowY:"auto", padding:"24px 28px", animation:"fadeIn 0.3s ease" }}>

          {/* Day Header */}
          <div style={{ background:`linear-gradient(135deg,${weekColor}11,#060d14)`,
            border:`1px solid ${weekColor}33`, borderRadius:16, padding:"24px 28px", marginBottom:24,
            position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
              background:`linear-gradient(90deg,${weekColor},${weekColor}00)` }}/>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start",
              flexWrap:"wrap", gap:12 }}>
              <div>
                <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:6, flexWrap:"wrap" }}>
                  <Badge text={`DAY ${day.day}`} color={weekColor}/>
                  <Badge text={`WEEK ${day.week}`} color={weekColor}/>
                  {day.isRevision && <Badge text="REVISION DAY" color="#f97316"/>}
                  {day.isBreakEnd && <Badge text="POST-BREAK" color="#34d399"/>}
                  {completedDays.includes(selectedDay) && <Badge text="✓ COMPLETE" color="#34d399"/>}
                </div>
                <div style={{ fontSize:28, fontWeight:800, color:"#fff", marginBottom:4, letterSpacing:-0.5 }}>
                  {day.date}
                </div>
                <div style={{ fontSize:14, color:"#94a3b8" }}>{day.weekTheme}</div>
              </div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <button onClick={() => toggleComplete(selectedDay)}
                  style={{ background:completedDays.includes(selectedDay)?"#34d39922":"#ffffff08",
                    border:`1px solid ${completedDays.includes(selectedDay)?"#34d399":"#374151"}`,
                    color:completedDays.includes(selectedDay)?"#34d399":"#9ca3af",
                    borderRadius:8, padding:"8px 18px", cursor:"pointer", fontSize:13, fontWeight:600 }}>
                  {completedDays.includes(selectedDay)?"✓ Day Complete":"Mark Complete"}
                </button>
                <button onClick={()=>setSelectedDay(Math.max(0,selectedDay-1))} disabled={selectedDay===0}
                  className="nav-btn"
                  style={{ background:"#0a192f", border:"1px solid #1e3a5f", color:"#64748b",
                    borderRadius:8, padding:"8px 14px", cursor:selectedDay===0?"not-allowed":"pointer", fontSize:13 }}>
                  ← Prev
                </button>
                <button onClick={()=>setSelectedDay(Math.min(ROADMAP_DATA.length-1,selectedDay+1))}
                  disabled={selectedDay===ROADMAP_DATA.length-1} className="nav-btn"
                  style={{ background:"#0a192f", border:"1px solid #1e3a5f", color:"#64748b",
                    borderRadius:8, padding:"8px 14px", cursor:"pointer", fontSize:13 }}>
                  Next →
                </button>
              </div>
            </div>
            {/* Schedule summary strip */}
            <div style={{ display:"flex", gap:6, marginTop:18, flexWrap:"wrap" }}>
              {day.schedule.map((block,i) => (
                <div key={i} style={{ background:COLOR_MAP[block.color]?.accent+"15",
                  border:`1px solid ${COLOR_MAP[block.color]?.accent}33`, borderRadius:6,
                  padding:"4px 10px", fontSize:10, color:COLOR_MAP[block.color]?.text,
                  fontFamily:"'Space Mono',monospace", cursor:block.detail?"pointer":"default" }}
                  onClick={()=>block.detail&&setDetail({...block.detail,color:block.color})}>
                  {block.emoji} {block.label}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile ibadah tab */}
          <div style={{ display:"flex", gap:6, marginBottom:20, flexWrap:"wrap" }}>
            {[
              {key:"schedule",label:"📋 Schedule",emoji:""},
              {key:"ibadah",label:"🕌 Ibadah & Surah",emoji:""},
            ].map(tab=>(
              <button key={tab.key} onClick={()=>setActiveTab(tab.key)}
                style={{ background:activeTab===tab.key?weekColor+"22":"#0a0f1a",
                  border:`1px solid ${activeTab===tab.key?weekColor:"#1e293b"}`,
                  color:activeTab===tab.key?weekColor:"#64748b",
                  borderRadius:8, padding:"6px 14px", cursor:"pointer", fontSize:12,
                  fontFamily:"'Space Mono',monospace", transition:"all 0.15s" }}>
                {tab.label}
              </button>
            ))}
            {activeTab==="schedule" && [
              {key:"all",label:"All",emoji:"📋"},{key:"gym",label:"Gym",emoji:"🏋️"},
              {key:"dsa",label:"DSA",emoji:"💻"},{key:"cs",label:"CS",emoji:"🟢"},
              {key:"project",label:"Project",emoji:"🔴"},{key:"sd",label:"SD",emoji:"🟡"},
              {key:"jobs",label:"Jobs",emoji:"💼"},
            ].map(f=>(
              <button key={f.key} onClick={()=>setFilter(f.key)}
                style={{ background:filter===f.key?weekColor+"22":"#0a0f1a",
                  border:`1px solid ${filter===f.key?weekColor:"#1e293b"}`,
                  color:filter===f.key?weekColor:"#64748b",
                  borderRadius:8, padding:"6px 14px", cursor:"pointer", fontSize:12,
                  fontFamily:"'Space Mono',monospace", transition:"all 0.15s" }}>
                {f.emoji} {f.label}
              </button>
            ))}
          </div>

          {activeTab==="ibadah" ? (
            <NamaazPanel dailyChecks={dailyChecks} setDailyChecks={setDailyChecks}/>
          ) : (
            <>
              {/* Schedule */}
              <div style={{ background:"#08101a", border:"1px solid #1e293b",
                borderRadius:16, overflow:"hidden", marginBottom:24 }}>
                <div style={{ padding:"12px 20px", borderBottom:"1px solid #1e293b",
                  display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:11, color:"#64748b", fontFamily:"'Space Mono',monospace", letterSpacing:2 }}>
                    HOURLY SCHEDULE
                  </span>
                  <span style={{ fontSize:11, color:"#64748b", fontFamily:"'Space Mono',monospace" }}>
                    6:00 AM → 11:00 PM
                  </span>
                </div>
                <div style={{ padding:"8px 0" }}>
                  {filteredSchedule.map((block,i) => (
                    <ScheduleRow key={i} block={block} onDetailClick={setDetail}/>
                  ))}
                </div>
              </div>

              {/* DSA problems */}
              {day.schedule.find(s=>s.color==="dsa")?.detail?.items && (
                <div style={{ background:"#08101a", border:"1px solid #1e293b",
                  borderRadius:16, padding:"20px", marginBottom:24 }}>
                  <div style={{ fontSize:11, color:"#64ffda", fontFamily:"'Space Mono',monospace",
                    letterSpacing:2, marginBottom:14 }}>TODAY'S DSA PROBLEMS</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {day.schedule.find(s=>s.color==="dsa").detail.items.map((item,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                        background:"#0a192f", borderRadius:10, padding:"12px 16px", border:"1px solid #1e3a5f33" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <span style={{ fontSize:12, color:"#64748b", fontFamily:"'Space Mono',monospace" }}>#{i+1}</span>
                          <span style={{ fontSize:14, fontWeight:600, color:"#e2e8f0" }}>{item.name}</span>
                          <Badge text={item.difficulty} color={DIFF_COLORS[item.difficulty]}/>
                        </div>
                        <div style={{ display:"flex", gap:8 }}>
                          <button onClick={()=>setDetail({type:"dsa",items:[item],color:"dsa"})}
                            style={{ background:"#64ffda11", border:"1px solid #64ffda33", color:"#64ffda",
                              borderRadius:6, padding:"5px 12px", cursor:"pointer", fontSize:12 }}>
                            View Solution
                          </button>
                          <a href={item.link} target="_blank" rel="noreferrer"
                            style={{ background:"#0a192f", border:"1px solid #1e3a5f", color:"#94a3b8",
                              borderRadius:6, padding:"5px 12px", fontSize:12, textDecoration:"none",
                              display:"inline-flex", alignItems:"center" }}>
                            LeetCode ↗
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SD quick access */}
              {day.schedule.find(s=>s.color==="sd")?.detail && (
                <div onClick={()=>{ const b=day.schedule.find(s=>s.color==="sd"); setDetail({...b.detail,color:"sd"}); }}
                  style={{ background:"#0f1f1a", border:"1px solid #059669", borderRadius:16,
                    padding:"20px", marginBottom:24, cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#0f2018"}
                  onMouseLeave={e=>e.currentTarget.style.background="#0f1f1a"}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:10, color:"#34d399", fontFamily:"'Space Mono',monospace",
                        letterSpacing:2, marginBottom:6 }}>SYSTEM DESIGN</div>
                      <div style={{ fontSize:16, fontWeight:700, color:"#e2e8f0" }}>
                        {day.schedule.find(s=>s.color==="sd")?.detail?.topic}
                      </div>
                    </div>
                    <div style={{ fontSize:24 }}>🏗️</div>
                  </div>
                  <div style={{ fontSize:12, color:"#64748b", marginTop:8 }}>Click to view detailed notes →</div>
                </div>
              )}

              {/* Project quick access */}
              {day.schedule.find(s=>s.color==="project")?.detail && (
                <div onClick={()=>{ const b=day.schedule.find(s=>s.color==="project"); setDetail({...b.detail,color:"project"}); }}
                  style={{ background:"#1a0a2e", border:"1px solid #ea580c", borderRadius:16,
                    padding:"20px", marginBottom:24, cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#1f0e35"}
                  onMouseLeave={e=>e.currentTarget.style.background="#1a0a2e"}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:10, color:"#f97316", fontFamily:"'Space Mono',monospace",
                        letterSpacing:2, marginBottom:6 }}>PROJECT</div>
                      <div style={{ fontSize:16, fontWeight:700, color:"#e2e8f0" }}>
                        {day.schedule.find(s=>s.color==="project")?.detail?.project}
                      </div>
                    </div>
                    <div style={{ fontSize:24 }}>⚙️</div>
                  </div>
                  <div style={{ fontSize:12, color:"#64748b", marginTop:8 }}>Click to view step-by-step guide →</div>
                </div>
              )}

              {/* Footer */}
              <div style={{ background:`linear-gradient(135deg,${weekColor}08,#060d14)`,
                border:`1px solid ${weekColor}22`, borderRadius:12, padding:"16px 20px", textAlign:"center" }}>
                <div style={{ fontSize:12, color:"#64748b", fontFamily:"'Space Mono',monospace" }}>
                  {completedDays.includes(selectedDay)
                    ? `✓ Day ${day.day} complete! ${totalDays-selectedDay-1} days left 🚀`
                    : `Day ${day.day} of ${totalDays} · Stay consistent, stay focused 💪`}
                </div>
              </div>
            </>
          )}
        </main>

        {/* ── RIGHT PANEL: IBADAH ── */}
        {rightPanelOpen && (
          <aside style={{ width:280, minWidth:280, borderLeft:"1px solid #1e293b",
            background:"#08101a", overflowY:"auto", padding:"16px 14px" }}>
            <div style={{ fontSize:10, color:"#818cf8", fontFamily:"'Space Mono',monospace",
              letterSpacing:2, marginBottom:14 }}>🕌 IBADAH TRACKER</div>
            <NamaazPanel dailyChecks={dailyChecks} setDailyChecks={setDailyChecks}/>
          </aside>
        )}
      </div>

      {detail && <DetailPanel detail={detail} onClose={()=>setDetail(null)}/>}
    </div>
  );
}
// test
