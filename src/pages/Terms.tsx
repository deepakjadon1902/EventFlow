
import React from 'react';
import { FileText, Calendar, Shield, Crown, Mail, Phone, MessageCircle, CheckCircle } from 'lucide-react';

const Terms: React.FC = () => {
  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      content: `By accessing and using EventFlow, you accept and agree to be bound by the terms and provision of this agreement. These terms constitute a legally binding agreement between you and EventFlow. If you do not agree to abide by these terms in their entirety, you must immediately cease using this service and any associated features or functionalities.`,
    },
    {
      id: 'description',
      title: '2. Service Description',
      content: `EventFlow is a comprehensive, enterprise-grade event management platform that enables users to discover, book, manage, and attend events seamlessly. Our platform serves as a marketplace connecting event organizers with attendees, providing robust tools for event creation, ticketing, payment processing, analytics, marketing, and post-event engagement across multiple channels and devices.`,
    },
    {
      id: 'registration',
      title: '3. User Registration and Account Security',
      content: `To access premium features of our service, you must register for an account using accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security. We recommend enabling two-factor authentication for enhanced security.`,
    },
    {
      id: 'booking',
      title: '4. Event Booking, Payments, and Transactions',
      content: `When you book an event through EventFlow, you enter into a direct contractual relationship with the event organizer. All payments are processed securely through our PCI DSS compliant platform using industry-standard encryption. We support multiple payment methods including credit cards, digital wallets, and bank transfers. Transaction fees, refund policies, and cancellation terms vary by event and are clearly disclosed at the time of booking.`,
    },
    {
      id: 'cancellation',
      title: '5. Cancellation, Refunds, and Modifications',
      content: `Cancellation and refund policies are established by individual event organizers and clearly communicated during the booking process. Generally, modifications and cancellations must be made through your account dashboard. For event organizer cancellations, full refunds are typically processed within 5-10 business days. We reserve the right to cancel events due to safety concerns, legal issues, or force majeure events.`,
    },
    {
      id: 'conduct',
      title: '6. User Conduct and Prohibited Activities',
      content: `Users must conduct themselves professionally and lawfully while using our platform. Prohibited activities include but are not limited to: unauthorized access attempts, data scraping, spam, harassment, fraud, copyright infringement, and any activities that could compromise platform security or user safety. Violation of these terms may result in immediate account suspension or termination.`,
    },
    {
      id: 'privacy',
      title: '7. Privacy Policy and Data Protection',
      content: `Your privacy and data security are paramount to us. Our comprehensive Privacy Policy, which is incorporated by reference into these Terms, details how we collect, process, store, and protect your personal information in compliance with GDPR, CCPA, and other applicable privacy laws. We employ enterprise-grade security measures and never sell your personal data to third parties.`,
    },
    {
      id: 'intellectual',
      title: '8. Intellectual Property Rights',
      content: `All content, features, functionality, trademarks, service marks, logos, and intellectual property associated with EventFlow are owned exclusively by EventFlow and its licensors. This includes but is not limited to software, databases, text, graphics, icons, and audio-visual elements. Users are granted a limited, non-exclusive, non-transferable license to use the platform for its intended purpose only.`,
    },
    {
      id: 'limitation',
      title: '9. Limitation of Liability and Disclaimers',
      content: `To the fullest extent permitted by law, EventFlow and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill. Our total liability for any claims arising from your use of the service shall not exceed the amount paid by you to EventFlow in the twelve months preceding the claim.`,
    },
    {
      id: 'indemnification',
      title: '10. User Indemnification',
      content: `You agree to defend, indemnify, and hold harmless EventFlow, its officers, directors, employees, agents, and affiliates from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from your use of the service, violation of these Terms, or infringement of any third-party rights. This indemnification obligation survives termination of these Terms.`,
    },
    {
      id: 'termination',
      title: '11. Account Termination and Suspension',
      content: `We reserve the right to terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason in our sole discretion. Upon termination, your right to use the service ceases immediately, and we may delete your account and data in accordance with our data retention policies.`,
    },
    {
      id: 'changes',
      title: '12. Modifications to Terms and Service',
      content: `We reserve the right to modify these Terms at any time to reflect changes in our service, legal requirements, or business needs. Material changes will be communicated via email or prominent notice on our platform at least 30 days prior to implementation. Continued use of the service after changes take effect constitutes acceptance of the modified Terms.`,
    },
    {
      id: 'governing',
      title: '13. Governing Law and Dispute Resolution',
      content: `These Terms are governed by and construed in accordance with the laws of the jurisdiction where EventFlow operates. Any disputes arising from these Terms or your use of the service will be resolved through binding arbitration in accordance with established arbitration rules, except where prohibited by local law. Class action lawsuits and jury trials are waived to the extent permitted by law.`,
    },
    {
      id: 'contact',
      title: '14. Contact Information and Legal Notices',
      content: `For questions regarding these Terms, legal notices, or compliance matters, please contact our legal team at legal@eventflow.com or through our official contact channels. All formal legal notices must be sent via certified mail to our registered business address. We aim to respond to all legal inquiries within 5-10 business days.`,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-900/5 to-transparent rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-900/5 to-transparent rounded-full"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
        <div className="absolute top-2/3 right-0 w-full h-px bg-gradient-to-l from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Terms & Conditions
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Please read these terms and conditions carefully before using EventFlow. By accessing our platform, you agree to be legally bound by these comprehensive terms of service.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Document Info Card */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                  <p className="font-semibold text-gray-900 dark:text-white">January 15, 2025</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                  <Crown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Version</p>
                  <p className="font-semibold text-gray-900 dark:text-white">2.1</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                  <p className="font-semibold text-gray-900 dark:text-white">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Introduction
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                Welcome to <strong>EventFlow</strong>, a cutting-edge event management platform designed for the modern digital landscape. 
                These Terms and Conditions ("Terms", "Agreement") constitute a legally binding contract between you ("User", "You") 
                and EventFlow, operated by our development team ("Company", "We", "Us", "Our").
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg mt-4">
                These Terms govern your access to and use of our platform, services, features, and related applications. 
                By creating an account, accessing our website, or using any of our services, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms and our Privacy Policy.
              </p>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800"
              >
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {section.title}
                  </h3>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Important Legal Notice */}
          <div className="mt-20 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-3xl border border-amber-200 dark:border-amber-800 p-6 sm:p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-900 dark:text-amber-200 mb-4">
                  Legal Compliance Notice
                </h3>
                <div className="prose prose-amber dark:prose-invert max-w-none">
                  <p className="text-amber-800 dark:text-amber-300 leading-relaxed text-base sm:text-lg">
                    These Terms and Conditions constitute a legally binding agreement. Your continued use of EventFlow 
                    signifies your acceptance of any updates or modifications to these terms. We recommend reviewing 
                    this document periodically to stay informed of any changes that may affect your rights and obligations.
                  </p>
                  <p className="text-amber-800 dark:text-amber-300 leading-relaxed text-base sm:text-lg mt-4">
                    If you do not agree with any provisions outlined in these Terms, you must immediately discontinue 
                    use of our platform and services. For clarification on any terms or legal questions, please contact 
                    our legal department through the channels provided below.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Legal Team Section */}
          <div className="mt-20">
            <div className="bg-gradient-to-br from-blue-900 via-black to-blue-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Questions About These Terms?
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                  Our legal and compliance team is here to help clarify any questions you may have about these terms and conditions.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <a
                    href="/contact"
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageCircle className="h-8 w-8 text-blue-400 mx-auto mb-4 group-hover:text-blue-300 transition-colors" />
                    <h3 className="font-semibold text-lg mb-2">Live Chat Support</h3>
                    <p className="text-gray-300 text-sm">Get immediate assistance from our team</p>
                  </a>
                  
                  <a
                    href="mailto:legal@eventflow.com"
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <Mail className="h-8 w-8 text-blue-400 mx-auto mb-4 group-hover:text-blue-300 transition-colors" />
                    <h3 className="font-semibold text-lg mb-2">Legal Department</h3>
                    <p className="text-gray-300 text-sm">Direct email to our legal team</p>
                  </a>
                  
                  <a
                    href="tel:+1-800-EVENTFLOW"
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <Phone className="h-8 w-8 text-blue-400 mx-auto mb-4 group-hover:text-blue-300 transition-colors" />
                    <h3 className="font-semibold text-lg mb-2">Phone Consultation</h3>
                    <p className="text-gray-300 text-sm">Speak directly with our legal advisors</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 EventFlow. All rights reserved. These terms are effective as of January 15, 2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;