import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { testimonialsApi, tripsApi } from '../../lib/api';
import { toast } from 'sonner';

export function TestimonialsManager() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [trips, setTrips] = useState<any[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [testimonialsData, tripsData] = await Promise.all([
                testimonialsApi.getAll(),
                tripsApi.getAll()
            ]);
            setTestimonials(testimonialsData);
            setTrips(tripsData);
        } catch (error) {
            toast.error('Failed to fetch data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;

        try {
            await testimonialsApi.delete(id);
            toast.success('Testimonial deleted successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete testimonial');
            console.error(error);
        }
    };

    const handleEdit = (testimonial: any) => {
        setEditingTestimonial(testimonial);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingTestimonial(null);
        setIsFormOpen(true);
    };

    if (loading) {
        return <div className="text-sm text-gray-600 dark:text-gray-400">Loading testimonials...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Testimonials Management</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Testimonial
                </button>
            </div>

            {isFormOpen && (
                <TestimonialForm
                    testimonial={editingTestimonial}
                    trips={trips}
                    onClose={() => setIsFormOpen(false)}
                    onSave={async (testimonial: any) => {
                        try {
                            if (editingTestimonial) {
                                await testimonialsApi.update(editingTestimonial.id, testimonial);
                                toast.success('Testimonial updated successfully');
                            } else {
                                await testimonialsApi.create(testimonial);
                                toast.success('Testimonial created successfully');
                            }
                            setIsFormOpen(false);
                            fetchData();
                        } catch (error) {
                            toast.error('Failed to save testimonial');
                            console.error(error);
                        }
                    }}
                />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-3 flex flex-col hover:shadow-lg transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-1">
                                    {testimonial.customer_name}
                                </h3>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                                    {new Date(testimonial.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                            <div className="flex gap-0.5 flex-shrink-0 ml-2">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">
                            {testimonial.trips?.title || 'N/A'}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 flex-1 line-clamp-2">
                            {testimonial.comment}
                        </p>
                        <div className="flex gap-1.5 mt-auto">
                            <button
                                onClick={() => handleEdit(testimonial)}
                                className="flex items-center justify-center gap-1 px-2 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-xs flex-1"
                                title="Edit"
                            >
                                <Edit className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                                onClick={() => handleDelete(testimonial.id)}
                                className="flex items-center justify-center px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
                                title="Delete"
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

function TestimonialForm({ testimonial, trips, onClose, onSave }: {
    testimonial: any | null;
    trips: any[];
    onClose: () => void;
    onSave: (testimonial: any) => void;
}) {
    const [formData, setFormData] = useState(testimonial || {
        customer_name: '',
        rating: 5,
        comment: '',
        date: new Date().toISOString().split('T')[0],
        trip_id: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                value={formData.customer_name}
                                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Rating
                            </label>
                            <select
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                            >
                                {[5, 4, 3, 2, 1].map(num => (
                                    <option key={num} value={num}>{num} Stars</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Trip
                            </label>
                            <select
                                value={formData.trip_id}
                                onChange={(e) => setFormData({ ...formData, trip_id: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                required
                            >
                                <option value="">Select a trip</option>
                                {trips.map((trip) => (
                                    <option key={trip.id} value={trip.id}>
                                        {trip.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Date
                            </label>
                            <input
                                type="text"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Comment
                            </label>
                            <textarea
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
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
                                Save Testimonial
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
