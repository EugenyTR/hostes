"use client"

import { useState, useEffect } from "react"
import { X, ChevronDown } from "lucide-react"
import type { ServiceCategory, Service } from "@/types"
import { useAppContext } from "@/context/AppContext"
import ConfirmExitModal from "./ConfirmExitModal"

interface AddServiceModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (serviceData: {
    id?: number
    name: string
    category: string
    basePrice: number
    markup: number
    description: string
    promotionId?: number
  }) => void
  categories: ServiceCategory[]
  editingService?: Service | null
}

export default function AddServiceModal({ isOpen, onClose, onSave, categories, editingService }: AddServiceModalProps) {
  const { getActivePromotions } = useAppContext()
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [basePrice, setBasePrice] = useState("")
  const [markup, setMarkup] = useState("")
  const [description, setDescription] = useState("")
  const [promotionId, setPromotionId] = useState<number | undefined>(undefined)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isPromotionDropdownOpen, setIsPromotionDropdownOpen] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isConfirmExitOpen, setIsConfirmExitOpen] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [initialData, setInitialData] = useState<any>(null)

  const isEditing = !!editingService
  const activePromotions = getActivePromotions()

  // Расчет итоговой цены с наценкой
  const finalPrice = basePrice && markup ? Number(basePrice) * (1 + Number(markup) / 100) : 0

  // Заполнение формы при редактировании
  useEffect(() => {
    if (isOpen) {
      if (editingService) {
        const data = {
          name: editingService.name,
          category: editingService.category,
          basePrice: editingService.basePrice?.toString() || editingService.price?.toString() || "",
          markup: editingService.markup?.toString() || "0",
          description: editingService.description || "",
          promotionId: editingService.promotionId,
        }
        setName(data.name)
        setCategory(data.category)
        setBasePrice(data.basePrice)
        setMarkup(data.markup)
        setDescription(data.description)
        setPromotionId(data.promotionId)
        setInitialData(data)
      } else {
        const data = { name: "", category: "", basePrice: "", markup: "", description: "", promotionId: undefined }
        setName("")
        setCategory("")
        setBasePrice("")
        setMarkup("")
        setDescription("")
        setPromotionId(undefined)
        setInitialData(data)
      }
      setErrors({})
      setHasChanges(false)
    }
  }, [isOpen, editingService])

  // Отслеживание изменений в форме
  useEffect(() => {
    if (initialData) {
      const currentData = { name, category, basePrice, markup, description, promotionId }
      const hasAnyChanges = JSON.stringify(currentData) !== JSON.stringify(initialData)
      setHasChanges(hasAnyChanges)
    }
  }, [name, category, basePrice, markup, description, promotionId, initialData])

  // Обработка клика вне дропдауна для его закрытия
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".dropdown-container") && isDropdownOpen) {
        setIsDropdownOpen(false)
      }
      if (!target.closest(".promotion-dropdown-container") && isPromotionDropdownOpen) {
        setIsPromotionDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen, isPromotionDropdownOpen])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!name.trim()) {
      newErrors.name = "Название услуги обязательно"
    }

    if (!category) {
      newErrors.category = "Выберите категорию"
    }

    if (!basePrice) {
      newErrors.basePrice = "Укажите базовую цену"
    } else if (isNaN(Number(basePrice)) || Number(basePrice) <= 0) {
      newErrors.basePrice = "Введите корректную цену больше 0"
    }

    if (!markup) {
      newErrors.markup = "Укажите наценку"
    } else if (isNaN(Number(markup)) || Number(markup) < 0) {
      newErrors.markup = "Введите корректную наценку"
    }

    if (!description.trim()) {
      newErrors.description = "Описание обязательно"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        ...(isEditing && { id: editingService.id }),
        name: name.trim(),
        category,
        basePrice: Number(basePrice),
        markup: Number(markup),
        description: description.trim(),
        promotionId,
      })
    }
  }

  const handleClose = () => {
    if (hasChanges) {
      setIsConfirmExitOpen(true)
    } else {
      onClose()
    }
  }

  const handleConfirmExit = () => {
    setIsConfirmExitOpen(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
        <div className="bg-white rounded-lg w-full max-w-lg p-6 relative animate-slide-up max-h-[90vh] overflow-y-auto">
          {/* Заголовок и кнопка закрытия */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#2c2c33]">
              {isEditing ? "Редактирование услуги" : "Добавление услуги"}
            </h2>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Форма */}
          <div className="space-y-4">
            {/* Название услуги */}
            <div>
              <input
                type="text"
                placeholder="Название услуги"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2055a4] focus:border-transparent text-[#2c2c33] placeholder-gray-400`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Категория */}
            <div className="dropdown-container relative">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-4 py-3 border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } rounded-lg cursor-pointer flex justify-between items-center bg-white hover:border-[#2055a4] transition-colors`}
              >
                <span className={category ? "text-[#2c2c33]" : "text-gray-400"}>
                  {category ? categories.find((c) => c.id === category)?.name : "Категория"}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-gray-400 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}`}
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[#2c2c33] transition-colors"
                      onClick={() => {
                        setCategory(cat.id)
                        setIsDropdownOpen(false)
                      }}
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            {/* Базовая цена */}
            <div>
              <input
                type="text"
                placeholder="Базовая цена, ₽"
                value={basePrice}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "")
                  setBasePrice(value)
                }}
                className={`w-full px-4 py-3 border ${
                  errors.basePrice ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2055a4] focus:border-transparent text-[#2c2c33] placeholder-gray-400`}
              />
              {errors.basePrice && <p className="text-red-500 text-xs mt-1">{errors.basePrice}</p>}
            </div>

            {/* Наценка */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Наценка, %"
                  value={markup}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "")
                    setMarkup(value)
                  }}
                  className={`w-full px-4 py-3 pr-32 border ${
                    errors.markup ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2055a4] focus:border-transparent text-[#2c2c33] placeholder-gray-400`}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-red-500 font-medium">
                  обязательное поле
                </span>
              </div>
              {errors.markup && <p className="text-red-500 text-xs mt-1">{errors.markup}</p>}
            </div>

            {/* Цена с наценкой */}
            <div>
              <input
                type="text"
                placeholder="Цена с наценкой, ₽"
                value={finalPrice ? `${Math.round(finalPrice)} ₽` : ""}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>

            {/* Акция */}
            <div className="promotion-dropdown-container relative">
              <div
                onClick={() => setIsPromotionDropdownOpen(!isPromotionDropdownOpen)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer flex justify-between items-center bg-white hover:border-[#2055a4] transition-colors"
              >
                <span className={promotionId ? "text-[#2c2c33]" : "text-gray-400"}>
                  {promotionId
                    ? activePromotions.find((p) => p.id === promotionId)?.name
                    : "Выберите акцию (необязательно)"}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-gray-400 transition-transform ${isPromotionDropdownOpen ? "transform rotate-180" : ""}`}
                />
              </div>
              {isPromotionDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-500 transition-colors"
                    onClick={() => {
                      setPromotionId(undefined)
                      setIsPromotionDropdownOpen(false)
                    }}
                  >
                    Без акции
                  </div>
                  {activePromotions.map((promotion) => (
                    <div
                      key={promotion.id}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[#2c2c33] transition-colors"
                      onClick={() => {
                        setPromotionId(promotion.id)
                        setIsPromotionDropdownOpen(false)
                      }}
                    >
                      <div className="font-medium">{promotion.name}</div>
                      <div className="text-sm text-gray-500">
                        -{promotion.discountAmount}
                        {promotion.discountType === "percentage" ? "%" : "₽"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Описание */}
            <div>
              <textarea
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2055a4] focus:border-transparent resize-none text-[#2c2c33] placeholder-gray-400`}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-[#2055a4] text-white px-6 py-3 rounded-lg hover:bg-[#1a4590] transition-colors font-medium"
            >
              Сохранить
            </button>
            <button
              onClick={handleClose}
              className="border border-gray-300 text-[#2c2c33] px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Отменить
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно подтверждения выхода */}
      <ConfirmExitModal
        isOpen={isConfirmExitOpen}
        onClose={() => setIsConfirmExitOpen(false)}
        onConfirm={handleConfirmExit}
      />
    </>
  )
}
