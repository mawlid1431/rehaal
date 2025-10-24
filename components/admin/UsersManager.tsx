import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Shield, User, Mail, Key, Eye, EyeOff } from 'lucide-react';
import { adminUsersApi } from '../../lib/api';
import { hashPassword, getAuthUser } from '../../lib/auth';
import { toast } from 'sonner';

export function UsersManager() {
    const [users, setUsers] = useState<any[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const currentUser = getAuthUser();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await adminUsersApi.getAll();
            setUsers(data);
        } catch (error) {
            toast.error('Failed to fetch users');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (currentUser?.id === id) {
            toast.error('You cannot delete your own account');
            return;
        }

        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            await adminUsersApi.delete(id);
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            toast.error('Failed to delete user');
            console.error(error);
        }
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingUser(null);
        setIsFormOpen(true);
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'super_admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'admin': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'editor': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    if (loading) {
        return <div className="text-sm text-gray-600 dark:text-gray-400">Loading users...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Users Management</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add User
                </button>
            </div>

            {isFormOpen && (
                <UserForm
                    user={editingUser}
                    currentUser={currentUser}
                    onClose={() => setIsFormOpen(false)}
                    onSave={async (user: any) => {
                        try {
                            if (editingUser) {
                                await adminUsersApi.update(editingUser.id, user);
                                toast.success('User updated successfully');
                            } else {
                                await adminUsersApi.create(user);
                                toast.success('User created successfully');
                            }
                            setIsFormOpen(false);
                            fetchUsers();
                        } catch (error: any) {
                            toast.error(error.message || 'Failed to save user');
                            console.error(error);
                        }
                    }}
                />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-1">
                                        {user.full_name}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                        @{user.username}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                                    {user.email}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getRoleBadgeColor(user.role)}`}>
                                    {user.role.replace('_', ' ')}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${user.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                                {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                            {user.last_login && (
                                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                    Last: {new Date(user.last_login).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                            )}
                        </div>

                        <div className="flex gap-1.5">
                            <button
                                onClick={() => handleEdit(user)}
                                className="flex items-center justify-center gap-1 px-2 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-xs flex-1"
                                title="Edit"
                            >
                                <Edit className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                disabled={currentUser?.id === user.id}
                                className="flex items-center justify-center px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Delete"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {users.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    No users found
                </div>
            )}
        </div>
    );
}

function UserForm({ user, currentUser, onClose, onSave }: {
    user: any | null;
    currentUser: any;
    onClose: () => void;
    onSave: (user: any) => void;
}) {
    const [formData, setFormData] = useState(user || {
        username: '',
        email: '',
        full_name: '',
        password: '',
        role: 'admin',
        is_active: true
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userData: any = {
                username: formData.username,
                email: formData.email,
                full_name: formData.full_name,
                role: formData.role,
                is_active: formData.is_active
            };

            // Only hash password if it's provided (new user or password change)
            if (formData.password) {
                userData.password_hash = await hashPassword(formData.password);
            }

            onSave(userData);
        } catch (error) {
            toast.error('Failed to process user data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const canEditRole = currentUser?.role === 'super_admin';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        {user ? 'Edit User' : 'Add New User'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Username *
                                </label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Password {user ? '(leave blank to keep current)' : '*'}
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                    required={!user}
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {!user && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Minimum 6 characters
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Role *
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                disabled={!canEditRole}
                                required
                            >
                                <option value="editor">Editor - Can edit content</option>
                                <option value="admin">Admin - Full access except user management</option>
                                <option value="super_admin">Super Admin - Full system access</option>
                            </select>
                            {!canEditRole && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Only Super Admins can change roles
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Active (user can login)
                            </label>
                        </div>

                        <div className="flex gap-2 justify-end pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : user ? 'Update User' : 'Create User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
