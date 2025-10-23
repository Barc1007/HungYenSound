"use client"

import { createContext, useContext, useState, useRef, useEffect } from "react"

const AudioContext = createContext()

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio())
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState({
    title: "Summer Vibes",
    artist: "Chill Wave",
    image: "http://static.photos/music/200x200/9",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  })
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)

  const audio = audioRef.current

  useEffect(() => {
    audio.volume = volume
  }, [volume, audio])

  useEffect(() => {
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [audio])

  const playTrack = (track) => {
    if (audio.src !== track.audio) {
      audio.src = track.audio
      setCurrentTrack(track)
    }
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.error("Playback failed:", err))
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback failed:", err))
    }
  }

  const seek = (time) => {
    audio.currentTime = time
    setCurrentTime(time)
  }

  const skipForward = () => {
    seek(Math.min(audio.currentTime + 10, audio.duration))
  }

  const skipBack = () => {
    seek(Math.max(audio.currentTime - 10, 0))
  }

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00"
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTrack,
        currentTime,
        duration,
        volume,
        playTrack,
        togglePlayPause,
        seek,
        skipForward,
        skipBack,
        setVolume,
        formatTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider")
  }
  return context
}
