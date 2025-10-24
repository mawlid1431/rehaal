export interface Trip {
    id: string
    title: string
    destination: string
    start_date: string
    end_date: string
    duration: number
    price: number
    image_url: string | null
    description: string | null
    created_at: string
    updated_at: string
}

export interface Gallery {
    id: string
    title: string
    image_url: string
    description: string | null
    created_at: string
    updated_at: string
}

export interface Testimonial {
    id: string
    customer_name: string
    rating: number
    trip_id: string | null
    date: string
    comment: string
    created_at: string
    updated_at: string
}

export interface Service {
    id: string
    icon: string
    title: string
    description: string
    created_at: string
    updated_at: string
}

export interface Booking {
    id: string
    trip_id: string | null
    customer_name: string
    customer_email: string
    customer_phone: string | null
    number_of_people: number
    booking_date: string
    special_requests: string | null
    status: 'pending' | 'confirmed' | 'cancelled'
    total_price: number | null
    created_at: string
    updated_at: string
}

export type TripInsert = Omit<Trip, 'id' | 'created_at' | 'updated_at'>
export type GalleryInsert = Omit<Gallery, 'id' | 'created_at' | 'updated_at'>
export type TestimonialInsert = Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>
export type ServiceInsert = Omit<Service, 'id' | 'created_at' | 'updated_at'>
export type BookingInsert = Omit<Booking, 'id' | 'created_at' | 'updated_at'>
