import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Plane,
    Hotel,
    Map,
    Shield,
    Camera,
    Utensils,
    Car,
    Compass,
    Briefcase,
    Heart,
    Globe,
    Users
} from 'lucide-react'
import { servicesApi } from '@/lib/api'
import { toast } from 'sonner'

const ICON_OPTIONS = [
    { value: 'plane', label: 'Plane', icon: Plane },
    { value: 'hotel', label: 'Hotel', icon: Hotel },
    { value: 'map', label: 'Map', icon: Map },
    { value: 'shield', label: 'Shield', icon: Shield },
    { value: 'camera', label: 'Camera', icon: Camera },
    { value: 'utensils', label: 'Utensils', icon: Utensils },
    { value: 'car', label: 'Car', icon: Car },
    { value: 'compass', label: 'Compass', icon: Compass },
    { value: 'briefcase', label: 'Briefcase', icon: Briefcase },
    { value: 'heart', label: 'Heart', icon: Heart },
    { value: 'globe', label: 'Globe', icon: Globe },
    { value: 'users', label: 'Users', icon: Users }
]

export function AddServiceForm({ onSuccess }: { onSuccess?: () => void }) {
    const [formData, setFormData] = useState({
        icon: '',
        title: '',
        description: ''
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.icon) {
            toast.error('Please select an icon')
            return
        }

        setLoading(true)
        try {
            await servicesApi.create({
                icon: formData.icon,
                title: formData.title,
                description: formData.description
            })

            toast.success('Service created successfully!')

            setFormData({
                icon: '',
                title: '',
                description: ''
            })

            onSuccess?.()
        } catch (error) {
            toast.error('Failed to create service')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const SelectedIcon = ICON_OPTIONS.find(opt => opt.value === formData.icon)?.icon

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
                <Label htmlFor="icon">Select Icon *</Label>
                <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Choose an icon" />
                    </SelectTrigger>
                    <SelectContent>
                        {ICON_OPTIONS.map((option) => {
                            const IconComponent = option.icon
                            return (
                                <SelectItem key={option.value} value={option.value}>
                                    <div className="flex items-center gap-2">
                                        <IconComponent className="h-4 w-4" />
                                        <span>{option.label}</span>
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
                {SelectedIcon && (
                    <div className="flex items-center gap-2 p-4 border rounded-md bg-muted">
                        <SelectedIcon className="h-8 w-8" />
                        <span className="text-sm text-muted-foreground">Selected icon preview</span>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Flight Booking"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the service..."
                    rows={4}
                    required
                />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Creating...' : 'Add Service'}
            </Button>
        </form>
    )
}
