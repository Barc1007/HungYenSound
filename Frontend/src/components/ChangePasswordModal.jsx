"use client"

import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { useUser } from "../context/UserContext"

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { changePassword, clearError } = useUser()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    clearError()

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.newPassword.length < 8) {
      setError("New password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const result = await changePassword(formData.currentPassword, formData.newPassword)
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          onClose()
          setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
        }, 2000)
      } else {
        setError(result.error)
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setError("")
      setSuccess(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleClose}>
      <div className="bg-slate-800 rounded-xl p-8 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={handleClose} 
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-400 hover:text-white disabled:opacity-50"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Change Password</h2>
          <p className="text-slate-300 mt-2">Enter your current password and new password</p>
        </div>

        {success && (
          <div className="mb-4 bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-400 text-sm">
            Password changed successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Current Password</label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10 disabled:opacity-50"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
              >
                {showPasswords.current ? (
                  <EyeOff className="text-slate-400 w-4 h-4" />
                ) : (
                  <Eye className="text-slate-400 w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10 disabled:opacity-50"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
              >
                {showPasswords.new ? (
                  <EyeOff className="text-slate-400 w-4 h-4" />
                ) : (
                  <Eye className="text-slate-400 w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">Must be at least 8 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10 disabled:opacity-50"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="text-slate-400 w-4 h-4" />
                ) : (
                  <Eye className="text-slate-400 w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700/50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition"
            >
              {isLoading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}