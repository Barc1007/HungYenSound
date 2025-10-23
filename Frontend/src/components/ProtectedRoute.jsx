import { Navigate, useLocation } from "react-router-dom"
import { useUser } from "../context/UserContext"

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useUser()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to home page with return url
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}