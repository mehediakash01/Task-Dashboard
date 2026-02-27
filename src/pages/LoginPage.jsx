import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2, CheckCircle2, Zap, Users, ArrowUpRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

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
    <div className="min-h-screen flex overflow-hidden bg-[#efefef]">
      {/* LEFT PANEL — Features */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#1a5c38] via-[#145030] to-[#0f3d23]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-[#25a060]/10 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-0 w-80 h-80 bg-[#1a5c38]/20 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <CheckCircle2 size={24} className="text-white" />
            </div>
            <span className="font-bold text-2xl text-white">Donezo</span>
          </motion.div>

          {/* Features */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/20">
                <CheckCircle2 size={24} className="text-[#25a060]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Organize Tasks</h3>
                <p className="text-white/60 text-sm">Keep all your tasks in one place with powerful organization tools.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/20">
                <Zap size={24} className="text-[#25a060]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Boost Productivity</h3>
                <p className="text-white/60 text-sm">Track progress and meet deadlines with intelligent insights.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/20">
                <Users size={24} className="text-[#25a060]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Collaborate</h3>
                <p className="text-white/60 text-sm">Work seamlessly with your team in real-time across the workspace.</p>
              </div>
            </motion.div>
          </div>

          {/* Bottom stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10"
          >
            <div>
              <div className="text-2xl font-bold text-white">2.5K+</div>
              <div className="text-xs text-white/60 mt-1">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">15K+</div>
              <div className="text-xs text-white/60 mt-1">Tasks Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-xs text-white/60 mt-1">Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT PANEL — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 lg:px-8">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#1a5c38] flex items-center justify-center">
              <CheckCircle2 size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl text-[#1a1a1a]">Donezo</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-2">Welcome back</h1>
            <p className="text-gray-500 text-sm">Sign in to your workspace to continue your productivity journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className={`relative flex items-center rounded-xl border-2 transition-all duration-200 ${
                  focusField === 'email'
                    ? 'border-[#1a5c38] bg-white shadow-lg shadow-[#1a5c38]/10'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <Mail size={16} className={`absolute left-4 transition-colors ${focusField === 'email' ? 'text-[#1a5c38]' : 'text-gray-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusField('email')}
                  onBlur={() => setFocusField(null)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                />
              </motion.div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <button type="button" className="text-[#1a5c38] text-xs font-medium hover:text-[#145030] transition-colors">
                  Forgot?
                </button>
              </div>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className={`relative flex items-center rounded-xl border-2 transition-all duration-200 ${
                  focusField === 'password'
                    ? 'border-[#1a5c38] bg-white shadow-lg shadow-[#1a5c38]/10'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <Lock size={16} className={`absolute left-4 transition-colors ${focusField === 'password' ? 'text-[#1a5c38]' : 'text-gray-400'}`} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusField('password')}
                  onBlur={() => setFocusField(null)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 sm:py-3.5 bg-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </motion.div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200"
                >
                  <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className="text-red-600 text-sm">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 sm:py-3.5 rounded-full bg-[#1a5c38] hover:bg-[#145030] active:bg-[#0f3d23] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#1a5c38]/20 hover:shadow-xl hover:shadow-[#1a5c38]/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Signing in</>
              ) : (
                <>Sign in <ArrowRight size={18} /></>
              )}
            </motion.button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              <span className="block mb-2">Demo credentials:</span>
              <span className="font-medium text-gray-700">user1@example.com</span>
              <span className="text-gray-400"> / </span>
              <span className="font-medium text-gray-700">password123</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}