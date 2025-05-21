
import React from 'react';
import { Check } from 'lucide-react';
import type { SubscriptionPlan } from '../../services/mercadopago';

interface PlanCardProps {
  plan: SubscriptionPlan;
  onSelect: (planId: string) => void;
  isSelected?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, isSelected }) => {
  return (
    <div 
      className={`
        bg-white rounded-xl p-6 border-2 transition-all
        ${isSelected ? 'border-primary-500 shadow-lg' : 'border-gray-200'}
      `}
    >
      <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
      <p className="text-gray-600 mb-4">{plan.description}</p>
      
      <div className="text-3xl font-bold mb-6">
        R$ {plan.price.toFixed(2)}
        <span className="text-sm text-gray-500 font-normal">/mês</span>
      </div>
      
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check size={16} className="text-primary-500 mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={() => onSelect(plan.id)}
        className="w-full py-2 px-4 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
      >
        Selecionar Plano
      </button>
    </div>
  );
};

export default PlanCard;
