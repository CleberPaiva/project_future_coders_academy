import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Save, Trash2, CheckCircle } from 'lucide-react';

interface RoutineStep {
  id: string;
  text: string;
  time: string;
}

const RoutineBuilder: React.FC = () => {
  const [steps, setSteps] = useState<RoutineStep[]>([]);
  const [newStep, setNewStep] = useState('');
  const [newTime, setNewTime] = useState('');
  const [saved, setSaved] = useState(false);
  
  const addStep = () => {
    if (newStep.trim() && newTime.trim()) {
      setSteps([
        ...steps,
        { 
          id: Date.now().toString(),
          text: newStep.trim(),
          time: newTime.trim()
        }
      ]);
      setNewStep('');
      setNewTime('');
      setSaved(false);
    }
  };
  
  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
    setSaved(false);
  };
  
  const saveRoutine = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary-500">
        Criando Minha Rotina Divertida
      </h2>
      
      <div className="mb-8">
        <p className="text-lg text-center mb-6">
          Vamos criar uma rotina super legal! Adicione as coisas que você faz durante o dia
          e organize elas do jeito que quiser.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                O que você vai fazer?
              </label>
              <input
                type="text"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                placeholder="Ex: Brincar com meus brinquedos"
                className="form-input"
              />
            </div>
            <div className="md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Que horas?
              </label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="md:w-auto md:self-end">
              <button
                onClick={addStep}
                className="btn-primary w-full md:w-auto"
                disabled={!newStep.trim() || !newTime.trim()}
              >
                <Plus size={16} className="mr-2" />
                Adicionar
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-primary-100 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="w-8 h-8 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center font-bold mr-4">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium">{step.text}</p>
                  <p className="text-sm text-gray-500">{step.time}</p>
                </div>
              </div>
              <button
                onClick={() => removeStep(step.id)}
                className="text-gray-400 hover:text-error-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
          
          {steps.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Vamos criar sua rotina! Adicione suas atividades favoritas!
            </div>
          )}
        </div>
      </div>
      
      {steps.length > 0 && (
        <div className="text-center">
          <button
            onClick={saveRoutine}
            className="btn-primary"
            disabled={saved}
          >
            {saved ? (
              <>
                <CheckCircle size={16} className="mr-2" />
                Rotina Salva!
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Salvar Minha Rotina
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default RoutineBuilder;