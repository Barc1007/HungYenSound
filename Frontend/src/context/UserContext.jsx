"use client"

import { createContext, useContext } from "react"
import { useAuth } from "./AuthContext"

const UserContext = createContext()

export function UserProvider({ children }) {
  const { user, updateProfile, logout } = useAuth()

  const updateUser = async (updatedData) => {
    const result = await updateProfile(updatedData)
    return result
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
