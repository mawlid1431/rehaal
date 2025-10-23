import { Plane, Calendar, Image, MessageSquare, Users, TrendingUp } from 'lucide-react';

export function Dashboard() {
    const stats = [
        { label: 'Total Trips', value: '4', icon: Plane, color: 'bg-blue-500' },
        { label: 'Total Bookings', value: '0', icon: Calendar, color: 'bg-green-500' },
        { label: 'Gallery Images', value: '6', icon: Image, color: 'bg-purple-500' },
        { label: 'Testimonials', value: '6', icon: MessageSquare, color: 'bg-yellow-500' },
        { label: 'Total Customers', value: '500+', icon: Users, color: 'bg-pink-500' },
        { label: 'Growth', value: '+25%', icon: TrendingUp, color: 'bg-indigo-500' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left">
                        <Plane className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                        <p className="font-semibold text-gray-800 dark:text-white">Add New Trip</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Create a new travel package</p>
                    </button>
                    <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-left">
                        <Calendar className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
                        <p className="font-semibold text-gray-800 dark:text-white">View Bookings</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Manage customer bookings</p>
                    </button>
                    <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-left">
                        <Image className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
                        <p className="font-semibold text-gray-800 dark:text-white">Upload Images</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Add to gallery</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
