
import React, { useState, useRef } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import DisasterSelector, { DisasterType } from '@/components/DisasterSelector';
import Map3D from '@/components/Map3D';
import PowerGrid from '@/components/PowerGrid';
import AIInsights from '@/components/AIInsights';
import DisasterEffects from '@/components/DisasterEffects';
import SimulationControls from '@/components/SimulationControls';

const Index = () => {
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType>(null);
  const [simulationPlaying, setSimulationPlaying] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleSelectDisaster = (disaster: DisasterType) => {
    setSelectedDisaster(disaster);
    setSimulationPlaying(true);
    setShowAIPanel(!!disaster);
  };
  
  const handleTogglePlay = () => {
    setSimulationPlaying(!simulationPlaying);
  };
  
  const handleReset = () => {
    setSelectedDisaster(null);
    setSimulationPlaying(false);
    setShowAIPanel(false);
  };
  
  const handleSpeedUp = () => {
    // Would control simulation speed in a real implementation
    console.log('Speed up simulation');
  };
  
  const handleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <NavigationHeader />
      
      <main className="pt-24 pb-16 flex flex-col min-h-screen">
        <section className="container mx-auto mb-10 text-center animate-fade-in">
          <div className="inline-block py-1 px-3 rounded-full bg-white/10 text-sm font-medium mb-4">
            Power Grid Disaster Simulator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Visualize the Impact of Natural Disasters on Power Infrastructure
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Select a disaster type below to see its effects on the power grid in real-time. Explore AI-driven insights and restoration strategies.
          </p>
        </section>
        
        <DisasterSelector 
          onSelectDisaster={handleSelectDisaster} 
          className="mb-8"
        />
        
        <div 
          ref={containerRef}
          className="flex-1 container mx-auto flex flex-col lg:flex-row gap-6 relative"
        >
          <div className="lg:flex-1 h-[500px] lg:h-auto relative rounded-xl overflow-hidden">
            <Map3D disaster={selectedDisaster} />
            <PowerGrid disaster={selectedDisaster} />
            <DisasterEffects disaster={selectedDisaster} />
            
            {selectedDisaster && (
              <SimulationControls 
                isPlaying={simulationPlaying}
                onTogglePlay={handleTogglePlay}
                onReset={handleReset}
                onSpeedUp={handleSpeedUp}
                onFullscreen={handleFullscreen}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              />
            )}
          </div>
          
          <div className="lg:w-96 h-[500px] lg:h-auto">
            <AIInsights 
              disaster={selectedDisaster} 
              onClose={() => setShowAIPanel(false)}
            />
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-white/10">
        <div className="container mx-auto text-center text-sm text-gray-400">
          <p>Disaster Grid Simulator &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
