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
  const lastMouseMove = useRef(0);
  const gravity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Lógica de Giroscopio para Móvil
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma && e.beta) {
        // gamma es izquierda/derecha (-90 a 90)
        // beta es adelante/atrás (-180 a 180)
        gravity.current.x = e.gamma / 20; 
        gravity.current.y = e.beta / 20;
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    const createParticle = (x: number, y: number) => {
      const size = Math.random() * 8 + 2;
      const color = `hsla(${hue.current}, 100%, 50%, 0.5)`;
      const speedX = (Math.random() * 2 - 1);
      const speedY = (Math.random() * 2 - 1);
      particles.current.push({ x, y, size, color, weight: 1, speedX, speedY });
    };

    const handleInput = (e: MouseEvent | TouchEvent) => {
      const now = Date.now();
      if (now - lastMouseMove.current < 16) return;
      lastMouseMove.current = now;

      let x, y;
      if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
      } else {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }

      const count = window.innerWidth < 768 ? 2 : 4;
      for (let i = 0; i < count; i++) {
        createParticle(x, y);
      }
      hue.current += 3;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        
        // Aplicamos la gravedad del giroscopio
        p.speedX += gravity.current.x * 0.1;
        p.speedY += gravity.current.y * 0.1;
        
        p.x += p.speedX;
        p.y += p.speedY;
        p.size *= 0.96;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.size < 0.5) {
          particles.current.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleInput);
    window.addEventListener('touchmove', handleInput, { passive: true });
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleInput);
      window.removeEventListener('touchmove', handleInput);
      window.removeEventListener('deviceorientation', handleOrientation);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none will-change-transform">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40 dark:opacity-25" />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-screen" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>
    </div>
  );
};
