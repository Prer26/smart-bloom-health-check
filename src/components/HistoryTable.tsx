
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Sun, Droplets, Thermometer } from 'lucide-react';

interface PredictionHistory {
  id: string;
  lightIntensity: number;
  soilMoisture: number;
  temperature: number;
  healthStatus: 'Good' | 'Needs Attention' | 'Critical';
  timestamp: string;
}

interface HistoryTableProps {
  history: PredictionHistory[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ history }) => {
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

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-green-50 border-b border-green-100">
          <tr>
            <th className="text-left p-4 font-semibold text-green-700">Date & Time</th>
            <th className="text-left p-4 font-semibold text-green-700">
              <div className="flex items-center gap-1">
                <Sun className="h-4 w-4" />
                Light
              </div>
            </th>
            <th className="text-left p-4 font-semibold text-green-700">
              <div className="flex items-center gap-1">
                <Droplets className="h-4 w-4" />
                Moisture
              </div>
            </th>
            <th className="text-left p-4 font-semibold text-green-700">
              <div className="flex items-center gap-1">
                <Thermometer className="h-4 w-4" />
                Temp
              </div>
            </th>
            <th className="text-left p-4 font-semibold text-green-700">Health Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => {
            const { date, time } = formatDateTime(record.timestamp);
            return (
              <tr 
                key={record.id} 
                className={`border-b border-green-50 hover:bg-green-25 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-green-25/30'
                }`}
              >
                <td className="p-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{date}</div>
                    <div className="text-gray-500">{time}</div>
                  </div>
                </td>
                <td className="p-4 text-gray-700">{record.lightIntensity}</td>
                <td className="p-4 text-gray-700">{record.soilMoisture}</td>
                <td className="p-4 text-gray-700">{record.temperature}°C</td>
                <td className="p-4">
                  <Badge 
                    variant="outline" 
                    className={`${getHealthStatusColor(record.healthStatus)} font-medium`}
                  >
                    <span className="mr-1">{getHealthStatusIcon(record.healthStatus)}</span>
                    {record.healthStatus}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
