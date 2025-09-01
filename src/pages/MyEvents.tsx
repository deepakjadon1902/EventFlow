
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, X, Download, Filter, Ticket, CheckCircle, XCircle, Star, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import BubbleAnimation from '../components/BubbleAnimation';
import GlassCard from '../components/GlassCard';
import EventCard from '../components/EventCard';

interface BookedEvent {
  id: string;
  booking_date: string;
  status: string;
  events: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    price: number;
    max_attendees: number;
    current_attendees: number;
    image_url: string;
    category: string;
  };
}

const MyEvents: React.FC = () => {
  const [bookedEvents, setBookedEvents] = useState<BookedEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<BookedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [cancellingEvent, setCancellingEvent] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMyEvents();
    }
  }, [user]);

  useEffect(() => {
    filterEvents();
  }, [bookedEvents, filter]);

  const fetchMyEvents = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          events (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookedEvents(data || []);
    } catch (error) {
      console.error('Error fetching my events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    const now = new Date();
    let filtered = bookedEvents;

    if (filter === 'upcoming') {
      filtered = bookedEvents.filter(booking => 
        new Date(booking.events.date) >= now && booking.status === 'confirmed'
      );
    } else if (filter === 'past') {
      filtered = bookedEvents.filter(booking => 
        new Date(booking.events.date) < now || booking.status === 'cancelled'
      );
    }

    setFilteredEvents(filtered);
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    setCancellingEvent(bookingId);

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;

      // Create notification
      await supabase
        .from('notifications')
        .insert({
          user_id: user!.id,
          title: 'Booking Cancelled',
          message: 'Your event booking has been cancelled successfully.',
          type: 'booking',
        });

      alert('Booking cancelled successfully!');
      fetchMyEvents();
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setCancellingEvent(null);
    }
  };

  const downloadEventDetails = (event: BookedEvent) => {
    const eventDetails = `
Event Details
=============

Event: ${event.events.title}
Date: ${new Date(event.events.date).toLocaleDateString()}
Time: ${event.events.time}
Location: ${event.events.location}
Price: $${event.events.price}
Category: ${event.events.category}
Booking Status: ${event.status}
Booked On: ${new Date(event.booking_date).toLocaleDateString()}

Description:
${event.events.description}
    `.trim();

    const blob = new Blob([eventDetails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.events.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_details.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-black dark:via-slate-900 dark:to-slate-800 flex items-center justify-center pt-16">
        <BubbleAnimation />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl max-w-md mx-4"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Ticket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Authentication Required
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Please sign in to access your event collection and manage your bookings.
            </p>
            <motion.a
              href="/login"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign In to Continue
            </motion.a>
          </div>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-black dark:via-slate-900 dark:to-slate-800 flex items-center justify-center pt-16">
        <BubbleAnimation />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-red-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 mt-6 font-medium">Loading your event collection...</p>
        </motion.div>
      </div>
    );
  }

  const filterTabs = [
    { 
      key: 'all', 
      label: 'All Events', 
      count: bookedEvents.length,
      icon: Ticket,
      color: 'from-slate-600 to-slate-700'
    },
    { 
      key: 'upcoming', 
      label: 'Upcoming', 
      count: bookedEvents.filter(b => new Date(b.events.date) >= new Date() && b.status === 'confirmed').length,
      icon: Star,
      color: 'from-blue-600 to-blue-700'
    },
    { 
      key: 'past', 
      label: 'History', 
      count: bookedEvents.filter(b => new Date(b.events.date) < new Date() || b.status === 'cancelled').length,
      icon: Calendar,
      color: 'from-red-500 to-red-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-black dark:via-slate-900 dark:to-slate-800">
      <BubbleAnimation />
      
      {/* Header Section */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl mb-6 shadow-2xl">
              <Ticket className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              My Event <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Collection</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Manage your premium event bookings, track attendance, and access exclusive event details.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {filterTabs.map((tab, index) => (
              <motion.div
                key={tab.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                  filter === tab.key ? 'ring-2 ring-red-500' : ''
                }`}
                onClick={() => setFilter(tab.key as any)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-1">{tab.label}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{tab.count}</p>
                  </div>
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${tab.color} group-hover:scale-110 transition-transform duration-300`}>
                    <tab.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                {filter === tab.key && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-3xl border-2 border-red-500"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredEvents.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-50/20 to-red-100/20 dark:from-transparent dark:via-red-900/5 dark:to-red-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-6 right-6 z-10">
                      <div className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-semibold text-sm backdrop-blur-sm ${
                        booking.status === 'confirmed'
                          ? 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30'
                      }`}>
                        {booking.status === 'confirmed' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        <span>{booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}</span>
                      </div>
                    </div>

                    {/* Event Image */}
                    <div className="relative mb-6">
                      <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
                        <img
                          src={booking.events.image_url}
                          alt={booking.events.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                          {booking.events.category}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="relative z-10 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                          {booking.events.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">
                          {booking.events.description}
                        </p>
                      </div>

                      {/* Event Meta Information */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                            <Calendar className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Date</p>
                            <p className="text-sm font-semibold">{new Date(booking.events.date).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                            <Clock className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Time</p>
                            <p className="text-sm font-semibold">{booking.events.time}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 col-span-2">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                            <MapPin className="w-4 h-4 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Location</p>
                            <p className="text-sm font-semibold truncate">{booking.events.location}</p>
                          </div>
                        </div>
                      </div>

                      {/* Pricing and Booking Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div>
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Event Price</p>
                          <div className="text-2xl font-bold text-green-600">
                            {booking.events.price === 0 ? 'Free' : `$${booking.events.price}`}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Booked On</p>
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {new Date(booking.booking_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Attendance Info */}
                      <div className="flex items-center space-x-2 p-3 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl">
                        <Users className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {booking.events.current_attendees} / {booking.events.max_attendees} attendees
                        </span>
                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 ml-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(booking.events.current_attendees / booking.events.max_attendees) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 pt-4">
                        <motion.button
                          onClick={() => downloadEventDetails(booking)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-2xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300 font-semibold"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </motion.button>

                        {booking.status === 'confirmed' && new Date(booking.events.date) >= new Date() && (
                          <motion.button
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={cancellingEvent === booking.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-2xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                          >
                            {cancellingEvent === booking.id ? (
                              <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                            <span>Cancel</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-12 shadow-2xl max-w-lg mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  {filter === 'all' ? (
                    <Ticket className="w-12 h-12 text-slate-500" />
                  ) : filter === 'upcoming' ? (
                    <Star className="w-12 h-12 text-slate-500" />
                  ) : (
                    <Calendar className="w-12 h-12 text-slate-500" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {filter === 'all' ? 'No Events in Collection' : 
                   filter === 'upcoming' ? 'No Upcoming Adventures' : 'No Event History'}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  {filter === 'all' 
                    ? "Your event collection is empty. Start building your premium experience portfolio with our curated events."
                    : filter === 'upcoming'
                    ? "No upcoming events scheduled. Discover and book your next extraordinary experience from our premium collection."
                    : "No past events or cancellations to display."}
                </p>
                {(filter === 'all' || filter === 'upcoming') && (
                  <motion.a
                    href="/events"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Explore Premium Events
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;