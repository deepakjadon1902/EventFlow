import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, DollarSign, Star, Zap, Crown, Trophy } from 'lucide-react';
import GlassCard from './GlassCard';
import { useTheme } from '../contexts/ThemeContext';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  max_attendees: number;
  current_attendees: number;
  image_url: string;
  category: string;
}

interface EventCardProps {
  event: Event;
  onBookEvent?: (eventId: string) => void;
  showBookButton?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onBookEvent, showBookButton = true }) => {
  const { setEventTheme } = useTheme();
  const spotsLeft = event.max_attendees - event.current_attendees;
  const isAlmostFull = spotsLeft <= 5 && spotsLeft > 0;
  const isFull = spotsLeft <= 0;
  const attendancePercentage = (event.current_attendees / event.max_attendees) * 100;

  // Map category to theme
  const getThemeFromCategory = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      'Technology': 'technology',
      'Business': 'business',
      'Art': 'art',
      'Music': 'music',
      'Dining': 'dining',
      'Food & Drink': 'food & drink',
    };
    return categoryMap[category] || 'default';
  };

  const theme = getThemeFromCategory(event.category);

  const handleCardHover = () => {
    setEventTheme(theme);
  };

  // Enhanced category styling with navy blue theme
  const getCategoryStyle = (category: string) => {
    const styles: { [key: string]: { bg: string; text: string; icon: React.ReactNode } } = {
      'Technology': { 
        bg: 'bg-gradient-to-r from-blue-900 to-blue-700', 
        text: 'text-white', 
        icon: <Zap className="w-3 h-3" /> 
      },
      'Business': { 
        bg: 'bg-gradient-to-r from-gray-900 to-gray-700', 
        text: 'text-white', 
        icon: <Trophy className="w-3 h-3" /> 
      },
      'Art': { 
        bg: 'bg-gradient-to-r from-blue-800 to-blue-600', 
        text: 'text-white', 
        icon: <Star className="w-3 h-3" /> 
      },
      'Music': { 
        bg: 'bg-gradient-to-r from-blue-900 to-blue-800', 
        text: 'text-white', 
        icon: <Star className="w-3 h-3" /> 
      },
      'Dining': { 
        bg: 'bg-gradient-to-r from-gray-800 to-blue-900', 
        text: 'text-white', 
        icon: <Crown className="w-3 h-3" /> 
      },
      'Food & Drink': { 
        bg: 'bg-gradient-to-r from-blue-700 to-blue-900', 
        text: 'text-white', 
        icon: <Crown className="w-3 h-3" /> 
      },
    };
    return styles[category] || { 
      bg: 'bg-gradient-to-r from-blue-900 to-blue-700', 
      text: 'text-white', 
      icon: <Star className="w-3 h-3" /> 
    };
  };

  const categoryStyle = getCategoryStyle(event.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group h-full"
      onHoverStart={handleCardHover}
      whileHover={{ y: -8 }}
    >
      <div className="relative h-full">
        {/* Subtle glow effect on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-blue-900/50 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
        
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 h-full group-hover:shadow-2xl transition-all duration-500">
          {/* Image Section */}
          <div className="relative overflow-hidden">
            <div className="relative h-56 sm:h-48 md:h-52 lg:h-48 xl:h-52">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
              
              {/* Premium gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
              
              {/* Floating premium indicators */}
              <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
                {/* Category Badge */}
                <motion.div 
                  className={`flex items-center space-x-2 px-3 py-2 ${categoryStyle.bg} rounded-full backdrop-blur-md shadow-lg border border-white/10`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {categoryStyle.icon}
                  <span className={`text-xs font-bold ${categoryStyle.text} tracking-wide uppercase`}>
                    {event.category}
                  </span>
                </motion.div>

                {/* Availability Badge */}
                {(isAlmostFull || isFull) && (
                  <motion.div 
                    className={`px-3 py-2 rounded-full backdrop-blur-md shadow-lg border border-white/10 ${
                      isFull 
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' 
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    }`}
                    animate={!isFull ? { 
                      scale: [1, 1.05, 1],
                      boxShadow: ['0 4px 15px rgba(251, 146, 60, 0.3)', '0 6px 20px rgba(251, 146, 60, 0.5)', '0 4px 15px rgba(251, 146, 60, 0.3)']
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-xs font-bold tracking-wide uppercase">
                      {isFull ? 'Exclusive - Full' : `${spotsLeft} spots left`}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Premium shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                style={{ width: '50%' }}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col flex-1">
            {/* Title & Description */}
            <div className="mb-6">
              <motion.h3 
                className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                {event.title}
              </motion.h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                {event.description}
              </p>
            </div>

            {/* Event Details Grid */}
            <div className="space-y-4 mb-6 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div 
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Calendar className="h-4 w-4 text-blue-900 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Date</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-900 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Time</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{event.time}</p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <MapPin className="h-4 w-4 text-blue-900 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Venue</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{event.location}</p>
                </div>
              </motion.div>

              {/* Attendance Progress */}
              <motion.div 
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Users className="h-3 w-3 text-blue-900 dark:text-blue-400" />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                      Attendance
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {event.current_attendees}/{event.max_attendees}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      attendancePercentage >= 90 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                      attendancePercentage >= 70 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                      'bg-gradient-to-r from-blue-500 to-blue-600'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${attendancePercentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Price & Book Button */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <motion.div
                  className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-2xl font-black text-green-600 dark:text-green-400">
                    {event.price === 0 ? 'Free' : `₹${event.price.toLocaleString()}`}
                  </span>
                </motion.div>
              </div>

              {showBookButton && onBookEvent && (
                <motion.button
                  onClick={() => onBookEvent(event.id)}
                  disabled={isFull}
                  className={`relative overflow-hidden px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg ${
                    isFull
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 active:scale-95'
                  }`}
                  whileTap={{ scale: isFull ? 1 : 0.95 }}
                  whileHover={!isFull ? { y: -2 } : {}}
                >
                  <span className="relative z-10">
                    {isFull ? 'Exclusive - Full' : 'Reserve Now'}
                  </span>
                  {!isFull && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;