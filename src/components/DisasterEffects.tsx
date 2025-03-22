
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { DisasterType } from './DisasterSelector';

interface DisasterEffectsProps {
  disaster: DisasterType;
  className?: string;
}

const DisasterEffects: React.FC<DisasterEffectsProps> = ({ disaster, className }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (disaster) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [disaster]);
  
  if (!visible) return null;
  
  // Different effects based on the disaster type
  const renderDisasterEffect = () => {
    switch (disaster) {
      case 'hurricane':
        return <HurricaneEffect />;
      case 'wildfire':
        return <WildfireEffect />;
      case 'flood':
        return <FloodEffect />;
      case 'earthquake':
        return <EarthquakeEffect />;
      case 'tornado':
        return <TornadoEffect />;
      default:
        return null;
    }
  };
  
  return (
    <div className={cn(
      "absolute inset-0 pointer-events-none z-20 overflow-hidden",
      className
    )}>
      {renderDisasterEffect()}
    </div>
  );
};

// Individual disaster effects components
const HurricaneEffect = () => {
  return (
    <>
      {/* Rain overlay */}
      <div className="absolute inset-0 bg-blue-900/10 animate-fade-in"></div>
      
      {/* Rain drops */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-[1px] h-[10px] bg-blue-100/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: 'rotate(15deg)',
              animation: `rainDrop ${1 + Math.random() * 2}s linear infinite`
            }}
          ></div>
        ))}
      </div>
      
      {/* Hurricane spiral */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full border-4 border-blue-300/20 animate-rotate-slow"
        style={{ 
          top: '10%', 
          left: '10%',
          borderWidth: '30px',
          borderRightColor: 'transparent',
          borderLeftColor: 'rgba(147, 197, 253, 0.1)',
          borderTopColor: 'rgba(147, 197, 253, 0.05)',
          borderBottomColor: 'rgba(147, 197, 253, 0.15)',
        }}
      ></div>
      
      {/* Lightning flashes */}
      <div 
        className="absolute inset-0 bg-blue-100/5"
        style={{ 
          animation: 'lightningFlash 8s infinite',
          animationDelay: '3s'
        }}
      ></div>
      
      <style jsx>{`
        @keyframes rainDrop {
          0% { transform: translateY(-10px) rotate(15deg); }
          100% { transform: translateY(calc(100vh + 10px)) rotate(15deg); }
        }
        
        @keyframes lightningFlash {
          0%, 100% { opacity: 0; }
          0.5%, 0.7% { opacity: 0.8; }
          1%, 1.2% { opacity: 0; }
          48%, 49.8% { opacity: 0; }
          50%, 50.3% { opacity: 0.6; }
          51%, 51.2% { opacity: 0; }
          51.5%, 51.8% { opacity: 0.4; }
          52%, 100% { opacity: 0; }
        }
      `}</style>
    </>
  );
};

const WildfireEffect = () => {
  return (
    <>
      {/* Heat haze effect */}
      <div className="absolute inset-0 bg-red-900/10 backdrop-blur-[1px] animate-fade-in"></div>
      
      {/* Orange glow overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-orange-300/5 animate-pulse-glow"
      ></div>
      
      {/* Fire particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${30 + Math.random() * 40}%`,
              bottom: `${Math.random() * 30}%`,
              backgroundColor: `rgba(${255}, ${150 + Math.random() * 100}, ${50 + Math.random() * 50}, ${0.6 + Math.random() * 0.4})`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `fireParticle ${2 + Math.random() * 4}s ease-out infinite`
            }}
          ></div>
        ))}
      </div>
      
      {/* Smoke particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gray-500/20 backdrop-blur-sm"
            style={{
              left: `${35 + Math.random() * 30}%`,
              bottom: `${10 + Math.random() * 20}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 10}s`,
              animation: `smokeRise ${8 + Math.random() * 7}s ease-out infinite`
            }}
          ></div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fireParticle {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        
        @keyframes smokeRise {
          0% { transform: translateY(0) scale(1); opacity: 0.3; }
          100% { transform: translateY(-300px) scale(3); opacity: 0; }
        }
      `}</style>
    </>
  );
};

const FloodEffect = () => {
  return (
    <>
      {/* Water overlay */}
      <div 
        className="absolute left-0 right-0 bottom-0 bg-cyan-500/30 backdrop-blur-[2px] animate-fade-in"
        style={{
          height: '30%',
          animation: 'waterRise 15s ease-in-out forwards'
        }}
      ></div>
      
      {/* Water ripples */}
      <div className="absolute left-0 right-0 bottom-0" style={{ height: '30%' }}>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full border border-cyan-200/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${10 + Math.random() * 30}px`,
              height: `${10 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 10}s`,
              animation: `ripple ${2 + Math.random() * 4}s linear infinite`
            }}
          ></div>
        ))}
      </div>
      
      {/* Rain effect */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-[1px] h-[8px] bg-blue-100/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `floodRainDrop ${1 + Math.random() * 1.5}s linear infinite`
            }}
          ></div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes waterRise {
          0% { height: 0%; }
          80%, 100% { height: 30%; }
        }
        
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        
        @keyframes floodRainDrop {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(calc(100vh + 10px)); }
        }
      `}</style>
    </>
  );
};

