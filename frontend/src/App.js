import Startup from './pages/Startup'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Error404 from './pages/Error404'

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Startup />} exact />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </>
  )
}

export default App
