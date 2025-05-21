import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Play, Flag } from 'lucide-react';

const DirectionsGame: React.FC = () => {
  const gridSize = 8;
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 7 });
  const [commands, setCommands] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [success, setSuccess] = useState(false);
  
  const goal = { x: 7, y: 0 };
  
  const resetGame = () => {
    setPlayerPosition({ x: 0, y: 7 });
    setCommands([]);
    setIsPlaying(false);
    setCurrentStep(0);
    setSuccess(false);
  };
  
  const addCommand = (direction: string) => {
    if (!isPlaying) {
      setCommands([...commands, direction]);
    }
  };
  
  const removeCommand = (index: number) => {
    if (!isPlaying) {
      setCommands(commands.filter((_, i) => i !== index));
    }
  };
  
  const executeCommands = async () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    for (let i = 0; i < commands.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const command = commands[i];
      setPlayerPosition(prev => {
        const newPos = { ...prev };
        switch (command) {
          case 'up':
            if (newPos.y > 0) newPos.y--;
            break;
          case 'down':
            if (newPos.y < gridSize - 1) newPos.y++;
            break;
          case 'left':
            if (newPos.x > 0) newPos.x--;
            break;
          case 'right':
            if (newPos.x < gridSize - 1) newPos.x++;
            break;
        }
        return newPos;
      });
    }
    
    setCurrentStep(commands.length);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsPlaying(false);
    checkSuccess();
  };
  
  const checkSuccess = () => {
    if (playerPosition.x === goal.x && playerPosition.y === goal.y) {
      setSuccess(true);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary-500">
        Seguindo Direções
      </h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="grid grid-cols-8 gap-1 bg-gray-100 p-2 rounded-lg">
            {Array.from({ length: gridSize * gridSize }).map((_, index) => {
              const x = index % gridSize;
              const y = Math.floor(index / gridSize);
              const isPlayer = x === playerPosition.x && y === playerPosition.y;
              const isGoal = x === goal.x && y === goal.y;
              
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-md ${
                    isPlayer ? 'bg-primary-500' :
                    isGoal ? 'bg-success-500' :
                    'bg-white'
                  }`}
                />
              );
            })}
          </div>
          
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => addCommand('up')}
              disabled={isPlaying}
              className="btn-primary p-2"
            >
              <ArrowUp size={24} />
            </button>
            <button
              onClick={() => addCommand('down')}
              disabled={isPlaying}
              className="btn-primary p-2"
            >
              <ArrowDown size={24} />
            </button>
            <button
              onClick={() => addCommand('left')}
              disabled={isPlaying}
              className="btn-primary p-2"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={() => addCommand('right')}
              disabled={isPlaying}
              className="btn-primary p-2"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-bold mb-2">Seus Comandos:</h3>
            <div className="flex flex-wrap gap-2">
              {commands.map((command, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                    currentStep > index ? 'bg-success-100 text-success-500' :
                    currentStep === index ? 'bg-primary-500 text-white' :
                    'bg-gray-200'
                  }`}
                >
                  {command === 'up' && <ArrowUp size={16} />}
                  {command === 'down' && <ArrowDown size={16} />}
                  {command === 'left' && <ArrowLeft size={16} />}
                  {command === 'right' && <ArrowRight size={16} />}
                  {!isPlaying && (
                    <button
                      onClick={() => removeCommand(index)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={executeCommands}
              disabled={isPlaying || commands.length === 0}
              className="btn-primary flex-1"
            >
              <Play size={16} className="mr-2" />
              Executar
            </button>
            <button
              onClick={resetGame}
              disabled={isPlaying}
              className="btn-outline"
            >
              <RotateCcw size={16} className="mr-2" />
              Reiniciar
            </button>
          </div>
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-success-50 text-success-500 rounded-lg text-center"
            >
              <Flag className="inline-block mb-2" size={24} />
              <p className="font-bold">Parabéns! Você chegou ao objetivo!</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectionsGame;