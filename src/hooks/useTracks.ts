
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Track } from '../types/supabase';

export function useTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTracks = async () => {
    try {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .order('grade');
      
      if (error) throw error;
      setTracks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTrack = async (track: Omit<Track, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('tracks')
        .insert([track])
        .select()
        .single();
      
      if (error) throw error;
      setTracks(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateTrack = async (id: string, updates: Partial<Track>) => {
    try {
      const { data, error } = await supabase
        .from('tracks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      setTracks(prev => prev.map(t => t.id === id ? data : t));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteTrack = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tracks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setTracks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  return { tracks, loading, error, createTrack, updateTrack, deleteTrack, refetch: fetchTracks };
}
