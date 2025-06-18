
import React from 'react';

interface PlantFaceProps {
  healthStatus: 'Good' | 'Needs Attention' | 'Critical' | null;
  isAnalyzing?: boolean;
}

const PlantFace: React.FC<PlantFaceProps> = ({ healthStatus, isAnalyzing }) => {
  const getFaceExpression = () => {
    if (isAnalyzing) {
      return {
        face: '🤔',
        message: 'Analyzing your plant...',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700'
      };
    }

    switch (healthStatus) {
      case 'Good':
        return {
          face: '😊',
          message: 'Your plant is happy and healthy!',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700'
        };
      case 'Needs Attention':
        return {
          face: '😐',
          message: 'Your plant needs some care...',
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-700'
        };
      case 'Critical':
        return {
          face: '😰',
          message: 'Your plant needs immediate help!',
          bgColor: 'bg-red-100',
          textColor: 'text-red-700'
        };
      default:
        return {
          face: '🌱',
          message: 'Ready to check your plant!',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700'
        };
    }
  };

  const expression = getFaceExpression();

  return (
    <div className={`p-6 rounded-full ${expression.bgColor} text-center animate-scale-in transition-all duration-500`}>
      <div className="text-6xl mb-2 animate-bounce">
        {expression.face}
      </div>
      <p className={`text-sm font-medium ${expression.textColor}`}>
        {expression.message}
      </p>
    </div>
  );
};

export default PlantFace;
