import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const AlgorithmIntro: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const steps = [
    {
      title: "O que é um Algoritmo?",
      content: "Um algoritmo é como uma receita! É uma sequência de passos que seguimos para realizar uma tarefa.",
      example: "Pense em fazer um sanduíche: primeiro pegamos o pão, depois a manteiga, depois o queijo..."
    },
    {
      title: "Algoritmos no Dia a Dia",
      content: "Você usa algoritmos todos os dias! Quando escova os dentes, quando se veste para a escola...",
      example: "1. Pegar a escova\n2. Colocar pasta\n3. Escovar os dentes\n4. Enxaguar"
    },
    {
      title: "Por que são Importantes?",
      content: "Algoritmos nos ajudam a organizar nossas ideias e resolver problemas de forma ordenada.",
      example: "É como montar um quebra-cabeça: seguimos passos para chegar ao resultado final!"
    },
    {
      title: "Criando seu Primeiro Algoritmo",
      content: "Vamos criar um algoritmo para dar tchau?",
      example: "1. Levantar o braço\n2. Abrir a mão\n3. Balançar de um lado para outro\n4. Sorrir!"
    },
    {
      title: "Hora de Praticar!",
      content: "Agora que você entendeu o que é um algoritmo, vamos praticar criando nossos próprios passos!",
      example: "Na próxima atividade, vamos criar algoritmos divertidos juntos!"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-6 text-primary-500">
              {steps[step - 1].title}
            </h2>
            
            <div className="mb-8">
              <p className="text-lg mb-4">
                {steps[step - 1].content}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <pre className="whitespace-pre-wrap font-nunito text-gray-700">
                  {steps[step - 1].example}
                </pre>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className={`btn ${step === 1 ? 'bg-gray-200 cursor-not-allowed' : 'btn-primary'}`}
          >
            <ArrowLeft size={16} className="mr-2" />
            Anterior
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index + 1 === step ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setStep(step + 1)}
            disabled={step === totalSteps}
            className={`btn ${step === totalSteps ? 'bg-gray-200 cursor-not-allowed' : 'btn-primary'}`}
          >
            {step === totalSteps ? 'Concluir' : 'Próximo'}
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmIntro;