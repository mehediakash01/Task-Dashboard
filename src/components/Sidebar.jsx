
import { motion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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
        `flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-150 relative group ${
          isActive
            ? 'bg-white text-[#1a5c38] font-semibold shadow-sm'
            : 'text-[#444] hover:bg-white/60 hover:text-[#1a5c38]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-6 bg-[#1a5c38] rounded-r-full" />
          )}
          <item.icon size={16} strokeWidth={isActive ? 2.2 : 1.8} className="shrink-0" />
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <span className="text-[9px] sm:text-[10px] font-bold bg-[#1a5c38] text-white px-1 sm:px-1.5 py-0.5 rounded-full leading-none shrink-0">
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
      <div className="flex items-center justify-between px-3 sm:px-5 py-4 sm:py-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#1a5c38] flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
              <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="2" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-lg sm:text-xl text-[#1a1a1a] tracking-tight">Donezo</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600 shrink-0">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Menu */}
      <div className="px-2 sm:px-3 flex-1 overflow-y-auto">
        <p className="text-[8px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 sm:px-2 mb-2">Menu</p>
        <nav className="space-y-0.5">
          {menuItems.map(item => <LinkItem key={item.to} item={item} />)}
        </nav>

        <p className="text-[8px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 sm:px-2 mb-2 mt-4 sm:mt-6">General</p>
        <nav className="space-y-0.5">
          {generalItems.map(item => <LinkItem key={item.to} item={item} />)}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm text-[#444] hover:bg-white/60 hover:text-red-500 transition-all w-full text-left"
          >
            <LogOut size={16} strokeWidth={1.8} className="shrink-0" />
            Logout
          </button>
        </nav>
      </div>

      {/* Mobile App Banner */}
      <div className="mx-2 sm:mx-3 mb-3 sm:mb-4 rounded-2xl p-3 sm:p-4 mobile-app-bg bg-[#1a5c38] text-white overflow-hidden relative">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/5" />
        <div className="absolute right-1 sm:right-2 top-1 sm:top-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center">
          <Smartphone size={14} className="text-white/70" />
        </div>
        <p className="text-[10px] sm:text-xs text-green-300 font-medium mb-0.5 sm:mb-1">Download our</p>
        <p className="font-bold text-sm sm:text-base leading-tight mb-1">Mobile App</p>
        <p className="text-[10px] sm:text-[11px] text-green-300/80 mb-2 sm:mb-3">Get easy in another way</p>
        <button className="w-full bg-[#145030] hover:bg-[#0e3d24] text-white text-xs sm:text-sm font-semibold py-2 rounded-xl transition-colors">
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
      <aside className="hidden lg:flex w-50 xl:w-55 shrink-0 flex-col h-screen sticky top-0">
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
              className="fixed left-0 top-0 bottom-0 w-60 xs:w-[260px] sm:w-80 z-50 lg:hidden"
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}