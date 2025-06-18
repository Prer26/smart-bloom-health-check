
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Leaf } from 'lucide-react';

interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const PlantChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hi! I\'m your plant care assistant 🌱 Ask me anything about plant care!',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const plantCareResponses = {
    'yellow leaves': '🍃 Yellow leaves usually indicate overwatering, underwatering, or nutrient deficiency. Check soil moisture and adjust watering schedule!',
    'fungus': '🍄 For fungal issues, improve air circulation, reduce humidity, remove affected leaves, and consider using neem oil or fungicide.',
    'water': '💧 Most plants need water when the top inch of soil feels dry. Check by sticking your finger into the soil!',
    'sunlight': '☀️ Most houseplants prefer bright, indirect light. Avoid direct sunlight which can scorch leaves.',
    'brown tips': '🍂 Brown leaf tips often mean low humidity, fluoride in water, or over-fertilizing. Try using filtered water!',
    'drooping': '😔 Drooping leaves can mean underwatering, overwatering, or temperature stress. Check soil moisture first!',
    'fertilizer': '🌿 Feed your plants with balanced liquid fertilizer every 2-4 weeks during growing season (spring/summer).',
    'repot': '🪴 Repot when roots are coming out of drainage holes or plant seems too big for its pot. Spring is best!',
    'pests': '🐛 Common pests include aphids, spider mites, and mealybugs. Use insecticidal soap or neem oil treatment.',
    'growth': '📈 To encourage growth, ensure proper light, water, nutrients, and consider pruning to promote bushier growth.'
  };

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(plantCareResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Default responses for common plant care topics
    if (lowerMessage.includes('help') || lowerMessage.includes('care')) {
      return '🌱 I can help with watering, lighting, pests, diseases, fertilizing, and general plant care! What specific issue are you facing?';
    }
    
    return '🤔 That\'s an interesting question! For specific plant issues, try asking about watering, yellow leaves, pests, or sunlight. I\'m here to help! 🌿';
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: currentMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: getResponse(currentMessage),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="border-green-200 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Plant Care Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-64 overflow-y-auto space-y-3 mb-4 border rounded-lg p-3 bg-green-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  msg.isBot
                    ? 'bg-white text-green-800 border border-green-200'
                    : 'bg-green-500 text-white'
                }`}
              >
                {msg.isBot && <Leaf className="h-4 w-4 inline mr-1" />}
                {msg.message}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-green-800 border border-green-200 px-3 py-2 rounded-lg">
                <Leaf className="h-4 w-4 inline mr-1" />
                Typing...
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about plant care..."
            className="flex-1 border-green-200 focus:border-green-400"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || isTyping}
            className="bg-green-500 hover:bg-green-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantChatbot;
