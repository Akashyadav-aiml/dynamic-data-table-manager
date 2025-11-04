'use client';

import { motion } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';

export default function AnimatedBackground() {
  const themeMode = useAppSelector((state) => state.ui.themeMode);

  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.initialX}vw`,
            y: `${particle.initialY}vh`,
            opacity: 0.1,
          }}
          animate={{
            x: [`${particle.initialX}vw`, `${(particle.initialX + 20) % 100}vw`, `${particle.initialX}vw`],
            y: [`${particle.initialY}vh`, `${(particle.initialY - 20 + 100) % 100}vh`, `${particle.initialY}vh`],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background:
              themeMode === 'dark'
                ? `radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent)`
                : `radial-gradient(circle, rgba(79, 70, 229, 0.1), transparent)`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      {/* Floating gradient orbs */}
      <motion.div
        animate={{
          x: ['-10%', '110%'],
          y: ['0%', '100%', '0%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background:
            themeMode === 'dark'
              ? 'radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent)'
              : 'radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent)',
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        animate={{
          x: ['110%', '-10%'],
          y: ['100%', '0%', '100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            themeMode === 'dark'
              ? 'radial-gradient(circle, rgba(244, 63, 94, 0.15), transparent)'
              : 'radial-gradient(circle, rgba(225, 29, 72, 0.1), transparent)',
          filter: 'blur(70px)',
        }}
      />

      {/* Mesh gradient effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            themeMode === 'dark'
              ? `
                radial-gradient(at 20% 30%, rgba(99, 102, 241, 0.1) 0px, transparent 50%),
                radial-gradient(at 80% 70%, rgba(244, 63, 94, 0.1) 0px, transparent 50%),
                radial-gradient(at 50% 50%, rgba(139, 92, 246, 0.05) 0px, transparent 50%)
              `
              : `
                radial-gradient(at 20% 30%, rgba(79, 70, 229, 0.08) 0px, transparent 50%),
                radial-gradient(at 80% 70%, rgba(225, 29, 72, 0.08) 0px, transparent 50%),
                radial-gradient(at 50% 50%, rgba(124, 58, 237, 0.04) 0px, transparent 50%)
              `,
        }}
      />
    </div>
  );
}
