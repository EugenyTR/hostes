import AppLayout from "@/components/AppLayout"

export default function Loading() {
    return (
        <AppLayout>
            <div className="flex h-full">
                {/* Основная область */}
                <div className="flex-1 flex flex-col">
                    {/* Заголовок */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
                        <div className="flex gap-3">
                            <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
                            <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
                            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Поиск */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="h-10 bg-gray-200 rounded w-80 animate-pulse"></div>
                    </div>

                    {/* Таблица */}
                    <div className="flex-1 p-6">
                        <div className="space-y-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="flex items-center space-x-4">
                                    <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Боковая панель */}
                <div className="w-80 bg-white border-l border-gray-200 p-4">
                    <div className="space-y-4">
                        <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                        <div className="h-20 bg-gray-200 rounded-lg w-20 mx-auto animate-pulse"></div>
                        <div className="space-y-3">
                            {[...Array(6)].map((_, i) => (
                                <div key={i}>
                                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse mb-1"></div>
                                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
