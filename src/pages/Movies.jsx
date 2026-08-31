import { useState } from 'react'

function Movies() {
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const apiKey = import.meta.env.VITE_TMDB_API_KEY

  async function searchMovies(event) {
    event.preventDefault()

    const query = searchTerm.trim()
    setHasSearched(true)

    if (!query) {
      return
    }

    try {
      setError('')
      setLoading(true)

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
      )

      if (!response.ok) {
        throw new Error('Unable to retrieve movie data.')
      }

      const data = await response.json()

      setMovies(data.results ?? [])
    } catch {
      setMovies([])
      setError('Unable to retrieve movie data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <h1>Movie Search</h1>

      <p>Search for movie information using TMDB.</p>

      <form onSubmit={searchMovies}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Enter a movie title"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p>{error}</p>}

      {!loading && !error && movies.length === 0 && searchTerm && (
        <p>No movies found for "{searchTerm}".</p>
      )}

      <section className="movie-results">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
            )}

            <h2>{movie.title}</h2>

            <p>
              Release Date: {movie.release_date
                ? new Date(movie.release_date + 'T00:00:00').toLocaleDateString('en-US')
                : 'Unknown'}
            </p>

            <p>
              Rating: {movie.vote_average != null
                ? `${movie.vote_average.toFixed(1)} / 10`
                : 'N/A'}
            </p>

            <p>{movie.overview}</p>
          </div>
        ))}
      </section>

      <p className="tmdb-credit">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </main>
  )
}

export default Movies