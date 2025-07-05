import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Shield, Star, ArrowRight, Sparkles, Zap, Globe, Award, Crown, Rocket, MessageSquare, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import BubbleAnimation from '../components/BubbleAnimation';
import GlassCard from '../components/GlassCard';
import EventCard from '../components/EventCard';

const Home: React.FC = () => {
  const [featuredEvents, setFeaturedEvents] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalFeedback: 0,
    averageRating: 0,
    platformReliability: 99.9,
    globalReach: 50,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeaturedEvents();
    fetchStats();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (fetchError) {
        console.error('Supabase error:', fetchError);
        setError(`Failed to fetch events: ${fetchError.message}`);
        return;
      }
      
      if (data) {
        setFeaturedEvents(data);
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Unable to connect to the database. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Get total events
      const { count: eventCount, error: countError } = await supabase
        .from('events')
        .select('*', { count: 'exact' });

      if (countError) {
        console.error('Error fetching stats:', countError);
        return;
      }

      // Get total bookings
      const { count: bookingCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact' })
        .eq('status', 'confirmed');

      // Get feedback stats
      const { data: feedbackData, count: feedbackCount } = await supabase
        .from('feedback')
        .select('rating', { count: 'exact' });

      const averageRating = feedbackData && feedbackData.length > 0
        ? feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length
        : 0;

      setStats({
        totalEvents: eventCount || 0,
        totalBookings: bookingCount || 0,
        totalFeedback: feedbackCount || 0,
        averageRating,
        platformReliability: 99.9,
        globalReach: 50,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      // Use default stats if there's an error
    }
  };

  // Professional metrics that premium platforms showcase
  const professionalMetrics = [
    {
      icon: Calendar,
      label: 'Premium Events',
      value: `${stats.totalEvents}+`,
      description: 'Curated Excellence',
      color: 'text-amber-600',
      bgGradient: 'from-amber-100 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20'
    },
    {
      icon: TrendingUp,
      label: 'Total Bookings',
      value: `${stats.totalBookings}+`,
      description: 'User Engagement',
      color: 'text-purple-600',
      bgGradient: 'from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20'
    },
    {
      icon: MessageSquare,
      label: 'User Feedback',
      value: `${stats.totalFeedback}+`,
      description: 'Community Voice',
      color: 'text-pink-600',
      bgGradient: 'from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20'
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: stats.averageRating > 0 ? `${stats.averageRating.toFixed(1)}/5` : '5.0/5',
      description: 'User Satisfaction',
      color: 'text-yellow-600',
      bgGradient: 'from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20'
    }
  ];

  // Premium features that attract users
  const premiumFeatures = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant booking with zero lag, powered by cutting-edge technology',
      color: 'text-yellow-500'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your data protected with military-grade encryption',
      color: 'text-green-500'
    },
    {
      icon: Star,
      title: 'Premium Curation',
      description: 'Hand-picked events that meet our excellence standards',
      color: 'text-purple-500'
    },
    {
      icon: Award,
      title: 'VIP Treatment',
      description: 'Priority support and exclusive access to premium events',
      color: 'text-blue-500'
    },
    {
      icon: Rocket,
      title: 'Innovation First',
      description: 'Always ahead with the latest features and technologies',
      color: 'text-red-500'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with premium events worldwide',
      color: 'text-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-royal-navy dark:via-gray-900 dark:to-black">
      <BubbleAnimation />
      
      {/* Error Display */}
      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center">
            <span className="text-sm">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-royal-blue mr-3 animate-pulse" />
                <span className="text-lg font-medium text-royal-blue">Premium Event Management</span>
                <Sparkles className="h-8 w-8 text-royal-blue ml-3 animate-pulse" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-royal-blue via-royal-light to-purple-600 bg-clip-text text-transparent">
                  EventFlow
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Experience royal-grade event management with premium design, seamless booking, and unforgettable experiences.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/events"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-royal-blue to-royal-light text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                  >
                    Explore Events
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/about"
                    className="inline-flex items-center px-8 py-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-900 dark:text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Metrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Professionals Worldwide
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join the platform that sets the standard for premium event experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {professionalMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className={`text-center bg-gradient-to-br ${metric.bgGradient} border-white/30`}>
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="inline-flex p-4 rounded-full bg-white/50 dark:bg-black/20 mb-4"
                    >
                      <metric.icon className={`h-8 w-8 ${metric.color}`} />
                    </motion.div>
                    
                    {/* Floating particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                        style={{
                          left: `${30 + i * 20}%`,
                          top: `${20 + i * 10}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                  
                  <motion.h3 
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {metric.value}
                  </motion.h3>
                  <p className="text-gray-900 dark:text-white font-semibold mb-1">
                    {metric.label}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {metric.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Industry Leaders Choose EventFlow
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the same level of excellence that powers the world's most successful platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <GlassCard className="h-full group hover:shadow-xl transition-all duration-300">
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="inline-flex p-3 rounded-full bg-white/50 dark:bg-black/20 mb-4 group-hover:bg-white/70 dark:group-hover:bg-black/30 transition-colors"
                    >
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {!loading && !error && featuredEvents.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Events
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover our handpicked selection of premium events designed for exceptional experiences.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EventCard event={event} showBookButton={false} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/events"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-royal-blue to-royal-light text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  View All Events
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {loading && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading events...</p>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="text-center bg-gradient-to-r from-royal-blue/10 to-purple-600/10">
              <div className="relative">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Ready to Experience Premium Events?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of professionals who trust EventFlow for their event management needs. 
                  Sign up today and discover the royal treatment.
                </p>
                
                {/* Premium badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {['Enterprise Grade', 'ISO Certified', '24/7 Support', 'Global Access'].map((badge, index) => (
                    <motion.span
                      key={badge}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-3 py-1 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-300 rounded-full border border-white/30"
                    >
                      {badge}
                    </motion.span>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/register"
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-royal-blue to-royal-light text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Get Started Free
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/contact"
                      className="inline-flex items-center px-8 py-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-900 dark:text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200"
                    >
                      Contact Sales
                    </Link>
                  </motion.div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;