import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Mail, Phone, MapPin, User, CreditCard, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { tripsApi, bookingsApi } from '../../lib/api';
import { toast } from 'sonner';

interface BookingPageProps {
    tripId: number;
    onNavigate: (page: string) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ tripId, onNavigate }) => {
    const [trip, setTrip] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchTrip();
    }, [tripId]);

    const fetchTrip = async () => {
        try {
            const data = await tripsApi.getById(tripId.toString());
            setTrip(data);
        } catch (error) {
            console.error('Failed to fetch trip:', error);
        } finally {
            setLoading(false);
        }
    };

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        numberOfTravelers: '1',
        specialRequests: '',
        passportNumber: '',
        dateOfBirth: '',
        emergencyContact: '',
        emergencyPhone: ''
    });

    if (loading) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="text-center">Loading booking form...</div>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl mb-4">Trip not found</h2>
                    <Button onClick={() => onNavigate('trips')}>Back to Trips</Button>
                </div>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Create booking object matching database schema
            const bookingData = {
                trip_id: tripId.toString(),
                customer_name: formData.fullName,
                customer_email: formData.email,
                customer_phone: formData.phone,
                number_of_people: parseInt(formData.numberOfTravelers),
                booking_date: new Date().toISOString(),
                special_requests: `
Address: ${formData.address}
Date of Birth: ${formData.dateOfBirth}
Passport Number: ${formData.passportNumber}
Emergency Contact: ${formData.emergencyContact} (${formData.emergencyPhone})
${formData.specialRequests ? `\nSpecial Requests: ${formData.specialRequests}` : ''}
                `.trim(),
                status: 'pending' as const,
                total_price: trip.price * parseInt(formData.numberOfTravelers)
            };

            await bookingsApi.create(bookingData);
            toast.success('Booking request submitted successfully! We will contact you shortly.');

            // Reset form
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                address: '',
                numberOfTravelers: '1',
                specialRequests: '',
                passportNumber: '',
                dateOfBirth: '',
                emergencyContact: '',
                emergencyPhone: ''
            });
        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Failed to submit booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative h-80 flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${trip.image})`,
                    }}
                />
                <div className="absolute inset-0 bg-black/70" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative text-center text-white z-10 px-4"
                >
                    <h1 className="text-4xl md:text-5xl mb-4 text-white font-bold">Book Your Journey</h1>
                    <p className="text-xl text-white/90">{trip.title}</p>
                    <div className="w-32 h-1 bg-[rgb(216,167,40)] mx-auto mt-4" />
                </motion.div>
            </section>

            {/* Booking Form Section */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Booking Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative bg-gradient-to-br from-card via-card to-card/80 p-8 rounded-2xl shadow-xl border-2 border-[rgb(216,167,40)]/20 overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[rgb(216,167,40)]/10 rounded-full blur-3xl" />

                                <div className="relative z-10">
                                    <h2 className="text-3xl mb-6 font-bold">Booking Information</h2>
                                    <p className="text-muted-foreground mb-8">
                                        Please fill in your details below. All fields marked with * are required.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Personal Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-semibold text-[rgb(216,167,40)] mb-4">Personal Information</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="fullName" className="flex items-center gap-2 mb-2">
                                                        <User className="w-4 h-4 text-[rgb(216,167,40)]" />
                                                        Full Name *
                                                    </Label>
                                                    <Input
                                                        id="fullName"
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Enter your full name"
                                                        className="border-[rgb(216,167,40)]/30 focus:border-[rgb(216,167,40)]"
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                                                        <Mail className="w-4 h-4 text-[rgb(216,167,40)]" />
                                                        Email Address *
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="your.email@example.com"
                                                        className="border-[rgb(216,167,40)]/30 focus:border-[rgb(216,167,40)]"
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                                                        <Phone className="w-4 h-4 text-[rgb(216,167,40)]" />
                                                        Phone Number *
                                                    </Label>
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="+45 12 34 56 78"
                                                        className="border-[rgb(216,167,40)]/30 focus:border-[rgb(216,167,40)]"
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="dateOfBirth" className="flex items-center gap-2 mb-2">
                                                        <Calendar className="w-4 h-4 text-[rgb(216,167,40)]" />
                                                        Date of Birth *
                                                    </Label>
                                                    <Input
                                                        id="dateOfBirth"
                                                        name="dateOfBirth"
                                                        type="date"
                                                        value={formData.dateOfBirth}
                                                        onChange={handleChange}
                                                        required
                                                        className="border-[rgb(216,167,40)]/30 focus:border-[rgb(216,167,40)]"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="address" className="flex items-center gap-2 mb-2">
                                                    <MapPin className="w-4 h-4 text-[rgb(216,167,40)]" />
                                                    Address *
                                                </Label>
                                                <Input
                                                    id="address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your full address"
                                                    className="border-[rgb(216,167,40)]/30 focus:border-[rgb(216,167,40)]"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="passportNumber" className="flex items-center gap-2 mb-2">
                                                    <CreditCard className="w-4 h-4 text-[rgb(216,167,40)]" />
                                                    Passport Number *
                                                </Label>
                                                <Input
                                                    id="passportNumber"
                                                    name="passportNumber"
                                                    value={formData.passportNumber}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Enter your passport number"
                                                    className="border-[rgb(216,167,40)]/30 focus:border-[rgb(216,167,40)]"
                                                />
                                            </div>
                                        </div>

                                        {/* Travel Details */}
                                        <div className="space-y-4 pt-6 border-t border-[rgb(216,167,40)]/20">
                                            <h3 className="text-xl font-semibold text-[rgb(216,167,40)] mb-4">Travel Details</h3>

                                            <div>
                                                <Label htmlFor="numberOfTravelers" className="flex items-center gap-2 mb-2">
                                                    <Users className="w-4 h-4 text-[rgb(216,167,40)]" />
                                                    Number of Travelers *
                                                </Label>
                                                <select
                                                    id="numberOfTravelers"
                                                    name="numberOfTravelers"
                                                    value={formData.numberOfTravelers}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-3 py-2 border border-[rgb(216,167,40)]/30 rounded-md focus:border-[rgb(216,167,40)] focus:outline-none focus:ring-2 focus:ring-[rgb(216,167,40)]/20 bg-background"
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Emergency Contact */}
                                        <div className="space-y-4 pt-6 border-t border-[rgb(216,167,40)]/20">
                                            <h3 className="text-xl font-semibold text-[rgb(216,167,40)] mb-4">Emergency Contact</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="emergencyContact" className="flex items-center gap-2 mb-2">
                                                        <User className="w-4 h-4 text-[rgb(216,167,40)]" />
                                                        Emergency Contact Name *
                                                    </Label>
                                                    <Input
                                                        id="emergencyContact"
                                                        name="emergencyContact"
                                                        value={formData.emergencyContact}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Contact person name"
                                                        className="border-[rgb(216,167,40)]/30 focus:border-[rgb(216,167,40)]"
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="emergencyPhone" className="flex items-center gap-2 mb-2">
                                                        <Phone className="w-4 h-4 text-[rgb(216,167,40)]" />
                                                        Emergency Phone *
                                                    </Label>
                                                    <Input
                                                        id="emergencyPhone"
                                                        name="emergencyPhone"
                                                        type="tel"
                                                        value={formData.emergencyPhone}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="+45 12 34 56 78"
                                                        className="border-[rgb(216,167,40)]/30 focus:border-[rgb(216,167,40)]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Special Requests */}
                                        <div className="pt-6 border-t border-[rgb(216,167,40)]/20">
                                            <Label htmlFor="specialRequests" className="flex items-center gap-2 mb-2">
                                                <MessageSquare className="w-4 h-4 text-[rgb(216,167,40)]" />
                                                Special Requests or Requirements
                                            </Label>
                                            <Textarea
                                                id="specialRequests"
                                                name="specialRequests"
                                                value={formData.specialRequests}
                                                onChange={handleChange}
                                                placeholder="Any special requirements, dietary restrictions, medical conditions, or other information we should know..."
                                                rows={4}
                                                className="border-[rgb(216,167,40)]/30 focus:border-[rgb(216,167,40)]"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-6">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-6 text-lg font-semibold"
                                                style={{ backgroundColor: 'rgb(216, 167, 40)' }}
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                                            </Button>
                                            <p className="text-sm text-muted-foreground text-center mt-4">
                                                By submitting this form, you agree to our terms and conditions. We will contact you within 24 hours to confirm your booking.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </div>

                        {/* Trip Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative bg-gradient-to-br from-card via-card to-card/80 p-8 rounded-2xl shadow-xl border-2 border-[rgb(216,167,40)]/20 overflow-hidden group sticky top-24"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[rgb(216,167,40)]/10 rounded-full blur-3xl" />

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-6">Trip Summary</h3>

                                    <div className="mb-6">
                                        <img
                                            src={trip.image}
                                            alt={trip.title}
                                            className="w-full h-48 object-cover rounded-xl mb-4"
                                        />
                                        <h4 className="text-xl font-semibold mb-2">{trip.title}</h4>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-start space-x-3 pb-3 border-b border-[rgb(216,167,40)]/20">
                                            <MapPin className="w-5 h-5 text-[rgb(216,167,40)] mt-0.5" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Destination</p>
                                                <p className="font-medium">{trip.destination}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3 pb-3 border-b border-[rgb(216,167,40)]/20">
                                            <Calendar className="w-5 h-5 text-[rgb(216,167,40)] mt-0.5" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Dates</p>
                                                <p className="font-medium">{trip.dates}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3 pb-3 border-b border-[rgb(216,167,40)]/20">
                                            <Calendar className="w-5 h-5 text-[rgb(216,167,40)] mt-0.5" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Duration</p>
                                                <p className="font-medium">{trip.duration}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-[rgb(216,167,40)]/10 to-transparent p-4 rounded-xl mb-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Price per person</span>
                                            <span className="text-2xl font-bold text-[rgb(216,167,40)]">{trip.price}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <p>✓ Flexible payment plans available</p>
                                        <p>✓ Full support from booking to return</p>
                                        <p>✓ 24/7 assistance during your journey</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
