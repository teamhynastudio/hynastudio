import React, { useState } from "react";
import {
  LayoutDashboard, MessageSquare, Calendar, Bell, CreditCard,
  Stethoscope, Pill, BedDouble, ClipboardList, Users,
  ChevronDown, ChevronRight, ChevronLeft, LogOut, MoreHorizontal,
  Search, Download, Plus, RefreshCw, X,
  Zap, TrendingUp, Activity
} from "lucide-react";


const SvgDefs = () => (
  <svg width="0" height="0" style={{ position: "absolute" }}>
    <defs>
      <pattern id="hatchCyan" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="#00d8ff" strokeWidth="1.5" strokeOpacity="0.55" />
      </pattern>
      <pattern id="hatchBlue" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.55" />
      </pattern>
      <pattern id="hatchDental" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="5" stroke="#00d8ff" strokeWidth="1.5" strokeOpacity="0.7" />
      </pattern>
      <pattern id="hatchInternist" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="5" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.7" />
      </pattern>
      <pattern id="hatchNeuro" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="5" stroke="#7dd3fc" strokeWidth="1.5" strokeOpacity="0.7" />
      </pattern>
    </defs>
  </svg>
);

const GlassCard = ({ children, className = "", cyan = false }) => (
  <div className={`rounded-2xl border transition-all duration-300 ${cyan ? "bg-[#00d8ff] border-[#00d8ff]/30 shadow-[0_0_30px_rgba(0,216,255,0.25)]" : "bg-[#130f30]/80 border-white/[0.07] hover:border-white/[0.12] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"} ${className}`}>
    {children}
  </div>
);

const Avatar = ({ name, color = "#00d8ff", size = 8 }) => {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className={`${size === 7 ? "w-7 h-7 text-[10px]" : "w-8 h-8 text-xs"} rounded-full flex items-center justify-center font-bold shrink-0`}
      style={{ background: `${color}22`, border: `1px solid ${color}44`, color }}>
      {initials}
    </div>
  );
};

