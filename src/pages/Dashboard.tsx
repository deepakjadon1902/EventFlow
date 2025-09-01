
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Bell, Star, TrendingUp, Award, RefreshCw, Zap, Target, Shield, Globe, ArrowUpRight, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import BubbleAnimation from '../components/BubbleAnimation';
import GlassCard from '../components/GlassCard';
import EventCard from '../components/EventCard';

interface DashboardStats {
  totalBookings: number;
  upcomingEvents: number;
  completedEvents: number;
  totalSpent: number;
}

interface Booking {
  id: string;
  event_id: string;
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
    image_url: string;
    category: string;
  };
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

interface PlatformHighlight {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    totalSpent: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  // Professional platform highlights instead of user data
  const platformHighlights: PlatformHighlight[] = [
    {
      title: 'Premium Experience',
      description: 'Access to exclusive, high-quality events curated for excellence',
      icon: Star,
      color: 'text-amber-400',
      bgColor: 'bg-gradient-to-br from-amber-400/10 to-amber-600/20',
    },
    {
      title: 'Global Network',
      description: 'Connect with professionals and enthusiasts worldwide',
      icon: Globe,
      color: 'text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-400/10 to-blue-600/20',
    },
    {
      title: 'Secure Platform',
      description: 'Your data and transactions are protected with enterprise-grade security',
      icon: Shield,
      color: 'text-emerald-400',
      bgColor: 'bg-gradient-to-br from-emerald-400/10 to-emerald-600/20',
    },
    {
      title: 'Innovation Hub',
      description: 'Stay ahead with cutting-edge events and industry insights',
      icon: Zap,
      color: 'text-violet-400',
      bgColor: 'bg-gradient-to-br from-violet-400/10 to-violet-600/20',
    },
  ];

