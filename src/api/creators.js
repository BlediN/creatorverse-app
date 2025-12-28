import { supabase } from './supabase';

// Get all creators
export const getAllCreators = async () => {
  const { data, error } = await supabase
    .from('creators')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) {
    throw error;
  }
  return data;
};

// Get a single creator by ID
export const getCreator = async (id) => {
  const { data, error } = await supabase
    .from('creators')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    throw error;
  }
  return data;
};

// Create a new creator
export const createCreator = async (creator) => {
  const { data, error } = await supabase
    .from('creators')
    .insert([creator])
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  return data;
};

// Update an existing creator
export const updateCreator = async (id, updates) => {
  const { data, error } = await supabase
    .from('creators')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  return data;
};

// Delete a creator
export const deleteCreator = async (id) => {
  const { error } = await supabase
    .from('creators')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw error;
  }
  return true;
};
