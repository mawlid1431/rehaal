import { useState, useEffect } from 'react';
import { Plane, Calendar, Image, MessageSquare, Wrench } from 'lucide-react';
import { tripsApi, bookingsApi, galleryApi, testimonialsApi, servicesApi } from '../../lib/api';

export function Dashboard() {
    const [stats, setStats] = useState({
        trips: 0,
        bookings: 0,
        gallery: 0,
        testimonials: 0,
        services: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [trips, bookings, gallery, testimonials, services] = await Promise.all([
                tripsApi.getAll(),
                bookingsApi.getAll(),
                galleryApi.getAll(),
                testimonialsApi.getAll(),
                servicesApi.getAll()
            ]);

            setStats({
                trips: trips.length,
                bookings: bookings.length,
                gallery: gallery.length,
                testimonials: testimonials.length,
                services: services.length
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Total Trips', value: stats.trips, icon: Plane, color: 'bg-blue-500' },
        { label: 'Total Bookings', value: stats.bookings, icon: Calendar, color: 'bg-green-500' },
        { label: 'Gallery Images', value: stats.gallery, icon: Image, color: 'bg-purple-500' },
        { label: 'Testimonials', value: stats.testimonials, icon: MessageSquare, color: 'bg-yellow-500' },
        { label: 'Services', value: stats.services, icon: Wrench, color: 'bg-indigo-500' },
    ];

    if (loading) {
        return <div className="text-sm text-gray-600 dark:text-gray-400">Loading dashboard...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, index) => {
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
        </div>
    );
}
