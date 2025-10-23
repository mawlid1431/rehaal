import { useState } from 'react';
import { LayoutDashboard, Plane, Calendar, Image, MessageSquare, Briefcase, LogOut, Moon, Sun, User, Menu, X } from 'lucide-react';
import { useDarkMode } from '../../lib/contexts';

interface AdminLayoutProps {
    children: React.ReactNode;
    currentSection: string;
    onSectionChange: (section: string) => void;
}

export function AdminLayout({ children, currentSection, onSectionChange }: AdminLayoutProps) {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // You can replace this with actual admin data from authentication
    const adminName = "Admin User";

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'trips', label: 'Trips', icon: Plane },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'gallery', label: 'Gallery', icon: Image },
        { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
        { id: 'services', label: 'Services', icon: Briefcase },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Top Navigation Bar */}
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
                <div className="max-w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold tracking-wide" style={{ color: 'rgb(216, 167, 40)' }}>
                                Rehaal Admin
                            </h1>
                        </div>

                        {/* Empty space for balance */}
                        <div className="hidden md:block flex-1"></div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-3">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {isDarkMode ? (
                                    <Sun className="w-5 h-5" style={{ color: 'rgb(216, 167, 40)' }} />
                                ) : (
                                    <Moon className="w-5 h-5" style={{ color: 'rgb(216, 167, 40)' }} />
                                )}
                            </button>

                            {/* Back to Website */}
                            <button
                                onClick={() => window.location.href = '/'}
                                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
                                title="Go back to website"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Back to Website</span>
                            </button>

                            {/* Admin Profile */}
                            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                                <User className="w-5 h-5" style={{ color: 'rgb(216, 167, 40)' }} />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    {adminName}
                                </span>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={() => {
                                    if (confirm('Are you sure you want to logout?')) {
                                        // Add your logout logic here
                                        // For now, redirect to home page
                                        window.location.href = '/';
                                    }
                                }}
                                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors"
                                style={{ backgroundColor: 'rgb(216, 167, 40)' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(186, 137, 10)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(216, 167, 40)'}
                                title="Logout from admin panel"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                ) : (
                                    <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700 mt-2">
                            {/* Admin Profile Mobile */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2 mt-2">
                                <User className="w-5 h-5" style={{ color: 'rgb(216, 167, 40)' }} />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    {adminName}
                                </span>
                            </div>

                            {/* Menu Items Mobile */}
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            onSectionChange(item.id);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${currentSection === item.id
                                            ? 'text-gray-900 dark:text-white font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                            }`}
                                        style={currentSection === item.id ? { backgroundColor: 'rgba(216, 167, 40, 0.15)' } : {}}
                                    >
                                        <Icon
                                            className="w-5 h-5"
                                            style={currentSection === item.id ? { color: 'rgb(216, 167, 40)' } : {}}
                                        />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}

                            {/* Back to Website Mobile */}
                            <button
                                onClick={() => window.location.href = '/'}
                                className="flex items-center gap-3 w-full px-4 py-3 mt-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-200"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Back to Website</span>
                            </button>

                            {/* Logout Mobile */}
                            <button
                                onClick={() => {
                                    if (confirm('Are you sure you want to logout?')) {
                                        window.location.href = '/';
                                    }
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 mt-2 rounded-lg text-white transition-colors"
                                style={{ backgroundColor: 'rgb(216, 167, 40)' }}
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Welcome back, <span style={{ color: 'rgb(216, 167, 40)' }}>{adminName}</span>!
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Manage your travel business from here
                            </p>
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-right">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {new Date().toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Navigation - Section Tabs */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40 shadow-sm">
                <div className="max-w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onSectionChange(item.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all whitespace-nowrap font-medium ${currentSection === item.id
                                        ? 'text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                                        }`}
                                    style={currentSection === item.id ? { backgroundColor: 'rgb(216, 167, 40)' } : {}}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Page Content */}
            <main className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>
        </div>
    );
}
