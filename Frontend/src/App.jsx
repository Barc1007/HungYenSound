import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AudioProvider } from "./context/AudioContext"
import { UserProvider } from "./context/UserContext"
import { PlaylistProvider } from "./context/PlaylistContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import Genres from "./pages/Genres"
import Playlists from "./pages/Playlists"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import MyPlaylists from "./pages/MyPlaylists"

function App() {
  return (
    <UserProvider>
      <PlaylistProvider>
        <AudioProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/signup" element={<SignUp />} />
              <Route 
                path="/my-playlists" 
                element={
                  <ProtectedRoute>
                    <MyPlaylists />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Router>
        </AudioProvider>
      </PlaylistProvider>
    </UserProvider>
  )
}

export default App
