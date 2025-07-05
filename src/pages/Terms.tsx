import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Shield, Crown } from 'lucide-react';
import BubbleAnimation from '../components/BubbleAnimation';
import GlassCard from '../components/GlassCard';

const Terms: React.FC = () => {
  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      content: `By accessing and using EventFlow, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
    },
    {
      id: 'description',
      title: '2. Service Description',
      content: `EventFlow is a premium event management platform that allows users to discover, book, and manage events. We provide a platform for event organizers to list their events and for users to find and book events that interest them.`,
    },
    {
      id: 'registration',
      title: '3. User Registration',
      content: `To use certain features of our service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.`,
    },
    {
      id: 'booking',
      title: '4. Event Booking and Payment',
      content: `When you book an event through EventFlow, you enter into a contract with the event organizer. Payment is processed securely through our platform. Refund policies vary by event and are determined by the event organizer.`,
    },
    {
      id: 'cancellation',
      title: '5. Cancellation Policy',
      content: `Users may cancel their bookings according to the specific cancellation policy of each event. Generally, cancellations must be made at least 24 hours before the event start time. Refunds, if applicable, will be processed according to the event's refund policy.`,
    },
    {
      id: 'conduct',
      title: '6. User Conduct',
      content: `You agree not to use the service for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks. You will not attempt to gain unauthorized access to any part of the service.`,
    },
    {
      id: 'privacy',
      title: '7. Privacy Policy',
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using EventFlow, you agree to the collection and use of information in accordance with our Privacy Policy.`,
    },
    {
      id: 'intellectual',
      title: '8. Intellectual Property',
      content: `The service and its original content, features, and functionality are and will remain the exclusive property of EventFlow and its licensors. The service is protected by copyright, trademark, and other laws.`,
    },
    {
      id: 'limitation',
      title: '9. Limitation of Liability',
      content: `In no event shall EventFlow, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.`,
    },
    {
      id: 'termination',
      title: '10. Termination',
      content: `We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.`,
    },
    {
      id: 'changes',
      title: '11. Changes to Terms',
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.`,
    },
    {
      id: 'contact',
      title: '12. Contact Information',
      content: `If you have any questions about these Terms and Conditions, please contact us at deepakjadon1907@gmail.com or through our contact page.`,
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
            <FileText className="h-12 w-12 text-royal-blue mr-4" />
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using EventFlow. 
            By using our service, you agree to be bound by these terms.
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
                <span className="text-sm font-medium">Version 1.0</span>
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
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Welcome to EventFlow, a premium event management platform. These Terms and Conditions 
              ("Terms", "Terms and Conditions") govern your relationship with EventFlow operated by 
              Deepak Jadon ("us", "we", or "our"). These Terms apply to all visitors, users, and 
              others who access or use the service.
            </p>
          </GlassCard>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <GlassCard>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <GlassCard className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-2">
                  Important Notice
                </h3>
                <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                  These terms and conditions are legally binding. By continuing to use EventFlow, 
                  you acknowledge that you have read, understood, and agree to be bound by these terms. 
                  If you do not agree with any part of these terms, you must discontinue use of our service.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <GlassCard className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If you have any questions about these Terms and Conditions, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-royal-blue to-royal-light text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Contact Us
              </motion.a>
              <motion.a
                href="mailto:deepakjadon1907@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-900 dark:text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200"
              >
                Email Legal Team
              </motion.a>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;