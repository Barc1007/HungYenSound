"use client"

import { X } from "lucide-react"
import { useState } from "react"
import { usePlaylist } from "../context/PlaylistContext"

export default function CreatePlaylistModal({ isOpen, onClose, onPlaylistCreated }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const { createPlaylist } = usePlaylist()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Playlist name is required")
      return
    }
    const newPlaylist = createPlaylist(name, description)
    onPlaylistCreated(newPlaylist)
    setName("")
    setDescription("")
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create Playlist</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Playlist Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Playlist"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for your playlist..."
              rows="3"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
