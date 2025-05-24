
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Module } from '../types/supabase';

export function useModules(trackId?: string) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = async () => {
    try {
      let query = supabase
        .from('modules')
        .select('*')
        .order('ordem');
      
      if (trackId) {
        query = query.eq('track_id', trackId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      setModules(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createModule = async (module: Omit<Module, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .insert([module])
        .select()
        .single();
      
      if (error) throw error;
      setModules(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateModule = async (id: string, updates: Partial<Module>) => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      setModules(prev => prev.map(m => m.id === id ? data : m));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteModule = async (id: string) => {
    try {
      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setModules(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchModules();
  }, [trackId]);

  return { modules, loading, error, createModule, updateModule, deleteModule, refetch: fetchModules };
}
