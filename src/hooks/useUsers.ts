
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types/supabase';

export function useUsers(userType?: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      let query = supabase.from('users').select('*');
      if (userType) {
        query = query.eq('tipo_usuario', userType);
      }
      const { data, error } = await query;
      if (error) throw error;
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (user: Omit<User, 'id' | 'criado_em'>) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ ...user, criado_em: new Date().toISOString() }])
        .select()
        .single();
      
      if (error) throw error;
      setUsers(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateUser = async (id: string, updates: Partial<User>) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      setUsers(prev => prev.map(u => u.id === id ? data : u));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userType]);

  return { users, loading, error, createUser, updateUser, deleteUser, refetch: fetchUsers };
}
