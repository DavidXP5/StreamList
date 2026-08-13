import { Link, Routes, Route } from 'react-router'
import './App.css'

import StreamList from './pages/StreamList'
import Movies from './pages/Movies'
import Cart from './pages/Cart'
import About from './pages/About'

function App() {
  return (
    <>
      <header>
        <h2>StreamList</h2>

        <nav>
          <Link to="/">StreamList</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App