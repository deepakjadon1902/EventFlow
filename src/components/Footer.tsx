
import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Mail, Phone, MapPin, ArrowRight, Sparkles, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Discover',
      icon: <Globe className="w-4 h-4" />,
      links: [
        { name: 'Discover Events', path: '/events' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Event Categories', path: '/events?filter=categories' },
      ],
    },
    {
      title: 'Your Experience',
      icon: <Crown className="w-4 h-4" />,
      links: [
        { name: 'Profile', path: '/profile' },
        { name: 'Access Portal', path: '/login' },
        { name: 'My Reservations', path: '/my-events' },
        { name: 'Account Settings', path: '/profile' },
      ],
    },
    {
      title: 'Support Excellence',
      icon: <Sparkles className="w-4 h-4" />,
      links: [
        { name: 'Our Story', path: '/about' },
        { name: 'Premium Support', path: '/contact' },
        { name: 'Share Feedback', path: '/feedback' },
        { name: 'Knowledge Base', path: '/faq' },
        
      ],
    },
    {
      title: 'Trust & Security',
      icon: <Shield className="w-4 h-4" />,
      links: [
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Commitment', path: '/privacy' },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Premium Support',
      value: 'deepakjadon1907@gmail.com',
      href: 'mailto:deepakjadon1907@gmail.com'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Direct Line',
      value: '+91 9149370081',
      href: 'tel:+919149370081'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: 'Headquarters',
      value: 'GLA University, Mathura, India',
      href: '#'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <Link to="/" className="inline-flex items-center space-x-3 mb-8 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    <Crown className="h-8 w-8 text-white" />
                  </motion.div>
                  <div>
                    <span className="text-3xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      EventFlow
                    </span>
                    <div className="text-xs text-blue-300 font-medium uppercase tracking-widest">
                      Premium Experiences
                    </div>
                  </div>
                </Link>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    Crafting extraordinary experiences through premium event management. 
                    <span className="text-blue-300 font-medium"> Where luxury meets innovation.</span>
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm text-blue-300">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-medium">Trusted by thousands of event enthusiasts</span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></div>
                    <span>Connect With Excellence</span>
                  </h4>
                  
                  <div className="space-y-3">
                    {contactInfo.map((item, index) => (
                      <motion.a
                        key={index}
                        href={item.href}
                        whileHover={{ x: 4 }}
                        className="flex items-center space-x-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                      >
                        <div className="p-2 bg-blue-900/50 rounded-lg group-hover:bg-blue-800/50 transition-colors duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs text-blue-300 font-medium uppercase tracking-wide">
                            {item.label}
                          </div>
                          <div className="text-white font-medium group-hover:text-blue-200 transition-colors duration-300">
                            {item.value}
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    {/* Section Header */}
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-blue-900/30 rounded-lg">
                        {section.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {section.title}
                      </h3>
                    </div>

                    {/* Links */}
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                          viewport={{ once: true }}
                        >
                          <Link
                            to={link.path}
                            className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 text-sm"
                          >
                            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 mr-0 group-hover:mr-2" />
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                              {link.name}
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Premium Divider */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-6 bg-gradient-to-r from-transparent via-black to-transparent">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <div className="text-gray-300 text-sm mb-2">
                © 2024 <span className="font-bold text-white">EventFlow</span>. All rights reserved.
              </div>
              <div className="text-xs text-blue-300">
                Crafted with <span className="text-red-400">♥</span> by{' '}
                <span className="font-semibold text-white">Deepak Jadon</span> • 
                Delivering premium experiences since 2024
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/terms" 
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium group"
              >
                <span className="border-b border-transparent group-hover:border-blue-300 transition-colors duration-300">
                  Terms of Service
                </span>
              </Link>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <Link 
                to="/privacy" 
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium group"
              >
                <span className="border-b border-transparent group-hover:border-blue-300 transition-colors duration-300">
                  Privacy Policy
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;