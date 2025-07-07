export interface Point {
  id: number
  name: string
  organizationType: "own" | "franchise"
  phone: string
  address: {
    cityId: number
    fullAddress: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: number
  name: string
  price: number
  category: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  basePrice?: number
  markup?: number
  promotionId?: number
  currentPromotion?: {
    promotionId: number
    promotionName: string
    discountAmount: number
    discountType: "percentage" | "fixed"
    startDate: string
    endDate: string
  }
}

export interface ServiceCategory {
  id: string
  name: string
  isActive: boolean
}

export interface Client {
  id: number
  type: "individual" | "legal"
  surname: string
  name: string
  patronymic?: string
  gender?: "M" | "F"
  phone: string
  email?: string
  birthDate?: string
  registrationDate: string
  referralSource?: string
  companyName?: string
  address: {
    cityId: number
    city: string
    street: string
    house: string
    apartment?: string
  }
  legalInfo?: {
    inn: string
    kpp: string
    bik: string
    settlementAccount: string
    corporateAccount: string
    legalAddress: string
    priceList: string
  }
  assignedServices?: number[] // Добавляем массив ID услуг для юр. лиц
}

export interface OrderService {
  id: number
  serviceId: number
  serviceName: string
  quantity: number
  price: number
  originalPrice?: number
  total: number
  originalTotal?: number
  appliedPromotion?: {
    promotionId: number
    promotionName: string
    discountAmount: number
    discountType: "percentage" | "fixed"
  }
  images: string[]
  readyDate: string
  size?: string
  brand?: string
  color?: string
}

export interface AppliedPromotion {
  promotionId: number
  promotionName: string
  discountAmount: number
  discountType: "percentage" | "fixed"
  appliedToServices: number[]
  totalDiscount: number
}

export interface AppliedPromocode {
  promocodeId: number
  promocodeName: string
  promocodeCode: string
  discountAmount: number
}

export interface Order {
  id: number
  clientId: number
  date: string
  status: OrderStatus
  services: OrderService[]
  totalAmount: number
  discount?: number
  discountedAmount: number
  comments?: string
  isCashless: boolean
  appliedPromotions?: AppliedPromotion[]
  appliedPromocode?: AppliedPromocode
}

export type OrderStatus = "waiting" | "in-progress" | "completed" | "cancelled"

export interface StatusHistory {
  id: number
  orderId: number
  fromStatus: OrderStatus
  toStatus: OrderStatus
  changedBy: string
  changedAt: string
  notes?: string
}

export interface StatusStatistics {
  status: OrderStatus
  count: number
  percentage: number
  trend: "up" | "down" | "stable"
}

export interface Size {
  id: number
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Brand {
  id: number
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Color {
  id: number
  name: string
  hexCode: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Survey {
  id: number
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface City {
  id: number
  name: string
  region: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  clientsCount?: number
  ordersCount?: number
  totalRevenue?: number
  averageOrderValue?: number
}

export interface CityStatistics {
  cityId: number
  cityName: string
  clientsCount: number
  ordersCount: number
  totalRevenue: number
  averageOrderValue: number
  lastOrderDate: string
  topServices: {
    serviceName: string
    count: number
  }[]
}

export interface Promotion {
  id: number
  name: string
  discountAmount: number
  discountType: "percentage" | "fixed"
  description: string
  targetAudience: "all" | "physical" | "legal"
  startDate: string
  endDate: string
  status: "active" | "inactive" | "expired"
  locations: string[]
  applicableServices: number[]
}

export interface RFMSettings {
  recencyDays: number
  frequencyOrders: number
  monetaryAmount: number
}

export interface RFMSegment {
  id: string
  name: string
  description: string
  color: string
  icon: string
  clientsCount: number
  criteria: string
  aiRecommendation: string
  clients: Client[]
}

export interface RFMAnalysis {
  segments: RFMSegment[]
  settings: RFMSettings
  lastUpdated: string
}

export interface ExpenseCategory {
  id: number
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Promocode {
  id: number
  name: string
  code: string
  type: "discount" | "cashback" | "free_service"
  discountAmount: number
  discountType: "percentage" | "fixed"
  startDate: string
  endDate: string
  status: "active" | "inactive" | "expired"
  targetAudience: "physical" | "legal" | "all"
  applicablePoints: string[]
  usageLimit: number
  usedCount: number
  minOrderAmount?: number
  maxDiscountAmount?: number
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Warehouse {
  id: number
  name: string
  address: string
  cityId: number
  city: string
  contractorId: number
  contractorName: string
  paymentMethod: "cash" | "cashless" | "mixed"
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Contractor {
  id: number
  legalName: string
  inn: string
  kpp: string
  address: string
  phone: string
  email?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PaymentType {
  id: number
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Добавляем новый интерфейс CashShift
export interface CashShift {
  id: number
  shiftNumber: string // Номер кассовой смены (совпадает с номером Z-отчета)
  openTime: string // Время открытия
  closeTime?: string // Время закрытия (может быть null для открытых смен)
  fiscalRegistrator: string // Фискальный регистратор
  openedBy: string // Сотрудник, открывший смену
  closedBy?: string // Сотрудник, закрывший смену
  revenue: number // Выручка
  receiptsCount: number // Количество чеков
  salesPoint: string // Место реализации
  previousShiftDifference: number // Разница между суммами на конец прошлой смены и начало текущей
  cashDifference: number // Разница расчетной и внесенной суммы наличных на конец дня
  emergencyClose: boolean // Аварийное закрытие
  status: "open" | "closed" // Статус смены
  zReportNumber?: string // Номер Z-отчета
  total: number // Итого
  fiscalCash: number // Фиск. нал.
  fiscalCashless: number // Фиск. безнал.
  nonFiscalCash: number // Нефиск. нал.
  nonFiscalCashless: number // Нефиск. безнал.
  nonFiscalBonuses: number // Нефиск. бонусы
  returns: number // Возвраты
  returnsFiscalCash: number // Возвраты фиск. нал.
  returnsFiscalCashless: number // Возвраты фиск. безнал.
  returnsNonFiscalCash: number // Возвраты нефиск.нал.
  returnsNonFiscalCashless: number // Возвраты нефиск.безнал.
  returnsNonFiscalBonuses: number // Возвраты нефиск.бонусы
  returnsWriteOff: number // Возвраты списание
  cashAtStart: number // Сумма в кассе на начало дня
  cashAtEnd: number // Сумма в кассе на конец дня
  createdAt: string
  updatedAt: string
}

// Добавляем новые интерфейсы для инкассации
export interface CashOperation {
  id: number
  operationNumber: string // № операции в бэк-офисе
  dateTime: string // Дата и время операции
  type: "deposit" | "collection" | "auto_collection" | "failed_collection" // Тип операции
  employee: string // ФИО сотрудника
  amount: number // Сумма внесения/инкассации
  cashInRegister: number // Сумма наличных в кассе после операции
  salesPoint: string // Место реализации
  fiscalRegistrator: string // Фискальный регистратор
  comment: string // Комментарий к операции
  cashShiftNumber: string // Номер кассовой смены
  status: "completed" | "failed" // Статус операции
  createdAt: string
  updatedAt: string
}

export interface CashOperationDetails {
  id: number
  operationNumber: string
  openTime: string // Время открытия
  openedBy: string // Сотрудник, открывший смену
  status: "completed" | "failed" | "in_progress"
  cashier: string // Кассир
  fiscalRegistrator: string // Фискальный регистратор
  cashShiftNumber: string // Кассовая смена
  total: number // Итого, ₽
  revenue: number // Выручка, ₽
  costPrice: number // Себестоимость, ₽
  receiptsCount: number // Количество чеков
  collectionAmount: number // Сумма инкассаций, ₽
  salesPoint: string // Место реализации
  recipientAccount: string // Счет-получатель инкассации
  createdAt: string
  updatedAt: string
}

export interface CashOperationFilters {
  dateFrom?: string
  dateTo?: string
  amountFrom?: number
  amountTo?: number
  type?: string
  employee?: string
  salesPoint?: string
  fiscalRegistrator?: string
  cashShiftNumber?: string
  status?: string
}
