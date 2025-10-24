import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CalendarIcon, Upload } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { tripsApi, uploadImage } from '@/lib/api'
import { toast } from 'sonner'

export function AddTripForm({ onSuccess }: { onSuccess?: () => void }) {
    const [formData, setFormData] = useState({
        title: '',
        destination: '',
        price: '',
        imageUrl: '',
        description: ''
    })
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)

    const calculateDuration = () => {
        if (startDate && endDate) {
            const diff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
            return diff > 0 ? diff : 0
        }
        return 0
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setImageFile(file)
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

        if (!startDate || !endDate) {
            toast.error('Please select start and end dates')
            return
        }

        if (endDate < startDate) {
            toast.error('End date must be after start date')
            return
        }

        setLoading(true)
        try {
            await tripsApi.create({
                title: formData.title,
                destination: formData.destination,
                start_date: format(startDate, 'yyyy-MM-dd'),
                end_date: format(endDate, 'yyyy-MM-dd'),
                duration: calculateDuration(),
                price: parseFloat(formData.price),
                image_url: formData.imageUrl || null,
                description: formData.description || null
            })

            toast.success('Trip created successfully!')

            // Reset form
            setFormData({
                title: '',
                destination: '',
                price: '',
                imageUrl: '',
                description: ''
            })
            setStartDate(undefined)
            setEndDate(undefined)
            setImageFile(null)

            onSuccess?.()
        } catch (error) {
            toast.error('Failed to create trip')
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
                    placeholder="Amazing Paris Adventure"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="destination">Destination *</Label>
                <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    placeholder="Paris, France"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !startDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : "Pick a date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-2">
                    <Label>End Date *</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !endDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP") : "Pick a date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                                disabled={(date) => startDate ? date < startDate : false}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                    value={calculateDuration() ? `${calculateDuration()} days` : 'Select dates'}
                    disabled
                    className="bg-muted"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="1299.99"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Upload Image</Label>
                <div className="flex items-center gap-4">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="flex-1"
                    />
                    {uploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="imageUrl">Or Enter Image URL</Label>
                <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                />
                {formData.imageUrl && (
                    <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="mt-2 h-32 w-full object-cover rounded-md"
                    />
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the trip experience..."
                    rows={4}
                />
            </div>

            <Button type="submit" disabled={loading || uploading} className="w-full">
                {loading ? 'Creating...' : 'Add Trip'}
            </Button>
        </form>
    )
}
