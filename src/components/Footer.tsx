import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Explore',
      links: [
        { name: 'Events', path: '/events' },
        { name: 'Upcoming Events', path: '/events?filter=upcoming' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Categories', path: '/events?filter=categories' },
      ],
    },
    {
      title: 'Your Account',
      links: [
        { name: 'Login / Register', path: '/login' },
        { name: 'My Bookings', path: '/my-events' },
        { name: 'Profile Settings', path: '/profile' },
        { name: 'Notifications', path: '/profile' },
      ],
    },
    {
      title: 'Support & Info',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact Support', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Feedback', path: '/feedback' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
      ],
    },
  ];

  return (
    <footer className="bg-royal-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Crown className="h-8 w-8 text-royal-light" />
              </motion.div>
              <span className="text-xl font-premium font-bold">EventFlow</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Premium event management platform designed for seamless experiences and royal aesthetics.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>deepakjadon1907@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 9149370081</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>GLA University, Mathura, India</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-royal-light">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-royal-light transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 EventFlow. All rights reserved. Crafted with passion by Deepak Jadon.
            </div>
            <div className="flex space-x-6 text-sm text-gray-300">
              <Link to="/terms" className="hover:text-royal-light transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="hover:text-royal-light transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;