
import React from 'react';
import PlantChatbot from '@/components/PlantChatbot';

const ChatbotPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-2">🤖 Plant Care Assistant</h1>
        <p className="text-green-600">Ask me anything about plant care and I'll help you out!</p>
      </div>

      <PlantChatbot />

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-700 mb-4">💡 Try asking about:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-600">
          <div className="space-y-2">
            <p>• "Why are my plant's leaves yellow?"</p>
            <p>• "How much water does my plant need?"</p>
            <p>• "What can I do for fungus?"</p>
          </div>
          <div className="space-y-2">
            <p>• "My plant is drooping, what's wrong?"</p>
            <p>• "How often should I fertilize?"</p>
            <p>• "When should I repot my plant?"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
