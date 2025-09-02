
import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, Calendar, Crown, Mail, Phone, MessageCircle, Download, Settings, Globe, CheckCircle } from 'lucide-react';

const Privacy: React.FC = () => {
  const sections = [
    {
      id: 'information-collection',
      title: '1. Information Collection and Sources',
      icon: Database,
      content: `We collect information through multiple channels to provide you with the best possible service. This includes data you provide directly (account registration, event bookings, profile updates), information we collect automatically (device data, usage patterns, location data with your consent), and data from third-party sources (social media integrations, payment processors, analytics partners). We are transparent about every piece of information we collect and why we need it.`,
    },
    {
      id: 'how-we-use',
      title: '2. Data Processing and Usage',
      icon: UserCheck,
      content: `Your information powers our platform's core functionality including account management, event recommendations, booking processing, payment handling, customer support, security monitoring, and service improvements. We use advanced analytics to personalize your experience, detect fraud, ensure platform security, and develop new features. All processing is conducted with appropriate legal basis under applicable privacy laws including GDPR and CCPA.`,
    },
    {
      id: 'information-sharing',
      title: '3. Data Sharing and Third-Party Access',
      icon: Eye,
      content: `We follow a strict data minimization principle and never sell your personal information. Data sharing occurs only when necessary: with event organizers for bookings you make, with trusted service providers under strict data processing agreements, with payment processors for transaction handling, and with legal authorities when required by law. You maintain control over what information is shared and with whom.`,
    },
    {
      id: 'data-security',
      title: '4. Security Infrastructure and Protection',
      icon: Lock,
      content: `Your data security is our top priority. We implement enterprise-grade security measures including 256-bit SSL/TLS encryption for data transmission, AES-256 encryption for data at rest, multi-factor authentication systems, regular security audits and penetration testing, SOC 2 Type II compliance, and 24/7 security monitoring. Our servers are hosted in certified data centers with physical security controls and redundant backup systems.`,
    },
    {
      id: 'data-retention',
      title: '5. Data Retention and Lifecycle Management',
      icon: Calendar,
      content: `We retain your data only as long as necessary for legitimate business purposes, legal compliance, and service provision. Account data is retained for the duration of your account plus 90 days after deletion. Transaction records are kept for 7 years for tax and legal compliance. Analytics data is anonymized after 2 years. You can request data deletion at any time, subject to legal retention requirements. Automated deletion processes ensure expired data is securely removed.`,
    },
    {
      id: 'your-rights',
      title: '6. Your Privacy Rights and Controls',
      icon: Shield,
      content: `You have comprehensive rights over your personal data including the right to access, rectify, erase, restrict processing, data portability, and object to processing. EU residents have additional GDPR rights, while California residents benefit from CCPA protections. You can exercise these rights through your account settings or by contacting our privacy team. We respond to all requests within legally required timeframes and provide clear instructions for each process.`,
    },
    {
      id: 'international-transfers',
      title: '7. International Data Transfers',
      icon: Globe,
      content: `When we transfer your data internationally, we ensure appropriate safeguards are in place including Standard Contractual Clauses approved by the European Commission, adequacy decisions, and Privacy Shield frameworks where applicable. We maintain data processing agreements with all international partners and conduct regular compliance audits to ensure your data remains protected regardless of location.`,
    },
    {
      id: 'cookies-tracking',
      title: '8. Cookies and Tracking Technologies',
      icon: Settings,
      content: `We use cookies and similar technologies to enhance your experience, remember your preferences, analyze site usage, and provide personalized content. These include essential cookies (required for core functionality), analytics cookies (to understand usage patterns), functional cookies (to remember your settings), and marketing cookies (for relevant advertising with your consent). You can manage cookie preferences through your browser settings or our cookie consent center.`,
    },
  ];

  const dataTypes = [
    {
      category: 'Identity & Contact',
      items: ['Name, email, phone number', 'Profile photos and bio', 'Account credentials', 'Communication preferences'],
      icon: UserCheck,
    },
    {
      category: 'Event & Booking Data',
      items: ['Event booking history', 'Payment information', 'Event preferences', 'Ticket and attendance records'],
      icon: Calendar,
    },
    {
      category: 'Technical Information',
      items: ['Device and browser data', 'IP address and location', 'Usage analytics', 'Performance metrics'],
      icon: Database,
    },
    {
      category: 'Communication Data',
      items: ['Support conversations', 'Feedback and reviews', 'Marketing interactions', 'Newsletter subscriptions'],
      icon: MessageCircle,
    },
  ];

  const privacyControls = [
    {
      title: 'Access Your Data',
      description: 'Download a complete copy of your personal data in a portable format',
      icon: Download,
    },
    {
      title: 'Update Information',
      description: 'Modify your personal details, preferences, and account settings',
      icon: Settings,
    },
    {
      title: 'Control Sharing',
      description: 'Manage how your information is shared with event organizers and partners',
      icon: Eye,
    },
    {
      title: 'Delete Account',
      description: 'Permanently remove your account and all associated personal data',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-900/5 to-transparent rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-900/5 to-transparent rounded-full"></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
        <div className="absolute top-3/4 right-0 w-full h-px bg-gradient-to-l from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Your privacy is fundamental to everything we do. Learn how we collect, protect, and use your information to deliver exceptional event experiences while keeping your data secure.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Document Info Card */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">GDPR Compliant</p>
                  <p className="font-semibold text-gray-900 dark:text-white">Fully Certified</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center">
                  <Crown className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Version</p>
                  <p className="font-semibold text-gray-900 dark:text-white">3.0</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Global Coverage</p>
                  <p className="font-semibold text-gray-900 dark:text-white">Worldwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Commitment to Your Privacy
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                At <strong>EventFlow</strong>, we believe privacy is a fundamental human right. We're committed to transparency, 
                data minimization, and giving you complete control over your personal information. This Privacy Policy explains 
                how we collect, use, protect, and share your data when you use our event management platform.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg mt-4">
                We follow privacy-by-design principles, implement industry-leading security measures, and comply with 
                international privacy regulations including GDPR, CCPA, and other applicable laws. Your trust is essential 
                to our mission of connecting people through exceptional events.
              </p>
            </div>
          </div>

          {/* Data Types Section */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Information We Collect
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {dataTypes.map((type, index) => (
                <div
                  key={type.category}
                  className="group bg-gray-50 dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors">
                      <type.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {type.category}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {type.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-700 dark:text-gray-300 flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors">
                        <section.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {section.title}
                      </h3>
                      <div className="prose prose-gray dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy Controls */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Your Privacy Controls
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Take control of your personal data with our comprehensive privacy management tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {privacyControls.map((control, index) => (
                <div
                  key={control.title}
                  className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 hover:shadow-lg hover:scale-105 transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 transition-colors">
                    <control.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {control.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {control.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Privacy Team Section */}
          <div className="mt-20">
            <div className="bg-gradient-to-br from-blue-900 via-black to-blue-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Questions About Your Privacy?
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                  Our dedicated privacy team is here to help with any questions about your data, privacy rights, or this policy.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <a
                    href="/contact"
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageCircle className="h-8 w-8 text-blue-400 mx-auto mb-4 group-hover:text-blue-300 transition-colors" />
                    <h3 className="font-semibold text-lg mb-2">Privacy Chat</h3>
                    <p className="text-gray-300 text-sm">Instant help with privacy questions</p>
                  </a>
                  
                  <a
                    href="mailto:privacy@eventflow.com"
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <Mail className="h-8 w-8 text-blue-400 mx-auto mb-4 group-hover:text-blue-300 transition-colors" />
                    <h3 className="font-semibold text-lg mb-2">Privacy Team</h3>
                    <p className="text-gray-300 text-sm">Direct email to privacy experts</p>
                  </a>

                </div>
              </div>
            </div>
          </div>

          {/* Data Protection Notice */}
          <div className="mt-12 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-3xl border border-green-200 dark:border-green-800 p-6 sm:p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-green-900 dark:text-green-200 mb-4">
                  Enterprise-Grade Data Protection
                </h3>
                <div className="prose prose-green dark:prose-invert max-w-none">
                  <p className="text-green-800 dark:text-green-300 leading-relaxed text-base sm:text-lg">
                    Your data is protected by military-grade encryption, multi-layered security protocols, and continuous monitoring. 
                    We maintain SOC 2 Type II certification, conduct regular third-party security audits, and ensure compliance 
                    with international data protection standards including ISO 27001.
                  </p>
                  <p className="text-green-800 dark:text-green-300 leading-relaxed text-base sm:text-lg mt-4">
                    Our global infrastructure spans secure data centers with 99.9% uptime guarantees, automatic backups, 
                    disaster recovery protocols, and 24/7 security operations center monitoring to keep your information safe.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 EventFlow. All rights reserved. This privacy policy is effective as of January 15, 2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;