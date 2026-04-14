'use client';

import { useProfileImageStore } from '@/store/profileImageStore';
import { useAdminStore } from '@/store/adminStore';
import { motion } from 'framer-motion';

export default function HeroAvatar() {
  const image = useProfileImageStore((s) => s.image);
  const name = useAdminStore((s) => s.config.personal.name);

  // Generate initials from the name for placeholder
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="relative group"
    >
      {/* Outer glow ring */}
      <div
        className="absolute -inset-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"
        style={{
          background: 'conic-gradient(from 0deg, transparent, var(--accent-primary), transparent, var(--accent-secondary), transparent)',
          filter: 'blur(6px)',
        }}
      />

      {/* Inner border ring */}
      <div
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[var(--accent-primary)]/40 group-hover:border-[var(--accent-primary)] transition-colors duration-500"
        style={{
          boxShadow: '0 0 30px rgba(0,255,200,0.15), 0 0 60px rgba(0,255,200,0.05), inset 0 0 30px rgba(0,255,200,0.05)',
        }}
      >
        {image ? (
          <motion.img
            src={image.base64Data}
            alt="Vishesh Chawan"
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          /* Placeholder with initials */
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
            }}
          >
            <span
              className="text-3xl md:text-4xl font-bold tracking-wider"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--accent-primary)',
                textShadow: '0 0 20px rgba(0,255,200,0.4)',
              }}
            >
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* Status dot */}
      <div
        className="absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-[var(--bg-void)]"
        style={{
          background: 'var(--accent-primary)',
          boxShadow: '0 0 10px rgba(0,255,200,0.6)',
        }}
      />
    </motion.div>
  );
}
