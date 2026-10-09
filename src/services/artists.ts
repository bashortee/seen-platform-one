
import { supabase } from '../lib/supabase';

export async function getArtists() {
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching artists:', error.message);
    throw error;
  }

  return data;
}