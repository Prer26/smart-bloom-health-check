
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Heart, Camera, MessageCircle, BarChart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-2">🌿 About Smart Plant Guardian 2.0</h1>
        <p className="text-green-600">Your AI-powered companion for plant care</p>
      </div>

      {/* Main Features */}
      <Card className="border-green-200 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            Features
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <BarChart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-700">Real-time Monitoring</h3>
                <p className="text-gray-600 text-sm">Track light, moisture, and temperature with instant health predictions</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Camera className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-700">AI Disease Detection</h3>
                <p className="text-gray-600 text-sm">Upload plant photos for instant disease analysis using advanced AI</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-700">Smart Chatbot</h3>
                <p className="text-gray-600 text-sm">Get personalized care tips and answers to your plant questions</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Heart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-700">Emotional Connection</h3>
                <p className="text-gray-600 text-sm">Interactive plant faces and notifications to bond with your plants</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="border-green-200 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
          <CardTitle>🛠️ Built With</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">React</Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">TypeScript</Badge>
            <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">Tailwind CSS</Badge>
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Shadcn/ui</Badge>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">HuggingFace AI</Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Recharts</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Creator Info */}
      <Card className="border-green-200 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">Created with Love</h3>
          <p className="text-green-600 mb-4">
            Smart Plant Guardian 2.0 was crafted to help you build a deeper connection with your plants
            through the power of AI and emotional design.
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
            <span>🌿 Made by Prerana Iyengar</span>
            <Badge variant="outline" className="bg-white/10 text-green-700 border-green-300">
              Built with Bolt.new ❤️
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