const EarthquakeEffect = () => {
  return (
    <>
      {/* Shaking effect */}
      <div 
        className="absolute inset-0"
        style={{ animation: 'earthquakeShake 0.6s infinite' }}
      ></div>
      
      {/* Dust particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 30}%`,
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
              backgroundColor: `rgba(150, 150, 150, ${0.3 + Math.random() * 0.3})`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `dustRise ${3 + Math.random() * 4}s ease-out infinite`
            }}
          ></div>
        ))}
      </div>
      
      {/* Cracks visualization */}
      {[...Array(5)].map((_, i) => (
        <div 
          key={i}
          className="absolute bg-purple-800/40"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${30 + Math.random() * 40}%`,
            width: `${100 + Math.random() * 200}px`,
            height: '2px',
            transform: `rotate(${Math.random() * 180}deg)`,
            animation: 'crackAppear 2s forwards',
            animationDelay: `${0.5 + Math.random() * 1}s`
          }}
        ></div>
      ))}
      
      <style jsx>{`
        @keyframes earthquakeShake {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-5px) translateY(0); }
          30% { transform: translateX(5px) translateY(-1px); }
          50% { transform: translateX(-5px) translateY(1px); }
          70% { transform: translateX(5px) translateY(-1px); }
          90% { transform: translateX(-3px) translateY(0); }
        }
        
        @keyframes dustRise {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-50px) scale(1.5); opacity: 0; }
        }
        
        @keyframes crackAppear {
          0% { width: 0; opacity: 0; }
          100% { width: ${100 + Math.random() * 200}px; opacity: 1; }
        }
      `}</style>
    </>
  );
};

const TornadoEffect = () => {
  return (
    <>
      {/* Darkened sky */}
      <div className="absolute inset-0 bg-indigo-900/20 animate-fade-in"></div>
      
      {/* Funnel cloud */}
      <div 
        className="absolute w-[100px] h-[500px] bg-gradient-to-b from-gray-700/30 to-indigo-600/40 rounded-b-full backdrop-blur-sm animate-pulse-glow"
        style={{ 
          top: '-50px',
          left: '60%',
          transform: 'rotate(5deg)',
          animation: 'tornadoSway 10s ease-in-out infinite, tornadoGrow 5s ease-out forwards'
        }}
      ></div>
      
      {/* Flying debris */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-gray-700/60 rounded-sm"
            style={{
              left: `${55 + Math.random() * 15}%`,
              top: `${20 + Math.random() * 60}%`,
              width: `${2 + Math.random() * 6}px`,
              height: `${2 + Math.random() * 6}px`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `debrisSpin ${2 + Math.random() * 4}s linear infinite`
            }}
          ></div>
        ))}
      </div>
      
      {/* Wind streaks */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-[1px] bg-indigo-200/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 50}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `windStreak ${1 + Math.random() * 2}s linear infinite`
            }}
          ></div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes tornadoSway {
          0%, 100% { transform: rotate(5deg); }
          50% { transform: rotate(-5deg); }
        }
        
        @keyframes tornadoGrow {
          0% { height: 0; opacity: 0; }
          100% { height: 500px; opacity: 1; }
        }
        
        @keyframes debrisSpin {
          0% { transform: rotate(0deg) translateX(0); }
          100% { transform: rotate(360deg) translateX(-100px); }
        }
        
        @keyframes windStreak {
          0% { opacity: 0; transform: translateX(0) rotate(${Math.random() * 360}deg); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(-100px) rotate(${Math.random() * 360}deg); }
        }
      `}</style>
    </>
  );
};

export default DisasterEffects;
