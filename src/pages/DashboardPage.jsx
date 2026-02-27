import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Mail, Bell, ArrowUpRight, Plus, Video,
  Menu, ChevronRight, Pause, Square
} from 'lucide-react'
import { useAuth, API_BASE } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'

/* ─── helpers ─────────────────────────────────────────── */
const API = API_BASE

function Sk({ w = 'w-full', h = 'h-4', r = 'rounded-lg', className = '' }) {
  return <div className={`skeleton ${w} ${h} ${r} ${className}`} />
}

function useTimer() {
  const [running, setRunning] = useState(true)
  const [secs, setSecs] = useState(5048) // 01:24:08
  const ref = useRef()
  useEffect(() => {
    if (running) ref.current = setInterval(() => setSecs(s => s + 1), 1000)
    else clearInterval(ref.current)
    return () => clearInterval(ref.current)
  }, [running])
  const h = String(Math.floor(secs / 3600)).padStart(2, '0')
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return { time: `${h}:${m}:${s}`, running, setRunning, reset: () => setSecs(0) }
}

/* ─── Bar chart matching Donezo analytics bar shape ───── */
function AnalyticsBar({ day, height, filled, highlighted, index }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
      transition={{ delay: 0.05 * index, duration: 0.5, ease: [0.22,1,0.36,1] }}
      style={{ transformOrigin: 'bottom' }}
      className="flex flex-col items-center gap-2 flex-1"
    >
      <div className="relative w-full flex items-end justify-center" style={{ height: 120 }}>
        <div
          className="w-full rounded-full relative overflow-hidden"
          style={{ height: `${height}%` }}
        >
          {filled ? (
            <div className={`absolute inset-0 rounded-full ${highlighted ? 'bg-[#25a060]' : 'bg-[#1a5c38]'}`} />
          ) : (
            <div className="absolute inset-0 rounded-full hatch border border-[#c5dece]" />
          )}
          {highlighted && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1a5c38] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
              {height}%
            </div>
          )}
        </div>
      </div>
      <span className="text-[11px] text-gray-400 font-medium">{day}</span>
    </motion.div>
  )
}

/* ─── Progress semicircle ──────────────────────────────── */
function SemiCircleProgress({ pct = 41 }) {
  const r = 80
  const cx = 110
  const cy = 110
  const circumference = Math.PI * r
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="relative flex flex-col items-center">
      <svg width={220} height={120} viewBox="0 0 220 120">
        {/* BG arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke="#e5e5e5" strokeWidth="18" strokeLinecap="round"
        />
        {/* Completed green */}
        <motion.path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke="#1a5c38" strokeWidth="18" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * 0.55 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
        />
        {/* In progress light green dot area */}
        <motion.path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke="#25a060" strokeWidth="18" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * 0.82 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
        />
      </svg>
      <div className="absolute bottom-0 text-center">
        <div className="text-4xl font-bold text-[#1a1a1a]">{pct}%</div>
        <div className="text-xs text-gray-400 mt-0.5">Project Ended</div>
      </div>
    </div>
  )
}

