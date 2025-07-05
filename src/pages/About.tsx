import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, Calendar, Star, Award, Heart, Target, Zap } from 'lucide-react';
import BubbleAnimation from '../components/BubbleAnimation';
import GlassCard from '../components/GlassCard';

const About: React.FC = () => {
  const features = [
    {
      icon: Crown,
      title: 'Premium Experience',
      description: 'Every event is crafted with royal attention to detail and luxury aesthetics.',
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Building connections and fostering relationships through exceptional events.',
    },
    {
      icon: Calendar,
      title: 'Seamless Management',
      description: 'Effortless event discovery, booking, and management in one elegant platform.',
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'Every event meets our high standards for excellence and user satisfaction.',
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about creating memorable experiences that last a lifetime.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every detail, from design to user experience.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously innovate to provide cutting-edge event management solutions.',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Quality is at the heart of everything we do, ensuring premium experiences.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-royal-navy dark:via-gray-900 dark:to-black pt-20 pb-12">
      <BubbleAnimation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Crown className="h-12 w-12 text-royal-blue mr-4" />
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              About EventFlow
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are dedicated to revolutionizing event management with premium design, 
            seamless functionality, and royal-grade user experiences that set new industry standards.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <GlassCard className="text-center bg-gradient-to-r from-royal-blue/10 to-purple-600/10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To create the world's most elegant and intuitive event management platform, 
              where every interaction feels premium, every event is memorable, and every user 
              experiences the royal treatment they deserve. We believe that exceptional events 
              deserve exceptional technology.
            </p>
          </GlassCard>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            What Makes Us Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="text-center h-full">
                  <div className="inline-flex p-3 rounded-full bg-royal-blue/10 mb-4">
                    <feature.icon className="h-8 w-8 text-royal-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="text-center h-full hover:scale-105 transition-transform duration-300">
                  <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-royal-blue/20 to-purple-600/20 mb-4">
                    <value.icon className="h-8 w-8 text-royal-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Meet the Founder
          </h2>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-royal-blue to-purple-600 rounded-full flex items-center justify-center">
                  <Crown className="h-16 w-16 text-white" />
                  {/* Future photo placeholder - replace this div with img tag when photo is available */}
                  {/* <img src="YOUR_PHOTO_URL_HERE" alt="Deepak Jadon" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover" /> */}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Deepak Jadon
                </h3>
                <p className="text-royal-blue font-medium mb-4">
                  Founder, CEO & Lead Developer
                </p>
                <div className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    Visionary founder and lead developer of EventFlow, passionate about creating 
                    premium digital experiences that revolutionize event management.
                  </p>
                  <p>
                    With a deep understanding of both technology and user experience, Deepak has 
                    crafted EventFlow to be the ultimate platform for seamless event discovery 
                    and booking.
                  </p>
                  <p>
                    Based at GLA University, Mathura, Deepak combines academic excellence with 
                    practical innovation to deliver world-class solutions.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-medium">📧</span>
                      <span>deepakjadon1907@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-medium">📱</span>
                      <span>+91 9149370081</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-medium">📍</span>
                      <span>GLA University, Mathura, India</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <GlassCard>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    EventFlow was born from a simple observation: event management platforms 
                    were functional but lacked the elegance and user experience that modern 
                    users deserve. Deepak Jadon set out to change that.
                  </p>
                  <p>
                    Founded in 2024, EventFlow combines years of experience in software development, 
                    premium design, and cutting-edge technology. We believe that every interaction 
                    should feel premium, every event should be memorable, and every user should 
                    experience the royal treatment.
                  </p>
                  <p>
                    Today, EventFlow serves users worldwide, helping them discover, 
                    book, and manage events with unprecedented ease and elegance. Our commitment 
                    to excellence drives us to continuously innovate and improve.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our Story"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-blue/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <GlassCard className="text-center bg-gradient-to-r from-royal-blue/10 to-purple-600/10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Join the EventFlow Experience
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to experience event management the royal way? Join thousands of users 
              who trust EventFlow for their premium event needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-royal-blue to-royal-light text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started Free
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-900 dark:text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200"
              >
                Contact Us
              </motion.a>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default About;