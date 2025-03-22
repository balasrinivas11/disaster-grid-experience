
import React from 'react';
import { Home, Info, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationHeaderProps {
  className?: string;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 animate-fade-in",
      className
    )}>
      <div className="glass-panel p-3 px-5">
        <h1 className="text-xl font-medium">Disaster Grid Simulator</h1>
      </div>
      
      <div className="glass-panel flex items-center space-x-4 p-3">
        <button className="hover:bg-white/10 rounded-full p-2 transition-colors">
          <Home className="w-5 h-5" />
        </button>
        <button className="hover:bg-white/10 rounded-full p-2 transition-colors">
          <Info className="w-5 h-5" />
        </button>
        <button className="hover:bg-white/10 rounded-full p-2 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default NavigationHeader;
