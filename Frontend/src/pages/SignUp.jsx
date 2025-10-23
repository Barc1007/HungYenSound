"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Music, Eye, EyeOff } from "lucide-react"

export default function SignUp() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long")
      return
    }
    alert("Account created successfully! Redirecting to dashboard...")
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="max-w-md w-full bg-slate-800 rounded-xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Music className="text-orange-400 w-6 h-6" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-indigo-400">
              HungYenSound
            </span>
          </div>
          <h2 className="text-2xl font-bold">Create Your Account</h2>
          <p className="text-slate-300 mt-2">Join millions of music lovers today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Hung Yen Ngu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10"
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
            <p className="text-xs text-slate-400 mt-1">Must be at least 8 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="text-slate-400 w-4 h-4" />
                ) : (
                  <Eye className="text-slate-400 w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              required
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-600 rounded bg-slate-700"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-slate-300">
              I agree to the{" "}
              <a href="#" className="text-orange-400 hover:text-orange-300">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-orange-400 hover:text-orange-300">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium transition"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?
            <Link to="/" className="text-orange-400 hover:text-orange-300 font-medium ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
