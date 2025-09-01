
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, Calendar, Star, Award, Heart, Target, Zap, ArrowRight, Sparkles, Shield, Rocket } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Crown,
      title: 'Premium Experience',
      description: 'Every event is crafted with royal attention to detail and luxury aesthetics that define excellence.',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Building meaningful connections and fostering lifelong relationships through extraordinary events.',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: Calendar,
      title: 'Seamless Management',
      description: 'Effortless event discovery, booking, and management unified in one sophisticated platform.',
      gradient: 'from-indigo-600 to-blue-600'
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'Every event surpasses our rigorous standards for excellence and unmatched user satisfaction.',
      gradient: 'from-teal-600 to-cyan-600'
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We\'re obsessed with creating unforgettable experiences that resonate for a lifetime.',
      color: 'text-red-500'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We pursue perfection in every pixel, every interaction, every moment.',
      color: 'text-blue-500'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We pioneer cutting-edge solutions that redefine event management boundaries.',
      color: 'text-yellow-500'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Quality isn\'t just our standard—it\'s our obsession and your guarantee.',
      color: 'text-green-500'
    },
  ];

  const stats = [
    { number: '99.9%', label: 'Uptime', icon: Shield },
    { number: '24/7', label: 'Support', icon: Rocket }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-blue-50 via-transparent to-transparent opacity-50"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-slate-50 via-transparent to-transparent opacity-50"></div>
        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-200 rounded-full opacity-20"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-20 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
             
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent leading-tight">
                About EventFlow
              </h1>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl text-slate-600 mb-8 font-light leading-relaxed">
                  Revolutionizing event management with 
                  <span className="font-semibold text-blue-600"> premium design</span>, 
                  <span className="font-semibold text-purple-600"> seamless functionality</span>, and 
                  <span className="font-semibold text-slate-900"> royal-grade experiences</span> that set new industry benchmarks.
                </p>
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.number}</div>
                  <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-1"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 relative">
                <div className="absolute top-6 right-6">
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 text-center">
                  Our Mission
                </h2>
                <p className="text-xl md:text-2xl text-slate-700 text-center max-w-5xl mx-auto leading-relaxed font-light">
                  To architect the world's most 
                  <span className="font-semibold text-blue-600"> sophisticated </span> 
                  and 
                  <span className="font-semibold text-purple-600"> intuitive </span> 
                  event management ecosystem, where every interaction radiates premium quality, 
                  every event becomes legendary, and every user receives the 
                  <span className="font-semibold text-slate-900"> royal treatment </span> 
                  they deserve. We believe extraordinary events demand extraordinary technology.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                What Makes Us <span className="text-blue-600">Legendary</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Discover the exceptional features that set EventFlow apart from the ordinary
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    <div className="relative">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-lg`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Our Core <span className="text-purple-600">Values</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                The fundamental principles that drive everything we create and deliver
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                    <div className="inline-flex p-4 rounded-2xl bg-slate-50 mb-6 group-hover:bg-slate-100 transition-colors duration-300">
                      <value.icon className={`h-8 w-8 ${value.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Meet the <span className="text-blue-600">Visionary</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                The mastermind behind EventFlow's revolutionary approach to event management
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-48 h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                        <Crown className="h-20 w-20 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                        <Sparkles className="h-6 w-6 text-yellow-800" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                      Deepak Jadon
                    </h3>
                    <div className="text-xl text-blue-600 font-semibold mb-6">
                      Founder, CEO & Lead Architect
                    </div>
                    
                    <div className="space-y-4 text-slate-700 leading-relaxed mb-8">
                      <p className="text-lg">
                        <strong>Visionary architect</strong> and lead developer of EventFlow, driven by an unwavering passion for creating 
                        premium digital experiences that fundamentally transform event management.
                      </p>
                      <p className="text-lg">
                        With profound expertise in both <strong>cutting-edge technology</strong> and <strong>user experience design</strong>, 
                        Deepak has meticulously crafted EventFlow to be the ultimate platform for seamless event discovery and booking.
                      </p>
                      <p className="text-lg">
                        Operating from <strong>GLA University, Mathura</strong>, Deepak seamlessly blends academic excellence with 
                        practical innovation to deliver world-class solutions that exceed expectations.
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6">
                      <h4 className="font-bold text-slate-900 mb-4 text-lg">Get in Touch</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center justify-center sm:justify-start space-x-2">
                          <span className="text-2xl">📧</span>
                          <span className="text-slate-600">deepakjadon1907@gmail.com</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start space-x-2">
                          <span className="text-2xl">📱</span>
                          <span className="text-slate-600">+91 9149370081</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start space-x-2">
                          <span className="text-2xl">📍</span>
                          <span className="text-slate-600">GLA University, Mathura</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
                <div className="p-8 lg:p-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
                    Our <span className="text-purple-600">Journey</span>
                  </h2>
                  <div className="space-y-6 text-slate-700 leading-relaxed">
                    <p className="text-lg">
                      EventFlow was born from a revolutionary observation: event management platforms 
                      were merely functional, lacking the <strong>elegance and premium experience</strong> that 
                      modern users rightfully demand. Deepak Jadon embarked on a mission to transform this landscape.
                    </p>
                    <p className="text-lg">
                      Established in <strong>2024</strong>, EventFlow represents years of expertise in software architecture, 
                      premium design philosophy, and cutting-edge technology. We believe every interaction should 
                      radiate premium quality, every event should become <strong>legendary</strong>, and every user 
                      should experience the royal treatment they deserve.
                    </p>
                    <p className="text-lg">
                      Today, EventFlow serves a global community, empowering users to discover, 
                      book, and manage events with <strong>unprecedented ease and sophistication</strong>. Our relentless 
                      commitment to excellence fuels continuous innovation and improvement.
                    </p>
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Our Story"
                    className="w-full h-full object-cover min-h-[400px] lg:min-h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-slate-900 font-semibold">Since 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-1"
            >
              <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Experience the <span className="text-blue-400">EventFlow</span> Difference
                  </h2>
                  <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Ready to revolutionize your event management experience? Join thousands of users 
                    who trust EventFlow for their premium event needs and discover what excellence truly means.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <motion.a
                      href="/register"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.a>
                    
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-10 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                    >
                      Let's Talk
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;