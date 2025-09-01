

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Send, CheckCircle, Bug, Lightbulb, Heart, AlertTriangle, Clock, Mail, Zap, Users, Target, Award } from 'lucide-react';

const Feedback = () => {
  const [formData, setFormData] = useState({
    type: 'general',
    rating: 5,
    subject: '',
    message: '',
    email: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Simulated user state - in real app this would come from useAuth()
  const user = null; // Set to null to show guest form

  const feedbackTypes = [
    { 
      id: 'general', 
      label: 'General Feedback', 
      icon: MessageSquare, 
      color: 'text-blue-600',
      gradient: 'from-blue-600 to-cyan-600',
      description: 'Share your overall experience'
    },
    { 
      id: 'bug', 
      label: 'Bug Report', 
      icon: Bug, 
      color: 'text-red-600',
      gradient: 'from-red-600 to-pink-600',
      description: 'Report technical issues'
    },
    { 
      id: 'feature', 
      label: 'Feature Request', 
      icon: Lightbulb, 
      color: 'text-yellow-600',
      gradient: 'from-yellow-600 to-orange-600',
      description: 'Suggest new features'
    },
    { 
      id: 'compliment', 
      label: 'Compliment', 
      icon: Heart, 
      color: 'text-pink-600',
      gradient: 'from-pink-600 to-red-600',
      description: 'Share what you love'
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
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
      //   .from('feedback')
      //   .insert([{
      //     user_id: user?.id || null,
      //     type: formData.type,
      //     rating: formData.rating,
      //     subject: formData.subject,
      //     message: formData.message,
      //     email: formData.email || user?.email || null,
      //     name: formData.name || null,
      //   }]);

      setSuccess(true);
      setFormData({
        type: 'general',
        rating: 5,
        subject: '',
        message: '',
        email: '',
        name: '',
      });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending feedback:', error);
      setError(error.message || 'Failed to send feedback. Please try again.');
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
        {[...Array(6)].map((_, i) => (
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
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-20 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >

              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent leading-tight">
                Your Voice Matters
              </h1>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl text-slate-600 mb-8 font-light leading-relaxed">
                  Help us shape the future of EventFlow. Your 
                  <span className="font-semibold text-blue-600"> feedback drives innovation</span>, 
                  <span className="font-semibold text-red-600"> bug reports ensure quality</span>, and 
                  <span className="font-semibold text-purple-600"> suggestions spark creativity</span>.
                </p>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
                {[
                  { icon: Target, label: 'Issues Fixed', value: '95%', color: 'text-green-600' },
                  { icon: Zap, label: 'Avg Response', value: '<24h', color: 'text-yellow-600' },
                  { icon: Award, label: 'Satisfaction', value: '4.8/5', color: 'text-purple-600' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                    <div className="text-xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Feedback Form - Takes 2 columns */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      Share Your <span className="text-blue-600">Experience</span>
                    </h2>
                    <p className="text-slate-600 text-lg">
                      Every piece of feedback helps us build a better EventFlow for everyone.
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
                        <span className="font-medium">Feedback submitted successfully! Our team will review it within 24 hours.</span>
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

                  <div className="space-y-8">
                    {/* Feedback Type Selection */}
                    <div>
                      <label className="block text-lg font-semibold text-slate-900 mb-4">
                        What's on your mind?
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {feedbackTypes.map((type) => (
                          <motion.button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, type: type.id })}
                            whileTap={{ scale: 0.98 }}
                            whileHover={{ y: -2 }}
                            className={`relative overflow-hidden p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                              formData.type === type.id
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:shadow-md'
                            }`}
                          >
                            <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 ${formData.type === type.id ? 'opacity-5' : 'group-hover:opacity-3'} transition-opacity duration-300`}></div>
                            
                            <div className="relative">
                              <div className={`inline-flex p-3 rounded-xl mb-3 ${
                                formData.type === type.id 
                                  ? `bg-gradient-to-r ${type.gradient} shadow-lg` 
                                  : 'bg-white border border-slate-200'
                              }`}>
                                <type.icon className={`h-6 w-6 ${
                                  formData.type === type.id ? 'text-white' : type.color
                                }`} />
                              </div>
                              <h3 className="font-bold text-slate-900 mb-2">{type.label}</h3>
                              <p className="text-sm text-slate-600">{type.description}</p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Rating Section */}
                    <div>
                      <label className="block text-lg font-semibold text-slate-900 mb-4">
                        Overall Rating
                      </label>
                      <div className="flex items-center space-x-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="focus:outline-none transition-transform duration-200"
                          >
                            <Star
                              className={`h-10 w-10 transition-colors duration-200 ${
                                star <= formData.rating
                                  ? 'text-yellow-400 fill-current drop-shadow-sm'
                                  : 'text-slate-300 hover:text-slate-400'
                              }`}
                            />
                          </motion.button>
                        ))}
                      </div>
                      <p className="text-slate-600">
                        <span className="font-semibold text-slate-900">{formData.rating}</span> out of 5 stars
                        {formData.rating === 5 && <span className="text-green-600 ml-2">Amazing!</span>}
                        {formData.rating === 4 && <span className="text-blue-600 ml-2">Great!</span>}
                        {formData.rating === 3 && <span className="text-yellow-600 ml-2">Good</span>}
                        {formData.rating <= 2 && <span className="text-red-600 ml-2">Needs improvement</span>}
                      </p>
                    </div>

                    {/* Contact Information - only show if user is not logged in */}
                    {!user && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-3">
                            Your Name <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                            placeholder="Your name"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
                            Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                            placeholder="your.email@domain.com"
                          />
                        </div>
                      </div>
                    )}

                    {/* Subject */}
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
                        placeholder="Brief summary of your feedback"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-3">
                        Your Feedback *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="block w-full px-4 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300 resize-none"
                        placeholder="Share your thoughts, suggestions, or report any issues... We're listening! 👂"
                      />
                    </div>

                    <motion.button
                      onClick={handleSubmit}
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
                        <span className="text-lg">{loading ? 'Submitting...' : 'Submit Feedback'}</span>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-6"
              >
                {/* Why Feedback Matters */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Why Your Voice <span className="text-purple-600">Counts</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: '🚀', title: 'Drives Innovation', desc: 'Your ideas shape new features' },
                      { icon: '🔧', title: 'Fixes Issues', desc: 'Bug reports help us improve quality' },
                      { icon: '💡', title: 'Sparks Creativity', desc: 'Suggestions inspire better solutions' },
                      { icon: '❤️', title: 'Shows Appreciation', desc: 'Compliments motivate our team' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response Times */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Response <span className="text-green-600">Timeline</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { type: 'Bug Reports', time: '24 hours', priority: 'high', color: 'bg-red-500' },
                      { type: 'Feature Requests', time: '3-5 days', priority: 'medium', color: 'bg-blue-500' },
                      { type: 'General Feedback', time: '1 week', priority: 'normal', color: 'bg-green-500' },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="font-semibold text-slate-900">{item.type}</span>
                        </div>
                        <span className="text-sm font-medium text-blue-600">{item.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center space-x-2 text-blue-700">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">Average response time: &lt;24 hours</span>
                    </div>
                  </div>
                </div>

                {/* Alternative Contact */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Need <span className="text-red-600">Urgent</span> Help?
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="/contact"
                      className="block p-4 bg-white/80 rounded-xl hover:bg-white transition-colors duration-200 border border-red-200"
                    >
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-red-600" />
                        <div>
                          <div className="font-semibold text-slate-900">Contact Support</div>
                          <div className="text-sm text-slate-600">For critical issues</div>
                        </div>
                      </div>
                    </a>
                    
                    <a
                      href="mailto:deepakjadon1907@gmail.com"
                      className="block p-4 bg-white/80 rounded-xl hover:bg-white transition-colors duration-200 border border-red-200"
                    >
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-red-600" />
                        <div>
                          <div className="font-semibold text-slate-900">Direct Email</div>
                          <div className="text-sm text-slate-600">deepakjadon1907@gmail.com</div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Feedback;