import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, X, Download, Filter } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-royal-navy dark:via-gray-900 dark:to-black flex items-center justify-center pt-16">
        <BubbleAnimation />
        <GlassCard className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please Sign In
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You need to be signed in to view your events.
          </p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-gradient-to-r from-royal-blue to-royal-light text-white rounded-lg hover:shadow-lg transition-all duration-200"
          >
            Sign In
          </a>
        </GlassCard>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-royal-navy dark:via-gray-900 dark:to-black flex items-center justify-center pt-16">
        <BubbleAnimation />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-royal-blue/30 border-t-royal-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Loading your events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-royal-navy dark:via-gray-900 dark:to-black pt-20 pb-12">
      <BubbleAnimation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Events
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Manage your booked events and view event details
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Events', count: bookedEvents.length },
                { 
                  key: 'upcoming', 
                  label: 'Upcoming', 
                  count: bookedEvents.filter(b => new Date(b.events.date) >= new Date() && b.status === 'confirmed').length 
                },
                { 
                  key: 'past', 
                  label: 'Past & Cancelled', 
                  count: bookedEvents.filter(b => new Date(b.events.date) < new Date() || b.status === 'cancelled').length 
                },
              ].map((tab) => (
                <motion.button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    filter === tab.key
                      ? 'bg-royal-blue text-white shadow-lg'
                      : 'bg-white/50 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-black/30'
                  }`}
                >
                  {tab.label} ({tab.count})
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Events List */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <GlassCard className="overflow-hidden h-full">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                    </span>
                  </div>

                  <div className="relative">
                    <img
                      src={booking.events.image_url}
                      alt={booking.events.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-royal-blue/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                        {booking.events.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {booking.events.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {booking.events.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(booking.events.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4" />
                        <span>{booking.events.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 col-span-2">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">{booking.events.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-lg font-bold text-green-600">
                        {booking.events.price === 0 ? 'Free' : `$${booking.events.price}`}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Booked: {new Date(booking.booking_date).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4">
                      <motion.button
                        onClick={() => downloadEventDetails(booking)}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </motion.button>

                      {booking.status === 'confirmed' && new Date(booking.events.date) >= new Date() && (
                        <motion.button
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={cancellingEvent === booking.id}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
                        >
                          {cancellingEvent === booking.id ? (
                            <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                          <span>Cancel</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                </GlassCard>
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
            <GlassCard className="max-w-md mx-auto">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {filter === 'all' ? 'No Events Booked' : 
                 filter === 'upcoming' ? 'No Upcoming Events' : 'No Past Events'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {filter === 'all' 
                  ? "You haven't booked any events yet. Start exploring our premium events!"
                  : filter === 'upcoming'
                  ? "You don't have any upcoming events. Browse our latest offerings!"
                  : "No past or cancelled events to show."}
              </p>
              {(filter === 'all' || filter === 'upcoming') && (
                <a
                  href="/events"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-royal-blue to-royal-light text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Browse Events
                </a>
              )}
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;