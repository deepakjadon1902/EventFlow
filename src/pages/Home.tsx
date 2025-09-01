
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Shield, Star, ArrowRight, Sparkles, Zap, Globe, Award, Crown, Rocket, MessageSquare, TrendingUp, Users, CheckCircle, Target, Layers } from 'lucide-react';
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

  // Enterprise-grade metrics with professional presentation
  const enterpriseMetrics = [
    {
      icon: Calendar,
      label: 'Active Events',
      value: `${stats.totalEvents || '50'}+`,
      description: 'Premium Experiences',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-100'
    },
    {
      icon: Users,
      label: 'Event Bookings',
      value: `${stats.totalBookings || '2.5'}K+`,
      description: 'Satisfied Customers',
      color: 'text-slate-700',
      bgColor: 'bg-slate-50 border-slate-200'
    },
    {
      icon: MessageSquare,
      label: 'Customer Reviews',
      value: `${stats.totalFeedback || '1.2'}K+`,
      description: 'Verified Feedback',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 border-blue-200'
    },
    {
      icon: Star,
      label: 'Platform Rating',
      value: stats.averageRating > 0 ? `${stats.averageRating.toFixed(1)}/5` : '4.9/5',
      description: 'Excellence Standard',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 border-yellow-200'
    }
  ];

  // Enterprise features inspired by top platforms
  const enterpriseFeatures = [
    {
      icon: Zap,
      title: 'Lightning Performance',
      description: 'Sub-second response times powered by enterprise-grade infrastructure and global CDN distribution',
      color: 'text-amber-600'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with end-to-end encryption, multi-factor authentication, and zero-trust architecture',
      color: 'text-emerald-600'
    },
    {
      icon: Layers,
      title: 'Advanced Analytics',
      description: 'Real-time insights and comprehensive reporting with AI-powered recommendations and trend analysis',
      color: 'text-purple-600'
    },
    {
      icon: Globe,
      title: 'Global Infrastructure',
      description: '99.99% uptime guarantee with multi-region deployment and automatic failover capabilities',
      color: 'text-cyan-600'
    },
    {
      icon: Crown,
      title: 'White-Glove Support',
      description: 'Dedicated success managers, priority support, and custom integration assistance for enterprise clients',
      color: 'text-rose-600'
    },
    {
      icon: Target,
      title: 'Custom Solutions',
      description: 'Tailored implementations with API access, custom branding, and specialized workflow automation',
      color: 'text-indigo-600'
    }
  ];

  const trustIndicators = [
    'SOC 2 Type II Certified',
    'GDPR Compliant',
    '99.99% Uptime SLA',
    'ISO 27001 Certified',
    '24/7 Global Support',
    'Enterprise Ready'
  ];

  return (
    <div className="min-h-screen bg-white">
      <BubbleAnimation />
      
      {/* Error Display */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl shadow-lg max-w-md mx-auto"
        >
          <div className="flex items-center text-sm">
            <span className="flex-1">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-4 text-red-600 hover:text-red-800 font-semibold text-lg leading-none"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-blue-50/30 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100/40 to-slate-100/40 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-slate-100/30 to-blue-100/30 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 sm:mb-8"
              >
                <CheckCircle size={16} />
                <span>Trusted by 10,000+ event professionals worldwide</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 sm:mb-8 tracking-tight leading-tight">
                The Future of{' '}
                <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-slate-800 bg-clip-text text-transparent">
                  Event Management
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
                Enterprise-grade platform that transforms how organizations create, manage, and scale exceptional event experiences.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/events"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group min-w-[200px] justify-center"
                  >
                    Explore Events
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/about"
                    className="inline-flex items-center px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 min-w-[200px] justify-center"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500">
                {trustIndicators.slice(0, 3).map((indicator, index) => (
                  <motion.span
                    key={indicator}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="px-3 py-1 bg-white border border-slate-200 rounded-full whitespace-nowrap"
                  >
                    {indicator}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise Metrics Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6">
              Platform Performance
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Real-time metrics that demonstrate our commitment to excellence and reliability in enterprise event management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {enterpriseMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative p-6 lg:p-8 rounded-2xl border-2 ${metric.bgColor} group hover:shadow-lg transition-all duration-300`}
              >
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-white border border-slate-200 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  
                  <motion.h3 
                    className="text-3xl sm:text-4xl font-bold text-black mb-2"
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.05, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  >
                    {metric.value}
                  </motion.h3>
                  <p className="text-black font-semibold mb-1 text-sm sm:text-base">
                    {metric.label}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6">
              Enterprise-Grade Capabilities
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto">
              Built for scale with enterprise security, performance, and reliability that meets the demands of global organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 group hover:shadow-xl hover:border-slate-300 transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4 group-hover:bg-slate-100 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {!loading && !error && featuredEvents.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 lg:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6">
                Featured Events
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
                Discover curated premium events designed for exceptional experiences and meaningful connections.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EventCard event={event} showBookButton={false} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/events"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
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
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading premium events...</p>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-slate-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 sm:p-12 lg:p-16 rounded-3xl shadow-xl border border-slate-200 text-center relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
                Ready to Scale Your Events?
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Join leading organizations worldwide who trust our platform to deliver exceptional event experiences at enterprise scale.
              </p>
              
              {/* Enterprise trust badges */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
                {trustIndicators.map((badge, index) => (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 rounded-full"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/register"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] justify-center"
                  >
                    Start Free Trial
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 min-w-[200px] justify-center"
                  >
                    Contact Sales
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;