
import { createClient } from '@supabase/supabase-js';
import { Module, Track } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getModulesByTrack(trackId: string) {
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .eq('track_id', trackId)
    .order('ordem');
    
  if (error) throw error;
  return data as Module[];
}

export async function getModuleById(id: string) {
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data as Module;
}

export async function getTrackById(id: string) {
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data as Track;
}
