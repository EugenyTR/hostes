"use client"

import { useState } from "react"
import AppLayout from "@/components/AppLayout"

// Иконки
const Search = ({ size = 16, className = "" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
    </svg>
)

const MoreHorizontal = ({ size = 16, className = "" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
    </svg>
)

const X = ({ size = 16, className = "" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <path d="m18 6-12 12" />
        <path d="m6 6 12 12" />
    </svg>
)

interface FiscalRegistrator {
    id: number
    name: string
    model: string
    serialNumber: string
    organization: string
    terminal: string
    status: "Активирован" | "Неактивен"
    manufacturer?: string
    symbolsCount?: number
}

const fiscalRegistrators: FiscalRegistrator[] = [
    {
        id: 1,
        name: "ФР Хозяюшка Водный Стадион",
        model: "Atol FPrint-22TTK",
        serialNumber: "",
        organization: "Москва Водный...",
        terminal: "Неактивен",
        status: "Неактивен",
        manufacturer: "Atol",
        symbolsCount: 64,
    },
    {
        id: 2,
        name: "Виртуальный ФР Авиапарк",
        model: "QR Virtual Device",
        serialNumber: "",
        organization: "ИП Голикова Мари...",
        terminal: "Авиапарк",
        status: "Активирован",
    },
    {
        id: 3,
        name: "Виртуальный ФР Лермонтова",
        model: "QR Virtual Device",
        serialNumber: "",
        organization: "ИП Голикова Мари...",
        terminal: "Лермонтова",
        status: "Активирован",
    },
    {
        id: 4,
        name: "Виртуальный ФР Партизанская",
        model: "QR Virtual Device",
        serialNumber: "",
        organization: "ИП Голикова Мари...",
        terminal: "Партизанская",
        status: "Активирован",
    },
    {
        id: 5,
        name: "Виртуальный ФР Родный",
        model: "QR Virtual Device",
        serialNumber: "",
        organization: "",
        terminal: "Водный стадион",
        status: "Неактивен",
    },
    {
        id: 6,
        name: "ФР 5",
        model: "Атол АТОЛ FPrint-22П...",
        serialNumber: "",
        organization: "ИП Голикова Мари...",
        terminal: "Партизанская",
        status: "Активирован",
    },
    {
        id: 7,
        name: "ФР 6",
        model: "Атол АТОЛ FPrint-22П...",
        serialNumber: "",
        organization: "ИП Голикова Мари...",
        terminal: "Лермонтова",
        status: "Активирован",
    },
    {
        id: 8,
        name: "ФР 7",
        model: "Атол АТОЛ FPrint-22П...",
        serialNumber: "",
        organization: "ИП Голикова Мари...",
        terminal: "Волжская",
        status: "Активирован",
    },
    {
        id: 9,
        name: "Водный стадион",
        model: "Атол АТОЛ FPrint-22П...",
        serialNumber: "",
        organization: "ИП Голикова Мари...",
        terminal: "Водный стадион",
        status: "Активирован",
    },
    {
        id: 10,
        name: "Виртуальный ФР Волжская",
        model: "QR Virtual Device",
        serialNumber: "",
        organization: "ИП Голикова Мари...",
        terminal: "Волжская",
        status: "Активирован",
    },
    {
        id: 11,
        name: "Виртуальный ФР Лосиноостровская",
        model: "QR Virtual Device",
        serialNumber: "",
        organization: "ИП Голикова Мари...",
        terminal: "Лосиноостровская",
        status: "Активирован",
    },
]

export default function FiscalRegistratorsPage() {
    const [selectedDevice, setSelectedDevice] = useState<FiscalRegistrator | null>(fiscalRegistrators[0])
    const [searchTerm, setSearchTerm] = useState("")

    const filteredRegistrators = fiscalRegistrators.filter(
        (registrator) =>
            registrator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            registrator.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            registrator.organization.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
            <div className="flex h-full">
                {/* Основная область */}
                <div className="flex-1 flex flex-col">
                    {/* Заголовок и кнопки */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h1 className="text-2xl font-semibold text-gray-900">Фискальные регистраторы</h1>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-[#2055a4] text-white rounded-md hover:bg-[#1a4690] transition-colors">
                                Создать виртуальный ФР
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                                Удалить
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                                Деактивировать
                            </button>
                        </div>
                    </div>

                    {/* Поиск */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Поиск..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2055a4] focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Таблица */}
                    <div className="flex-1 overflow-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Наименование
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Модель
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Серийный номер
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Организация
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Терминал
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Состояние
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Действия
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRegistrators.map((registrator) => (
                                <tr
                                    key={registrator.id}
                                    className={`hover:bg-gray-50 cursor-pointer ${
                                        selectedDevice?.id === registrator.id ? "bg-blue-50" : ""
                                    }`}
                                    onClick={() => setSelectedDevice(registrator)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{registrator.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{registrator.model}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{registrator.serialNumber || "-"}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{registrator.organization}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{registrator.terminal}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              registrator.status === "Активирован"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {registrator.status}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Боковая панель с деталями */}
                {selectedDevice && (
                    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">Основное</h3>
                            <button onClick={() => setSelectedDevice(null)} className="text-gray-400 hover:text-gray-600">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="p-4 flex-1">
                            {/* Иконка устройства */}
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-[#2055a4] rounded-lg flex items-center justify-center">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                        <line x1="8" x2="16" y1="21" y2="21" />
                                        <line x1="12" x2="12" y1="17" y2="21" />
                                    </svg>
                                </div>
                            </div>

                            {/* Информация об устройстве */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ID:</label>
                                    <div className="text-sm text-gray-900">{selectedDevice.id}</div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Производитель:</label>
                                    <div className="text-sm text-gray-900">{selectedDevice.manufacturer || "Atol"}</div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Модель:</label>
                                    <div className="text-sm text-gray-900">{selectedDevice.model}</div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Символов в строке:</label>
                                    <div className="text-sm text-gray-900">{selectedDevice.symbolsCount || 64}</div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Наименование:</label>
                                    <input
                                        type="text"
                                        value={selectedDevice.name}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2055a4] focus:border-transparent"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Организация:</label>
                                    <input
                                        type="text"
                                        value={selectedDevice.organization}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2055a4] focus:border-transparent"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Терминал:</label>
                                    <input
                                        type="text"
                                        value={selectedDevice.terminal}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2055a4] focus:border-transparent"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Счет для автоматической инкассации:
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2055a4] focus:border-transparent">
                                        <option>Без счета</option>
                                    </select>
                                </div>
                            </div>

                            {/* Статус активации */}
                            <div className="mt-6 p-3 bg-green-50 rounded-md">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                    <span className="text-sm font-medium text-green-800">Активирован</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    )
}
