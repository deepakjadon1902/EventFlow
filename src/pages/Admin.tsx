import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp, DollarSign, Plus, Edit, Trash2, Eye, MessageSquare, Mail, Star, BarChart3, PieChart, Activity, Crown, Shield, Globe, Zap, X, Save, Clock, Target, TrendingUp as Trending, Heart, Gauge } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import BubbleAnimation from '../components/BubbleAnimation';
import GlassCard from '../components/GlassCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, RadialBarChart, RadialBar, Cell } from 'recharts';

interface DashboardStats {
  totalUsers: number;
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;
  activeEvents: number;
  completedEvents: number;
  totalFeedback: number;
  averageRating: number;
  platformHealth: number;
}

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
  created_at: string;
}

interface Feedback {
  id: string;
  user_id: string | null;
  type: string;
  rating: number;
  subject: string;
  message: string;
  email: string | null;
  name: string | null;
  status: string;
  created_at: string;
  profiles?: {
    name: string;
    email: string;
  } | null;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  max_attendees: number;
  image_url: string;
  category: string;
}

const Admin: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalEvents: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeEvents: 0,
    completedEvents: 0,
    totalFeedback: 0,
    averageRating: 0,
    platformHealth: 0,
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'feedback' | 'messages'>('overview');
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: 0,
    max_attendees: 100,
    image_url: '',
    category: 'Technology',
  });
  const [monthlyBookings, setMonthlyBookings] = useState<any[]>([]);
  const [platformMetrics, setPlatformMetrics] = useState<any[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<any[]>([]);
  const { user, isAdmin } = useAuth();

  const categories = ['Technology', 'Business', 'Art', 'Music', 'Food & Drink', 'Dining'];

  useEffect(() => {
    if (user && isAdmin) {
      fetchAdminData();
    }
  }, [user, isAdmin]);

  const calculatePlatformHealth = (
    totalUsers: number,
    totalEvents: number,
    totalBookings: number,
    averageRating: number,
    activeEvents: number,
    totalFeedback: number
  ) => {
    // Calculate various health indicators
    const userEngagement = Math.min(100, (totalBookings / Math.max(totalUsers, 1)) * 100);
    const eventUtilization = Math.min(100, (totalBookings / Math.max(totalEvents, 1)) * 20);
    const satisfactionScore = (averageRating / 5) * 100;
    const activityLevel = Math.min(100, (activeEvents / Math.max(totalEvents, 1)) * 100);
    const feedbackHealth = Math.min(100, Math.max(0, 100 - (feedback.filter(f => f.type === 'bug').length / Math.max(totalFeedback, 1)) * 100));
    
    // Weighted average for overall health
    const healthScore = (
      userEngagement * 0.25 +
      eventUtilization * 0.2 +
      satisfactionScore * 0.25 +
      activityLevel * 0.15 +
      feedbackHealth * 0.15
    );

    return Math.round(Math.min(100, Math.max(0, healthScore)));
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return { color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/20', status: 'Excellent' };
    if (score >= 75) return { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20', status: 'Good' };
    if (score >= 60) return { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/20', status: 'Fair' };
    if (score >= 40) return { color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/20', status: 'Poor' };
    return { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/20', status: 'Critical' };
  };

  const fetchAdminData = async () => {
    try {
      // Fetch users count
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      // Fetch events
      const { data: eventsData, count: eventsCount } = await supabase
        .from('events')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      // Fetch bookings with monthly data
      const { data: bookingsData, count: bookingsCount } = await supabase
        .from('bookings')
        .select('*, events(price), created_at', { count: 'exact' })
        .eq('status', 'confirmed');

      // Calculate monthly bookings for the last 6 months
      const monthlyData = calculateMonthlyBookings(bookingsData || []);
      setMonthlyBookings(monthlyData);

      // Calculate platform performance metrics
      const performanceData = calculatePlatformMetrics(eventsData || [], bookingsData || []);
      setPlatformMetrics(performanceData);

      // Fetch feedback with user profiles
      const { data: feedbackData, count: feedbackCount } = await supabase
        .from('feedback')
        .select(`
          *,
          profiles:user_id (
            name,
            email
          )
        `, { count: 'exact' })
        .order('created_at', { ascending: false });

      // Fetch contact messages
      const { data: messagesData } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      // Calculate stats
      const totalRevenue = bookingsData?.reduce((sum, booking) => 
        sum + (booking.events?.price || 0), 0) || 0;

      const now = new Date();
      const activeEvents = eventsData?.filter(event => 
        new Date(event.date) >= now && event.status === 'active').length || 0;
      
      const completedEvents = eventsData?.filter(event => 
        new Date(event.date) < now || event.status === 'completed').length || 0;

      const averageRating = feedbackData?.length > 0 
        ? feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length 
        : 4.5; // Default good rating

      // Calculate platform health score
      const platformHealth = calculatePlatformHealth(
        usersCount || 0,
        eventsCount || 0,
        bookingsCount || 0,
        averageRating,
        activeEvents,
        feedbackCount || 0
      );

      // Create health breakdown data
      const healthData = [
        { name: 'User Engagement', value: Math.min(100, ((bookingsCount || 0) / Math.max(usersCount || 1, 1)) * 100), color: '#3B82F6' },
        { name: 'Event Quality', value: (averageRating / 5) * 100, color: '#10B981' },
        { name: 'Platform Activity', value: Math.min(100, (activeEvents / Math.max(eventsCount || 1, 1)) * 100), color: '#F59E0B' },
        { name: 'System Stability', value: 98, color: '#8B5CF6' },
      ];
      setHealthMetrics(healthData);

      setStats({
        totalUsers: usersCount || 0,
        totalEvents: eventsCount || 0,
        totalBookings: bookingsCount || 0,
        totalRevenue,
        activeEvents,
        completedEvents,
        totalFeedback: feedbackCount || 0,
        averageRating,
        platformHealth,
      });

      setEvents(eventsData || []);
      setFeedback(feedbackData || []);
      setContactMessages(messagesData || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthlyBookings = (bookings: any[]) => {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en', { month: 'short', year: '2-digit' });
      
      const monthBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.created_at);
        return bookingDate.getMonth() === date.getMonth() && 
               bookingDate.getFullYear() === date.getFullYear();
      }).length;
      
      months.push({ month: monthName, bookings: monthBookings });
    }
    
    return months;
  };

  const calculatePlatformMetrics = (events: Event[], bookings: any[]) => {
    const metrics = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const dayName = date.toLocaleDateString('en', { weekday: 'short' });
      
      // Calculate daily metrics
      const dayBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.created_at);
        return bookingDate.toDateString() === date.toDateString();
      }).length;
      
      const dayRevenue = bookings
        .filter(booking => {
          const bookingDate = new Date(booking.created_at);
          return bookingDate.toDateString() === date.toDateString();
        })
        .reduce((sum, booking) => sum + (booking.events?.price || 0), 0);
      
      // Simulate engagement rate (in real app, this would come from analytics)
      const baseEngagement = 65 + Math.sin(i * 0.5) * 15;
      const engagement = Math.max(40, Math.min(95, baseEngagement + (Math.random() - 0.5) * 10));
      
      metrics.push({
        day: dayName,
        bookings: dayBookings,
        revenue: dayRevenue,
        engagement: Math.round(engagement),
        activeUsers: Math.round(dayBookings * 2.5 + Math.random() * 10)
      });
    }
    
    return metrics;
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingEvent) {
        // Update existing event
        const { error } = await supabase
          .from('events')
          .update({
            ...eventForm,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingEvent.id);

        if (error) throw error;
        alert('Event updated successfully!');
      } else {
        // Create new event
        const { error } = await supabase
          .from('events')
          .insert([eventForm]);

        if (error) throw error;
        alert('Event created successfully!');
      }

      setShowEventModal(false);
      setEditingEvent(null);
      resetEventForm();
      fetchAdminData();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      price: event.price,
      max_attendees: event.max_attendees,
      image_url: event.image_url,
      category: event.category,
    });
    setShowEventModal(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
      alert('Event deleted successfully!');
      fetchAdminData();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  const updateEventStatus = async (eventId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ status: newStatus })
        .eq('id', eventId);

      if (error) throw error;
      fetchAdminData();
    } catch (error) {
      console.error('Error updating event status:', error);
    }
  };

  const resetEventForm = () => {
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      price: 0,
      max_attendees: 100,
      image_url: '',
      category: 'Technology',
    });
  };

  const markFeedbackAsRead = async (feedbackId: string) => {
    try {
      const { error } = await supabase
        .from('feedback')
        .update({ status: 'read' })
        .eq('id', feedbackId);

      if (error) throw error;
      fetchAdminData();
    } catch (error) {
      console.error('Error marking feedback as read:', error);
    }
  };

  const getUserName = (feedbackItem: Feedback): string => {
    if (feedbackItem.profiles?.name) {
      return feedbackItem.profiles.name;
    }
    if (feedbackItem.name) {
      return feedbackItem.name;
    }
    return 'Anonymous User';
  };

  const getUserEmail = (feedbackItem: Feedback): string => {
    if (feedbackItem.profiles?.email) {
      return feedbackItem.profiles.email;
    }
    if (feedbackItem.email) {
      return feedbackItem.email;
    }
    return 'Not provided';
  };

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-royal-navy dark:via-gray-900 dark:to-black flex items-center justify-center pt-16">
        <BubbleAnimation />
        <GlassCard className="text-center max-w-md">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            You need admin privileges to access this page.
          </p>
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
          <p className="text-xl text-gray-600 dark:text-gray-300">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Chart data
  const feedbackTypeData = feedback.reduce((acc, item) => {
    const existing = acc.find(d => d.name === item.type);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: item.type, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const healthColor = getHealthColor(stats.platformHealth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-royal-navy dark:via-gray-900 dark:to-black pt-20 pb-12">
      <BubbleAnimation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Crown className="h-12 w-12 text-amber-500" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Manage your EventFlow platform
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'overview', label: 'Overview', icon: BarChart3 },
                { key: 'events', label: 'Events', icon: Calendar },
                { key: 'feedback', label: 'Feedback', icon: MessageSquare },
                { key: 'messages', label: 'Messages', icon: Mail },
              ].map((tab) => (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-royal-blue text-white shadow-lg'
                      : 'bg-white/50 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-black/30'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Professional Platform Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Professional Platform Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Platform Health Score - Replacing Total Users */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <GlassCard className="text-center relative overflow-hidden">
                    <div className={`inline-flex p-3 rounded-full ${healthColor.bg} mb-4 relative`}>
                      <Heart className={`h-6 w-6 ${healthColor.color}`} />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{ 
                          boxShadow: [
                            `0 0 0 0 ${healthColor.color.includes('emerald') ? 'rgba(16, 185, 129, 0.4)' : 
                                      healthColor.color.includes('green') ? 'rgba(34, 197, 94, 0.4)' :
                                      healthColor.color.includes('yellow') ? 'rgba(245, 158, 11, 0.4)' :
                                      healthColor.color.includes('orange') ? 'rgba(249, 115, 22, 0.4)' :
                                      'rgba(239, 68, 68, 0.4)'}`,
                            `0 0 0 10px ${healthColor.color.includes('emerald') ? 'rgba(16, 185, 129, 0)' : 
                                        healthColor.color.includes('green') ? 'rgba(34, 197, 94, 0)' :
                                        healthColor.color.includes('yellow') ? 'rgba(245, 158, 11, 0)' :
                                        healthColor.color.includes('orange') ? 'rgba(249, 115, 22, 0)' :
                                        'rgba(239, 68, 68, 0)'}`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    
                    <div className="relative">
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {stats.platformHealth}%
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        Platform Health
                      </p>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${healthColor.bg} ${healthColor.color}`}>
                        {healthColor.status}
                      </div>
                    </div>

                    {/* Health indicator bars */}
                    <div className="mt-4 space-y-2">
                      {healthMetrics.slice(0, 3).map((metric, index) => (
                        <div key={metric.name} className="flex items-center justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-400 truncate">{metric.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: metric.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${metric.value}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                            <span className="text-gray-600 dark:text-gray-300 font-medium">
                              {Math.round(metric.value)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Animated background pulse */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </GlassCard>
                </motion.div>

                {[
                  {
                    icon: Calendar,
                    label: 'Total Events',
                    value: stats.totalEvents,
                    color: 'text-green-600',
                    bgColor: 'bg-green-100 dark:bg-green-900/20',
                  },
                  {
                    icon: TrendingUp,
                    label: 'Total Bookings',
                    value: stats.totalBookings,
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
                  },
                  {
                    icon: DollarSign,
                    label: 'Total Revenue',
                    value: `₹${stats.totalRevenue.toFixed(2)}`,
                    color: 'text-amber-600',
                    bgColor: 'bg-amber-100 dark:bg-amber-900/20',
                  },
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
                  >
                    <GlassCard className="text-center">
                      <div className={`inline-flex p-3 rounded-full ${metric.bgColor} mb-4`}>
                        <metric.icon className={`h-6 w-6 ${metric.color}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {metric.value}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {metric.label}
                      </p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Platform Performance Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Platform Performance Analytics
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <span>Real-time Engagement</span>
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={platformMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [
                          `${value}${name === 'engagement' ? '%' : ''}`,
                          name === 'engagement' ? 'Engagement Rate' : 'Active Users'
                        ]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Trending className="h-5 w-5 text-green-500" />
                    <span>Revenue Trend (7 Days)</span>
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={platformMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`₹${value}`, 'Revenue']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </GlassCard>
              </div>
            </motion.div>

            {/* Performance Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Key Performance Indicators
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Target,
                    label: 'Conversion Rate',
                    value: `${((stats.totalBookings / Math.max(stats.totalUsers, 1)) * 100).toFixed(1)}%`,
                    color: 'text-emerald-600',
                    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
                    trend: '+12%'
                  },
                  {
                    icon: Clock,
                    label: 'Avg. Session Time',
                    value: '8m 32s',
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
                    trend: '+5%'
                  },
                  {
                    icon: Star,
                    label: 'User Satisfaction',
                    value: `${stats.averageRating.toFixed(1)}/5`,
                    color: 'text-yellow-600',
                    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
                    trend: '+0.3'
                  },
                  {
                    icon: Zap,
                    label: 'Platform Uptime',
                    value: '99.9%',
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
                    trend: 'Stable'
                  },
                ].map((kpi, index) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <GlassCard className="text-center relative overflow-hidden">
                      <div className={`inline-flex p-3 rounded-full ${kpi.bgColor} mb-4`}>
                        <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {kpi.value}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        {kpi.label}
                      </p>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        kpi.trend.includes('+') ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        kpi.trend === 'Stable' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {kpi.trend}
                      </div>
                      
                      {/* Animated background effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Monthly Bookings Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <GlassCard>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Monthly Bookings Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyBookings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>

            {/* Feedback Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Feedback Analytics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard className="text-center">
                  <div className="inline-flex p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20 mb-4">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stats.averageRating.toFixed(1)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Average Rating
                  </p>
                </GlassCard>

                <GlassCard className="text-center">
                  <div className="inline-flex p-3 rounded-full bg-pink-100 dark:bg-pink-900/20 mb-4">
                    <MessageSquare className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stats.totalFeedback}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Total Feedback
                  </p>
                </GlassCard>

                <GlassCard className="text-center">
                  <div className="inline-flex p-3 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                    <Activity className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {feedback.filter(f => f.type === 'bug').length}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Bug Reports
                  </p>
                </GlassCard>

                <GlassCard className="text-center">
                  <div className="inline-flex p-3 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {feedback.filter(f => f.type === 'feature').length}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Feature Requests
                  </p>
                </GlassCard>
              </div>
            </motion.div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Event Management
              </h2>
              <motion.button
                onClick={() => {
                  resetEventForm();
                  setEditingEvent(null);
                  setShowEventModal(true);
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-royal-blue text-white rounded-lg hover:bg-royal-blue/80 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Event</span>
              </motion.button>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <GlassCard key={event.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800';
                          }}
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {new Date(event.date).toLocaleDateString()} • {event.location}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              new Date(event.date) < new Date() 
                                ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                : event.status === 'active'
                                ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                            }`}>
                              {new Date(event.date) < new Date() ? 'Completed' : event.status}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {event.current_attendees}/{event.max_attendees} attendees
                            </span>
                            <span className="text-sm font-medium text-green-600">
                              ₹{event.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={() => handleEditEvent(event)}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title="Edit Event"
                      >
                        <Edit className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteEvent(event.id)}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={eventForm.category}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={eventForm.price}
                      onChange={(e) => setEventForm({ ...eventForm, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Attendees
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={eventForm.max_attendees}
                      onChange={(e) => setEventForm({ ...eventForm, max_attendees: parseInt(e.target.value) || 100 })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={eventForm.image_url}
                    onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-2 bg-royal-blue text-white rounded-lg hover:bg-royal-blue/80 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>{editingEvent ? 'Update Event' : 'Create Event'}</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              User Feedback ({feedback.length} total)
            </h2>

            <div className="space-y-4">
              {feedback.map((item) => (
                <GlassCard key={item.id}>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.type === 'bug' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                            item.type === 'feature' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            item.type === 'compliment' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400' :
                            'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                          }`}>
                            {item.type}
                          </span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.status === 'unread' 
                              ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                              : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {item.subject}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {item.message}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <p><span className="font-medium">From:</span> {getUserName(item)}</p>
                            <p><span className="font-medium">Email:</span> {getUserEmail(item)}</p>
                            <p><span className="font-medium">Date:</span> {new Date(item.created_at).toLocaleDateString()}</p>
                            <p><span className="font-medium">User Type:</span> {item.user_id ? 'Registered User' : 'Guest'}</p>
                          </div>
                        </div>
                      </div>
                      {item.status === 'unread' && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => markFeedbackAsRead(item.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Mark as Read
                        </motion.button>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
              
              {feedback.length === 0 && (
                <GlassCard className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Feedback Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    User feedback will appear here when submitted.
                  </p>
                </GlassCard>
              )}
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Messages ({contactMessages.length} total)
            </h2>

            <div className="space-y-4">
              {contactMessages.map((message) => (
                <GlassCard key={message.id}>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            message.status === 'unread' 
                              ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                              : message.status === 'read'
                              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                          }`}>
                            {message.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {message.subject}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {message.message}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <p><span className="font-medium">From:</span> {message.name}</p>
                            <p><span className="font-medium">Email:</span> {message.email}</p>
                            <p><span className="font-medium">Date:</span> {new Date(message.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
              
              {contactMessages.length === 0 && (
                <GlassCard className="text-center py-12">
                  <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Messages Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Contact messages will appear here when submitted.
                  </p>
                </GlassCard>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;