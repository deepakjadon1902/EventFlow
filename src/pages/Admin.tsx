
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Calendar, TrendingUp, DollarSign, Plus, Edit, Trash2, Eye, 
  MessageSquare, Mail, Star, BarChart3, PieChart, Activity, Crown, 
  Shield, Globe, Zap, X, Save, Clock, Target, Heart, Gauge,
  ArrowUp, ArrowDown, Filter, Search, Bell, Menu, LogOut,
  ChevronDown, CheckCircle, AlertCircle, XCircle, Briefcase,
  Building, Headphones, Settings, Home, FileText, Award
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, RadialBarChart, RadialBar, Cell, PieChart as RechartsPieChart } from 'recharts';

// Interfaces remain the same
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
  const [searchTerm, setSearchTerm] = useState('');
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
    const userEngagement = Math.min(100, (totalBookings / Math.max(totalUsers, 1)) * 100);
    const eventUtilization = Math.min(100, (totalBookings / Math.max(totalEvents, 1)) * 20);
    const satisfactionScore = (averageRating / 5) * 100;
    const activityLevel = Math.min(100, (activeEvents / Math.max(totalEvents, 1)) * 100);
    const feedbackHealth = Math.min(100, Math.max(0, 100 - (feedback.filter(f => f.type === 'bug').length / Math.max(totalFeedback, 1)) * 100));
    
    const healthScore = (
      userEngagement * 0.25 +
      eventUtilization * 0.2 +
      satisfactionScore * 0.25 +
      activityLevel * 0.15 +
      feedbackHealth * 0.15
    );

    return Math.round(Math.min(100, Math.max(0, healthScore)));
  };

  const getHealthStatus = (score: number) => {
    if (score >= 90) return { color: '#22c55e', bg: '#dcfce7', text: '#166534', status: 'Excellent', icon: CheckCircle };
    if (score >= 75) return { color: '#3b82f6', bg: '#dbeafe', text: '#1e40af', status: 'Good', icon: CheckCircle };
    if (score >= 60) return { color: '#f59e0b', bg: '#fef3c7', text: '#92400e', status: 'Fair', icon: AlertCircle };
    if (score >= 40) return { color: '#f97316', bg: '#fed7aa', text: '#9a3412', status: 'Poor', icon: AlertCircle };
    return { color: '#ef4444', bg: '#fee2e2', text: '#991b1b', status: 'Critical', icon: XCircle };
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

      const monthlyData = calculateMonthlyBookings(bookingsData || []);
      setMonthlyBookings(monthlyData);

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
        : 4.5;

      const platformHealth = calculatePlatformHealth(
        usersCount || 0,
        eventsCount || 0,
        bookingsCount || 0,
        averageRating,
        activeEvents,
        feedbackCount || 0
      );

      const healthData = [
        { name: 'User Engagement', value: Math.min(100, ((bookingsCount || 0) / Math.max(usersCount || 1, 1)) * 100), color: '#1e40af' },
        { name: 'Event Quality', value: (averageRating / 5) * 100, color: '#dc2626' },
        { name: 'Platform Activity', value: Math.min(100, (activeEvents / Math.max(eventsCount || 1, 1)) * 100), color: '#000000' },
        { name: 'System Stability', value: 98, color: '#1e3a8a' },
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
    if (feedbackItem.profiles?.name) return feedbackItem.profiles.name;
    if (feedbackItem.name) return feedbackItem.name;
    return 'Anonymous User';
  };

  const getUserEmail = (feedbackItem: Feedback): string => {
    if (feedbackItem.profiles?.email) return feedbackItem.profiles.email;
    if (feedbackItem.email) return feedbackItem.email;
    return 'Not provided';
  };

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">Administrator privileges required to access this dashboard.</p>
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-600 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Dashboard</h3>
          <p className="text-gray-600">Fetching real-time data...</p>
        </div>
      </div>
    );
  }

  const healthStatus = getHealthStatus(stats.platformHealth);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EventFlow Admin</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
                {(feedback.filter(f => f.status === 'unread').length + contactMessages.filter(m => m.status === 'unread').length) > 0 && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      {feedback.filter(f => f.status === 'unread').length + contactMessages.filter(m => m.status === 'unread').length}
                    </span>
                  </div>
                )}
              </div>
              <Settings className="h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
              <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
            <div className="flex space-x-1">
              {[
                { key: 'overview', label: 'Dashboard', icon: Home },
                { key: 'events', label: 'Events', icon: Calendar },
                { key: 'feedback', label: 'Feedback', icon: MessageSquare },
                { key: 'messages', label: 'Messages', icon: Mail },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.key === 'feedback' && feedback.filter(f => f.status === 'unread').length > 0 && (
                    <span className="w-5 h-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center">
                      {feedback.filter(f => f.status === 'unread').length}
                    </span>
                  )}
                  {tab.key === 'messages' && contactMessages.filter(m => m.status === 'unread').length > 0 && (
                    <span className="w-5 h-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center">
                      {contactMessages.filter(m => m.status === 'unread').length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Welcome Back, Administrator</h2>
                  <p className="text-blue-100 text-lg">Monitor your platform's performance and manage operations efficiently</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                    <Briefcase className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Platform Health */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: healthStatus.bg }}>
                    <healthStatus.icon className="h-6 w-6" style={{ color: healthStatus.color }} />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium`} style={{ backgroundColor: healthStatus.bg, color: healthStatus.text }}>
                    {healthStatus.status}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">{stats.platformHealth}%</h3>
                  <p className="text-sm text-gray-600">Platform Health Score</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500" 
                      style={{ backgroundColor: healthStatus.color, width: `${stats.platformHealth}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>

              {/* Other Metrics */}
              {[
                {
                  icon: Calendar,
                  label: 'Active Events',
                  value: stats.totalEvents,
                  change: '+12%',
                  positive: true,
                  color: '#dc2626',
                  bgColor: '#fee2e2',
                },
                {
                  icon: TrendingUp,
                  label: 'Total Bookings',
                  value: stats.totalBookings,
                  change: '+8%',
                  positive: true,
                  color: '#000000',
                  bgColor: '#f3f4f6',
                },
                {
                  icon: DollarSign,
                  label: 'Total Revenue',
                  value: `₹${stats.totalRevenue.toLocaleString()}`,
                  change: '+15%',
                  positive: true,
                  color: '#1e3a8a',
                  bgColor: '#dbeafe',
                },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 1) * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: metric.bgColor }}>
                      <metric.icon className="h-6 w-6" style={{ color: metric.color }} />
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      metric.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {metric.positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Activity className="h-5 w-5 text-blue-900 mr-2" />
                  Performance Analytics
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={platformMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      formatter={(value, name) => [`${value}${name === 'engagement' ? '%' : ''}`, name === 'engagement' ? 'Engagement Rate' : 'Active Users']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="#1e3a8a" 
                      fill="#1e3a8a" 
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-5 w-5 text-red-600 mr-2" />
                  Revenue Trends
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={platformMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      formatter={(value) => [`₹${value}`, 'Revenue']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#dc2626" 
                      strokeWidth={3}
                      dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#dc2626', strokeWidth: 2, fill: 'white' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="h-5 w-5 text-black mr-2" />
                Monthly Booking Trends
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyBookings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Bar 
                    dataKey="bookings" 
                    fill="#1e3a8a" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</h4>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h4>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">{stats.totalFeedback}</h4>
                <p className="text-sm text-gray-600">Total Feedback</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">{stats.activeEvents}</h4>
                <p className="text-sm text-gray-600">Active Events</p>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
                <p className="text-gray-600 mt-1">Manage your events and track performance</p>
              </div>
              <button
                onClick={() => {
                  resetEventForm();
                  setEditingEvent(null);
                  setShowEventModal(true);
                }}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Create Event</span>
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {events.filter(event => 
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.category.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800';
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            new Date(event.date) < new Date() 
                              ? 'bg-gray-100 text-gray-600'
                              : event.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {new Date(event.date) < new Date() ? 'Completed' : event.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{event.current_attendees}/{event.max_attendees} attendees</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-medium text-green-600">₹{event.price}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Event"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {events.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
                  <p className="text-gray-600 mb-6">Start by creating your first event to engage your audience</p>
                  <button
                    onClick={() => {
                      resetEventForm();
                      setEditingEvent(null);
                      setShowEventModal(true);
                    }}
                    className="px-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors"
                  >
                    Create Your First Event
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingEvent ? 'Edit Event' : 'Create New Event'}
                  </h3>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleEventSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      placeholder="Enter event title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={eventForm.category}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={eventForm.price}
                      onChange={(e) => setEventForm({ ...eventForm, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Attendees
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={eventForm.max_attendees}
                      onChange={(e) => setEventForm({ ...eventForm, max_attendees: parseInt(e.target.value) || 100 })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="Event venue or location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={eventForm.image_url}
                    onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                    placeholder="Describe your event..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>{editingEvent ? 'Update Event' : 'Create Event'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">User Feedback</h2>
                <p className="text-gray-600 mt-1">Monitor user experiences and suggestions</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Total: {feedback.length}</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Feedback Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Average Rating', value: stats.averageRating.toFixed(1), icon: Star, color: 'yellow' },
                { label: 'Bug Reports', value: feedback.filter(f => f.type === 'bug').length, icon: AlertCircle, color: 'red' },
                { label: 'Feature Requests', value: feedback.filter(f => f.type === 'feature').length, icon: Zap, color: 'blue' },
                { label: 'Compliments', value: feedback.filter(f => f.type === 'compliment').length, icon: Heart, color: 'pink' },
              ].map((stat, index) => (
                <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      stat.color === 'yellow' ? 'bg-yellow-100' :
                      stat.color === 'red' ? 'bg-red-100' :
                      stat.color === 'blue' ? 'bg-blue-100' :
                      'bg-pink-100'
                    }`}>
                      <stat.icon className={`h-5 w-5 ${
                        stat.color === 'yellow' ? 'text-yellow-600' :
                        stat.color === 'red' ? 'text-red-600' :
                        stat.color === 'blue' ? 'text-blue-600' :
                        'text-pink-600'
                      }`} />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feedback List */}
            <div className="space-y-4">
              {feedback.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.type === 'bug' ? 'bg-red-100 text-red-800' :
                        item.type === 'feature' ? 'bg-blue-100 text-blue-800' :
                        item.type === 'compliment' ? 'bg-pink-100 text-pink-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
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
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    {item.status === 'unread' && (
                      <button
                        onClick={() => markFeedbackAsRead(item.id)}
                        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.subject}</h4>
                  <p className="text-gray-600 mb-4">{item.message}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-700">From:</span>
                        <span className="text-gray-600">{getUserName(item)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="text-gray-600">{getUserEmail(item)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-700">Date:</span>
                        <span className="text-gray-600">{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-700">Type:</span>
                        <span className="text-gray-600">{item.user_id ? 'Registered User' : 'Guest'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {feedback.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Feedback Yet</h3>
                  <p className="text-gray-600">User feedback and suggestions will appear here when submitted.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
                <p className="text-gray-600 mt-1">Messages from your website contact form</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Total: {contactMessages.length}</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-4">
              {contactMessages.map((message) => (
                <div key={message.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        message.status === 'unread' 
                          ? 'bg-orange-100 text-orange-800'
                          : message.status === 'read'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{message.subject}</h4>
                  <p className="text-gray-600 mb-4">{message.message}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-700">From:</span>
                        <span className="text-gray-600">{message.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="text-gray-600">{message.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-700">Date:</span>
                        <span className="text-gray-600">{new Date(message.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {contactMessages.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Messages Yet</h3>
                  <p className="text-gray-600">Contact messages from your website will appear here.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;