"use client"
import { Play, Heart, MoreHorizontal, ChevronRight, User, Music } from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AudioPlayer from "../components/AudioPlayer"
import { useAudio } from "../context/AudioContext"
import { useUser } from "../context/UserContext"

const tracks = [
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
]

const playlists = [
  {
    id: 1,
    title: "Chill Vibes",
    image: "http://static.photos/music/640x360/6",
    tracks: 120,
    duration: "8h 42m",
    description: "Relaxing beats for your downtime. Perfect for studying or unwinding.",
  },
  {
    id: 2,
    title: "Workout Energy",
    image: "http://static.photos/music/640x360/7",
    tracks: 85,
    duration: "5h 15m",
    description: "High-energy tracks to power through your workout sessions.",
  },
  {
    id: 3,
    title: "Focus Flow",
    image: "http://static.photos/music/640x360/8",
    tracks: 65,
    duration: "4h 30m",
    description: "Concentration-boosting music to help you stay productive and focused.",
  },
]

export default function Home() {
  const { playTrack } = useAudio()
  const { user, isAuthenticated } = useUser()

  return (
    <div className="min-h-screen flex flex-col pb-32">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-orange-800/30 to-indigo-800/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                {isAuthenticated ? (
                  <>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      Welcome back, {user?.name}!
                    </h1>
                    <p className="text-orange-100 mb-6 text-lg">
                      Ready to discover your next favorite song? Let's dive into your personalized music experience.
                    </p>
                    <div className="flex space-x-4">
                      <Link 
                        to="/my-playlists"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium transition flex items-center"
                      >
                        <Music className="mr-2 w-5 h-5" />
                        My Playlists
                      </Link>
                      <Link 
                        to="/profile"
                        className="border border-orange-400 text-orange-400 hover:bg-orange-400/10 px-6 py-3 rounded-full font-medium transition flex items-center"
                      >
                        <User className="mr-2 w-5 h-5" />
                        Profile
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Stream Your Favorite Music</h1>
                    <p className="text-orange-100 mb-6 text-lg">Millions of songs from SoundCloud. Anytime, anywhere.</p>
                    <div className="flex space-x-4">
                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium transition flex items-center">
                        <Play className="mr-2 w-5 h-5" />
                        Play Now
                      </button>
                      <button className="border border-orange-400 text-orange-400 hover:bg-orange-400/10 px-6 py-3 rounded-full font-medium transition">
                        Explore
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="md:w-1/2">
                <img
                  src="http://static.photos/music/1024x576/1"
                  alt="Music Illustration"
                  className="rounded-xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tracks */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Tracks</h2>
            <a href="#" className="text-orange-400 hover:text-orange-300 transition flex items-center">
              View All <ChevronRight className="ml-1 w-5 h-5" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="track-card bg-slate-800/50 rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative mb-4">
                  <img src={track.image || "/placeholder.svg"} alt={track.title} className="rounded-lg w-full" />
                  <button
                    onClick={() => playTrack(track)}
                    className="absolute bottom-2 right-2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="font-semibold text-lg mb-1">{track.title}</h3>
                <p className="text-slate-300 text-sm">{track.artist}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-slate-400 text-xs">{track.duration}</span>
                  <div className="flex space-x-2">
                    <button className="text-slate-400 hover:text-orange-400 transition">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="text-slate-400 hover:text-orange-400 transition">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Playlists */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Popular Playlists</h2>
            <a href="#" className="text-orange-400 hover:text-orange-300 transition flex items-center">
              View All <ChevronRight className="ml-1 w-5 h-5" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="bg-slate-800/50 rounded-xl overflow-hidden">
                <div className="relative">
                  <img
                    src={playlist.image || "/placeholder.svg"}
                    alt={playlist.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div>
                      <h3 className="font-bold text-xl">{playlist.title}</h3>
                      <p className="text-orange-300 text-sm">
                        {playlist.tracks} tracks • {playlist.duration}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-slate-300 mb-4">{playlist.description}</p>
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium transition flex items-center justify-center">
                    <Play className="mr-2 w-4 h-4" />
                    Play Playlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <AudioPlayer />
    </div>
  )
}
