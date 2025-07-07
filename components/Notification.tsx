"use client"

import { useEffect, useState } from "react"

interface NotificationProps {
  message?: string
  type?: "success" | "error" | "info"
  duration?: number
}

export function Notification({ message, type = "info", duration = 3000 }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [message, duration])

  if (!isVisible || !message) {
    return null
  }

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type]

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg z-50`}>{message}</div>
  )
}
