import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, CalendarDays, MessageCircle, Settings, X, RotateCcw } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import GoldButton from '../components/ui/GoldButton';

// Utility format date
const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString();
};

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [systemStatus, setSystemStatus] = useState('disconnected');
    const [stats, setStats] = useState({ total: 0, today_guests: 0, whatsapp_delivery_rate: 0, revenue: 0 });
    const [bookings, setBookings] = useState([]);
    const [whatsappLogs, setWhatsappLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modals/Drawers
    const [resendModalData, setResendModalData] = useState(null);
    const [viewDetailsData, setViewDetailsData] = useState(null);

    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

    const fetchData = async () => {
        try {
            // 1. Health check
            const healthRes = await fetch(`${API_BASE}/health/`);
            if (healthRes.ok) setSystemStatus('connected');

            // 2. Analytics Summary
            const statRes = await fetch(`${API_BASE}/api/reservations/analytics/summary`);
            if (statRes.ok) {
                const statData = await statRes.json();
                statData.revenue = statData.total * 180; // €180 avg per guest roughly
                setStats(statData);
            }

            // 3. Bookings list
            const bookRes = await fetch(`${API_BASE}/api/reservations/`);
            if (bookRes.ok) {
                const bookData = await bookRes.json();
                setBookings(bookData);
            }

            // 4. WhatsApp logs
            const wpRes = await fetch(`${API_BASE}/api/whatsapp-logs/`);
            if (wpRes.ok) {
                setWhatsappLogs(await wpRes.json());
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCancelBooking = async (id) => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;
        try {
            const res = await fetch(`${API_BASE}/api/reservations/${id}/cancel`, { method: 'PATCH' });
            if (res.ok) {
                fetchData();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleResendWhatsapp = async (id) => {
        try {
            const res = await fetch(`${API_BASE}/api/reservations/${id}/resend-whatsapp`, { method: 'POST' });
            if (res.ok) {
                setResendModalData(null);
                fetchData();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getStatusBadge = (status) => {
        if (status === 'Confirmed') return <span className="text-gold bg-[rgba(212,175,55,0.1)] px-2 py-1 rounded-full text-xs flex items-center shadow-[0_0_10px_rgba(212,175,55,0.2)]"><span className="w-1.5 h-1.5 rounded-full bg-gold mr-1 animate-pulse"></span>Confirmed</span>;
        return <span className="text-text-muted bg-surface-dark px-2 py-1 rounded-full text-xs">Cancelled</span>;
    };

    const getWhatsappBadge = (status) => {
        if (status === 'Sent') return <span className="text-success text-xs flex items-center">✓ Sent</span>;
        if (status === 'Simulated') return <span className="text-amber-500 text-xs flex items-center" title="Dev mode">⟳ Simulated</span>;
        if (status === 'Failed') return <span className="text-[#b30047] text-xs flex items-center">✗ Failed</span>;
        return <span className="text-text-muted text-xs flex items-center">○ Pending</span>;
    };

    if (loading) {
        return <div className="h-screen bg-deep-black flex items-center justify-center text-gold">Loading Dashboard...</div>;
    }

    return (
        <div className="flex h-screen bg-deep-black overflow-hidden font-body text-text-primary">
            {/* Sidebar (240px) */}
            <aside className="w-60 border-r border-[rgba(212,175,55,0.15)] bg-[rgba(8,8,8,0.9)] flex flex-col justify-between">
                <div>
                    <div className="p-6 border-b border-[rgba(212,175,55,0.1)] mb-4">
                        <h1 className="font-heading text-2xl text-gold italic">Lumière</h1>
                        <span className="font-accent text-[10px] tracking-widest text-gold border border-gold px-2 py-0.5 rounded-sm block w-max mt-1">ADMIN</span>
                    </div>

                    <nav className="space-y-2 px-3">
                        {[
                            { id: 'Overview', icon: <LayoutDashboard size={18} /> },
                            { id: 'Reservations', icon: <CalendarDays size={18} /> },
                            { id: 'WhatsApp Logs', icon: <MessageCircle size={18} /> },
                            { id: 'Settings', icon: <Settings size={18} /> }
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md transition-colors text-sm font-accent tracking-wide uppercase ${activeTab === item.id
                                    ? 'border-l-2 border-gold bg-[rgba(212,175,55,0.1)] text-gold'
                                    : 'text-text-secondary hover:bg-[rgba(255,255,255,0.05)] hover:text-white border-l-2 border-transparent'
                                    }`}
                            >
                                {item.icon}
                                <span>{item.id}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6 border-t border-[rgba(212,175,55,0.1)] flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${systemStatus === 'connected' ? 'bg-success' : 'bg-red-500'}`} />
                        <span className="text-text-muted">System</span>
                    </div>
                    <span className="text-text-muted">v1.0.0</span>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto custom-scrollbar p-8">

                {/* Top Header / Filter */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-heading text-3xl text-gold">{activeTab}</h2>
                    <div className="flex items-center space-x-4">
                        <div className="flex bg-surface-dark rounded-full border border-[rgba(212,175,55,0.2)] p-1">
                            {['Today', 'This Week', 'This Month', 'All Time'].map(pill => (
                                <button
                                    key={pill}
                                    className={`px-4 py-1.5 rounded-full text-xs font-accent tracking-wider uppercase transition-colors ${pill === 'All Time' ? 'bg-gold text-deep-black' : 'text-text-secondary hover:text-white'
                                        }`}
                                >
                                    {pill}
                                </button>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-surface-dark border border-[rgba(212,175,55,0.3)] text-text-primary px-4 py-2 rounded-md outline-none focus:border-gold text-sm w-64"
                        />
                    </div>
                </div>

                {/* Stats Row */}
                {activeTab === 'Overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: "Total Reservations", val: stats.total, sub: `+${Math.floor(stats.total * 0.2)} this week`, subColor: 'text-success' },
                            { label: "Today's Guests", val: stats.today_guests, sub: "Across 2 seatings", subColor: 'text-text-muted' },
                            { label: "WhatsApp Delivery", val: `${stats.whatsapp_delivery_rate}%`, sub: `${stats.total} total booked`, subColor: 'text-text-muted' },
                            { label: "Revenue Est (All Time)", val: `€${new Intl.NumberFormat().format(stats.revenue)}`, sub: "Based on €180 avg", subColor: 'text-text-muted' },
                        ].map((stat, i) => (
                            <GlassCard key={i} className="p-6 border-t-2 border-t-gold bg-surface-dark group">
                                <p className="text-text-secondary text-xs font-accent uppercase tracking-widest mb-4 group-hover:text-gold transition-colors">{stat.label}</p>
                                <p className="font-heading text-4xl text-white mb-2">{stat.val}</p>
                                <p className={`text-xs ${stat.subColor}`}>{stat.sub}</p>
                            </GlassCard>
                        ))}
                    </div>
                )}

                {/* Bookings Table */}
                {activeTab === 'Reservations' || activeTab === 'Overview' ? (
                    <GlassCard className="bg-surface-dark border-[rgba(212,175,55,0.15)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-[rgba(10,10,10,0.8)] border-b border-[rgba(212,175,55,0.2)]">
                                        <th className="px-6 py-4 font-accent text-xs tracking-widest uppercase text-text-secondary sticky top-0">Ref</th>
                                        <th className="px-6 py-4 font-accent text-xs tracking-widest uppercase text-text-secondary sticky top-0">Guest</th>
                                        <th className="px-6 py-4 font-accent text-xs tracking-widest uppercase text-text-secondary sticky top-0">Date & Time</th>
                                        <th className="px-6 py-4 font-accent text-xs tracking-widest uppercase text-text-secondary sticky top-0">Guests</th>
                                        <th className="px-6 py-4 font-accent text-xs tracking-widest uppercase text-text-secondary sticky top-0">Status</th>
                                        <th className="px-6 py-4 font-accent text-xs tracking-widest uppercase text-text-secondary sticky top-0">WhatsApp</th>
                                        <th className="px-6 py-4 font-accent text-xs tracking-widest uppercase text-text-secondary sticky top-0 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, i) => (
                                        <tr key={booking._id} className={`border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(212,175,55,0.02)] transition-colors ${i % 2 === 0 ? 'bg-[rgba(20,20,20,0.2)]' : ''}`}>
                                            <td className="px-6 py-4 font-mono text-gold text-xs">{booking.reference_id}</td>
                                            <td className="px-6 py-4">
                                                <p className="text-white font-medium">{booking.name}</p>
                                                <p className="text-text-muted text-xs mt-0.5">{booking.email}</p>
                                            </td>
                                            <td className="px-6 py-4 text-text-secondary">
                                                {booking.date_time}
                                            </td>
                                            <td className="px-6 py-4 text-white font-bold">{booking.guests}</td>
                                            <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                                            <td className="px-6 py-4">{getWhatsappBadge(booking.whatsapp_status || 'Pending')}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end space-x-3 opacity-60 hover:opacity-100 transition-opacity">
                                                    <button title="View Details" onClick={() => setViewDetailsData(booking)} className="text-text-secondary hover:text-white">
                                                        👁
                                                    </button>
                                                    <button title="Resend WhatsApp" onClick={() => setResendModalData(booking)} className="text-text-secondary hover:text-gold">
                                                        <RotateCcw size={16} />
                                                    </button>
                                                    {booking.status !== 'Cancelled' && (
                                                        <button title="Cancel Booking" onClick={() => handleCancelBooking(booking._id)} className="text-text-secondary hover:text-[#b30047]">
                                                            <X size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {bookings.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="text-center py-12 text-text-muted italic">No reservations found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
                ) : null}

                {/* WhatsApp Logs Table */}
                {activeTab === 'WhatsApp Logs' && (
                    <GlassCard className="bg-surface-dark border-[rgba(212,175,55,0.15)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-[rgba(10,10,10,0.8)] border-b border-[rgba(212,175,55,0.2)]">
                                        <th className="px-6 py-4 font-accent text-xs tracking-widest uppercase text-text-secondary sticky top-0">Reservation ID</th>
                                        <th className="px-6 py-4 font-accent text-xs tracking-widest uppercase text-text-secondary sticky top-0">Phone</th>
                                        <th className="px-6 py-4 font-accent text-xs tracking-widest uppercase text-text-secondary sticky top-0">Message</th>
                                        <th className="px-6 py-4 font-accent text-xs tracking-widest uppercase text-text-secondary sticky top-0">Status</th>
                                        <th className="px-6 py-4 font-accent text-xs tracking-widest uppercase text-text-secondary sticky top-0">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {whatsappLogs.map((log, i) => (
                                        <tr key={log._id} className={`border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(212,175,55,0.02)] transition-colors ${i % 2 === 0 ? 'bg-[rgba(20,20,20,0.2)]' : ''}`}>
                                            <td className="px-6 py-4 font-mono text-gold text-xs">{log.reservation_id}</td>
                                            <td className="px-6 py-4 text-white">{log.phone}</td>
                                            <td className="px-6 py-4 text-text-secondary max-w-xs truncate" title={log.message}>{log.message}</td>
                                            <td className="px-6 py-4">{getWhatsappBadge(log.status)}</td>
                                            <td className="px-6 py-4 text-text-muted">{new Date(log.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    {whatsappLogs.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center py-12 text-text-muted italic">No WhatsApp logs found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
                )}
            </main>

            {/* Resend WhatsApp Modal */}
            <AnimatePresence>
                {resendModalData && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <GlassCard className="max-w-md w-full p-8 border border-[rgba(212,175,55,0.4)] relative">
                            <h3 className="font-heading text-2xl text-gold mb-2">Resend Confirmation</h3>
                            <p className="text-text-secondary text-sm mb-6">
                                Are you sure you want to resend the WhatsApp confirmation to {resendModalData.name} ({resendModalData.phone})?
                            </p>
                            <div className="flex gap-4">
                                <GoldButton variant="ghost" onClick={() => setResendModalData(null)} className="w-1/2">Cancel</GoldButton>
                                <GoldButton onClick={() => handleResendWhatsapp(resendModalData._id)} className="w-1/2">Resend</GoldButton>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* View Details Drawer */}
            <AnimatePresence>
                {viewDetailsData && (
                    <motion.div
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 w-full max-w-md h-screen bg-[#0a0a0a] border-l border-gold shadow-2xl z-50 overflow-y-auto"
                    >
                        <div className="p-8">
                            <button onClick={() => setViewDetailsData(null)} className="absolute top-6 right-6 text-text-secondary hover:text-white">
                                <X size={24} />
                            </button>

                            <h3 className="font-heading text-3xl text-gold mb-8 mt-4">Reservation Details</h3>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs font-accent uppercase tracking-widest text-text-muted mb-1">Reference</p>
                                    <p className="font-mono text-xl text-white">{viewDetailsData.reference_id}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 border-y border-[rgba(212,175,55,0.1)] py-6">
                                    <div className="col-span-2">
                                        <p className="text-xs font-accent uppercase tracking-widest text-text-muted mb-1">Date & Time</p>
                                        <p className="text-white">{viewDetailsData.date_time}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-accent uppercase tracking-widest text-text-muted mb-1">Guests</p>
                                        <p className="text-white font-bold text-lg">{viewDetailsData.guests}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-accent uppercase tracking-widest text-text-muted mb-1">Status</p>
                                        <p className="mt-1">{getStatusBadge(viewDetailsData.status)}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-accent uppercase tracking-widest text-text-muted mb-1">Guest Info</p>
                                    <p className="text-white text-lg">{viewDetailsData.name}</p>
                                    <p className="text-text-secondary mt-1">{viewDetailsData.email}</p>
                                    <p className="text-text-secondary mt-1">{viewDetailsData.phone}</p>
                                </div>

                                {viewDetailsData.special_request && (
                                    <div className="bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.1)] p-4 rounded-md">
                                        <p className="text-xs font-accent uppercase tracking-widest text-gold mb-2">Special Requests</p>
                                        <p className="text-white italic">"{viewDetailsData.special_request}"</p>
                                    </div>
                                )}

                                <div className="pt-8 border-t border-[rgba(212,175,55,0.1)]">
                                    <p className="text-xs font-accent uppercase tracking-widest text-text-muted mb-4">Timeline / Logs</p>
                                    <div className="relative pl-4 border-l border-[rgba(212,175,55,0.3)] space-y-6 text-sm">
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-surface-dark border-2 border-gold outline outline-4 outline-[#0a0a0a]"></div>
                                            <p className="text-white">Booking Created</p>
                                            <p className="text-xs text-text-muted mt-0.5">{new Date(viewDetailsData.created_at).toLocaleString()}</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-surface-dark border-2 border-gold outline outline-4 outline-[#0a0a0a]"></div>
                                            <p className="text-white flex items-center justify-between">
                                                WhatsApp Notification {getWhatsappBadge(viewDetailsData.whatsapp_status || 'Pending')}
                                            </p>
                                            <p className="text-xs text-text-muted mt-0.5">Terminal Simulator triggered.</p>
                                        </div>
                                        {viewDetailsData.status === 'Cancelled' && (
                                            <div className="relative opacity-60">
                                                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-surface-dark border-2 border-[#b30047] outline outline-4 outline-[#0a0a0a]"></div>
                                                <p className="text-white">Booking Cancelled</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPage;
