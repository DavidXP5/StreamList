import { useState } from 'react'

function StreamList() {
  const [streamItem, setStreamItem] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    console.log(streamItem)
    setStreamItem('')
  }

  return (
    <main>
      <h1>StreamList</h1>
      <p>Create your personal list of movies and shows to watch.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="streamItem">Movie or Show</label>

        <input
          id="streamItem"
          type="text"
          value={streamItem}
          onChange={(event) => setStreamItem(event.target.value)}
          placeholder="Enter a movie or show"
          required
        />

        <button type="submit">Add to StreamList</button>
      </form>
    </main>
  )
}

export default StreamList