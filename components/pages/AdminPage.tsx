import { useState, useEffect } from 'react';
import { AdminLayout } from '../admin/AdminLayout';
import { Dashboard } from '../admin/Dashboard';
import { TripsManager } from '../admin/TripsManager';
import { BookingsManager } from '../admin/BookingsManager';
import { GalleryManager } from '../admin/GalleryManager';
import { TestimonialsManager } from '../admin/TestimonialsManager';
import { ServicesManager } from '../admin/ServicesManager';
import { SettingsManager } from '../admin/SettingsManager';
import { LoginPage } from '../admin/LoginPage';
import { getSession } from '../../lib/auth';

export function AdminPage() {
    const [currentSection, setCurrentSection] = useState('dashboard');
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const session = await getSession();
            setAuthenticated(!!session);
        } catch (error) {
            console.error('Auth check error:', error);
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginSuccess = () => {
        setAuthenticated(true);
    };

    const handleLogout = () => {
        setAuthenticated(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!authenticated) {
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    const renderSection = () => {
        switch (currentSection) {
            case 'dashboard':
                return <Dashboard />;
            case 'trips':
                return <TripsManager />;
            case 'bookings':
                return <BookingsManager />;
            case 'gallery':
                return <GalleryManager />;
            case 'testimonials':
                return <TestimonialsManager />;
            case 'services':
                return <ServicesManager />;
            case 'settings':
                return <SettingsManager />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <AdminLayout
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
            onLogout={handleLogout}
        >
            {renderSection()}
        </AdminLayout>
    );
}
