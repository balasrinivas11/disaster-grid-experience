
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { DisasterType } from './DisasterSelector';

interface Map3DProps {
  disaster: DisasterType;
  className?: string;
}

const Map3D: React.FC<Map3DProps> = ({ disaster, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    // Three.js would be initialized here
    // This is a placeholder for the WebGL rendering
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      canvasRef.current.width = containerRef.current.offsetWidth;
      canvasRef.current.height = containerRef.current.offsetHeight;
      drawPlaceholder(context);
    };
    
    // Draw placeholder visualization
    const drawPlaceholder = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      // Horizontal lines
      for (let y = 0; y < ctx.canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < ctx.canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        ctx.stroke();
      }
      
      // Draw terrain
      const centerX = ctx.canvas.width / 2;
      const centerY = ctx.canvas.height / 2;
      
      // Draw base terrain
      ctx.fillStyle = 'rgba(100, 200, 100, 0.2)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(centerX, centerY) * 0.8, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw water
      ctx.fillStyle = 'rgba(100, 150, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(centerX - 100, centerY + 100, 120, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw city center
      ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
      for (let i = 0; i < 20; i++) {
        const x = centerX + (Math.random() - 0.5) * 300;
        const y = centerY + (Math.random() - 0.5) * 200;
        const size = 5 + Math.random() * 15;
        
        ctx.beginPath();
        ctx.rect(x, y, size, size);
        ctx.fill();
      }
      
      // Draw power grid
      ctx.strokeStyle = 'rgba(255, 255, 100, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      // Main power lines
      ctx.moveTo(centerX - 200, centerY - 150);
      ctx.lineTo(centerX, centerY);
      ctx.lineTo(centerX + 200, centerY - 100);
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + 100, centerY + 150);
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX - 150, centerY + 100);
      
      // Draw substations
      for (let i = 0; i < 5; i++) {
        const x = centerX + (Math.random() - 0.5) * 400;
        const y = centerY + (Math.random() - 0.5) * 300;
        
        ctx.moveTo(x, y);
        ctx.arc(x, y, 8, 0, Math.PI * 2);
      }
      
      ctx.stroke();
      
      // Draw disaster effect based on selected disaster
      if (disaster) {
        switch (disaster) {
          case 'hurricane':
            drawHurricane(ctx, centerX - 150, centerY - 150);
            break;
          case 'wildfire':
            drawWildfire(ctx, centerX + 100, centerY - 50);
            break;
          case 'flood':
            drawFlood(ctx, centerX - 100, centerY + 100);
            break;
          case 'earthquake':
            drawEarthquake(ctx, centerX, centerY);
            break;
          case 'tornado':
            drawTornado(ctx, centerX + 50, centerY - 100);
            break;
        }
      }
    };
    
    const drawHurricane = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 120);
      gradient.addColorStop(0, 'rgba(100, 150, 255, 0.1)');
      gradient.addColorStop(0.5, 'rgba(70, 130, 230, 0.3)');
      gradient.addColorStop(1, 'rgba(40, 80, 190, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 120, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw spiral pattern
      ctx.strokeStyle = 'rgba(200, 230, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let i = 0; i < 4; i++) {
        const angleOffset = (i * Math.PI) / 2;
        
        for (let r = 10; r < 120; r += 5) {
          const angle = (r / 10) + angleOffset;
          const spiralX = x + r * Math.cos(angle);
          const spiralY = y + r * Math.sin(angle);
          
          if (r === 10) {
            ctx.moveTo(spiralX, spiralY);
          } else {
            ctx.lineTo(spiralX, spiralY);
          }
        }
      }
      
      ctx.stroke();
    };
    
    const drawWildfire = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 100);
      gradient.addColorStop(0, 'rgba(255, 100, 50, 0.4)');
      gradient.addColorStop(0.7, 'rgba(200, 50, 0, 0.2)');
      gradient.addColorStop(1, 'rgba(100, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 100, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw fire particles
      ctx.fillStyle = 'rgba(255, 200, 50, 0.6)';
      
      for (let i = 0; i < 30; i++) {
        const particleX = x + (Math.random() - 0.5) * 150;
        const particleY = y + (Math.random() - 0.5) * 150;
        const distance = Math.sqrt(Math.pow(particleX - x, 2) + Math.pow(particleY - y, 2));
        
        if (distance < 100) {
          const size = 3 + Math.random() * 5;
          ctx.beginPath();
          ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    
    const drawFlood = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      // Water area
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 150);
      gradient.addColorStop(0, 'rgba(100, 150, 255, 0.5)');
      gradient.addColorStop(0.7, 'rgba(70, 130, 200, 0.3)');
      gradient.addColorStop(1, 'rgba(50, 100, 150, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 150, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw ripples
      ctx.strokeStyle = 'rgba(200, 230, 255, 0.4)';
      ctx.lineWidth = 1;
      
      for (let r = 20; r < 150; r += 20) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    };
    
    const drawEarthquake = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      // Cracks
      ctx.strokeStyle = 'rgba(150, 100, 200, 0.5)';
      ctx.lineWidth = 3;
      
      // Draw cracks
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const length = 50 + Math.random() * 150;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        // Create jagged line for each crack
        let currentX = x;
        let currentY = y;
        const steps = 5 + Math.floor(Math.random() * 5);
        
        for (let j = 0; j < steps; j++) {
          const progress = (j + 1) / steps;
          const jitter = 20 * (1 - progress);
          
          currentX = x + Math.cos(angle) * length * progress + (Math.random() - 0.5) * jitter;
          currentY = y + Math.sin(angle) * length * progress + (Math.random() - 0.5) * jitter;
          
          ctx.lineTo(currentX, currentY);
        }
        
        ctx.stroke();
      }
      
      // Draw epicenter
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
      gradient.addColorStop(0, 'rgba(180, 120, 230, 0.5)');
      gradient.addColorStop(1, 'rgba(150, 100, 200, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
    };
    
    const drawTornado = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      // Draw funnel
      const gradient = ctx.createLinearGradient(x, y - 100, x, y + 100);
      gradient.addColorStop(0, 'rgba(100, 120, 200, 0)');
      gradient.addColorStop(0.3, 'rgba(100, 120, 200, 0.3)');
      gradient.addColorStop(0.7, 'rgba(80, 100, 180, 0.4)');
      gradient.addColorStop(1, 'rgba(60, 80, 150, 0.1)');
      
      ctx.fillStyle = gradient;
      
      // Draw the funnel shape
      ctx.beginPath();
      ctx.moveTo(x - 50, y - 100);
      ctx.quadraticCurveTo(x - 30, y - 50, x - 15, y);
      ctx.quadraticCurveTo(x - 10, y + 50, x - 5, y + 100);
      ctx.lineTo(x + 5, y + 100);
      ctx.quadraticCurveTo(x + 10, y + 50, x + 15, y);
      ctx.quadraticCurveTo(x + 30, y - 50, x + 50, y - 100);
      ctx.closePath();
      ctx.fill();
      
      // Draw rotation lines
      ctx.strokeStyle = 'rgba(150, 170, 255, 0.4)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 7; i++) {
        const yOffset = -100 + i * 33;
        const width = 40 - i * 5;
        
        ctx.beginPath();
        ctx.moveTo(x - width, y + yOffset);
        ctx.lineTo(x + width, y + yOffset);
        ctx.stroke();
      }
      
      // Draw debris
      ctx.fillStyle = 'rgba(150, 150, 150, 0.7)';
      
      for (let i = 0; i < 20; i++) {
        const debrisX = x + (Math.random() - 0.5) * 80;
        const debrisY = y + (Math.random() - 0.5) * 200;
        const size = 1 + Math.random() * 3;
        
        ctx.beginPath();
        ctx.arc(debrisX, debrisY, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [disaster]);
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full h-full relative rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800",
        className
      )}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      
      {/* Placeholder UI elements */}
      <div className="absolute bottom-4 right-4 glass-panel p-3 flex space-x-3">
        <button className="secondary-button text-sm flex items-center justify-center p-2">
          <span className="text-xs">-</span>
        </button>
        <button className="secondary-button text-sm flex items-center justify-center p-2">
          <span className="text-xs">+</span>
        </button>
      </div>
      
      <div className="absolute top-4 left-4 glass-panel p-3">
        <div className="text-sm font-medium">Interactive Map</div>
      </div>
    </div>
  );
};

export default Map3D;
