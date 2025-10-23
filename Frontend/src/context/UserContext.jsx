"use client"

import { createContext, useContext, useState } from "react"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    bio: "Music lover and audio enthusiast",
    avatar: "/placeholder.svg?height=128&width=128",
    joinDate: "January 2024",
    favoriteGenre: "Electronic",
    playlistCount: 12,
    followersCount: 342,
  })

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }))
  }

  const logout = () => {
    setUser(null)
  }

  return <UserContext.Provider value={{ user, updateUser, logout }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}
