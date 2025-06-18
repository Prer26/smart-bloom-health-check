
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import DiseaseDetection from '@/components/DiseaseDetection';
import CareRecommendations from '@/components/CareRecommendations';

interface CareRecommendation {
  title: string;
  description: string;
  icon: string;
}

const DiseaseDetectionPage: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [diseaseResult, setDiseaseResult] = useState<string | null>(null);
  const [careRecommendations, setCareRecommendations] = useState<CareRecommendation[]>([]);

  const generateCareRecommendations = (diseaseDetected: string) => {
    const recommendations: CareRecommendation[] = [];

    if (diseaseDetected && diseaseDetected !== 'Healthy') {
      recommendations.push(
        { title: 'Disease Treatment', description: `Detected: ${diseaseDetected}. Consider organic treatment options.`, icon: '🩺' },
        { title: 'Isolation', description: 'Keep plant isolated to prevent spread to other plants.', icon: '🚫' },
        { title: 'Improve Air Circulation', description: 'Ensure good airflow around your plant to prevent further issues.', icon: '💨' },
        { title: 'Monitor Daily', description: 'Check your plant daily for any changes or improvements.', icon: '👀' }
      );
    } else {
      recommendations.push(
        { title: 'Maintain Health', description: 'Your plant looks healthy! Continue your current care routine.', icon: '✅' },
        { title: 'Regular Monitoring', description: 'Keep checking your plant weekly for early detection.', icon: '📊' }
      );
    }

    setCareRecommendations(recommendations);
  };

  const handleDetectionComplete = (result: string) => {
    setDiseaseResult(result);
    generateCareRecommendations(result);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-2">🤖 AI Disease Detection</h1>
        <p className="text-green-600">Upload a photo of your plant to detect potential diseases</p>
      </div>

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
              <DiseaseDetection imageUrl={uploadedImage} onDetectionComplete={handleDetectionComplete} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Care Recommendations */}
      {careRecommendations.length > 0 && (
        <CareRecommendations recommendations={careRecommendations} />
      )}
    </div>
  );
};

export default DiseaseDetectionPage;
