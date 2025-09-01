import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Book, CreditCard, Users, Settings } from 'lucide-react';
import BubbleAnimation from '../components/BubbleAnimation';
import GlassCard from '../components/GlassCard';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'booking', name: 'Booking & Events', icon: Book },
    { id: 'payment', name: 'Payment & Billing', icon: CreditCard },
    { id: 'account', name: 'Account & Profile', icon: Users },
    { id: 'technical', name: 'Technical Support', icon: Settings },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I book an event on EventFlow?',
      answer: 'Booking an event is simple! Browse our events page, find an event you like, click "Book Now", and follow the checkout process. You\'ll need to create an account if you haven\'t already.',
      category: 'booking',
    },
    {
      id: '2',
      question: 'Can I cancel my event booking?',
      answer: 'Yes, you can cancel your booking from your dashboard. Cancellations are allowed up to 24 hours before the event start time. Refund policies may vary by event.',
      category: 'booking',
    },
    {
      id: '3',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through our encrypted payment system.',
      category: 'payment',
    },
    {
      id: '4',
      question: 'How do I update my profile information?',
      answer: 'Go to your Profile page from the user menu in the top right corner. You can update your name, phone number, address, and notification preferences. Your email address cannot be changed for security reasons.',
      category: 'account',
    },
    {
      id: '5',
      question: 'Do you offer refunds for cancelled events?',
      answer: 'If an event is cancelled by the organizer, you will receive a full refund within 5-7 business days. For self-cancelled bookings, refund policies vary by event and timing.',
      category: 'payment',
    },
    {
      id: '6',
      question: 'How do I receive event notifications?',
      answer: 'Event notifications are sent via email and appear in your dashboard. You can customize your notification preferences in your Profile settings under the Notifications tab.',
      category: 'account',
    },
    {
      id: '7',
      question: 'What if I forget my password?',
      answer: 'Click "Forgot Password" on the login page and enter your email address. You\'ll receive a password reset link within a few minutes. Check your spam folder if you don\'t see it.',
      category: 'technical',
    },
    {
      id: '8',
      question: 'Can I transfer my booking to someone else?',
      answer: 'Booking transfers depend on the specific event policy. Contact our support team with your booking details, and we\'ll help you check if transfers are allowed for your event.',
      category: 'booking',
    },
    {
      id: '9',
      question: 'How do I download my event ticket or confirmation?',
      answer: 'Visit your "My Events" page and click the "Download" button next to your booking. You can download a text file with all your event details and booking information.',
      category: 'booking',
    },
    {
      id: '10',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard SSL encryption and never store your complete payment information. All transactions are processed through secure, PCI-compliant payment processors.',
      category: 'payment',
    },
    {
      id: '11',
      question: 'How do I enable two-factor authentication?',
      answer: 'Go to your Profile page, click on the Security tab, and select "Enable 2FA". Follow the setup instructions to add an extra layer of security to your account.',
      category: 'technical',
    },
    {
      id: '12',
      question: 'Can I create events on EventFlow?',
      answer: 'Currently, event creation is limited to our admin team to maintain quality standards. If you\'re interested in hosting an event, please contact us through our Contact page.',
      category: 'booking',
    },
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <HelpCircle className="h-12 w-12 text-royal-blue mr-4" />
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about EventFlow. Can't find what you're looking for? 
            Feel free to contact our support team.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard>
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-white/30 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-royal-blue text-white shadow-lg'
                        : 'bg-white/50 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-black/30'
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredFAQs.length} of {faqs.length} questions
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GlassCard className="overflow-hidden">
                  <motion.button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {openItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Questions Found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try adjusting your search terms or browse different categories.
                </p>
                <motion.button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-royal-blue to-royal-light text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Clear Filters
                </motion.button>
              </GlassCard>
            </motion.div>
          )}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <GlassCard className="text-center bg-gradient-to-r from-royal-blue/10 to-purple-600/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-royal-blue to-royal-light text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Contact Support
              </motion.a>
              <motion.a
                href="mailto:hello@eventflow.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-900 dark:text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200"
              >
                Email Us
              </motion.a>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;