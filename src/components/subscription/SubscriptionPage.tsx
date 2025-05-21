
import React from 'react';
import PlanCard from './PlanCard';
import { SUBSCRIPTION_PLANS } from '../../services/mercadopago';

const SubscriptionPage: React.FC = () => {
  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Escolha seu Plano</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Invista no futuro do seu filho com nossos planos personalizados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSelect={(planId) => console.log('Selected plan:', planId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
