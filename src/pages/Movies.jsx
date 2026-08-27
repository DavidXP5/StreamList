import { useState } from 'react'

function Movies() {
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')

  const apiKey = import.meta.env.VITE_TMDB_API_KEY

  async function searchMovies(event) {
    event.preventDefault()

    try {
      setError('')

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`
      )

      if (!response.ok) {
        throw new Error('Unable to retrieve movie data.')
      }

      const data = await response.json()

      setMovies(data.results)
    } catch (error) {
      setError(error.message)
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

        <button type="submit">
          Search
        </button>
      </form>

      {error && <p>{error}</p>}

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
              Release Date: {movie.release_date || 'Unknown'}
            </p>

            <p>
              Rating: {movie.vote_average.toFixed(1)} / 10
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