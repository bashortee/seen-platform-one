
import { supabase } from '@/lib/supabase'

export type Artist = {
  id: string
  artist_name: string
  artist_type: string | null
  country: string | null
  genre: string | null
  bio: string | null
  user_id: string | null
  is_demo: boolean
}

export type NewArtist = {
  artist_name: string
  artist_type: string
  country: string
  genre: string
  bio: string
}

export async function getArtists(): Promise<Artist[]> {
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching artists:', error.message)
    throw error
  }

  return (data ?? []) as Artist[]
}

export async function createArtist(
  artist: NewArtist,
): Promise<Artist> {
  const { data: userData, error: userError } =
    await supabase.auth.getUser()

  if (userError || !userData.user) {
    throw new Error('Please sign in to create an artist profile.')
  }

  const { data, error } = await supabase
    .from('artists')
    .insert({
      ...artist,
      user_id: userData.user.id,
      is_demo: false,
    })
    .select('*')
    .single()

  if (error) {
    console.error('Error creating artist:', error.message)
    throw error
  }

  return data as Artist
}