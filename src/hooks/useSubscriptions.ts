
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  inicio: string;
  fim: string;
}

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          users (nome, email),
          plans (nome)
        `);
      
      if (error) throw error;
      setSubscriptions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (subscription: Omit<Subscription, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([subscription])
        .select()
        .single();
      
      if (error) throw error;
      setSubscriptions(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateSubscription = async (id: string, updates: Partial<Subscription>) => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      setSubscriptions(prev => prev.map(s => s.id === id ? data : s));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteSubscription = async (id: string) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setSubscriptions(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return { subscriptions, loading, error, createSubscription, updateSubscription, deleteSubscription, refetch: fetchSubscriptions };
}
