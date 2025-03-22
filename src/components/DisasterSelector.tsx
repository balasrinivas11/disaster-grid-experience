
import React, { useState } from 'react';
import { CloudLightning, Flame, Droplets, Activity, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DisasterType = 'hurricane' | 'wildfire' | 'flood' | 'earthquake' | 'tornado' | null;

interface DisasterSelectorProps {
  onSelectDisaster: (disaster: DisasterType) => void;
  className?: string;
}

const DisasterSelector: React.FC<DisasterSelectorProps> = ({ 
  onSelectDisaster,
  className
}) => {
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType>(null);
  
  const handleSelectDisaster = (disaster: DisasterType) => {
    setSelectedDisaster(disaster);
    onSelectDisaster(disaster);
  };
  
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto p-6",
      className
    )}>
      <button 
        className={cn(
          "disaster-button disaster-button-hurricane animate-fade-in", 
          selectedDisaster === 'hurricane' && "ring-4 ring-white/30"
        )}
        style={{ animationDelay: '0.1s' }}
        onClick={() => handleSelectDisaster('hurricane')}
      >
        <div className="absolute inset-0 bg-gradient-radial from-blue-400/30 to-transparent opacity-70"></div>
        <CloudLightning className="w-12 h-12 mb-3 animate-pulse-glow" />
        <span className="text-lg font-medium">Hurricane</span>
      </button>
      
      <button 
        className={cn(
          "disaster-button disaster-button-wildfire animate-fade-in", 
          selectedDisaster === 'wildfire' && "ring-4 ring-white/30"
        )}
        style={{ animationDelay: '0.2s' }}
        onClick={() => handleSelectDisaster('wildfire')}
      >
        <div className="absolute inset-0 bg-gradient-radial from-red-500/30 to-transparent opacity-70"></div>
        <Flame className="w-12 h-12 mb-3 animate-pulse-glow" />
        <span className="text-lg font-medium">Wildfire</span>
      </button>
      
      <button 
        className={cn(
          "disaster-button disaster-button-flood animate-fade-in", 
          selectedDisaster === 'flood' && "ring-4 ring-white/30"
        )}
        style={{ animationDelay: '0.3s' }}
        onClick={() => handleSelectDisaster('flood')}
      >
        <div className="absolute inset-0 bg-gradient-radial from-teal-400/30 to-transparent opacity-70"></div>
        <Droplets className="w-12 h-12 mb-3 animate-pulse-glow" />
        <span className="text-lg font-medium">Flood</span>
      </button>
      
      <button 
        className={cn(
          "disaster-button disaster-button-earthquake animate-fade-in", 
          selectedDisaster === 'earthquake' && "ring-4 ring-white/30"
        )}
        style={{ animationDelay: '0.4s' }}
        onClick={() => handleSelectDisaster('earthquake')}
      >
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/30 to-transparent opacity-70"></div>
        <Activity className="w-12 h-12 mb-3 animate-pulse-glow" />
        <span className="text-lg font-medium">Earthquake</span>
      </button>
      
      <button 
        className={cn(
          "disaster-button disaster-button-tornado animate-fade-in", 
          selectedDisaster === 'tornado' && "ring-4 ring-white/30"
        )}
        style={{ animationDelay: '0.5s' }}
        onClick={() => handleSelectDisaster('tornado')}
      >
        <div className="absolute inset-0 bg-gradient-radial from-indigo-500/30 to-transparent opacity-70"></div>
        <Wind className="w-12 h-12 mb-3 animate-pulse-glow" />
        <span className="text-lg font-medium">Tornado</span>
      </button>
    </div>
  );
};

export default DisasterSelector;
