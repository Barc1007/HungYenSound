import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AudioPlayer from "../components/AudioPlayer"

const genres = [
  {
    id: 1,
    name: "Electronic",
    image: "http://static.photos/music/640x360/20",
    description: "Dance, house, techno and more",
  },
  { id: 2, name: "Hip Hop", image: "http://static.photos/music/640x360/21", description: "Rap, trap and urban beats" },
  {
    id: 3,
    name: "Rock",
    image: "http://static.photos/music/640x360/22",
    description: "Alternative, indie and classic",
  },
  { id: 4, name: "Pop", image: "http://static.photos/music/640x360/23", description: "Mainstream hits and top 40" },
  { id: 5, name: "Jazz", image: "http://static.photos/music/640x360/24", description: "Smooth, classic and fusion" },
  {
    id: 6,
    name: "Classical",
    image: "http://static.photos/music/640x360/25",
    description: "Orchestral and piano masterpieces",
  },
  { id: 7, name: "R&B", image: "http://static.photos/music/640x360/26", description: "Soulful rhythms and blues" },
  {
    id: 8,
    name: "Lo-Fi",
    image: "http://static.photos/music/640x360/27",
    description: "Chill beats to study/relax to",
  },
]

export default function Genres() {
  return (
    <div className="min-h-screen flex flex-col pb-32">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-8">Browse Genres</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/playlists?genre=${genre.name.toLowerCase()}`}
              className="genre-card bg-slate-800/50 rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="relative mb-4">
                <img
                  src={genre.image || "/placeholder.svg"}
                  alt={genre.name}
                  className="rounded-lg w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <h3 className="font-bold text-xl">{genre.name}</h3>
                </div>
              </div>
              <p className="text-slate-300 text-sm">{genre.description}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <AudioPlayer />
    </div>
  )
}
