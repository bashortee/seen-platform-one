
import { useEffect, useState } from 'react'
import { createArtist, getArtists, type Artist } from '@/services/artists'
import { supabase } from '@/lib/supabase'

export function ArtistProfiles() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [signedIn, setSignedIn] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    artist_name: '',
    artist_type: 'Independent',
    country: '',
    genre: '',
    bio: '',
  })

  async function loadArtists() {
    setError('')
    setLoading(true)

    try {
      const { data } = await supabase.auth.getSession()
      setSignedIn(Boolean(data.session))

      const profiles = await getArtists()
      setArtists(profiles)
    } catch {
      setError('Could not load artist profiles. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const { data } = await supabase.auth.getSession()
        if (!active) return
        setSignedIn(Boolean(data.session))

        const profiles = await getArtists()
        if (active) setArtists(profiles)
      } catch {
        if (active) {
          setError('Could not load artist profiles. Please try again later.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session))
      void loadArtists()
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!form.artist_name.trim()) {
      setError('Enter an artist name.')
      return
    }

    setSaving(true)

    try {
      const artist = await createArtist({
        ...form,
        artist_name: form.artist_name.trim(),
        country: form.country.trim(),
        genre: form.genre.trim(),
        bio: form.bio.trim(),
      })

      setArtists((current) => [artist, ...current])
      setForm({
        artist_name: '',
        artist_type: 'Independent',
        country: '',
        genre: '',
        bio: '',
      })
      setMessage('Artist profile created successfully.')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not create the artist profile. Please try again.',
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-white/10 p-5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Artist profiles</h2>
        <p className="mt-1 text-sm text-fg-3">
          Profiles retrieved from the SEEN database. Streaming and social
          metrics remain separate.
        </p>
      </div>

      {signedIn && (
        <form onSubmit={handleSubmit} className="mb-6 grid gap-3 sm:grid-cols-2">
          <input
            aria-label="Artist name"
            placeholder="Artist name *"
            required
            value={form.artist_name}
            onChange={(e) =>
              setForm({ ...form, artist_name: e.target.value })
            }
            className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm"
          />

          <select
            aria-label="Artist type"
            value={form.artist_type}
            onChange={(e) =>
              setForm({ ...form, artist_type: e.target.value })
            }
            className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm"
          >
            <option value="Independent">Independent</option>
            <option value="Managed">Managed</option>
            <option value="Signed">Signed</option>
          </select>

          <input
            aria-label="Country"
            placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm"
          />

          <input
            aria-label="Genre"
            placeholder="Genre"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm"
          />

          <textarea
            aria-label="Artist bio"
            placeholder="Short artist bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm sm:col-span-2"
            rows={3}
          />

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 sm:col-span-2"
          >
            {saving ? 'Creating profile...' : 'Add artist profile'}
          </button>
        </form>
      )}

      {message && (
        <p role="status" className="mb-3 text-sm text-green-400">
          {message}
        </p>
      )}

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
              <p className="mt-2 text-xs text-fg-3">
                {artist.is_demo ? 'Public demo profile' : 'Artist profile'}
              </p>
              {artist.artist_type && (
                <p className="mt-2 text-xs text-fg-2">{artist.artist_type}</p>
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