
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from 'lucide-react';

interface CareRecommendation {
  title: string;
  description: string;
  icon: string;
}

interface CareRecommendationsProps {
  recommendations: CareRecommendation[];
}

const CareRecommendations: React.FC<CareRecommendationsProps> = ({ recommendations }) => {
  return (
    <Card className="border-green-200 shadow-lg bg-white/90 backdrop-blur-sm animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Care Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, index) => (
            <div 
              key={index}
              className="bg-green-50 p-4 rounded-lg border border-green-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{rec.icon}</span>
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">{rec.title}</h4>
                  <p className="text-green-700 text-sm">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CareRecommendations;
