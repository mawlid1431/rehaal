import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { trips as initialTrips } from '../../lib/data';

export function TripsManager() {
    const [trips, setTrips] = useState(initialTrips);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTrip, setEditingTrip] = useState<typeof initialTrips[0] | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this trip?')) {
            setTrips(trips.filter(trip => trip.id !== id));
        }
    };

    const handleEdit = (trip: typeof initialTrips[0]) => {
        setEditingTrip(trip);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingTrip(null);
        setIsFormOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Trips Management</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add New Trip
                </button>
            </div>

            {isFormOpen && (
                <TripForm
                    trip={editingTrip}
                    onClose={() => setIsFormOpen(false)}
                    onSave={(trip: typeof initialTrips[0]) => {
                        if (editingTrip) {
                            setTrips(trips.map(t => t.id === trip.id ? trip : t));
                        } else {
                            setTrips([...trips, { ...trip, id: Math.max(...trips.map(t => t.id)) + 1 }]);
                        }
                        setIsFormOpen(false);
                    }}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip) => (
                    <div
                        key={trip.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
                    >
                        <div className="relative h-48">
                            <img
                                src={trip.image}
                                alt={trip.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                                {trip.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{trip.destination}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                                {trip.dates}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                                {trip.duration}
                            </p>
                            <p className="text-lg font-semibold mb-4" style={{ color: 'rgb(216, 167, 40)' }}>
                                {trip.price}
                            </p>
                            <div className="flex gap-2 mt-auto">
                                <button
                                    onClick={() => handleEdit(trip)}
                                    className="flex items-center gap-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm flex-1"
                                    title="Edit"
                                >
                                    <Edit className="w-4 h-4" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(trip.id)}
                                    className="flex items-center gap-1 px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TripForm({ trip, onClose, onSave }: {
    trip: typeof initialTrips[0] | null;
    onClose: () => void;
    onSave: (trip: typeof initialTrips[0]) => void;
}) {
    const [formData, setFormData] = useState(trip || {
        title: '',
        destination: '',
        dates: '',
        duration: '',
        price: '',
        image: '',
        description: '',
        includes: []
    });
    const [destinations, setDestinations] = useState<string[]>([formData.destination || '']);
    const [durations, setDurations] = useState<string[]>([formData.duration || '']);
    const [prices, setPrices] = useState<string[]>([formData.price || '']);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData = {
            ...formData,
            destination: destinations.filter(d => d).join(', '),
            duration: durations[0] || '',
            price: prices[0] || ''
        };
        onSave({ ...updatedData, id: 'id' in formData ? formData.id : 0 });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        {trip ? 'Edit Trip' : 'Add New Trip'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Destination
                                </label>
                                {destinations.map((dest, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={dest}
                                            onChange={(e) => {
                                                const newDests = [...destinations];
                                                newDests[index] = e.target.value;
                                                setDestinations(newDests);
                                            }}
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                            placeholder="Paris, France"
                                            required
                                        />
                                        {destinations.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setDestinations(destinations.filter((_, i) => i !== index))}
                                                className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setDestinations([...destinations, ''])}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    + Add
                                </button>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Dates
                                </label>
                                <input
                                    type="date"
                                    value={formData.dates}
                                    onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Duration
                                </label>
                                {durations.map((dur, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={dur}
                                            onChange={(e) => {
                                                const newDurs = [...durations];
                                                newDurs[index] = e.target.value;
                                                setDurations(newDurs);
                                            }}
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                            placeholder="7 days"
                                            required
                                        />
                                        {durations.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setDurations(durations.filter((_, i) => i !== index))}
                                                className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setDurations([...durations, ''])}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    + Add
                                </button>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Price
                                </label>
                                {prices.map((price, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={price}
                                            onChange={(e) => {
                                                const newPrices = [...prices];
                                                newPrices[index] = e.target.value;
                                                setPrices(newPrices);
                                            }}
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                            placeholder="$1299"
                                            required
                                        />
                                        {prices.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setPrices(prices.filter((_, i) => i !== index))}
                                                className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setPrices([...prices, ''])}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Upload Image
                            </label>
                            <div className="space-y-3">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setFormData({ ...formData, image: reader.result as string });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 dark:file:bg-gray-600 dark:file:text-gray-200"
                                />
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Or enter image URL:
                                </div>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                />
                                {formData.image && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Preview:</p>
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                                        />
                                    </div>
                                )}
                            </div>
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
                                Save Trip
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
