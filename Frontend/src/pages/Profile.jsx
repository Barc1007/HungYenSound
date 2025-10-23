"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Edit2, Save, X, Mail, Calendar, Music, Users, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AudioPlayer from "../components/AudioPlayer"
import ChangePasswordModal from "../components/ChangePasswordModal"
import { useUser } from "../context/UserContext"

export default function Profile() {
  const { user, updateUser, logout } = useUser()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)

  useEffect(() => {
    setFormData(user)
  }, [user, isEditing])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    const result = await updateUser({
      name: formData.name,
      bio: formData.bio,
      favoriteGenre: formData.favoriteGenre
    })
    
    if (result.success) {
      setIsEditing(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }

  const handleCancel = () => {
    setFormData(user)
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen flex flex-col pb-32">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/" className="text-orange-400 hover:text-orange-300 transition flex items-center mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 bg-green-900/30 border border-green-600 text-green-300 px-4 py-3 rounded-lg flex items-center">
            <span>✓ Profile updated successfully!</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-slate-800/50 rounded-2xl p-8 mb-8">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
            <div className="flex-shrink-0">
              <img
                src={formData.avatar || "/placeholder.svg?height=128&width=128&query=user"}
                alt={formData.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-orange-600"
              />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="text-3xl font-bold bg-slate-700 text-white px-3 py-2 rounded-lg w-full mb-2"
                />
              ) : (
                <h2 className="text-3xl font-bold mb-2">{formData.name}</h2>
              )}
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="text-slate-300 bg-slate-700 text-white px-3 py-2 rounded-lg w-full"
                  rows="2"
                />
              ) : (
                <p className="text-slate-300 mb-4">{formData.bio}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-orange-400" />
                  Joined {formData.joinDate}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-orange-400" />
                  {formData.followersCount} followers
                </div>
              </div>
            </div>
            <div>
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 my-8"></div>

          {/* User Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Section */}
            <div>
              <label className="flex items-center text-slate-400 text-sm font-medium mb-2">
                <Mail className="w-4 h-4 mr-2 text-orange-400" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-orange-600 focus:outline-none transition"
                />
              ) : (
                <p className="text-white text-lg">{formData.email}</p>
              )}
            </div>

            {/* Favorite Genre Section */}
            <div>
              <label className="flex items-center text-slate-400 text-sm font-medium mb-2">
                <Music className="w-4 h-4 mr-2 text-orange-400" />
                Favorite Genre
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="favoriteGenre"
                  value={formData.favoriteGenre}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-orange-600 focus:outline-none transition"
                />
              ) : (
                <p className="text-white text-lg">{formData.favoriteGenre}</p>
              )}
            </div>

            {/* Playlists Count */}
            <div>
              <label className="text-slate-400 text-sm font-medium mb-2 block">Total Playlists</label>
              <p className="text-white text-lg">{formData.playlistCount}</p>
            </div>

            {/* Followers Count */}
            <div>
              <label className="text-slate-400 text-sm font-medium mb-2 block">Followers</label>
              <p className="text-white text-lg">{formData.followersCount}</p>
            </div>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="bg-slate-800/50 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6">Account Settings</h3>
          <div className="space-y-4">
            <Link
              to="/my-playlists"
              className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition text-slate-300 hover:text-white flex items-center"
            >
              <Music className="w-4 h-4 mr-2" />
              Manage My Playlists
            </Link>
            <button 
              onClick={() => setShowChangePasswordModal(true)}
              className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition text-slate-300 hover:text-white"
            >
              Change Password
            </button>
            <button className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition text-slate-300 hover:text-white">
              Privacy Settings
            </button>
            <button className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition text-slate-300 hover:text-white">
              Notification Preferences
            </button>
            <button className="w-full text-left px-4 py-3 bg-red-900/20 hover:bg-red-900/30 rounded-lg transition text-red-400 hover:text-red-300">
              Delete Account
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 bg-orange-900/20 hover:bg-orange-900/30 rounded-lg transition text-orange-400 hover:text-orange-300 flex items-center font-medium"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <AudioPlayer />
      <ChangePasswordModal 
        isOpen={showChangePasswordModal} 
        onClose={() => setShowChangePasswordModal(false)} 
      />
    </div>
  )
}
