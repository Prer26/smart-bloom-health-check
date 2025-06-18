
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Camera, Calendar, Plus, Heart } from 'lucide-react';

interface DiaryEntry {
  id: string;
  date: string;
  note: string;
  healthStatus: string;
  imageUrl?: string;
  metrics: {
    light: number;
    moisture: number;
    temperature: number;
  };
}

interface HealthDiaryProps {
  currentMetrics?: {
    light: number;
    moisture: number;
    temperature: number;
  };
  currentHealthStatus?: string;
  currentImageUrl?: string;
}

const HealthDiary: React.FC<HealthDiaryProps> = ({ 
  currentMetrics, 
  currentHealthStatus, 
  currentImageUrl 
}) => {
  const [entries, setEntries] = useState<DiaryEntry[]>(() => {
    const saved = localStorage.getItem('plantHealthDiary');
    return saved ? JSON.parse(saved) : [];
  });
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const addDiaryEntry = () => {
    if (!newNote.trim() || !currentMetrics || !currentHealthStatus) return;

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      note: newNote,
      healthStatus: currentHealthStatus,
      imageUrl: currentImageUrl,
      metrics: currentMetrics
    };

    const updatedEntries = [newEntry, ...entries].slice(0, 10); // Keep last 10 entries
    setEntries(updatedEntries);
    localStorage.setItem('plantHealthDiary', JSON.stringify(updatedEntries));
    
    setNewNote('');
    setIsAddingNote(false);
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'Good':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Needs Attention':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Critical':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <Card className="border-green-200 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Plant Health Diary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Add New Entry Section */}
        {!isAddingNote ? (
          <Button
            onClick={() => setIsAddingNote(true)}
            variant="outline"
            className="w-full mb-4 border-green-300 text-green-700 hover:bg-green-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Note to Health Diary
          </Button>
        ) : (
          <div className="space-y-3 mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              New Diary Entry - {new Date().toLocaleDateString()}
            </div>
            <Input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="How is your plant feeling today? Any observations?"
              className="border-green-200 focus:border-green-400"
            />
            <div className="flex gap-2">
              <Button
                onClick={addDiaryEntry}
                size="sm"
                className="bg-green-500 hover:bg-green-600"
              >
                Save Entry
              </Button>
              <Button
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote('');
                }}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Diary Entries */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No diary entries yet.</p>
              <p className="text-sm">Start documenting your plant's journey!</p>
            </div>
          ) : (
            entries.map((entry) => {
              const { date, time } = formatDate(entry.date);
              return (
                <div
                  key={entry.id}
                  className="p-4 border border-green-100 rounded-lg bg-gradient-to-r from-green-25 to-emerald-25 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        {date} at {time}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getHealthStatusColor(entry.healthStatus)}`}
                    >
                      {entry.healthStatus}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{entry.note}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span>💡 Light: {entry.metrics.light}</span>
                    <span>💧 Moisture: {entry.metrics.moisture}</span>
                    <span>🌡️ Temp: {entry.metrics.temperature}°C</span>
                    {entry.imageUrl && (
                      <div className="flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        <span>Photo taken</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthDiary;
