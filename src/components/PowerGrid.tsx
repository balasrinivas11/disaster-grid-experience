
import React from 'react';
import { cn } from '@/lib/utils';
import { DisasterType } from './DisasterSelector';
import { Zap, AlertTriangle } from 'lucide-react';

interface PowerGridProps {
  disaster: DisasterType;
  className?: string;
}

const PowerGrid: React.FC<PowerGridProps> = ({ disaster, className }) => {
  // Dynamically determine which power lines are affected based on the disaster
  const getAffectedLines = (disaster: DisasterType) => {
    switch (disaster) {
      case 'hurricane':
        return [1, 3, 5];
      case 'wildfire':
        return [2, 4];
      case 'flood':
        return [0, 5];
      case 'earthquake':
        return [0, 1, 2, 3, 4]; // Earthquakes affect most lines
      case 'tornado':
        return [2, 3];
      default:
        return [];
    }
  };
  
  const affectedLines = disaster ? getAffectedLines(disaster) : [];
  
  // Mock data for power substations
  const substations = [
    { id: 1, x: '20%', y: '30%', status: disaster ? (affectedLines.includes(0) ? 'offline' : 'online') : 'online' },
    { id: 2, x: '40%', y: '20%', status: disaster ? (affectedLines.includes(1) ? 'offline' : 'online') : 'online' },
    { id: 3, x: '70%', y: '25%', status: disaster ? (affectedLines.includes(2) ? 'offline' : 'online') : 'online' },
    { id: 4, x: '80%', y: '60%', status: disaster ? (affectedLines.includes(3) ? 'offline' : 'online') : 'online' },
    { id: 5, x: '50%', y: '70%', status: disaster ? (affectedLines.includes(4) ? 'offline' : 'online') : 'online' },
    { id: 6, x: '25%', y: '65%', status: disaster ? (affectedLines.includes(5) ? 'offline' : 'online') : 'online' },
  ];
  
  return (
    <div className={cn(
      "absolute inset-0 pointer-events-none z-10",
      className
    )}>
      {/* Power lines visualization */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Central to Substation 1 */}
        <line 
          x1="50%" y1="50%" x2="20%" y2="30%" 
          className={cn(
            "transition-all duration-1000",
            affectedLines.includes(0) 
              ? "stroke-red-500 stroke-[3px] animate-pulse" 
              : "stroke-yellow-400 stroke-[2px]"
          )} 
        />
        
        {/* Central to Substation 2 */}
        <line 
          x1="50%" y1="50%" x2="40%" y2="20%" 
          className={cn(
            "transition-all duration-1000",
            affectedLines.includes(1) 
              ? "stroke-red-500 stroke-[3px] animate-pulse" 
              : "stroke-yellow-400 stroke-[2px]"
          )} 
        />
        
        {/* Central to Substation 3 */}
        <line 
          x1="50%" y1="50%" x2="70%" y2="25%" 
          className={cn(
            "transition-all duration-1000",
            affectedLines.includes(2) 
              ? "stroke-red-500 stroke-[3px] animate-pulse" 
              : "stroke-yellow-400 stroke-[2px]"
          )} 
        />
        
        {/* Central to Substation 4 */}
        <line 
          x1="50%" y1="50%" x2="80%" y2="60%" 
          className={cn(
            "transition-all duration-1000",
            affectedLines.includes(3) 
              ? "stroke-red-500 stroke-[3px] animate-pulse" 
              : "stroke-yellow-400 stroke-[2px]"
          )} 
        />
        
        {/* Central to Substation 5 */}
        <line 
          x1="50%" y1="50%" x2="50%" y2="70%" 
          className={cn(
            "transition-all duration-1000",
            affectedLines.includes(4) 
              ? "stroke-red-500 stroke-[3px] animate-pulse" 
              : "stroke-yellow-400 stroke-[2px]"
          )} 
        />
        
        {/* Central to Substation 6 */}
        <line 
          x1="50%" y1="50%" x2="25%" y2="65%" 
          className={cn(
            "transition-all duration-1000",
            affectedLines.includes(5) 
              ? "stroke-red-500 stroke-[3px] animate-pulse" 
              : "stroke-yellow-400 stroke-[2px]"
          )} 
        />
      </svg>
      
      {/* Central power station */}
      <div 
        className="absolute glass-panel flex items-center justify-center"
        style={{ 
          left: 'calc(50% - 20px)', 
          top: 'calc(50% - 20px)', 
          width: '40px', 
          height: '40px'
        }}
      >
        <Zap className="w-5 h-5 text-yellow-400" />
      </div>
      
      {/* Substations */}
      {substations.map(station => (
        <div 
          key={station.id}
          className={cn(
            "absolute glass-panel flex items-center justify-center transition-all duration-500",
            station.status === 'offline' 
              ? "border-red-500 bg-red-500/10 animate-pulse" 
              : "border-green-500 bg-green-500/10"
          )}
          style={{ 
            left: `calc(${station.x} - 15px)`, 
            top: `calc(${station.y} - 15px)`, 
            width: '30px', 
            height: '30px'
          }}
        >
          {station.status === 'offline' ? (
            <AlertTriangle className="w-4 h-4 text-red-500" />
          ) : (
            <Zap className="w-4 h-4 text-green-500" />
          )}
        </div>
      ))}
      
      {/* Display grid status */}
      {disaster && (
        <div 
          className="absolute top-4 right-4 glass-panel p-3 border-red-500 bg-red-500/10 animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="text-sm font-medium text-red-500 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Grid Failure Detected
          </div>
          <div className="text-xs mt-1">
            {affectedLines.length} power lines affected
          </div>
        </div>
      )}
    </div>
  );
};

export default PowerGrid;
