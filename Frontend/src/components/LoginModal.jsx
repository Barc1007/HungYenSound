"use client"

import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { useUser } from "../context/UserContext"

export default function LoginModal({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login, clearError } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    clearError()

    try {
      const result = await login(email, password)
      if (result.success) {
        onClose()
        setEmail("")
        setPassword("")
      } else {
        setError(result.error)
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl p-8 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-slate-300 mt-2">Sign in to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10 disabled:opacity-50"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="text-slate-400 w-4 h-4" />
                ) : (
                  <Eye className="text-slate-400 w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-600 rounded bg-slate-700"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-300">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-orange-400 hover:text-orange-300">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-orange-400 hover:text-orange-300 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
