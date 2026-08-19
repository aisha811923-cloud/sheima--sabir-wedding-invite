import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  tiltAngle: number;
  tiltSpeed: number;
  swayOffset: number;
  swaySpeed: number;
  opacity: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  pulseSpeed: number;
  color: string;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];
    let sparkles: Sparkle[] = [];
    let lastTime = performance.now();

    const petalColors = [
      '#5E0E1B', // Deep Velvet Rose
      '#7A1F2D', // Crimson Rose
      '#8C2535', // Imperial Rose
      '#4A0E17', // Velvet Burgundy
    ];

    const sparkleColors = [
      'rgba(212, 175, 55, ',
      'rgba(245, 224, 142, ',
      'rgba(255, 243, 176, ',
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      petals = [];
      sparkles = [];

      // Rose Petal Count based on screen width for 60fps
      const petalCount = Math.min(Math.floor(window.innerWidth / 32), 28);
      for (let i = 0; i < petalCount; i++) {
        petals.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 11 + 7,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.8 + 0.6,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          tiltAngle: Math.random() * Math.PI * 2,
          tiltSpeed: Math.random() * 0.025 + 0.015,
          swayOffset: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.02 + 0.01,
          opacity: Math.random() * 0.35 + 0.55,
          color: petalColors[Math.floor(Math.random() * petalColors.length)],
        });
      }

      // Golden Dust Sparkles
      const sparkleCount = Math.min(Math.floor(window.innerWidth / 22), 38);
      for (let i = 0; i < sparkleCount; i++) {
        sparkles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.6,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -Math.random() * 0.35 - 0.12,
          alpha: Math.random() * 0.6 + 0.2,
          targetAlpha: Math.random() * 0.6 + 0.2,
          pulseSpeed: Math.random() * 0.018 + 0.008,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        });
      }
    };

    // Draw single 3D tumbling rose petal
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      
      // 3D tumbling perspective scaling
      const scaleX = Math.cos(p.tiltAngle);
      const scaleY = Math.sin(p.tiltAngle * 0.7);
      ctx.scale(scaleX, Math.max(Math.abs(scaleY), 0.35));

      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      // Curved organic petal path
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.85, p.size * 0.9, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.85, -p.size * 0.85, 0, -p.size);
      ctx.fill();

      // Subtle petal vein highlight
      ctx.strokeStyle = 'rgba(255, 220, 220, 0.25)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.quadraticCurveTo(p.size * 0.12, 0, 0, p.size * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    const render = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 16.667, 2);
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Render & Update Falling Rose Petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swayOffset += p.swaySpeed * deltaTime;
        p.x += (p.vx + Math.sin(p.swayOffset) * 0.6) * deltaTime;
        p.y += p.vy * deltaTime;
        p.rotation += p.rotSpeed * deltaTime;
        p.tiltAngle += p.tiltSpeed * deltaTime;

        if (p.y > canvas.height + 25) {
          p.y = -25;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -25) p.x = canvas.width + 25;
        if (p.x > canvas.width + 25) p.x = -25;

        drawPetal(p);
      }

      // 2. Render & Update Floating Gold Dust Sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.alpha += (s.targetAlpha - s.alpha) * s.pulseSpeed * deltaTime;
        if (Math.abs(s.alpha - s.targetAlpha) < 0.05) {
          s.targetAlpha = Math.random() * 0.6 + 0.2;
        }

        s.x += s.vx * deltaTime;
        s.y += s.vy * deltaTime;

        if (s.y < -10) {
          s.y = canvas.height + 10;
          s.x = Math.random() * canvas.width;
        }
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${s.alpha})`;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
        ctx.shadowBlur = s.radius * 3.5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 h-full w-full opacity-90"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
};
