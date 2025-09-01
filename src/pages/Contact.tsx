
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Crown, CheckCircle, AlertTriangle, Zap, Shield, Headphones } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      details: 'deepakjadon1907@gmail.com',
      description: 'Lightning-fast email responses',
      color: 'from-blue-600 to-purple-600',
      accent: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Direct Line',
      details: '+91 9149370081',
      description: 'Instant voice support available',
      color: 'from-green-600 to-teal-600',
      accent: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      details: 'GLA University, Mathura, India',
      description: 'Visit our innovation hub',
      color: 'from-purple-600 to-pink-600',
      accent: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: 'Mon-Fri: 9am-6pm IST',
      description: '24/7 emergency assistance',
      color: 'from-orange-600 to-red-600',
      accent: 'text-orange-600'
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, this would use supabase
      // const { error: insertError } = await supabase
      //   .from('contact_messages')
      //   .insert([{
      //     name: formData.name,
      //     email: formData.email,
      //     subject: formData.subject,
      //     message: formData.message,
      //   }]);

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-blue-50 via-transparent to-transparent opacity-60"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-red-50 via-transparent to-transparent opacity-40"></div>
        
        {/* Dynamic Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzMzMzMzMyIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPHN2Zz4K')] opacity-30"></div>
        
        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full opacity-20 ${
              i % 4 === 0 ? 'bg-blue-400' : 
              i % 4 === 1 ? 'bg-red-400' : 
              i % 4 === 2 ? 'bg-purple-400' : 'bg-green-400'
            }`}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) 
            }}
            animate={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-20 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >

              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent leading-tight">
                Let's Connect
              </h1>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl text-slate-600 mb-8 font-light leading-relaxed">
                  Got questions about EventFlow? We're here to help. 
                  <span className="font-semibold text-blue-600"> Reach out </span> 
                  and let's start a conversation that transforms your event experience.
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                {[
                  { icon: Zap, label: '<1hr Response', color: 'text-yellow-600' },
                  { icon: Shield, label: '99.9% Uptime', color: 'text-green-600' },
                  { icon: Headphones, label: '24/7 Support', color: 'text-blue-600' },
                  { icon: Crown, label: 'Premium Care', color: 'text-purple-600' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                    <div className="text-sm font-semibold text-slate-700">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 h-full relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div className="relative">
                      <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${info.color} mb-4 shadow-lg`}>
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {info.title}
                      </h3>
                      
                      <p className={`${info.accent} font-semibold mb-2`}>
                        {info.details}
                      </p>
                      
                      <p className="text-slate-600 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form - Takes 2 columns */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      Drop us a <span className="text-blue-600">Message</span>
                    </h2>
                    <p className="text-slate-600 text-lg">
                      Ready to elevate your event experience? Let's make it happen together.
                    </p>
                  </div>

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl"
                    >
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Message sent successfully! Our team will get back to you within 24 hours.</span>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl"
                    >
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span className="font-medium">{error}</span>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="block w-full px-4 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                          placeholder="Your awesome name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="block w-full px-4 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                          placeholder="your.email@domain.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-3">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="block w-full px-4 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                        placeholder="What's on your mind?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-3">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="block w-full px-4 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300 resize-none"
                        placeholder="Tell us your story... We're all ears! 🎧"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.02 }}
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative flex items-center justify-center space-x-3">
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <Send className="h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
                        )}
                        <span className="text-lg">{loading ? 'Sending Magic...' : 'Send Message'}</span>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                {/* FAQ Preview */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Quick <span className="text-green-600">Answers</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        question: 'How fast do you respond?',
                        answer: 'Lightning fast! Usually within an hour during business hours.',
                        icon: '⚡'
                      },
                      {
                        question: 'Can I cancel bookings?',
                        answer: 'Absolutely! Cancel up to 24 hours before your event.',
                        icon: '✅'
                      },
                      {
                        question: 'Need a refund?',
                        answer: 'Each event has its own refund policy. Check event details.',
                        icon: '💰'
                      },
                    ].map((faq, index) => (
                      <div key={index} className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors duration-200">
                        <div className="flex items-start space-x-3">
                          <span className="text-lg">{faq.icon}</span>
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-1">
                              {faq.question}
                            </h4>
                            <p className="text-sm text-slate-600">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <a
                      href="/faq"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    >
                      View all FAQs →
                    </a>
                  </div>
                </div>

                {/* Support Schedule */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    We're <span className="text-purple-600">Available</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM IST', status: 'active' },
                      { day: 'Saturday', hours: '10:00 AM - 4:00 PM IST', status: 'limited' },
                      { day: 'Sunday', hours: 'Emergency support only', status: 'emergency' },
                    ].map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <div>
                          <span className="font-semibold text-slate-900 block">
                            {schedule.day}
                          </span>
                          <span className="text-sm text-slate-600">
                            {schedule.hours}
                          </span>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          schedule.status === 'active' ? 'bg-green-500' :
                          schedule.status === 'limited' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <h3 className="text-xl font-bold text-red-900">
                      Emergency Hotline
                    </h3>
                  </div>
                  <p className="text-red-700 mb-4 text-sm leading-relaxed">
                    Critical issues during events or system emergencies? We've got your back 24/7.
                  </p>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-red-600" />
                    <span className="text-red-800 font-bold text-lg">+91 9149370081</span>
                  </div>
                  <p className="text-xs text-red-600 mt-2">
                    Available round the clock for emergencies
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;