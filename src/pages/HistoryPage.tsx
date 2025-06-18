
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from 'lucide-react';
import HistoryTable from '@/components/HistoryTable';
import PlantHealthChart from '@/components/PlantHealthChart';
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

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<PredictionHistory[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('plantHealthHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-2">📊 Plant Health History</h1>
        <p className="text-green-600">Track your plant's progress over time</p>
      </div>

      {/* Health Diary */}
      <HealthDiary />

      {/* History Table */}
      {history.length > 0 ? (
        <>
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
        </>
      ) : (
        <Card className="border-green-200 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">No History Yet</h3>
            <p className="text-green-600">Start monitoring your plant to see history and trends!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HistoryPage;
