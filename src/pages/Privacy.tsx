import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, UserCheck, Calendar, Crown } from 'lucide-react';
import BubbleAnimation from '../components/BubbleAnimation';
import GlassCard from '../components/GlassCard';

const Privacy: React.FC = () => {
  const sections = [
    {
      id: 'information-collection',
      title: '1. Information We Collect',
      icon: Database,
      content: `We collect information you provide directly to us, such as when you create an account, book an event, or contact us. This includes your name, email address, phone number, address, date of birth, and payment information. We also automatically collect certain information about your device and usage of our service.`,
    },
    {
      id: 'how-we-use',
      title: '2. How We Use Your Information',
      icon: UserCheck,
      content: `We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, communicate with you about events and promotions, and protect against fraud and abuse.`,
    },
    {
      id: 'information-sharing',
      title: '3. Information Sharing and Disclosure',
      icon: Eye,
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with event organizers when you book their events, with service providers who assist us in operating our platform, and when required by law.`,
    },
    {
      id: 'data-security',
      title: '4. Data Security',
      icon: Lock,
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use SSL encryption for data transmission and store your information on secure servers with restricted access.`,
    },
    {
      id: 'data-retention',
      title: '5. Data Retention',
      icon: Calendar,
      content: `We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your account and associated data at any time through your profile settings.`,
    },
    {
      id: 'your-rights',
      title: '6. Your Privacy Rights',
      icon: Shield,
      content: `You have the right to access, update, or delete your personal information. You can also opt out of certain communications and request a copy of your data. If you're in the EU, you have additional rights under GDPR including data portability and the right to object to processing.`,
    },
  ];

  const dataTypes = [
    {
      category: 'Account Information',
      items: ['Name and contact details', 'Account credentials', 'Profile preferences'],
      icon: UserCheck,
    },
    {
      category: 'Event Data',
      items: ['Booking history', 'Event preferences', 'Payment information'],
      icon: Calendar,
    },
    {
      category: 'Usage Information',
      items: ['Device information', 'Log data', 'Analytics data'],
      icon: Eye,
    },
    {
      category: 'Communications',
      items: ['Support messages', 'Feedback submissions', 'Marketing preferences'],
      icon: Database,
    },
  ];

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
            <Shield className="h-12 w-12 text-royal-blue mr-4" />
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your privacy is fundamental to us. This policy explains how we collect, use, and protect 
            your personal information when you use EventFlow.
          </p>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="bg-gradient-to-r from-royal-blue/10 to-purple-600/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-royal-blue" />
                <span className="text-gray-900 dark:text-white font-medium">
                  Last Updated: January 1, 2024
                </span>
              </div>
              <div className="flex items-center space-x-2 text-royal-blue">
                <Crown className="h-4 w-4" />
                <span className="text-sm font-medium">GDPR Compliant</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Commitment to Your Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              At EventFlow, we believe privacy is a fundamental right. We're committed to being transparent 
              about how we collect, use, and share your information, and we give you control over your data.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              This Privacy Policy applies to all information collected through our website, mobile applications, 
              and any related services (collectively, the "Service").
            </p>
          </GlassCard>
        </motion.div>

        {/* Data Types We Collect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <GlassCard>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Types of Information We Collect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataTypes.map((type, index) => (
                <motion.div
                  key={type.category}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 bg-white/30 dark:bg-black/20 rounded-lg"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <type.icon className="h-5 w-5 text-royal-blue" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {type.category}
                    </h3>
                  </div>
                  <ul className="space-y-1">
                    {type.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-royal-blue rounded-full flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <GlassCard>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex p-3 rounded-full bg-royal-blue/10">
                      <section.icon className="h-6 w-6 text-royal-blue" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Your Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <GlassCard className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              You're in Control
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-green-100 dark:bg-green-900/30 mb-3">
                  <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Access Your Data</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  View and download all the data we have about you
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-3">
                  <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Control Sharing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Manage how your information is shared and used
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-red-100 dark:bg-red-900/30 mb-3">
                  <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Delete Account</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Remove your account and all associated data
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <GlassCard className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Questions About Your Privacy?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If you have any questions about this Privacy Policy or how we handle your data, 
              we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-royal-blue to-royal-light text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Contact Privacy Team
              </motion.a>
              <motion.a
                href="mailto:deepakjadon1907@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-900 dark:text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200"
              >
                Email: deepakjadon1907@gmail.com
              </motion.a>
            </div>
          </GlassCard>
        </motion.div>

        {/* Data Protection Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <GlassCard className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-2">
                  Your Data is Protected
                </h3>
                <p className="text-amber-800 dark:text-amber-300 leading-relaxed text-sm">
                  We use industry-standard security measures including SSL encryption, secure data centers, 
                  regular security audits, and strict access controls to protect your personal information. 
                  Our team is trained in data protection best practices and we comply with applicable privacy laws.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;