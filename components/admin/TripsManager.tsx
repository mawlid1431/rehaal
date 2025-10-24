import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { tripsApi, uploadImage } from '../../lib/api';
import { toast } from 'sonner';

export function TripsManager() {
    const [trips, setTrips] = useState<any[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTrip, setEditingTrip] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const data = await tripsApi.getAll();
            setTrips(data);
        } catch (error) {
            toast.error('Failed to fetch trips');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this trip?')) return;

        try {
            await tripsApi.delete(id);
            toast.success('Trip deleted successfully');
            fetchTrips();
        } catch (error) {
            toast.error('Failed to delete trip');
            console.error(error);
        }
    };

    const handleEdit = (trip: any) => {
        setEditingTrip(trip);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingTrip(null);
        setIsFormOpen(true);
    };

    if (loading) {
        return <div className="text-sm text-gray-600 dark:text-gray-400">Loading trips...</div>;
    }

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
                    onSave={async (trip: any) => {
                        try {
                            if (editingTrip) {
                                await tripsApi.update(editingTrip.id, trip);
                                toast.success('Trip updated successfully');
                            } else {
                                await tripsApi.create(trip);
                                toast.success('Trip created successfully');
                            }
                            setIsFormOpen(false);
                            fetchTrips();
                        } catch (error) {
                            toast.error('Failed to save trip');
                            console.error(error);
                        }
                    }}
                />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {trips.map((trip) => {
                    // Check if trip is past
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const isPast = new Date(trip.end_date) < today;

                    return (
                        <div
                            key={trip.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
                        >
                            <div className="relative h-32 sm:h-36">
                                <img
                                    src={trip.image_url}
                                    alt={trip.title}
                                    className={`w-full h-full object-cover ${isPast ? 'grayscale opacity-70' : ''}`}
                                />
                                <div className="absolute top-1.5 left-1.5 flex gap-1.5">
                                    {isPast ? (
                                        <div className="bg-gray-600 text-white px-2 py-0.5 rounded text-[10px] font-semibold shadow-lg">
                                            Past Trip
                                        </div>
                                    ) : (
                                        <div className="bg-green-600 text-white px-2 py-0.5 rounded text-[10px] font-semibold shadow-lg">
                                            Upcoming
                                        </div>
                                    )}
                                </div>
                                {!trip.is_active && (
                                    <div className="absolute top-1.5 right-1.5 bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px]">
                                        Inactive
                                    </div>
                                )}
                            </div>
                            <div className="p-3 flex-1 flex flex-col">
                                <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">
                                    {trip.title}
                                </h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-1">{trip.destination}</p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-500 mb-0.5">
                                    {new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-500 mb-0.5">
                                    {trip.duration} • {trip.available_slots} slots
                                </p>
                                <p className="text-base font-bold mb-2 mt-1" style={{ color: 'rgb(216, 167, 40)' }}>
                                    ${trip.price}
                                </p>
                                <div className="flex gap-1.5 mt-auto">
                                    <button
                                        onClick={() => handleEdit(trip)}
                                        className="flex items-center justify-center gap-1 px-2 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-xs flex-1"
                                        title="Edit"
                                    >
                                        <Edit className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(trip.id)}
                                        className="flex items-center justify-center px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function TripForm({ trip, onClose, onSave }: {
    trip: any | null;
    onClose: () => void;
    onSave: (trip: any) => void;
}) {
    const [formData, setFormData] = useState(trip || {
        title: '',
        destination: '',
        start_date: '',
        end_date: '',
        duration: '',
        price: 0,
        image_url: '',
        description: '',
        available_slots: 0,
        is_active: true,
        category: 'upcoming' // 'upcoming' or 'past'
    });
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleImageUpload = async (file: File) => {
        try {
            setUploading(true);
            const url = await uploadImage(file);
            setFormData({ ...formData, image_url: url });
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload image');
            console.error(error);
        } finally {
            setUploading(false);
        }
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Destination
                            </label>
                            <input
                                type="text"
                                value={formData.destination}
                                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                placeholder="Paris, France"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Category Selector */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Trip Category
                            </label>
                            <select
                                value={formData.category || 'upcoming'}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all"
                            >
                                <option value="upcoming">Upcoming Trip</option>
                                <option value="past">Past Trip</option>
                            </select>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {formData.category === 'past'
                                    ? 'Will show in "Past Trips" section with grayscale effect'
                                    : 'Will show in "Upcoming Trips" section with full color'
                                }
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Duration (days)
                                </label>
                                <input
                                    type="text"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                    placeholder="7 days"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                    placeholder="1299"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Available Slots
                            </label>
                            <input
                                type="number"
                                value={formData.available_slots}
                                onChange={(e) => setFormData({ ...formData, available_slots: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                placeholder="20"
                                required
                            />
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
                                            handleImageUpload(file);
                                        }
                                    }}
                                    disabled={uploading}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 dark:file:bg-gray-600 dark:file:text-gray-200"
                                />
                                {uploading && <p className="text-sm text-blue-600">Uploading...</p>}
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Or enter image URL:
                                </div>
                                <input
                                    type="url"
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                />
                                {formData.image_url && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Preview:</p>
                                        <img
                                            src={formData.image_url}
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
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Active (visible on website)
                            </label>
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
                </div >
            </div >
        </div >
    );
}
