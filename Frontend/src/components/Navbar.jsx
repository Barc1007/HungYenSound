"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Music, Search, User, Menu, X, LogOut } from "lucide-react"
import LoginModal from "./LoginModal"
import { useUser } from "../context/UserContext"

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { user, logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setShowProfileMenu(false)
    navigate("/")
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-orange-900 to-indigo-900 px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Music className="text-orange-400 w-6 h-6" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-indigo-400">
              HungYenSound
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search songs, artists..."
                className="bg-slate-800/50 text-white px-4 py-2 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute right-3 top-2.5 text-slate-400 w-4 h-4" />
            </div>
            <div className="space-x-6">
              <Link to="/" className="text-orange-200 hover:text-white transition">
                Home
              </Link>
              <Link to="/genres" className="text-orange-200 hover:text-white transition">
                Genres
              </Link>
              <Link to="/playlists" className="text-orange-200 hover:text-white transition">
                Playlists
              </Link>
              {user && (
                <Link to="/my-playlists" className="text-orange-200 hover:text-white transition">
                  My Playlists
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full text-sm font-medium transition flex items-center"
                >
                  <img
                    src={user.avatar || "/placeholder.svg?height=20&width=20&query=user"}
                    alt={user.name}
                    className="w-5 h-5 rounded-full mr-2 object-cover"
                  />
                  {user.name}
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-t-lg transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-b-lg transition flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full text-sm font-medium transition flex items-center"
              >
                <User className="mr-2 w-4 h-4" />
                Sign In
              </button>
            )}
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden text-orange-200">
              {showMobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden mt-4 space-y-2">
            <Link to="/" className="block text-orange-200 hover:text-white transition py-2">
              Home
            </Link>
            <Link to="/genres" className="block text-orange-200 hover:text-white transition py-2">
              Genres
            </Link>
            <Link to="/playlists" className="block text-orange-200 hover:text-white transition py-2">
              Playlists
            </Link>
            {user && (
              <>
                <Link to="/profile" className="block text-orange-200 hover:text-white transition py-2">
                  Profile
                </Link>
                <Link to="/my-playlists" className="block text-orange-200 hover:text-white transition py-2">
                  My Playlists
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-400 hover:text-red-300 transition py-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  )
}
