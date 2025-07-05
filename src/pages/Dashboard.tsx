import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Bell, Star, TrendingUp, Award, RefreshCw, Zap, Target, Shield, Globe } from 'lucide-react';
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
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      title: 'Global Network',
      description: 'Connect with professionals and enthusiasts worldwide',
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Secure Platform',
      description: 'Your data and transactions are protected with enterprise-grade security',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'Innovation Hub',
      description: 'Stay ahead with cutting-edge events and industry insights',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-royal-navy dark:via-gray-900 dark:to-black flex items-center justify-center pt-16">
        <BubbleAnimation />
        <GlassCard className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please Sign In
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You need to be signed in to view your dashboard.
          </p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
          >
            Sign In
          </a>
        </GlassCard>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-royal-navy dark:via-gray-900 dark:to-black flex items-center justify-center pt-16">
        <BubbleAnimation />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-royal-navy dark:via-gray-900 dark:to-black pt-20 pb-12">
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
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Your premium EventFlow experience awaits
              </p>
            </div>
            <motion.button
              onClick={handleRefresh}
              disabled={refreshing}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Calendar,
              label: 'Total Bookings',
              value: stats.totalBookings,
              color: 'text-blue-600',
              bgColor: 'bg-blue-100 dark:bg-blue-900/20',
            },
            {
              icon: Clock,
              label: 'Upcoming Events',
              value: stats.upcomingEvents,
              color: 'text-green-600',
              bgColor: 'bg-green-100 dark:bg-green-900/20',
            },
            {
              icon: Award,
              label: 'Completed Events',
              value: stats.completedEvents,
              color: 'text-purple-600',
              bgColor: 'bg-purple-100 dark:bg-purple-900/20',
            },
            {
              icon: TrendingUp,
              label: 'Total Invested',
              value: `$${stats.totalSpent.toFixed(2)}`,
              color: 'text-amber-600',
              bgColor: 'bg-amber-100 dark:bg-amber-900/20',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="text-center">
                <div className={`inline-flex p-3 rounded-full ${stat.bgColor} mb-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {stat.label}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Platform Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Platform Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <GlassCard className="text-center h-full">
                  <div className={`inline-flex p-3 rounded-full ${highlight.bgColor} mb-4`}>
                    <highlight.icon className={`h-6 w-6 ${highlight.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Recent Bookings
              </h2>
              
              {recentBookings.length > 0 ? (
                <div className="space-y-6">
                  {recentBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <EventCard
                        event={booking.events}
                        showBookButton={false}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <GlassCard className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Bookings Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Start exploring our premium events and make your first booking!
                  </p>
                  <a
                    href="/events"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    Browse Events
                  </a>
                </GlassCard>
              )}
            </motion.div>
          </div>

          {/* Notifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Notifications
              </h2>
              
              <GlassCard>
                {notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all duration-200 ${
                          notification.read
                            ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600'
                            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                        }`}
                        onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <Bell className={`h-5 w-5 mt-0.5 ${
                            notification.read ? 'text-gray-400' : 'text-blue-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              notification.read 
                                ? 'text-gray-600 dark:text-gray-400' 
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className={`text-sm mt-1 ${
                              notification.read 
                                ? 'text-gray-500 dark:text-gray-500' 
                                : 'text-gray-600 dark:text-gray-300'
                            }`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(notification.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-300">
                      No notifications yet
                    </p>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;