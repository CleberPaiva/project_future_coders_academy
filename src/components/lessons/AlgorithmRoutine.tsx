import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';

const AlgorithmRoutine: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const steps = [
    {
      title: "O que é uma Rotina?",
      content: "Uma rotina é como uma receita mágica que fazemos todos os dias! São os passos que seguimos desde acordar até dormir. Vamos aprender como criar nossas próprias rotinas de forma divertida!",
      example: {
        title: "Vamos ver um exemplo:",
        steps: [
          "🌞 Acordar e se espreguiçar",
          "🦷 Escovar os dentes",
          "🥣 Tomar café da manhã",
          "📚 Ir para a escola"
        ]
      }
    },
    {
      title: "Rotinas são como Mágica!",
      content: "Sabia que suas rotinas são como truques de mágica? Quando você segue os passos certinhos, tudo funciona perfeitamente!",
      example: {
        title: "A mágica da sua rotina:",
        steps: [
          "✨ Cada passo é importante",
          "✨ A ordem faz toda diferença",
          "✨ É fácil de lembrar",
          "✨ Ajuda você a não esquecer nada"
        ]
      }
    },
    {
      title: "Vamos Criar uma Rotina?",
      content: "Agora é sua vez de ser o mágico! Vamos criar uma rotina super legal para seu dia?",
      example: {
        title: "Pense nas coisas que você faz:",
        steps: [
          "🎮 Brincar com seus jogos favoritos",
          "🎨 Fazer um desenho bonito",
          "👕 Se arrumar para sair",
          "🥪 Fazer um lanche gostoso"
        ]
      }
    },
    {
      title: "Por que Rotinas são Legais?",
      content: "As rotinas são como super poderes! Elas ajudam você a fazer tudo direitinho e ficar mais organizado.",
      example: {
        title: "Seus super poderes:",
        steps: [
          "🌟 Nunca esquece as tarefas",
          "🌟 Faz tudo mais rápido",
          "🌟 Fica mais independente",
          "🌟 Aprende coisas novas"
        ]
      }
    },
    {
      title: "Hora de Praticar!",
      content: "Agora que você já sabe tudo sobre rotinas, vamos criar a sua? Na próxima atividade, você vai montar sua própria rotina super divertida!",
      example: {
        title: "Prepare-se para:",
        steps: [
          "🎯 Criar sua rotina especial",
          "🎯 Escolher atividades legais",
          "🎯 Fazer algo divertido",
          "🎯 Aprender brincando"
        ]
      }
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
              <p className="text-lg mb-6">
                {steps[step - 1].content}
              </p>
              <div className="bg-gray-50 p-6 rounded-lg text-left">
                <h3 className="font-bold mb-4 text-gray-700">
                  {steps[step - 1].example.title}
                </h3>
                <ul className="space-y-3">
                  {steps[step - 1].example.steps.map((step, index) => (
                    <li 
                      key={index}
                      className="flex items-center text-gray-700 font-medium"
                    >
                      <span className="ml-2">{step}</span>
                    </li>
                  ))}
                </ul>
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

export default AlgorithmRoutine;