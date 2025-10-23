"use client"

import { createContext, useContext, useState } from "react"

const PlaylistContext = createContext()

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([])

  const createPlaylist = (name, description = "") => {
    const newPlaylist = {
      id: Date.now(),
      name,
      description,
      songs: [],
      createdAt: new Date().toISOString(),
      image: "http://static.photos/music/640x360/50",
    }
    setPlaylists([...playlists, newPlaylist])
    return newPlaylist
  }

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists(
      playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          // Check if song already exists
          const songExists = playlist.songs.some((s) => s.id === song.id)
          if (!songExists) {
            return {
              ...playlist,
              songs: [...playlist.songs, song],
            }
          }
        }
        return playlist
      }),
    )
  }

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists(
      playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            songs: playlist.songs.filter((s) => s.id !== songId),
          }
        }
        return playlist
      }),
    )
  }

  const deletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter((p) => p.id !== playlistId))
  }

  const updatePlaylist = (playlistId, updates) => {
    setPlaylists(
      playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          return { ...playlist, ...updates }
        }
        return playlist
      }),
    )
  }

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        deletePlaylist,
        updatePlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  )
}

export const usePlaylist = () => {
  const context = useContext(PlaylistContext)
  if (!context) {
    throw new Error("usePlaylist must be used within PlaylistProvider")
  }
  return context
}
