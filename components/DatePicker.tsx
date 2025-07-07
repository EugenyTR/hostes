"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  value: string
  onChange: (date: Date) => void
  placeholder?: string
  icon?: React.ReactNode
  className?: string
}

export default function DatePicker({ value, onChange, placeholder, icon, className }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (!value) return undefined

    try {
      // Если это строка в формате DD.MM.YYYY
      if (value.includes(".")) {
        const [day, month, year] = value.split(".")
        const parsedDate = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
        return isValidDate(parsedDate) ? parsedDate : undefined
      }

      // Если это ISO строка
      const parsedDate = new Date(value)
      return isValidDate(parsedDate) ? parsedDate : undefined
    } catch (error) {
      console.warn("Invalid date format:", value)
      return undefined
    }
  })

  // Функция для проверки валидности даты
  const isValidDate = (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime())
  }

  // Функция для форматирования даты в DD.MM.YYYY
  const formatDate = (date: Date): string => {
    if (!date || !isValidDate(date)) return ""

    try {
      const day = date.getDate().toString().padStart(2, "0")
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const year = date.getFullYear()
      return `${day}.${month}.${year}`
    } catch (error) {
      console.warn("Error formatting date:", error)
      return ""
    }
  }

  React.useEffect(() => {
    if (!value) {
      setDate(undefined)
      return
    }

    try {
      // Если это строка в формате DD.MM.YYYY
      if (value.includes(".")) {
        const [day, month, year] = value.split(".")
        const parsedDate = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
        if (isValidDate(parsedDate)) {
          setDate(parsedDate)
        } else {
          setDate(undefined)
        }
        return
      }

      // Если это ISO строка
      const parsedDate = new Date(value)
      if (isValidDate(parsedDate)) {
        setDate(parsedDate)
      } else {
        setDate(undefined)
      }
    } catch (error) {
      console.warn("Invalid date format:", value)
      setDate(undefined)
    }
  }, [value])

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    if (newDate && isValidDate(newDate)) {
      onChange(newDate)
    }
  }

  const formatDisplayDate = (date: Date | undefined): string => {
    if (!date || !isValidDate(date)) return ""
    return formatDate(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}
        >
          {icon}
          {date && isValidDate(date) ? formatDisplayDate(date) : <span>{placeholder || "Выберите дату"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date && isValidDate(date) ? date : undefined}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
