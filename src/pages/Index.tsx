import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Droplets, Sun, Thermometer, Clock, Camera, Upload, Loader2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import PlantHealthChart from '@/components/PlantHealthChart';
import HistoryTable from '@/components/HistoryTable';
import ImageUpload from '@/components/ImageUpload';
import DiseaseDetection from '@/components/DiseaseDetection';
import CareRecommendations from '@/components/CareRecommendations';
import PlantFace from '@/components/PlantFace';
import PlantChatbot from '@/components/PlantChatbot';
import PlantNotifications from '@/components/PlantNotifications';
import HealthDiary from '@/components/HealthDiary';

interface PredictionHistory {
  id: string;
  lightIntensity: number;
  soilMoisture: number;
  temperature: number;
  healthStatus: 'Good' | 'Needs Attention' | 'Critical';
  diseaseDetected?: string;
  imageUrl?: string;
  timestamp: string;
}

interface CareRecommendation {
  title: string;
  description: string;
  icon: string;
}

const Index = () => {
  const [lightIntensity, setLightIntensity] = useState<string>('');
  const [soilMoisture, setSoilMoisture] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [currentPrediction, setCurrentPrediction] = useState<string | null>(null);
  const [diseaseResult, setDiseaseResult] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<PredictionHistory[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [careRecommendations, setCareRecommendations] = useState<CareRecommendation[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('plantHealthHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const predictPlantHealth = (light: number, moisture: number, temp: number): 'Good' | 'Needs Attention' | 'Critical' => {
    if (moisture < 300 || light < 300 || temp > 35) {
      return 'Critical';
    }
    if (moisture < 500 || temp > 30) {
      return 'Needs Attention';
    }
    return 'Good';
  };

  const generateCareRecommendations = (healthStatus: string, diseaseDetected?: string) => {
    const recommendations: CareRecommendation[] = [];

    if (healthStatus === 'Critical') {
      recommendations.push(
        { title: 'Immediate Water', description: 'Your plant needs water immediately. Check soil moisture daily.', icon: '💧' },
        { title: 'Light Adjustment', description: 'Move to a brighter location with indirect sunlight.', icon: '☀️' },
        { title: 'Temperature Control', description: 'Keep in a cooler environment, away from direct heat.', icon: '🌡️' }
      );
    } else if (healthStatus === 'Needs Attention') {
      recommendations.push(
        { title: 'Monitor Watering', description: 'Adjust watering schedule based on soil moisture.', icon: '💧' },
        { title: 'Light Optimization', description: 'Ensure adequate but not excessive light exposure.', icon: '☀️' }
      );
    } else {
      recommendations.push(
        { title: 'Maintain Routine', description: 'Continue your current care routine - your plant is thriving!', icon: '✅' },
        { title: 'Regular Monitoring', description: 'Keep checking metrics weekly to maintain health.', icon: '📊' }
      );
    }

    if (diseaseDetected && diseaseDetected !== 'Healthy') {
      recommendations.push(
        { title: 'Disease Treatment', description: `Detected: ${diseaseDetected}. Consider organic treatment options.`, icon: '🩺' },
        { title: 'Isolation', description: 'Keep plant isolated to prevent spread to other plants.', icon: '🚫' }
      );
    }

    setCareRecommendations(recommendations);
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
      diseaseDetected: diseaseResult || undefined,
      imageUrl: uploadedImage || undefined,
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [newPrediction, ...history].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('plantHealthHistory', JSON.stringify(updatedHistory));

    generateCareRecommendations(healthStatus, diseaseResult);
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

  const getCurrentMetrics = () => {
    if (!lightIntensity || !soilMoisture || !temperature) return undefined;
    return {
      light: parseFloat(lightIntensity),
      moisture: parseFloat(soilMoisture),
      temperature: parseFloat(temperature)
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-200/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-teal-200/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-200/20 rounded-full animate-bounce delay-700"></div>
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full animate-pulse">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Smart Plant Guardian 2.0
              </h1>
              <p className="text-green-700 text-sm">🌱📷 AI-Powered Plant Health & Disease Detection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Plant Face - New Emotional Component */}
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

        {/* Image Upload Section */}
        <Card className="border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Camera className="h-6 w-6" />
              Plant Image Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ImageUpload onImageUpload={setUploadedImage} />
            {uploadedImage && (
              <div className="mt-4">
                <DiseaseDetection imageUrl={uploadedImage} onDetectionComplete={setDiseaseResult} />
              </div>
            )}
          </CardContent>
        </Card>

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
              {diseaseResult && (
                <div className="mt-4">
                  <Badge variant="outline" className="text-sm px-4 py-1 bg-purple-50 text-purple-700 border-purple-200">
                    Disease Status: {diseaseResult}
                  </Badge>
                </div>
              )}
              <p className="text-green-700 mt-4 text-lg">
                {currentPrediction === 'Good' && "Your plant is thriving! Keep up the great care."}
                {currentPrediction === 'Needs Attention' && "Your plant could use some adjustments to its environment."}
                {currentPrediction === 'Critical' && "Immediate action needed! Check the care recommendations below."}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Care Recommendations */}
        {careRecommendations.length > 0 && (
          <CareRecommendations recommendations={careRecommendations} />
        )}

        {/* Plant Care Chatbot - New Feature */}
        <PlantChatbot />

        {/* Health Diary - New Feature */}
        <HealthDiary 
          currentMetrics={getCurrentMetrics()}
          currentHealthStatus={currentPrediction || undefined}
          currentImageUrl={uploadedImage || undefined}
        />

        {/* History Table */}
        {history.length > 0 && (
          <Card className="border-green-200 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Health Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <HistoryTable history={history} />
            </CardContent>
          </Card>
        )}

        {history.length > 1 && (
          <Card className="border-green-200 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle>Health Trends</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <PlantHealthChart history={history} />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 mt-16 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-6 w-6" />
            <span className="text-xl font-semibold">Smart Plant Guardian 2.0</span>
          </div>
          <p className="text-green-200 mb-4">🌿 Made by Prerana Iyengar</p>
          <Badge variant="outline" className="bg-white/10 text-green-100 border-green-300">
            Built with Bolt.new ❤️
          </Badge>
        </div>
      </footer>
    </div>
  );
};

export default Index;
