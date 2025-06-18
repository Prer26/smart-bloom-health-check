
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Droplets, Sun, Thermometer, Loader2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import PlantFace from '@/components/PlantFace';
import PlantNotifications from '@/components/PlantNotifications';

interface PredictionHistory {
  id: string;
  lightIntensity: number;
  soilMoisture: number;
  temperature: number;
  healthStatus: 'Good' | 'Needs Attention' | 'Critical';
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const [lightIntensity, setLightIntensity] = useState<string>('');
  const [soilMoisture, setSoilMoisture] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [currentPrediction, setCurrentPrediction] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const predictPlantHealth = (light: number, moisture: number, temp: number): 'Good' | 'Needs Attention' | 'Critical' => {
    if (moisture < 300 || light < 300 || temp > 35) {
      return 'Critical';
    }
    if (moisture < 500 || temp > 30) {
      return 'Needs Attention';
    }
    return 'Good';
  };

  const handleCheckHealth = async () => {
    if (!lightIntensity || !soilMoisture || !temperature) {
      toast({
        title: "Missing Information",
        description: "Please fill in all plant metrics before checking health.",
        variant: "destructive",
      });
      return;
    }

    const light = parseFloat(lightIntensity);
    const moisture = parseFloat(soilMoisture);
    const temp = parseFloat(temperature);

    if (isNaN(light) || isNaN(moisture) || isNaN(temp)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for all metrics.",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const healthStatus = predictPlantHealth(light, moisture, temp);
    setCurrentPrediction(healthStatus);

    const newPrediction: PredictionHistory = {
      id: Date.now().toString(),
      lightIntensity: light,
      soilMoisture: moisture,
      temperature: temp,
      healthStatus,
      timestamp: new Date().toISOString(),
    };

    const savedHistory = localStorage.getItem('plantHealthHistory');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    const updatedHistory = [newPrediction, ...history].slice(0, 5);
    localStorage.setItem('plantHealthHistory', JSON.stringify(updatedHistory));

    setIsChecking(false);

    toast({
      title: "Health Check Complete",
      description: `Your plant is ${healthStatus.toLowerCase()}!`,
    });
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'Good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Needs Attention':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'Good':
        return '✅';
      case 'Needs Attention':
        return '⚠️';
      case 'Critical':
        return '❌';
      default:
        return '🌱';
    }
  };

  return (
    <div className="space-y-8">
      {/* Plant Face */}
      <div className="flex justify-center">
        <PlantFace healthStatus={currentPrediction as any} isAnalyzing={isChecking} />
      </div>

      {/* Plant Notifications */}
      <PlantNotifications 
        healthStatus={currentPrediction as any}
        lightIntensity={lightIntensity ? parseFloat(lightIntensity) : undefined}
        soilMoisture={soilMoisture ? parseFloat(soilMoisture) : undefined}
        temperature={temperature ? parseFloat(temperature) : undefined}
      />

      {/* Input Section */}
      <Card className="border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Leaf className="h-6 w-6" />
            Plant Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-green-700">
                <Sun className="h-4 w-4" />
                Light Intensity (lux)
              </label>
              <Input
                type="number"
                placeholder="e.g., 800"
                value={lightIntensity}
                onChange={(e) => setLightIntensity(e.target.value)}
                className="border-green-200 focus:border-green-400 focus:ring-green-200"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-green-700">
                <Droplets className="h-4 w-4" />
                Soil Moisture (units)
              </label>
              <Input
                type="number"
                placeholder="e.g., 450"
                value={soilMoisture}
                onChange={(e) => setSoilMoisture(e.target.value)}
                className="border-green-200 focus:border-green-400 focus:ring-green-200"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-green-700">
                <Thermometer className="h-4 w-4" />
                Temperature (°C)
              </label>
              <Input
                type="number"
                placeholder="e.g., 22"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="border-green-200 focus:border-green-400 focus:ring-green-200"
              />
            </div>
          </div>
          <Button
            onClick={handleCheckHealth}
            disabled={isChecking}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isChecking ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing Plant Health...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Check Plant Health
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Result */}
      {currentPrediction && (
        <Card className="border-green-200 shadow-lg animate-fade-in bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="text-6xl mb-4 animate-scale-in">
              {getHealthStatusIcon(currentPrediction)}
            </div>
            <Badge 
              variant="outline" 
              className={`text-lg px-6 py-2 font-semibold ${getHealthStatusColor(currentPrediction)}`}
            >
              {currentPrediction}
            </Badge>
            <p className="text-green-700 mt-4 text-lg">
              {currentPrediction === 'Good' && "Your plant is thriving! Keep up the great care."}
              {currentPrediction === 'Needs Attention' && "Your plant could use some adjustments to its environment."}
              {currentPrediction === 'Critical' && "Immediate action needed! Check the care recommendations below."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
