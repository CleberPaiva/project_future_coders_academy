
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Plan {
  id: string;
  nome: string;
  descricao: string;
  valor_mensal: number;
  valor_anual: number;
  duracao_dias: number;
  ativo: boolean;
  criado_em: string;
}

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('valor_mensal');
      
      if (error) throw error;
      setPlans(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPlan = async (plan: Omit<Plan, 'id' | 'criado_em'>) => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .insert([{ ...plan, criado_em: new Date().toISOString() }])
        .select()
        .single();
      
      if (error) throw error;
      setPlans(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updatePlan = async (id: string, updates: Partial<Plan>) => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      setPlans(prev => prev.map(p => p.id === id ? data : p));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletePlan = async (id: string) => {
    try {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setPlans(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return { plans, loading, error, createPlan, updatePlan, deletePlan, refetch: fetchPlans };
}
