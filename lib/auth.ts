import { supabase } from './supabase';

export interface AdminUser {
    id: string;
    email: string;
    user_metadata?: {
        full_name?: string;
        role?: 'super_admin' | 'admin' | 'editor';
    };
}

// Login with Supabase Auth
export const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
};

// Logout
export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

// Get current user
export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
};

// Get current session
export const getSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
    const session = await getSession();
    return !!session;
};

// Get user from localStorage (for quick checks)
export const getAuthUser = (): AdminUser | null => {
    const userData = localStorage.getItem('admin_user');
    return userData ? JSON.parse(userData) : null;
};

// Store user data in localStorage
export const setAuthUser = (user: AdminUser) => {
    localStorage.setItem('admin_user', JSON.stringify(user));
};

// Remove user data from localStorage
export const removeAuthUser = () => {
    localStorage.removeItem('admin_user');
};

// Send password reset email
export const sendPasswordResetEmail = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    if (error) throw error;
};

// Update password
export const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });
    if (error) throw error;
};

// Check if user has permission (based on metadata)
export const hasPermission = (requiredRole: 'super_admin' | 'admin' | 'editor'): boolean => {
    const user = getAuthUser();
    if (!user) return false;

    const roleHierarchy = {
        super_admin: 3,
        admin: 2,
        editor: 1
    };

    const userRole = user.user_metadata?.role || 'editor';
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};
