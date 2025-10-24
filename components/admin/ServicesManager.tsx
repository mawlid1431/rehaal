import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { servicesApi } from '../../lib/api';
import { toast } from 'sonner';

export function ServicesManager() {
    const [services, setServices] = useState<any[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingService, setEditingService] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const data = await servicesApi.getAll();
            setServices(data);
        } catch (error) {
            toast.error('Failed to fetch services');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            await servicesApi.delete(id);
            toast.success('Service deleted successfully');
            fetchServices();
        } catch (error) {
            toast.error('Failed to delete service');
            console.error(error);
        }
    };

    const handleEdit = (service: any) => {
        setEditingService(service);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingService(null);
        setIsFormOpen(true);
    };

    if (loading) {
        return <div className="text-sm text-gray-600 dark:text-gray-400">Loading services...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Services Management</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Service
                </button>
            </div>

            {isFormOpen && (
                <ServiceForm
                    service={editingService}
                    onClose={() => setIsFormOpen(false)}
                    onSave={async (service: any) => {
                        try {
                            if (editingService) {
                                await servicesApi.update(editingService.id, service);
                                toast.success('Service updated successfully');
                            } else {
                                await servicesApi.create(service);
                                toast.success('Service created successfully');
                            }
                            setIsFormOpen(false);
                            fetchServices();
                        } catch (error) {
                            toast.error('Failed to save service');
                            console.error(error);
                        }
                    }}
                />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
                    >
                        <div className="text-3xl mb-2">{service.icon}</div>
                        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">
                            {service.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                            {service.description}
                        </p>
                        <div className="flex gap-1.5">
                            <button
                                onClick={() => handleEdit(service)}
                                className="flex items-center justify-center gap-1 px-2 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-xs flex-1"
                            >
                                <Edit className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                                onClick={() => handleDelete(service.id)}
                                className="flex items-center justify-center px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ServiceForm({ service, onClose, onSave }: {
    service: any | null;
    onClose: () => void;
    onSave: (service: any) => void;
}) {
    const [formData, setFormData] = useState(service || {
        name: '',
        description: '',
        icon: '✨'
    });

    // Service-related icons
    const iconOptions = [
        { value: '🕊️', label: '🕊️ Dove (Peace/Sincerity)' },
        { value: '🤝', label: '🤝 Handshake (Trust)' },
        { value: '🌍', label: '🌍 Globe (Community)' },
        { value: '📖', label: '📖 Book (Knowledge)' },
        { value: '💫', label: '💫 Sparkles (Excellence)' },
        { value: '⭐', label: '⭐ Star (Experience)' },
        { value: '✈️', label: '✈️ Airplane (Flights)' },
        { value: '🏨', label: '🏨 Hotel (Accommodation)' },
        { value: '🛂', label: '🛂 Passport (Visa)' },
        { value: '🚌', label: '🚌 Bus (Transportation)' },
        { value: '🗺️', label: '🗺️ Map (Tours)' },
        { value: '👥', label: '👥 People (Group)' },
        { value: '🕋', label: '🕋 Kaaba (Umrah/Hajj)' },
        { value: '🌙', label: '🌙 Crescent (Islamic)' },
        { value: '📱', label: '📱 Phone (Support)' },
        { value: '💳', label: '💳 Card (Payment)' },
        { value: '🎓', label: '🎓 Graduate (Education)' },
        { value: '🏆', label: '🏆 Trophy (Quality)' },
        { value: '✅', label: '✅ Check (Guarantee)' },
        { value: '🌟', label: '🌟 Glowing Star (Premium)' },
        { value: '🎯', label: '🎯 Target (Goal)' },
        { value: '💼', label: '💼 Briefcase (Professional)' },
        { value: '🔒', label: '🔒 Lock (Security)' },
        { value: '⏰', label: '⏰ Clock (24/7)' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        {service ? 'Edit Service' : 'Add New Service'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Select Icon
                            </label>
                            <select
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-lg"
                                required
                            >
                                {iconOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                                <span className="text-5xl">{formData.icon}</span>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Preview</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Service Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                required
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Save Service
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
