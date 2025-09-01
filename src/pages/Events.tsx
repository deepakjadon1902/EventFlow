
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, MapPin, DollarSign, Users, Star, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import BubbleAnimation from '../components/BubbleAnimation';
import GlassCard from '../components/GlassCard';
import EventCard from '../components/EventCard';

interface Event {
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
  status: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [bookingEvent, setBookingEvent] = useState<string | null>(null);
  const { user } = useAuth();

  const categories = ['all', 'Technology', 'Business', 'Art', 'Music', 'Food & Drink', 'Dining'];
  const priceRanges = [
    { value: 'all', label: 'All Price Ranges' },
    { value: 'free', label: 'Free Events' },
    { value: '0-50', label: '$0 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100+', label: '$100+' },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, selectedCategory, priceRange]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'active')
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Price filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(event => {
        if (priceRange === 'free') return event.price === 0;
        if (priceRange === '0-50') return event.price > 0 && event.price <= 50;
        if (priceRange === '50-100') return event.price > 50 && event.price <= 100;
        if (priceRange === '100+') return event.price > 100;
        return true;
      });
    }

    setFilteredEvents(filtered);
  };

  const handleBookEvent = async (eventId: string) => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }

    setBookingEvent(eventId);

    try {
      // Check if user already booked this event
      const { data: existingBooking } = await supabase
        .from('bookings')
        .select('id')
        .eq('user_id', user.id)
        .eq('event_id', eventId)
        .single();

      if (existingBooking) {
        alert('You have already booked this event!');
        setBookingEvent(null);
        return;
      }

      // Check if event is full
      const { data: event } = await supabase
        .from('events')
        .select('max_attendees, current_attendees')
        .eq('id', eventId)
        .single();

      if (event && event.current_attendees >= event.max_attendees) {
        alert('This event is fully booked!');
        setBookingEvent(null);
        return;
      }

      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          event_id: eventId,
        });

      if (error) throw error;

      // Create notification
      await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          title: 'Booking Confirmed',
          message: 'Your event booking has been confirmed successfully!',
          type: 'booking',
        });

      alert('Event booked successfully!');
      fetchEvents(); // Refresh to update attendee count
    } catch (error) {
      console.error('Error booking event:', error);
      alert('Failed to book event. Please try again.');
    } finally {
      setBookingEvent(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 flex items-center justify-center pt-16">
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-900/20 blur-3xl rounded-full"></div>
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-red-500 animate-pulse" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-blue-900 bg-clip-text text-transparent">
                Loading Elite Events
              </h2>
              <Sparkles className="w-6 h-6 text-blue-900 animate-pulse" />
            </div>
            <p className="text-gray-600 animate-pulse">Curating premium experiences for you...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 dark:from-gray-900 dark:via-black dark:to-blue-900">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-900/10 backdrop-blur-3xl"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
              <span className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-blue-900/20 backdrop-blur-lg rounded-full text-sm font-medium text-gray-800 dark:text-white border border-red-500/20">
                ELITE EXPERIENCES
              </span>
              <div className="w-2 h-2 bg-blue-900 rounded-full animate-bounce delay-200"></div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-500 via-black to-blue-900 bg-clip-text text-transparent">
                Premium Events
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover extraordinary experiences that redefine luxury. From exclusive galas to cutting-edge conferences, 
              <span className="text-red-500 font-semibold"> every moment is crafted to perfection.</span>
            </p>
            
            <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <span>Trending Now</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>VIP Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-900" />
                <span>Limited Spots</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Advanced Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-red-100 dark:border-gray-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Enhanced Search */}
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-900/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Search exclusive events, premier venues, luxury experiences..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-white/60 dark:bg-black/20 border-2 border-transparent hover:border-red-200 focus:border-red-500 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 text-lg font-medium"
                  />
                </div>
              </div>

              {/* Stylish Filter Toggle */}
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg ${
                  showFilters 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/50' 
                    : 'bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:shadow-blue-900/50'
                }`}
              >
                <Filter className={`h-6 w-6 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                <span>Advanced Filters</span>
              </motion.button>
            </div>

            {/* Premium Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="mt-8 pt-8 border-t border-red-100 dark:border-gray-800"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Category Filter */}
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                        Event Category
                      </label>
                      <div className="relative">
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-4 py-3 bg-white/80 dark:bg-black/40 border-2 border-gray-200 dark:border-gray-700 hover:border-red-300 focus:border-red-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-all duration-300 font-medium appearance-none cursor-pointer"
                        >
                          {categories.map(category => (
                            <option key={category} value={category} className="bg-white dark:bg-gray-900">
                              {category === 'all' ? 'All Categories' : category}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-3 h-3 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
                        </div>
                      </div>
                    </div>

                    {/* Price Filter */}
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                        Investment Level
                      </label>
                      <div className="relative">
                        <select
                          value={priceRange}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="w-full px-4 py-3 bg-white/80 dark:bg-black/40 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 focus:border-blue-900 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-all duration-300 font-medium appearance-none cursor-pointer"
                        >
                          {priceRanges.map(range => (
                            <option key={range.value} value={range.value} className="bg-white dark:bg-gray-900">
                              {range.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-3 h-3 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-3 flex flex-col justify-center">
                      <div className="bg-gradient-to-r from-red-500/10 to-blue-900/10 rounded-xl p-4 border border-red-100 dark:border-gray-800">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Live Events</span>
                          <span className="text-2xl font-bold text-red-500">{filteredEvents.length}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Available</span>
                          <span className="text-xl font-bold text-blue-900">{events.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="mb-4 sm:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Curated Collection
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              <span className="font-semibold text-red-500">{filteredEvents.length}</span> exclusive events 
              <span className="mx-2">•</span>
              <span className="text-gray-500">of {events.length} premium experiences</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Live Booking</span>
            </div>
          </div>
        </motion.div>

        {/* Events Showcase */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/50 to-blue-900/50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  <EventCard
                    event={event}
                    onBookEvent={handleBookEvent}
                    showBookButton={true}
                  />
                  {bookingEvent === event.id && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                      <div className="text-center text-white">
                        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="font-semibold text-lg">Securing Your Spot...</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-3xl p-12 border border-red-100 dark:border-gray-800 shadow-2xl">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-900/20 rounded-full blur-xl"></div>
                <Calendar className="relative h-20 w-20 text-gray-400 mx-auto" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Premium Events Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We couldn't find any events matching your refined criteria. 
                Try exploring different categories or price ranges to discover more exclusive experiences.
              </p>
              
              <motion.button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange('all');
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-blue-900 text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold text-lg"
              >
                Reset All Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events;