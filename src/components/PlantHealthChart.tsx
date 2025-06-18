
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PredictionHistory {
  id: string;
  lightIntensity: number;
  soilMoisture: number;
  temperature: number;
  healthStatus: 'Good' | 'Needs Attention' | 'Critical';
  timestamp: string;
}

interface PlantHealthChartProps {
  history: PredictionHistory[];
}

const PlantHealthChart: React.FC<PlantHealthChartProps> = ({ history }) => {
  const chartData = history
    .slice()
    .reverse()
    .map((record, index) => ({
      time: new Date(record.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      lightIntensity: record.lightIntensity,
      soilMoisture: record.soilMoisture,
      temperature: record.temperature,
      healthScore: record.healthStatus === 'Good' ? 100 : 
                   record.healthStatus === 'Needs Attention' ? 60 : 20
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-green-200 rounded-lg shadow-lg">
          <p className="font-semibold text-green-700 mb-2">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}${
                entry.name === 'Temperature' ? '°C' : 
                entry.name === 'Health Score' ? '%' : ''
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0f2e7" />
          <XAxis 
            dataKey="time" 
            stroke="#059669"
            fontSize={12}
          />
          <YAxis stroke="#059669" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="lightIntensity"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            name="Light Intensity"
          />
          <Line
            type="monotone"
            dataKey="soilMoisture"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            name="Soil Moisture"
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            name="Temperature"
          />
          <Line
            type="monotone"
            dataKey="healthScore"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
            name="Health Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlantHealthChart;
