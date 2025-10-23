"use client"

import { X, Plus, Check } from "lucide-react"
import { useState } from "react"
import { usePlaylist } from "../context/PlaylistContext"

const availableSongs = [
  {
    id: 1,
    title: "Summer Vibes",
    artist: "Chill Wave",
    image: "http://static.photos/music/640x360/2",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "3:42",
  },
  {
    id: 2,
    title: "Midnight Dreams",
    artist: "Lo-Fi Beats",
    image: "http://static.photos/music/640x360/3",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "4:15",
  },
  {
    id: 3,
    title: "Urban Echo",
    artist: "Electronic",
    image: "http://static.photos/music/640x360/4",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "5:22",
  },
  {
    id: 4,
    title: "Acoustic Morning",
    artist: "Indie Folk",
    image: "http://static.photos/music/640x360/5",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: "3:18",
  },
  {
    id: 5,
    title: "Electric Dreams",
    artist: "Synth Wave",
    image: "http://static.photos/music/640x360/9",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "4:45",
  },
  {
    id: 6,
    title: "Jazz Nights",
    artist: "Smooth Jazz",
    image: "http://static.photos/music/640x360/10",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: "5:10",
  },
]

export default function AddSongsModal({ isOpen, onClose, playlistId }) {
  const [selectedSongs, setSelectedSongs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const { addSongToPlaylist, playlists } = usePlaylist()

  const playlist = playlists.find((p) => p.id === playlistId)
  const playlistSongIds = playlist?.songs.map((s) => s.id) || []

  const filteredSongs = availableSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleSong = (song) => {
    if (selectedSongs.some((s) => s.id === song.id)) {
      setSelectedSongs(selectedSongs.filter((s) => s.id !== song.id))
    } else {
      setSelectedSongs([...selectedSongs, song])
    }
  }

  const handleAddSongs = () => {
    selectedSongs.forEach((song) => {
      if (!playlistSongIds.includes(song.id)) {
        addSongToPlaylist(playlistId, song)
      }
    })
    setSelectedSongs([])
    setSearchTerm("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-slate-800 pb-4">
          <h2 className="text-2xl font-bold">Add Songs to Playlist</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search songs or artists..."
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="space-y-2 mb-6">
          {filteredSongs.map((song) => {
            const isSelected = selectedSongs.some((s) => s.id === song.id)
            const isAlreadyInPlaylist = playlistSongIds.includes(song.id)

            return (
              <div
                key={song.id}
                onClick={() => !isAlreadyInPlaylist && handleToggleSong(song)}
                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition ${
                  isAlreadyInPlaylist
                    ? "bg-slate-700/50 opacity-50 cursor-not-allowed"
                    : isSelected
                      ? "bg-orange-600/20 border border-orange-500"
                      : "bg-slate-700/50 hover:bg-slate-700"
                }`}
              >
                <img src={song.image || "/placeholder.svg"} alt={song.title} className="w-12 h-12 rounded" />
                <div className="flex-1">
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-slate-400">{song.artist}</p>
                </div>
                <span className="text-sm text-slate-400">{song.duration}</span>
                <div className="w-6 h-6 rounded border-2 border-slate-500 flex items-center justify-center">
                  {isSelected && <Check className="w-4 h-4 text-orange-500" />}
                  {isAlreadyInPlaylist && <Check className="w-4 h-4 text-slate-400" />}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddSongs}
            disabled={selectedSongs.length === 0}
            className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add {selectedSongs.length > 0 ? `(${selectedSongs.length})` : ""}
          </button>
        </div>
      </div>
    </div>
  )
}
