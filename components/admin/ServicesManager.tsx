import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { aboutCards as initialServices } from '../../lib/data';

export function ServicesManager() {
    const [services, setServices] = useState(initialServices);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingService, setEditingService] = useState<typeof initialServices[0] | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter(s => s.id !== id));
        }
    };

    const handleEdit = (service: typeof initialServices[0]) => {
        setEditingService(service);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingService(null);
        setIsFormOpen(true);
    };

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
                    onSave={(service: typeof initialServices[0]) => {
                        if (editingService) {
                            setServices(services.map(s => s.id === service.id ? service : s));
                        } else {
                            setServices([...services, { ...service, id: Math.max(...services.map(s => s.id)) + 1 }]);
                        }
                        setIsFormOpen(false);
                    }}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
                    >
                        <div className="text-4xl mb-3">{service.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {service.description}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(service)}
                                className="flex items-center gap-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm"
                            >
                                <Edit className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(service.id)}
                                className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ServiceForm({ service, onClose, onSave }: {
    service: typeof initialServices[0] | null;
    onClose: () => void;
    onSave: (service: typeof initialServices[0]) => void;
}) {
    const [formData, setFormData] = useState(service || {
        title: '',
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
        onSave({ ...formData, id: 'id' in formData ? formData.id : 0 });
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
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
