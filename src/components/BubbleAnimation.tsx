import React from 'react';
import { motion } from 'framer-motion';

const BubbleAnimation: React.FC = () => {
  // Reduced number of bubbles for better performance
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 80 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full backdrop-blur-sm"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            background: `radial-gradient(circle at 30% 30%, 
              rgba(59, 130, 246, ${bubble.opacity * 0.6}), 
              rgba(147, 51, 234, ${bubble.opacity * 0.3}), 
              transparent 70%)`,
            border: `1px solid rgba(59, 130, 246, ${bubble.opacity * 0.4})`,
            boxShadow: `
              inset 0 0 15px rgba(255, 255, 255, ${bubble.opacity * 0.3}),
              0 0 15px rgba(59, 130, 246, ${bubble.opacity * 0.2})
            `,
          }}
          animate={{
            y: [0, -60, -30, -90, 0],
            x: [0, 20, -15, 30, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
            opacity: [bubble.opacity, bubble.opacity * 1.3, bubble.opacity * 0.7, bubble.opacity * 1.1, bubble.opacity],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Simplified inner highlight */}
          <motion.div
            className="absolute top-2 left-2 w-1/4 h-1/4 rounded-full bg-white/50 blur-sm"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: bubble.duration * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default BubbleAnimation;