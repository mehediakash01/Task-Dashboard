
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, CheckSquare, Calendar, BarChart2,
  Users, Settings, HelpCircle, LogOut, X, Smartphone
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: CheckSquare, label: 'Tasks', to: '/tasks', badge: '12+' },
  { icon: Calendar, label: 'Calendar', to: '/calendar' },
  { icon: BarChart2, label: 'Analytics', to: '/analytics' },
  { icon: Users, label: 'Team', to: '/team' },
]
const generalItems = [
  { icon: Settings, label: 'Settings', to: '/settings' },
  { icon: HelpCircle, label: 'Help', to: '/help' },
]

function SidebarContent({ onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const LinkItem = ({ item }) => (
    <NavLink
      to={item.to}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-150 relative group ${
          isActive
            ? 'bg-white text-[#1a5c38] font-semibold shadow-sm'
            : 'text-[#444] hover:bg-white/60 hover:text-[#1a5c38]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#1a5c38] rounded-r-full" />
          )}
          <item.icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <span className="text-[10px] font-bold bg-[#1a5c38] text-white px-1.5 py-0.5 rounded-full leading-none">
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  )

  return (
    <div className="flex flex-col h-full bg-[#f7f7f7] border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#1a5c38] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
              <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="2" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-xl text-[#1a1a1a] tracking-tight">Donezo</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Menu */}
      <div className="px-3 flex-1 overflow-y-auto">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">Menu</p>
        <nav className="space-y-0.5">
          {menuItems.map(item => <LinkItem key={item.to} item={item} />)}
        </nav>

        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2 mt-6">General</p>
        <nav className="space-y-0.5">
          {generalItems.map(item => <LinkItem key={item.to} item={item} />)}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#444] hover:bg-white/60 hover:text-red-500 transition-all w-full text-left"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Logout
          </button>
        </nav>
      </div>

      {/* Mobile App Banner */}
      <div className="mx-3 mb-4 rounded-2xl p-4 mobile-app-bg text-white overflow-hidden relative">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/5" />
        <div className="absolute right-2 top-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <Smartphone size={14} className="text-white/70" />
        </div>
        <p className="text-xs text-green-300 font-medium mb-1">Download our</p>
        <p className="font-bold text-base leading-tight mb-1">Mobile App</p>
        <p className="text-[11px] text-green-300/80 mb-3">Get easy in another way</p>
        <button className="w-full bg-[#1a5c38] hover:bg-[#145030] text-white text-xs font-semibold py-2 rounded-xl transition-colors">
          Download
        </button>
      </div>
    </div>
  )
}

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex w-[220px] flex-shrink-0 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed left-0 top-0 bottom-0 w-[220px] z-50 lg:hidden"
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}