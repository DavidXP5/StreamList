import { useState } from 'react'

function StreamList() {
  const [streamItem, setStreamItem] = useState('')
  const [streamList, setStreamList] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  function handleSubmit(event) {
  event.preventDefault()

  const newItem = {
    id: Date.now(),
    title: streamItem,
    completed: false
  }

  setStreamList([...streamList, newItem])
  console.log(newItem)
  setStreamItem('')
}

function deleteItem(id) {
  setStreamList(
    streamList.filter((item) => item.id !== id)
  )
}

function toggleComplete(id) {
  setStreamList(
    streamList.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    )
  )
}

function startEditing(item) {
  setEditingId(item.id)
  setEditText(item.title)
}

function saveEdit(id) {
  setStreamList(
    streamList.map((item) =>
      item.id === id
        ? { ...item, title: editText }
        : item
    )
  )

  setEditingId(null)
  setEditText('')
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

      <section className="stream-list">
  <h2>My StreamList</h2>

  <p className="list-summary">
  {streamList.length} total |{' '}
  {streamList.filter((item) => item.completed).length} completed
</p>

  <ul>
    {streamList.map((item) => (
  <li key={item.id}>

    {editingId === item.id ? (
      <input
        type="text"
        value={editText}
        onChange={(event) => setEditText(event.target.value)}
      />
    ) : (
      <span
        style={{
          textDecoration: item.completed ? 'line-through' : 'none'
        }}
      >
        {item.title}
      </span>
    )}

    <button
  className="complete-button"
  onClick={() => toggleComplete(item.id)}
>
  <span className="material-symbols-outlined">
    check_circle
  </span>

  {item.completed ? 'Undo' : 'Complete'}
</button>

    {editingId === item.id ? (
      <button
  className="edit-button"
  onClick={() => saveEdit(item.id)}
>
  <span className="material-symbols-outlined">
    save
  </span>

  Save
</button>
    ) : (
      <button
  className="edit-button"
  onClick={() => startEditing(item)}
>
  <span className="material-symbols-outlined">
    edit
  </span>

  Edit
</button>
    )}

    <button
  className="delete-button"
  onClick={() => deleteItem(item.id)}
>
  <span className="material-symbols-outlined">
    delete
  </span>

  Delete
</button>

  </li>
))}
  </ul>
</section>
    </main>
  )
}

export default StreamList