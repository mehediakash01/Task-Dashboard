import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, CheckSquare, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const FloatingShape = ({ className, delay = 0 }) => (
  <motion.div
    className={className}
    animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
)

export default function LoginPage() {
  const [email, setEmail] = useState('user1@example.com')
  const [password, setPassword] = useState('password123')
  const [showPass, setShowPass] = useState(false)
  const [focusField, setFocusField] = useState(null)
  const { login, loading, error, setError } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const result = await login(email, password)
    if (result.success) navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex overflow-hidden bg-surface-950">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-800 via-surface-800 to-surface-950" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
          </div>
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Floating task cards */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FloatingShape delay={0} className="absolute top-32 right-16">
            <div className="glass-dark rounded-2xl p-4 w-56 shadow-card-dark">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-brand-500/30 flex items-center justify-center">
                  <CheckSquare size={14} className="text-brand-300" />
                </div>
                <span className="text-white/80 text-sm font-medium">Design Review</span>
              </div>
              <div className="flex gap-1 mb-2">
                {['bg-purple-400', 'bg-brand-400', 'bg-cyan-400'].map((c, i) => (
                  <div key={i} className={`h-1.5 rounded-full ${c} ${i === 0 ? 'flex-[2]' : 'flex-1'}`} />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {['bg-pink-400', 'bg-amber-400', 'bg-teal-400'].map((c, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full ${c} border-2 border-surface-800`} />
                  ))}
                </div>
                <span className="text-white/40 text-xs">Due tomorrow</span>
              </div>
            </div>
          </FloatingShape>

          <FloatingShape delay={1.5} className="absolute bottom-40 left-12">
            <div className="glass-dark rounded-2xl p-4 w-52 shadow-card-dark">
              <div className="text-white/50 text-xs mb-1 font-display">COMPLETED TODAY</div>
              <div className="text-3xl font-display font-bold text-white">12 <span className="text-brand-400 text-lg">/ 15</span></div>
              <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-400 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '80%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
            </div>
          </FloatingShape>

          <FloatingShape delay={3} className="absolute top-1/2 left-8 -translate-y-1/2">
            <div className="glass-dark rounded-2xl p-3 shadow-card-dark">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <div className="text-green-400 text-lg">✓</div>
                </div>
                <div>
                  <div className="text-white/80 text-sm font-medium">API Integration</div>
                  <div className="text-green-400 text-xs">Completed</div>
                </div>
              </div>
            </div>
          </FloatingShape>
        </div>

        {/* Bottom branding */}
        <div className="absolute bottom-12 left-12 right-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="font-display text-4xl font-bold text-white mb-3">
              Stay on top of<br />
              <span className="text-gradient">every task.</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              A powerful workspace to organize, track, and deliver your projects with clarity and confidence.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT PANEL — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white relative">
        <div className="absolute inset-0 mesh-bg" />

        <motion.div
          className="w-full max-w-md relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow">
              <CheckSquare size={20} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold text-surface-900">TaskFlow</span>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-surface-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm">Sign in to your workspace to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <div className={`relative flex items-center rounded-xl border-2 transition-all duration-200 bg-slate-50 ${
                focusField === 'email'
                  ? 'border-brand-500 shadow-glow-sm bg-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <Mail size={16} className={`absolute left-4 ${focusField === 'email' ? 'text-brand-500' : 'text-gray-400'} transition-colors`} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusField('email')}
                  onBlur={() => setFocusField(null)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <button type="button" className="text-brand-600 text-xs font-medium hover:text-brand-700 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className={`relative flex items-center rounded-xl border-2 transition-all duration-200 bg-slate-50 ${
                focusField === 'password'
                  ? 'border-brand-500 shadow-glow-sm bg-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <Lock size={16} className={`absolute left-4 ${focusField === 'password' ? 'text-brand-500' : 'text-gray-400'} transition-colors`} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusField('password')}
                  onBlur={() => setFocusField(null)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span className="text-red-600 text-sm">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-glow hover:shadow-glow disabled:opacity-60 disabled:cursor-not-allowed transition-shadow duration-200"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Signing in...</>
              ) : (
                <>Sign in <ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-xs text-gray-400">
              Demo: <span className="font-medium text-gray-600">user1@example.com</span> / <span className="font-medium text-gray-600">password123</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}