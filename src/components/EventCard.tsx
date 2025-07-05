import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';
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

  const getCategoryGradient = (category: string) => {
    const gradients: { [key: string]: string } = {
      'Technology': 'from-cyan-500 to-blue-600',
      'Business': 'from-emerald-500 to-teal-600',
      'Art': 'from-pink-500 to-rose-600',
      'Music': 'from-purple-500 to-violet-600',
      'Dining': 'from-amber-500 to-orange-600',
      'Food & Drink': 'from-orange-500 to-red-600',
    };
    return gradients[category] || 'from-blue-500 to-purple-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
      onHoverStart={handleCardHover}
    >
      <GlassCard className="overflow-hidden h-full" theme={theme}>
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800';
              }}
            />
            
            {/* Overlay gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t ${getCategoryGradient(event.category)} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
            
            {/* Floating particles effect */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${30 + i * 8}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          <div className="absolute top-4 left-4">
            <motion.span 
              className={`px-3 py-1 bg-gradient-to-r ${getCategoryGradient(event.category)} text-white text-xs font-medium rounded-full backdrop-blur-sm shadow-lg`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {event.category}
            </motion.span>
          </div>
          
          {(isAlmostFull || isFull) && (
            <div className="absolute top-4 right-4">
              <motion.span 
                className={`px-3 py-1 text-white text-xs font-medium rounded-full backdrop-blur-sm shadow-lg ${
                  isFull ? 'bg-red-500/80' : 'bg-orange-500/80'
                }`}
                animate={!isFull ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isFull ? 'Sold Out' : `${spotsLeft} spots left`}
              </motion.span>
            </div>
          )}
        </div>

        <div className="space-y-4 mt-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {event.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
              {event.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <motion.div 
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.02 }}
            >
              <Calendar className="h-4 w-4" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.02 }}
            >
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.02 }}
            >
              <MapPin className="h-4 w-4" />
              <span className="truncate">{event.location}</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.02 }}
            >
              <Users className="h-4 w-4" />
              <span>{event.current_attendees}/{event.max_attendees}</span>
            </motion.div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <motion.span 
                className="text-2xl font-bold text-green-600"
                whileHover={{ scale: 1.05 }}
              >
                {event.price === 0 ? 'Free' : `₹${event.price}`}
              </motion.span>
            </div>

            {showBookButton && onBookEvent && (
              <motion.button
                onClick={() => onBookEvent(event.id)}
                disabled={isFull}
                className={`px-6 py-2 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg ${
                  isFull
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : `bg-gradient-to-r ${getCategoryGradient(event.category)} text-white hover:shadow-xl transform hover:scale-105`
                }`}
                whileTap={{ scale: isFull ? 1 : 0.95 }}
                whileHover={!isFull ? { y: -2 } : {}}
              >
                {isFull ? 'Sold Out' : 'Book Now'}
              </motion.button>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default EventCard;