/* ─── Status badge ─────────────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    completed: 'bg-green-100 text-green-700',
    'in progress': 'bg-orange-100 text-orange-600',
    'in-progress': 'bg-orange-100 text-orange-600',
    pending: 'bg-yellow-100 text-yellow-700',
    todo: 'bg-gray-100 text-gray-500',
  }
  const s = status?.toLowerCase() || 'todo'
  const label = s === 'in-progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${map[s] || map.todo}`}>
      {label}
    </span>
  )
}

const PROJECT_ICONS = [
  { bg: 'bg-blue-100', color: 'text-blue-500', emoji: '⚡' },
  { bg: 'bg-cyan-100', color: 'text-cyan-500', emoji: '🌊' },
  { bg: 'bg-green-100', color: 'text-green-600', emoji: '🛠' },
  { bg: 'bg-orange-100', color: 'text-orange-500', emoji: '⚙️' },
  { bg: 'bg-purple-100', color: 'text-purple-500', emoji: '🔮' },
]

const TEAM_MOCK = [
  { name: 'Alexandra Deff', task: 'Github Project Repository', status: 'completed', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra' },
  { name: 'Edwin Adenike', task: 'Integrate User Authentication System', status: 'in-progress', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Edwin' },
  { name: 'Isaac Oluwatemilorun', task: 'Develop Search and Filter Functionality', status: 'pending', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isaac' },
  { name: 'David Oshodi', task: 'Responsive Layout for Homepage', status: 'in-progress', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
]

const WEEK_BARS = [
  { day: 'S', height: 30, filled: false },
  { day: 'M', height: 55, filled: true },
  { day: 'T', height: 74, filled: true, highlighted: true },
  { day: 'W', height: 88, filled: true },
  { day: 'T', height: 42, filled: false },
  { day: 'F', height: 35, filled: false },
  { day: 'S', height: 25, filled: false },
]

/* ════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const { user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [overview, setOverview] = useState(null)
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const timer = useTimer()

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const headers = { 'Content-Type': 'application/json' }
        if (user?.token) headers['Authorization'] = `Bearer ${user.token}`

        const [ovRes, prRes, usRes] = await Promise.all([
          fetch(`${API}/api/overview`, { headers }),
          fetch(`${API}/api/products`, { headers }),
          fetch(`${API}/api/users`, { headers }),
        ])

        if (ovRes.ok) setOverview(await ovRes.json())
        if (prRes.ok) {
          const d = await prRes.json()
          setProducts(Array.isArray(d) ? d : d.products || [])
        }
        if (usRes.ok) {
          const d = await usRes.json()
          setUsers(Array.isArray(d) ? d : d.users || [])
        }
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    fetchAll()
  }, [user?.token])

  // Derive stats from API or fallback
  const totalProjects = overview?.totalProjects ?? overview?.total ?? products.length ?? 24
  const endedProjects  = overview?.endedProjects  ?? overview?.ended   ?? Math.round(totalProjects * 0.42)
  const runningProjects= overview?.runningProjects?? overview?.running  ?? Math.round(totalProjects * 0.5)
  const pendingProjects= overview?.pendingProjects ?? overview?.pending  ?? totalProjects - endedProjects - runningProjects

  const projectList = products.length > 0
    ? products.slice(0, 5).map((p, i) => ({
        name: p.name || p.title || `Project ${i+1}`,
        due: p.dueDate || p.due_date || `Nov ${26 + i}, 2024`,
        icon: PROJECT_ICONS[i % PROJECT_ICONS.length],
      }))
    : [
        { name: 'Develop API Endpoints',    due: 'Nov 26, 2024', icon: PROJECT_ICONS[0] },
        { name: 'Onboarding Flow',          due: 'Nov 28, 2024', icon: PROJECT_ICONS[1] },
        { name: 'Build Dashboard',          due: 'Nov 30, 2024', icon: PROJECT_ICONS[2] },
        { name: 'Optimize Page Load',       due: 'Dec 5, 2024',  icon: PROJECT_ICONS[3] },
        { name: 'Cross-Browser Testing',    due: 'Dec 6, 2024',  icon: PROJECT_ICONS[4] },
      ]

  const teamMembers = users.length > 0
    ? users.slice(0, 4).map((u, i) => ({
        name: u.name || u.email?.split('@')[0] || `User ${i+1}`,
        task: u.currentTask || TEAM_MOCK[i % TEAM_MOCK.length].task,
        status: u.status || TEAM_MOCK[i % TEAM_MOCK.length].status,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name || u.email || i}`,
      }))
    : TEAM_MOCK

  const completionPct = overview?.completionRate
    ?? (totalProjects > 0 ? Math.round((endedProjects / totalProjects) * 100) : 41)

  return (
    <div className="flex h-screen bg-[#efefef] overflow-hidden font-sans">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Top bar ───────────────────────────────── */}
        <header className="flex-shrink-0 bg-white flex items-center gap-3 px-5 py-3.5 border-b border-gray-100">
          <button className="lg:hidden text-gray-500" onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 w-56 flex-shrink-0">
            <Search size={15} className="text-gray-400" />
            <span className="text-sm text-gray-400 flex-1">Search task</span>
            <span className="text-[11px] text-gray-300 font-medium bg-gray-100 px-1.5 py-0.5 rounded-md">⌘F</span>
          </div>

          <div className="flex-1" />

          {/* Icons */}
          <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
            <Mail size={18} className="text-gray-500" />
          </button>
          <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
            <Bell size={18} className="text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>

          {/* User */}
          <div className="flex items-center gap-2.5 ml-1">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-orange-300 to-pink-400">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} alt="avatar" className="w-full h-full" />
            </div>
            <div className="hidden md:block leading-tight">
              <div className="text-sm font-semibold text-gray-800">{user?.email?.split('@')[0] || 'Totok Michael'}</div>
              <div className="text-[11px] text-gray-400">{user?.email || 'tmichael20@mail.com'}</div>
            </div>
          </div>
        </header>

        {/* ── Scrollable body ───────────────────────── */}
        <main className="flex-1 overflow-y-auto p-5">

          {/* Page heading */}
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between mb-5 flex-wrap gap-3"
          >
            <div>
              <h1 className="text-3xl font-bold text-[#1a1a1a] tracking-tight">Dashboard</h1>
              <p className="text-sm text-gray-400 mt-0.5">Plan, prioritize, and accomplish your tasks with ease.</p>
            </div>
            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-2 bg-[#1a5c38] hover:bg-[#145030] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                <Plus size={16} />Add Project
              </button>
              <button className="flex items-center gap-2 border-2 border-[#1a1a1a] text-[#1a1a1a] text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                Import Data
              </button>
            </div>
          </motion.div>

          {/* ── STAT CARDS ROW ─── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {/* Total Projects — dark green card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-[#1a5c38] text-white rounded-2xl p-5 card-shadow col-span-1"
            >
              {loading ? (
                <>
                  <Sk w="w-28" h="h-3" className="bg-white/20 mb-4" />
                  <Sk w="w-16" h="h-10" className="bg-white/20 mb-3" />
                  <Sk w="w-36" h="h-3" className="bg-white/20" />
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-green-200">Total Projects</span>
                    <button className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <div className="text-5xl font-bold mb-3">{totalProjects}</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-green-300">
                    <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px]">↑</span>
                    Increased from last month
                  </div>
                </>
              )}
            </motion.div>

            {/* Ended */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 card-shadow"
            >
              {loading ? (
                <>
                  <Sk w="w-24" h="h-3" className="mb-4" />
                  <Sk w="w-14" h="h-10" className="mb-3" />
                  <Sk w="w-32" h="h-3" />
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">Ended Projects</span>
                    <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <ArrowUpRight size={14} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="text-5xl font-bold text-[#1a1a1a] mb-3">{endedProjects}</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[9px]">↑</span>
                    Increased from last month
                  </div>
                </>
              )}
            </motion.div>

            {/* Running */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-5 card-shadow"
            >
              {loading ? (
                <>
                  <Sk w="w-28" h="h-3" className="mb-4" />
                  <Sk w="w-14" h="h-10" className="mb-3" />
                  <Sk w="w-32" h="h-3" />
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">Running Projects</span>
                    <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <ArrowUpRight size={14} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="text-5xl font-bold text-[#1a1a1a] mb-3">{runningProjects}</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[9px]">↑</span>
                    Increased from last month
                  </div>
                </>
              )}
            </motion.div>

            {/* Pending */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 card-shadow"
            >
              {loading ? (
                <>
                  <Sk w="w-24" h="h-3" className="mb-4" />
                  <Sk w="w-10" h="h-10" className="mb-3" />
                  <Sk w="w-20" h="h-3" />
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">Pending Project</span>
                    <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <ArrowUpRight size={14} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="text-5xl font-bold text-[#1a1a1a] mb-3">{pendingProjects}</div>
                  <div className="text-[11px] text-gray-400">On Discuss</div>
                </>
              )}
            </motion.div>
          </div>

          {/* ── MIDDLE ROW ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">

            {/* Project Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="lg:col-span-1 bg-white rounded-2xl p-5 card-shadow"
            >
              <h2 className="font-semibold text-[#1a1a1a] mb-4">Project Analytics</h2>
              {loading ? (
                <div className="flex items-end gap-2 h-32">
                  {[60,80,90,70,50,40,30].map((h,i) => (
                    <div key={i} className="flex-1 rounded-full skeleton" style={{ height: `${h}%` }} />
                  ))}
                </div>
              ) : (
                <div className="flex items-end gap-1.5 h-32">
                  {WEEK_BARS.map((b, i) => (
                    <AnalyticsBar key={i} {...b} index={i} />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Reminders */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1 bg-white rounded-2xl p-5 card-shadow flex flex-col"
            >
              <h2 className="font-semibold text-[#1a1a1a] mb-4">Reminders</h2>
              {loading ? (
                <>
                  <Sk w="w-40" h="h-6" className="mb-2" />
                  <Sk w="w-48" h="h-4" className="mb-6" />
                  <Sk w="w-full" h="h-10" r="rounded-xl" />
                </>
              ) : (
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] leading-snug mb-1">Meeting with Arc<br/>Company</h3>
                    <p className="text-sm text-gray-400">Time : 02.00 pm – 04.00 pm</p>
                  </div>
                  <button className="mt-4 flex items-center justify-center gap-2 w-full bg-[#1a5c38] hover:bg-[#145030] text-white font-semibold text-sm py-3 rounded-xl transition-colors">
                    <Video size={16} />
                    Start Meeting
                  </button>
                </div>
              )}
            </motion.div>

            {/* Project List */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="lg:col-span-1 bg-white rounded-2xl p-5 card-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-[#1a1a1a]">Project</h2>
                <button className="flex items-center gap-1 text-xs font-medium border border-gray-200 rounded-full px-2.5 py-1 hover:bg-gray-50 transition-colors">
                  <Plus size={11} />New
                </button>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {Array(5).fill(0).map((_,i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Sk w="w-7" h="h-7" r="rounded-lg" />
                      <div className="flex-1 space-y-1.5">
                        <Sk w="w-32" h="h-3" />
                        <Sk w="w-20" h="h-2.5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {projectList.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.4 }}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <div className={`w-7 h-7 rounded-lg ${p.icon.bg} flex items-center justify-center text-sm flex-shrink-0`}>
                        {p.icon.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-[#1a1a1a] truncate group-hover:text-[#1a5c38] transition-colors">{p.name}</div>
                        <div className="text-[11px] text-gray-400">Due date: {p.due}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* ── BOTTOM ROW ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

            {/* Team Collaboration */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-1 bg-white rounded-2xl p-5 card-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-[#1a1a1a]">Team Collaboration</h2>
                <button className="flex items-center gap-1 text-xs font-medium border border-gray-200 rounded-full px-2.5 py-1 hover:bg-gray-50 transition-colors">
                  <Plus size={11} />Add Member
                </button>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {Array(4).fill(0).map((_,i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Sk w="w-9" h="h-9" r="rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Sk w="w-28" h="h-3" />
                        <Sk w="w-40" h="h-2.5" />
                      </div>
                      <Sk w="w-16" h="h-5" r="rounded-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {teamMembers.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 * i + 0.45 }}
                      className="flex items-center gap-3"
                    >
                      <img src={m.avatar} alt={m.name}
                        className="w-9 h-9 rounded-full flex-shrink-0 bg-gray-100"
                        onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=1a5c38&color=fff` }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-[#1a1a1a]">{m.name}</div>
                        <div className="text-[11px] text-gray-400 truncate">
                          Working on <span className="text-[#1a5c38] font-medium">{m.task}</span>
                        </div>
                      </div>
                      <StatusBadge status={m.status} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Project Progress */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="lg:col-span-1 bg-white rounded-2xl p-5 card-shadow flex flex-col"
            >
              <h2 className="font-semibold text-[#1a1a1a] mb-2">Project Progress</h2>
              {loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <Sk w="w-48" h="h-24" r="rounded-2xl" />
                </div>
              ) : (
                <>
                  <div className="flex justify-center flex-1">
                    <SemiCircleProgress pct={completionPct} />
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1a5c38]" />Completed
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#25a060]" />In Progress
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="w-3 h-3 rounded-sm hatch border border-[#aaa]" />Pending
                    </span>
                  </div>
                </>
              )}
            </motion.div>

            {/* Right column: Time Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-1 time-tracker-bg rounded-2xl p-5 card-shadow flex flex-col justify-between overflow-hidden relative"
            >
              {/* BG decoration */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-green-400/20 blur-3xl" />
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-green-600/20 blur-2xl" />
              </div>

              <div className="relative">
                <h2 className="font-semibold text-white mb-1">Time Tracker</h2>
                <p className="text-green-400/70 text-xs">Active session</p>
              </div>

              <div className="relative text-center py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={timer.time}
                    initial={{ opacity: 0.8, y: 1 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold text-white tracking-wider font-mono"
                  >
                    {timer.time}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative flex items-center justify-center gap-3">
                <button
                  onClick={() => timer.setRunning(r => !r)}
                  className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  {timer.running
                    ? <Pause size={18} className="text-white" />
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
                  }
                </button>
                <button
                  onClick={timer.reset}
                  className="w-11 h-11 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors"
                >
                  <Square size={14} className="text-white" fill="white" />
                </button>
              </div>
            </motion.div>
          </div>

        </main>
      </div>
    </div>
  )
}