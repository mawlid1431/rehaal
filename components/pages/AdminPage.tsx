import { useState } from 'react';
import { AdminLayout } from '../admin/AdminLayout';
import { Dashboard } from '../admin/Dashboard';
import { TripsManager } from '../admin/TripsManager';
import { BookingsManager } from '../admin/BookingsManager';
import { GalleryManager } from '../admin/GalleryManager';
import { TestimonialsManager } from '../admin/TestimonialsManager';
import { ServicesManager } from '../admin/ServicesManager';

export function AdminPage() {
    const [currentSection, setCurrentSection] = useState('dashboard');

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
            default:
                return <Dashboard />;
        }
    };

    return (
        <AdminLayout currentSection={currentSection} onSectionChange={setCurrentSection}>
            {renderSection()}
        </AdminLayout>
    );
}
