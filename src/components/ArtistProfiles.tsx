
import { useEffect, useState } from 'react'
import { getArtists } from '@/services/artists'

type Artist = {
  id: string
  artist_name: string
  artist_type: string | null
  country: string | null
  genre: string | null
  bio: string | null
}

export function ArtistProfiles() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadArtists() {
      try {
        const data = await getArtists()
        if (active) setArtists(data ?? [])
      } catch {
        if (active) {
          setError('Could not load artist profiles. Please try again later.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadArtists()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="mt-6 rounded-2xl border border-white/10 p-5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Artist profiles</h2>
        <p className="mt-1 text-sm text-fg-3">
          Profiles retrieved from the SEEN database.
          Streaming and social metrics remain separate.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-fg-3">Loading artist profiles...</p>
      ) : error ? (
        <p role="alert" className="text-sm text-red-400">{error}</p>
      ) : artists.length === 0 ? (
        <p className="text-sm text-fg-3">
          No artist profiles have been added yet.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <article
              key={artist.id}
              className="rounded-xl border border-white/10 p-4"
            >
              <h3 className="font-medium">{artist.artist_name}</h3>
              <p className="mt-1 text-sm text-fg-3">
                {[artist.genre, artist.country].filter(Boolean).join(' · ') ||
                  'Profile details not yet available'}
              </p>
              {artist.artist_type && (
                <p className="mt-3 text-xs text-fg-2">
                  {artist.artist_type}
                </p>
              )}
              {artist.bio && (
                <p className="mt-2 text-sm text-fg-2">{artist.bio}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}