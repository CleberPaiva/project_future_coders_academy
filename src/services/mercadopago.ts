
import { loadMercadoPago } from "@mercadopago/sdk-js";

export type SubscriptionPlan = {
  id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    title: 'Plano Básico',
    price: 49.90,
    description: 'Ideal para começar',
    features: ['1 aluno', 'Acesso básico às trilhas', 'Suporte por email']
  },
  {
    id: 'family',
    title: 'Plano Família',
    price: 89.90,
    description: 'Para famílias',
    features: ['Até 3 alunos', 'Acesso completo', 'Suporte prioritário']
  }
];

export const initMercadoPago = async () => {
  await loadMercadoPago();
  const mp = new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);
  return mp;
};

export const createPreference = async (planId: string): Promise<string> => {
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
  if (!plan) throw new Error('Plano não encontrado');

  const response = await fetch('/api/create-preference', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ planId, price: plan.price }),
  });

  const data = await response.json();
  return data.preferenceId;
};
