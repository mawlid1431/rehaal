import { supabase } from './supabase'
import type { TripInsert, GalleryInsert, TestimonialInsert, ServiceInsert, BookingInsert } from './types'

// TRIPS API
export const tripsApi = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('trips')
            .select('*')
            .order('start_date', { ascending: true })
        if (error) throw error
        return data
    },

    getById: async (id: string) => {
        const { data, error } = await supabase
            .from('trips')
            .select('*')
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    },

    create: async (trip: TripInsert) => {
        const { data, error } = await supabase
            .from('trips')
            .insert(trip)
            .select()
            .single()
        if (error) throw error
        return data
    },

    update: async (id: string, trip: Partial<TripInsert>) => {
        const { data, error } = await supabase
            .from('trips')
            .update(trip)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from('trips')
            .delete()
            .eq('id', id)
        if (error) throw error
    }
}

// GALLERY API
export const galleryApi = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false })
        if (error) throw error
        return data
    },

    create: async (item: GalleryInsert) => {
        const { data, error } = await supabase
            .from('gallery')
            .insert(item)
            .select()
            .single()
        if (error) throw error
        return data
    },

    update: async (id: string, item: Partial<GalleryInsert>) => {
        const { data, error } = await supabase
            .from('gallery')
            .update(item)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from('gallery')
            .delete()
            .eq('id', id)
        if (error) throw error
    }
}

// TESTIMONIALS API
export const testimonialsApi = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*, trips(title)')
            .order('date', { ascending: false })
        if (error) throw error
        return data
    },

    create: async (testimonial: TestimonialInsert) => {
        const { data, error } = await supabase
            .from('testimonials')
            .insert(testimonial)
            .select()
            .single()
        if (error) throw error
        return data
    },

    update: async (id: string, testimonial: Partial<TestimonialInsert>) => {
        const { data, error } = await supabase
            .from('testimonials')
            .update(testimonial)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', id)
        if (error) throw error
    }
}

// SERVICES API
export const servicesApi = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: true })
        if (error) throw error
        return data
    },

    create: async (service: ServiceInsert) => {
        const { data, error } = await supabase
            .from('services')
            .insert(service)
            .select()
            .single()
        if (error) throw error
        return data
    },

    update: async (id: string, service: Partial<ServiceInsert>) => {
        const { data, error } = await supabase
            .from('services')
            .update(service)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id)
        if (error) throw error
    }
}

// BOOKINGS API
export const bookingsApi = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('bookings')
            .select('*, trips(title, destination)')
            .order('created_at', { ascending: false })
        if (error) throw error
        return data
    },

    getById: async (id: string) => {
        const { data, error } = await supabase
            .from('bookings')
            .select('*, trips(title, destination, price)')
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    },

    create: async (booking: BookingInsert) => {
        const { data, error } = await supabase
            .from('bookings')
            .insert(booking)
            .select()
            .single()
        if (error) throw error
        return data
    },

    updateStatus: async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
        const { data, error } = await supabase
            .from('bookings')
            .update({ status })
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from('bookings')
            .delete()
            .eq('id', id)
        if (error) throw error
    }
}

// ADMIN USERS API
export const adminUsersApi = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('admin_users')
            .select('id, username, email, full_name, role, is_active, last_login, created_at')
            .order('created_at', { ascending: false })
        if (error) throw error
        return data
    },

    getById: async (id: string) => {
        const { data, error } = await supabase
            .from('admin_users')
            .select('id, username, email, full_name, role, is_active, last_login, created_at')
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    },

    getByEmail: async (email: string) => {
        const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('email', email)
            .single()
        if (error) throw error
        return data
    },

    getByUsername: async (username: string) => {
        const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('username', username)
            .single()
        if (error) throw error
        return data
    },

    create: async (user: any) => {
        const { data, error } = await supabase
            .from('admin_users')
            .insert(user)
            .select('id, username, email, full_name, role, is_active, created_at')
            .single()
        if (error) throw error
        return data
    },

    update: async (id: string, user: any) => {
        const { data, error } = await supabase
            .from('admin_users')
            .update(user)
            .eq('id', id)
            .select('id, username, email, full_name, role, is_active, created_at')
            .single()
        if (error) throw error
        return data
    },

    updateLastLogin: async (id: string) => {
        const { error } = await supabase
            .from('admin_users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', id)
        if (error) throw error
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from('admin_users')
            .delete()
            .eq('id', id)
        if (error) throw error
    }
}

// PASSWORD RESET API
export const passwordResetApi = {
    createToken: async (userId: string, token: string) => {
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 1) // 1 hour expiry

        const { data, error } = await supabase
            .from('password_reset_tokens')
            .insert({
                user_id: userId,
                token,
                expires_at: expiresAt.toISOString()
            })
            .select()
            .single()
        if (error) throw error
        return data
    },

    verifyToken: async (token: string) => {
        const { data, error } = await supabase
            .from('password_reset_tokens')
            .select('*, admin_users(email)')
            .eq('token', token)
            .eq('used', false)
            .single()

        if (error) throw error

        // Check if expired
        if (new Date(data.expires_at) < new Date()) {
            throw new Error('Token expired')
        }

        return data
    },

    markTokenUsed: async (token: string) => {
        const { error } = await supabase
            .from('password_reset_tokens')
            .update({ used: true })
            .eq('token', token)
        if (error) throw error
    }
}

// IMAGE UPLOAD HELPER
export const uploadImage = async (file: File, bucket: string = 'images') => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

    return data.publicUrl
}
