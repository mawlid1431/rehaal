import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon, Star } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { testimonialsApi, tripsApi } from '@/lib/api'
import { toast } from 'sonner'
import type { Trip } from '@/lib/types'

export function AddTestimonialForm({ onSuccess }: { onSuccess?: () => void }) {
    const [formData, setFormData] = useState({
        customerName: '',
        rating: 5,
        tripId: '',
        comment: ''
    })
    const [date, setDate] = useState<Date>()
    const [trips, setTrips] = useState<Trip[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await tripsApi.getAll()
                setTrips(data)
            } catch (error) {
                console.error('Failed to fetch trips:', error)
            }
        }
        fetchTrips()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!date) {
            toast.error('Please select a date')
            return
        }

        setLoading(true)
        try {
            await testimonialsApi.create({
                customer_name: formData.customerName,
                rating: formData.rating,
                trip_id: formData.tripId || null,
                date: format(date, 'yyyy-MM-dd'),
                comment: formData.comment
            })

            toast.success('Testimonial created successfully!')

            setFormData({
                customerName: '',
                rating: 5,
                tripId: '',
                comment: ''
            })
            setDate(undefined)

            onSuccess?.()
        } catch (error) {
            toast.error('Failed to create testimonial')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="John Doe"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Rating *</Label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                            className="focus:outline-none"
                        >
                            <Star
                                className={cn(
                                    "h-8 w-8 transition-colors",
                                    star <= formData.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                )}
                            />
                        </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground self-center">
                        {formData.rating} / 5
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="tripId">Trip (Optional)</Label>
                <Select
                    value={formData.tripId}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, tripId: value }))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a trip" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {trips.map((trip) => (
                            <SelectItem key={trip.id} value={trip.id}>
                                {trip.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Date *</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="space-y-2">
                <Label htmlFor="comment">Comment *</Label>
                <Textarea
                    id="comment"
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Share your experience..."
                    rows={4}
                    required
                />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Creating...' : 'Add Testimonial'}
            </Button>
        </form>
    )
}
