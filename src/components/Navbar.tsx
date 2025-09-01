
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, User, LogOut, Sparkles, Crown, Zap, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { isDark } = useTheme();

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Discover Events', path: '/events', icon: '🎯' },
    { name: 'My Dashboard', path: '/dashboard', icon: '⚡' },
  ];

  // Fixed theme configuration
  const themeConfig = {
    gradient: 'from-red-600/20 via-blue-900/20 to-black/20',
    accent: 'text-red-600',
    glow: 'shadow-red-500/20',
    bg: 'bg-white/95',
    border: 'border-red-200/30',
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setShowUserMenu(false);
  };

  const currentThemeConfig = themeConfig;

  const EventFlowLogo = React.memo(() => (
    <motion.div
      className="flex items-center space-x-3"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600 via-blue-900 to-black blur-sm opacity-30"
          animate={{ 
            scale: [1, 1.05, 1], 
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 2, 0] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-white via-red-50 to-blue-50 backdrop-blur-xl border-2 border-white/60 flex items-center justify-center shadow-xl">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-6 w-6 text-red-600" />
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col">
        <motion.span 
          className="text-2xl font-black bg-gradient-to-r from-black via-red-600 to-blue-900 bg-clip-text text-transparent tracking-tight"
          whileHover={{ scale: 1.02 }}
        >
          EventFlow
        </motion.span>
        <span className="text-xs font-medium text-gray-500 tracking-widest uppercase">
          Premium Events
        </span>
      </div>
    </motion.div>
  ));

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
      initial={{ y: -100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${scrolled ? 'backdrop-blur-2xl' : 'backdrop-blur-xl'} transition-all duration-500`} />
        <div className={`absolute inset-0 ${currentThemeConfig.bg} ${scrolled ? 'opacity-98' : 'opacity-90'} transition-all duration-500`} />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" 
          animate={{ x: ['-100%', '100%'] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-r ${currentThemeConfig.gradient} opacity-40`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-14' : 'h-18'
        }`}>
          <Link to="/" className="flex-shrink-0 z-10">
            <EventFlowLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.div 
                key={item.name} 
                whileHover={{ scale: 1.02, y: -2 }} 
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`relative group px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    location.pathname === item.path
                      ? `${currentThemeConfig.accent} bg-white/80 backdrop-blur-sm shadow-lg ${currentThemeConfig.glow} border ${currentThemeConfig.border}`
                      : 'text-gray-700 hover:text-black hover:bg-white/50 backdrop-blur-sm border border-transparent hover:border-white/40'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="tracking-tight">{item.name}</span>
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute -bottom-1 left-2 right-2 h-1 bg-gradient-to-r from-red-600 to-blue-900 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/5 to-blue-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.div>
            ))}
            {user && isAdmin && (
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }} 
                whileTap={{ scale: 0.98 }}
                className="ml-4"
              >
                <Link
                  to="/admin"
                  className={`relative group px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    location.pathname === '/admin'
                      ? 'text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-500/25'
                      : 'text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 border-2 border-red-200 hover:border-red-600'
                  }`}
                >
                  <Crown className="h-4 w-4" />
                  <span className="font-bold tracking-tight">Admin Suite</span>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </Link>
              </motion.div>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-2xl bg-white/80 hover:bg-white/90 backdrop-blur-sm transition-all duration-300 border border-white/40 hover:border-white/60 shadow-lg"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02, y: -1 }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-blue-900 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="hidden sm:flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-gray-600" />
                    <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-4 w-64 backdrop-blur-2xl bg-white/95 rounded-3xl shadow-2xl border border-white/40 overflow-hidden"
                    >
                      <div className="p-4 bg-gradient-to-r from-red-50 to-blue-50 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">Welcome back!</p>
                        <p className="text-xs text-gray-600">Manage your account & events</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold">My Profile</p>
                            <p className="text-xs text-gray-500">Account settings</p>
                          </div>
                        </Link>
                        <Link
                          to="/my-events"
                          className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
                            <Zap className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <p className="font-semibold">My Events</p>
                            <p className="text-xs text-gray-500">Manage bookings</p>
                          </div>
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-50 transition-all duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
                              <Crown className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <p className="font-semibold">Admin Suite</p>
                              <p className="text-xs text-gray-500">System control</p>
                            </div>
                          </Link>
                        )}
                        <div className="border-t border-gray-100 my-2" />
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
                            <LogOut className="h-4 w-4 text-red-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold">Sign Out</p>
                            <p className="text-xs text-gray-500">See you soon!</p>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-black transition-colors rounded-2xl hover:bg-white/40 backdrop-blur-sm"
                >
                  Sign In
                </Link>
                <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/register" 
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl font-semibold text-sm shadow-lg shadow-red-500/25 transition-all duration-300 border border-red-500/20"
                  >
                    Join Now
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 rounded-2xl bg-white/80 hover:bg-white/90 backdrop-blur-sm transition-all duration-300 border border-white/40 shadow-lg"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="h-5 w-5 text-gray-700" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-700" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 backdrop-blur-2xl bg-white/95 rounded-3xl shadow-2xl border border-white/40 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 p-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
                        location.pathname === item.path
                          ? `${currentThemeConfig.accent} bg-white shadow-lg ${currentThemeConfig.glow}`
                          : 'text-gray-700 hover:text-black hover:bg-white/80'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {user && isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-3 p-4 rounded-2xl text-base font-semibold text-red-600 hover:bg-red-50 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <Crown className="h-5 w-5" />
                    <span>Admin Suite</span>
                  </Link>
                )}
                
                {!user && (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Link
                      to="/login"
                      className="block w-full p-4 text-center text-base font-semibold text-gray-700 hover:text-black bg-white/80 rounded-2xl transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full p-4 text-center text-base font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;