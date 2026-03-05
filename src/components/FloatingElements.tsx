import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FloatingElements: React.FC = () => {
  const { scrollY } = useScroll();

  // Generamos un array de 30 partículas con posiciones y tamaños aleatorios
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2, // Tamaños pequeños: 2px a 8px
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10, // Velocidad de flotación aleatoria
      delay: Math.random() * 5,
      depth: Math.random() * 300 + 100, // Factor para el scroll parallax
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {particles.map((p) => (
        <Particle key={p.id} particle={p} scrollY={scrollY} />
      ))}
    </div>
  );
};

const Particle = ({ particle, scrollY }: { particle: any, scrollY: any }) => {
  // Efecto Parallax: se mueven hacia arriba a diferentes velocidades según su "profundidad"
  const y = useTransform(scrollY, [0, 1000], [0, -particle.depth]);

  return (
    <motion.div
      style={{
        top: particle.top,
        left: particle.left,
        width: particle.size,
        height: particle.size,
        y,
      }}
      // Animación constante: flotación orgánica
      animate={{
        x: [0, Math.random() * 40 - 20, 0],
        y: [0, Math.random() * 40 - 20, 0],
        opacity: [0.1, 0.4, 0.1],
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        ease: "linear",
        delay: particle.delay,
      }}
      className="absolute rounded-full bg-primary/20 border border-white/30 backdrop-blur-[1px]"
    />
  );
};
