import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { galleryApi, uploadImage } from '@/lib/api'
import { toast } from 'sonner'

export function AddGalleryForm({ onSuccess }: { onSuccess?: () => void }) {
    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        description: ''
    })
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            const url = await uploadImage(file, 'images')
            setFormData(prev => ({ ...prev, imageUrl: url }))
            toast.success('Image uploaded successfully')
        } catch (error) {
            toast.error('Failed to upload image')
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.imageUrl) {
            toast.error('Please upload an image or provide an image URL')
            return
        }

        setLoading(true)
        try {
            await galleryApi.create({
                title: formData.title,
                image_url: formData.imageUrl,
                description: formData.description || null
            })

            toast.success('Gallery item created successfully!')

            setFormData({
                title: '',
                imageUrl: '',
                description: ''
            })

            onSuccess?.()
        } catch (error) {
            toast.error('Failed to create gallery item')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Sunset in Santorini"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Upload Image *</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                />
                {uploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="imageUrl">Or Enter Image URL *</Label>
                <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    required
                />
                {formData.imageUrl && (
                    <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="mt-2 h-48 w-full object-cover rounded-md"
                    />
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the image..."
                    rows={3}
                />
            </div>

            <Button type="submit" disabled={loading || uploading} className="w-full">
                {loading ? 'Creating...' : 'Add to Gallery'}
            </Button>
        </form>
    )
}
