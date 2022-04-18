import Startup from './pages/Startup'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  var isAuthenticated = null
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (userInfo) {
    isAuthenticated = true
  } else {
    isAuthenticated = false
  }

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
