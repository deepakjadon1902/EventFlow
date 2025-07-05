import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Bell, User, LogOut, Sparkles, Crown, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  // Light, vibrant themes
  const themes = {
    default: {
      gradient: 'from-blue-400/30 via-purple-400/30 to-indigo-400/30',
      accent: 'text-blue-600',
      glow: 'shadow-blue-400/30',
      bg: 'bg-blue-50/80',
    },
    technology: {
      gradient: 'from-cyan-400/30 via-blue-400/30 to-sky-400/30',
      accent: 'text-cyan-600',
      glow: 'shadow-cyan-400/30',
      bg: 'bg-cyan-50/80',
    },
    business: {
      gradient: 'from-emerald-400/30 via-teal-400/30 to-green-400/30',
      accent: 'text-emerald-600',
      glow: 'shadow-emerald-400/30',
      bg: 'bg-emerald-50/80',
    },
    art: {
      gradient: 'from-pink-400/30 via-rose-400/30 to-red-400/30',
      accent: 'text-pink-600',
      glow: 'shadow-pink-400/30',
      bg: 'bg-pink-50/80',
    },
    music: {
      gradient: 'from-purple-400/30 via-violet-400/30 to-indigo-400/30',
      accent: 'text-purple-600',
      glow: 'shadow-purple-400/30',
      bg: 'bg-purple-50/80',
    },
    dining: {
      gradient: 'from-amber-400/30 via-orange-400/30 to-yellow-400/30',
      accent: 'text-amber-600',
      glow: 'shadow-amber-400/30',
      bg: 'bg-amber-50/80',
    },
    'food & drink': {
      gradient: 'from-orange-400/30 via-red-400/30 to-pink-400/30',
      accent: 'text-orange-600',
      glow: 'shadow-orange-400/30',
      bg: 'bg-orange-50/80',
    },
  };

  // Auto-change theme for dynamic effect
  useEffect(() => {
    const themeKeys = Object.keys(themes);
    const randomTheme = themeKeys[Math.floor(Math.random() * themeKeys.length)];
    setCurrentTheme(randomTheme);

    const interval = setInterval(() => {
      const newTheme = themeKeys[Math.floor(Math.random() * themeKeys.length)];
      setCurrentTheme(newTheme);
    }, 15000); // Faster theme changes

    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setShowUserMenu(false);
  };

  const currentThemeConfig = themes[currentTheme as keyof typeof themes] || themes.default;

  // Optimized EventFlow Logo Component
  const EventFlowLogo = React.memo(() => (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="relative">
        {/* Simplified glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentThemeConfig.gradient} blur-sm opacity-60`}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Main logo container */}
        <div className={`relative w-10 h-10 rounded-full ${currentThemeConfig.bg} backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-lg`}>
          <Sparkles className={`h-5 w-5 ${currentThemeConfig.accent}`} />
        </div>
      </div>
      
      {/* Brand text */}
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          EventFlow
        </span>
        <motion.div
          className={`h-0.5 bg-gradient-to-r ${currentThemeConfig.gradient}`}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  ));

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Optimized glass background */}
      <div className="absolute inset-0 backdrop-blur-xl">
        <div className={`absolute inset-0 bg-gradient-to-r ${currentThemeConfig.gradient} opacity-90`} />
        <div className={`absolute inset-0 ${currentThemeConfig.bg}`} />
        
        {/* Simplified shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <EventFlowLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? `${currentThemeConfig.accent} bg-white/20 backdrop-blur-sm ${currentThemeConfig.glow} shadow-lg`
                      : 'text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white hover:bg-white/10 backdrop-blur-sm'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${currentThemeConfig.gradient}`}
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {user && isAdmin && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/admin"
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    location.pathname === '/admin'
                      ? 'text-amber-600 bg-amber-100/50 backdrop-blur-sm shadow-amber-400/20 shadow-lg'
                      : 'text-amber-600 hover:text-amber-700 hover:bg-amber-50/50 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Crown className="h-4 w-4" />
                    <span>Admin Panel</span>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </motion.div>
            </motion.button>

            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <User className="h-5 w-5 text-gray-700 dark:text-white/90" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <Bell className="h-5 w-5 text-gray-700 dark:text-white/90" />
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-56 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/20 overflow-hidden"
                    >
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                          </div>
                        </Link>
                        <Link
                          to="/my-events"
                          className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <Zap className="h-4 w-4" />
                            <span>My Events</span>
                          </div>
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="block px-4 py-3 text-sm text-amber-600 hover:bg-amber-50/50 transition-all duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <div className="flex items-center space-x-3">
                              <Crown className="h-4 w-4" />
                              <span>Admin Panel</span>
                            </div>
                          </Link>
                        )}
                        <div className="border-t border-gray-200/50 dark:border-gray-600/50 my-2" />
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50/50 transition-all duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
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
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className={`px-6 py-2 bg-gradient-to-r ${currentThemeConfig.gradient} backdrop-blur-sm text-gray-800 rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-200 border border-white/30`}
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-gray-700 dark:text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700 dark:text-white" />
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
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl mt-4 border border-white/20">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 mx-2 ${
                      location.pathname === item.path
                        ? `${currentThemeConfig.accent} bg-white/20`
                        : 'text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {user && isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-4 py-3 rounded-xl text-base font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50/50 transition-all duration-200 mx-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4" />
                      <span>Admin Panel</span>
                    </div>
                  </Link>
                )}

                {!user && (
                  <div className="pt-4 space-y-2 border-t border-gray-200/50 dark:border-gray-600/50 mx-2">
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className={`block px-4 py-3 bg-gradient-to-r ${currentThemeConfig.gradient} text-gray-800 rounded-xl font-medium text-base text-center border border-white/30`}
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
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