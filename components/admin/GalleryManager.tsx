import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { galleryApi, uploadImage } from '../../lib/api';
import { toast } from 'sonner';

export function GalleryManager() {
    const [gallery, setGallery] = useState<any[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingImage, setEditingImage] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const data = await galleryApi.getAll();
            setGallery(data);
        } catch (error) {
            toast.error('Failed to fetch gallery');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            await galleryApi.delete(id);
            toast.success('Image deleted successfully');
            fetchGallery();
        } catch (error) {
            toast.error('Failed to delete image');
            console.error(error);
        }
    };

    const handleEdit = (image: any) => {
        setEditingImage(image);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingImage(null);
        setIsFormOpen(true);
    };

    if (loading) {
        return <div className="text-sm text-gray-600 dark:text-gray-400">Loading gallery...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Gallery Management</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Image
                </button>
            </div>

            {isFormOpen && (
                <ImageForm
                    image={editingImage}
                    onClose={() => setIsFormOpen(false)}
                    onSave={async (image: any) => {
                        try {
                            if (editingImage) {
                                await galleryApi.update(editingImage.id, image);
                                toast.success('Image updated successfully');
                            } else {
                                await galleryApi.create(image);
                                toast.success('Image added successfully');
                            }
                            setIsFormOpen(false);
                            fetchGallery();
                        } catch (error) {
                            toast.error('Failed to save image');
                            console.error(error);
                        }
                    }}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((image) => (
                    <div
                        key={image.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden group"
                    >
                        <div className="relative">
                            <img
                                src={image.image_url}
                                alt={image.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => handleEdit(image)}
                                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                >
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(image.id)}
                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                                {image.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {image.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ImageForm({ image, onClose, onSave }: {
    image: any | null;
    onClose: () => void;
    onSave: (image: any) => void;
}) {
    const [formData, setFormData] = useState(image || {
        image_url: '',
        title: '',
        description: '',
        category: 'general'
    });
    const [uploading, setUploading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
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
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        {image ? 'Edit Image' : 'Add New Image'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                            >
                                <option value="general">General</option>
                                <option value="trips">Trips</option>
                                <option value="destinations">Destinations</option>
                                <option value="activities">Activities</option>
                            </select>
                        </div>
                        {formData.image_url && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Preview
                                </label>
                                <img src={formData.image_url} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                            </div>
                        )}
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
                                Save Image
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
