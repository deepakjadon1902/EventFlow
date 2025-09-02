
import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, Book, CreditCard, Users, Settings, MessageCircle, Mail, Phone } from 'lucide-react';

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
      question: 'How do I create and manage my events?',
      answer: 'Creating events is seamless with our intuitive dashboard. Navigate to "Create Event", fill in your event details, set pricing, upload media, and publish. You can edit, duplicate, or manage attendees anytime from your event management panel.',
      category: 'booking',
    },
    {
      id: '2',
      question: 'What are your cancellation and refund policies?',
      answer: 'We offer flexible cancellation options. Free cancellation up to 48 hours before your event. Partial refunds (75%) available 24-48 hours prior. Event organizer cancellations receive full refunds within 3-5 business days via original payment method.',
      category: 'booking',
    },
    {
      id: '3',
      question: 'Which payment methods and currencies do you support?',
      answer: 'We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and bank transfers. Payments are processed in 40+ currencies with automatic conversion. All transactions use 256-bit SSL encryption and PCI DSS compliance.',
      category: 'payment',
    },
    {
      id: '4',
      question: 'How do I customize my profile and privacy settings?',
      answer: 'Access your comprehensive profile settings through the account menu. Customize your display name, bio, profile picture, notification preferences, privacy settings, and linked social accounts. Enable two-factor authentication for enhanced security.',
      category: 'account',
    },
    {
      id: '5',
      question: 'How does your pricing and fee structure work?',
      answer: 'We charge a competitive 2.9% + $0.30 per transaction for event organizers. Attendees pay no additional fees. Premium plans start at $29/month with reduced fees, advanced analytics, and priority support. Enterprise solutions available for large organizations.',
      category: 'payment',
    },
    {
      id: '6',
      question: 'Can I integrate with third-party apps and services?',
      answer: 'Yes! We offer robust integrations with Zoom, Google Calendar, Mailchimp, Slack, Zapier, and 100+ other tools. Use our REST API for custom integrations. Webhook support available for real-time data synchronization.',
      category: 'technical',
    },
    {
      id: '7',
      question: 'What support do you provide for virtual and hybrid events?',
      answer: 'Our platform fully supports virtual events with integrated streaming, breakout rooms, chat features, and networking tools. Hybrid events combine in-person and virtual attendees seamlessly with unified registration and engagement features.',
      category: 'booking',
    },
    {
      id: '8',
      question: 'How do you ensure data security and GDPR compliance?',
      answer: 'We maintain SOC 2 Type II certification, GDPR compliance, and ISO 27001 standards. Data is encrypted at rest and in transit. Regular security audits, secure data centers, and comprehensive privacy controls protect all user information.',
      category: 'technical',
    },
    {
      id: '9',
      question: 'What analytics and reporting features are available?',
      answer: 'Access detailed analytics including ticket sales, revenue tracking, attendee demographics, engagement metrics, and conversion rates. Export custom reports, set up automated insights, and track ROI with our comprehensive dashboard.',
      category: 'booking',
    },
    {
      id: '10',
      question: 'How do I handle international payments and tax compliance?',
      answer: 'We handle international tax compliance automatically, including VAT, GST, and sales tax calculations. Multi-currency support with real-time exchange rates. Automated tax reporting and invoice generation for global transactions.',
      category: 'payment',
    },
    {
      id: '11',
      question: 'What mobile app features are available?',
      answer: 'Our native iOS and Android apps offer full event management, real-time notifications, offline access, QR code scanning, networking features, and live polling. Download from App Store or Google Play for the complete mobile experience.',
      category: 'technical',
    },
    {
      id: '12',
      question: 'How do I scale my events for large audiences?',
      answer: 'Our infrastructure supports events from 10 to 100,000+ attendees. Auto-scaling servers, CDN delivery, load balancing, and dedicated account management ensure smooth experiences at any scale. Enterprise-grade reliability guaranteed.',
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
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-500/5 to-transparent rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-900/5 to-transparent rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-900 via-black to-red-900 text-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20">
                <HelpCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Get instant answers to common questions about our platform. Our comprehensive guide covers everything from getting started to advanced features.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Search and Filter Section */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 mb-12">
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search through our knowledge base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-16 pr-6 py-5 text-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              />
            </div>

            {/* Category Filters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative flex flex-col items-center p-4 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 transform scale-105'
                      : 'bg-gray-50 dark:bg-black text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <category.icon className={`h-6 w-6 mb-2 transition-all duration-300 ${
                    selectedCategory === category.id ? 'text-white' : 'text-gray-400 group-hover:text-red-500'
                  }`} />
                  <span className="text-center leading-tight">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              <span className="font-semibold text-gray-900 dark:text-white">{filteredFAQs.length}</span> of {faqs.length} questions
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
              >
                Clear search
              </button>
            )}
          </div>

          {/* FAQ Grid */}
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:border-red-200 dark:hover:border-red-800"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset transition-all duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pr-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openItems.includes(faq.id) 
                        ? 'bg-red-500 text-white rotate-180' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-red-50 dark:group-hover:bg-red-950 group-hover:text-red-500'
                    }`}>
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </button>

                  {openItems.includes(faq.id) && (
                    <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-black/50">
                      <div className="p-6 sm:p-8 pt-6">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 lg:py-24">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl flex items-center justify-center">
                <HelpCircle className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No matching questions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Try adjusting your search terms or browse different categories to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-2xl shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 transform hover:scale-105 transition-all duration-300"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Contact Support Section */}
          <div className="mt-20 lg:mt-32">
            <div className="bg-gradient-to-br from-blue-900 via-black to-blue-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-500 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                  Need More Help?
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                  Can't find what you're looking for? Our expert support team is available 24/7 to assist you with any questions or concerns.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <a
                    href="/contact"
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageCircle className="h-8 w-8 text-red-400 mx-auto mb-4 group-hover:text-red-300 transition-colors" />
                    <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                    <p className="text-gray-300 text-sm">Get instant help from our support team</p>
                  </a>
                  
                  <a
                    href="mailto:support@eventflow.com"
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <Mail className="h-8 w-8 text-red-400 mx-auto mb-4 group-hover:text-red-300 transition-colors" />
                    <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                    <p className="text-gray-300 text-sm">Send us a detailed message</p>
                  </a>
                  
                  <a
                    href="tel:+1-800-EVENTFLOW"
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <Phone className="h-8 w-8 text-red-400 mx-auto mb-4 group-hover:text-red-300 transition-colors" />
                    <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
                    <p className="text-gray-300 text-sm">Call us for immediate assistance</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;