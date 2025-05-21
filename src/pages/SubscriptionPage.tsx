
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanCard from '../components/subscription/PlanCard';
import { SUBSCRIPTION_PLANS, createPreference } from '../services/mercadopago';
import { useAuth } from '../contexts/AuthContext';

const SubscriptionPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubscribe = async (planId: string) => {
    try {
      setLoading(true);
      const preferenceId = await createPreference(planId);
      // Redirect to MercadoPago checkout
      window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}`;
    } catch (error) {
      console.error('Error creating subscription:', error);
    } finally {
      setLoading(false);
    }
  };

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
              isSelected={selectedPlan === plan.id}
              onSelect={(planId) => {
                setSelectedPlan(planId);
                handleSubscribe(planId);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
