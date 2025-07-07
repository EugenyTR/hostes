"use client"

import type React from "react"

import { useAuth } from "@/context/AuthContext"
import { usePathname } from "next/navigation"
import Sidebar from "./Sidebar"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, isLoading } = useAuth()
  const pathname = usePathname()

  // Показываем страницу логина без сайдбара
  if (pathname === "/login") {
    return <>{children}</>
  }

  // Показываем загрузку
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  // Если пользователь не авторизован, показываем только children (будет редирект на логин)
  if (!user) {
    return <>{children}</>
  }

  // Показываем основной макет с сайдбаром
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-[220px] overflow-auto">
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  )
}
