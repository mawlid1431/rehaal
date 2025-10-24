import { useState, useEffect } from 'react';
import { Eye, Check, X, Trash2, Download, Search } from 'lucide-react';
import { bookingsApi } from '../../lib/api';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

export function BookingsManager() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const data = await bookingsApi.getAll();
            setBookings(data);
        } catch (error) {
            toast.error('Failed to fetch bookings');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: 'confirmed' | 'cancelled') => {
        try {
            await bookingsApi.updateStatus(id, status);
            toast.success(`Booking ${status}`);
            fetchBookings();
        } catch (error) {
            toast.error('Failed to update status');
            console.error(error);
        }
    };

    const filteredBookings = bookings.filter(booking =>
        booking.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.trips?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this booking?')) return;

        try {
            await bookingsApi.delete(id);
            toast.success('Booking deleted');
            fetchBookings();
        } catch (error) {
            toast.error('Failed to delete booking');
            console.error(error);
        }
    };

    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(bookings.map(b => ({
            'Booking ID': b.id,
            'Trip': b.trips?.title || 'N/A',
            'Customer Name': b.customer_name,
            'Email': b.customer_email,
            'Phone': b.customer_phone,
            'Travelers': b.number_of_people,
            'Date': b.booking_date,
            'Status': b.status,
            'Total Price': b.total_price
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
        XLSX.writeFile(workbook, `bookings_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    if (loading) {
        return <div className="text-sm text-gray-600 dark:text-gray-400">Loading bookings...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Bookings Management</h2>
                <button
                    onClick={handleExportToExcel}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Download className="w-5 h-5" />
                    Export to Excel
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-700 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Trip
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Travelers
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredBookings.map((booking, index) => (
                                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                                        #{index + 1}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                                        <div className="font-medium">{booking.trips?.title || 'N/A'}</div>
                                        <div className="text-xs text-gray-500">{booking.trips?.destination}</div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                                        {booking.customer_name}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="text-xs">{booking.customer_email}</div>
                                        <div className="text-xs">{booking.customer_phone}</div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-800 dark:text-white">
                                        {booking.number_of_people}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                        {new Date(booking.booking_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => setSelectedBooking(booking)}
                                                className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            {booking.status === 'pending' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                                    className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                                    title="Accept"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            )}
                                            {booking.status !== 'cancelled' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                    className="p-1 text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
                                                    title="Cancel"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(booking.id)}
                                                className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredBookings.length === 0 && (
                <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
                    No bookings found
                </div>
            )}

            {selectedBooking && (
                <BookingDetailModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </div>
    );
}

function BookingDetailModal({ booking, onClose }: { booking: any; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        Booking Details
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Booking ID</label>
                            <p className="text-gray-800 dark:text-white font-mono text-xs">{booking.id}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Trip</label>
                            <p className="text-gray-800 dark:text-white">{booking.trips?.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{booking.trips?.destination}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer Name</label>
                            <p className="text-gray-800 dark:text-white">{booking.customer_name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                            <p className="text-gray-800 dark:text-white">{booking.customer_email}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                            <p className="text-gray-800 dark:text-white">{booking.customer_phone}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Number of Travelers</label>
                            <p className="text-gray-800 dark:text-white">{booking.number_of_people}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Booking Date</label>
                            <p className="text-gray-800 dark:text-white">{new Date(booking.booking_date).toLocaleDateString()}</p>
                        </div>
                        {booking.total_price && (
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Price</label>
                                <p className="text-gray-800 dark:text-white font-bold">${booking.total_price}</p>
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                            <p className="text-gray-800 dark:text-white capitalize">{booking.status}</p>
                        </div>
                        {booking.special_requests && (
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Special Requests</label>
                                <p className="text-gray-800 dark:text-white text-sm">{booking.special_requests}</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
