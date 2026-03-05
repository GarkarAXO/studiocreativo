import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  weight: number;
  speedX: number;
  speedY: number;
}

export const BackgroundEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const hue = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createParticle = (x: number, y: number) => {
      const size = Math.random() * 15 + 5;
      const color = `hsla(${hue.current}, 100%, 50%, 0.8)`;
      const speedX = (Math.random() * 4 - 2);
      const speedY = (Math.random() * 4 - 2);
      particles.current.push({ x, y, size, color, weight: 1, speedX, speedY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Creamos múltiples partículas por cada movimiento para el efecto "explosión"
      for (let i = 0; i < 5; i++) {
        createParticle(e.clientX, e.clientY);
      }
      hue.current += 2; // El color va rotando por el arcoíris
    };

    const animate = () => {
      // Limpiamos el canvas con una opacidad baja para dejar un rastro (trail)
      ctx.fillStyle = 'rgba(250, 250, 250, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.size *= 0.96; // Se van encogiendo

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Eliminar partículas muy pequeñas para rendimiento
        if (p.size < 0.5) {
          particles.current.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#FAFAFA]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      {/* Cuadrícula técnica sutil por encima para dar estructura */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      ></div>
      {/* Grano fino para un look editorial */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
    </div>
  );
};
