import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  theme?: 'default' | 'technology' | 'business' | 'art' | 'music' | 'dining' | 'food & drink';
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  theme = 'default'
}) => {
  // Light, vibrant theme styles
  const themeStyles = {
    default: 'from-white/80 to-blue-50/80 border-blue-200/50 shadow-blue-500/20',
    technology: 'from-white/80 to-cyan-50/80 border-cyan-200/50 shadow-cyan-500/20',
    business: 'from-white/80 to-emerald-50/80 border-emerald-200/50 shadow-emerald-500/20',
    art: 'from-white/80 to-pink-50/80 border-pink-200/50 shadow-pink-500/20',
    music: 'from-white/80 to-purple-50/80 border-purple-200/50 shadow-purple-500/20',
    dining: 'from-white/80 to-amber-50/80 border-amber-200/50 shadow-amber-500/20',
    'food & drink': 'from-white/80 to-orange-50/80 border-orange-200/50 shadow-orange-500/20',
  };

  return (
    <motion.div
      className={`relative backdrop-blur-xl bg-gradient-to-br ${themeStyles[theme]} border rounded-2xl shadow-xl overflow-hidden ${className}`}
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Simplified animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
            'linear-gradient(225deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Bottom highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </motion.div>
  );
};

export default GlassCard;