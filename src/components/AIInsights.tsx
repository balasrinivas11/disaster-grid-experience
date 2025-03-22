
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { DisasterType } from './DisasterSelector';
import { Brain, AlertCircle, Clock, Lightbulb, BarChart } from 'lucide-react';

interface AIInsightsProps {
  disaster: DisasterType;
  className?: string;
  onClose?: () => void;
}

const AIInsights: React.FC<AIInsightsProps> = ({ 
  disaster, 
  className,
  onClose
}) => {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<{
    prediction: string;
    impact: string;
    restoration: string;
    recommendation: string;
  } | null>(null);
  
  useEffect(() => {
    if (!disaster) {
      setInsights(null);
      return;
    }
    
    setLoading(true);
    
    // Simulate AI processing
    const timer = setTimeout(() => {
      setLoading(false);
      setInsights(getInsightsForDisaster(disaster));
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [disaster]);
  
  const getInsightsForDisaster = (type: DisasterType) => {
    switch (type) {
      case 'hurricane':
        return {
          prediction: "Category 3 hurricane affecting coastal power infrastructure. Wind speeds of 115-130 mph.",
          impact: "27% of the grid currently offline. 3 substations affected. 42,000 customers without power.",
          restoration: "Estimated 3-5 days for full restoration. Critical infrastructure within 24 hours.",
          recommendation: "Deploy mobile generators to hospitals and evacuation centers. Preemptively shut down coastal substations."
        };
      case 'wildfire':
        return {
          prediction: "Fast-moving wildfire traveling at 15 mph. Air quality severely degraded. Ambient temperature 105°F.",
          impact: "15% of the grid at immediate risk. 2 substations offline. 18,000 customers affected.",
          restoration: "Fire containment estimated in 36 hours. Restoration can begin in sections after containment.",
          recommendation: "Proactively de-energize transmission lines in path of fire. Reroute power from eastern substations."
        };
      case 'flood':
        return {
          prediction: "Flash flooding with water levels rising 2 inches per hour. Ground saturation at 92%.",
          impact: "12% of grid infrastructure submerged. 1 major substation and 3 transformers compromised.",
          restoration: "Water recession expected in 48 hours. Full restoration in 4-7 days after water recedes.",
          recommendation: "Deploy pumping equipment to critical substations. Initiate temporary floating transformer stations."
        };
      case 'earthquake':
        return {
          prediction: "Magnitude 6.7 earthquake with multiple aftershocks. Soil liquefaction in northern quadrants.",
          impact: "73% of the grid affected. 5 substations structurally compromised. Widespread outages.",
          restoration: "Initial emergency restoration within 72 hours. Full structural repairs: 3-4 weeks.",
          recommendation: "Deploy microgrids for critical services. Prioritize structural assessment of all transmission towers."
        };
      case 'tornado':
        return {
          prediction: "EF-3 tornado with wind speeds up to 165 mph. Multiple vortices observed. Path width: 0.5 miles.",
          impact: "32% of distribution network destroyed in affected corridor. 2 main transmission lines severed.",
          restoration: "Emergency services restored within 48 hours. Complete rebuild of affected sectors: 2-3 weeks.",
          recommendation: "Immediate deployment of mobile substations. Establish temporary distribution rings around affected area."
        };
      default:
        return null;
    }
  };
  
  if (!disaster || !insights) return null;
  
  return (
    <div className={cn(
      "glass-panel p-6 animate-fade-in overflow-auto max-h-full",
      loading ? "opacity-80" : "opacity-100",
      className
    )}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Brain className="w-5 h-5 mr-2 text-primary" />
          <h3 className="text-lg font-medium">AI Disaster Analysis</h3>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-secondary rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-sm text-center">
            AI analyzing disaster impact<br />and generating recommendations...
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="glass-card p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 mr-3 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium mb-1">Situation Analysis</h4>
                <p className="text-sm text-muted-foreground">{insights.prediction}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-4">
            <div className="flex items-start">
              <BarChart className="w-5 h-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium mb-1">Impact Assessment</h4>
                <p className="text-sm text-muted-foreground">{insights.impact}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-4">
            <div className="flex items-start">
              <Clock className="w-5 h-5 mr-3 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium mb-1">Restoration Timeline</h4>
                <p className="text-sm text-muted-foreground">{insights.restoration}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-4">
            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium mb-1">Recommended Actions</h4>
                <p className="text-sm text-muted-foreground">{insights.recommendation}</p>
              </div>
            </div>
          </div>
          
          <button 
            className="primary-button w-full mt-4 flex items-center justify-center"
          >
            <span>Generate Full Report</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