const Badge = ({ children, variant = "green" }) => {
  const s = { green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", yellow: "bg-yellow-400/90 text-yellow-900 border-yellow-500/30" };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${s[variant]}`}>{children}</span>;
};

const NavItem = ({ icon: Icon, label, active, badge, hasArrow, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${active ? "bg-[#00d8ff] text-[#08061a] shadow-[0_0_16px_rgba(0,216,255,0.35)]" : "text-slate-400 hover:text-white hover:bg-white/[0.06]"}`}>
    <Icon size={16} className={active ? "text-[#08061a]" : "text-slate-500 group-hover:text-white"} />
    <span className="flex-1 text-left">{label}</span>
    {badge && <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{badge}</span>}
    {hasArrow && <ChevronRight size={13} className={active ? "text-[#08061a]" : "text-slate-600"} />}
  </button>
);

const Sparkline = ({ color = "#00d8ff", pattern = "hatchCyan", height = 32 }) => {
  const pts = [8, 28, 14, 32, 10, 35, 18, 22, 30, 16, 38, 20, 36, 24];
  const w = 110, h = height;
  const mn = Math.min(...pts), mx = Math.max(...pts);
  const sy = v => h - ((v - mn) / (mx - mn)) * (h - 4) - 2;
  const coords = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${sy(v)}`).join(" ");
  const area = `M0,${h} L${coords.split(" ").join(" L")} L${w},${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <path d={area} fill={`url(#${pattern})`} opacity="0.7" />
      <polyline points={coords} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const MiniBarChart = ({ pattern = "hatchCyan", dark = false }) => {
  const hs = [35, 60, 45, 75, 55];
  return (
    <svg width="90" height="52" viewBox="0 0 90 52">
      {hs.map((h, i) => (
        <g key={i}>
          <rect x={i * 19 + 1} y={52 - h} width={15} height={h} rx={3} fill={dark ? "rgba(8,6,26,0.25)" : `url(#${pattern})`} />
          {dark && <rect x={i * 19 + 1} y={52 - h} width={15} height={h} rx={3} fill={`url(#${pattern})`} opacity="0.6" />}
        </g>
      ))}
    </svg>
  );
};

const DonutChart = () => {
  const cx = 70, cy = 70, r = 52, sw = 22;
  const circ = 2 * Math.PI * r;
  const total = 534;
  const segs = [
    { v: 120, pat: "hatchDental", col: "#00d8ff", off: 0 },
    { v: 249, pat: "hatchInternist", col: "#8b5cf6", off: 120 },
    { v: 165, pat: "hatchNeuro", col: "#7dd3fc", off: 369 },
  ];
  return (
    <svg width={140} height={140} viewBox="0 0 140 140">
      <defs>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a153d" strokeWidth={sw} />
      {segs.map((seg, i) => {
        const dash = (seg.v / total) * circ, gap = circ - dash;
        const rot = (seg.off / total) * 360 - 90;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={`url(#${seg.pat})`} strokeWidth={sw} strokeDasharray={`${dash} ${gap}`} strokeDashoffset={0} transform={`rotate(${rot} ${cx} ${cy})`} filter="url(#glow2)" />
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={seg.col} strokeWidth={1} strokeDasharray={`${dash} ${gap}`} strokeDashoffset={0} transform={`rotate(${rot} ${cx} ${cy})`} opacity="0.4" />
          </g>
        );
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Plus Jakarta Sans">Total patient</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="Plus Jakarta Sans">500</text>
    </svg>
  );
};

const PatientChart = ({ showTip }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const vals = [55, 40, 85, 60, 45, 70, 38];
  const maxH = 110;
  return (
    <div className="relative">
      <svg width="100%" height={160} viewBox="0 0 520 160" preserveAspectRatio="none" className="overflow-visible">
        {[0, 1, 2, 3, 4].map(i => <line key={i} x1="0" y1={i * 32} x2="520" y2={i * 32} stroke="#ffffff07" strokeWidth="1" />)}
        {vals.map((v, i) => {
          const x = i * 72 + 16, bh = (v / 100) * maxH, y = maxH + 28 - bh;
          return (
            <g key={i}>
              <rect x={x} y={y} width={38} height={bh} rx={5} fill="url(#hatchCyan)" />
              <rect x={x} y={y} width={38} height={bh} rx={5} fill="none" stroke="#00d8ff" strokeWidth="0.7" opacity="0.3" />
              {i === 2 && showTip && <rect x={x - 2} y={y - 2} width={42} height={bh + 4} rx={5} fill="#00d8ff" fillOpacity="0.08" stroke="#00d8ff" strokeWidth="1" />}
            </g>
          );
        })}
      </svg>
      <div className="flex justify-around mt-1 px-2">
        {months.map(m => <span key={m} className="text-[11px] text-slate-500 font-medium">{m}</span>)}
      </div>
      {showTip && (
        <div className="absolute top-0 left-[200px] z-10">
          <div className="bg-[#1a153d] border border-[#00d8ff]/25 rounded-xl p-3 shadow-[0_4px_24px_rgba(0,0,0,0.5)] w-48">
            <p className="text-[11px] text-slate-400 mb-2 font-medium">Mar 12, 2024</p>
            <div className="space-y-1.5">
              {[{label:"Avg. Outpatient",val:"500",color:"#8b5cf6"},{label:"Avg. Hospitalized",val:"$17,363",color:"#7dd3fc"},{label:"Total patients",val:"$9,600",color:"#00d8ff"}].map(row => (
                <div key={row.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                    <span className="text-[10px] text-slate-400">{row.label}</span>
                  </div>
                  <span className="text-[11px] text-white font-semibold">{row.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ml-6 w-px h-4 bg-[#00d8ff]/40" />
        </div>
      )}
    </div>
  );
};

const CalendarWidget = () => {
  const [showPopup, setShowPopup] = useState(true);
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dates = [30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"><ChevronLeft size={14} className="text-slate-400" /></button>
        <span className="text-sm font-semibold text-white">February 2024</span>
        <button className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"><ChevronRight size={14} className="text-slate-400" /></button>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map(d => <div key={d} className="text-center text-[9px] font-bold text-slate-600 py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {dates.map((d, i) => {
          const hi = d === 8 && i >= 7, prev = i < 2;
          return (
            <div key={i} className="relative">
              <button onClick={() => hi && setShowPopup(!showPopup)}
                className={`w-full aspect-square flex items-center justify-center text-xs rounded-lg font-medium transition-all duration-200 ${hi ? "bg-gradient-to-br from-[#3b82f6] to-[#00d8ff] text-white shadow-[0_0_12px_rgba(0,216,255,0.4)] scale-105" : prev ? "text-slate-700 hover:bg-white/5" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>
                {d}
              </button>
              {hi && showPopup && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-30 w-48">
                  <div className="bg-[#1a153d] border border-[#00d8ff]/25 rounded-xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-semibold text-white">Activity Detail</span>
                      <button onClick={() => setShowPopup(false)} className="text-slate-500 hover:text-white transition-colors"><X size={11} /></button>
                    </div>
                    <div className="space-y-2">
                      {[{label:"DR. Benu Appointment",time:"11:00am",color:"#00d8ff"},{label:"Dentist Meetup",time:"3:00pm",color:"#8b5cf6"},{label:"Albert Edisen",time:"4:00pm",color:"#3b82f6"}].map((item, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: item.color }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-white font-medium leading-tight truncate">{item.label}</p>
                            <p className="text-[9px] text-slate-500">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-2.5 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg bg-[#00d8ff]/10 hover:bg-[#00d8ff]/20 border border-[#00d8ff]/20 text-[10px] text-[#00d8ff] font-semibold transition-colors">
                      <Plus size={10} /> Add Item
                    </button>
                  </div>
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a153d] border-t border-l border-[#00d8ff]/25 rotate-45" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CRM = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [showTip, setShowTip] = useState(true);
  const mainMenu = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: MessageSquare, label: "Message", badge: "10" },
    { icon: Calendar, label: "Schedule" },
    { icon: Bell, label: "Notification", badge: "12" },
    { icon: CreditCard, label: "Transaction", hasArrow: true },
  ];
  const mgmt = [
    { icon: Stethoscope, label: "Doctor" },
    { icon: Pill, label: "Medicine" },
    { icon: BedDouble, label: "Bedroom" },
    { icon: ClipboardList, label: "Appointment" },
    { icon: Users, label: "Patient" },
  ];
  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: "linear-gradient(135deg,#08061a 0%,#0d0a26 60%,#130f30 100%)", fontFamily: "'Plus Jakarta Sans',Inter,system-ui,sans-serif" }}>
      <SvgDefs />
      <aside className="w-[220px] shrink-0 flex flex-col h-screen sticky top-0 border-r border-white/[0.05] bg-[#0d0a26]/90 backdrop-blur-xl">
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/[0.05]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00d8ff] to-[#3b82f6] flex items-center justify-center shadow-[0_0_16px_rgba(0,216,255,0.4)]">
            <Zap size={14} className="text-[#08061a]" fill="currentColor" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-black text-white tracking-widest leading-none">HYNABIZ</p>
            <p className="text-[9px] text-[#00d8ff]/70 tracking-widest font-semibold">CRM</p>
          </div>
          <button className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
            <ChevronLeft size={12} className="text-slate-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5" style={{ scrollbarWidth: "none" }}>
          <div>
            <p className="text-[9px] text-slate-600 font-bold tracking-[0.15em] uppercase mb-2 px-1">Main Menu</p>
            <div className="space-y-0.5">
              {mainMenu.map(item => (
                <NavItem key={item.label} icon={item.icon} label={item.label} active={activeNav === item.label} badge={item.badge} hasArrow={item.hasArrow} onClick={() => setActiveNav(item.label)} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[9px] text-slate-600 font-bold tracking-[0.15em] uppercase mb-2 px-1">Management</p>
            <div className="space-y-0.5">
              {mgmt.map(item => (
                <NavItem key={item.label} icon={item.icon} label={item.label} active={activeNav === item.label} onClick={() => setActiveNav(item.label)} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-yellow-500/20 p-3" style={{ background: "linear-gradient(135deg,rgba(234,179,8,0.1),rgba(249,115,22,0.05))" }}>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="yellow">Pro</Badge>
              <button className="text-slate-500 hover:text-white transition-colors"><MoreHorizontal size={14} /></button>
            </div>
            <p className="text-sm font-bold text-white mb-0.5">Pssst!</p>
            <p className="text-[11px] text-slate-400 leading-snug mb-3">your subscription will expire soon</p>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 rounded-full bg-[#00d8ff] text-[#08061a] text-[11px] font-bold hover:shadow-[0_0_12px_rgba(0,216,255,0.4)] transition-all">Renew</button>
              <button className="flex-1 py-1.5 rounded-full border border-white/15 text-[11px] text-slate-400 hover:bg-white/5 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
        <div className="px-3 py-3 border-t border-white/[0.05] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-[#08061a] shrink-0" style={{ background: "linear-gradient(135deg,#00d8ff,#3b82f6)" }}>MC</div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-white leading-tight truncate">Medicore</p>
            <p className="text-[10px] text-slate-500">Admin</p>
          </div>
          <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
            <LogOut size={13} />
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0d0a26]/80 backdrop-blur-xl border-b border-white/[0.05]">
          <div>
            <h1 className="text-base font-semibold text-white leading-tight">Hey Darrell, glad to have you back! 👋</h1>
            <p className="text-[11px] text-slate-500 mt-0.5">Thursday, Oct 1, 2026</p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-white/[0.12] transition-colors w-44">
              <Search size={13} className="text-slate-500 shrink-0" />
              <span className="text-[12px] text-slate-500 flex-1">Search</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-500 font-mono">K</span>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-white/[0.12] text-[12px] text-slate-300 font-medium transition-all hover:text-white">
              <Download size={13} /> Export CSV
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#00d8ff] text-[#08061a] text-[12px] font-bold shadow-[0_0_16px_rgba(0,216,255,0.3)] hover:shadow-[0_0_24px_rgba(0,216,255,0.5)] hover:scale-[1.02] transition-all">
              <Plus size={13} /> Add new
            </button>
          </div>
        </header>
        <div className="p-5 space-y-5">
          <div className="grid grid-cols-4 gap-4">
            <GlassCard cyan className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(8,6,26,0.2)" }}>
                    <Stethoscope size={14} className="text-[#08061a]" />
                  </div>
                  <span className="text-[11px] font-semibold" style={{ color: "rgba(8,6,26,0.8)" }}>Total doctors</span>
                </div>
                <button style={{ color: "rgba(8,6,26,0.5)" }}><MoreHorizontal size={14} /></button>
              </div>
              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-3xl font-black leading-none" style={{ color: "#08061a" }}>300+</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <TrendingUp size={10} style={{ color: "rgba(8,6,26,0.6)" }} />
                    <span className="text-[10px] font-bold" style={{ color: "rgba(8,6,26,0.7)" }}>+ 2.5%</span>
                  </div>
                </div>
                <MiniBarChart pattern="hatchCyan" dark />
              </div>
              <p className="text-[10px] leading-snug" style={{ color: "rgba(8,6,26,0.6)" }}>Increase in data by 500 inpatients in the last 7 days</p>
            </GlassCard>
            <GlassCard className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#00d8ff]/10 flex items-center justify-center"><Calendar size={14} className="text-[#00d8ff]" /></div>
                  <span className="text-[11px] font-semibold text-slate-300">Book appointment</span>
                </div>
                <button className="text-slate-600 hover:text-slate-400"><MoreHorizontal size={14} /></button>
              </div>
              <p className="text-2xl font-black text-white leading-none">15.140</p>
              <div className="flex items-center gap-1 mt-1 mb-2"><Badge variant="green"><TrendingUp size={9} />+ 3.5%</Badge></div>
              <p className="text-[10px] text-slate-500 mb-2 leading-snug">Data for the last 7 days; 5,231 to 8,323 visitors</p>
              <div className="flex items-end justify-between">
                <Sparkline color="#00d8ff" pattern="hatchCyan" height={32} />
                <span className="text-[10px] text-[#00d8ff] font-semibold">1.435 today</span>
              </div>
            </GlassCard>
            <GlassCard className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center"><BedDouble size={14} className="text-[#8b5cf6]" /></div>
                  <span className="text-[11px] font-semibold text-slate-300">Room availability</span>
                </div>
                <button className="text-slate-600 hover:text-slate-400"><MoreHorizontal size={14} /></button>
              </div>
              <p className="text-2xl font-black text-white leading-none">15.140</p>
              <div className="flex items-center gap-1 mt-1 mb-3"><Badge variant="green"><TrendingUp size={9} />+ 500</Badge></div>
              <div className="space-y-2">
                {[{label:"General room",val:100,color:"#00d8ff",pct:80},{label:"Private Room",val:75,color:"#8b5cf6",pct:60}].map(room => (
                  <div key={room.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-slate-400">{room.label}</span>
                      <span className="text-[10px] text-white font-semibold">{room.val}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${room.pct}%`, background: `linear-gradient(90deg,${room.color}88,${room.color})` }} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center"><Users size={14} className="text-[#3b82f6]" /></div>
                  <span className="text-[11px] font-semibold text-slate-300">Overall visitor</span>
                </div>
                <button className="text-slate-600 hover:text-slate-400"><MoreHorizontal size={14} /></button>
              </div>
              <p className="text-2xl font-black text-white leading-none">1.140</p>
              <div className="flex items-center gap-1 mt-1 mb-2"><Badge variant="green"><TrendingUp size={9} />+ 3.5%</Badge></div>
              <p className="text-[10px] text-slate-500 mb-2 leading-snug">Top 3 most in-demand clinics compared with last month</p>
              <div className="flex items-end justify-between">
                <Sparkline color="#3b82f6" pattern="hatchBlue" height={32} />
                <span className="text-[10px] text-[#3b82f6] font-semibold">1.000 today</span>
              </div>
            </GlassCard>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <GlassCard className="col-span-2 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-white mb-2">Patient overview</h2>
                  <div className="flex items-center gap-4">
                    {[{label:"Total patients",color:"#00d8ff"},{label:"Avg. Hospitalized patients",color:"#7dd3fc"},{label:"Avg. Outpatient care",color:"#8b5cf6"}].map(l => (
                      <div key={l.label} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                        <span className="text-[10px] text-slate-400">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 hover:border-white/20 transition-colors">Last 30 days <ChevronDown size={11} className="text-slate-500" /></button>
                  <button className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/20 transition-colors"><RefreshCw size={12} className="text-slate-400" /></button>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col justify-between text-right py-1 shrink-0">
                  {["$100,000","$75,000","$50,000","$25,000","$0"].map(v => <span key={v} className="text-[9px] text-slate-600">{v}</span>)}
                </div>
                <div className="flex-1 relative"><PatientChart showTip={showTip} /></div>
                <div className="flex flex-col justify-between py-1 shrink-0">
                  {["40%","30%","20%","10%","0%"].map(v => <span key={v} className="text-[9px] text-slate-600">{v}</span>)}
                </div>
              </div>
              <button onClick={() => setShowTip(!showTip)} className="mt-3 text-[10px] text-slate-500 hover:text-[#00d8ff] transition-colors flex items-center gap-1">
                <Activity size={10} /> {showTip ? "Hide" : "Show"} tooltip
              </button>
            </GlassCard>
            <GlassCard className="p-5">
              <h2 className="text-sm font-bold text-white mb-4">Schedule</h2>
              <CalendarWidget />
            </GlassCard>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">Top 3 most requested clinics</h3>
                <button className="text-slate-600 hover:text-slate-400 transition-colors"><MoreHorizontal size={14} /></button>
              </div>
              <div className="flex justify-center mb-4"><DonutChart /></div>
              <div className="space-y-2">
                {[{count:120,label:"Dental",color:"#00d8ff"},{count:249,label:"Internist",color:"#8b5cf6"},{count:165,label:"Neurologist",color:"#7dd3fc"}].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[11px] text-slate-400">{item.label}</span>
                    </div>
                    <span className="text-[11px] text-white font-semibold">{item.count}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">Doctor schedule</h3>
                <button className="text-slate-600 hover:text-slate-400 transition-colors"><MoreHorizontal size={14} /></button>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[{label:"Available",count:45,color:"#00d8ff"},{label:"Unavailable",count:25,color:"#f43f5e"},{label:"Leave",count:15,color:"#f59e0b"}].map(s => (
                  <div key={s.label} className="bg-white/[0.03] rounded-xl p-2.5 border border-white/[0.06] text-center">
                    <p className="text-lg font-black" style={{ color: s.color }}>{s.count}</p>
                    <p className="text-[9px] text-slate-500 font-medium">{s.label}</p>
                    <p className="text-[8px] text-slate-600">Total</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-[11px] text-slate-400 font-semibold">List of Doctor</span>
                <ChevronDown size={12} className="text-slate-500" />
              </div>
              <div className="space-y-2.5">
                {[{name:"Lutfi Steven",spec:"Anesthesiology",status:"Available",color:"#00d8ff"},{name:"Nasrul Sirli",spec:"Cardiology",status:"Unavailable",color:"#f43f5e"},{name:"Albert Etsen",spec:"Cardiology",status:"Available",color:"#3b82f6"}].map((doc, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Avatar name={doc.name} color={doc.color} size={8} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-white font-semibold truncate">{doc.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{doc.spec}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${doc.status === "Available" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" : "bg-rose-500/15 text-rose-400 border-rose-500/20"}`}>{doc.status}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">Appointment</h3>
                <button className="text-slate-600 hover:text-slate-400 transition-colors"><MoreHorizontal size={14} /></button>
              </div>
              <div className="space-y-3">
                {[{name:"Esther Howard",dept:"Poly dental",color:"#00d8ff"},{name:"Arlene McCoy",dept:"Psychiatrist",color:"#8b5cf6"},{name:"Guy Hawkins",dept:"Internist",color:"#3b82f6"},{name:"Courtney Henry",dept:"Ophtahalmologist",color:"#f59e0b"},{name:"Courtney Henry",dept:"Ophtahalmologist",color:"#f43f5e"}].map((apt, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Avatar name={apt.name} color={apt.color} size={8} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-white font-semibold truncate">{apt.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{apt.dept}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-[#00d8ff]/80 font-medium">Today</p>
                      <p className="text-[9px] text-slate-600">09:40</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-[#00d8ff]/20 text-[11px] text-slate-400 hover:text-white font-medium transition-all flex items-center justify-center gap-1.5">
                <Plus size={12} /> View all appointments
              </button>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CRM;
