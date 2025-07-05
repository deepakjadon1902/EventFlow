import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Send, CheckCircle, Bug, Lightbulb, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import BubbleAnimation from '../components/BubbleAnimation';
import GlassCard from '../components/GlassCard';

const Feedback: React.FC = () => {
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
  const { user } = useAuth();

  const feedbackTypes = [
    { id: 'general', label: 'General Feedback', icon: MessageSquare, color: 'text-blue-600' },
    { id: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-600' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-yellow-600' },
    { id: 'compliment', label: 'Compliment', icon: Heart, color: 'text-pink-600' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Insert feedback into database
      const { error: insertError } = await supabase
        .from('feedback')
        .insert([{
          user_id: user?.id || null,
          type: formData.type,
          rating: formData.rating,
          subject: formData.subject,
          message: formData.message,
          email: formData.email || user?.email || null,
          name: formData.name || null,
        }]);

      if (insertError) {
        throw insertError;
      }

      // Create notification for admin
      const { data: adminProfiles } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin');

      if (adminProfiles && adminProfiles.length > 0) {
        const notifications = adminProfiles.map(admin => ({
          user_id: admin.id,
          title: 'New Feedback Received',
          message: `New ${formData.type} feedback: ${formData.subject}`,
          type: 'system',
        }));

        await supabase
          .from('notifications')
          .insert(notifications);
      }

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
    } catch (error: any) {
      console.error('Error sending feedback:', error);
      setError(error.message || 'Failed to send feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-royal-navy dark:via-gray-900 dark:to-black pt-20 pb-12">
      <BubbleAnimation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <MessageSquare className="h-12 w-12 text-royal-blue mr-4" />
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Share Your Feedback
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your feedback helps us improve EventFlow and create better experiences for everyone. 
            We value every suggestion, bug report, and compliment you share with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Tell Us What You Think
                </h2>

                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Thank you! Your feedback has been submitted successfully and sent to our admin team.</span>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Feedback Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Feedback Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {feedbackTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: type.id })}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                            formData.type === type.id
                              ? 'border-royal-blue bg-royal-blue/10 text-royal-blue'
                              : 'border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:border-royal-blue/50'
                          }`}
                        >
                          <type.icon className={`h-4 w-4 ${formData.type === type.id ? 'text-royal-blue' : type.color}`} />
                          <span className="text-sm font-medium">{type.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Overall Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 transition-colors ${
                              star <= formData.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        </motion.button>
                      ))}
                      <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                        {formData.rating} out of 5 stars
                      </span>
                    </div>
                  </div>

                  {/* Contact Information - only show if user is not logged in */}
                  {!user && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Name (Optional)
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-200"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-200"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  )}

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-200"
                      placeholder="Brief summary of your feedback"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Share your thoughts, suggestions, or report any issues..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-royal-blue to-royal-light text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                    <span>{loading ? 'Sending...' : 'Send Feedback'}</span>
                  </motion.button>
                </form>
              </GlassCard>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Why Feedback Matters */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Your Feedback Matters
                </h3>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-royal-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span>Helps us identify and fix issues quickly</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-royal-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span>Guides our product development roadmap</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-royal-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span>Improves user experience for everyone</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-royal-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span>Shows us what features you value most</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Response Times
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/30 dark:bg-black/20 rounded-lg">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Bug Reports</span>
                    <span className="text-sm text-royal-blue font-semibold">24 hours</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/30 dark:bg-black/20 rounded-lg">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Feature Requests</span>
                    <span className="text-sm text-royal-blue font-semibold">3-5 days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/30 dark:bg-black/20 rounded-lg">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">General Feedback</span>
                    <span className="text-sm text-royal-blue font-semibold">1 week</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Alternative Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GlassCard className="bg-gradient-to-r from-royal-blue/10 to-purple-600/10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Other Ways to Reach Us
                </h3>
                <div className="space-y-3">
                  <a
                    href="/contact"
                    className="block p-3 bg-white/30 dark:bg-black/20 rounded-lg hover:bg-white/40 dark:hover:bg-black/30 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Contact Support</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">For urgent issues</div>
                  </a>
                  <a
                    href="mailto:deepakjadon1907@gmail.com"
                    className="block p-3 bg-white/30 dark:bg-black/20 rounded-lg hover:bg-white/40 dark:hover:bg-black/30 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Email Directly</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">deepakjadon1907@gmail.com</div>
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;