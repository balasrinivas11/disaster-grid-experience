
import React from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause, FastForward, RotateCcw, Maximize } from 'lucide-react';

interface SimulationControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onSpeedUp: () => void;
  onFullscreen: () => void;
  className?: string;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onReset,
  onSpeedUp,
  onFullscreen,
  className
}) => {
  return (
    <div className={cn(
      "glass-panel p-3 flex items-center space-x-3 animate-fade-in",
      className
    )}>
      <button 
        className="secondary-button flex items-center justify-center p-2 aspect-square"
        onClick={onTogglePlay}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
      
      <button 
        className="secondary-button flex items-center justify-center p-2 aspect-square"
        onClick={onSpeedUp}
      >
        <FastForward className="w-4 h-4" />
      </button>
      
      <button 
        className="secondary-button flex items-center justify-center p-2 aspect-square"
        onClick={onReset}
      >
        <RotateCcw className="w-4 h-4" />
      </button>
      
      <div className="h-6 w-px bg-border mx-1"></div>
      
      <button 
        className="secondary-button flex items-center justify-center p-2 aspect-square"
        onClick={onFullscreen}
      >
        <Maximize className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SimulationControls;
