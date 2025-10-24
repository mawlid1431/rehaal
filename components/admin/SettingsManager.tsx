import { useState } from 'react';
import { Lock, Eye, EyeOff, User, Mail, Shield, Save } from 'lucide-react';
import { getAuthUser, updatePassword, login } from '../../lib/auth';
import { toast } from 'sonner';

export function SettingsManager() {
    const currentUser = getAuthUser();
    const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === 'profile'
                            ? 'text-[rgb(216,167,40)] border-b-2 border-[rgb(216,167,40)]'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Profile
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('password')}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === 'password'
                            ? 'text-[rgb(216,167,40)] border-b-2 border-[rgb(216,167,40)]'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Change Password
                    </div>
                </button>
            </div>

            {/* Content */}
            {activeTab === 'profile' ? (
                <ProfileSection user={currentUser} />
            ) : (
                <PasswordSection user={currentUser} />
            )}
        </div>
    );
}

function ProfileSection({ user }: { user: any }) {
    return (
        <div className="max-w-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Profile Information
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </div>
                        </label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Email cannot be changed
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Full Name
                            </div>
                        </label>
                        <input
                            type="text"
                            value={user?.user_metadata?.full_name || ''}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Role
                            </div>
                        </label>
                        <input
                            type="text"
                            value={user?.user_metadata?.role || 'admin'}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white cursor-not-allowed capitalize"
                        />
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            <strong>Note:</strong> To update your profile information, please contact the system administrator.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PasswordSection({ user }: { user: any }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (newPassword.length < 6) {
            toast.error('New password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        if (currentPassword === newPassword) {
            toast.error('New password must be different from current password');
            return;
        }

        setLoading(true);

        try {
            // First, verify current password by attempting to login
            await login(user?.email || '', currentPassword);

            // If login successful, update password
            await updatePassword(newPassword);

            toast.success('Password changed successfully! Please login again with your new password.');

            // Clear form
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            // Optional: Force logout after password change
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error: any) {
            console.error('Password change error:', error);
            if (error.message?.includes('Invalid login credentials')) {
                toast.error('Current password is incorrect');
            } else {
                toast.error(error.message || 'Failed to change password');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Change Password
                </h3>

                <form onSubmit={handleChangePassword} className="space-y-4">
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Password *
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-[rgb(216,167,40)] focus:border-transparent"
                                placeholder="Enter your current password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password *
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-[rgb(216,167,40)] focus:border-transparent"
                                placeholder="Enter your new password"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Minimum 6 characters
                        </p>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm New Password *
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-[rgb(216,167,40)] focus:border-transparent"
                                placeholder="Confirm your new password"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password Requirements:
                        </p>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li className={newPassword.length >= 6 ? 'text-green-600 dark:text-green-400' : ''}>
                                • At least 6 characters long
                            </li>
                            <li className={newPassword !== confirmPassword || !confirmPassword ? '' : newPassword === confirmPassword ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                • Passwords must match
                            </li>
                            <li className={currentPassword && newPassword && currentPassword !== newPassword ? 'text-green-600 dark:text-green-400' : ''}>
                                • Different from current password
                            </li>
                        </ul>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            style={{ backgroundColor: 'rgb(216, 167, 40)' }}
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'Changing Password...' : 'Change Password'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setCurrentPassword('');
                                setNewPassword('');
                                setConfirmPassword('');
                            }}
                            className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Clear
                        </button>
                    </div>

                    {/* Warning */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <p className="text-sm text-yellow-800 dark:text-yellow-300">
                            <strong>⚠️ Important:</strong> After changing your password, you will be logged out and need to login again with your new password.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
