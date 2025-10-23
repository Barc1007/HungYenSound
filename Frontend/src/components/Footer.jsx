import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">HungYenSound</h3>
            <p className="text-slate-400">Stream your favorite music anytime, anywhere.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-orange-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/genres" className="text-slate-400 hover:text-orange-400 transition">
                  Genres
                </Link>
              </li>
              <li>
                <Link to="/playlists" className="text-slate-400 hover:text-orange-400 transition">
                  Playlists
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-orange-400 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-slate-500 text-sm">
          <p>&copy; 2025 HungYenSound. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