  useEffect(() => {
    if (user) {
      fetchDashboardData();
      
      // Set up real-time subscriptions with better error handling
      console.log('Dashboard: Setting up real-time subscriptions...');
      
      const bookingsSubscription = supabase
        .channel('user_bookings_changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'bookings',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            console.log('Dashboard: User booking change detected:', payload);
            fetchDashboardData();
          }
        )
        .subscribe((status) => {
          console.log('Dashboard: Bookings subscription status:', status);
        });

      const notificationsSubscription = supabase
        .channel('user_notifications_changes')
        .on('postgres_changes',
          { 
            event: '*', 
            schema: 'public', 
            table: 'notifications',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            console.log('Dashboard: User notification change detected:', payload);
            fetchDashboardData();
          }
        )
        .subscribe((status) => {
          console.log('Dashboard: Notifications subscription status:', status);
        });

      return () => {
        console.log('Dashboard: Cleaning up subscriptions...');
        bookingsSubscription.unsubscribe();
        notificationsSubscription.unsubscribe();
      };
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    console.log('Dashboard: Fetching dashboard data for user:', user.email);

    try {
      // Fetch bookings with event details
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          events (*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'confirmed')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;

      // Fetch notifications
      const { data: notificationsData, error: notificationsError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (notificationsError) throw notificationsError;

      console.log('Dashboard: Fetched data:', {
        bookings: bookings?.length,
        notifications: notificationsData?.length
      });

      // Calculate stats
      const now = new Date();
      const upcomingEvents = bookings?.filter(booking => 
        new Date(booking.events.date) >= now
      ).length || 0;
      
      const completedEvents = bookings?.filter(booking => 
        new Date(booking.events.date) < now
      ).length || 0;

      const totalSpent = bookings?.reduce((sum, booking) => 
        sum + (booking.events.price || 0), 0
      ) || 0;

      setStats({
        totalBookings: bookings?.length || 0,
        upcomingEvents,
        completedEvents,
        totalSpent,
      });

      setRecentBookings(bookings?.slice(0, 3) || []);
      setNotifications(notificationsData || []);
    } catch (error) {
      console.error('Dashboard: Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    console.log('Dashboard: Manual refresh triggered');
    setRefreshing(true);
    await fetchDashboardData();
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-black dark:via-slate-950 dark:to-slate-900 flex items-center justify-center pt-16">
        <BubbleAnimation />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-black/80 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-2xl p-8 text-center max-w-md mx-4"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-900 dark:from-slate-300 dark:to-slate-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <Users className="h-8 w-8 text-white dark:text-black" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Please Sign In
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            You need to be signed in to view your dashboard.
          </p>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-white dark:to-slate-200 text-white dark:text-black rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold"
          >
            <span>Sign In</span>
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-black dark:via-slate-950 dark:to-slate-900 flex items-center justify-center pt-16">
        <BubbleAnimation />
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-transparent border-t-slate-800 dark:border-t-white rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-slate-300 font-medium"
          >
            Loading your dashboard...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-black dark:via-slate-950 dark:to-slate-900 pt-20 pb-16">
      <BubbleAnimation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-white dark:to-slate-200 rounded-2xl flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white dark:text-black" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Welcome back
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                      Your premium EventFlow experience awaits
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <motion.button
              onClick={handleRefresh}
              disabled={refreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 px-6 py-4 bg-slate-800 dark:bg-white text-white dark:text-black rounded-2xl hover:bg-slate-700 dark:hover:bg-slate-100 transition-all duration-300 disabled:opacity-50 font-semibold shadow-lg"
            >
              <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Calendar,
              label: 'Total Bookings',
              value: stats.totalBookings,
              color: 'text-blue-500',
              bgGradient: 'from-blue-500/10 to-blue-600/20',
              borderColor: 'border-blue-500/20',
            },
            {
              icon: Clock,
              label: 'Upcoming Events',
              value: stats.upcomingEvents,
              color: 'text-emerald-500',
              bgGradient: 'from-emerald-500/10 to-emerald-600/20',
              borderColor: 'border-emerald-500/20',
            },
            {
              icon: Award,
              label: 'Completed Events',
              value: stats.completedEvents,
              color: 'text-violet-500',
              bgGradient: 'from-violet-500/10 to-violet-600/20',
              borderColor: 'border-violet-500/20',
            },
            {
              icon: TrendingUp,
              label: 'Total Invested',
              value: `$${stats.totalSpent.toFixed(2)}`,
              color: 'text-amber-500',
              bgGradient: 'from-amber-500/10 to-amber-600/20',
              borderColor: 'border-amber-500/20',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className={`backdrop-blur-xl bg-white/90 dark:bg-black/90 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 ${stat.borderColor}`}>
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.bgGradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Platform Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-white dark:to-slate-200 rounded-lg flex items-center justify-center">
              <Star className="h-4 w-4 text-white dark:text-black" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Platform Excellence
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="backdrop-blur-xl bg-white/90 dark:bg-black/90 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 text-center h-full hover:shadow-2xl transition-all duration-300">
                  <div className={`inline-flex p-4 rounded-2xl ${highlight.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <highlight.icon className={`h-8 w-8 ${highlight.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {highlight.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="xl:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-white dark:to-slate-200 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white dark:text-black" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Recent Bookings
                </h2>
              </div>
              
              {recentBookings.length > 0 ? (
                <div className="space-y-6">
                  {recentBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <EventCard
                        event={booking.events}
                        showBookButton={false}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="backdrop-blur-xl bg-white/90 dark:bg-black/90 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <Calendar className="h-10 w-10 text-slate-400 dark:text-slate-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    No Bookings Yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                    Start exploring our premium events and make your first booking!
                  </p>
                  <motion.a
                    href="/events"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-white dark:to-slate-200 text-white dark:text-black rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold"
                  >
                    <span>Browse Events</span>
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.a>
                </div>
              )}
            </motion.div>
          </div>

          {/* Notifications */}
          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-white dark:to-slate-200 rounded-lg flex items-center justify-center">
                  <Bell className="h-4 w-4 text-white dark:text-black" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Notifications
                </h2>
              </div>
              
              <div className="backdrop-blur-xl bg-white/90 dark:bg-black/90 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6">
                {notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border-l-4 ${
                          notification.read
                            ? 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700'
                            : 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500 shadow-lg'
                        }`}
                        onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-2 rounded-xl ${
                            notification.read 
                              ? 'bg-slate-200 dark:bg-slate-800' 
                              : 'bg-blue-100 dark:bg-blue-900/30'
                          }`}>
                            <Bell className={`h-4 w-4 ${
                              notification.read ? 'text-slate-400' : 'text-blue-500'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-semibold truncate ${
                              notification.read 
                                ? 'text-slate-600 dark:text-slate-400' 
                                : 'text-slate-900 dark:text-white'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className={`text-sm mt-2 line-clamp-2 ${
                              notification.read 
                                ? 'text-slate-500 dark:text-slate-500' 
                                : 'text-slate-600 dark:text-slate-300'
                            }`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-slate-400 mt-3">
                              {new Date(notification.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Bell className="h-8 w-8 text-slate-400 dark:text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      All caught up!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      No new notifications
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;