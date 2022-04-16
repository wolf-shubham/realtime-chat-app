import Startup from './pages/Startup'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  const isAuthenticated = false
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Startup />} />
        </Routes>
      </div>
    </>
  )
}

export default App
