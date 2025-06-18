
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Droplets, Sun, AlertTriangle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'water' | 'light' | 'care' | 'daily';
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
}

interface PlantNotificationsProps {
  healthStatus: 'Good' | 'Needs Attention' | 'Critical' | null;
  lightIntensity?: number;
  soilMoisture?: number;
  temperature?: number;
}

const PlantNotifications: React.FC<PlantNotificationsProps> = ({ 
  healthStatus, 
  lightIntensity, 
  soilMoisture, 
  temperature 
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    generateNotifications();
    
    // Set up daily reminder
    const dailyReminder = setInterval(() => {
      addDailyReminder();
    }, 24 * 60 * 60 * 1000); // 24 hours

    return () => clearInterval(dailyReminder);
  }, [healthStatus, lightIntensity, soilMoisture, temperature]);

  const generateNotifications = () => {
    const newNotifications: Notification[] = [];

    // Check soil moisture
    if (soilMoisture && soilMoisture < 300) {
      newNotifications.push({
        id: `water-${Date.now()}`,
        type: 'water',
        message: 'I\'m thirsty! 💧 Please water me soon.',
        timestamp: new Date(),
        priority: 'high'
      });
    } else if (soilMoisture && soilMoisture < 500) {
      newNotifications.push({
        id: `water-medium-${Date.now()}`,
        type: 'water',
        message: 'I could use some water when you get a chance! 🌧️',
        timestamp: new Date(),
        priority: 'medium'
      });
    }

    // Check light levels
    if (lightIntensity && lightIntensity < 300) {
      newNotifications.push({
        id: `light-${Date.now()}`,
        type: 'light',
        message: 'I need more sunlight! ☀️ Could you move me closer to a window?',
        timestamp: new Date(),
        priority: 'high'
      });
    }

    // Check temperature
    if (temperature && temperature > 35) {
      newNotifications.push({
        id: `temp-${Date.now()}`,
        type: 'care',
        message: 'It\'s too hot for me! 🥵 Please move me to a cooler spot.',
        timestamp: new Date(),
        priority: 'high'
      });
    }

    // Health-based notifications
    if (healthStatus === 'Critical') {
      newNotifications.push({
        id: `critical-${Date.now()}`,
        type: 'care',
        message: 'I need immediate attention! 🆘 Please check my care requirements.',
        timestamp: new Date(),
        priority: 'high'
      });
    }

    setNotifications(prev => [...newNotifications, ...prev.slice(0, 3)]);
  };

  const addDailyReminder = () => {
    const dailyMessages = [
      'Good morning! 🌅 Don\'t forget to check on me today!',
      'How are you doing today? 🌸 I love spending time with you!',
      'Thanks for taking such good care of me! 💚',
      'Remember to check my soil moisture today! 🌱',
      'I hope you\'re having a wonderful day! ☀️'
    ];

    const randomMessage = dailyMessages[Math.floor(Math.random() * dailyMessages.length)];

    const dailyNotification: Notification = {
      id: `daily-${Date.now()}`,
      type: 'daily',
      message: randomMessage,
      timestamp: new Date(),
      priority: 'low'
    };

    setNotifications(prev => [dailyNotification, ...prev.slice(0, 4)]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'water':
        return <Droplets className="h-4 w-4 text-blue-500" />;
      case 'light':
        return <Sun className="h-4 w-4 text-yellow-500" />;
      case 'care':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-400 bg-red-50';
      case 'medium':
        return 'border-l-amber-400 bg-amber-50';
      default:
        return 'border-l-green-400 bg-green-50';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Card className="border-green-200 shadow-lg bg-white/90 backdrop-blur-sm animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Plant Notifications
          <Badge variant="secondary" className="bg-white/20 text-white">
            {notifications.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border-l-4 ${getPriorityColor(notification.priority)} animate-scale-in`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissNotification(notification.id)}
                className="h-6 w-6 p-0 hover:bg-gray-200"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PlantNotifications;
